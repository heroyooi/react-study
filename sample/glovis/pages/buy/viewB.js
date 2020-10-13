import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import AppLayout from '@src/components/layouts/AppLayout';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import SlideGallery from '@src/components/common/banner/SlideGallery';
import SlideAuction from '@src/components/common/banner/SlideAuction';
import BannerItem from '@src/components/common/banner/BannerItem';
import CarOptions from '@src/components/common/CarOptions';
import BuyViewPopup from '@src/components/common/popup/BuyViewPopup';
import BuyViewCarPrice from '@src/components/common/BuyViewCarPrice';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobTotalCostCalculation from '@src/components/common/MobTotalCostCalculation';
import MobInquire from '@src/components/common/MobInquire';
import MobViewGallery from '@src/components/common/MobViewGallery';
import MobFalseSaleReport from '@src/components/common/MobFalseSaleReport';
import MobSellerInfo from '@src/components/common/MobSellerInfo';
import BtnShare from '@src/components/common/BtnShare';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import useScroll from '@lib/share/custom/useScroll';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { car_list, car_gallery, mCarList } from '@src/dummy';
import { BuyViewContext } from '@pages/buy/viewA';
/*
  html 변경이력
  03.26 : 모바일 더보기 기능 추가, #a2 수정
*/
const ViewB = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const handleRouter = (href) => (e) => {
    e.preventDefault();
    Router.push(href);
  }

  const [counselPopupShow, setCounselPopupShow, openCounselPopup, closeCounselPopup] = useRodal(false, true);
  const [notifyPopupShow, setNotifyPopupShow, openNotifyPopup, closeNotifyPopup] = useRodal(false, true);
  const [alertPopupShow, setAlertPopupShow, openAlertPopup, closeAlertPopup] = useRodal(false, true);
  const [costPopupShow, setCostPopupShow, openCostPopup, closeCostPopup] = useRodal(false, true);
  const [performancePop, setPerformancePop, handleOpenPerformancePop, handleClosePerformancePop] = useRodal(false, true);
  const [historyPop, setHistoryPop, handleOpenHistoryPop, handleCloseHistoryPop] = useRodal(false, true);

  // 탭메뉴 스크롤
  const { currentY } = useScroll();
  const calH = !hasMobile ? 251 : 108; // 픽스되는 요소들의 높이 합산된 값 190 + 61
  const [isTab, setIsTab] = useState(null); // 픽스되는 탭의 index
  const [isFix, setIsFix] = useState(false); // 탭 픽스 활성화 유무

  const [forceChange, setForceChange] = useState(false); // 탭 내부의 가변적인 상황 감지해서 재계산하기 위함
  const handleCarOptions = useCallback((e) => {
    setForceChange(prev => !prev);
  }, [forceChange]);

  // #a2 start
  const [expMore1, setExpMore1] = useState(false);
  const [expMore2, setExpMore2] = useState(false);
  const [expMore3, setExpMore3] = useState(false);
  const handleExpMore1 = useCallback((e) => {
    e.preventDefault();
    setExpMore1(prev => !prev);
    setForceChange(prev => !prev);
  }, [expMore1]);
  const handleExpMore2 = useCallback((e) => {
    e.preventDefault();
    setExpMore2(prev => !prev);
    setForceChange(prev => !prev);
  }, [expMore2]);
  const handleExpMore3 = useCallback((e) => {
    e.preventDefault();
    setExpMore3(prev => !prev);
    setForceChange(prev => !prev);
  }, [expMore3]);
  // #a2 end

  useEffect(() => {
    const getScroll = (el, direction = "top") => {
      const targetScroll = (direction === "top")
        ? document.querySelector(el).getBoundingClientRect().top
        : document.querySelector(el).getBoundingClientRect().bottom;
      return targetScroll + currentY - calH;
    }
    const getAnimate = (el1, el2, el3, el4) => {
      if (currentY < getScroll(el1)) {
        setIsFix(false);
        setIsTab(0);
      } else {
        setIsFix(true);
        if (!hasMobile) {
          if (currentY >= getScroll(el1) && currentY < getScroll(el2)) {
            setIsTab(0);
          } else if (currentY >= getScroll(el2) && currentY < getScroll(el3)) {
            setIsTab(1);
          } else if (currentY >= getScroll(el3) && currentY < getScroll(el3, "bottom")) {
            setIsTab(2);
          } else if (currentY >= getScroll(el3, "bottom")) {
            setIsTab(null);
            setIsFix(false);
          }
        } else {
          if (currentY >= getScroll(el1) && currentY < getScroll(el2)) {
            setIsTab(0);
          } else if (currentY >= getScroll(el2) && currentY < getScroll(el3)) {
            setIsTab(1);
          } else if (currentY >= getScroll(el3) && currentY < getScroll(el4)) {
            setIsTab(2);
          } else if (currentY >= getScroll(el4) && currentY < getScroll(el4, "bottom")) {
            setIsTab(3);
          } else if (currentY >= getScroll(el4, "bottom")) {
            setIsTab(null);
            setIsFix(false);
          }
        }
        
      }
    }
    hasMobile
      ? getAnimate("#m-scroll-tab1", "#m-scroll-tab2", "#m-scroll-tab3", "#m-scroll-tab4")
      : getAnimate("#scroll-tab1", "#scroll-tab2", "#scroll-tab3");
  }, [currentY, forceChange, expMore1, expMore2, expMore3]); // #a2

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'G80',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });

    const [dimm1, setDimm1] = useState(false);
    const [dimm2, setDimm2] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const handleOpenShare = useCallback((e) => {
      e.preventDefault();
      setActive1(true);
      setDimm1(true);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, []);
    const handleOpenProfile = useCallback((e) => {
      e.preventDefault();
      setActive2(true);
      setDimm2(true);
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, []);
    const handleCloseDimm1 = useCallback(() => {
      setActive1(false);
      setDimm1(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, []);
    const handleCloseDimm2 = useCallback(() => {
      setActive2(false);
      setDimm2(false);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }, []);
    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
    const [fpViewGallery, setFpViewGallery] = useState(false);
    const [fpViewAccidentHistory, setFpViewAccidentHistory] = useState(false);
    const [fpViewPerformance, setFpViewPerformance] = useState(false);
    const [fpViewInquire, setFpViewInquire] = useState(false);
    const [fpViewFalseSaleReport, setFpViewFalseSaleReport] = useState(false);
    const [fpViewTotalCostCalculation, setFpViewTotalCostCalculation] = useState(false);
    const [fpViewSellerInfo, setFpViewSellerInfo] = useState(false);
    const [sellerInfoSeq, setSellerInfoSeq] = useState(0);
    const [fpBottom, setFpBottom] = useState(80);
    const handleFullpagePopup = (name, seq) => (e) => {
      e.preventDefault();      
      if (name === "view_gallery") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '사진보기',
            options: ['close']
          }
        });
        setFpBottom(24);
        setFpViewAccidentHistory(false);
        setFpViewPerformance(false);
        setFpViewInquire(false);
        setFpViewFalseSaleReport(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(false);
        setFpViewGallery(true);
      } else if (name === "view_accident_history") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '중고차 사고이력 정보 보고서',
            options: ['close']
          }
        });
        setFpViewGallery(false);
        setFpViewPerformance(false);
        setFpViewInquire(false);
        setFpViewFalseSaleReport(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(false);
        setFpViewAccidentHistory(true);
      } else if (name === "view_performance") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '성능점검 정보',
            options: ['close']
          }
        });
        setFpBottom(0);
        setFpViewGallery(false);
        setFpViewAccidentHistory(false);
        setFpViewInquire(false);
        setFpViewFalseSaleReport(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(false);
        setFpViewPerformance(true);
      } else if (name === "view_inquire") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '1:1 쪽지 상담',
            options: ['close']
          }
        });
        setFpBottom(80);
        setFpViewGallery(false);
        setFpViewAccidentHistory(false);
        setFpViewPerformance(false);
        setFpViewFalseSaleReport(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(false);
        setFpViewInquire(true);
      } else if (name === "view_report") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '허위 매물 신고',
            options: ['close']
          }
        });
        setFpBottom(80);
        setFpViewGallery(false);
        setFpViewAccidentHistory(false);
        setFpViewPerformance(false);
        setFpViewInquire(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(false);
        setFpViewFalseSaleReport(true);
      } else if (name === "view_total") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '총 비용 계산',
            options: ['close']
          }
        });
        setFpBottom(80);
        setFpViewGallery(false);
        setFpViewAccidentHistory(false);
        setFpViewPerformance(false);
        setFpViewInquire(false);
        setFpViewFalseSaleReport(false);
        setFpViewSellerInfo(false);
        setFpViewTotalCostCalculation(true);
      } else if (name === "view_seller") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '판매자 정보',
            options: ['close']
          }
        });
        setFpBottom(80);
        setFpViewGallery(false);
        setFpViewAccidentHistory(false);
        setFpViewPerformance(false);
        setFpViewInquire(false);
        setFpViewFalseSaleReport(false);
        setFpViewTotalCostCalculation(false);
        setFpViewSellerInfo(true);
        setSellerInfoSeq(seq);
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    };
    const handleCallback = (e, index) => {
      console.log(e, index);
      // Router.push('/buy/viewImgList');
      handleFullpagePopup("view_gallery")(e);
    }
    const inquireCallback = (e) => {
      e.preventDefault();
      setFpViewInquire(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }
    const falseSaleReportCallback = (e) => {
      e.preventDefault();
      setFpViewFalseSaleReport(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    }

    return (
      <AppLayout>
        <div className="view-wrap">
          <div className="view-car-img">
            <ul className="ico-wrap">
              <li onClick={handleOpenShare}><i className="ico-sharing-white"></i></li>
              <li><CheckBox id='chk-like' /></li>
            </ul>
            <SlideGallery car_gallery={car_gallery} callback={handleCallback} />
          </div>
          <BuyViewCarPrice />
          <div className="market-price-graph">
            <span className="tit">이 차량의 현재시세<span>가격단위: 만원</span></span>
            <span className="con">
              <img src="/images/dummy/graph1.jpg" alt="현재시세 그래프" />
            </span>
          </div>
        </div>
        <div className="detail-wrap">
          <TabMenu type="type2" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={107} forceChange={forceChange}>
            <TabCont tabTitle="낙찰차량" id="m-scroll-tab1" index={0} className="auction-wrap">
              <div className="content-sec">
                <i></i>
                <p>현대 글로비스 오토옥션을 통한 믿을 수 있는 경매 낙찰 차량입니다.</p>
              </div>
              <SlideAuction car_list={car_gallery} /> {/* slider기능 필요 */}
              <h3 className="tit2 mb16">경매정보</h3>
              <table summary="경매정보에 대한 내용" className="table-tp1">
                <caption className="away">경매정보</caption>
                <colgroup>
                  <col width="37%" />
                  <col width="63%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>경매장</th>
                    <td>분당경매장</td>
                  </tr>
                  <tr>
                    <th>경매회차(경매일)</th>
                    <td>964회(2019.11.12)</td>
                  </tr>
                  <tr>
                    <th>경매번호</th>
                    <td>1052</td>
                  </tr>
                </tbody>
              </table>
            </TabCont>
            <TabCont tabTitle="옵션 정보" id="m-scroll-tab2" index={1}>
              <div className="float-wrap btn-s mt0">
                <h3 className="tit2">차량 기본 정보</h3>
                <Button size="sml" line="red60" color="red60" radius={true} title="허위매물 신고" width={85} href="/buy/falseSaleReport" onClick={handleFullpagePopup("view_report")} />
              </div>
              <table summary="차량 기본정보에 대한 내용" className="table-tp1">
                <caption className="away">차량 기본정보</caption>
                <colgroup>
                  <col width="23%" />
                  <col width="27%" />
                  <col width="23%" />
                  <col width="27%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>47러0383</td>
                    <th>연료</th>
                    <td>가솔린</td>
                  </tr>
                  <tr>
                    <th>변속기</th>
                    <td>오토</td>
                    <th>색상</th>
                    <td>회색</td>
                  </tr>
                  <tr>
                    <th>연식</th>
                    <td>11/16식(17년형)</td>
                    <th>배기량</th>
                    <td>3,342cc</td>
                  </tr>
                  <tr>
                    <th>사고유무</th>
                    <td>무사고</td>
                    <th>압료/저당</th>
                    <td>무</td>
                  </tr>
                  <tr>
                    <th>주행거리</th>
                    <td>53,436 KM</td>
                    <th>차종</th>
                    <td>대형차</td>
                  </tr>
                  <tr>
                    <th>사고유무</th>
                    <td colSpan="3">12345678901</td>
                  </tr>
                </tbody>
              </table>

              <CarOptions type={1} addOption={true} selectOption={true} className="mt32" callback={handleCarOptions} />

              <div className="float-wrap btn-s">
                <h3 className="tit2">보험처리 이력</h3>
                <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} href="/buy/viewAccidentHistory" onClick={handleFullpagePopup("view_accident_history")} />
              </div>
              <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 tx-c">
                <caption className="away">보험처리 이력</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan="4">자동차 특수사고 이력</th>
                  </tr>
                  <tr>
                    <th>전손</th>
                    <th>도난</th>
                    <th>침수전손</th>
                    <th>침수분손</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point tp2 fs12">
                <ul>
                  <li>&#8251; 본 차량의 보험처리 이력정보는 YYYY.MM.DD에 조회한 내용입니다.</li>
                  <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.</li>
                </ul>
              </div>

              <div className="float-wrap btn-s">
                <h3 className="tit2">성능점검 정보</h3>
                <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} href="/buy/viewPerformance" onClick={handleFullpagePopup("view_performance")} />
              </div>
              <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 tx-c">
                <caption className="away">성능점검 정보</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                  <col width="25%" />
                </colgroup>
                <thead>
                  <tr>
                    <th colSpan="4">자동차 상태표시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>교화(교체)</th>
                    <td>없음</td>
                    <th>판금/용접</th>
                    <td>없음</td>
                  </tr>
                  <tr>
                    <th>흠집</th>
                    <td>없음</td>
                    <th>손상</th>
                    <td>없음</td>
                  </tr>
                  <tr>
                    <th>요철</th>
                    <td>없음</td>
                    <th>부식</th>
                    <td>없음</td>
                  </tr>
                </tbody>
              </table>

              <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 mt16">
                <caption className="away">성능점검 정보</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>사고이력</th>
                    <td>없음</td>
                  </tr>
                  <tr>
                    <th>단순수리</th>
                    <td>없음</td>
                  </tr>
                  <tr>
                    <th>성능/상태 점검자</th>
                    <td>(사)한국자동차기술인협회</td>
                  </tr>
                  <tr>
                    <th>성능/상태 점검일</th>
                    <td>2019.08.01</td>
                  </tr>
                </tbody>
              </table>
              <div className="essential-point tp2 fs12">
                <ul>
                  <li>&#8251; 단순교환은 사고에 포함되지 않습니다.</li>
                  <li>&#8251; 본 성능점검기록부 내용은 판매자가 직접 입력한 내용입니다.</li>
                  <li>&#8251; 차량의 상담이나 방문전 성능점검기록부와 차량등록증을 팩스로 요청하시어 차량의 성능점검기록 내용이 일치하는지 확인하실 것을 권장드립니다.</li>
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="차량 정보" id="m-scroll-tab3" index={2}>
              <div className="info-wrap car-exp">
                <div className="video">
                  <div className="player-wrapper">
                    <ReactPlayer
                      className="react-player"
                      url='https://www.glovis.net/upload/main_video01.mp4'
                      playing={true}
                      loop={true}
                      controls={true}
                      muted={true}
                      width={'100%'}
                      height={'100%'}
                    />
                  </div>
                </div>
                <div className="pb20">
                  <h4>Key Point</h4>
                  <ul className="img-wrap">
                    <li><img src="/images/dummy/view-info-img-01.jpg" alt="key-point 이미지 01" /></li>
                    <li><img src="/images/dummy/view-info-img-02.jpg" alt="key-point 이미지 02" /></li>
                    <li><img src="/images/dummy/view-info-img-03.jpg" alt="key-point 이미지 03" /></li>
                  </ul>
                  <p>파노라마 썬루프로 시원한 개방감! 깔끔한 실내관리로 최상의 실내상태</p>
                </div>

                <div>
                  <h4>Wear&amp;Tear</h4>
                  <ul className="img-wrap wear-tear">
                    <li><img src="/images/dummy/view-info-img-04.jpg" alt="wear&tear 이미지 01" /></li>
                    <li><img src="/images/dummy/view-info-img-05.jpg" alt="wear&tear 이미지 02" /></li>
                  </ul>
                  <div className={!expMore1 ? "exp-more close" : "exp-more"}>
                    <p>뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재 뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재 뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재 끝</p>
                  </div>
                  <Button size="full" color="black" title={!expMore1 ? "설명 더보기" : "설명 숨기기"} fontSize={14} fontWeight={500} iconType={!expMore1 ? "arrow-bottom-gray" : "arrow-top-gray"} onClick={handleExpMore1} />
                </div>

                <div>
                  <h4>이 차의 History</h4>
                  <div className={!expMore2 ? "exp-more lg close" : "exp-more lg"}>
                    <dl>
                      <dt>전 차주 정보</dt>
                      <dd>- 해당 차량은 오토벨 시화센터에서 낙찰 받은 차량입니다.</dd>
                      <dt className="mt16">단순수리</dt>
                      <dd>- 신차 출고가 6,010만원 상당!! 신차급 차량을 약 400~500만원 상당 저렴하게 만나 보실 수 있습니다.</dd>
                      <dd>- 제네시스 G80과 함께 편안하고 안락한 드라이빙을 즐길 수 있습니다.</dd>
                    </dl>
                  </div>
                  <Button size="full" color="black" title={!expMore2 ? "설명 더보기" : "설명 숨기기"} fontSize={14} fontWeight={500} iconType={!expMore2 ? "arrow-bottom-gray" : "arrow-top-gray"} onClick={handleExpMore2} />
                </div>

                <div>
                  <h4>진단소견</h4>
                  <div className={!expMore3 ? "exp-more lg close" : "exp-more lg"}>
                    <dl>
                      <dt>본 차량상태</dt>
                      <dd>- 사고여부: 무사고</dd>
                      <dd>- 차량모델: 제네시스 G80</dd>
                      <dd>- 차량연식: 2016년 11월 (2017년형)</dd>
                      <dd>- 차량색상: 회색</dd>
                      <dd>- 주행거리: 53,436km</dd>
                      <dt className="mt16">관리상태</dt>
                      <dd className="superintend">내외관 깔끔하며 무사고 차량이며, 하체잡소리하나 없습니다. 타이어4짝 모두 트레이드 좋습니다. 기름만 주유 후 운행하시면 됩니다.시운전 강력추천드리며, 친절상담약속드립니다.</dd>
                    </dl>
                  </div>
                  <Button size="full" color="black" title={!expMore3 ? "설명 더보기" : "설명 숨기기"} fontSize={14} fontWeight={500} iconType={!expMore3 ? "arrow-bottom-gray" : "arrow-top-gray"} onClick={handleExpMore3} />
                </div>

                <div className="pb20">
                  <h4>기타</h4>
                  <p>타시고 계시던 차량 대차&amp;폐차 가능 합니다.</p>
                </div>

              </div>
            </TabCont>
            <TabCont tabTitle="판매자" id="m-scroll-tab4" index={3}>
              <div className="seller-wrap">
                <div className="profile">
                  <div className="img-wrap">
                    <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
                  </div>
                  <div className="tx-wrap">
                    <Button size="sml" background="blue20" color="blue80" radius={true} title="판매자정보" fontSize={10} width={63} height={24} href="/buy/sellerInfo" onClick={handleFullpagePopup("view_seller")} />
                    <h2>김현대</h2>
                    <p>010-1234-1234</p>
                    <ul className="employee-card">
                      <li>종사원증 : 오토벨모터스</li>
                      <li>종사원증번호: A1240B56</li>
                    </ul>
                  </div>
                </div>
                <ul>
                  <li>판매중<span>21</span></li>
                  <li>판매완료<span>35</span></li>
                </ul>

                <div className="map-sec">
                  <table summary="판매자 기본정보에 대한 내용" className="table-tp1">
                    <caption className="away">판매자 정보</caption>
                    <colgroup>
                      <col width="26.5%" />
                      <col width="73.5%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>판매점</th>
                        <td>현대 글로비스 경인직영점</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td>서울특별시 서초구 신반포로 311</td>
                      </tr>
                      <tr>
                        <th>전화</th>
                        <td>050-0000-0000</td>
                      </tr>
                      <tr>
                        <th>팩스</th>
                        <td>050-0000-0000</td>
                      </tr>
                      <tr>
                        <th>영업시간</th>
                        <td>
                          월~토요일 09:00 ~ 18:00<br />
                          일요일/공휴일 휴무<br />
                          (점심시간 12:00 ~ 13:00)
                    </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="map-wrap">
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51742.6439164819!2d128.57664396195503!3d35.85108173987436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e23bd9302901%3A0x1c537395158ac1f0!2z7J247YOA7J207Ja066qo7YSw7IqkIOuMgOq1rOyghOyLnOyepQ!5e0!3m2!1sko!2skr!4v1580285264745!5m2!1sko!2skr" allowFullScreen></iframe>
                  </div>
                </div>

                <div className="goods-banner">
                  <div className="img-wrap">

                  </div>
                </div>

                <div className="list-wrap">
                  <h3 className="mt32 mb16">오토벨스마트 추천</h3>
                  <ul className="goods-list list-type">
                    {mCarList.map((v, i) => {
                      if (i < 3) {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      }
                    })}
                  </ul>
                </div>
                <div className="list-wrap">
                  <h3 className="mt32 mb16">동급차량</h3>
                  <ul className="goods-list list-type">
                    {mCarList.map((v, i) => {
                      if (i < 3) {
                        return (
                          <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                        )
                      }
                    })}
                  </ul>
                </div>
              </div>
            </TabCont>
          </TabMenu>
        </div>
        <Buttons className="center full fixed">
          <span className="step-btn-l">
            <ul>
              <li>
                {/* <Link href="/buy/totalCostCalculation"><i className="ico-calculate"></i></Link> */}
                <i className="ico-calculate" onClick={handleFullpagePopup("view_total")}></i>
              </li>
              <li>
                {/* <Link href="/buy/viewInquire"><a>쪽지<br />상담</a></Link> */}
                <a href="#" onClick={handleFullpagePopup("view_inquire")}>쪽지<br />상담</a>
              </li>
              <li onClick={handleOpenProfile}>전화<br />문의</li>
            </ul>
          </span>
          <span className="step-btn-r">
            <Button size="full" background="blue80" title="온라인 구매" />
          </span>
        </Buttons>

        <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1}></div>
        <MobBottomArea active={active1} zid={101}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            <BtnShare />
          </div>
        </MobBottomArea>

        <div className={dimm2 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm2}></div>
        <MobBottomArea active={active2} zid={101}>
          <div className="inner profile">
            <div className="img-wrap">
              <img src="/images/dummy/dealer-img.png" alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              <h4>김현대</h4>
              <p>
                현대 글로비스 경인직영점
                <span>문의사항이 있으신가요?<br />편안하게 전화주시면 친절하게 안내드립니다.</span>
              </p>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="전화걸기" href="tel:01012341234" />
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpBottom}>
          {fpViewGallery && <MobViewGallery />}
          {fpViewAccidentHistory && <CarAccidentHistory />}
          {fpViewPerformance && <CarPerformanceCheck mode="viewer" />}
          {fpViewInquire && <MobInquire callback={inquireCallback} />}
          {fpViewFalseSaleReport && <MobFalseSaleReport callback={falseSaleReportCallback} />}
          {fpViewTotalCostCalculation && <MobTotalCostCalculation />}
          {fpViewSellerInfo && <MobSellerInfo seq={sellerInfoSeq} />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <BuyViewContext.Provider value={{
        counselPopupShow, notifyPopupShow, alertPopupShow, costPopupShow,
        closeCounselPopup, closeNotifyPopup, closeAlertPopup, closeCostPopup,
        openCounselPopup, setCounselPopupShow, setNotifyPopupShow, openCostPopup
      }}>
        <div className="content-sec">
          <div className="content-wrap view-wrap">
            <ul className="tit-wrap">
              <li className="tit"><h3>제네시스 G80 3.3 Premium 럭셔리</h3></li>
              <li className="fr">
                <CheckBox id='chk-like' />
              </li>
              <li>
                <div className="tag-wrap">
                  <em className="tag-tp1 tx-blue60">EX</em>
                  <em className="tag-tp1 tx-purple">홈서비스</em>
                  <em className="tag-tp1 tx-sky">수입인증</em>
                </div>
              </li>
            </ul>

            <div className="info-wrap">
              <div className="view-car-img">
                <SlideGallery car_gallery={car_gallery} />
              </div>
              <BuyViewCarPrice dealerInfo={true} />
            </div>

            <ul className="float-wrap">
              <li>
                <Tooltip placement="topLeft" width={340} exception="sns-share" event="click">
                  <TooltipItem>
                    <Button size="mid" line="gray" radius={true} title="공유하기" width={86} />
                  </TooltipItem>
                  <TooltipCont>
                    <BtnShare />
                  </TooltipCont>
                </Tooltip>
                <Button size="mid" line="gray" radius={true} title="허위매물 신고" width={115} onClick={(e) => openNotifyPopup(e, "fade")} />
              </li>
              <li>
                <CheckBox id='chk-like-2' className="heart" title='48' />
                <CheckBox id='chk-count' className="count" title='198' />
              </li>
            </ul>
          </div>
        </div>

        <div className="auction-wrap">
          <div className="content-wrap">
            <SlideAuction car_list={car_gallery} />
            <table summary="경매 낙찰 차량 정보에 대한 내용" className="table-tp3">
              <caption className="away">경매 낙찰 차량 정보</caption>
              <colgroup>
                <col width="6%" />
                <col width="29%" />
                <col width="12%" />
                <col width="23%" />
                <col width="8%" />
                <col width="22%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>경매장</th>
                  <td>경매장명 노출</td>
                  <th>경매회차(경매일)</th>
                  <td>N2235(2019-08-08)</td>
                  <th>경매번호</th>
                  <td>NO. 00000000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={isFix === false ? "detail-wrap" : "detail-wrap is-area-fix"}>
          <div className="tit-wrapper">
            <ul className="tit-wrap">
              <li className="img-wrap">
                <img src="/images/dummy/view-thumb-img.jpg" alt="차량 이미지" />
              </li>
              <li className="tit">
                <h3>제네시스 G80 3.3 Premium 럭셔리</h3>
              </li>
              <li className="fr">
                <p className="price-tp1">3,750<span className="won">만원</span></p>
                <Button size="big" line="black" color="black" title="총비용 계산" width={180} onClick={(e) => openCostPopup(e, "fade")} />
              </li>
            </ul>
          </div>
          <TabMenu type="type1" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={190} forceChange={forceChange}>
            <TabCont tabTitle="옵션 정보" id="scroll-tab1" index={0}>
              <div className="content-wrap">
                <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                  <caption>차량 기본정보</caption>
                  <colgroup>
                    <col width="9%" />
                    <col width="18%" />
                    <col width="9%" />
                    <col width="18%" />
                    <col width="9%" />
                    <col width="18%" />
                    <col width="9%" />
                    <col width="10%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>차량번호</th>
                      <td>47러0383</td>
                      <th>연료</th>
                      <td>가솔린</td>
                      <th>변속기</th>
                      <td>오토</td>
                      <th>색상</th>
                      <td>회색</td>
                    </tr>
                    <tr>
                      <th>연식</th>
                      <td>11/16식(17년형)</td>
                      <th>배기량</th>
                      <td>3,342cc</td>
                      <th>사고유무</th>
                      <td>무사고</td>
                      <th>압료/저당</th>
                      <td>무</td>
                    </tr>
                    <tr>
                      <th>주행거리</th>
                      <td>53,436 KM</td>
                      <th>차종</th>
                      <td>대형차</td>
                      <th>제시번호</th>
                      <td rowSpan="3">21363842937</td>
                    </tr>
                  </tbody>
                </table>
                <CarOptions title="차량 옵션" type={2} />
                <div className="state-wrap fl">
                  <ul className="float-wrap">
                    <li>
                      <h4>보험처리 이력</h4>
                    </li>
                    <li>
                      <Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={162} onClick={handleOpenHistoryPop} />
                    </li>
                  </ul>
                  <table summary="보험처리 이력 정보에 대한 내용" className="table-tp3">
                    <caption className="away">보험처리 이력</caption>
                    <colgroup>
                      <col width="50%" />
                      <col width="50%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>보험처리이력 등록기준일</th>
                        <th>자동차 용도 변경</th>
                      </tr>
                      <tr>
                        <td>2019.10.20</td>
                        <td>이력 없음</td>
                      </tr>
                      <tr>
                        <th colSpan="2">자동차 특수사고 이력</th>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <table summary="자동차 특수사고 이력 정보에 대한 내용" className="table-tp1 th-c td-c">
                            <caption className="away">자동차 특수사고 이력</caption>
                            <colgroup>
                              <col width="25%" />
                              <col width="25%" />
                              <col width="25%" />
                              <col width="25%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th>전손</th>
                                <th>도난</th>
                                <th>침수전손</th>
                                <th>침수분손</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <ul className="tx-wrap">
                            <li>&#8251; 본 차량의 보험처리 이력정보는 2019년03월11일에 조회한 내용입니다.</li>
                            <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="state-wrap fr">
                  <ul className="float-wrap">
                    <li>
                      <h4>성능점검 정보</h4>
                    </li>
                    <li>
                      <Button size="mid" line="gray" radius={true} title="성능점검 자세히 보기" width={162} onClick={handleOpenPerformancePop} />
                    </li>
                  </ul>
                  <table summary="성능점검 정보에 대한 내용" className="table-tp3">
                    <caption className="away">성능점검 정보</caption>
                    <colgroup>
                      <col width="15%" />
                      <col width="15%" />
                      <col width="35%" />
                      <col width="35%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th colSpan="4">자동차 상태표시</th>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <table summary="자동차 상태표시 정보에 대한 내용" className="table-tp1 th-c td-c">
                            <caption className="away">자동차 상태표시</caption>
                            <colgroup>
                              <col width="33.33%" />
                              <col width="33.33%" />
                              <col width="33.33%" />
                            </colgroup>
                            <thead>
                              <tr>
                                <th>교환(교체)</th>
                                <th>판금/용접</th>
                                <th>흠집</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>없음</td>
                                <td>없음</td>
                                <td>없음</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <th>사고이력</th>
                        <td>없음</td>
                        <th>성능/상태 점검자</th>
                        <td>(사)한국자동차기술인협회</td>
                      </tr>
                      <tr>
                        <th>단순수리</th>
                        <td>없음</td>
                        <th>성능/상태 점검일</th>
                        <td>2019.10.18</td>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <ul className="tx-wrap">
                            <li>&#8251; 단순교환은 사고에 포함되지 않습니다.</li>
                            <li>&#8251; 본 성능점검기록부 내용은 판매자가 직접 입력한 내용입니다.</li>
                            <li>&#8251; 차량의 상담이나 방문전 성능점검기록부와 차량등록증을 팩스로 요청하시어 차량의 성능점검기록 내용이 일치하는지 확인하실 것을 권장드립니다.</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabCont>
            <TabCont tabTitle="차량 정보" id="scroll-tab2" index={1}>
              <div className="content-sec">
                <div className="content-wrap info-wrap">
                  <div className="video">
                    <div className="player-wrapper">
                      <ReactPlayer
                        className="react-player"
                        url='https://www.glovis.net/upload/main_video01.mp4'
                        playing={true}
                        loop={true}
                        controls={true}
                        muted={true}
                        width={'100%'}
                        height={'100%'}
                      />
                    </div>
                  </div>
                  <div>
                    <h4>Key Point</h4>
                    <ul className="img-wrap">
                      <li><img src="/images/dummy/view-info-img-01.jpg" alt="key-point 이미지 01" /></li>
                      <li><img src="/images/dummy/view-info-img-02.jpg" alt="key-point 이미지 02" /></li>
                      <li><img src="/images/dummy/view-info-img-03.jpg" alt="key-point 이미지 03" /></li>
                    </ul>
                    <p>파노라마 썬루프로 시원한 개방감! 깔끔한 실내관리로 최상의 실내상태</p>
                  </div>
                  <div>
                    <h4>Wear&amp;Tear</h4>
                    <ul className="img-wrap">
                      <li><img src="/images/dummy/view-info-img-04.jpg" alt="wear&tear 이미지 01" /></li>
                      <li><img src="/images/dummy/view-info-img-05.jpg" alt="wear&tear 이미지 02" /></li>
                    </ul>
                    <p>뒷좌석 시트 미세 스크레치 있음, 운전석 휠 일부 스크레치 존재</p>
                  </div>
                  <div>
                    <h4>이 차의 History</h4>
                    <dl>
                      <dt>전 차주 정보</dt>
                      <dd>해당 차량은 오토벨 시화센터에서 낙찰 받은 차량입니다.</dd>
                      <dt>단순수리</dt>
                      <dd>신차 출고가 6,010만원 상당!! 신차급 차량을 약 400~500만원 상당 저렴하게 만나 보실 수 있습니다.</dd>
                      <dd>제네시스 G80과 함께 편안하고 안락한 드라이빙을 즐길 수 있습니다.</dd>
                    </dl>
                  </div>
                  <div>
                    <h4>진단소견</h4>
                    <dl>
                      <dt>본 차량상태</dt>
                      <dd>사고여부: 무사고</dd>
                      <dd>차량모델: 제네시스 G80</dd>
                      <dd>차량연식: 2016년 11월 (2017년형)</dd>
                      <dd>차량색상: 회색</dd>
                      <dd>주행거리: 53,436km</dd>
                      <dt>관리상태</dt>
                      <dd>내외관 깔끔하며 무사고 차량이며, 하체잡소리하나 없습니다.</dd>
                      <dd>타이어4짝 모두 트레이드 좋습니다. 기름만 주유 후 운행하시면 됩니다.</dd>
                      <dd>시운전 강력추천드리며, 친절상담약속드립니다.</dd>
                    </dl>
                  </div>
                  <div>
                    <h4>기타</h4>
                    <p>
                      <span>
                        타시고 계시던 차량 대차&amp;폐차 가능 합니다.<br />
                        보증서비스 가입으로 엔진,미션,일반부품까지 최대 365일 2만km 까지 보증 받으실 수 있습니다.<br />
                        할부서비스로 차량금액 전액 할부 가능 합니다.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </TabCont>
            <TabCont tabTitle="판매자 정보" id="scroll-tab3" index={2}>
              <div className="content-wrap seller-wrap">
                <div className="seller-info-tp1">
                  <div className="img-wrap">
                    <Link href="sellerInfo"><a><img src="/images/dummy/dealer-img-big.png" alt="판매자 이미지" /></a></Link>
                    <span onClick={(e) => openCounselPopup(e, "fade")}></span>
                  </div>
                  <div className="tx-wrap">
                    <ul>
                      <li>판매자
                        <span>장기용</span>
                        <em>(좋은차상사)</em>
                      </li>
                      <li>종사원증 번호
                        <span>A1240B56</span>
                      </li>
                      <li>연락처
                        <span>050-0000-0000</span>
                      </li>
                      <li>판매중
                        <span className="tx-blue60" onClick={handleRouter('/buy/sellerInfo?seq=1')}>21</span>
                      </li>
                      <li>판매완료
                        <span className="tx-blue60" onClick={handleRouter('/buy/sellerInfo?seq=2')}>35</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="map-wrap">
                  <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" allowFullScreen></iframe>
                </div>
                <table summary="판매자 기본정보에 대한 내용" className="table-tp3">
                  <caption className="away">판매자 정보</caption>
                  <colgroup>
                    <col width="10%" />
                    <col width="40%" />
                    <col width="10%" />
                    <col width="40%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>판매점</th>
                      <td>좋은차상사</td>
                      <th>전화</th>
                      <td>050-0000-0000</td>
                    </tr>
                    <tr>
                      <th rowSpan="2">영업시간</th>
                      <td rowSpan="2">
                        월~토요일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)<br />
                        일요일/공휴일 휴무
                      </td>
                      <th>팩스</th>
                      <td>050-0000-0000</td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>경기도 용인시 기흥구 중부대로 242 N301호</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabCont>
          </TabMenu>
        </div>

        <div className="content-sec">
          <div className="content-wrap goods-wrap">
            <div className="goods-banner">
              <div className="img-wrap">
                <img src="/images/contents/view-banner-bg.jpg" alt="현대캐피탈 중고차론 배너" />
              </div>
            </div>
            <div className="list-wrap">
              <h4>오토벨스마트추천</h4>
              <ul className="goods-list">
                {car_list.map((v, i) => {
                  if (i < 4) {
                    return (
                      <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                    )
                  }
                })}
              </ul>
            </div>
            <div className="list-wrap">
              <h4>동급매물 추천</h4>
              <ul className="goods-list">
                {car_list.map((v, i) => {
                  if (i < 4) {
                    return (
                      <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                    )
                  }
                })}
              </ul>
            </div>
          </div>
        </div>

        <BuyViewPopup />
      </BuyViewContext.Provider>

      <RodalPopup show={performancePop} type={'fade'} closedHandler={handleClosePerformancePop} title="성능점검기록부" mode="normal" size="large">
        <CarPerformanceCheck />
      </RodalPopup>
      <RodalPopup show={historyPop} type={'fade'} closedHandler={handleCloseHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory />
      </RodalPopup>
    </AppLayout>
  )
}

export default ViewB