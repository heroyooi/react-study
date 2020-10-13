/**
 * 설명 : 비밀번호 변경
 * @fileoverview 마이페이지(딜러)>회원정보관리>비밀번호 변경
 * @requires
 * @author 김지현
 */
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';

import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { axiosPost } from '@src/utils/HttpUtils';
import pwasWdSchema from '@lib/share/validator/member/PassWd';
import { createValidator } from '@lib/share/validator';
import { gInfoLive } from '@src/utils/LoginUtils';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';

const ChangePwd = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { showAlert, initAlert, showLoader, hideLoader,} = useContext(SystemContext);
  const [password, setPassword] = useState({
    oldPwd: '',
    newPwd: '',
    confirmPwd: ''
  });
  const [msg, setMsg] = useState({
    errorMsg1: '',
    errorMsg2: '',
    errorMsg3: ''
  });
  const mbId = gInfoLive().id;
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);

  const validateForm = () => {
    if (isEmpty(password.oldPwd)) {
      setMsg({
        errorMsg1: '현재 비밀번호를 입력하세요.',
        errorMsg2: '',
        errorMsg3: ''
      });
      return false;
    }

    if (isEmpty(password.newPwd)) {
      setMsg({
        errorMsg1: '',
        errorMsg2: '새 비밀번호를 입력하세요.',
        errorMsg3: ''
      });
      return false;
    }

    if (password.newPwd !== password.confirmPwd) {
      setMsg({
        errorMsg1: '',
        errorMsg2: '',
        errorMsg3: '새 비밀번호와 새 비밀번호 확인은 같아야 합니다.'
      });
      return false;
    } else if (!validatePassWordChar(password.confirmPwd)) {
      setMsg({
        errorMsg1: '',
        errorMsg2: '',
        errorMsg3: '영문, 숫자, 특수 문자 혼합하여 8~15자 이내로 설정해 주세요.새 비밀번호 확인을 입력하세요.'
      });
      return false;
    } else if (validatePassWordChar2(password.confirmPwd)) {
      setMsg({
        errorMsg1: '',
        errorMsg2: '',
        errorMsg3: '연속된문자나 동일한문자는 사용할수가 없습니다.'
      });
      return false;
    } else if (password.oldPwd === password.newPwd) {
      setMsg({
        errorMsg1: '',
        errorMsg2: '',
        errorMsg3: '현재 비밀번호와 동일한 비밀번호로 변경은 불가능합니다.'
      });
      return false;
    }

    return true;
  };

  const validatePassWordChar = (passwd) => {
    return (
      /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(passwd) && passwd.length >= 8 && passwd.length < 15
      //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(passwd)
    );
  };

  const validatePassWordChar2 = (passwd) => {
    const alpaBig = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alpaSmall = 'abcdefghijklmnopqrstuvwxyz';
    const num = '01234567890';

    for (let i = 0; i < alpaBig.length; i++) {
      if (passwd.includes(alpaBig.substring(i, i + 3)) && alpaBig.substring(i, i + 3).length === 3) {
        return true;
      }
    }

    for (let i = 0; i < alpaSmall.length; i++) {
      if (passwd.includes(alpaSmall.substring(i, i + 3)) && alpaSmall.substring(i, i + 3).length === 3) {
        return true;
      }
    }

    if (/(\w)\1\1\1/.test(passwd) || isContinuedValue(passwd)) {
      return true;
    }
    return false;
  };

  const isContinuedValue = (value) => {
    console.log('value = ' + value);
    let intCnt1 = 0;
    let intCnt2 = 0;
    let temp0 = '';
    let temp1 = '';
    let temp2 = '';
    let temp3 = '';

    for (let i = 0; i < value.length - 3; i++) {
      console.log('=========================');
      temp0 = value.charAt(i);
      temp1 = value.charAt(i + 1);
      temp2 = value.charAt(i + 2);
      temp3 = value.charAt(i + 3);

      console.log(temp0);
      console.log(temp1);
      console.log(temp2);
      console.log(temp3);

      if (temp0.charCodeAt(0) - temp1.charCodeAt(0) === 1 && temp1.charCodeAt(0) - temp2.charCodeAt(0) === 1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) === 1) {
        intCnt1 = intCnt1 + 1;
      }

      if (temp0.charCodeAt(0) - temp1.charCodeAt(0) === -1 && temp1.charCodeAt(0) - temp2.charCodeAt(0) === -1 && temp2.charCodeAt(0) - temp3.charCodeAt(0) === -1) {
        intCnt2 = intCnt2 + 1;
      }
      console.log('=========================');
    }

    console.log(intCnt1 > 0 || intCnt2 > 0);
    return intCnt1 > 0 || intCnt2 > 0;
  };

  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    if (name === 'oldPassword') {
      setPassword({ ...password, oldPwd: value });
      //const valid = passWdValidator1.validate(value);
      const valid = passWdValidator1.validate({ mbPwdEnc: value });
      if (valid.error) {
        const msg = '현재 비밀번호를 입력하세요.';
        setMsg({
          errorMsg1: msg,
          errorMsg2: '',
          errorMsg3: ''
        });
      }
      setMsg({
        errorMsg1: '',
        errorMsg2: '',
        errorMsg3: ''
      });
    } else if (name === 'password') {
      setPassword({ ...password, newPwd: value });
      //const valid = passWdValidator2.validate(value);
      const valid = passWdValidator2.validate({ mbPwdEncNew: value });
      if (valid.error) {
        const msg = '올바른 새 비밀번호를 입력하세요.';
        setMsg({
          errorMsg1: '',
          errorMsg2: msg,
          errorMsg3: ''
        });
      } else {
        setMsg({
          errorMsg1: '',
          errorMsg2: '',
          errorMsg3: ''
        });
      }
    } else if (name === 'confirmPassword') {
      setPassword({ ...password, confirmPwd: value });
      //const valid = passWdValidator3.validate(value);
      const valid = passWdValidator3.validate({ mbPwdEncChk: value });
      if (valid.error) {
        const msg = '올바른 확인 비밀번호를 입력하세요.';
        setMsg({
          errorMsg1: '',
          errorMsg2: '',
          errorMsg3: msg
        });
      } else {
        setMsg({
          errorMsg1: '',
          errorMsg2: '',
          errorMsg3: ''
        });
      }
    }
  };

  const handleChangeClick = async (e) => {
    e.preventDefault();

    if (!validateForm()) return false;

    const paramObj = {
      mbPwdEnc: password.oldPwd,
      mbPwdEncNew: password.newPwd,
      mbPwdEncChk: password.confirmPwd,
      mbId: mbId
    };
    console.log('::: handleChangeClick -> paramObj', paramObj);

    showLoader()
    await axiosPost('/api/member/updatePwd.do', paramObj)
      .then(({ data }) => {
        if (data.result.returncd === '000') {
          if (hasMobile) {
            openMpop(e, 'fade');
          } else {
            showAlert('비밀번호가 변경되었습니다.', async () => {
              showLoader()
              await Router.push('/mypage/dealer/sellcar/carManagement')
              hideLoader()
            });
            // setMsg({
            //   errorMsg1: '',
            //   errorMsg2: '',
            //   errorMsg3: '비밀번호가 변경되었습니다.'
            // });
          }
        } else {
          // showAlert(data.result.returnmsg);
          showAlert('비밀번호를 확인하세요');
          // setMsg({
          //   errorMsg1: '',
          //   errorMsg2: '',
          //   errorMsg3: data.result.returnmsg
          // });
        }
        return data
      })
      .catch((err) => {
        console.log(err);
      });

    hideLoader()
  };

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const closeMpop = (e) => {
    e.preventDefault();
    setMpop(false);
    Router.push('/mypage/dealer/sellcar/carManagement');
  };

  useEffect(() => {
    if (hasMobile) {
      dispatch({ type: SECTION_MYPAGE });
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '비밀번호 변경',
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
    }
  }, [dispatch, hasMobile]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="mypage-state-sec member-info-pw pw-change mt20">
            <div className="mypage-admin-title">
              <p className="tx-exp-tp5">&#8251; 회원님의 비밀번호를 새롭게 변경하실 수 있으며, 도용방지를 위해 주기적인 변경을 권장합니다.</p>
            </div>

            <div className="member-pw-wrap">
              <div className="member-pw change">
                <label htmlFor="m-member-pw1">현재 비밀번호</label>
                <Input
                  type="password"
                  id="oldPassword"
                  placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                  height={40}
                  onChange={handleChange}
                  value={password.oldPwd}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
                <p className="tx-exp-tp4 tx-red80">{msg.errorMsg1}</p>
                <label htmlFor="m-member-pw2">새 비밀번호</label>
                <Input
                  type="password"
                  id="password"
                  placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                  height={40}
                  onChange={handleChange}
                  value={password.newPwd}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
                <p className="tx-exp-tp4 tx-red80">{msg.errorMsg2}</p>
                <label htmlFor="m-member-pw3">새 비밀번호 확인</label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeHolder="영문, 숫자, 특수문자 혼합 8~15자 이내"
                  height={40}
                  onChange={handleChange}
                  value={password.confirmPwd}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                />
                <p className="tx-exp-tp4 tx-red80">{msg.errorMsg3}</p>
              </div>
            </div>

            <div className="tx-wrap">
              <p className="tit">[안내]</p>
              <dl className="con">
                <dd>비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</dd>
                <dd>아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</dd>
                <dd>연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가 (ex. 123kbcha, aaa, 111 등)</dd>
                <dd>타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</dd>
              </dl>
            </div>
            <Button className="fixed" size="full" background="blue80" title="변경" onClick={handleChangeClick} />
          </div>
        </div>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1" />
            <p>비밀번호가 변경되었습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec member-info-pw pw-change">
          <div className="mypage-admin-title">
            <h3>비밀번호 변경</h3>
            <p className="tx-exp-tp5">&#8251; 회원님의 비밀번호를 새롭게 변경하실 수 있으며, 도용방지를 위해 주기적인 변경을 권장합니다.</p>
          </div>

          <div className="member-pw-wrap">
            <div className="member-pw">
              <Input
                type="password"
                id="oldPassword"
                placeHolder="현재 비밀번호"
                width={270}
                height={48}
                onChange={handleChange}
                value={password.oldPwd}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
              <p className="tx-exp-tp4 mtRev">{msg.errorMsg1}</p>
              <Input type="password" id="password" placeHolder="새 비밀번호" width={270} height={48} onChange={handleChange} value={password.newPwd} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" />
              <p className="tx-exp-tp4 mtRev">{msg.errorMsg2}</p>
              <Input
                type="password"
                id="confirmPassword"
                placeHolder="새 비밀번호 확인"
                width={270}
                height={48}
                onChange={handleChange}
                value={password.confirmPwd}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              />
              <p className="tx-exp-tp4 mtRev">{msg.errorMsg3}</p>
            </div>
          </div>

          <div className="essential-point">
            <ul>
              <li>안내</li>
              <li>
                <i className="ico-dot mid" /> 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요
              </li>
              <li>
                <i className="ico-dot mid" /> 아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.
              </li>
              <li>
                <i className="ico-dot mid" /> 연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가 (ex. 123kbcha, aaa, 111 등)
              </li>
              <li>
                <i className="ico-dot mid" /> 타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.
              </li>
            </ul>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} height={48} onClick={handleChangeClick} />
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

export default ChangePwd;
