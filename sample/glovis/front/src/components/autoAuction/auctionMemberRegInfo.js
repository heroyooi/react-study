/**
 * 설명 : 경매회원 정보입력
 * @fileoverview 경매회원 정보입력
 * @author 최승희
 * @requires AuctionMemberInfo
 */

import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import qs from 'qs';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RenderHelper from '@lib/share/render/helper';
import { createValidator } from '@lib/share/validator';
import AuctionMemberSchema from '@lib/share/validator/mypage/dealer/AuctMb';
import AuctionCorpSchema from '@lib/share/validator/mypage/dealer/AuctMbCorp';

import AuctionMemberInfo from '@src/components/mypage/dealer/DealerAuction/AuctionMemberInfo';
import AuctionStoreInfo from '@src/components/mypage/dealer/DealerAuction/AuctionStoreInfo';
import AuctionCheckPast from '@src/components/mypage/dealer/DealerAuction/AuctionCheckPast';

import { inputAuctionObjectProp, putAuctionMemberPropsAction, postMyAuctionMemberInfoAction } from '@src/actions/mypage/dealer/auction/auctionMemberAction';
import { selectMbInfo, insertAutoAuctionJoin } from '@src/api/mypage/dealer/AuctionApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { setHpPnFormat } from '@src/utils/MemberUtil';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';

const validator = createValidator(
  {
    ...AuctionMemberSchema,
    ...AuctionCorpSchema
  },
  {
    required: [
      'mbNm',
      'mbAddrEnc',
      'mbDtlAddrEnc',
      'mbHpPnEnc',
      'zcd',
      'mbBankcd',
      'mbAcntnoEnc',
      'corpNm',
      'corpReprNm',
      'vstLocCd',
      'entrDivCd',
      'bstpCd',
      'bankCd',
      'corpAccNoEnc',
      'dpst',
      'corpTelNo',
      'emailAddr',
      'mbZcd',
      'addrEnc',
      'dtlAddrEnc',
      'brn'
    ]
  }
);

