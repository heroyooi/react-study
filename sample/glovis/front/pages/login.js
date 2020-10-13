import React, { memo, useState, useCallback, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useCookies } from 'react-cookie';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import NaverLogin from 'react-naver-login';
import KakaoLogin from 'react-kakao-login';
import AppleLogin from 'react-apple-login';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import MobLogin from '@src/components/common/MobLogin';
import Certification from '@src/components/common/Certification';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, LOGIN_SUCCESS } from '@src/actions/types';
import { postLogin, postNonMemberLogin } from '@src/actions/member/loginAction';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { axiosGet, frontUrl, apiUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { POST_LOGOUT } from '@src/actions/member/loginTypes';
import { selectSellcarDetail } from '@src/api/sellcar/AllSellcarSearchApi';
import Cookies from 'js-cookie';
import { accessTokenValidMinute, refreshTokenValidMinute } from '@src/utils/LoginUtils';
import { telToStrFormat } from '@src/utils/StringUtil';
import { setMemberType, setMemberSns } from '@src/actions/member/memberAction';
import { console } from 'globalthis/implementation';

const Login = memo((props) => {
  console.log('Login >>props=%o', props);
  const dispatch = useDispatch();
  const isIE = useSelector((state) => state.common.isIE);
  const nClientId = apiUrl === 'https://testautobell.glovis.net' ? 'eV7K8uK23kDzWzRxG35f' : apiUrl === 'http://10.6.58.32' ? 'eefNRm__jfJDOLyUGDO5' : 'RaiI6i_RbnfK9HVXcJ7g';

  const tmp = isEmpty(props.router.query.data) ? 0 : Number(props.router.query.data);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);

  const [tabActive] = useState(tmp);
  // const [idChk, setIdChk] = useState(cookies.idChk === '1' ? true : false);
  const [idChk, setIdChk] = useState(false);
  console.log('idChk=%o', idChk);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [altMsg, setAltMsg] = useState('');

  const {
    isLogin,
    loginReturnCd,
    id,
    name,
    auctPrstlsMbCustno,
    auctPrstlsNrmlMbCustno,
    loginType,
    membertype,
    accessToken,
    refreshToken,
    loginReturnMsg,
    menuAuthruleCd,
    mbLiveshotYn,
    mbAuthCd,
    wthdHMap
  } = useSelector((state) => ({
    isLogin: state.login.isLogin, //isEmpty(cookies.accessToken) ? state.login.isLogin : true,
    loginReturnCd: state.login.loginReturnCd,
    id: state.login.id,
    name: state.login.name,
    auctPrstlsMbCustno: state.login.auctPrstlsMbCustno,
    auctPrstlsNrmlMbCustno: state.login.auctPrstlsNrmlMbCustno,
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

  console.log('loginType===' + loginReturnMsg);

  const [errorPw, setErrorPw] = useState(loginReturnCd === 'MBR4005' ? true : false); // 패스워드 5번 잘못 입력시 값을 true로 설정해주세요. true 시 캡챠모드로 전환
  //const [errorPw, setErrorPw] = useState('error'); // 패스워드 5번 잘못 입력시 값을 true로 설정해주세요. true 시 캡챠모드로 전환
  const [memMode, setMemMode] = useState('member'); // 비회원시 값을 nonmember로 설정해주세요.
  const [memberId, setMemberId] = useState(cookies.idChk === '1' ? cookies.Chk : '');
  const [memberPw, setMemberPw] = useState('');
  const [memberIdError, setMemberIdError] = useState(false);
  const [memberPwError, setMemberPwError] = useState(false);
  const [memberIdFocus, setMemberIdFocus] = useState(false); //벨리데이션 체크 focus 이동 유무
  const [memberPwFocus, setMemberPwFocus] = useState(false); //벨리데이션 체크 focus 이동 유무

  const [loginError, setLoginError] = useState(false);

  // 본인인증
  const [certShow, setCertShow] = useState(false);
  const [certText, setCertText] = useState('휴대폰 본인인증');
  const [succYn, setSuccYn] = useState('N');
  // 비회원
  const [mbStrPn, setMbStrPn] = useState('');
  const [mbNm, setMbNm] = useState('');
  const [mbPh, setMbPh] = useState('');
  //캡챠 이미지
  const [captchaImg, setCaptchaImg] = useState('');
  const [jCaptcha, setJCaptcha] = useState('');
  const [jkey, setJkey] = useState('');
  // 모바일 본인인증(비회원)
  const [certModShow, setCertModShow] = useState(false);
  const [certModText, setCertModText] = useState('휴대폰 본인인증');

  // PC web 과 모바일 충돌
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback(
    (e) => {
      e.preventDefault();
      setMpop(false);
    },
    [setMpop]
  );

  const handleMemberMode = useCallback(
    (mode) => () => {
      setMemMode(mode);
      setCertShow(false);
    },
    []
  );

  const tabClick = () => {
    setMemMode('nonmember');
  };

  const { showAlert, initAlert } = useContext(SystemContext);
  const [loginReturnMsgAlert, setLoginReturnMsgAlert] = useState('오류가 발생했습니다');
  const [changeError, setChangeError] = useState(false);

  const createCookie = useCallback(
    (cookieName, cookieValue, validTime) => {
      const expires = new Date();
      console.log('createCookie > cookieName=%o, cookieValue=%o, isEmpty(validTime)=%o', cookieName, cookieValue, isEmpty(validTime));
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

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const onRefreshHandler = (e) => {
    e.preventDefault();
    const key = generateKey(memberId);
    setJkey(key);

    setCaptchaImg(`https://testautobell.glovis.net/api/jcaptcha?jCaptchaKey=${key}`);
  };

  const onLoginHandler = (e) => {
    //초기화
    dispatch({ type: POST_LOGOUT });
    e.preventDefault();
    setChangeError(false);
    setLoginError(false);
    let isValidation = true;

    //아이디 체크
    if (memberId === '') {
      setMemberIdError(true);
      setMemberIdFocus(true);
      isValidation = false;
    } else {
      setMemberIdError(false);
      setMemberIdFocus(false);
      isValidation = true;
    }
    //비밀번호 체크
    if (memberPw === '') {
      setMemberPwError(true);
      if (isValidation) {
        setMemberPwFocus(true);
      }
      isValidation = false;
    } else {
      setMemberPwError(false);
      setMemberPwFocus(false);
      isValidation = true;
    }

    if (errorPw === true) {
      if (!jCaptcha) {
        showAlert('보안문자를 입력하세요');
      } else {
        axiosGet('/api/member/compareCaptchaValue.do?mbId=' + jkey + '&jCaptcha=' + jCaptcha)
          .then(({ data }) => {
            const param = {
              mbId: memberId,
              mbPwdEnc: memberPw,
              jCaptcha: true
            };

            console.log('onLoginHandler -> param', param);

            if (data.key) {
              if (isValidation) dispatch(postLogin(param));
            } else {
              showAlert('보안문자를 잘못 입력하셨습니다');
            }
          })
          .catch((err) => {
            if (process.env.systemEnv === 'local') {
              alert(err.message);
            } else {
              console.log(err);
            }
          });
      }
    } else {
      const param = {
        mbId: memberId,
        mbPwdEnc: memberPw,
        jCaptcha: false
      };
      if (isValidation) dispatch(postLogin(param));
    }
  };

  //벨리데이션 포커스 타겟이동 초기화
  const handleFocusOut = useCallback((e) => {
    setMemberIdFocus(false);
    setMemberPwFocus(false);
  }, []);

  //엔터입력시 처리추가
  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      onLoginHandler(e);
    }
  };

  const onHandleSearchClick = (e) => {
    //본인인증 click
    e.preventDefault();

    if (succYn === 'Y') {
      setAltMsg('이미 인증을 하였습니다.');
      setRodalShow1(true);
    } else {
      setCertShow(true);
    }
  };

  const onHandleNonMemberSearchClick = (e) => {
    e.preventDefault();

    if (mbStrPn === '') {
      setAltMsg('신청번호를 입력하세요.');
      setRodalShow1(true);
      return;
    }
    if (succYn === 'N') {
      setAltMsg('인증하지 않았습니다.');
      setRodalShow1(true);
      return;
    }

    selectSellcarDetail({ mbStrPn: mbStrPn, mbPhone: mbPh }) // "010-9105-9856"
      .then((res) => {
        console.log('selectSellcarDetail ::::: ', res);
        if (res.data.statusinfo.returncd == '000') {
          const data = {
            mbStrPn: mbStrPn,
            mbNm: mbNm
          };

          if (!isEmpty(data)) {
            dispatch(postNonMemberLogin(data));
          }
        } else {
          setAltMsg('내역이 없습니다. 입력하신 정보가 맞는지 확인해주세요.');
          setRodalShow1(true);
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  const certCallback = (e) => {
    console.log(e);
    if (e.RETURN_CD === '0000') {
      setMbNm(e.LGD_MOBILE_SUBAUTH_NAME);
      setMbPh(telToStrFormat(e.LGD_MOBILENUM));
      setCertText('인증성공');
      setCertShow(false);
      setSuccYn('Y');
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
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0010'
        };
        dispatch(postLogin(param));
      } else {
        dispatch(setMemberType('0010'));
        dispatch(setMemberSns({ mbSnsId: String(id), mbSnsKncd: '0010' }));
        Router.push('/member/memberPolicyAgreement');
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
        console.log(payload.data.data);
        //alert(`이미 가입된 SNS 계정입니다.`)
        //Router.push("/login");
        const param = {
          mbSnsId: id,
          mbSnsKncd: '0020'
        };
        dispatch(postLogin(param));
      } else {
        dispatch(setMemberType('0010'));
        dispatch(setMemberSns({ mbSnsId: String(id), mbSnsKncd: '0020' }));
        Router.push('/member/memberPolicyAgreement');
      }
    });
    */
  };

  const onAppleCallback = (data) => {
    console.log('onApple');
    const id = data ? data.profile?.id : '';
    checkSns(id, '0030');
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

  const onChangeCheckBox = (e) => {
    e.preventDefault();
    if (idChk) {
      setIdChk(false);
    } else {
      setIdChk(true);
    }
  };

  const setChange = (e) => {
    e.preventDefault();
    setChangeError(true);
  };

  useEffect(() => {
    //Listen for authorization success
    document.addEventListener('AppleIDSignInOnSuccess', (data) => {
      //handle successful response
      console.log(data);
    });
    //Listen for authorization failures
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
      //handle error.
      console.log(error);
    });

    removeCookie('accessToken');
    removeCookie('accessTokenSession');
    removeCookie('type');
    removeCookie('membertype');
    removeCookie('id');
    removeCookie('name');
    removeCookie('auctPrstlsMbCustno');
    removeCookie('auctPrstlsNrmlMbCustno');
    removeCookie('menuAuthruleCd');
    removeCookie('mbLiveshotYn');
    removeCookie('mbAuthCd');
    removeCookie('refreshToken');
  }, []);

  useEffect(() => {
    if (hasMobile) {
      if (memMode === 'member') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 24,
            color: '#f6f7f8'
          }
        });
      } else if (memMode === 'nonmember') {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 80,
            color: '#ffffff'
          }
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memMode]);

  useEffect(() => {
    console.log('342 isLogin=%o,  loginReturnCd=%o', isLogin, loginReturnCd);
    if (isLogin) {
      setLoginError(false);

      if (!isEmpty(accessToken)) {
        console.log('accessTokenSession');
        createCookie('accessToken', accessToken, accessTokenValidMinute);
        createCookie('accessTokenSession', accessToken); //세션 close >  쿠키삭제
        if (idChk === true) {
          createCookie('idChk', '1', 1000 * 60 * 60 * 24); //1일
          createCookie('Chk', id, 1000 * 60 * 60 * 24); //1일
        }
        createCookie('type', loginType, accessTokenValidMinute);
        createCookie('membertype', membertype, accessTokenValidMinute);
        createCookie('id', id, accessTokenValidMinute);
        createCookie('name', name, accessTokenValidMinute);
        createCookie('auctPrstlsMbCustno', auctPrstlsMbCustno, accessTokenValidMinute);
        createCookie('auctPrstlsNrmlMbCustno', auctPrstlsNrmlMbCustno, accessTokenValidMinute);
        createCookie('menuAuthruleCd', menuAuthruleCd, accessTokenValidMinute);
        createCookie('mbLiveshotYn', mbLiveshotYn, accessTokenValidMinute);
        createCookie('mbAuthCd', mbAuthCd, accessTokenValidMinute);
      }
      if (!isEmpty(refreshToken)) {
        createCookie('refreshToken', refreshToken, refreshTokenValidMinute);
        createCookie('accessTokenSession', accessToken, '');
      }

      dispatch({ type: LOGIN_SUCCESS });

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
        // 종사원증 만료예정(1개월 전).
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

      console.log('======================test========================');

      if (loginType === 'member') {
        if (objIsEmpty(props.router.query.url)) {
          //Router.push({ pathname: '/main', query: {} }, '/main');
          window.location.href = '/main';
        } else {
          console.log(props.router.query.url);
          Router.push(props.router.query.url);
        }
      } else if (loginType === 'nonmember') {
        if (objIsEmpty(props.router.query.url)) {
          const data = {
            mbStrPn: mbStrPn,
            mbNm: mbNm
          };

          /*
          let slReqId = mbStrPn;
          selectSellcar({ slReqId })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
            */
          window.location.href = '/mypage/personal/sellcar/sellCar';
          //Router.push({ pathname: '/mypage/personal/sellcar/sellCar', query: { data: data } }, '/mypage/personal/sellcar/sellCar');
        } else {
          Router.push(props.router.query.url);
        }
      }
    } else {
      console.log('_login>useEffect>loginReturnCd=%o' + loginReturnCd);

      if (changeError) {
        setLoginError(false);
        return;
      }

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
          removeCookie('auctPrstlsMbCustno');
          removeCookie('auctPrstlsNrmlMbCustno');
          removeCookie('menuAuthruleCd');
          removeCookie('mbLiveshotYn');
          removeCookie('mbAuthCd');
          removeCookie('refreshToken');
        }
        // console.log('_login>로그인 오류 >loginReturnCd, LoginError=', loginReturnCd, loginError);
        //MBR4002, MBR4004 처리
        if (loginReturnCd === 'MBR4006') {
          console.log('미승인상태 membertype=%o', membertype);
          let memberTypeText = '딜러';
          if (membertype === '0020') memberTypeText = '딜러';
          else if (membertype === '0030') memberTypeText = '단체';
          else if (membertype === '0040') memberTypeText = '제휴';
          else if (membertype === '0110') memberTypeText = '평가사';
          //매매회원(개인단체) 회원 미승인 상태
          //showAlert(memberTypeText + '회원 가입을 위한 심사가 진행중입니다.<br/> 빠른 처리를 원하시면 고객센터로 문의해주세요.<br/>  고객센터:1600-0080', 'error');
          showAlert(memberTypeText + '회원 가입을 위한 심사가 진행중입니다.<br/>  고객센터:1600-0080', 'error');
          setLoginReturnMsgAlert(memberTypeText + '회원심사중');
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
          tmpMsg += wthdHMap?.mbWthdDt ? wthdHMap.mbWthdDt.substr(0, 2) + '년 ' + wthdHMap.mbWthdDt.substr(2, 2) + '월 ' + wthdHMap.mbWthdDt.substr(4, 2) + '일 ' : '';
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
          setErrorPw(true);

          const key = generateKey(memberId);
          setJkey(key);

          setCaptchaImg(`https://testautobell.glovis.net/api/jcaptcha?jCaptchaKey=${key}`);
        } else if (loginReturnCd === 'SYS9900' && !changeError) {
          setLoginError(true);
          setLoginReturnMsgAlert('회원 아이디 또는 비밀번호가 일치하지 않습니다');
        } else {
          setLoginError(true);
        }
      } else {
        setLoginError(false);
      }
    }
  }, [isLogin, loginType, membertype, loginReturnCd, loginReturnMsgAlert, memMode, loginError, changeError]);

  useEffect(() => {
    dispatch({ type: SECTION_MEMBER });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '로그인',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: memMode === 'member' ? 24 : 80,
          color: memMode === 'member' ? '#f6f7f8' : '#ffffff'
        }
      });
    }
    initAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIdChk(cookies.idChk === '1' ? true : false);
  }, []);

  // 본인인증 PC와 충돌로 구현
  const onClickModCert = (e) => {
    e.preventDefault();
    setCertModShow(true);
    const url = `/api/certification/certModRequest.do`;

    let iframe = document.getElementById('iframe');
    if (iframe == null) {
      iframe = document.createElement('Iframe');
      iframe.setAttribute('id', 'iframe');
      iframe.setAttribute('name', 'iframe');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
    }
    let form = document.getElementById('certificationPop');
    if (form == null) {
      form = document.createElement('form');
      form.setAttribute('id', 'certificationPop');
    }

    let certPop = document.getElementById('certModPop');
    certPop.appendChild(iframe);
    certPop.appendChild(form);

    form.action = url;
    form.target = 'iframe';
    form.method = 'post';
    form.submit();
  };

  useEffect(() => {
    window.addEventListener('message', certModCallback);
  }, []);

  const certModCallback = (e) => {
    console.log('certModCallback -> e', e);
    if (e.data.RETURN_CD === '0000') {
      setCertModShow(false);
      setCertModText('휴대폰 본인인증 완료');
      setMbPh(telToStrFormat(e.data.LGD_MOBILENUM));
      setMbNm(e.data.LGD_MOBILE_SUBAUTH_NAME);
      setSuccYn('Y');
    }
  };

  const onHandleNonMemberModSearchClick = (e) => {
    e.preventDefault();

    if (mbStrPn === '') {
      showAlert('신청번호를 입력하세요.');
      return;
    }
    if (succYn === 'N') {
      showAlert('인증하지 않았습니다.');
      return;
    }

    selectSellcarDetail({ mbStrPn: mbStrPn, mbPhone: mbPh }) // "010-9105-9856"
      .then((res) => {
        console.log(res);
        if (res.data.statusinfo.returncd == '000') {
          const data = {
            mbStrPn: mbStrPn,
            mbNm: mbNm
          };

          if (!isEmpty(data)) {
            dispatch(postNonMemberLogin(data));
          }
        } else {
          showAlert('내역이 없습니다. 입력하신 정보가 맞는지 확인해주세요.');
        }
      })
      .catch((err) => console.log(err));
  };

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="login-contents">
          <div className="login-wrap">
            <TabMenu type="type2 big" callBack={tabClick} defaultTab={tabActive}>
              <TabCont tabTitle="회원 로그인" id="tab7-1" index={0} onClick={handleMemberMode('member')}>
                <div className="pdside20">
                  <MobLogin errorPw={errorPw} noMemArea={false} />
                </div>
              </TabCont>
              <TabCont tabTitle="비회원 로그인" id="tab7-2" index={1} onClick={handleMemberMode('nonmember')}>
                <div className="nomember-wrap bg-white pdside20">
                  <p className="p2">비회원으로 이용하신 내역을 조회하실 수 있습니다.</p>
                  <form className="login-form">
                    <fieldset>
                      <legend className="away">비회원 로그인</legend>
                      <ul className="vert-step">
                        <li className="active">
                          <div className="con">
                            <p className="tit">
                              <span className="step">1</span>신청번호 입력
                            </p>
                            <span>신청번호를 입력해주세요.</span>
                            <label htmlFor="m-apply-num" className="hide">
                              신청번호
                            </label>
                            <Input type="text" placeHolder="신청번호" id="m-apply-num" height={40} marginTop={16} name="mbStrPn" value={mbStrPn} onChange={(e) => setMbStrPn(e.target.value)} />
                          </div>
                        </li>
                        <li className="">
                          {/*진행해야하는 단계 active클래스 추가 -> 완료되면 active제거*/}
                          <div className="con">
                            <p className="tit">
                              <span className="step">2</span>본인인증
                            </p>
                            <span>휴대폰 본인인증을 진행해 주세요.</span>
                            <p className="tx-sub">입력하신 회원님의 개인 정보는 본인인증 이외의목적으로 활용하지 않습니다.</p>
                            <div
                              id="certModPop"
                              style={{ display: certModShow ? 'inline-block' : 'none', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto' }}
                            />
                            <Button size="full" background="blue80" radius={true} title={certModText} height={40} fontSize={14} marginTop={16} onClick={onClickModCert} />
                            {/*<CertificationMod show={certModShow} callback={certModCallback} />*/}
                            {/*<p className="tx-sub tx-red80">본인인증을 진행해주세요.</p>*/}
                          </div>
                        </li>
                      </ul>
                    </fieldset>
                  </form>
                </div>
                <MobBottomArea isFix={true} isSimple={true}>
                  <Buttons align="center" className="full">
                    <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={handleMemberMode('member')} />
                    <Button size="big" background="blue80" title="조회" height={56} onClick={(e) => onHandleNonMemberModSearchClick(e)} />
                  </Buttons>
                </MobBottomArea>
                <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
                  <div className="con-wrap">
                    <p className="tit1" />
                    <p>
                      내역이 없습니다.
                      <br />
                      입력하신 정보가 맞는지 확인해주세요
                    </p>
                    <Buttons align="right" marginTop={24}>
                      <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
                    </Buttons>
                  </div>
                </RodalPopup>
              </TabCont>
            </TabMenu>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h3>로그인</h3>
          </div>

          <div className="login-wrap">
            <TabMenu type="type7" callBack={tabClick} defaultTab={tabActive}>
              <TabCont tabTitle="회원 로그인" id="tab7-1" index={0} onClick={handleMemberMode('member')}>
                <form className="login-form">
                  <fieldset>
                    <legend className="away">로그인</legend>
                  </fieldset>
                  <ul>
                    <li>
                      <label htmlFor="user-id_common" className="hide">
                        아이디
                      </label>
                      <Input
                        type="text"
                        placeHolder="아이디"
                        id="user-id_common"
                        value={memberId}
                        setFocus={memberIdFocus}
                        onBlur={handleFocusOut}
                        width={368}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setChange(e);
                          setMemberId(e.target.value);
                        }}
                      />
                      {memberIdError && (
                        <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                          아이디를 입력해주세요
                        </p>
                      )}
                    </li>
                    <li>
                      <label htmlFor="user-pw" className="hide">
                        비밀번호
                      </label>
                      <Input
                        type="password"
                        placeHolder="비밀번호"
                        id="user-pw"
                        value={memberPw}
                        setFocus={memberPwFocus}
                        onBlur={handleFocusOut}
                        width={368}
                        onKeyPress={handleKeyPress}
                        onChange={(e) => {
                          setChange(e);
                          setMemberPw(e.target.value);
                        }}
                      />
                      {memberPwError && (
                        <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                          비밀번호 입력해주세요
                        </p>
                      )}
                    </li>
                    {loginError && (
                      <p className="tx-exp-tp4" style={{ marginTop: '10px' }}>
                        로그인 오류. {loginReturnMsgAlert}
                        {/* 로그인 오류 [{loginReturnCd}]{loginReturnMsgAlert} */}
                      </p>
                    )}
                    {errorPw === false && (
                      <li>
                        <CheckBox id="chk-save" title="아이디 저장" isSelf={false} value={idChk} checked={idChk} onChange={onChangeCheckBox} />
                      </li>
                    )}
                  </ul>
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
                  <Button size="full" background="blue80" title="로그인" marginTop={20} onClick={(e) => onLoginHandler(e)} />
                </form>

                <div className="other-login">
                  <Buttons marginTop={40}>
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
                        onFailure={(fail) => console.error(fail)}
                      />
                    )}
                    {isIE === false && (
                      <KakaoLogin jsKey="4a7be481fb849c9e5bfc5a9c4436ac3b" onSuccess={(result) => onLoginKakao(result)} render={(props) => <BtnKakao onClick={props.onClick} />} getProfile={true} />
                    )}
                    {isIE === false && (
                      <AppleLogin
                        clientId="autobell.glovisaa.glovis"
                        //redirectURI="http://aaa.autobell.com/appleCallback"
                        redirectURI="https://testautobell.glovis.net/appleCallback"
                        responseType={'code'}
                        responseMode={'query'}
                        render={(props) => <BtnApple onClick={props.onClick} />}
                      />
                    )}
                  </Buttons>
                  {isIE === false && (
                    <p className="tx-sub">
                      <span>SNS 로그인은 일반회원만 가능합니다.</span>
                      <br />
                      딜러회원이시면, 아이디와 비밀번호를 입력하여 로그인해주세요.
                    </p>
                  )}
                </div>
              </TabCont>
              <TabCont tabTitle="비회원 로그인" id="tab7-2" index={1} onClick={handleMemberMode('nonmember')}>
                <div className="tx-bg">
                  <p>
                    비회원으로 이용하신 내역을
                    <br />
                    조회하실 수 있습니다.
                  </p>
                </div>
                <form className="login-form">
                  <fieldset>
                    <legend className="away">비회원 로그인</legend>
                    <ul className="vert-step">
                      <li>
                        <span className="step">1</span>
                        <div className="con">
                          <p className="tit">신청번호 입력</p>
                          <span>신청번호를 입력해주세요.</span>
                          <label htmlFor="apply-num" className="hide">
                            신청번호
                          </label>
                          <Input type="text" placeHolder="신청번호" id="apply-num" width={308} name="mbStrPn" value={mbStrPn} onChange={(e) => setMbStrPn(e.target.value)} />
                        </div>
                      </li>
                      <li>
                        <span className="step">2</span>
                        <div className="con">
                          <p className="tit">본인인증</p>
                          <span>휴대폰 본인인증을 진행해 주세요.</span>
                          <Button size="mid" background="blue80" title={certText} width={160} height={48} onClick={(e) => onHandleSearchClick(e)} />
                          <Certification show={certShow} callback={certCallback} />
                          <p className="tx-sub">
                            입력하신 회원님의 개인 정보는{' '}
                            <span>
                              본인인증 이외의
                              <br />
                              목적으로 활용하지 않습니다.
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </fieldset>
                </form>
              </TabCont>
            </TabMenu>
          </div>
          {memMode === 'member' && (
            <>
              <ul className="find-info">
                <li>
                  <a className="btn" href="#" onClick={() => Router.push({ pathname: '/member/foundIdPwd', query: { data: 0 } }, '/member/foundIdPwd')}>
                    아이디찾기
                  </a>
                </li>
                <li>
                  <a className="btn" href="#" onClick={() => Router.push({ pathname: '/member/foundIdPwd', query: { data: 1 } }, '/member/foundIdPwd')}>
                    비밀번호찾기
                  </a>
                </li>
              </ul>
              <div className="member-etc-area">
                <p className="member-etc-msg">
                  아직 현대 글로비스 오토벨 회원이 아니세요?
                  <br />
                  <Link href="/member/choiceMemberType">
                    <a className="btn">회원가입</a>
                  </Link>
                </p>
              </div>
            </>
          )}
          {memMode === 'nonmember' && (
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="조회" width={180} height={60} onClick={onHandleNonMemberSearchClick} />
            </Buttons>
          )}
        </div>
      </div>
      <RodalPopup show={rodalShow1} type={'fade'} width={375} closedHandler={modalCloseHandler1} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>{altMsg}</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} buttonMarkup={true} onClick={() => setRodalShow1(false)} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
});

Login.propTypes = {
  router: PropTypes.object,
  onClick: PropTypes.func
};
Login.displayName = 'Login';
export default withRouter(Login);
