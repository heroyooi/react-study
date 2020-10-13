/**
 * 로그인 상태 비밀번호 변경 화면
 * @fileOverview 비밀번호 변경
 * @requires memberAction, memberReducer
 * @author 김지현
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { isEmpty } from 'lodash';

import AppLayout from '@src/components/layouts/AppLayout';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Link from 'next/link';

import { isStrCnt } from '@src/utils/CommonUtil';
import { updatePwdNext, updatePwd } from '@src/actions/member/memberAction';
import pwasWdSchema from '@lib/share/validator/member/PassWd';
import { createValidator } from '@lib/share/validator';
import { gInfoLive } from '@src/utils/LoginUtils';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { axiosPost } from '@src/utils/HttpUtils';

const changePassword = () => {
  const mbId = gInfoLive().id;
  console.log("test====================================" + mbId);
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
    const paramObj = {
      mbId: mbId
    };
    console.log(paramObj);
    dispatch(updatePwdNext(paramObj));
    Router.push('/main');
  });

  //변경하기
  const onChange = useCallback((e) => {
    if (!mbPwdEnc) {
      //alert('현재비밀번호를 입력해주세요')
      setErrorMsg1('현재비밀번호를 입력해주세요.');
      setErrorMsg2('');
      setErrorMsg3('');
      return false;
    } else if (!mbPwdEncNew || !mbPwdEncChk) {
      //alert('비밀번호(비밀번호 확인)를 입력해주세요')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호(비밀번호 확인)를 입력해주세요.');
      return false;
    } else if (mbPwdEncNew !== mbPwdEncChk) {
      //alert('비밀번호가 일치하지 않습니다')
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호가 일치하지 않습니다.');
      return false;
    } else if (mbPwdEncNew.indexOf(mbId) > -1) {
      //alert('비밀번호에 아이디를 포함할 수 없습니다') ;
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('비밀번호에 아이디를 포함할 수 없습니다.');
      return false;
    } else if (mbPwdEncNew === mbPwdEnc) {
      alert('현재 비밀번호와 다른 새로운 비밀번호로 설정해주세요');
      setErrorMsg1('');
      setErrorMsg2('');
      setErrorMsg3('현재 비밀번호와 다른 새로운 비밀번호로 설정해주세요.');
      return false;
    } else if (chkValidatePwd(mbPwdEncNew, null)) {
      const paramObj = {
        mbPwdEnc: mbPwdEnc,
        mbPwdEncNew: mbPwdEncNew,
        mbPwdEncChk: mbPwdEnc,
        mbId: mbId
      };
      axiosPost('/api/member/updatePwd.do', paramObj)
        .then(({ data }) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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
    if (mbEnEprDday <= 30) Router.push('/member/expirationGuide');
  }, [mbEnEprDday]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    if(hasMobile){
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비밀번호 변경',
          options: ['back']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#fffff'
        }
      });
    }
  }, [dispatch]);
  
  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-tit-area v-2">
            <h4>고객님의 비밀번호를 변경해주세요.</h4>
            <p>현대 오토벨은 고객님의 소중한 개인정보 보호와 안전한 서비스 이용을 위하여 6개월 간격으로 주기적인 비밀번호 변경을 권장합니다.</p>
          </div>
          <div className="login-wrap mt16">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
                <ul>
                  <li>
                    <label htmlFor="m-user-pw" className="hide">
                      현재 비밀번호
                    </label>
                    <Input type="password" placeHolder="현재 비밀번호" id="m-user-pw" height={40} name="mbPwdEnc" onChange={onChangeAll} value={mbPwdEnc} />
                    <p className="tx-exp-tp4">{errorMsg1}</p>
                  </li>
                  <li>
                    <label htmlFor="new-pw" className="hide">
                      새 비밀번호
                    </label>
                    <Input type="password" placeHolder="새 비밀번호" id="m-new-pw" height={40} name="mbPwdEncNew" onChange={onChangeAll} value={mbPwdEncNew} />
                    <p className="tx-exp-tp4">{errorMsg2}</p>
                  </li>
                  <li>
                    <label htmlFor="m-new-pw-chk" className="hide">
                      새 비밀번호 확인
                    </label>
                    <Input type="password" placeHolder="새 비밀번호 확인" id="m-new-pw-chk" height={40} name="mbPwdEncChk" onChange={onChangeAll} value={mbPwdEncChk} />
                    <p className="tx-exp-tp4">{errorMsg3}</p>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
          <div className="tx-wrap">
            <p className="tit">[안내]</p>
            <dl className="con">
              <dd>비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</dd>
              <dd>아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</dd>
              <dd>연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가 (ex. 123kbcha, aaa, 111 등)</dd>
              <dd>타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</dd>
            </dl>
            <p className="b-tit">다음에 변경하기를 선택하시면 2주 후에 다시 안내해드립니다.</p>
          </div>
          <MobBottomArea isFix={true} isSimple={true}>
            <Buttons align="center" className="full">
              <Button size="big" background="blue20" color="blue80" title="다음에 변경하기" height={56} nextLink={true} onClick={onChangeNext} />
              <Button size="big" background="blue80" title="변경하기" height={56} href="/main" nextLink={true} onClick={onChange} />
            </Buttons>
          </MobBottomArea>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h4>
              고객님의 <span>비밀번호</span>를 <span>변경</span>해주세요.
            </h4>
          </div>

          <div className="ico-tx-wrap">
            <span className="ico-wrap">
              <i className="ico-lock" />
            </span>
            <p>
              현대 오토벨은 고객님의 소중한 개인정보 보호와 안전한 서비스 이용을 위하여
              <br />
              6개월 간격으로 주기적인 비밀번호 변경을 권장합니다.
            </p>
          </div>

          <div className="login-wrap">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
              </fieldset>
              <ul>
                <li>
                  <label htmlFor="user-pw" className="hide">
                    현재 비밀번호
                  </label>
                  <Input type="password" placeHolder="현재 비밀번호" id="user-pw" width={368} name="mbPwdEnc" onChange={onChangeAll} value={mbPwdEnc} />
                  <p className="tx-exp-tp4">{errorMsg1}</p>
                </li>
                <li>
                  <label htmlFor="new-pw" className="hide">
                    새 비밀번호
                  </label>
                  <Input type="password" placeHolder="새 비밀번호" id="new-pw" width={368} name="mbPwdEncNew" onChange={onChangeAll} value={mbPwdEncNew} />
                  <p className="tx-exp-tp4">{errorMsg2}</p>
                </li>
                <li>
                  <label htmlFor="new-pw-chk" className="hide">
                    새 비밀번호 확인
                  </label>
                  <Input type="password" placeHolder="새 비밀번호 확인" id="new-pw-chk" width={368} name="mbPwdEncChk" onChange={onChangeAll} value={mbPwdEncChk} />
                  <p className="tx-exp-tp4">{errorMsg3}</p>
                </li>
              </ul>
            </form>
          </div>

          <div className="tx-wrap">
            <p className="tit">안내</p>
            <p className="con">
              · 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.
              <br />
              · 아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.
              <br />
              · 연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가 (ex. 123kbcha, aaa, 111 등)
              <br />· 타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.
            </p>
          </div>

          <Buttons align="center" marginTop={60} className="w-line">
            <Button size="big" background="gray" title="다음에 변경하기" width={180} height={60} buttonMarkup={true} onClick={onChangeNext} />
            <Button size="big" background="blue80" title="변경하기" width={180} height={60} buttonMarkup={true} onClick={onChange} />
          </Buttons>
          <p>* 다음에 변경하기를 선택하시면 2주 후에 다시 안내해드립니다.</p>
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

export default changePassword;
