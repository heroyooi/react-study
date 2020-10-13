import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import AppLayout from '@src/components/layouts/AppLayout';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import SlideGallery from '@src/components/common/banner/SlideGallery';
import BannerItem from '@src/components/common/banner/BannerItem';
import CarOptions from '@src/components/common/CarOptions';
import LiveStudio from '@src/components/common/LiveStudio';
import BuyViewPopup from '@src/components/common/popup/BuyViewPopup';
import BuyViewCarPrice from '@src/components/common/BuyViewCarPrice';
import DetailDiagnosis from '@src/components/common/popup/DetailDiagnosis';
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
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import useScroll from '@lib/share/custom/useScroll';
import { car_list, car_gallery, mCarList } from '@src/dummy';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { BuyViewContext } from '@pages/buy/viewA';
/*
html 변경이력
03.13 : className="dealerNum" <span> 추가
03.26 : 모바일 더보기 기능 추가, #a2 수정
*/

const ViewC = () => {
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

  const [autobellPopupShow, setAutobellPopupShow, openAutobellPopup, closeAutobellPopup] = useRodal(false, true);
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
    const [fpViewDiagnosis, setFpViewDiagnosis] = useState(false);
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
        setFpViewDiagnosis(false);
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
        setFpViewDiagnosis(false);
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
        setFpViewDiagnosis(false);
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
        setFpViewDiagnosis(false);
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
        setFpViewDiagnosis(false);
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
        setFpViewDiagnosis(false);
        setFpViewTotalCostCalculation(true);
      } else if (name === "view_diagnosis") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '오토벨 상세진단서',
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
        setFpViewSellerInfo(false);
        setFpViewDiagnosis(true);
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
    const handleForceChange = () => setForceChange(prev => !prev);

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
            <TabCont tabTitle="진단내역" id="m-scroll-tab1" index={0} className="auction-wrap autobell-wrap">
              <div className="content-sec">
                <i></i>
                <p>오토벨의 경험과 노하우로 차량진단 및 확인이 완료된 차량입니다.</p>
              </div>
              <TabMenu type="type1" mount={false} callBack={handleForceChange}>
                <TabCont tabTitle="외부 패널" id="tab1-1" index={0}>
                  <div className="tit-wrap bg">
                    <p>해당 차량은 라이브스튜디오 진단 점검 중<br /><em>[완전 <span>무사고</span> 차량]</em> 입니다.</p>
                    <Button size="sml" line="gray" radius={true} title="오토벨 상세진단서" width={108} marginTop={16} href="/buy/viewDetailDiagnosis" onClick={handleFullpagePopup("view_diagnosis")} />
                  </div>
                  <div className="label-img-wrap">
                    <div className="img-wrap">
                      <img src="/images/contents/car-outside-img.png" alt="자동차 외부패널" />
                    </div>
                    <ul className="car-record-label">
                      <li><i className="ico-state-w on"></i>판금/용접</li>
                      <li><i className="ico-state-x on"></i>교환</li>
                    </ul>
                  </div>
                  <table summary="외부패널에 대한 내용" className="table-tp1">
                    <caption className="away">외부패널</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>후드</th>
                        <td>정상</td>
                      </tr>
                      <tr>
                        <th>프론트휀더</th>
                        <td>정상</td>
                      </tr>
                      <tr>
                        <th>도어</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>트렁크리드</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                      <tr>
                        <th>라디에이터 서포트<br />(볼트체결부품)</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>루프패널</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                      <tr>
                        <th>퀴터패널</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>사이드실패널</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
                <TabCont tabTitle="주요 골격" id="tab1-1" index={1}>
                  <div className="tit-wrap bg">
                    <p>해당 차량은 라이브스튜디오 진단 점검 중<br /><em>[완전 <span>무사고</span> 차량]</em> 입니다.</p>
                    <Button size="sml" line="gray" radius={true} title="오토벨 상세진단서" width={108} marginTop={16} href="/buy/viewDetailDiagnosis" />
                  </div>
                  <div className="label-img-wrap">
                    <div className="img-wrap">
                      <img src="/images/contents/car-inside-img.png" alt="자동차 주요골격" />
                    </div>
                    <ul className="car-record-label">
                      <li><i className="ico-state-w on"></i>판금/용접</li>
                      <li><i className="ico-state-x on"></i>교환</li>
                    </ul>
                  </div>
                  <table summary="주요골격에 대한 내용" className="table-tp1">
                    <caption className="away">주요골격</caption>
                    <colgroup>
                      <col width="40%" />
                      <col width="60%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>프론트패널</th>
                        <td>정상</td>
                      </tr>
                      <tr>
                        <th>크로스맴버</th>
                        <td>정상</td>
                      </tr>
                      <tr>
                        <th>인사이드패널</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>사이드멤버</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                      <tr>
                        <th>휠하우스</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>대쉬패널</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                      <tr>
                        <th>플로어패널</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>필러패널</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                      <tr>
                        <th>리어패널</th>
                        <td><span className="w">판금/용접</span></td>
                      </tr>
                      <tr>
                        <th>트렁크 플로어</th>
                        <td><span className="x">교환</span></td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
              </TabMenu>
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
          {fpViewDiagnosis && <><DetailDiagnosis /><Button className="fixed" size="full" background="blue80" title="확인" /></>}
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
          <div className="content-wrap view-wrap live">
            <LiveStudio car_gallery={car_gallery} />

            <div className="info-wrap">
              <div className="view-car-name">
                <ul className="tit-wrap">
                  <li className="tit"><h3>제네시스 G80 3.3 GDI AWD<br />프리미엄 럭셔리</h3></li>
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
                <div className="seller-info-tp2">
                  <div className="img-wrap">
                    <Link href="sellerInfo"><a><img src="/images/dummy/dealer-img-mid.png" alt="판매자 이미지" /></a></Link>
                    <span onClick={(e) => openCounselPopup(e, "fade")}></span>
                  </div>
                  <div className="tx-wrap">
                    <p className="veiw-point-tit">현딜러(오토오토 경기점)</p>
                    <span className="dealerNum">종사원증번호 : SN16-00095</span>
                    <span>전화번호 : 050-0000-0000</span>
                  </div>
                  <ul>
                    <li>판매중<span className="blue80" onClick={handleRouter('/buy/sellerInfo?seq=1')}>24</span></li>
                    <li>판매완료<span className="blue80" onClick={handleRouter('/buy/sellerInfo?seq=2')}>32</span></li>
                  </ul>
                </div>
              </div>
              <BuyViewCarPrice buttonType={2} />
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
                <Button size="big" line="red60" color="red60" title="온라인 구매하기" width={180} href="/homeService/serviceStep01" />
              </li>
            </ul>
          </div>

          <div className="content-wrap autobell-wrap">
            <div className="tit-wrap bg">
              <p>해당 차량은 라이브스튜디오 진단 점검 중 <em>[완전 <span>무사고</span> 차량]</em>입니다.</p>
              <Buttons align="center" marginTop={17}>
                <Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={162} onClick={handleOpenHistoryPop} />
                <Button size="mid" line="gray" radius={true} title="성능점검 자세히 보기" width={162} onClick={handleOpenPerformancePop} />
              </Buttons>
            </div>
            <ul>
              <li>
                <div className="label-img-wrap">
                  <span>외부패널</span>
                  <div className="img-wrap">
                    <img src="/images/contents/car-outside-img.png" alt="자동차 외부패널" />
                  </div>
                </div>
                <table summary="외부패널에 대한 내용" className="table-tp3">
                  <caption className="away">외부패널</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="23%" />
                    <col width="27%" />
                    <col width="23%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>후드</th>
                      <td>정상</td>
                      <th>트렁크리드</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>프론트휀더</th>
                      <td>정상</td>
                      <th>루프패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>도어</th>
                      <td><span className="w">판금/용접</span></td>
                      <th>퀴터패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>라디에이터<br />서포트<br /><em>(볼트체결부품)</em></th>
                      <td><span className="x">교환</span></td>
                      <th>사이드실패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <div className="label-img-wrap">
                  <span>주요골격</span>
                  <div className="img-wrap">
                    <img src="/images/contents/car-inside-img.png" alt="자동차 주요골격" />
                  </div>
                  <ul className="car-record-label">
                    <li><i className="ico-state-w on"></i>판금/용접</li>
                    <li><i className="ico-state-x on"></i>교환</li>
                  </ul>
                </div>
                <table summary="주요골격에 대한 내용" className="table-tp3">
                  <caption className="away">주요골격</caption>
                  <colgroup>
                    <col width="27%" />
                    <col width="23%" />
                    <col width="27%" />
                    <col width="23%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>프론트패널</th>
                      <td>정상</td>
                      <th>대쉬패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>크로스맴버</th>
                      <td>정상</td>
                      <th>플로어패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>인사이드패널</th>
                      <td>정상</td>
                      <th>필러패널</th>
                      <td><span className="w">판금/용접</span></td>
                    </tr>
                    <tr>
                      <th>사이드멤버</th>
                      <td><span className="w">판금/용접</span></td>
                      <th>리어패널</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                    <tr>
                      <th>휠하우스</th>
                      <td><span className="x">교환</span></td>
                      <th>트렁크 플로어</th>
                      <td><span className="x">교환</span></td>
                    </tr>
                  </tbody>
                </table>
              </li>
            </ul>
            <Buttons align="center" marginTop={40}>
              <Button size="big" background="blue80" title="오토벨 상세진단서" width={243} height={60} onClick={(e) => openAutobellPopup(e, "fade")} />
            </Buttons>
          </div>
          <TabMenu type="type1" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={251} forceChange={forceChange}>
            <TabCont tabTitle="옵션 정보" id="scroll-tab1" index={0}>
              <div className="content-wrap pt0">
                <CarOptions title="차량 옵션" type={2} callback={handleCarOptions} />
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

      <RodalPopup show={autobellPopupShow} type={'fade'} closedHandler={closeAutobellPopup} mode="normal" title="오토벨 상세진단서" size="large">
        <DetailDiagnosis />
      </RodalPopup>

      <RodalPopup show={performancePop} type={'fade'} closedHandler={handleClosePerformancePop} title="성능점검기록부" mode="normal" size="large" buttons={true}>
        <CarPerformanceCheck />
      </RodalPopup>
      <RodalPopup show={historyPop} type={'fade'} closedHandler={handleCloseHistoryPop} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory />
      </RodalPopup>
    </AppLayout>
  )
}

export default ViewC