/**
 * 평가사(CM) 최초 로그인시 비밀번호 변경, 약관동의
 * @fileOverview 비밀번호 변경
 * @requires memberAction, memberReducer
 * @author D191367
 */

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';

import AppLayout from '@src/components/layouts/AppLayout';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Link from 'next/link';
import { axiosGet } from '@src/utils/HttpUtils';
import { isStrCnt } from '@src/utils/CommonUtil';
import { updatePwdNext, updatePwd } from '@src/actions/member/memberAction';
import pwasWdSchema from '@lib/share/validator/member/PassWd';
import { createValidator } from '@lib/share/validator';
import { gInfoLive } from '@src/utils/LoginUtils';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { getTmsObj, chkTmsAgrNAgrObj } from '@src/utils/MemberUtil';
import { axiosPost } from '@src/utils/HttpUtils';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { console } from 'globalthis/implementation';
import { SystemContext } from '@src/provider/SystemProvider';

let checkArr = [];
const CmInfo = (response) => {
  const myMbInfoData = useSelector((state) => state?.member?.myMbInfoData);
  const mbCi = useSelector((state) => state?.myMbInfoData?.mbCi);
  console.log('CmInfo 약관동의, myMbInfoData=%o', myMbInfoData);
  const isUSAIp = response.data.isUSAIp;
  const tmsListT = getTmsObj(response.data.data);
  console.log('CmInfo 약관데이터 , tmsListT=%o', tmsListT);
  const { showAlert, initAlert } = useContext(SystemContext);

  const [policyCheckList] = useState(tmsListT[0]);
  const [policyCntn] = useState(tmsListT[1]);
  const onCheck = (e, val) => {
    checkArr = val;
    console.log('checkArr:', checkArr);
  };
  const [isPasswdChangeNext, setPasswdChangeNext] = useState(false); //비밀번호 다음에 변경하기

  const mbId = gInfoLive().id;
  console.log('test====================================' + mbId);
  const { mbEnEprDday } = useSelector((state) => ({
    mbEnEprDday: state.member.mbEnEprDday
  }));

  const [errorMsg1, setErrorMsg1] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const [errorMsg3, setErrorMsg3] = useState('');
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    mbPwdEncNew: '',
    mbPwdEnc: '',
    mbPwdEncChk: ''
  });
  const { mbTpcd, mbInfo, agrList, agrNList } = useSelector((state) => ({
    mbTpcd: state.member.mbTpcd,
    mbInfo: state.member.myMbInfoData,
    agrList: state.member.agrList,
    agrNList: state.member.agrNList
  }));

  const { mbPwdEncNew, mbPwdEnc, mbPwdEncChk } = inputs;
  const onChangeAll = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출

    // eslint-disable-next-line eqeqeq
    if (name == 'mbPwdEnc') {
      const valid = passWdValidator1.validate(value);

      if (valid.error) {
        const { details } = valid.error;
        let msg = '현재 비밀번호를 입력하세요.';
        setErrorMsg1(msg);
        setErrorMsg2('');
        setErrorMsg3('');
      } else {
        setErrorMsg1('');
        setErrorMsg2('');
        setErrorMsg3('');
      }
    } else if (name == 'mbPwdEncNew') {
      const valid = passWdValidator2.validate(value);

      if (valid.error) {
        const { details } = valid.error;
        let msg = '새 비밀번호를 입력하세요.';
        setErrorMsg1('');
        setErrorMsg2(msg);
        setErrorMsg3('');
      } else {
        setErrorMsg1('');
        setErrorMsg2('');
        setErrorMsg3('');
      }
    } else if (name == 'mbPwdEncChk') {
      const valid = passWdValidator3.validate(value);
      console.log('valid : ', valid);
      if (valid.error) {
        const { details } = valid.error;
        let msg = '새로운  비밀번호 확인을 입력하세요.';
        setErrorMsg1('');
        setErrorMsg2('');
        setErrorMsg3(msg);
      } else {
        setErrorMsg1('');
        setErrorMsg2('');
        setErrorMsg3('');
      }
    }

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  //다음에 변경하기
  const onChangeNext = useCallback((e) => {
    //메시지 : 약관동의 후 완료버튼을 눌러주세요.

    setPasswdChangeNext(true);
    showAlert('약관동의 후 완료버튼을 눌러주세요.');
    setErrorMsg1('');
    setErrorMsg2('');
    setErrorMsg3('');
    /*
    const paramObj = {
      mbId: mbId
    };
    console.log(paramObj);
    dispatch(updatePwdNext(paramObj));
    Router.push('/main');
    */
  });

  //비밀번호 변경하기
  const checkPasswordChange = () => {
    if (!mbPwdEnc) {
      //alert('현재비밀번호를 입력해주세요')
      setErrorMsg1('현재비밀번호를 입력해주세요.');
      setErrorMsg2('');
      setErrorMsg3('');
      window.scrollTo(0, 0);
      return false;
    } else if (!mbPwdEncNew || !mbPwdEncChk) {
      //alert('비밀번호(비밀번호 확인)를 입력해주세요')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호(비밀번호 확인)를 입력해주세요.');
      window.scrollTo(0, 0);
      return false;
    } else if (mbPwdEncNew !== mbPwdEncChk) {
      //alert('비밀번호가 일치하지 않습니다')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호가 일치하지 않습니다.');
      window.scrollTo(0, 0);
      return false;
    } else if (mbPwdEncNew.indexOf(mbId) > -1) {
      //alert('비밀번호에 아이디를 포함할 수 없습니다') ;
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호에 아이디를 포함할 수 없습니다.');
      window.scrollTo(0, 0);
      return false;
    } else if (mbPwdEncNew === mbPwdEnc) {
      alert('현재 비밀번호와 다른 새로운 비밀번호로 설정해주세요');
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('현재 비밀번호와 다른 새로운 비밀번호로 설정해주세요.');
      window.scrollTo(0, 0);
      return false;
    } else if (chkValidatePwd(mbPwdEncNew, null)) {
      const paramObj = {
        mbPwdEnc: mbPwdEnc,
        mbPwdEncNew: mbPwdEncNew,
        mbPwdEncChk: mbPwdEnc,
        mbId: mbId
      };
      return true;
      /* 완료버튼으로 기능 통합
      const { data } = await axiosPost('/api/member/updatePwd.do', paramObj);

      if (data.result.returncd === '000') {
        setErrorMsg1('');
        setErrorMsg2('');
        setErrorMsg3('비밀번호가 변경되었습니다.');
        Router.push('/main');
      } else {
        setErrorMsg1('');
        setErrorMsg2('');
        //setErrorMsg3(data.result.returnmsg);
        setErrorMsg3('비밀번호 변경중 에러가 발생했습니다.');
      }
      */
    }
  };

  //완료버튼 클릭
  const onNext = async () => {
    //1.본인인증 여부 확인
    if (isEmpty(myMbInfoData) || isEmpty(myMbInfoData.mbCi)) {
      showAlert('본인인증이 필요합니다.');
      Router.push('/member/cmCertify');
      return false;
    }
    //1.비밀번호 변경 확인 isPasswdChangeNext
    if (!isPasswdChangeNext && checkPasswordChange() === false) {
      //mbPwdEnc
      //mbPwdEncNew
      return false;
    }
    //2.약관 동의 체크
    const chkTmsAgrNAgrList = chkTmsAgrNAgrObj(policyCheckList, checkArr); //약관 동의, 미동의 리스트
    console.log('약관 > chkTmsAgrNAgrList=%o', chkTmsAgrNAgrList);

    if (!isEmpty(chkTmsAgrNAgrList)) {
      const agrObj = chkTmsAgrNAgrList[0];
      const agrNObj = chkTmsAgrNAgrList[1];
      //회원 약관 SET
      //dispatch(setMyTms(agrObj, agrNObj));
      //D011430 0112753994
      const paramObj = {
        frstLoginYn: 'N',
        isPasswdChange: !isPasswdChangeNext,
        mbPwdEnc: mbPwdEnc,
        mbPwdEncNew: mbPwdEncNew,
        mbCi: myMbInfoData?.mbCi,
        mbHpPnEnc: myMbInfoData?.mbHpPnEnc,
        agrList: agrObj,
        agrNList: agrNObj,
        mbTpcd: mbTpcd
      };

      /** ci정보 
      const paramObj = {
        mbId: Cookies.get('id'),
        mbCi: mbCi,
        mbNm: e.LGD_MOBILE_SUBAUTH_NAME,
        mbHpPnEnc: e.LGD_MOBILENUM
      };
 */

      console.log('updateCMEvalInfo> paramObj=%o', paramObj);

      //3.회원약관정보 update
      const { data } = await axiosPost('/api/member/updateCMEvalInfo.do', paramObj, false); //.then(({ data }) => {
      console.log('updateCMEvalInfo> data=%o', data);
   
      if (data.statusinfo.returncd === 'SYS9900') {
        setErrorMsg1('비밀번호가 맞지 않습니다.');
        setErrorMsg2('');
        setErrorMsg3('');
        window.scrollTo(0, 0);
        return false;

      } else if (data.statusinfo.returncd === 'SUCCESS') {
        window.location.href = '/main';
        window.scrollTo(0, 0);
      } else {
        showAlert('오류가 발생하였습니다.');
        console.log('오류 returnmsg=%o', data.statusinfo.returnmsg);
      }

      /*
        if (data.statusinfo.returncd === 'SUCCESS') {
          window.location.href = '/member/memberRegistrationComplete?mbTpcd=0010';
          window.scrollTo(0, 0);
          login(mbId, mbPwdEnc);
          
          const rtnCd = login(mbId, mbPwdEnc);
          if (rtnCd === 'SUCCESS') {
            window.location.href = '/member/memberRegistrationComplete';
            window.onbeforeunload = function() {
              window.scrollTo(0, 0);
            };
          }
        } else {
          alert(data.statusinfo.returnmsg);
          console.log(data.statusinfo.returnmsg);
        }
      });*/
    }
  };

  //password 규칙체크
  const chkValidatePwd = (mbPwdEnc, type) => {
    const regexPwCnt = /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!regexPwCnt.test(mbPwdEnc)) {
      //alert('비밀번호는 영문, 숫자, 특수 문자 혼합하여 8~15자 이내로 입력해 주세요')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호는 영문, 숫자, 특수 문자 혼합하여 8~15자 이내로 입력해 주세요.');
      return false;
    }
    //연속된 숫자 테스트
    let regexNo = /(\w)\1\1/;
    if (regexNo.test(mbPwdEnc)) {
      //alert('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.');
      return false;
    } else if (!isStrCnt(mbPwdEnc, 3)) {
      //alert('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호에 연속된 문자/숫자 또는 동일한 문자/숫자를 포함할 수 없습니다.');
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    console.log('isEmpty(mbCi) >  mbCi=%o', mbCi);
    if (isEmpty(mbCi)) {
      // showAlert('본인인증이 필요합니다.test');
      //Router.push('/member/cmCertify');
    }
  }, [mbCi]);

  useEffect(() => {
    console.log('isEmpty(myMbInfoData) >  myMbInfoData=%o', myMbInfoData);
    if (!isEmpty(myMbInfoData)) {
      //showAlert('본인인증설정 됨');
    }
  }, [myMbInfoData]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '본인인증',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fffff'
        }
      });
    }
  }, []);

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

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap member-contents">
          {/*
          <div className="login-tit-area v-2">
            <h4>
              최초 <span>로그인</span> 시 <span>본인인증</span>이 필요합니다
            </h4>
            <p>
              카마스터(CM), 평가사 회원 이신가요?
              <br />
              비밀번호 변경과 약관동의 후 본인인증이 필요합니다.
            </p>
          </div>
        */}

          <h5 className="cm-tit">비밀번호를 변경해주세요</h5>
          <div className="login-wrap mt16">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
                <p className="con-pass">* 해당 비밀번호는 매매플랫폼에 한에서만 변경됩니다.<br/>
              기존 모바일 영업시스템 비밀번호는 변경되지 않습니다.</p>
                <ul>
                  <li>
                    <label htmlFor="m-user-pw" className="hide">
                      현재 비밀번호
                    </label>
                    <Input type="password" placeHolder="현재 비밀번호" id="m-user-pw" disabled={isPasswdChangeNext} height={40} name="mbPwdEnc" onChange={onChangeAll} value={mbPwdEnc} />
                    <p className="tx-exp-tp4">{errorMsg1}</p>
                  </li>
                  <li>
                    <label htmlFor="new-pw" className="hide">
                      새 비밀번호
                    </label>
                    <Input type="password" placeHolder="새 비밀번호" id="m-new-pw" height={40} disabled={isPasswdChangeNext} name="mbPwdEncNew" onChange={onChangeAll} value={mbPwdEncNew} />
                    <p className="tx-exp-tp4">{errorMsg2}</p>
                  </li>
                  <li>
                    <label htmlFor="m-new-pw-chk" className="hide">
                      새 비밀번호 확인
                    </label>
                    <Input type="password" placeHolder="새 비밀번호 확인" id="m-new-pw-chk" height={40} disabled={isPasswdChangeNext} name="mbPwdEncChk" onChange={onChangeAll} value={mbPwdEncChk} />
                    <p className="tx-exp-tp4">{errorMsg3}</p>
                  </li>
                </ul>
              </fieldset>
            </form>
            <p className="con-pass">* 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</p>
            <Buttons align="center" marginTop={20}>
              <Button size="big" background="blue20" color="blue80" title="비밀번호 다음에 변경하기" width={200} height={56} nextLink={true} onClick={onChangeNext} />
            </Buttons>
          </div>

          <h5 className="cm-tit">약관에 동의해주세요</h5>
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

          <Button className="fixed" size="full" background="blue80" title="완료" height={56} href="/member/cmCertify" nextLink={true} onClick={onNext} />
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
        <div className="content-wrap member-contents">
          <h5 className="cm-tit">비밀번호를 변경해주세요</h5>
          <div className="login-wrap wide">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
              </fieldset>
              <p className="con-pass">* 해당 비밀번호는 매매플랫폼에 한에서만 변경됩니다.<br/>
              기존 모바일 영업시스템 비밀번호는 변경되지 않습니다.</p>
              <ul>
                <li>
                  <label htmlFor="user-pw" className="hide">
                    현재 비밀번호
                  </label>
                  <Input type="password" placeHolder="현재 비밀번호" id="user-pw" width={368} disabled={isPasswdChangeNext} name="mbPwdEnc" onChange={onChangeAll} value={mbPwdEnc} />
                  <p className="tx-exp-tp4">{errorMsg1}</p>
                </li>
                <li>
                  <label htmlFor="new-pw" className="hide">
                    새 비밀번호
                  </label>
                  <Input type="password" placeHolder="새 비밀번호" id="new-pw" width={368} disabled={isPasswdChangeNext} name="mbPwdEncNew" onChange={onChangeAll} value={mbPwdEncNew} />
                  <p className="tx-exp-tp4">{errorMsg2}</p>
                </li>
                <li>
                  <label htmlFor="new-pw-chk" className="hide">
                    새 비밀번호 확인
                  </label>
                  <Input type="password" placeHolder="새 비밀번호 확인" id="new-pw-chk" disabled={isPasswdChangeNext} width={368} name="mbPwdEncChk" onChange={onChangeAll} value={mbPwdEncChk} />
                  <p className="tx-exp-tp4">{errorMsg3}</p>
                </li>
              </ul>
              <p className="con-pass">* 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</p>
              <Buttons align="center" marginTop={20}>
                <Button size="big" background="blue80" title="비밀번호 다음에 변경하기" width={200} height={60} buttonMarkup={true} onClick={onChangeNext} />
              </Buttons>
            </form>
          </div>

          <h5 className="cm-tit">약관에 동의해주세요</h5>
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
            <Button size="big" background="blue80" title="완료" width={180} height={60} buttonMarkup={true} onClick={onNext} />
          </Buttons>
        </div>
      </div>
    </AppLayout>
  );
};

const passWdValidator1 = createValidator(pwasWdSchema, {
  required: ['mbPwdEnc'],
  additionalProperties: true
});
const passWdValidator2 = createValidator(pwasWdSchema, {
  required: ['mbPwdEncNew'],
  additionalProperties: true
});
const passWdValidator3 = createValidator(pwasWdSchema, {
  required: ['mbPwdEncChk'],
  additionalProperties: true
});

CmInfo.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';

  //약관 불러 오기
  const tpcd = query.mbTpcd === '0010' ? '0020' : '0030';
  const url = `/api/member/selectTmsList.do?tpcd=${tpcd}`;
  const res = await axiosGet(url, null, false);

  return {
    data: res.data
  };
};

export default CmInfo;
