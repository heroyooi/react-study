/**
 * 설명 : 로그인 페이지 팝업
 * @fileoverview front page  > loginpopup
 * @requires [loginAction]
 * @author 김지현
 */
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import Router from 'next/router';

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import Certification from '@src/components/common/Certification';

import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import { axiosGet } from '@src/utils/HttpUtils';
import { accessTokenValidMinute, refreshTokenValidMinute } from '@src/utils/LoginUtils';

import { postLogin, postNonMemberLogin } from '@src/actions/member/loginAction';

const LoginPopup = (props) => {
  const { successCallback } = props;

  const dispatch = useDispatch();
  const isIE = useSelector((state) => state.common.isIE);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  // 본인인증
  const [certPopShow, setCertPopShow] = useState(false);
  //const [certPopText, setCertPopText] = useState('휴대폰 본인인증');
  //const [succYn, setSuccYn] = useState('N');

  const { isLogin, loginReturnCd, id, name, loginType, membertype, accessToken, refreshToken, menuAuthruleCd, mbLiveshotYn, mbAuthCd } = useSelector((state) => ({
    isLogin: state.login.isLogin, // isEmpty(cookies.accessToken) ? state.login.isLogin : true,
    loginReturnCd: state.login.loginReturnCd,
    id: state.login.id,
    name: state.login.name,
    loginType: state.login.type,
    membertype: state.login.membertype,
    accessToken: state.login.accessToken,
    refreshToken: state.login.refreshToken,
    menuAuthruleCd: state.login.menuAuthruleCd,
    mbLiveshotYn: state.login.mbLiveshotYn,
    mbAuthCd: state.login.mbAuthCd
  }));

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [isValidation, setIsValidation] = useState(false);
  const [memberIdError, setMemberIdError] = useState(false);
  const [memberPwError, setMemberPwError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  //캡챠 이미지
  const [errorPw, setErrorPw] = useState(loginReturnCd === 'MBR4005' ? true : false); // 패스워드 5번 잘못 입력시 값을 true로 설정해주세요. true 시 캡챠모드로 전환
  const [captchaImg, setCaptchaImg] = useState('');
  const [jCaptcha, setJCaptcha] = useState('');
  const [jkey, setJkey] = useState('');

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const onRefreshHandler = (e) => {
    e.preventDefault();
    const key = generateKey(memberId);
    setJkey(key);

    setCaptchaImg(`https://testautobell.glovis.net/api/jcaptcha?jCaptchaKey=${key}`);
  };

  const createCookie = useCallback((cookieName, cookieValue, validTime) => {
    const expires = new Date();
    console.log('createCookie > isEmpty(validTime)=%o', isEmpty(validTime));
    if (validTime === '') {
      console.log('createCookie > 세션쿠키 생성');
      setCookie(cookieName, cookieValue, { path: '/' });
    } else {
      console.log('createCookie > 일반쿠키 생성');
      expires.setTime(expires.getTime() + validTime); //세션쿠키 여부
      setCookie(cookieName, cookieValue, { path: '/', expires });
    }
    console.log('createCookie > cookieName=%o, cookieValue=%o, expires=%o, validTime=%o', cookieName, cookieValue, expires, validTime);
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
        createCookie('accessTokenSession', accessToken, ''); //세션 close >  쿠키삭제
        createCookie('type', loginType, accessTokenValidMinute);
        createCookie('membertype', membertype, accessTokenValidMinute);
        createCookie('id', id, accessTokenValidMinute);
        createCookie('name', name, accessTokenValidMinute);
        createCookie('menuAuthruleCd', menuAuthruleCd, accessTokenValidMinute);
        createCookie('mbLiveshotYn', mbLiveshotYn, accessTokenValidMinute);
        createCookie('mbAuthCd', mbAuthCd, accessTokenValidMinute);
      }
      if (!isEmpty(refreshToken)) {
        createCookie('refreshToken', refreshToken, refreshTokenValidMinute);
        createCookie('accessTokenSession', accessToken, '');
      }

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

      console.log('loginType::', loginType);
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
          //setLoginError(true);
          //5회 비밀번호 오류
          setErrorPw(true);

          const key = generateKey(memberId);
          setJkey(key);

          setCaptchaImg(`https://testautobell.glovis.net/api/jcaptcha?jCaptchaKey=${key}`);

          return;
        }
        setLoginError(true);
      } else {
        setLoginError(false);
      }
    }
  }, [isLogin, loginType, membertype, loginReturnCd]);

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
      setCertPopShow(true);
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

  const certPopCallback = (e) => {
    if (e.RETURN_CD == '0000') {
      if (successCallback) {
        successCallback({
          isLogin: true,
          name: e.LGD_MOBILE_SUBAUTH_NAME,
          phone: e.LGD_MOBILENUM
        });
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

    if (errorPw === true) {
      axiosGet('/api/member/compareCaptchaValue.do?mbId=' + jkey + '&jCaptcha=' + jCaptcha, false, null, false)
        .then(({ data }) => {
          const param = {
            mbId: memberId,
            mbPwdEnc: memberPw,
            jCaptcha: true
          };
          if (data.key) {
            if (isValid) dispatch(postLogin(param));
          }
        })
        .catch((err) => {
          if (process.env.systemEnv === 'locel') {
            alert(err.message);
          } else {
            console.log(err);
          }
        });
    } else {
      const param = {
        mbId: memberId,
        mbPwdEnc: memberPw,
        jCaptcha: false
      };
      if (isValid) dispatch(postLogin(param));
    }
  };

  //엔터입력시 처리추가
  const handleKeyPress = (e) => {
    //console.log(e.charCode);
    if (e.charCode === 13) {
      onLoginHandler(e);
    }
  };

  const onNaverCallback = (data) => {
    console.log(data);

    const id = data ? data.id : '';
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0010`, false, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        setIsValidation(true);
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0010'
        };
        dispatch(postLogin(param));
      } else {
        Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement');
      }
    });
  };

  const onLoginKakao = (data) => {
    // console.log(data);
    const id = data ? data.profile?.id : '';

    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0020`, false, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        setIsValidation(true);
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0020'
        };
        dispatch(postLogin(param));
      } else {
        Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement');
      }
    });
  };

  const goRouter = (e, url) => {
    e.preventDefault();
    window.location.href = url;
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
      {errorPw === true && (
        <div className="captcha-wrap">
          <p className="tx-not">
            5회 이상 비밀번호를 잘못 입력하셨습니다.
            <br />
            정보보호를 위해 자동입력 방지문자를 함께 입력 후 로그인해주세요.
          </p>
          <div className="captcha-box">
            <div className="img-wrap">
              <img src={captchaImg} alt="자동입력 방지문자 이미지" />
              {/*<img src={window.location.origin+'/jcaptcha'} alt="자동입력 방지문자 이미지" />*/}
            </div>
            <div className="btn-wrap">
              <Button size="mid" title="새로고침" width={138} height={90} onClick={(e) => onRefreshHandler(e)} />
            </div>
            <label htmlFor="security-tx" className="hide">
              보안문자
            </label>
            <Input type="text" placeHolder="보안문자" id="security-tx" name="jCaptcha" value={jCaptcha} width={348} onChange={(e) => setJCaptcha(e.target.value)} />
          </div>
        </div>
      )}
      <div className="other-login">
        <Buttons marginTop={40}>
          {isIE === false && (
            <NaverLogin
              //clientId="eV7K8uK23kDzWzRxG35f"
              clientId="eefNRm__jfJDOLyUGDO5"
              //callbackUrl="https://testautobell.glovis.net/sellcar/self/selfSellCarSearch"
              callbackUrl="http://10.6.58.32/sellcar/self/selfSellCarSearch"
              render={(props) => <BtnNaver onClick={props.onClick} />}
              onSuccess={(naverUser) => onNaverCallback(naverUser)}
              onFailure={(fail) => console.error(fail)}
            />
          )}
          {isIE === false && (
            <KakaoLogin jsKey="4a7be481fb849c9e5bfc5a9c4436ac3b" onSuccess={(result) => onLoginKakao(result)} render={(props) => <BtnKakao onClick={props.onClick} />} getProfile={true} />
          )}
          {/*isIE === false && (
            <BtnApple />
          )*/}
        </Buttons>
        {isIE === false && (
          <p className="tx-sub">
            <span>SNS 로그인은 일반회원만 가능합니다.</span>
            <br />
            딜러회원이시면, 아이디와 비밀번호를 입력하여 로그인해주세요.
          </p>
        )}
      </div>
      <ul className="find-info">
        <li onClick={(e) => goRouter(e, '/member/choiceMemberType')}>
          <a href="#">회원가입</a>
        </li>
        <li onClick={(e) => goRouter(e, '/member/foundIdPwd?data=0')}>
          <a href="#">아이디찾기</a>
        </li>
        <li onClick={(e) => goRouter(e, '/member/foundIdPwd?data=1')}>
          <a href="#">비밀번호찾기</a>
        </li>
      </ul>
      {props.type == 'guide' ? null : <Button size="full" line="black" title="비회원으로 신청하기" height={60} marginBottom={20} onClick={(e) => onNonMemberLoginHandler(e)} />}
      {props.type == 'sellcar' ? <Certification show={certPopShow} callback={certPopCallback}></Certification> : null}
      {props.type == 'sellcar' ? <p>비회원으로 신청하실 때 반드시 휴대폰인증을 하셔야 합니다.</p> : null}
    </div>
  );
};

export default LoginPopup;
