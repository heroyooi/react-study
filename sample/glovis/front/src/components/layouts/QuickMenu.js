import { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import CarComponent from './CarComponent';
import { axiosGetJson, axiosPost, axiosPostAsync } from '@src/utils/HttpUtils';
import animateScrollTo from 'animated-scroll-to';
import { getLastQuickViewList } from '@src/actions/mypage/personal/buycar/buycarActions';
import { getCompareList, getInterestList } from '@src/actions/main/mainAction';
import { isEmpty } from 'lodash';

import { SystemContext } from '@src/provider/SystemProvider';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { isAndroid, isIOS } from '@src/utils/CommonUtil';
import { location, window, alert } from 'globalthis/implementation';

import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

const QuickMenu = () => {
  const dispatch = useDispatch();
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [quickActive, setQuickActive] = useState(false);
  const [page, setPage] = useState(1);
  const { quickViewList, qCurrentPage, qTotalCount } = useSelector((rootStore) => rootStore.personalPage); //최근본차량
  // const [compareBoxList, setCompareBoxList] = useState([]); //차량비교함 목록=>redux이동
  // const [currentPageCompare, setCurrentPageCompare] = useState(1); //차량비교함 현재페이지=>redux이동
  // const [totalCountCompare, setTotalCountCompare] = useState(1); //차량비교함 전체 건수=>redux이동
  // const [interList, setInterList] = useState([]); //관심차량 목록=>redux이동
  // const [totalCountInterest, setTotalCountInterest] = useState(1); //관심차량 전체 건수=>redux이동
  // const [currentPageInterest, setCurrentPageInterest] = useState(1); //관심차량 현재페이지=>redux이동
  const { compareBoxList, currentPageCompare, compareBoxListTotalcount, interList, totalCountInterest, currentPageInterest } = useSelector((state) => state.main);
  const [latestListData, setLatestListData] = useState([]); //최근본차량 목록
  const [pageSize, setPageSize] = useState(1); //페이지당 노출갯수
  const [currentPageRecentCookie, setCurrentPageRecentCookie] = useState(1); //최근차량 쿠키 페이지번호(index)

  const [totalCountRecentCookie, setTotalCountRecentCookie] = useState(1); //최근차량 쿠키 전체 건수
  // const [isLoginState, setIsLoginState] = useState(false); //로그인여부
  // const { isLogin } = useSelector((state) => state.common);
  // const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
  const [cookies, setCookie, removeCookie] = useCookies(['recentCar']);

  const { isLogin } = useSelector((state) => ({
    isLogin: state.login.isLogin // state.login.isLogin

    // isLogin: isEmpty(cookies.accessToken) ? state.login.isLogin : true
  }));
  const [isLoginScreen, setIsLoginScreen] = useState(false); //isEmpty(cookies.accessToken) ? isLogin : true); // 화면단 사용
  const recentCarValidMinute = 1000 * 60 * 60 * 24 * 90; //최근본차량(로그오프시 노출) 유효시간 3개월

  // 앱, 웹 브라우저에 따른 버튼 출력 여부 확인 객체
  const [appCheck, setAppCheck] = useState(false);

  useEffect(() => {
    console.log('앱설치여부 확인중');
    console.log(window.navigator.userAgent);
    const MobUA = window.navigator.userAgent;
    // 앱일경우
    if (MobUA.includes('AUTOBELL_Android') || MobUA.includes('AUTOBELL_iOS')) {
      setAppCheck(false);
    } else {
      setAppCheck(true);
    }
  }, []);

  //퀵뷰 보이기/숨김
  const handleQuickMenu = useCallback(
    (e) => {
      e.preventDefault();
      setQuickActive((quickActive) => !quickActive);
    },
    [quickActive]
  );

  //퀵뷰 닫기
  const handleQuickClose = useCallback((e) => {
    e.preventDefault();
    setQuickActive(false);
  }, []);

  //퀵뷰 맨위로 이동
  const handleQuickTop = useCallback((e) => {
    e.preventDefault();
    animateScrollTo(0);
  }, []);

  //list 최초 조회
  useEffect(() => {
    setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLogin : true);

    console.log('퀵메뉴조회>최초조회> useEffect>isLoginScreen=%o,isLogin=%o, isEmpty Cookies=%o', isLoginScreen, isLogin, isEmpty(Cookies.get('accessToken')));
    quickViewDataSearch();
  }, []);

  const quickViewDataSearch = () => {
    const param = {
      pageSize: pageSize,
      pageNo: page
    };

    if (!isEmpty(Cookies.get('accessToken'))) {
      console.log('퀵메뉴조회 quickViewDataSearch> [로그인] 최근차량목록 api조회 > useEffect>isLoginScreen=%o', isLoginScreen);

      dispatch(getCompareList(param)); //차량비교함 조회
      dispatch(getLastQuickViewList(param)); //최근본차량 조회
      dispatch(getInterestList(param)); //관심차량 조회
    } else {
      //비로그인시 쿠키에서 최근차량목록 가져옴
      const recentCarCookieList = cookies.recentCar;
      if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
        console.log('퀵메뉴조회 quickViewDataSearch> [비로그인] useEffect>최근차량목록 쿠키조회>[recentCarCookieList]=%o', recentCarCookieList);
        let cookieList = [];
        cookieList = cookieList.concat(recentCarCookieList[0]);
        setLatestListData(cookieList);
        setCurrentPageRecentCookie(1);

        setTotalCountRecentCookie(recentCarCookieList.length);
      }
    }
  };

  useEffect(() => {
    console.log('퀵메뉴조회 QuickMenu> useEffect 쿠키변경 > isLoginScreen=%o,cookies.accessTokenSession=%o', isLoginScreen, cookies.accessTokenSession);
    quickViewDataSearch();
  }, [cookies.accessToken, cookies.refreshToken, dispatch, isLoginScreen]);

  //최근본차량 조회결과 list 생성
  useEffect(() => {
    console.log('퀵메뉴조회>최근본차량 quickViewList변동 [quickViewList]=%o', quickViewList);
    // if (typeof quickViewList !== 'undefined' && quickViewList.length > 0) {
    if (typeof quickViewList !== 'undefined') {
      setLatestListData(quickViewList); //최근 본 차량 list생성
      setPage(qCurrentPage);
      console.log('퀵메뉴조회 [로그인] >최근본차량 API조회 완료 [latestListData]=%o', quickViewList);
    }
  }, [quickViewList]);

  //목록 재조회
  const onRefreshHandle = useCallback((e, target) => {
    e.preventDefault();
    console.log('onRefreshHandle>[target]=%o', target);
    const param = {
      pageSize: 1,
      pageNo: 1
    };

    if (target === 'compare') dispatch(getCompareList(param));
    else if (target === 'latest') dispatch(getLastQuickViewList(param));
    else if (target === 'interest') dispatch(getInterestList(param));
  }, []);

  //차량비교함>페이지이동
  const onChangePageCompareHandle = useCallback((e, param) => {
    e.preventDefault();
    console.log('onChangePageCompareHandle>[param]=%o', param);
    dispatch(getCompareList(param));
  }, []);

  //최근본차량>페이지이동
  const onChangePageLatestHandle = useCallback((e, param) => {
    e.preventDefault();
    // if (isLoginScreen) {
    if (!isEmpty(Cookies.get('accessToken'))) {
      console.log('퀵메뉴조회 [로그인] > 최근본차량>API 페이지이동 onChangePageLatestHandle>[param]=%o', param);
      dispatch(getLastQuickViewList(param));
    } else {
      const recentCarCookieList = cookies.recentCar;
      console.log('퀵메뉴조회 [비로그인] 페이지변경 onChangePageLatestHandle>쿠키조회>[recentCarCookieList]=%o', recentCarCookieList);
      if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
        let cookieList = [];
        let cookieIndex = Number(param.pageNo) - 1;
        console.log('퀵메뉴조회 최근본차량>쿠키 페이지이동 onChangePageLatestHandle>쿠키조회>[cookieIndex]=%s,[recentCarCookieList]=%o', cookieIndex, recentCarCookieList);
        cookieList = cookieList.concat(recentCarCookieList[cookieIndex]);
        setLatestListData(cookieList);
        setCurrentPageRecentCookie(Number(param.pageNo));
      }
    }
  }, []);

  //관심차량>페이지이동
  const onChangePageInterHandle = useCallback((e, param) => {
    e.preventDefault();
    console.log('퀵메뉴조회 [로그인] > onChangePageInterHandle>[param]=%o', param);
    dispatch(getInterestList(param));
  }, []);

  //차량비교함 조회
  // const getCompareList = (param) => {
  //   axiosGetJson('/api/main/selectCarCompareBoxList.do', param).then((res) => {
  //     console.log('getCompareList>result>>[res]=%o', res);
  //     const result = res.data.statusinfo.returncd;
  //     const list = res.data.data;
  //     if (result === 'SUCCESS') {
  //       setCompareBoxList(list);
  //       setCurrentPageCompare(param.pageNo);
  //       setTotalCountCompare(res.data.totalCnt);
  //     } else {
  //       //조회결과 없음
  //       //차량비교함
  //       setCompareBoxList([]);
  //       setCurrentPageCompare(1);
  //       setTotalCountCompare(1);
  //     }
  //   });
  // };

  //차량비교함 삭제
  const handleDeleteCarCompareBoxAction = (e, type, dlrPrdId) => {
    const param01 = {
      dlrPrdId: dlrPrdId
    };
    console.log('퀵메뉴조회 [로그인] >handleDeleteCarCompareBoxAction>[param01]=%o', param01);
    axiosPostAsync('/api/main/deleteCarCompareBox.do', param01).then((res) => {
      console.log('handleDeleteCarCompareBoxAction>result>>[res]=%o', res);
      const result = res.data.statusinfo.returncd;
      if (result === 'SUCCESS') {
        //비교함 다시조회
        const param02 = {
          pageSize: 1,
          pageNo: 1
        };
        dispatch(getCompareList(param02));
      } else {
        showAlert('삭제에 실패하였습니다.');
        return false;
      }
    });
  };

  //로그인 refresh
  const onLoginRefresh = () => {
    // e.preventDefault();
    setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLogin : true);
    console.log('퀵메뉴조회 onLoginRefresh isLoginScreen=%o', isLoginScreen);
  };

  //관심차량 조회=>redux이동
  // const getInterestList = (param) => {
  //   axiosPost('/api/mypage/user/interest/selectInterestMemberCar.do', param).then((res) => {
  //     console.log('getInterestList>result>>[res]=%o', res);
  //     const result = res.data.statusinfo.returncd;
  //     const list = res.data.data;
  //     if (result === '000') {
  //       //관심차량
  //       setInterList(list);
  //       setCurrentPageInterest(param.pageNo);
  //       setTotalCountInterest(res.data.totalCount);
  //     } else {
  //       //조회결과 없음

  //       //관심차량
  //       setInterList([]);
  //       setCurrentPageInterest(param.pageNo);
  //       setTotalCountInterest(1);
  //     }
  //   });
  // };

  //최근본차량, 관심차량 삭제
  const handleDeleteAction = useCallback((e, type, dlrPrdId) => {
    const param = {
      prdNums: dlrPrdId
    };

    if (isLoginScreen) {
      let url = '';
      if (type === '02') url = `/api/mypage/user/deleteRecentlyCar.do`;
      //최근본차량
      else if (type === '03') url = `/api/mypage/user/interest/deleteInterestMemberCar.do`; //관심차량
      console.log('퀵메뉴조회 [로그인] > 삭제 handleDeleteAction>[param]=%o, >[url]=%s', param, url);

      axiosPost(url, param).then((res) => {
        console.log(res.data.data);

        const result = Number(res.data.data);

        if (result > 0) {
          showAlert('삭제되었습니다.');

          const param = {
            pageSize: pageSize,
            pageNo: page
          };
          if (type === '02') {
            dispatch(getLastQuickViewList(param)); //최근본차량 조회
          } else if (type === '03') {
            dispatch(getInterestList(param)); //관심차량 조회
          }
        } else {
          showAlert('삭제에 실패하였습니다.');
          return false;
        }
      });
    } else {
      //비로그인 상태=> 쿠키에서 해당차량 삭제
      const recentCarCookieList = cookies.recentCar;
      console.log('handleDeleteAction>쿠키삭제전>[recentCarCookieList]=%o', recentCarCookieList);
      if (typeof recentCarCookieList !== 'undefined' && recentCarCookieList.length > 0) {
        //배열에서 해당키 삭제
        const newArr = recentCarCookieList.filter(function(item) {
          return item.dlrPrdId !== dlrPrdId;
        });

        let cookieList = [];
        cookieList = cookieList.concat(newArr);
        console.log('퀵메뉴조회 [비로그인] > handleDeleteAction>쿠키삭제후>[cookieList]=%o', cookieList);
        removeCookie('recentCar');
        createCookie('recentCar', cookieList, recentCarValidMinute);
        setLatestListData(cookieList);
        setCurrentPageRecentCookie(1);
        setCurrentPageRecentCookie(newArr.length);
      }
    }
  });

  const createCookie = useCallback((cookieName, cookieValue, validTime) => {
    let expires = new Date();
    expires.setTime(expires.getTime() + validTime);
    setCookie(cookieName, cookieValue, { path: '/', expires });
    console.log('createCookie > cookieName, cookieValue, expires=', cookieName, cookieValue, expires);
  }, []);

  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);

  const onClickAppDownload = useCallback((e) => {
    e.preventDefault();
    setDisplayAppDownPop(true);
  }, []);
  

  return (
    <div className={quickActive ? 'quick-menu-wrap active' : 'quick-menu-wrap'}>
      <div className="btn-qm-set">
        <button type="button" className="btn-quick-menu" onClick={handleQuickMenu}>
          Quick
          <br />
          Menu
        </button>
        <ul className="btn-links">
          {appCheck && (
            <li>
              <a href="#" target="_blank" onClick={onClickAppDownload}>오토벨앱<br />다운로드</a>
            </li>
          )}
          <li>
            <span>고객센터<br /><span className="ars">1600-0080</span></span>
          </li>
        </ul>
        <button type="button" className="btn-top" onClick={handleQuickTop}>
          Top
        </button>
      </div>
      <div className="quick-menu">
        <h3>Quick Menu</h3>
        {console.log('퀵메뉴조회 차량비교함 GET_CAR_COMPAREBOX_LIST> useEffect>isLoginScreen=%o, currentPageCompare=%o', isLoginScreen, currentPageCompare)}
        {/*차량비교함 */}
        <CarComponent
          isLoginState={isLoginScreen}
          title={'차량비교함'}
          type={'01'}
          listData={compareBoxList}
          currentPage={currentPageCompare}
          totalCount={compareBoxListTotalcount}
          onChangePageHandle={(e, param) => onChangePageCompareHandle(e, param)}
          onRefreshHandle={(e, target) => onRefreshHandle(e, target)}
          handleDeleteAction={(e, type, dlrPrdId) => handleDeleteCarCompareBoxAction(e, type, dlrPrdId)}
          onLoginRefresh={onLoginRefresh}
        />
        {console.log('퀵메뉴조회 최근본차량 > useEffect>isLoginScreen=%o, qCurrentPage=%o, qTotalCount=%o', isLoginScreen, qCurrentPage, qTotalCount)}
        {/*최근본차량 */}
        <CarComponent
          isLoginState={isLoginScreen}
          title={'최근본차량'}
          type={'02'}
          listData={latestListData}
          currentPage={isLoginScreen ? qCurrentPage : currentPageRecentCookie}
          totalCount={isLoginScreen ? qTotalCount : totalCountRecentCookie}
          onChangePageHandle={(e, param) => onChangePageLatestHandle(e, param)}
          onRefreshHandle={(e, target) => onRefreshHandle(e, target)}
          handleDeleteAction={(e, type, dlrPrdId) => handleDeleteAction(e, type, dlrPrdId)}
          onLoginRefresh={onLoginRefresh}
        />

        {/*관심 차량 */}
        <CarComponent
          isLoginState={isLoginScreen}
          title={'관심 차량'}
          type={'03'}
          listData={interList}
          currentPage={currentPageInterest}
          totalCount={totalCountInterest}
          onChangePageHandle={(e, param) => onChangePageInterHandle(e, param)}
          onRefreshHandle={(e, target) => onRefreshHandle(e, target)}
          handleDeleteAction={(e, type, dlrPrdId) => handleDeleteAction(e, type, dlrPrdId)}
          onLoginRefresh={onLoginRefresh}
        />

        <div className="quick-app-area">
          <h4>오토벨 앱 다운로드</h4>
          <ul className="q-app-down">
            <li className="ios">
              <a href="https://apps.apple.com/kr/app/id1492011865?mt=8" target="_blank">
                <span>iOS 사용자</span>
              </a>
            </li>
            <li className="android">
              <a href="https://play.google.com/store/apps/details?id=glovis.glovisaa.autobell" target="_blank">
                <span>Android 사용자</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="quick-customer-area">
          <h4>오토벨 고객센터</h4>
          <ul>
            <li>상담시간 : 평일 9시~18시</li>
            <li>상담번호 : <span>1600-0080</span></li>
          </ul>
        </div>

        <button type="button" className="btn-qm-close" onClick={handleQuickClose}>
          <img src="/images/contents/btn-qm-close.png" alt="닫기" />
        </button>
      </div>
      <div className="quick-menu-shadow"></div>

      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} width={380} mode="normal" size="xs">
        <AutobellAppDownload />
      </RodalPopup>
    </div>
  );
};

export default QuickMenu;
