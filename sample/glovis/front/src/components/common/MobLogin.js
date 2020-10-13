import React, { useState, useCallback, useEffect, memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import AppleLogin from 'react-apple-login';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import { postLogin } from '@src/actions/member/loginAction';
import { LOGIN_SUCCESS, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { axiosGet, apiUrl, frontUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { POST_LOGOUT } from '@src/actions/member/loginTypes';
import { accessTokenValidMinute, refreshTokenValidMinute } from '@src/utils/LoginUtils';
import { setMemberType, setMemberSns } from '@src/actions/member/memberAction';

const MobLogin = memo(({ errorPw = false, noMemArea = true, router, snsLogin = true, url, callback, noneCallBack = false }) => {
  const dispatch = useDispatch();
  const isIE = useSelector((state) => state.common.isIE);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
  const [idChk, setIdChk] = useState(cookies.idChk === '1' ? true : false);
  const { showAlert, initAlert } = useContext(SystemContext);
  const nClientId = apiUrl === 'https://testautobell.glovis.net' ? 'eV7K8uK23kDzWzRxG35f' : apiUrl === 'http://10.6.58.32' ? 'eefNRm__jfJDOLyUGDO5' : 'RaiI6i_RbnfK9HVXcJ7g';

  const { isLogin, loginReturnCd, id, name, loginType, membertype, accessToken, refreshToken, menuAuthruleCd, mbLiveshotYn, mbAuthCd, loginReturnMsg, wthdHMap } = useSelector((state) => ({
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
    mbAuthCd: state.login.mbAuthCd,
    loginReturnMsg: state.login.loginReturnMsg,
    wthdHMap: state.login.wthdHMap
  }));

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');
  const [isValidation, setIsValidation] = useState(false);
  const [memberIdError, setMemberIdError] = useState(false);
  const [memberPwError, setMemberPwError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMobPw, setErrorMobPw] = useState(errorPw);

  //캡챠 이미지
  const [captchaImg, setCaptchaImg] = useState('');
  const [jCaptcha, setJCaptcha] = useState('');
  const [jkey, setJkey] = useState('');

  const [loginReturnMsgAlert, setLoginReturnMsgAlert] = useState('');

  const createCookie = useCallback(
    (cookieName, cookieValue, validTime) => {
      const expires = new Date();
      console.log('createCookie > isEmpty(validTime)=%o', isEmpty(validTime));
      if (validTime === '') {
        // console.log('createCookie > 세션쿠키 생성');
        setCookie(cookieName, cookieValue, { path: '/' });
      } else {
        // console.log('createCookie > 일반쿠키 생성');
        expires.setTime(expires.getTime() + validTime); //세션쿠키 여부
        setCookie(cookieName, cookieValue, { path: '/', expires });
      }
      console.log('createCookie > cookieName=%o, cookieValue=%o, expires=%o, validTime=%o', cookieName, cookieValue, expires, validTime);
    },
    [setCookie]
  );

  const FindInfo = () => {
    return (
      <ul className="find-info">
        <li>
          <Link href="/member/foundIdPwd">
            <a>아이디찾기</a>
          </Link>
        </li>
        <li>
          <Link href="/member/loginInfoPassword">
            <a>비밀번호찾기</a>
          </Link>
        </li>
        <li>
          <Link href="/member/choiceMemberType">
            <a className="btn">회원가입</a>
          </Link>
        </li>
      </ul>
    );
  };

  const handleFpLoginClose = useCallback(() => {
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  }, []);

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  /**
   * 설명 : 로그인 parameter validation 체크
   * @param
   * @return
   */
  const onLoginHandler = (e) => {
    console.log('onLoginHandler=============================>', e);
    e.preventDefault();
    //초기화
    dispatch({ type: POST_LOGOUT });
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

    if (errorMobPw === true) {
      axiosGet('/api/member/compareCaptchaValue.do?mbId=' + jkey + '&jCaptcha=' + jCaptcha, false, null, false)
        .then(({ data }) => {
          const param = {
            mbId: memberId,
            mbPwdEnc: memberPw,
            jCaptcha: true
          };
          if (data.key) {
            if (isValidation) dispatch(postLogin(param));
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
      if (isValidation) dispatch(postLogin(param));
    }
  };

  //엔터입력시 처리추가
  const handleKeyPress = (e) => {
    //console.log(e.charCode);
    if (e.charCode === 13) {
      onLoginHandler(e);
    }
  };

  const onChangeCheckBox = (e) => {
    // console.log(e);
    e.preventDefault();
    if (idChk) {
      setIdChk(false);
    } else {
      setIdChk(true);
    }
  };

  const onNaverCallback = (data) => {
    console.log(data);

    const id = data ? data.id : '';
    checkSns(id, '0010');
    /*
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
        console.log('네이버 로그인 data ', data);
        console.log('네이버 로그인 data ', data);
        console.log('네이버 로그인 data ', data);
        console.log('네이버 로그인 data ', data);
        //Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement');
      }
    });
    */
  };

  const onLoginKakao = (data) => {
    // console.log(data);
    const id = data ? data.profile?.id : '';
    checkSns(id, '0020');
    /*
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0020`, false, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        //console.log(payload.data.data);
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
    */
  };

  const onAppleCallback = (data) => {
    console.log('onAppleCallback data ::::: ', data);
    const id = data ? data.profile?.id : '';
    checkSns(id, '0010');

    // axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${id}&mbSnsKncd=0020`, false, null, false).then((payload) => {
    //   console.log(' selectMbSnsCnt payload :', payload);
    //   if (payload.data.data > 0) {
    //     //console.log(payload.data.data);
    //     //alert(`이미 가입된 SNS 계정입니다.`)
    //     //Router.push("/login");
    //     const param = {
    //       mbSnsId: id,
    //       mbSnsKncd: '0020'
    //     };
    //     dispatch(postLogin(param));
    //   } else {
    //     Router.push({ pathname: '/member/memberPolicyAgreement', query: { data: data } }, '/member/memberPolicyAgreement');
    //   }
    // });
  };

  const checkSns = (snsId, snsKncd) => {
    axiosGet(`/api/member/selectMbSnsCnt.do?mbSnsId=${snsId}&mbSnsKncd=${snsKncd}`, null, false).then((payload) => {
      console.log(' selectMbSnsCnt payload :', payload);
      if (payload.data.data > 0) {
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`);
        const param = {
          mbSnsId: snsId,
          mbSnsKncd: snsKncd
        };
        dispatch(postLogin(param));
      } else {
        dispatch(setMemberSns({ mbSnsId: String(snsId), mbSnsKncd: snsKncd }));
        showAlert('오토벨에 가입되어 있지 않은 계정입니다.<br/>회원가입 화면으로 이동합니다', () => {
          dispatch(setMemberType('0010'));
          Router.push('/member/memberPolicyAgreement?mbTpcd=0010');
        });
      }
    });

    return;
  };

  const onRefreshHandler = (e) => {
    e.preventDefault();
    const key = generateKey(memberId);
    setJkey(key);

    setCaptchaImg(`${apiUrl}/api/jcaptcha?jCaptchaKey=${key}`);
  };

  useEffect(() => {
    const query = router.query;
    if (isLogin) {
      setLoginError(false);

      if (!isEmpty(accessToken)) {
        createCookie('accessToken', accessToken, accessTokenValidMinute);
        createCookie('accessTokenSession', accessToken); //세션 close >  쿠키삭제
        if (idChk === true) {
          createCookie('idChk', '1', 1000 * 60 * 60 * 24); //1일
          createCookie('Chk', id, 1000 * 60 * 60 * 24); //1일
        }
        createCookie('type', loginType, accessTokenValidMinute);
        createCookie('membertype', membertype, accessTokenValidMinute);
        createCookie('id', id, accessTokenValidMinute);
        console.log('MobLogin 쿠키 생성중 name ::::::::::::::', name);
        createCookie('name', name, accessTokenValidMinute);
        createCookie('menuAuthruleCd', menuAuthruleCd, accessTokenValidMinute);
        createCookie('mbLiveshotYn', mbLiveshotYn, accessTokenValidMinute);
        createCookie('mbAuthCd', mbAuthCd, accessTokenValidMinute);
      }
      if (!isEmpty(refreshToken)) {
        createCookie('refreshToken', refreshToken, refreshTokenValidMinute);
        createCookie('accessTokenSession', accessToken, '');
      }

      dispatch({ type: LOGIN_SUCCESS });

      const UA = navigator.userAgent;
      if (UA.includes('AUTOBELL_Android')) {
        window.JSInterface.syncPushSignIn(memberId);
      } else if (UA.includes('AUTOBELL_iOS')) {
        webkit.messageHandlers.observe.postMessage('AutoBell://syncPushSignIn?url=' + memberId);
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
          //Router.push('/member/changePassword');
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

      //debugger;
      console.log('======================test========================');
      console.log(loginType);
      if (loginType === 'member') {
        if (noneCallBack) {
          handleFpLoginClose();
        } else if (callback) {
          callback();
        } else if (url === undefined) {
          Router.push({ pathname: '/main', query: {} }, '/main');
        } else {
          Router.push(url);
        }
      } else if (loginType === 'nonmember') {
        if (router.query.url === undefined) {
          //Router.push('/mypage/personal/sellcar/sellCar');
          const data = {
            mbStrPn: mbStrPn,
            mbNm: mbNm
          };
          Router.push({ pathname: '/mypage/personal/sellcar/sellCar', query: { data: data } }, '/mypage/personal/sellcar/sellCar');
        } else {
          Router.push(query.url);
        }
      }
    } else {
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
          removeCookie('accessTokenSession');
          removeCookie('type');
          removeCookie('membertype');
          removeCookie('id');
          removeCookie('name');
          removeCookie('menuAuthruleCd');
          removeCookie('mbLiveshotYn');
          removeCookie('mbAuthCd');
          removeCookie('refreshToken');
        }
        // console.log('_login>로그인 오류 >loginReturnCd, LoginError=', loginReturnCd, loginError);
        //MBR4002, MBR4004 처리
        if (loginReturnCd === 'MBR4006') {
          //매매회원(개인단체) 회원 미승인 상태
          //showAlert('단체딜러회원 가입을 위한 심사가 진행중입니다.<br/> 빠른 처리를 원하시면 고객센터로 문의해주세요.<br/>  고객센터:1600-0080', 'error');
          //setLoginReturnMsgAlert('단체딜러회원심사중');
          showAlert('미승인 상태로 로그인이 불가합니다.<br/> 고객센터로 문의해주세요.<br/>  고객센터:1600-0080', 'error');
          setLoginReturnMsgAlert('딜러회원심사중');
        } else if (loginReturnCd === 'MBR4007') {
          // 매매회원(개인단체) 회원 반려 상태
          showAlert(
            '딜러(or 단체) 회원 가입심사가 반려되었습니다.<br/> <span class="box">[반려사유]<em>' +
              loginReturnMsg +
              '</em></span><br/>빠른 처리를 원하시면 고객센터로 문의해주세요.<br/>  고객센터:1600-0080',
            'error'
          );
        } else if (loginReturnCd === 'MBR6001') {
          let tmpMsg = wthdHMap?.mbWthdKncd === '0040' ? '[' + wthdHMap?.frcWthdRsn + '] 사유로<br/>' : '';
          tmpMsg += wthdHMap?.mbWthdDt ? wthdHMap.mbWthdDt.substr(0,2) + '년 ' + wthdHMap.mbWthdDt.substr(2,2) + '월 ' + wthdHMap.mbWthdDt.substr(4,2) + '일 ': '';
          showAlert(tmpMsg + '탈퇴 처리가 완료 되었습니다.<br/>재가입은 30일 후 가입 가능 합니다.<br/>콜센터(1600-0080)로 문의주세요.', 'error');
          /*
          if (membertype === '0010') {
            showAlert('탈퇴회원입니다. <br/> 탈퇴한 날로부터 30일간 가입이 불가합니다. <br/> 콜센터: 1600-0080', 'error');
          } else if (membertype === '0020') {
            showAlert('딜러회원입니다. <br/> 탈퇴한 날로부터 30일간 가입이 불가합니다. <br/> 콜센터: 1600-0080', 'error');
          } else if (membertype === '0030' || membertype === '0040') {
            showAlert('탈퇴회원입니다. <br/> 탈퇴한 날로부터 30일간 가입이 불가합니다. <br/> 콜센터: 1600-0080', 'error');
          }*/
        } else if (loginReturnCd === 'MBR4008') {
          showAlert('이용정지 상태입니다.<br/>  고객센터:1600-0080', 'error');
        }
        if (loginReturnCd === 'MBR4005') {
          //5회 비밀번호 오류
          setErrorMobPw(true);

          const key = generateKey(memberId);
          setJkey(key);

          setCaptchaImg(`${apiUrl}/api/jcaptcha?jCaptchaKey=${key}`);
        } else {
          setLoginError(true);
        }
      } else {
        setLoginError(false);
      }
    }

    initAlert();
  }, [
    isLogin,
    loginType,
    membertype,
    loginReturnCd,
    accessToken,
    refreshToken,
    dispatch,
    createCookie,
    accessTokenValidMinute,
    idChk,
    id,
    name,
    refreshTokenValidMinute,
    memberId,
    callback,
    url,
    cookies,
    removeCookie,
    router.query
  ]);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  return (
    <>
      <form className="login-form">
        <fieldset>
          <legend className="away">로그인</legend>
          <div className="ta-center">
            <span className="logo">
              <img src="/images/mobile/common/autobell-logo-tit.svg" alt="로고" />
            </span>
          </div>
          <ul>
            <li>
              <label htmlFor="m-user-id" className="hide">
                아이디
              </label>
              <Input type="text" placeHolder="아이디를 입력하세요." id="m-user-id" value={memberId} onKeyPress={handleKeyPress} onChange={(e) => setMemberId(e.target.value)} />
              {memberIdError && (
                <p className="tx-exp-tp4 tx-red60" style={{ marginTop: '10px' }}>
                  아이디를 입력해주세요
                </p>
              )}
            </li>
            <li>
              <label htmlFor="m-user-pw" className="hide">
                비밀번호
              </label>
              <Input type="password" placeHolder="비밀번호 입력하세요." id="m-user-pw" value={memberPw} onKeyPress={handleKeyPress} onChange={(e) => setMemberPw(e.target.value)} />
              {memberPwError && (
                <p className="tx-exp-tp4 tx-red60" style={{ marginTop: '10px' }}>
                  비밀번호 입력해주세요
                </p>
              )}
            </li>
            {loginError && (
              <li>
                {' '}
                로그인 오류 [{loginReturnCd}]{loginReturnMsgAlert}
              </li>
            )}
            {errorPw === false && (
              <li>
                <CheckBox id="chk-save" title="아이디 저장" isSelf={false} value={idChk} checked={idChk} onChange={onChangeCheckBox} />
              </li>
            )}
          </ul>
          {errorMobPw === true && (
            <div className="captcha-wrap">
              <p className="tx-not">
                5회 이상 비밀번호를 잘못 입력하셨습니다.
                <br />
                정보보호를 위해 자동입력 방지문자를 함께 입력 후 로그인해주세요.
              </p>
              <div className="captcha-box">
                <div className="img-wrap">
                  <img src={captchaImg} alt="자동입력 방지문자 이미지" />
                </div>
                <div className="btn-wrap">
                  <Button size="mid" background="blue20" color="blue80" radius={true} title="새로고침" width={84} height={88} fontWeight={500} onClick={(e) => onRefreshHandler(e)} />
                  {/*
                  <Button size="mid" background="blue20" color="blue80" title="음성듣기" width={84} height={40} marginTop={8} fontWeight={500} />
                  */}
                </div>
                <label htmlFor="m-security-tx" className="hide">
                  보안문자
                </label>
                <Input type="text" placeHolder="보안문자" id="m-security-tx" name="jCaptcha" value={jCaptcha} width={348} onChange={(e) => setJCaptcha(e.target.value)} />
              </div>
            </div>
          )}
        </fieldset>
        <Button size="full" background="blue80" radius={true} title="로그인" marginTop={16} onClick={onLoginHandler} />
      </form>

      {snsLogin && (
        <>
          <div className="other-login">
            <Buttons marginTop={20}>
              {isIE === false && (
                <NaverLogin
                  //clientId="eV7K8uK23kDzWzRxG35f"
                  //callbackUrl="https://testautobell.glovis.net/login"
                  //clientId="eefNRm__jfJDOLyUGDO5"
                  //callbackUrl="http://10.6.58.32/login"
                  clientId={nClientId}
                  callbackUrl={`${frontUrl}/login`}
                  render={(props) => <BtnNaver onClick={props.onClick} />}
                  onSuccess={(naverUser) => onNaverCallback(naverUser)}
                  onFailure={(result) => console.error(result)}
                />
              )}
              {isIE === false && (
                <KakaoLogin
                  jsKey="4a7be481fb849c9e5bfc5a9c4436ac3b"
                  onSuccess={(result) => onLoginKakao(result)}
                  // onFailure={result => console.log(result)}
                  render={(props) => <BtnKakao onClick={props.onClick} />}
                  getProfile={true}
                />
              )}
              {isIE === false && (
                <AppleLogin
                  clientId="autobell.glovisaa.glovis"
                  //redirectURI="http://aaa.autobell.com/appleCallback"
                  redirectURI="https://testautobell.glovis.net/appleCallback"
                  responseType={'code'}
                  responseMode={'query'}
                  usePopup={true}
             //     callback={(appUsr) => onAppleCallback(appUsr)}
                  render={(props) => <BtnApple onClick={props.onClick} />}
                />
              )}
            </Buttons>
            <p className="tx-sub">
              <span>* SNS 로그인은 일반회원만 가능합니다.</span>
              <br />* 딜러회원이시면, 아이디와 비밀번호를 입력하여 로그인해주세요.
            </p>
          </div>
        </>
      )}

      {noMemArea && url != '/cscenter/directConsult' && (
        <>
          <Button size="full" background="blue20" color="blue80" radius={true} title="비회원으로 신청하기" marginTop={16} fontSize={14} href="/login?data=1" />
          <p className="tx-sub v-2">비회원으로 신청하실 때 반드시 휴대폰인증을 하셔야 합니다.</p>
        </>
      )}
      <FindInfo />
    </>
  );
});

MobLogin.propTypes = {
  errorPw: PropTypes.bool,
  noMemArea: PropTypes.bool,
  router: PropTypes.object,
  snsLogin: PropTypes.bool,
  url: PropTypes.any,
  callback: PropTypes.func,
  onClick: PropTypes.func,
  noneCallBack: PropTypes.bool
};
MobLogin.displayName = 'MobLogin';
export default withRouter(MobLogin);
