import { useState, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import qs from 'qs';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import AuctionMemberInfo from '@src/components/mypage/dealer/DealerAuction/AuctionMemberInfo';
import AuctionDocumentUploader from '@src/components/mypage/dealer/DealerAuction/AuctionDocumentUploader';

import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import RenderHelper from '@lib/share/render/helper';
import { createValidator } from '@lib/share/validator';
import AuctionMemberSchema from '@lib/share/validator/mypage/dealer/AuctMb';

import { inputAuctionObjectProp, putAuctionMemberPropsAction, getMyAuctionMemberStateAction, getMbInfoAction, postImageAction } from '@src/actions/mypage/dealer/auction/auctionMemberAction';
import { insertMyAuctionMemberInfo, downloadFile } from '@src/api/mypage/dealer/AuctionApi';
import { SystemContext } from '@src/provider/SystemProvider';

import { selectMbInfo, selectMyAuctionMemberState, updateAutoAuctionDealer } from '@src/api/mypage/dealer/AuctionApi';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { frontUrl } from '@src/utils/HttpUtils';

const nextPage = `/mypage/dealer/autoauction/joinApproval`;
const globalThis = require('globalthis')();

const validator = createValidator(AuctionMemberSchema, {
  required: [
    'mbNm',
    'mbAddrEnc',
    'mbDtlAddrEnc',
    'mbHpPnEnc',
    'mbZcd',
    'mbBankcd',
    'mbAcntnoEnc',
  ]
});

const findParentByClassName = (target, className) => {
  const { classList } = target
  return classList.contains(className) ? target : findParentByClassName(target.parentElement, className)
}

const documentEvaluation = ({  }) => {//memberState, memberInfo
  const formRef = useRef();
  const dispatch = useDispatch();
  const auctionMember = useSelector((RootStore) => RootStore.auctionMember);
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { auctMbInfo, auctMbCorpInfo, memberState,} = auctionMember;
  const [agreeUsingAccount, setAgreeUsingAccount] = useState(false);

  console.log('auctMbInfo : ', auctMbInfo)
  console.log('auctMbCorpInfo : ', auctMbCorpInfo)
  console.log('memberState : ', memberState)

  const [step, setStep] = useState(()=>{
    // memberState?.MEMBSTATCD === '01' ? 2 : 1
    if(memberState?.MEMBSTATCD === '01'){
      return 3
    } else if(memberState?.CARADMIBUSICOPY === 'Y' && memberState?.BUSIREGICOPY === 'Y'){
      return 2
    } else {
      return 1
    }
  });

  const register = () => {
    if (!agreeUsingAccount) {
      showAlert('계좌번호 정책에 동의하셔야 합니다');
    } else {
      console.log('auctMbInfo : ', auctMbInfo)

      //데이터 파싱이 필요합니다
      const memberAdd = auctMbInfo?.mbAddrEnc?.split(' ')
      const addMbInfo = {
        ...auctMbInfo,
        mbAddrA1 : memberAdd?.shift(),
        mbAddrA2 : memberAdd?.shift(),
        mbAddrA3 : memberAdd?.join(' '),
        mbHpPnEnc : auctMbInfo?.mbHpPnEnc
      }

      console.log('auctMbInfo : ', auctMbInfo)
      console.log('addMbInfo : ', addMbInfo)
      console.log('addMbInfo?.mbHpPnEnc ::::::::::::::::::::::: ', addMbInfo?.mbHpPnEnc)

      const valid = validator.validate(addMbInfo);
      const { error } = valid;
      console.log('valid : ', valid)
      if (error) {
        console.log('error : ', error);
        showAlert(`[${error?.[0]?.label}] ` + error?.[0]?.messages?.[0] || '에러가 발생했습니다');
      } else {
        const formData = new FormData()
        const inputs = Array.from(formRef.current.querySelectorAll('input[type=file][name]'));
        const filteredInputs = inputs.filter((input) => {
          const parent = findParentByClassName(input, 'input-file-wrap')
          const imageNames = Array.from(parent.querySelectorAll('.file-list-multi li')).map(item => item?.textContent)
          return input.files.length > 0 && imageNames.includes(input?.files[0]?.name)
        })
        
        console.log("register ::::: -> filteredInputs", filteredInputs)

        const isUploaded = ['entrCeregrtCpFile', 'crMgmtCeregrtFile'].every(required => filteredInputs.find(item => item.name))

        if(!isUploaded){
          showAlert('사업자등록증 사본, 자동차관리사업등록증은 필수 업로드입니다');
          return
        }

        filteredInputs.forEach((input) => {
          const { name } = input
          formData.append('files', input.files[0], name)
        });
        
        Object.keys(addMbInfo).forEach(key => {
          const value = addMbInfo[key]
          if(value) formData.append(key, value)
        })
        

        showConfirm('등록 하시겠습니까?', async () => {
          showLoader();
          const { data, statusinfo } = await updateAutoAuctionDealer(formData).then((res) => res?.data).finally(() => {
            hideLoader();
          })
  
          if (statusinfo.returncd === '000') {
            showAlert('등록하였습니다');
            await Router.push(nextPage + '?' + qs.stringify({mbNo:data})).then(() => {
              window.scrollTo(0, 0);
            });
          } else {
            showAlert('등록 실패하였습니다');
          }
        });
      }
    }
  };

  const inputMemberInfo = (e) => {
    const { value, name } = e.target;
    console.log("inputMemberInfo -> :::::: name", name)
    console.log("inputMemberInfo -> :::::: value", value)
    dispatch(
      inputAuctionObjectProp({
        state: 'auctMbInfo',
        value,
        name
      })
    );
  };

  const agree = (e) => {
    const { checked } = e.target;
    console.log('agree checked : ', checked);
    setAgreeUsingAccount(checked);
  };

  const uploadImage = (files, target) => {
    console.log('uploadImage files : ', files);
    console.log('uploadImage target : ', target);

    dispatch(
      postImageAction({
        target: {
          ...target,
          files
        }
      })
    );
  };

  const setMemberAddress = data => {
    const { name, values} = data
    const {
      postCode: mbZcd,
      addData: mbAddrEnc,
      detailText: mbDtlAddrEnc,
    } = values;

    dispatch(putAuctionMemberPropsAction({
      name,
      values : {mbZcd, mbAddrEnc, mbDtlAddrEnc}
    }))
  }

  return (
    <AppLayout>
      <div className="content-wrap auction-membership-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="tabmenu tp1">
            <ul className="ui-tab col-2">
              <li className="on tabTitle1">
                <Link href="/mypage/dealer/autoauction/memberGuide">
                  <a>경매회원안내</a>
                </Link>
              </li>
              <li className="tabTitle2">
                <Link href="/mypage/dealer/autoauction/currentState">
                  <a>경매장 이용 현황</a>
                </Link>
              </li>
            </ul>

            <div className="mypage-admin-title auction-membership-condition">
              <div className="sub-tit-wrap">
                <p>경매회원 신청 진행 상황입니다.</p>
              </div>
            </div>

            <Steps
              className="auction-membership-progress"
              type={1}
              contents={['서류심사 중', '가입승인 중', '가입완료']}
              subContents={[
                '필요 서류를 제출하시면\n자격심사가 이루어지고,\n결과는 24시간 이내에 유선으로\n통보하여 드립니다.',
                '보증금과 연회비를\n입금하시면 회원번호를\n부여해 드립니다.',
                '가입승인이 완료된 이후\n경매장 이용 교육 수료 이후\n스마트옥션에 참여하실 수\n있습니다.'
              ]}
              active={step}
            />

            {memberState?.MEMBSTATCD == '04' && (
              <div className="auction-membership-send-back">
                <h4 className="h4-tit">[심사반려처리]</h4>
                <p>잘못된 사업자등록증 사본 업로드로 인해 반려처리 합니다. 내용 확인 후 재 업로드 및 등록하여 주시기 바랍니다.</p>
              </div>
            )}

            {step === 1 && (
              <>
                <h4 className="h4-tit mt40">서류 업로드</h4>
                <div className="auction-document-form">
                  <p className="tx-exp-tp2">아래의 서류를 업로드 하셔야 원활한 회원가입이 진행됩니다. (파일확장자는 JPG만 가능합니다.)</p>
                  <div className="btn-set">
                    <Button
                      radius={true}
                      size="mid"
                      line="gray"
                      color="darkgray"
                      title="위임장
                      다운로드"
                      width={160}
                      // onClick={() => downloadFile(`${frontUrl}/pdf/warrant.pdf`)}
                      target="_blank"
                      href='/pdf/warrant.pdf'
                    />
                    <Button
                      radius={true}
                      size="mid"
                      line="gray"
                      color="darkgray"
                      title="회원가입서약서
                      다운로드"
                      width={160}
                      // onClick={() => downloadFile(`${frontUrl}/pdf/pledge.pdf`)}
                      target="_blank"
                      href='/pdf/pledge.pdf'
                    />
                  </div>
                </div>

                <form ref={formRef}>
                  <AuctionDocumentUploader onChange={uploadImage} />
                </form>

                <h4 className="h4-tit mt40">방문 시 제출서류</h4>
                <p className="tx-exp-tp2">아래의 필수서류는 미제출시 최종가입이 불가하오니 이점 양해 부탁드립니다.</p>
                <table summary="서류 업로드" className="table-tp1">
                  <caption className="away">서류 업로드</caption>
                  <colgroup>
                    <col width="240px" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>
                        {/* 조건을 아직 모름 */}
                        {true ? '개인사업자' : '일반사업자'}
                      </th>
                      <td>{true ? '인감증명서(개인), 주민등록등본(개인)' : '인감증명서/주민등록등본(법인), 인감증명서, 주민등록등본(신청인)'}</td>
                    </tr>
                  </tbody>
                </table>
                <p className="tx-exp-tp2">
                  * 가입자와 신청자가 다른 경우 신청인의 인감증명서, 주민등록등본, 위임장(사업자 인감날인)을 반드시 지참하여 주시기 바랍니다.
                  <br />
                  사진은 최근 3개월 이내 촬영본, 서류는 최근 1개월 이내 발급분으로 준비하시기 바랍니다.
                </p>

                <AuctionMemberInfo item={auctMbInfo} getAddress={setMemberAddress} onChange={inputMemberInfo} agree={agree} />

                <Buttons align="right" marginTop={48}>
                  <Button size="big" background="blue80" title="등록" width={127} height={60} buttonMarkup={true} onClick={register} />
                </Buttons>
              </>
            )}

            {step === 2 && (
              <>
                <div className="auction-membership-approval">
                  <h2 className="h2-tit">
                    <strong className="tx-blue80">가입 승인</strong>이 <strong className="tx-blue80">진행 중</strong> 입니다.
                  </h2>
                  <p>[회원번호 : {memberState?.MEMBCUSTNO}]</p>
                </div>
                <div className="auction-payment-guidance">
                  <h4>
                    <i className="ico-dot mid"></i> 보증금 및 연회비 납부
                  </h4>
                  <ul>
                    <li>
                      - 보증금 : <strong>300만원</strong>
                    </li>
                    <li>
                      - 연회비 : <strong>25만원(부가세포함)</strong>
                    </li>
                    <li>
                      - 납부계좌 : <strong className="tx-blue80">903-548385-566</strong> <strong>KEB하나은행 현대글로비스(주)</strong>
                    </li>
                  </ul>
                  <h4>
                    <i className="ico-dot mid"></i> 방문 시 서류 제출 및 현장 교육 수료
                  </h4>
                  <ul>
                    <li>
                      - 지참서류 : <strong className="tx-blue80">인감증명서, 주민등록등본</strong>
                    </li>
                    <li>- 가입자와 신청자가 다른 경우 신청인의 인감증명서, 주민등록등본, 사업자 인감날인한 위임장(서식다운로드)을 반드시 지참하여 주시기 바랍니다.</li>
                    <li>- 현장교육 일정은 유선상으로 안내 드리겠습니다.</li>
                  </ul>
                </div>
                <Buttons align="center" marginTop={40}>
                  <Button size="big" background="blue80" title="확인" width={127} height={60} nextLink={true} href="/mypage/dealer/autoauction/memberGuide" />
                </Buttons>
              </>
            )}

            {step === 3 && (
              <>
                <p className="tx-c mt80" style={{ lineHeight: '140%', fontSize: '20px' }}>
                  참여방법, 응찰기 사용 요령, 수수료, 클레임, 명의이전, 세금계산서, 회원탈퇴 등<br />
                  경매장 이용에 대한 전반적인 안내를 해드립니다.
                </p>
                <Buttons align="center" marginTop={80}>
                  <Button size="big" background="blue80" title="확인" width={127} height={60} nextLink={true} href="/mypage/dealer/autoauction/memberGuide" />
                </Buttons>
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

documentEvaluation.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { reduxStore } = helper

  await 
    helper
    .accessControl()
    .dispatch(getMyAuctionMemberStateAction(), getMbInfoAction())
    
  const { auctionMember : { memberState } } = reduxStore.getState()
  console.log('memberState :::::::::::::::: ', memberState)

  if(memberState.MEMBSTATCD === '01'){
    helper.redirect('/mypage/dealer/autoauction/joinComplete')
  }

  //회원정보 검색 후 옥션가입 회원이 아니면  /mypage/dealer/autoauction/memberGuide 페이지로 이동
  // const [memberState, memberInfo] = await Promise.all([
  //   selectMyAuctionMemberState().then((res) => res?.data?.data),
  //   selectMbInfo().then((res) => res?.data?.data?.[0])
  // ]);

  // console.log('memberState : ', memberState);
  // console.log('memberInfo : ', memberInfo);

  return {
    // memberState,
    // memberInfo
  };
};

export default documentEvaluation;
