import React, { memo, useEffect, useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie';
import { isEmpty } from 'lodash';
import Cookies from 'js-cookie';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@src/actions/types';
import { POST_LOGOUT } from '@src/actions/member/loginTypes';
import { postLogout, postTokenRefresh } from '@src/actions/member/loginAction';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import { SystemContext } from '@src/provider/SystemProvider';
import Gnb from './Gnb';
import NoticeMenu from './NoticeMenu';
import { CommonContext } from './TopWrapper';
import { preventScroll } from '@src/utils/CommonUtil';

const globalThis = require('globalthis')();

const Header = memo((menuTreeData) => {
  const dispatch = useDispatch();
  const delta = 30 * 1000; // 30 sec
  const { isSection, hasMobile, mHeaderType, mHeaderTitle, mHeaderOptions, mHeaderEvents } = useSelector((state) => state.common);
  const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
  const { siteMapActive, setSiteMapActive, headerFix } = useContext(CommonContext);
  const [noticeActive, setNoticeActive] = useState(false);
  const pricingTicketInfo = useSelector((state) => state.pricing.prcingTicketInfo);
  const { isLoginPC, membertype, loginReturnCheckCd, isLoginPCByState } = useSelector((state) => ({
    membertype: state.login.membertype,
    loginReturnCheckCd: state.login.loginReturnCd,
    isLoginPCByState: state.login.isLogin,
    // isLoginPC: isEmpty(cookies.accessToken) ? state.login.isLogin : true // state.login.isLogin
    isLoginPC: state.login.isLogin // state.login.isLogin
  }));

  const [isLoginScreen, setIsLoginScreen] = useState(false); // 화면단 사용
  const { showConfirm } = useContext(SystemContext);

  const [cookieMemberType, setCookieMemberType] = useState(); // 화면단 사용
  const [cookieType, setCookieType] = useState(); // 화면단 사용
  // console.log('isLoginPC isLoginScreen=%o,isLoginPC=%o,isLoginPCByState=%o,cookies.accessToken=%o,', isLoginScreen, isLoginPC, isLoginPCByState, cookies.accessToken);
  const [headerHover, setHeaderHover] = useState(false);

  // 딜러 알람버튼 스타일 변경용
  const dealerMypageInfo = useSelector((state) => state.layout.dealerMypageInfo);

  const handleLogOut = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      showConfirm(
        '<p>로그아웃하시겠습니까?</p>',
        () => {
          console.log('Header>removeCookie cookies=%o', cookies);
          Cookies.remove('accessTokenSession');
          Cookies.remove('accessToken');
          Cookies.remove('id');
          Cookies.remove('name');
          Cookies.remove('type');
          Cookies.remove('membertype');
          Cookies.remove('refreshToken');
          Cookies.remove('menuAuthruleCd');
          Cookies.remove('mbLiveshotYn');
          Cookies.remove('mbAuthCd');
          dispatch(postLogout());
          dispatch({ type: LOGOUT_SUCCESS });
          dispatch({ type: POST_LOGOUT });
          setIsLoginScreen(false);
          // Router.push('/login');
          globalThis.window.location.href = '/login';
        },
        () => {}
      );
    },
    [cookies, dispatch, removeCookie, showConfirm]
  );

  const handleLogIn = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: LOGIN_SUCCESS });
      // setIsLoginScreen(true);
      //Router.push('/login');
      window.location.href = '/login';
    },
    [dispatch]
  );

  const handleMenu = useCallback(
    (e) => {
      e.preventDefault();
      setSiteMapActive((siteMapActive) => !siteMapActive);
      if (hasMobile) preventScroll(true);
    },
    [hasMobile, setSiteMapActive]
  );

  const handleBack = (e) => {
    e.preventDefault();
    Router.back();
  };

  const handleNoticeMenu = useCallback(
    (e) => {
      e.preventDefault();
      setNoticeActive((prev) => !prev);
      preventScroll(!noticeActive);
    },
    [noticeActive]
  );

  const handleCloseMenu = useCallback(() => {
    setSiteMapActive(false);
    if (!noticeActive) preventScroll(false);
  }, [noticeActive, setSiteMapActive]);

  const handleCloseNotice = useCallback(() => {
    setNoticeActive(false);
    preventScroll(false);
  }, []);

  // useEffect(() => {
  //   console.log(isLoginPC);
  // }, [isLoginPC]);
  const handleHover = useCallback(
    (e, status) => {
      if (status === true) {
        setHeaderHover(true);
      }
    },
    [headerHover]
  );

  const headerLeave = useCallback((e) => {
    setHeaderHover(false);
  }, []);

  useEffect(() => {
    if (isEmpty(Cookies.get('accessTokenSession')) && !isEmpty(Cookies.get('refreshToken'))) {
      console.log('Header>useEffect> removeCookie cookies=%o', cookies);

      Cookies.remove('accessTokenSession');
      Cookies.remove('accessToken');
      Cookies.remove('id');
      Cookies.remove('name');
      Cookies.remove('type');
      Cookies.remove('membertype');
      Cookies.remove('refreshToken');
      Cookies.remove('menuAuthruleCd');
      Cookies.remove('mbLiveshotYn');
      Cookies.remove('mbAuthCd');
      dispatch({ type: LOGOUT_SUCCESS });
      dispatch({ type: POST_LOGOUT });
      console.log('Header>useEffect> 117 isLoginPC=%o, cookies.accessToken=%o, cookies.accessTokenSession=%o', isLoginPC, Cookies.get('accessToken'), Cookies.get('accessTokenSession'));
      console.log('Header>useEffect> 117 isEmpty(Cookies.get(accessToken))=%o', isEmpty(Cookies.get('accessToken')));
      const loginTemp = isEmpty(Cookies.get('accessToken')) && isEmpty(Cookies.get('refreshToken')) ? isLoginPC : true;
      setIsLoginScreen(loginTemp);
      console.log('Header>useEffect> 117 IsLoginScreen=%o,loginTemp=%o', isLoginScreen, loginTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { accessToken, membertype, refreshToken, type } = cookies;

    if (!isEmpty(accessToken) && !isEmpty(refreshToken) && isLoginPC) {
      console.log('sssssssssssssssssssssssssssssss');
      const decoded = jwt.decode(accessToken);
      const expireTime = decoded ? decoded.exp : 0;
      if (expireTime < delta) {
        // dispatch(postTokenRefresh({}, refreshToken)); //리프레시토큰으로 새로운 액세스토큰 발행
      }
    }

    if (isEmpty(Cookies.get('accessToken')) && !isEmpty(Cookies.get('refreshToken'))) {
      //유효기간 만료
      //  dispatch(postTokenRefresh({}, cookies.refreshToken)); //리프레시토큰으로 새로운 액세스토큰 발행
    }
    console.log('175 쿠키변경 Header>useEffect>  cookies.accessToken=%o,isLoginPC=%o', Cookies.get('accessToken'), isLoginPC);

    setIsLoginScreen(isEmpty(Cookies.get('refreshToken')) ? isLoginPC : true);
    setCookieMemberType(membertype); //쿠키에서 가져온 회원구분
    setCookieType(type); //쿠키에서 가져온 회원구분
  }, [Cookies.get('accessToken'), Cookies.get('refreshToken'), delta, dispatch, isLoginPC, loginReturnCheckCd]);

  // 새로운 알람 감지용
  const [alarmNew, setAlarmNew] = useState(false);

  useEffect(() => {
    if (dealerMypageInfo?.homeServiceResCount === '0' || dealerMypageInfo?.homeServiceResCount === null) {
      setAlarmNew(false);
    } else {
      setAlarmNew(true);
      return;
    }
    if (dealerMypageInfo?.noteSentBoxCount === '0' || dealerMypageInfo?.noteSentBoxCount === null) {
      setAlarmNew(false);
    } else {
      setAlarmNew(true);
      return;
    }
    if (dealerMypageInfo?.compareEstimateCount === '0' || dealerMypageInfo?.compareEstimateCount === null) {
      setAlarmNew(false);
    } else {
      setAlarmNew(true);
      return;
    }
  }, [alarmNew, dealerMypageInfo]);

  if (hasMobile) {
    return (
      <>
        {mHeaderType === 'main' && (
          <header id="header" className={headerFix ? 'header main' : 'header main transparent'}>
            <h1>
              <img src="/images/mobile/common/autobell-logo-tit.svg" alt="로고" />
            </h1>
            <button type="button" className="btn-gnb" onClick={handleMenu}>
              전체메뉴
            </button>
            {/* <button type="button" className="btn-logout">로그아웃</button>
            <button type="button" className="btn-mypage">마이페이지</button>
            <button type="button" className="btn-login">로그인</button> */}
            <button type="button" className="btn-signup">
              회원가입
            </button>
          </header>
        )}
        {/* console.log(handleBack) */}
        {mHeaderType === 'sub' && (
          <>
            <header
              id="header"
              className={
                mHeaderOptions.includes('transparent')
                  ? mHeaderOptions.includes('t-black')
                    ? headerFix
                      ? 'header t-black'
                      : 'header transparent t-black'
                    : headerFix
                    ? 'header'
                    : 'header transparent'
                  : 'header'
              }
            >
              <h1 className={mHeaderOptions.includes('back') ? null : 'first'}>{mHeaderTitle}</h1>
              {mHeaderOptions.includes('back') && (
                <button
                  type="button"
                  className="btn-back"
                  onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf('back')] !== null ? mHeaderEvents[mHeaderOptions.indexOf('back')] : handleBack}
                >
                  뒤로
                </button>
              )}
              {mHeaderOptions.includes('alarm') && (
                <button type="button" className={alarmNew ? 'btn-alarm new' : 'btn-alarm'} onClick={handleNoticeMenu}>
                  알람
                </button>
              )}
              {/* 새로운 알람이 있을 경우 new가 붙습니다. */}
              {mHeaderOptions.includes('search') && (
                <button type="button" className="btn-search" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf('search')]}>
                  검색
                </button>
              )}

              {mHeaderOptions.includes('voucher') && (
                <button type="button" className="btn-voucher" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf('voucher')]}>
                  <span>조회 가능 횟수</span>
                  <span>{pricingTicketInfo?.availableAdCnt || 0}회</span>
                </button>
              )}
              {mHeaderOptions.includes('gnb') && (
                <button type="button" className="btn-gnb" onClick={handleMenu}>
                  전체메뉴
                </button>
              )}
              {mHeaderOptions.includes('close') && (
                <button type="button" className="btn-close" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf('close')]}>
                  닫기
                </button>
              )}
              {mHeaderOptions.includes('reset') && (
                <button type="button" className="btn-reset" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf('reset')]}>
                  초기화
                </button>
              )}
            </header>
            <NoticeMenu active={noticeActive} />
            {noticeActive && <div className="modal-bg active" onClick={handleCloseNotice} />}
          </>
        )}
        {siteMapActive && <div className="modal-bg v-2 active" onClick={handleCloseMenu} />}
        {/*  
※ 헤더 옵션 별 dispatch 구문
import { useDispatch } from 'react-redux';          
import { MOBILE_HEADER_TYPE_MAIN, MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';

const dispatch = useDispatch();
// 메인
dispatch({
  type: MOBILE_HEADER_TYPE_MAIN
});

// Only 뒤로가기 버튼
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['back']
  }
});

// 뒤로가기 + GNB 버튼
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['back', 'gnb']
  }
});

// 뒤로가기 + 알람 + GNB 버튼
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['back', 'alarm', 'gnb']
  }
});

// 뒤로가기 + 검색 + GNB 버튼
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['back', 'search', 'gnb']
  }
});

// 뒤로가기 버튼 없음 (팝업)
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['close']
  }
});

// 뒤로가기 + 닫기 버튼 (팝업)
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '서브타이틀',
    options: ['back', 'close']
  }
});

// 투명 헤더일 경우(서브 메인)
dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '내차사기',
    options: ['back', 'transparent']
  }
});

// 버튼에 이벤트가 들어가는 경우
const handleEvent = (e) => {
  e.preventDefault();
  alert('이벤트가 일어납니다.');
};

dispatch({
  type: MOBILE_HEADER_TYPE_SUB,
  data: {
    title: '검색 결과 123,456 대',
    options: ['back', 'search', 'gnb'],
    events: [null, handleEvent, null]
  }
});

※ 컨텐츠 별 스타일을 위한 dispatch 구문
import { useDispatch } from 'react-redux';          
import { MOBILE_CONTENT_STYLE } from '@src/actions/types';

// 아무 조건도 없는 경우
dispatch({
  type: MOBILE_CONTENT_STYLE,
  data: {
    bottom: 0,
    color: '#ffffff'
  }
});

// 전체 컨텐츠에서 배경색과 하단 픽스 버튼이 있는 경우
dispatch({
  type: MOBILE_CONTENT_STYLE,
  data: {
    bottom: 56,
    color: '#f6f7f8'
  }
});
        */}
      </>
    );
  }

  return (
    <header id="header-sec" className={headerFix ? 'fixed' : headerHover ? 'h-hover' : null} onMouseLeave={headerLeave}>
      <div className="inner">
        <h1>
          <Link href="/main">
            <a>헤더</a>
          </Link>
        </h1>
        <Gnb isSection={isSection} menuTreeData={menuTreeData} handleHover={handleHover} />
        <ul className="utilmenu">
          {cookieMemberType === '0110' ? (
            ''
          ) : (
            <li className={isSection === 'autoAuction' ? 'txt on' : 'txt'}>
              <Link href="/autoAuction/auctionGate">
                <a>스마트옥션</a>
              </Link>
            </li>
          )}
          {/* 딜러 회원일 경우만 
          <li className={isSection === 'pricingSystem' ? 'txt on' : 'txt'}>
            <Link href="/pricingSystem/pricing">
              <a>프라이싱시스템</a>
            </Link>
          </li>
          
          */}
          {console.log('405 Header>useEffect> isLoginScreen=%o,membertype=%o,cookieMemberType=%o,cookieType=%o', isLoginScreen, membertype, cookieMemberType, cookieType)}
          {/*console.log('406 Header>useEffect> Cookies.accessToken=%o,Cookies.refreshToken=%o', Cookies.get('accessToken'), Cookies.get('refreshToken'))*/}
          {isLoginScreen ? (
            <>
              <li className="ico logout">
                <Tooltip placement="bottom" width={65} simple={true}>
                  <TooltipItem>
                    <a href="#" onClick={handleLogOut}>
                      로그아웃
                    </a>
                  </TooltipItem>
                  <TooltipCont>로그아웃</TooltipCont>
                </Tooltip>
              </li>
              <li className="ico mypage">
                {cookieMemberType === '0110' ? (
                  ''
                ) : cookieMemberType === '0010' || (isEmpty(cookieMemberType) && cookieType === 'nonmember') ? (
                  <Tooltip placement="bottom" width={70} simple={true}>
                    <TooltipItem>
                      <Link href="/mypage/personal/personalMain">
                        <a>마이페이지</a>
                      </Link>
                    </TooltipItem>
                    <TooltipCont>마이페이지</TooltipCont>
                  </Tooltip>
                ) : (
                  <Tooltip placement="bottom" width={70} simple={true}>
                    <TooltipItem>
                      <Link href="/mypage/dealer/sellcar/carManagement">
                        <a>마이페이지</a>
                      </Link>
                    </TooltipItem>
                    <TooltipCont>마이페이지</TooltipCont>
                  </Tooltip>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="ico login">
                <Tooltip placement="bottom" width={60} simple={true}>
                  <TooltipItem>
                    <a href="#" onClick={handleLogIn}>
                      로그인
                    </a>
                  </TooltipItem>
                  <TooltipCont>로그인</TooltipCont>
                </Tooltip>
              </li>
              <li className="ico signup">
                <Tooltip placement="bottom" width={65} simple={true}>
                  <TooltipItem>
                    <Link href="/member/choiceMemberType">
                      <a>회원가입</a>
                    </Link>
                  </TooltipItem>
                  <TooltipCont>회원가입</TooltipCont>
                </Tooltip>
              </li>
            </>
          )}
          <li className="ico menu">
            <a href="#" onClick={handleMenu}>
              메뉴
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