const AuctionMemberRegInfo = ({ memberinfo = {}, item = {}, onChange }) => {
  const { mbCiO, mbNmO, mbHpPnEncO, mbBirth } = item;
  const { showAlert, showConfirm, showLoader, showLoginForm, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const dispatch = useDispatch();
  const auctionMember = useSelector((RootStore) => RootStore.auctionMember);
  const { auctMbInfo, auctMbCorpInfo } = auctionMember;
  const [agreeUsingAccount, setAgreeUsingAccount] = useState(false);

  useEffect(() => {
    console.log('memberinfo : ', memberinfo);
    const { mbNm, mbZcd, mbAddrEnc, mbDtlAddrEnc, mbHpPnEnc, mbCi, brn, entrDivCd = '02' } = memberinfo;

    dispatch(
      putAuctionMemberPropsAction({
        name: 'auctMbInfo',
        values: {
          mbNm: mbNmO,
          mbZcd,
          mbAddrEnc,
          mbDtlAddrEnc,
          mbHpPnEnc: setHpPnFormat(mbHpPnEncO),
          mbCi: mbCiO,
          mbBirth,
          brn
        }
      })
    );

    dispatch(
      putAuctionMemberPropsAction({
        name: 'auctMbCorpInfo',
        values: {
          entrDivCd,
          brn
        }
      })
    );
  }, []);

  useEffect(() => {
    return () => {
      initAlert();
      initConfirm();
    };
  }, []);

  const inputMemberInfo = (e) => {
    const { value, name } = e.target;
    console.log('memberInfo -> value', value);
    console.log('memberInfo -> name', name);
    dispatch(
      inputAuctionObjectProp({
        state: 'auctMbInfo',
        value,
        name
      })
    );
  };

  const inputStoreInfo = (e) => {
    const { value, name, checked } = e.target;
    dispatch(
      inputAuctionObjectProp({
        state: 'auctMbCorpInfo',
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

  const setMemberAddress = (data) => {
    const { name, values } = data;
    const { postCode: mbZcd, addData: mbAddrEnc, detailText: mbDtlAddrEnc } = values;

    dispatch(
      putAuctionMemberPropsAction({
        name,
        values: { mbZcd, mbAddrEnc, mbDtlAddrEnc }
      })
    );
  };

  const setStoreAddress = (data) => {
    const { name, values } = data;
    const { postCode: zcd, addData: addrEnc, detailText: dtlAddrEnc } = values;

    dispatch(
      putAuctionMemberPropsAction({
        name,
        values: { zcd, addrEnc, dtlAddrEnc }
      })
    );
  };

  const goNextStep = (e) => {
    console.log('goNextStep -> auctMbInfo', auctMbInfo);
    console.log('goNextStep -> auctMbCorpInfo', auctMbCorpInfo);

    if (!agreeUsingAccount) {
      showAlert('계좌번호 정책에 동의하셔야 합니다');
      return;
    }

    const valid = validator.validate({
      ...auctMbInfo,
      ...auctMbCorpInfo
    });

    console.log('valid : ', valid);
    const { error } = valid;

    if (error) {
      console.log('error : ', error);
      showAlert(`[${error?.[0]?.label}] ` + error?.[0]?.messages?.[0] || '에러가 발생했습니다');
    } else {
      showConfirm('저장 후, 다음단계로 이동하시겠습니까?', async () => {
        showLoader();
        const memberAdd = auctMbInfo?.mbAddrEnc?.split(' ');
        const addMbInfo = {
          ...auctMbInfo,
          mbAddrA1: memberAdd.shift(),
          mbAddrA2: memberAdd.shift(),
          mbAddrA3: memberAdd.join(' ')
        };

        const storeAdd = auctMbCorpInfo?.addrEnc?.split(' ');
        const addStoreInfo = {
          ...auctMbCorpInfo,
          compAddrA1: storeAdd.shift(),
          compAddrA2: storeAdd.shift(),
          compAddrA3: storeAdd.join(' ')
        };

        const dataForm = {
          ...addMbInfo,
          ...addStoreInfo
        };

        if (!isLoginLiveCheck()) {
          insertAutoAuctionJoin(dataForm).then((res) => {
            if (res.data.statusinfo.returncd === '000') {
              if (onChange) onChange(4, res.data.data, 'memberReg');
            } else {
              showAlert('가입신청에 실패했습니다.');
            }
          });
        } else {
          const { data, statusinfo } = await dispatch(postMyAuctionMemberInfoAction(dataForm)).then((res) => res?.data);

          console.log('data : ', data);
          console.log('statusinfo : ', statusinfo);

          if (statusinfo.returncd === '000') {
            // await Router.push(nextPage + '?' + qs.stringify(data), nextPage).then(() => {
            //   window.scrollTo(0, 0);
            // });
            if (onChange) onChange(4, data, 'memberReg');
          } else if (statusinfo?.returncd === 'MBR4005') {
            showLoginForm(Router.router.asPath, (data) => {
              console.log('loginCallback data ::::: ', data);
              if (data?.isLogin) {
                goNextStep();
              } else {
                showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다');
              }
            });
          } else {
            showAlert('가입신청에 실패했습니다.');
          }
        }
        hideLoader();
      });
    }
  };

  return (
    <>
      <h4 className="h4-tit mb16">기본정보</h4>
      <AuctionMemberInfo item={auctMbInfo} getAddress={setMemberAddress} onChange={inputMemberInfo} agree={agree} />

      <h4 className="h4-tit mt40 mb10">업체정보</h4>
      <p className="tx-exp-tp2 mb16" style={{ lineHeight: '140%' }}>
        가입자가 업체 대표자가 아닌 경우 대표자의 위임장(인감 직인 날인)이 필요하며, 최종가입승인을 위해 현장가입 시 가입자와 대표자의 인감증명서 각 1장씩 지참
        <br />
        또는 발송하셔야합니다.
      </p>

      <AuctionStoreInfo item={auctMbCorpInfo} getAddress={setStoreAddress} onChange={inputStoreInfo} />

      <p className="tx-exp-tp2 mt40 mb16">과거에 가입했던 사실이 있는 경우에만 체크해주세요.</p>

      <AuctionCheckPast item={auctMbInfo} onChange={inputMemberInfo} />

      <Buttons align="right" marginTop={48}>
        <Button size="big" background="blue80" title="다음" width={127} height={60} buttonMarkup={true} onClick={goNextStep} />
      </Buttons>
    </>
  );
};

AuctionMemberRegInfo.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, req, url, accessToken } = helper;

  helper.accessControl();

  // const { mbCiO, mbNmO, mbHpPnEncO } = query ?? {}
  const { mbCiO, mbNmO, mbHpPnEncO, mbBirth } = req?.body ?? {};
  // console.log("memberInfo.getInitialProps -> mbCiO", mbCiO)
  // console.log("memberInfo.getInitialProps -> mbNmO", mbNmO)
  // console.log("memberInfo.getInitialProps -> mbHpPnEncO", mbHpPnEncO)
  // if(!mbCiO || !mbNmO || !mbHpPnEncO || !mbBirth){
  //   console.error('인증되지 않은 접근')
  //   helper.redirect('/mypage/dealer/autoauction/oneselfCertify')
  // }

  // const { data } = await selectMbInfo().then((res) => res?.data);
  // console.log("memberInfo.getInitialProps -> mbCiO", mbCiO)
  // console.log('memberInfo data[0].mbCi : ', data[0].mbCi);

  // //V2h869k7UHTE1mDD0dvxusmeO9SkPfwfLMPLYmEg0WrmcnJcBG1mDIzg5x/ibkYGY5rrq0w05k/huDU5mmJP9Q==

  // // // 로그인 아이디와 다른 사람일 경우 본인인증 안되도록함
  // if(mbCiO !== data[0]?.mbCi){
  //   console.log('다른 사람')
  //   helper.redirect('/mypage/dealer/autoauction/oneselfCertify?' + qs.stringify({errorMsg : '회원 정보가 일치하지 않습니다'}))
  // }
  const { data } = await selectMbInfo().then((res) => res?.data);

  return {
    memberinfo: data[0],
    mbCiO,
    mbNmO,
    mbHpPnEncO,
    mbBirth
  };
};

export default AuctionMemberRegInfo;
