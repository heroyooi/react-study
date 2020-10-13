/**
 * 설명 : 딜러 정보 변경
 * @fileoverview 딜러 정보 변경
 * @requires memberMngAction
 * @author D191364
 */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import { axiosPost, axiosGet, apiUrl } from '@src/utils/HttpUtils';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import ConfirmPassWd from '@src/components/member/ConfirmPassWd';
import MemberBaseInfo from '@src/components/member/MemberBaseInfo';
import MemberDealerInfo from '@src/components/member/MemberDealerInfo';
import MemberAddInfo from '@src/components/member/MemberAddInfo';
import MemberTms from '@src/components/member/MemberTms';

import { chkEmlAddr, getTmsObj, chkMbBrn, chkTmsAgrNAgrObj, getSplitObj } from '@src/utils/MemberUtil';
import { SystemContext } from '@src/provider/SystemProvider';

//mobile
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import FindAddress from '@src/components/common/popup/FindAddress';

/**
 * 설명 : 딜러 정보 변경
 * @param { inputs , files} 입력 정보
 * @returns {myMbInfo} 딜러 정보
 */
const ChangeMember = (response) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '회원정보 수정',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 56,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  //const memberInfoPwd = useSelector((state) => state.memberMng.memberInfoPwd)
  const { memberInfoPwd } = useSelector((state) => ({
    memberInfoPwd: state.memberMng.memberInfoPwd
  }));
  const { showAlert, showLoader, hideLoader } = useContext(SystemContext);
  const [accountChk, setAccountChk] = useState(false);

  console.log('accountChk:', accountChk);
  console.log('memberInfoPwd:', memberInfoPwd);
  const tmsListT = getTmsObj(response.data.data, memberInfoPwd ? Object(memberInfoPwd.cnsnYn === 'Y' ? '0830' : '') : '');
  const signupCheckList1 = tmsListT[0];

  // eslint-disable-next-line no-unused-vars
  const [rodalAlertMsg, setRodalAlertMsg] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [rodalShowAlert, setRodalShowAlert, rodalPopupHandlerAlert, modalCloseHandlerAlert] = useRodal(false, false);

  const [inputs, setInputs] = useState({
    mbEmlAddrEnc: '', //이메일
    mbZcd: '', //우편번호
    mbAddrEnc: '', //주소
    mbDtlAddrEnc: '', //상세주소
    entrCorpNm: '', //상사명
    reprNm: '', //대표명
    mbBrn: '', //사업자등록번호
    mbEn: '', //종사원번호
    enVldStrtDt: '', //종사원번호 유효기간 시작일
    mbEnEprYmd: '', //종사원번호 유효기간
    mbStrZcd: '', //판매점 우편번호
    mbStrAddr: '', //판매점 주소
    mbStrDtlAddr: '', //판매점 상세주소
    mbStrPn1: '', //판매점 연락처
    mbStrPn2: '', //판매점 연락처
    mbStrPn3: '', //판매점 연락처
    mbStrFaxno1: '', //판매점 팩스번호
    mbStrFaxno2: '', //판매점 팩스번호
    mbStrFaxno3: '', //판매점 팩스번호
    mbStrSlHmCntn: '', //판매점 영업시간
    mbProfFileOpYn: '', //프로필 사진 공개여부
    seqNo: '' //매매단지
  });

  const {
    mbEmlAddrEnc,
    mbZcd,
    mbAddrEnc,
    mbDtlAddrEnc,
    entrCorpNm,
    reprNm,
    mbBrn,
    mbEn,
    enVldStrtDt,
    mbEnEprYmd,
    mbStrZcd,
    mbStrAddr,
    mbStrDtlAddr,
    mbStrPn1,
    mbStrPn2,
    mbStrPn3,
    mbStrFaxno1,
    mbStrFaxno2,
    mbStrFaxno3,
    mbStrSlHmCntn,
    seqNo
  } = inputs; // 비구조화 할당을 통해 값 추출

  const [bankInputs, setBankInputs] = useState({
    mbBankcd: '', //은행코드
    mbAcntnoEnc: '', //계좌번호
    mbDpstNm: '' //예금주
  });
  const { mbBankcd, mbAcntnoEnc, mbDpstNm } = bankInputs;

  //msgs
  const initMsgs = {
    chkEmlMsg: '',
    chkAddrMsg: '',
    chkCmplxMsg: '',
    chkEntrMsg: '',
    chkMbBrnMsg: '',
    chkMbEnMsg: '',
    chkStrAddrMsg: '',
    chkStrPnMsg: '',
    chkStrFaxnoMsg: '',
    chkStrSlHmCntnMsg: ''
  };
  const [msgs, setMsgs] = useState(initMsgs);

  const { chkEmlMsg, chkAddrMsg, chkCmplxMsg, chkEntrMsg, chkMbBrnMsg, chkMbEnMsg, chkStrAddrMsg, chkStrPnMsg, chkStrFaxnoMsg, chkStrSlHmCntnMsg } = msgs;

  const onChange = (e) => {
    if (e.target) {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInputs(
        produce((draft) => {
          draft[name] = value;
        })
      );
    } else {
      for (const [key, value] of Object.entries(e)) {
        if (['mbBankcd', 'mbAcntnoEnc', 'mbDpstNm'].includes(key)) {
          setAccountChk(false);
          setBankInputs(
            produce((draft) => {
              draft[key] = value;
            })
          );
        } else {
          setInputs(
            produce((draft) => {
              draft[key] = value;
            })
          );
        }
      }
    }
  };

  //계좌인증
  const onClick = () => {
    if (isEmpty(mbBankcd)) {
      alert('은행코드를 선택하세요.');
    } else if (isEmpty(mbAcntnoEnc)) {
      alert('계좌번호를 입력하세요.');
    } else if (isEmpty(mbDpstNm)) {
      alert('예금주를 입력하세요.');
    } else {
      const accountChkData = {
        banksett: mbBankcd,
        noacct: mbAcntnoEnc,
        nmcomp: mbDpstNm,
        rltURL: `${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`
      };
      console.log('accountChkData >>>', accountChkData);
      axiosPost('/api/admin/homeservice/callUrlConnection.do', accountChkData).then(({ data }) => {
        console.log('accountChk Request >>>>', data);
        console.log(`accountChk Return URL >>> ${apiUrl}/api/admin/homeservice/receiveUrlConnection.do`);
        if (data.statusinfo.returncd === 'SYS9999') {
          setAccountChk(false);
          showAlert('서버와 접속이 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.');
          return;
        }
        if (data.statusinfo.returncd === '000') {
          setAccountChk(true);
          showAlert('인증 되었습니다.');
          /*
        } else if (data.data.strRet === '103') {
          setAccountChk(false);
          showAlert('계좌번호 또는 예금주명이 불일치 합니다.', 'error');
        */
        } else {
          setAccountChk(false);
          showAlert('인증에 실패하였습니다.');
          //showAlert(data.data.strErrMsg, 'error');
        }
      });
    }
  };

  //약관
  let checkArr = [];
  const onCheck = (e, val) => {
    if (e.target.checked) {
      checkArr = val;
    } else {
      checkArr = '';
    }
  };

  const chkValidation = () => {
    const rtnEmlMsg = chkEmlAddr(mbEmlAddrEnc);
    const rtnBrnMsg = chkMbBrn(mbBrn);
    // 사용자 알림메세지 초기화
    setMsgs(Object.assign({}, initMsgs));
    if (!seqNo) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkCmplxMsg, ['chkCmplxMsg']: '매매단지를 선택해주세요' });
    } else if (!isEmpty(rtnEmlMsg)) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkEmlMsg, ['chkEmlMsg']: rtnEmlMsg });
    } else if (!mbZcd || !mbAddrEnc || !mbDtlAddrEnc) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkAddrMsg, ['chkAddrMsg']: '주소를 입력해주세요' });
      //소속단지체크 필요
    } else if (!entrCorpNm) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkEntrMsg, ['chkEntrMsg']: '소속상사명을 입력하세요' });
    } else if (!reprNm) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkEntrMsg, ['chkEntrMsg']: '소속상사 대표자명을 입력하세요' });
    } else if (!isEmpty(rtnBrnMsg)) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkMbBrnMsg, ['chkMbBrnMsg']: rtnBrnMsg });
    } else if (!mbEn) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호를 입력하세요' });
    } else if (!enVldStrtDt) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호 유효기간을 입력하세요' });
    } else if (!mbEnEprYmd) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkMbEnMsg, ['chkMbEnMsg']: '종사원증번호 유효기간을 입력하세요' });
    } else if (!mbStrZcd || !mbStrAddr || !mbStrDtlAddr) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkStrAddrMsg, ['chkStrAddrMsg']: '판매점 주소를 입력해주세요' });
    } else if (!mbStrPn1 || !mbStrPn2 || !mbStrPn3) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkStrPnMsg, ['chkStrPnMsg']: '판매점 연락처를 입력하세요' });
    } else if (!mbStrFaxno1 || !mbStrFaxno2 || !mbStrFaxno3) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkStrFaxnoMsg, ['chkStrFaxnoMsg']: '판매점 팩스를 입력하세요' });
    } else if (!mbStrSlHmCntn) {
      // eslint-disable-next-line no-dupe-keys
      setMsgs({ chkStrSlHmCntnMsg, ['chkStrSlHmCntnMsg']: '판매점 영업시간을 입력하세요' });
    } else {
      return true;
    }
  };

  const handleSave = useCallback(
    (e) => {
      e.preventDefault();
      console.log('inputs:', inputs);
      console.log('accountChk:', accountChk);

      if (chkValidation(e)) {
        const chkTmsAgrNAgrList = chkTmsAgrNAgrObj(signupCheckList1, checkArr);
        const agrObj = chkTmsAgrNAgrList[0];
        const agrNObj = chkTmsAgrNAgrList[1];
        const account = accountChk ? bankInputs : { mbBankcd: '', mbAcntnoEnc: '', mbDpstNm: '' };

        console.log('account:', account);

        const paramObj = {
          ...inputs,
          ...account,
          agrList: agrObj,
          agrNList: agrNObj,
          mbStrPn: mbStrPn1 + '-' + mbStrPn2 + '-' + mbStrPn3,
          mbStrFaxno: mbStrFaxno1 + '-' + mbStrFaxno2 + '-' + mbStrFaxno3
        };
        console.log('paramObj:', paramObj);
        const fileData = new FormData();
        for (const key in paramObj) {
          if (paramObj[key] !== undefined && paramObj[key] instanceof File) fileData.append(key, paramObj[key]);
        }
        //fileupload
        axiosPost('/api/member/insertMemberFile.do', fileData).then(({ data }) => {
          console.log('insertMbFile data:', data);
          if (data.statusinfo.returncd === 'SUCCESS') {
            delete paramObj.mbEnFrnFileIdList;
            delete paramObj.mbEnBckFileIdList;
            delete paramObj.mbCertFileIdList;
            delete paramObj.mbProfFileIdList;

            const fileObj = data.data;
            for (const key in fileObj) {
              if (!isEmpty(fileObj[key])) paramObj[key] = fileObj[key];
            }

            axiosPost(`/api/member/updateMemberInfo.do`, paramObj).then((payload) => {
              console.log('payload:', payload);
              if (payload.data.data > 0) {
                showAlert('회원정보가 정상적으로 수정되었습니다', () => {
                  if(response?.query?.backUrl){
                    console.log('backUrl이 있을 경우')
                    showConfirm('작성중이던 페이지로 이동하시겠습니까?', async () => {
                      showLoader()
                      globalThis.window.location.href = response?.query?.backUrl
                      // hideLoader()
                    })
                  } else {
                    if (hasMobile === true) {
                      window.location.href = '/mypage/dealer/sellcar/carManagement?management=dealerMain';
                    } else {
                      window.location.href = '/mypage/dealer/sellcar/carManagement';
                    }
                  }
                });
                /*const url = '/mypage/dealer/sellcar/carManagement';
              Router.push({ pathname: url, query: {} }, url).then(() => {
                window.scrollTo(0, 0);
              });*/
              } else {
                showAlert(`수정에 실패했습니다.` + payload.data.returncd);
              }
            });
          } else {
            //alert(data.statusinfo.returnmsg);
            console.log(data.statusinfo.returnmsg);
          }
        });
      }
    },
    [accountChk, bankInputs, checkArr, chkValidation, hasMobile, inputs, mbStrFaxno1, mbStrFaxno2, mbStrFaxno3, mbStrPn1, mbStrPn2, mbStrPn3, showAlert, signupCheckList1]
  );

  const closeAlertPopup = useCallback(
    (e) => {
      e.preventDefault();
      setRodalShowAlert(false);
    },
    [setRodalShowAlert]
  );

  useEffect(() => {
    if (!isEmpty(memberInfoPwd)) {
      setInputs(
        produce((draft) => {
          const params = Object.getOwnPropertyNames(inputs);
          params.forEach((inputs) => {
            if (inputs === 'mbStrPn1') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrPn, '-')[0];
            } else if (inputs === 'mbStrPn2') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrPn, '-')[1];
            } else if (inputs === 'mbStrPn3') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrPn, '-')[2];
            } else if (inputs === 'mbStrFaxno1') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrFaxno, '-')[0];
            } else if (inputs === 'mbStrFaxno2') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrFaxno, '-')[1];
            } else if (inputs === 'mbStrFaxno3') {
              draft[inputs] = getSplitObj(memberInfoPwd.mbStrFaxno, '-')[2];
            } else {
              draft[inputs] = memberInfoPwd[inputs];
            }
          });
        })
      );

      setBankInputs(
        produce((draft) => {
          const params = Object.getOwnPropertyNames(bankInputs);
          params.forEach((bankInputs) => {
            draft[bankInputs] = memberInfoPwd[bankInputs];
          });
        })
      );

      if (!isEmpty(memberInfoPwd.mbBankcd) && !isEmpty(memberInfoPwd.mbAcntnoEnc) && !isEmpty(memberInfoPwd.mbDpstNm)) {
        setAccountChk(true);
      }
    }
  }, [memberInfoPwd]);

  console.log('accountChk:', accountChk);

  /*
  useEffect(() => {
    if(saveRtn === 1) {
      alert("회원정보가 정상적으로 수정되었습니다")      
      Router.push('/main').then(() => {
        window.scrollTo(0, 0);
      });
    } else if (saveRtn === 0) {   
      alert("잘못된 정보입니다")      
      Router.push('/main').then(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [saveRtn])
*/

  //mobile
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [sendAddress, setSendAddress] = useState([]);
  const [sendStrAddress, setSendStrAddress] = useState([]);
  const [fpAddress, setFpAddress] = useState(false);
  const [fpStrAddress, setFpStrAddress] = useState(false);
  const [fpTerms, setFpTerms] = useState(false);
  const [memberTmsInfoCont, setMemberTmsInfoCont] = useState('');

  const handleFullpagePopup = useCallback((name, e, cont = null) => {
    e.preventDefault();
    if (name === 'address') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '주소검색',
          options: ['close']
        }
      });
      setFpTerms(false);
      setFpAddress(true);
      setFpStrAddress(false);
    } else if (name === 'strAddress') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '주소검색',
          options: ['close']
        }
      });
      setFpTerms(false);
      setFpAddress(false);
      setFpStrAddress(true);
    } else if (name === 'terms') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '마케팅 활용 동의',
          options: ['close']
        }
      });
      setFpTerms(true);
      setFpAddress(false);
      setFpStrAddress(false);
      setMemberTmsInfoCont(cont);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFpTermsClose = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );

  const addressCallback = useCallback(
    (e, result, target) => {
      e.preventDefault();
      setFpAddress(false);
      setFpStrAddress(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      if (target === 'address') {
        setSendAddress([result, target]);
      } else {
        setSendStrAddress([result, target]);
      }
    },
    [dispatch]
  );

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap">
          {isEmpty(memberInfoPwd) && <ConfirmPassWd />}

          {!isEmpty(memberInfoPwd) && (
            <div className="mypage-state-sec member-info-modify mt20">
              {/* 회원 기본  */}
              <MemberBaseInfo
                memberInfoPwd={memberInfoPwd}
                onChange={onChange}
                msgObj={msgs}
                sendData={sendAddress}
                handleFullpage={(e) => {
                  handleFullpagePopup('address', e);
                }}
              />

              {/* 딜러 기본  */}
              <MemberDealerInfo memberInfoPwd={memberInfoPwd} onChange={onChange} msgObj={msgs} onClick={onClick} />

              {/* 추가 정보  */}
              <MemberAddInfo
                memberInfoPwd={memberInfoPwd}
                onChange={onChange}
                msgObj={msgs}
                sendData={sendStrAddress}
                handleFullpage={(e) => {
                  handleFullpagePopup('strAddress', e);
                }}
              />

              {/* 회원 약관 */}
              <MemberTms
                memberInfoPwd={memberInfoPwd}
                memberTmsInfo={response.data.data}
                onChange={onCheck}
                handleFullpage={(e, cont) => {
                  handleFullpagePopup('terms', e, cont);
                }}
              />

              <MobBottomArea isFix={true} isSimple={true}>
                <Buttons align="center" className="full">
                  <Button size="big" background="blue20" color="blue80" title="취소" height={56} href={'/mypage/dealer/sellcar/carManagement?management=dealerMain'} nextLink={true} />
                  <Button size="big" background="blue80" title="변경" height={56} onClick={handleSave} />
                </Buttons>
              </MobBottomArea>
            </div>
          )}
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">{memberTmsInfoCont}</div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpAddress && <FindAddress AddressEvent={addressCallback} target="address" />}
          {fpStrAddress && <FindAddress AddressEvent={addressCallback} target="strAddress" />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />
        {isEmpty(memberInfoPwd) && <ConfirmPassWd />}

        {!isEmpty(memberInfoPwd) && (
          <div className="mypage-state-sec member-info-modify">
            <div className="mypage-admin-title">
              <h3>회원정보 수정</h3>
            </div>

            {/* 회원 기본  */}
            <MemberBaseInfo memberInfoPwd={memberInfoPwd} onChange={onChange} msgObj={msgs} />

            {/* 딜러 기본  */}
            <MemberDealerInfo memberInfoPwd={memberInfoPwd} onChange={onChange} msgObj={msgs} onClick={onClick} />

            {/* 추가 정보  */}
            <MemberAddInfo memberInfoPwd={memberInfoPwd} onChange={onChange} msgObj={msgs} />

            {/* 회원 약관 */}
            <MemberTms memberInfoPwd={memberInfoPwd} memberTmsInfo={response.data.data} onChange={onCheck} />

            {/* 약관 
          <SignUpCheckBoxGroup
              sub_id=""
              id=""
              agree_list={signupCheckList1}
              agree_term={auction_check_term1}
              onChange={onCheck}
            />     */}

            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={248} height={60} href="/mypage/dealer/sellcar/carManagement" />
              <Button size="big" background="blue80" title="수정완료" width={248} height={60} buttonMarkup={true} onClick={handleSave} />
            </Buttons>
          </div>
        )}

        <RodalPopup show={rodalShowAlert} type={'fade'} width={375} closedHandler={modalCloseHandlerAlert} mode="normal" isMask={false} isButton={false}>
          <div className="con-wrap compact">
            <p>{rodalAlertMsg}</p>
            <Buttons align="center" marginTop={30}>
              <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
            </Buttons>
          </div>
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

ChangeMember.getInitialProps = async () => {
  //약관 불러 오기
  const url = `/api/member/selectTmsList.do?tpcd=0030&tmsDiv=0830`;
  const res = await axiosGet(url, null);

  return {
    data: res.data
  };
};
export default ChangeMember;
