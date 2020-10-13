/**
 * 설명 : 로그인 페이지 팝업
 * @fileoverview front page  > loginpopup
 * @requires [loginAction]
 * @author 김지현 (최승희. 콜백처리를 위해 임시 생성)
 */
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

import Link from 'next/link';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Certification from '@src/components/common/Certification';
import { accessTokenValidMinute, refreshTokenValidMinute } from '@src/utils/LoginUtils';

import { postLogin, postNonMemberLogin } from '@src/actions/member/loginAction';

const LoginPopup = (props) => {
  const { successCallback } = props;
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  // 본인인증
  const [certData, setCertData] = useState({});
  const [certShow, setCertShow] = useState(false);
  const [certText, setCertText] = useState('휴대폰 본인인증');
  const [succYn, setSuccYn] = useState('N');

  const { isLogin, loginReturnCd, id, name, type: loginType, membertype, accessToken, refreshToken } = useSelector((state) => state.login);

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [isValidation, setIsValidation] = useState(false);
  const [memberIdError, setMemberIdError] = useState(false);
  const [memberPwError, setMemberPwError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const createCookie = useCallback((cookieName, cookieValue, validTime) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + validTime);
    setCookie(cookieName, cookieValue, { path: '/', expires });
    console.log('createCookie > cookieName, cookieValue, expires=', cookieName, cookieValue, expires);
  }, []);

  useEffect(() => {
    setLoginError(false);
  }, []);

  useEffect(() => {
    if (!isValidation) {
      return;
    }
    console.log('useEffect>> isLogin, loginError,loginReturnCd, =' + isLogin, loginError, loginReturnCd);

    if (isLogin) {
      setLoginError(false);
      if (!isEmpty(accessToken)) {
        createCookie('accessToken', accessToken, accessTokenValidMinute);
        createCookie('type', loginType, accessTokenValidMinute);
        createCookie('membertype', membertype, accessTokenValidMinute);
        createCookie('id', id, accessTokenValidMinute);
        createCookie('name', name, accessTokenValidMinute);
      }
      if (!isEmpty(refreshToken)) {
        createCookie('refreshToken', refreshToken, refreshTokenValidMinute);
      }

      console.log(loginReturnCd);

      // 회원상태에 따라 정상적으로 로그인후 비밀번호 재설정/ 종사원증유효기간 알림
      if (loginReturnCd === 'MBR5001') {
        // 비밀번호 변경안내
        if (membertype === '0010' || membertype === '0020') {
          // 일반회원
          Router.push('/member/changePassword');
          return;
        } else if (membertype === '0030' || membertype === '0040') {
          // 단체회원
          alert('관리자에 문의하세요.');
          return;
        }
      } else if (loginReturnCd === 'MBR5002') {
        // 종사어원증 만료예정(1개월 전).
        if (membertype === '0020') {
          // 개인딜러
          Router.push('/member/expirationGuide');
          return;
        }
      } else if (loginReturnCd === 'MBR5003') {
        // 종사원증 만료
        if (membertype === '0020') {
          // 개인딜러
          Router.push('/member/expirationGuide');
          return;
        }
      } else if (loginReturnCd === 'MBR5005') {
        // 평가사(CM) 최초 로그인시 본인인증 필요
        Router.push('/member/cmCertify');
        return;
      }

      if (loginType === 'member') {
        if (successCallback) {
          successCallback({
            isLogin,
            loginReturnCd,
            id,
            name,
            loginType,
            membertype,
            accessToken,
            refreshToken
          });
        } else {
          Router.push({ pathname: props.url, query: {} }, props.url);
        }
      }
    } else {
      console.log('_login>useEffect>loginReturnCd=' + loginReturnCd);

      if (loginReturnCd === 'MBR4004') {
        // 로그인 완료전 휴면계정 대상일 경우
        Router.push('/member/dormantRescission');
        return;
      }

      if (loginReturnCd === 'SUCCESS') {
        setLoginError(false);
      } else if (!isEmpty(loginReturnCd) && loginReturnCd !== 'SUCCESS') {
        if (!isEmpty(cookies)) {
          removeCookie('accessToken');
          removeCookie('refreshToken');
        }
        console.log('_login>로그인 오류 >loginReturnCd, LoginError=', loginReturnCd, loginError);

        if (loginReturnCd === 'MBR4005') {
          setLoginError(true);
          return;
        }
        setLoginError(true);
      } else {
        setLoginError(false);
      }
    }
  }, [isLogin, loginType, loginReturnCd]);

  /**
   * 설명 : 비회원으로 로그인신청
   * @param
   * @return
   */
  const onNonMemberLoginHandler = (e) => {
    e.preventDefault();
    //Router.push('/member/_login');
    if (props.type == 'sellcar') {
      e.preventDefault();
      setCertShow(true);
    } else {
      if (successCallback) {
        successCallback({
          isLogin,
          loginReturnCd,
          id,
          name,
          loginType,
          membertype,
          accessToken,
          refreshToken
        });
      } else {
        Router.push({ pathname: '/login', query: { data: 1, url: props.url } }, '/login');
      }
    }
  };

  const certCallback = (e) => {
    console.log(e);
    if (e.RETURN_CD === '0000') {
      if (successCallback) {
        successCallback({
          name: e.LGD_MOBILE_SUBAUTH_NAME,
          phone: e.LGD_MOBILENUM
        });
      } else {
        Router.push(props.url + '&name=' + e.LGD_MOBILE_SUBAUTH_NAME + '&phone=' + e.LGD_MOBILENUM);
        window.location.reload();
      }
    }
  };

  /**
   * 설명 : 로그인 parameter validation 체크
   * @param
   * @return
   */
  const onLoginHandler = (e) => {
    e.preventDefault();
    setLoginError(false);
    setIsValidation(true);
    let isValid = true;
    //아이디 체크
    if (memberId === '') {
      setMemberIdError(true);
      isValid = false;
    } else {
      setMemberIdError(false);
      isValid = true;
    }
    //비밀번호 체크
    if (memberPw === '') {
      setMemberPwError(true);
      isValid = false;
    } else {
      setMemberPwError(false);
      isValid = true;
    }

    const data = {
      mbId: memberId,
      mbPwdEnc: memberPw
    };

    if (isValid) dispatch(postLogin(data));
  };

  //엔터입력시 처리추가
  const handleKeyPress = (e) => {
    //console.log(e.charCode);
    if (e.charCode === 13) {
      onLoginHandler(e);
    }
  };

  return (
    <div className="con-wrap popup-login">
      <form className="login-form">
        <fieldset>
          <div className="input-wrap">
            <legend className="away">로그인</legend>
            <label htmlFor="id" className="hide">
              아이디
            </label>
            <Input type="text" placeHolder="아이디" id="user-id" value={memberId} width={252} onKeyPress={handleKeyPress} onChange={(e) => setMemberId(e.target.value)} />
            {memberIdError && (
              <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                아이디를 입력해주세요
              </p>
            )}
            <label htmlFor="pw" className="hide">
              비밀번호
            </label>
            <Input type="password" placeHolder="비밀번호" id="user-pw" value={memberPw} width={252} onKeyPress={handleKeyPress} onChange={(e) => setMemberPw(e.target.value)} />
            {memberPwError && (
              <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                비밀번호 입력해주세요
              </p>
            )}
            {loginError && (
              <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                로그인 오류 [{loginReturnCd}]{loginReturnCd == 'MBR4005' ? '5회 비밀번호 오류' : ' '}
              </p>
            )}
          </div>
          <Button size="big" background="blue80" title="로그인" width={106} height={106} onClick={(e) => onLoginHandler(e)} />
        </fieldset>
      </form>
      <ul className="find-info">
        <li>
          <Link href="/member/choiceMemberType">
            <a>회원가입</a>
          </Link>
        </li>
        <li onClick={() => Router.push({ pathname: '/member/foundIdPwd', query: { data: 0 } }, '/member/foundIdPwd')}>
          <a>아이디찾기</a>
        </li>
        <li onClick={() => Router.push({ pathname: '/member/foundIdPwd', query: { data: 1 } }, '/member/foundIdPwd')}>
          <a>비밀번호찾기</a>
        </li>
      </ul>
      <Button size="full" line="black" title="비회원으로 신청하기" height={60} marginBottom={20} onClick={(e) => onNonMemberLoginHandler(e)} />
      <Certification show={certShow} callback={certCallback}></Certification>
      <p>비회원으로 신청하실 때 반드시 휴대폰인증을 하셔야 합니다.</p>
    </div>
  );
};

export default LoginPopup;
