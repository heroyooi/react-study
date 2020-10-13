import React, { useState, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import Gnb from './Gnb';
import NoticeMenu from './NoticeMenu';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '@src/actions/types';
import { CommonContext } from './TopWrapper';

const Header = () => {
  const { isLogin, isSection, hasMobile, mHeaderType, mHeaderTitle, mHeaderOptions, mHeaderEvents } = useSelector(state => state.common);
  const dispatch = useDispatch();
  const { siteMapActive, setSiteMapActive, headerFix } = useContext(CommonContext);
  const handleLogOut = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: LOGOUT_SUCCESS });
  }, []);
  const handleLogIn = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: LOGIN_SUCCESS });
  }, []);
  const handleMenu = useCallback((e) => {
    e.preventDefault();
    setSiteMapActive(siteMapActive => !siteMapActive);
    if (hasMobile) document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, [siteMapActive]);
  const handleBack = (e) => {
    e.preventDefault();
    Router.back();
  }

  if (hasMobile) {
    const [noticeActive, setNoticeActive] = useState(false);
    const handleNoticeMenu = useCallback((e) => {
      e.preventDefault();
      setNoticeActive(prev => !prev);
      document.getElementsByTagName('html')[0].style.overflow = noticeActive ? 'auto' : 'hidden';
    }, [noticeActive]);
    const handleCloseMenu = useCallback(() => {
      setSiteMapActive(false);
      if (!noticeActive) document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, [noticeActive]);
    const handleCloseNotice = useCallback(() => {
      setNoticeActive(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, []);
    return (
      <>
        {mHeaderType === "main" && (
          <header id="header" className={headerFix ? "header main" : "header main transparent"}>
            <h1><img src="/images/mobile/common/autobell-logo-tit.svg" alt="로고" /></h1>
            <button type="button" className="btn-gnb" onClick={handleMenu}>전체메뉴</button>
            {/* <button type="button" className="btn-logout">로그아웃</button>
            <button type="button" className="btn-mypage">마이페이지</button>
            <button type="button" className="btn-login">로그인</button> */}
            <button type="button" className="btn-signup">회원가입</button>
          </header>
        )}
        {
          mHeaderType === "sub" && (
            <>
              <header id="header" className={
                mHeaderOptions.includes('transparent')
                  ? headerFix ? "header" : "header transparent"
                  : "header"
              }>
                <h1 className={mHeaderOptions.includes('back') ? null : 'first'}>{mHeaderTitle}</h1>              
                {mHeaderOptions.includes('back') && <button type="button" className="btn-back" onClick={handleBack}>뒤로</button>}
                {mHeaderOptions.includes('alarm') && <button type="button" className="btn-alarm new" onClick={handleNoticeMenu}>알람</button>}{/* 새로운 알람이 있을 경우 new가 붙습니다. */}
                {mHeaderOptions.includes('search') && <button type="button" className="btn-search" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf("search")]}>검색</button>}
                
                {mHeaderOptions.includes('voucher') && <button type="button" className="btn-voucher" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf("voucher")]}><span>이용권 1</span><span>D-92</span></button>}
                {mHeaderOptions.includes('gnb') && <button type="button" className="btn-gnb" onClick={handleMenu}>전체메뉴</button>}
                {mHeaderOptions.includes('close') && <button type="button" className="btn-close">닫기</button>}
                {mHeaderOptions.includes('reset') && <button type="button" className="btn-reset" onClick={mHeaderEvents && mHeaderEvents[mHeaderOptions.indexOf("reset")]}>초기화</button>}
              </header>
              <NoticeMenu active={noticeActive} />
              {noticeActive && <div className="modal-bg active" onClick={handleCloseNotice}></div>}
            </>
          )
        }
        {siteMapActive && <div className="modal-bg v-2 active" onClick={handleCloseMenu}></div>}
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
    )
  }
  
  return (
    <header id="header-sec" className={headerFix ? "fixed" : null}>
      <div className="inner">
        <h1><Link href="/main"><a>헤더</a></Link></h1>
        <Gnb isSection={isSection} />
        <ul className="utilmenu">
          <li className={isSection === "autoAuction" ? "txt on" : "txt"}><Link href="/autoAuction/auctionHome"><a>오토옥션</a></Link></li>
          <li className={isSection === "pricingSystem" ? "txt on" : "txt"}><Link href="/pricingSystem/pricing01"><a>프라이싱시스템</a></Link></li>{/* 딜러 회원일 경우만 */}
          {
            isLogin === true ?
            <>
              <li className="ico logout"><a href="#" onClick={handleLogOut}>로그아웃</a></li>
              <li className="ico mypage"><Link href="/mypage"><a>마이페이지</a></Link></li> 
            </>
            :
            <>
              <li className="ico login"><a href="#" onClick={handleLogIn}>로그인</a></li>
              <li className="ico signup"><Link href="/signup"><a>회원가입</a></Link></li>
            </>
          }
          <li className="ico menu"><a href="#" onClick={handleMenu}>메뉴</a></li>
        </ul>
      </div>
    </header>
  )
}

export default Header;