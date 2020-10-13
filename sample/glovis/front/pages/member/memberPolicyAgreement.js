/**
 * 설명 : 일반&딜러 회원가입 시 회원약관 동의 화면
 * @fileoverview 약관동의
 * @requires :
 * @author D191364
 */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';
import { axiosGet } from '@src/utils/HttpUtils';
import RenderHelper from '@lib/share/render/helper';

import AppLayout from '@src/components/layouts/AppLayout';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { getTmsObj, chkTmsAgrNAgrObj } from '@src/utils/MemberUtil';
import { setMyTms, setMemberType, setMemberSns } from '@src/actions/member/memberAction';

//mobile
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/**
 * 설명 : 일반&딜러 회원가입 시 회원약관 동의 체크 기능
 * @param {}
 * @returns {}
 */

let checkArr = [];
const MemberPolicyAgreement = (response) => {
  const dispatch = useDispatch();
  console.log('checkArr:', checkArr);

  const mbTpcd = useSelector((state) => state.member.mbTpcd);
  const isUSAIp = response.data.isUSAIp;
  const tmsListT = getTmsObj(response.data.data);

  const [policyCheckList] = useState(tmsListT[0]);
  const [policyCntn] = useState(tmsListT[1]);

  const onCheck = (e, val) => {
    checkArr = val;
    console.log('checkArr:', checkArr);
  };

  const onNext = () => {
    const chkTmsAgrNAgrList = chkTmsAgrNAgrObj(policyCheckList, checkArr);
    if (!isEmpty(chkTmsAgrNAgrList)) {
      const agrObj = chkTmsAgrNAgrList[0];
      const agrNObj = chkTmsAgrNAgrList[1];
      dispatch(setMyTms(agrObj, agrNObj));

      if (isUSAIp === 'Y' && mbTpcd === '0010') {
        Router.push('/member/personalMemberInfoU').then(() => {
          window.scrollTo(0, 0);
        });
      } else {
        Router.push('/member/memberOneselfCertify').then(() => {
          window.scrollTo(0, 0);
        });
      }
    }
  };

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    console.log('mbTpcd ================ ', mbTpcd);
    console.log('mbTpcd ================ ', mbTpcd);
    console.log('mbTpcd ================ ', mbTpcd);
    console.log('mbTpcd ================ ', mbTpcd);
    console.log('mbTpcd ================ ', mbTpcd);
    console.log('mbTpcd ================ ', mbTpcd);
    if (mbTpcd === '') {
      //alert('잘못된 접근입니다.');
      Router.push('/member/choiceMemberType').then(() => {
        window.scrollTo(0, 0);
      });
    }
  }, []);

  //mobile
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '회원가입 신청',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#ffffff'
      }
    });

    // 풀페이지 팝업 START
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [fpTerms, setFpTerms] = useState(false); // 약관 팝업
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [seq, setSeq] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleFullpagePopup = useCallback(
      (name, seq) => (e) => {
        e.preventDefault();
        if (name === 'terms') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: policyCheckList[seq].title,
              options: ['close']
            }
          });
          setSeq(seq);
          setFpTerms(true);
        }
      },
      [fpTerms]
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);

    return (
      <AppLayout>
        <Steps type={1} contents={['약관동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} mode="stick" />
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <form className="register-form">
              <SignUpCheckBoxGroup
                sub_title="필수약관만 동의합니다."
                sub_id="chk-agree-essential"
                title="전체동의 합니다."
                id="chk-agree-all"
                agree_list={policyCheckList}
                agree_term={policyCntn}
                onChange={onCheck}
                events={[handleFullpagePopup('terms', 0), handleFullpagePopup('terms', 1), handleFullpagePopup('terms', 2), handleFullpagePopup('terms', 3), handleFullpagePopup('terms', 4)]}
              />
            </form>
            <Button className="fixed" size="full" background="blue80" title="다음" buttonMarkup={true} onClick={onNext} />
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: policyCntn[seq] }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>
                {mbTpcd === '0010' ? '일반' : '딜러'}
                회원 가입
              </h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} marginTop={59} />
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>이용약관 및 개인정보수집 및 이용에 관한 동의</h4>
            </div>
            <form className="register-form">
              {/* 약관 */}
              <SignUpCheckBoxGroup
                sub_title="필수 약관 동의"
                sub_id="chk-agree-essential"
                title="약관 전체 동의"
                id="chk-agree-all"
                agree_list={policyCheckList}
                agree_term={policyCntn}
                onChange={onCheck}
              />
            </form>
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="다음으로" width={180} height={60} buttonMarkup={true} onClick={onNext} />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

MemberPolicyAgreement.getInitialProps = async (http) => {
  const { dispatch } = http.reduxStore;
  const helper = new RenderHelper(http);
  const { query } = helper;
  // const { req, reduxStore } = http;
  // const query = req?.query || http?.query || '';

  console.log('query ;;;;;;;;;;;;;; ', query);
  //약관 불러 오기
  const tpcd = query.mbTpcd === '0010' ? '0020' : '0030';
  const url = `/api/member/selectTmsList.do?tpcd=${tpcd}`;
  const res = await axiosGet(url, null, false);
  if ((query?.isSnsReg || 'N') === 'Y') {
    await dispatch(setMemberType('0010'));
    await dispatch(setMemberSns({ mbSnsId: query.mbSnsId, mbSnsKncd: query.mbSnsKncd }));
  }

  return {
    data: res.data
  };
};

export default MemberPolicyAgreement;
