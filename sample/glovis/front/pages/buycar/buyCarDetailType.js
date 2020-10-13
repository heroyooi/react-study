/* eslint-disable react-hooks/rules-of-hooks */
/**
 * @desc 차량상세 A / B 타입 화면
 * @fileoverview 내차사기 > 전체차량 > 차량상세 타입(일반 및 수입, 금융사 인증)
 * @author 한관영
 */

import React, { useState, useEffect, useCallback, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import RenderHelper from '@lib/share/render/helper';
import { SystemContext } from '@src/provider/SystemProvider';
import { toggleInterestAPI, insertPrdCntAPI } from '@src/api/buycar/buyCarCommonApi';
import {
  fetchCarInfoAction,
  fetchCarBaseOptionInfoAction,
  fetchCarContentAction,
  fetchDealerInfoAction,
  fetchCarAccidentAction,
  fetchCarPerformance,
  fetchAuctionInfoAction,
  fetchAtbInsp,
  fetchDetailBannerInfo
} from '@src/actions/buycar/buyCarDetailActions';
import { fetchRecommendItems, fetchSmartItems } from '@src/actions/buycar/recommendItemActions';
import { imgUrl } from '@src/utils/HttpUtils';
import { setComma, makeShareDesc, telToStrFormat } from '@src/utils/StringUtil';
import { isLoginLiveCheck, getMemberType, UserType } from '@src/utils/LoginUtils';
import { preventScroll, objIsEmpty } from '@src/utils/CommonUtil';
import AppLayout from '@src/components/layouts/AppLayout';
import BannerItemBuyCar from '@src/components/common/banner/BannerItemBuyCar';
import BuyViewCarPrice from '@src/components/common/BuyViewCarPrice';
import CarBadge from '@src/components/buycar/CarBadge';
import CarDetail from '@src/components/buycar/CarDetail';
import LoginPopup from '@src/components/common/popup/LoginPop';
import SlideAuction from '@src/components/common/banner/SlideAuction';
import SlideGallery from '@src/components/common/banner/SlideGallery';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipCont from '@lib/share/items/TooltipCont';
import TooltipItem from '@lib/share/items/TooltipItem';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST } from '@src/actions/types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import LiveStudio from '@src/components/common/LiveStudio';
import MobTotalCostCalculation from '@src/components/common/MobTotalCostCalculation';
import MobInquire from '@src/components/common/MobInquire';
import MobViewGallery from '@src/components/common/MobViewGallery';
import MobFalseSaleReport from '@src/components/common/MobFalseSaleReport';
import MobSellerInfo from '@src/components/common/MobSellerInfo';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory'; //보험이력 팝업
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck'; //성능점검 팝업
import DetailDiagnosis from '@src/components/common/popup/DetailDiagnosis';
import ShareCarInfo from '@src/components/common/ShareCarInfo';
import { AUCTION_TYPE, COMMON_TYPE, LIVESTD_TYPE } from '@src/constant/buyCarConstant';
import BuyCarDetailCarInfoTab from '@src/components/buycar/BuyCarDetailCarInfoTab';
import BuyCarDetailOptionTab from '@src/components/buycar/BuyCarDetailOptionTab';
import BuyCarDetailSellerTab from '@src/components/buycar/BuyCarDetailSellerTab';
import BuyCarDetailLiveTab from '@src/components/buycar/BuyCarDetailLiveTab';
import MobLogin from '@src/components/common/MobLogin';
import CounselMessage from '../buycar/common/CounselMessage';
import FalseForSaleReport from '../buycar/common/FalseForSaleReport';
import TotalCostPopup from '../buycar/common/TotalCostPopup';

const globalThis = require('globalthis')();
// ==========================================================================================
// 데이터 바인딩 시 변수명은 src\reducers\buycar\buyCarDetailReducer.js 리듀서 initState 참조
// ==========================================================================================

/**
 * 설명 : 차량상세 B 타입 화면 조회, 좋아요
 * @param {dlrPrdId} 딜러상품id
 * @param {detailType} 차량상세 타입 구분(일반 및 수입, 금융사 인증)
 */
const BuyCarDetailType = memo(({ dlrPrdId, detailType }) => {
  /**
   * :::::화면 진입시 가져와야할 정보:::::
   * - 오토벨스마트추천 차량목록 : api 미완성
   * - 동급매물추천 차량목록 : api 미완성
   */

  const shareUrl = globalThis?.window?.location?.href;
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);
  const [loginPopup, setLoginPopup] = useRodal(false, true);

  const autobellIns = useSelector((state) => state.buyCarDetail.autobellIns, {});
  const carInfo = useSelector((state) => state.buyCarDetail.carInfo, {});
  const { carBaseInfo, carOption } = useSelector((state) => state.buyCarDetail.carBaseOptionInfo, {});
  const carContent = useSelector((state) => state.buyCarDetail.carContent, {});
  const carPhotos = useSelector((state) => state.buyCarDetail.carPhotos, []);
  // const marketPrice = useSelector((state) => state.buyCarDetail.marketPrice, {});
  const dealerInfo = useSelector((state) => state.buyCarDetail.dealerInfo, {});
  const { auctInfo, auctPht } = useSelector((state) => state.buyCarDetail.auctionInfo, {});
  const smartList = useSelector((state) => state.recommentItems.smartList, []);
  const equivalentList = useSelector((state) => state.recommentItems.equivalentList, []);
  const carAccident = useSelector((state) => state.buyCarDetail.carAccident, {});
  const performance = useSelector((state) => state.buyCarDetail.performance, {});
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  // const detailBannerInfo = useSelector((state) => state.buyCarDetail.detailBannerInfo.AM0540310); //내차사기배너
  // const detailBannerInfo = {};
  const detailBannerInfo = useSelector((state) => state.buyCarDetail.detailBannerInfo); //내차사기배너

  // useEffect(() => {
  //   //메인배너 > 하단 띠배너
  //   if (!objIsEmpty(detailBannerInfo)) {
  //     if (hasMobile) {
  //       setBeltImageUrl(process.env.IMGURL + detailBannerInfo.mblFileUrl);
  //     } else {
  //       setBeltImageUrl(process.env.IMGURL + detailBannerInfo.pcImgUrl);
  //     }
  //   `${imgUrl}${hasMobile?detailBannerInfo.mblFileUrl:detailBannerInfo.pcImgUrl}`
  //   }
  // }, [detailBannerInfo]);

  const shareDesc = makeShareDesc([carBaseInfo?.frmYyyy || '', `${setComma(carBaseInfo?.drvDist || 0)}km`, carBaseInfo?.fuelNm || '', carInfo?.locNm || '', `${setComma(carInfo?.slAmt || 0)}만원`]);

  const [counselPopupShow, setCounselPopupShow] = useRodal(false, true); // 1:1 쪽지
  const [notifyPopupShow, setNotifyPopupShow] = useRodal(false, true); // 허위매물신고
  const [costPopupShow, setCostPopupShow] = useRodal(false, true); // 총비용계산
  const [pfmcPopupShow, setPfmcPopupShow] = useRodal(false, true); // 성능점검조회
  const [historyPopupShow, setHistoryPopupShow] = useRodal(false, true); //보험이력조회(사고이력)
  const [autobellPopupShow, setAutobellPopupShow] = useRodal(false, true); //오토벨 상세진단서

  const calH = !hasMobile ? 251 : 108; // 픽스되는 요소들의 높이 합산된 값 190 + 61
  const [isTab, setIsTab] = useState(null); // 픽스되는 탭의 index
  const [isFix, setIsFix] = useState(false); // 탭 픽스 활성화 유무
  const [forceChange, setForceChange] = useState(false); // 탭 내부의 가변적인 상황 감지해서 재계산하기 위함
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  const [fpViewGallery, setFpViewGallery] = useState(false);
  const [fpViewAccidentHistory, setFpViewAccidentHistory] = useState(false);
  const [fpViewPerformance, setFpViewPerformance] = useState(false);
  const [fpViewInquire, setFpViewInquire] = useState(false);
  const [fpViewFalseSaleReport, setFpViewFalseSaleReport] = useState(false);
  const [fpViewTotalCostCalculation, setFpViewTotalCostCalculation] = useState(false);
  const [fpViewSellerInfo, setFpViewSellerInfo] = useState(false);
  const [fpViewDiagnosis, setFpViewDiagnosis] = useState(false);
  const [fpLogin, setFpLogin] = useState(!isLoginLiveCheck());
  const [sellerInfoSeq, setSellerInfoSeq] = useState(0);
  const [fpBottom, setFpBottom] = useState(80);

  const handleCarOptions = useCallback(() => {
    setForceChange((prev) => !prev);
  }, []);

  const onViewScroll = useCallback(() => {
    const currentY = !hasMobile ? window.scrollY : document.querySelector('#wrap').scrollTop;

    const getScroll = (el, direction = 'top') => {
      const targetScroll = direction === 'top' ? document.querySelector(el).getBoundingClientRect().top : document.querySelector(el).getBoundingClientRect().bottom;
      return targetScroll + currentY - calH;
    };
    let getAnimate = null;

    if (detailType === COMMON_TYPE) {
      getAnimate = (el1, el2, el3) => {
        if (currentY < getScroll(el1)) {
          setIsFix(false);
          setIsTab(0);
        } else {
          setIsFix(true);
          if (currentY >= getScroll(el1) && currentY < getScroll(el2)) {
            setIsTab(0);
          } else if (currentY >= getScroll(el2) && currentY < getScroll(el3)) {
            setIsTab(1);
          } else if (currentY >= getScroll(el3) && currentY < getScroll(el3, 'bottom')) {
            setIsTab(2);
          } else if (currentY >= getScroll(el3, 'bottom')) {
            setIsTab(null);
            setIsFix(false);
          }
        }
      };
      hasMobile ? getAnimate('#m-scroll-tab1', '#m-scroll-tab2', '#m-scroll-tab3') : getAnimate('#scroll-tab1', '#scroll-tab2', '#scroll-tab3');
    } else if (detailType === AUCTION_TYPE || detailType === LIVESTD_TYPE) {
      getAnimate = (el1, el2, el3, el4) => {
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
            } else if (currentY >= getScroll(el3) && currentY < getScroll(el3, 'bottom')) {
              setIsTab(2);
            } else if (currentY >= getScroll(el3, 'bottom')) {
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
            } else if (currentY >= getScroll(el4) && currentY < getScroll(el4, 'bottom')) {
              setIsTab(3);
            } else if (currentY >= getScroll(el4, 'bottom')) {
              setIsTab(null);
              setIsFix(false);
            }
          }
        }
      };
      hasMobile ? getAnimate('#m-scroll-tab1', '#m-scroll-tab2', '#m-scroll-tab3', '#m-scroll-tab4') : getAnimate('#scroll-tab1', '#scroll-tab2', '#scroll-tab3');
    }
  }, [calH, detailType, hasMobile]);

  const handleInterest = useCallback(() => {
    if (isLoginLiveCheck()) {
      toggleInterestAPI(dlrPrdId).then((result) => {
        (result?.data?.itrtYn || 'N') === 'Y' && showAlert('관심차량으로 등록되었습니다.<br/> 마이페이지에서 확인가능합니다.');
        dispatch(fetchCarInfoAction(dlrPrdId));
      });
    } else {
      hasMobile ? handleFullpagePopup('login')() : setLoginPopup(true);
    }
  }, [dlrPrdId, showAlert, dispatch, setLoginPopup, hasMobile]);

  const handleCounselPopUpToggle = useCallback(() => {
    if (!isLoginLiveCheck()) {
      return setLoginPopup(true);
    }
    setCounselPopupShow(!counselPopupShow);
  }, [counselPopupShow, setCounselPopupShow, setLoginPopup]);

  const handleNotifyPopUpToggle = useCallback(() => {
    if (!isLoginLiveCheck()) {
      return setLoginPopup(true);
    }
    setNotifyPopupShow(!notifyPopupShow);
  }, [notifyPopupShow, setLoginPopup, setNotifyPopupShow]);

  const handleCostPopupToggle = useCallback(() => {
    setCostPopupShow(!costPopupShow);
  }, [costPopupShow, setCostPopupShow]);

  const handleOnlineBuy = useCallback(() => {
    if (!isLoginLiveCheck()) return hasMobile ? handleFullpagePopup('login')() : setLoginPopup(true);
    if (getMemberType() !== UserType.MEMBER) return showAlert('홈서비스 구매는 일반 회원만 가능합니다.');
    Router.push(`/homeService/homeServiceCarInfo?dlrPrdId=${dlrPrdId}`).then(() => {
      window.scrollTo(0, 0);
    });
  }, [showAlert, dlrPrdId, setLoginPopup, hasMobile]);

  const handleForceChangeToggle = useCallback(() => {
    setForceChange((prev) => !prev);
  }, []);

  const handleOpenShare = useCallback((e) => {
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    preventScroll(true);
  }, []);

  const handleOpenProfile = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);

  const handleCloseDimm1 = useCallback(() => {
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, []);

  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);

  // 풀페이지 팝업에 출력할 키포인트, wear&tear 사진 리스트 저장용
  const [detailCarInfoImage, setDetailInfoImage] = useState([]);

  // console.log('detailcarinfo => image ::', detailCarInfoImage);
  // console.log('carPhoto => image ::', carContent.photos);
  const detailCarImage = useCallback((value) => {
    console.log('차량 상세보기 이미지 변경용 핸들러 ::::', value);
    // 사진 리스트에서 filtering작업(키 타입에 맞는 사진 배열 저장)
    setDetailInfoImage(value);
    setIsBasicPhoto(false);
  }, []);

  const handleFullpagePopup = (name, seq) => (e) => {
    e && e.preventDefault();
    if (name === 'view_gallery') {
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
      setFpLogin(false);
      setFpViewGallery(true);
    } else if (name === 'view_accident_history') {
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
      setFpLogin(false);
      setFpViewAccidentHistory(true);
    } else if (name === 'view_performance') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '성능점검 기록부',
          options: ['close']
        }
      });
      if (detailType === COMMON_TYPE) {
        setFpBottom(0);
      } else if (detailType === AUCTION_TYPE) {
        setFpBottom(56);
      } else {
        setFpBottom(0);
      }
      setFpViewGallery(false);
      setFpViewAccidentHistory(false);
      setFpViewInquire(false);
      setFpViewFalseSaleReport(false);
      setFpViewTotalCostCalculation(false);
      setFpViewSellerInfo(false);
      setFpViewDiagnosis(false);
      setFpLogin(false);
      setFpViewPerformance(true);
    } else if (name === 'view_inquire') {
      if (!isLoginLiveCheck()) return handleFullpagePopup('login')();
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
      setFpLogin(false);
      setFpViewInquire(true);
    } else if (name === 'view_report') {
      if (!isLoginLiveCheck()) return handleFullpagePopup('login')();
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
      setFpLogin(false);
      setFpViewFalseSaleReport(true);
    } else if (name === 'view_total') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '총 비용 계산',
          options: ['close']
        }
      });
      if (detailType === COMMON_TYPE) {
        setFpBottom(56);
      } else if (detailType === AUCTION_TYPE) {
        setFpBottom(80);
      } else {
        setFpBottom(56);
      }

      setFpViewGallery(false);
      setFpViewAccidentHistory(false);
      setFpViewPerformance(false);
      setFpViewInquire(false);
      setFpViewFalseSaleReport(false);
      setFpViewSellerInfo(false);
      setFpViewDiagnosis(false);
      setFpLogin(false);
      setFpViewTotalCostCalculation(true);
    } else if (name === 'view_seller') {
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
      setFpViewDiagnosis(false);
      setFpViewSellerInfo(true);
      setFpLogin(false);
      setSellerInfoSeq(seq);
    } else if (name === 'view_diagnosis') {
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
      setFpViewSellerInfo(false);
      setFpViewTotalCostCalculation(false);
      setFpLogin(false);
      setFpViewDiagnosis(true);
    } else if (name === 'login') {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '로그인',
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
      setFpViewTotalCostCalculation(false);
      setFpViewDiagnosis(false);
      setFpLogin(true);
    }
  };

  // 차량 기본사진 클릭시 사진 출력 팝업 객체
  const [isBasicPhoto, setIsBasicPhoto] = useState(false);

  // 기본 슬라이드 차량사진 클릭시 팝업 핸들러
  const handleCallback = (e, index) => {
    console.log(e, index);
    handleFullpagePopup('view_gallery')(e);
    setIsBasicPhoto(true);
  };

  const inquireCallback = (state, e) => {
    e.preventDefault();
    if (state === 'ok') {
      setFpViewInquire(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }
  };

  const performanceCallback = (e) => {
    e.preventDefault();
    setFpViewPerformance(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };

  const saleReportCallback = (state, e) => {
    e.preventDefault();
    if (state === 'ok') {
      setFpViewFalseSaleReport(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }
  };

  const diagnosisCallback = () => {
    setFpViewDiagnosis(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
  };

  const handleLoginPopUpClose = useCallback(() => {
    setLoginPopup(false);
  }, [setLoginPopup]);

  const handlePfmcPopUpToggle = useCallback(() => {
    setPfmcPopupShow(!pfmcPopupShow);
  }, [pfmcPopupShow, setPfmcPopupShow]);

  const handleHistoryPopUpToggle = useCallback(() => {
    setHistoryPopupShow(!historyPopupShow);
  }, [historyPopupShow, setHistoryPopupShow]);

  const handleAutoBellPopUpToggle = useCallback(() => {
    setAutobellPopupShow(!autobellPopupShow);
  }, [autobellPopupShow, setAutobellPopupShow]);

  const handleFpLoginClose = useCallback(() => {
    setFpLogin(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    preventScroll(false);
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!hasMobile) {
      window.addEventListener('scroll', onViewScroll);
      return () => {
        window.removeEventListener('scroll', onViewScroll);
      };
    }
    document.querySelector('#wrap').addEventListener('scroll', onViewScroll);
    return () => {
      document.querySelector('#wrap').removeEventListener('scroll', onViewScroll);
    };

    // document.scrollTo(0, document.body.clientHeight - window.innerHeight);
  }, [forceChange, onViewScroll]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initAlert();
    dispatch(fetchCarBaseOptionInfoAction(dlrPrdId));
    dispatch(fetchCarContentAction(dlrPrdId));
    dispatch(fetchDealerInfoAction(dlrPrdId));
    dispatch(fetchSmartItems(dlrPrdId, 'detail'));
    dispatch(fetchRecommendItems(dlrPrdId, 'detail'));
    const banExpRangeParam = hasMobile ? '0010,0030' : '0010,0020'; // (전체, MOBILE) or (전체, PC)
    dispatch(fetchDetailBannerInfo({ banGrpCd: '0030', banGbnCd: '0310', banExpRange: banExpRangeParam }));

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: carInfo.mdlNm,
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
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
    }
  }, [dlrPrdId]);

  useEffect(() => {
    if (detailType === AUCTION_TYPE && carInfo?.auctGoodno) {
      dispatch(fetchAuctionInfoAction(carInfo.auctGoodno)); // 경매장 정보
    }
  }, [carInfo, detailType, dispatch]);

  useEffect(() => {
    if (detailType === LIVESTD_TYPE && carBaseInfo?.atbInspNo) {
      dispatch(fetchAtbInsp(carBaseInfo.atbInspNo)); // 오토벨진단서
    }
    if (carBaseInfo?.carNo || false) {
      dispatch(fetchCarAccidentAction(carBaseInfo.carNo)); // 보험(사고)이력 조회
    }

    if (carBaseInfo?.perfInspNo || false) {
      dispatch(fetchCarPerformance(carBaseInfo.perfInspNo)); // 성능점검기록부
    }
  }, [carBaseInfo, detailType, dispatch]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="view-wrap">
          <div className="view-car-img">
            <ul className="ico-wrap">
              <li onClick={handleOpenShare}>
                <i className="ico-sharing-white" />
              </li>
              <li>
                <CheckBox id="chk-like" checked={(carInfo?.itrtProdYn || 'N') === 'Y'} isSelf={false} onChange={handleInterest} />
              </li>
            </ul>
            {detailType !== LIVESTD_TYPE && <SlideGallery car_gallery={carPhotos} callback={handleCallback} />}
            {detailType === LIVESTD_TYPE && <LiveStudio crId={carInfo?.crId || ''} carGallery={carPhotos} isMobile={true} />}
          </div>
          <BuyViewCarPrice carInfo={carInfo} carBaseInfo={carBaseInfo} />
          {/* <div className="market-price-graph v-buy">
            <div className="market-graph-box" style={{}}>
              <div className="market-graph-view">
                <img className="graph-bg" src="/images/contents/market-price-range.png" alt="" />
                <p className="price-tit">적정시세범위</p>
                <dl className="price-box price-current">
                  <dt>현재내차시세</dt>
                  <dd>{setComma(carBaseInfo?.appPrice || 2)}</dd>
                </dl>
                <dl className="price-box price-min">
                  <dt>최저적정시세</dt>
                  <dd>{setComma(carBaseInfo?.minPrice || 1)}</dd>
                </dl>
                <dl className="price-box price-max">
                  <dt>최고적정시세</dt>
                  <dd>{setComma(carBaseInfo?.maxPrice || 3)}</dd>
                </dl>
              </div>
            </div>
          </div> */}
        </div>
        <div className="detail-wrap">
          {detailType === COMMON_TYPE ? (
            <TabMenu type="type2" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={107} forceChange={forceChange}>
              <TabCont tabTitle="옵션 정보" id="m-scroll-tab1" index={0}>
                <BuyCarDetailOptionTab
                  carAccident={carAccident}
                  carBaseInfo={carBaseInfo}
                  carOption={carOption}
                  isMobile={true}
                  performance={performance}
                  onCarOptionClick={handleCarOptions}
                  onViewAccidentHistory={handleFullpagePopup('view_accident_history')}
                  onViewPerformance={handleFullpagePopup('view_performance')}
                  onViewReport={handleFullpagePopup('view_report')}
                />
              </TabCont>
              <TabCont tabTitle="차량 정보" id="m-scroll-tab2" index={1}>
                <BuyCarDetailCarInfoTab
                  carBaseInfo={carBaseInfo}
                  carContent={carContent}
                  carInfo={carInfo}
                  isMobile={true}
                  onForceToggle={handleForceChangeToggle}
                  // 풀페이지 출력
                  callBack={handleFullpagePopup('view_gallery')}
                  setImageType={(e) => detailCarImage(e)}
                />
              </TabCont>
              <TabCont tabTitle="판매자" id="m-scroll-tab3" index={2}>
                <BuyCarDetailSellerTab
                  carInfo={carInfo}
                  dealerInfo={dealerInfo}
                  bannerInfo={detailBannerInfo}
                  equivalentList={equivalentList}
                  isMobile={true}
                  smartList={smartList}
                  onClickSeller={handleFullpagePopup('view_seller')}
                />
              </TabCont>
            </TabMenu>
          ) : null}

          {detailType === AUCTION_TYPE ? (
            <TabMenu type="type2" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={107} forceChange={forceChange}>
              <TabCont tabTitle="낙찰차량" id="m-scroll-tab1" index={0} className="auction-wrap">
                <div className="content-sec">
                  <i />
                  <p>현대 글로비스 스마트옥션을 통한 믿을 수 있는 경매 낙찰 차량입니다.</p>
                </div>
                <SlideAuction car_list={auctPht} />
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
                      <td>{auctInfo?.auctnm || ''}</td>
                    </tr>
                    <tr>
                      <th>경매회차(경매일)</th>
                      <td>{`${auctInfo?.auctcorp || '' || ''}(${auctInfo?.auctdt || ''})`}</td>
                    </tr>
                    <tr>
                      <th>경매번호</th>
                      <td>NO. {auctInfo?.auctno || ''}</td>
                    </tr>
                  </tbody>
                </table>
              </TabCont>
              <TabCont tabTitle="옵션 정보" id="m-scroll-tab2" index={1}>
                <BuyCarDetailOptionTab
                  carAccident={carAccident}
                  carBaseInfo={carBaseInfo}
                  carOption={carOption}
                  isMobile={true}
                  performance={performance}
                  onCarOptionClick={handleCarOptions}
                  onViewAccidentHistory={handleFullpagePopup('view_accident_history')}
                  onViewPerformance={handleFullpagePopup('view_performance')}
                  onViewReport={handleFullpagePopup('view_report')}
                />
              </TabCont>
              <TabCont tabTitle="차량 정보" id="m-scroll-tab3" index={2}>
                <BuyCarDetailCarInfoTab
                  carBaseInfo={carBaseInfo}
                  carContent={carContent}
                  carInfo={carInfo}
                  isMobile={true}
                  onForceToggle={handleForceChangeToggle}
                  // 풀페이지 출력
                  callBack={handleFullpagePopup('view_gallery')}
                  setImageType={(e) => detailCarImage(e)}
                />
              </TabCont>
              <TabCont tabTitle="판매자" id="m-scroll-tab4" index={3}>
                <BuyCarDetailSellerTab
                  carInfo={carInfo}
                  dealerInfo={dealerInfo}
                  bannerInfo={detailBannerInfo}
                  equivalentList={equivalentList}
                  isMobile={true}
                  smartList={smartList}
                  onClickSeller={handleFullpagePopup('view_seller')}
                />
              </TabCont>
            </TabMenu>
          ) : null}

          {detailType === LIVESTD_TYPE ? (
            <TabMenu type="type2" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={107} forceChange={forceChange}>
              <TabCont tabTitle="진단내역" id="m-scroll-tab1" index={0} className="auction-wrap autobell-wrap">
                <BuyCarDetailLiveTab autobellIns={autobellIns} isMobile={true} onTabCallBack={handleForceChangeToggle} onViewDisgnosis={handleFullpagePopup('view_diagnosis')} />
              </TabCont>
              <TabCont tabTitle="옵션 정보" id="m-scroll-tab2" index={1}>
                <BuyCarDetailOptionTab
                  carAccident={carAccident}
                  carBaseInfo={carBaseInfo}
                  carOption={carOption}
                  isMobile={true}
                  performance={performance}
                  onCarOptionClick={handleCarOptions}
                  onViewAccidentHistory={handleFullpagePopup('view_accident_history')}
                  onViewPerformance={handleFullpagePopup('view_performance')}
                  onViewReport={handleFullpagePopup('view_report')}
                />
              </TabCont>
              <TabCont tabTitle="차량 정보" id="m-scroll-tab3" index={2}>
                <BuyCarDetailCarInfoTab
                  carBaseInfo={carBaseInfo}
                  carContent={carContent}
                  carInfo={carInfo}
                  isMobile={true}
                  onForceToggle={handleForceChangeToggle}
                  // 풀페이지 출력
                  callBack={handleFullpagePopup('view_gallery')}
                  setImageType={(e) => detailCarImage(e)}
                />
              </TabCont>
              <TabCont tabTitle="판매자" id="m-scroll-tab4" index={3}>
                <BuyCarDetailSellerTab
                  carInfo={carInfo}
                  dealerInfo={dealerInfo}
                  bannerInfo={detailBannerInfo}
                  equivalentList={equivalentList}
                  isMobile={true}
                  smartList={smartList}
                  onClickSeller={handleFullpagePopup('view_seller')}
                />
              </TabCont>
            </TabMenu>
          ) : null}
        </div>
        <Buttons className="center full fixed">
          <span className="step-btn-l">
            <ul>
              <li>
                <i className="ico-calculate" onClick={handleFullpagePopup('view_total')} />
              </li>
              <li>
                <a onClick={handleFullpagePopup('view_inquire')}>
                  쪽지
                  <br />
                  상담
                </a>
              </li>
              <li onClick={handleOpenProfile}>
                전화
                <br />
                문의
              </li>
            </ul>
          </span>
          {/* <span className="step-btn-r">{carInfo.hsvcYn === 'Y' && <Button size="full" background="blue80" title="온라인 구매" onClick={handleOnlineBuy} buttonMarkup={true} />}</span> */}
          <span className="step-btn-r">
            <Button size="full" background="blue80" title="온라인 구매" disabled={carInfo.hsvcYn !== 'Y'} onClick={handleOnlineBuy} buttonMarkup={true} />
          </span>
        </Buttons>

        <div className={dimm1 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1} zid={101}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            <ShareCarInfo title={carInfo?.crNm} description={shareDesc} url={shareUrl || ''} />
          </div>
        </MobBottomArea>

        <div className={dimm2 ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm2} />
        <MobBottomArea active={active2} zid={101}>
          <div className="inner profile">
            <div className="img-wrap">
              <img src={dealerInfo.dlrProfFileUrl ? `${imgUrl}${dealerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-mid.png'} alt="딜러 이미지" />
            </div>
            <div className="tx-wrap">
              <h4>{dealerInfo.dlrNm}</h4>
              <p>
                {`현대 글로비스 ${dealerInfo.dlrEntrCorpNm}`}
                <span>
                  문의사항이 있으신가요?
                  <br />
                  편안하게 전화주시면 친절하게 안내드립니다.
                </span>
              </p>
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="전화걸기" href="tel:01012341234" />
        </MobBottomArea>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={fpBottom}>
          {fpViewGallery && <MobViewGallery carInfoImage={detailCarInfoImage} carPhoto={carPhotos} isBasicPhoto={isBasicPhoto} />}
          {fpViewAccidentHistory && <CarAccidentHistory accidData={carAccident} />}
          {fpViewPerformance && <CarPerformanceCheck perfData={performance} mode="viewer" callback={performanceCallback} />}
          {fpViewInquire && <MobInquire CounselInfo={{ dlrPrdId, recipientId: `${dealerInfo.dlrNm}(${dealerInfo.dlrEntrCorpNm})` }} callback={inquireCallback} />}
          {fpViewFalseSaleReport && (
            <MobFalseSaleReport falseInfo={{ rptCarNo: carBaseInfo?.carNo || '', rptCarNm: carInfo?.crNm, dlrPrdId, slrId: carInfo?.dlrMbId || '' }} callback={saleReportCallback} />
          )}
          {fpViewTotalCostCalculation && (
            <MobTotalCostCalculation
              BuyViewInfo={{
                carPrice: carInfo?.slAmt * 10000,
                yy: carAccident?.carYear,
                commercialYn: carAccident?.carPlug,
                crTypeCd: carAccident?.carTypeNo,
                dspl: carBaseInfo?.dspl,
                seatingCapacity: carBaseInfo?.crTkcarPsncpa,
                maxTon: carBaseInfo?.crMaxton
              }}
            />
          )}
          {fpViewSellerInfo && <MobSellerInfo dlrId={carInfo.dlrMbId} seq={sellerInfoSeq} onClickLogin={handleFullpagePopup('login')} />}
          {fpViewDiagnosis && (
            <>
              <DetailDiagnosis inspData={autobellIns} />
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={diagnosisCallback} buttonMarkup={true} />
            </>
          )}
          {fpLogin && (
            <div className="content-wrap">
              <div className="login-wrap">
                <MobLogin errorPw={false} callback={handleFpLoginClose} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-sec">
        <div className={'content-wrap view-wrap' + (detailType === LIVESTD_TYPE ? ' live' : '')}>
          {detailType === LIVESTD_TYPE ? (
            <>
              <LiveStudio crId={carInfo?.crId || ''} carGallery={carPhotos} />
              <div className="info-wrap">
                <div className="view-car-name">
                  <ul className="tit-wrap">
                    <li className="tit">
                      <h3>{carInfo?.crNm}</h3>
                    </li>
                    <li className="fr">
                      <CheckBox id="chk-like" checked={(carInfo?.itrtProdYn || 'N') === 'Y'} isSelf={false} onChange={handleInterest} />
                    </li>
                    <li>
                      <CarBadge carInfo={carInfo} />
                    </li>
                  </ul>
                  <div className="seller-info-tp2">
                    <div className="img-wrap">
                      <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                        <a>
                          <img src={dealerInfo.dlrProfFileUrl ? `${imgUrl}${dealerInfo.dlrProfFileUrl}` : '/images/contents/dealer-basic-img-mid.png'} alt="판매자 이미지" />
                        </a>
                      </Link>
                      <span onClick={handleCounselPopUpToggle} />
                    </div>
                    <div className="tx-wrap">
                      <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                        <a>
                          <p className="veiw-point-tit">{`${dealerInfo.dlrNm}(${dealerInfo.dlrEntrCorpNm})`}</p>
                        </a>
                      </Link>
                      <span className="dealerNum">종사원증번호 : {dealerInfo?.dlrEn || ''}</span>
                      <span>전화번호 : {dealerInfo.omcTelNo ? telToStrFormat(dealerInfo.omcTelNo) : ''}</span>
                    </div>
                    <ul>
                      <li>
                        판매중
                        <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=1`}>
                          <span className="blue80">{setComma(dealerInfo.onSaleCarCnt)} 대</span>
                        </Link>
                      </li>
                      <li>
                        판매완료
                        <Link href={`/buycar/common/sellerInfo?dlrId=${carInfo.dlrMbId}&seq=2`}>
                          <span className="blue80">{setComma(dealerInfo.cmplSaleCarCnt)} 대</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <BuyViewCarPrice
                  dlrPrdId={dlrPrdId}
                  carInfo={carInfo}
                  carBaseInfo={carBaseInfo}
                  dealerInfo={dealerInfo}
                  openCounselPopup={handleCounselPopUpToggle}
                  openCostPopup={handleCostPopupToggle}
                  onClickOnlineBuy={handleOnlineBuy}
                />
              </div>
            </>
          ) : (
            <>
              <ul className="tit-wrap">
                <li className="tit">
                  <h3>{carInfo?.crNm}</h3>
                </li>
                <li className="fr">
                  <CheckBox id="chk-like" checked={(carInfo?.itrtProdYn || 'N') === 'Y'} isSelf={false} onChange={handleInterest} />
                </li>
                <li>
                  <CarBadge carInfo={carInfo} />
                </li>
              </ul>

              <div className="info-wrap">
                <div className="view-car-img">
                  <SlideGallery car_gallery={carPhotos} />
                </div>
                <BuyViewCarPrice
                  dlrPrdId={dlrPrdId}
                  carInfo={carInfo}
                  carBaseInfo={carBaseInfo}
                  dealerInfo={dealerInfo}
                  openCounselPopup={handleCounselPopUpToggle}
                  openCostPopup={handleCostPopupToggle}
                  onClickOnlineBuy={handleOnlineBuy}
                />
              </div>
            </>
          )}

          <ul className="float-wrap">
            <li>
              <Tooltip placement="topLeft" width={340} exception="sns-share" event="click">
                <TooltipItem>
                  <Button size="mid" line="gray" radius={true} title="공유하기" width={86} buttonMarkup={true} />
                </TooltipItem>
                <TooltipCont>
                  <ShareCarInfo title={carInfo?.crNm} description={shareDesc} url={shareUrl || ''} />
                </TooltipCont>
              </Tooltip>
              <Button size="mid" line="gray" radius={true} title="허위매물 신고" width={115} onClick={handleNotifyPopUpToggle} buttonMarkup={true} />
            </li>
            <li>
              <CheckBox id="chk-like-2" className="heart" title={setComma(carInfo.itrtProdCnt)} checked={false} />
              <CheckBox id="chk-count" className="count" title={setComma(carInfo.inqCnt)} checked={false} />
            </li>
          </ul>
        </div>
      </div>

      {detailType === AUCTION_TYPE && (
        <div className="auction-wrap">
          <div className="content-wrap">
            <SlideAuction car_list={auctPht} />
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
                  <td>{auctInfo?.auctnm || ''}</td>
                  <th>경매회사(경매일)</th>
                  <td>{`${auctInfo?.auctcorp || ''}(${auctInfo?.auctdt || ''})`}</td>
                  <th>경매번호</th>
                  <td>NO. {auctInfo?.auctno || ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={isFix === false ? 'detail-wrap' : 'detail-wrap is-area-fix'}>
        <div className="tit-wrapper">
          <ul className="tit-wrap">
            <li className="img-wrap">
              <img src="/images/dummy/view-thumb-img.jpg" alt="차량 이미지" />
            </li>
            <li className="tit">
              <h3>{carInfo?.crNm}</h3>
            </li>
            <li className="fr">
              <p className="price-tp1">
                {setComma(carInfo.slAmt)}
                <span className="won">만원</span>
              </p>
              <Button size="big" line="black" color="black" title="총비용 계산" width={180} onClick={handleCostPopupToggle} buttonMarkup={true} />
              {carInfo.hsvcYn === 'Y' && <Button size="big" line="red60" color="red60" title="온라인 구매하기" width={180} buttonMarkup={true} onClick={handleOnlineBuy} />}
            </li>
          </ul>
        </div>

        {detailType === LIVESTD_TYPE ? (
          <BuyCarDetailLiveTab autobellIns={autobellIns} onAutoBellPopUpOpen={handleAutoBellPopUpToggle} onHistoryPopUpOpen={handleHistoryPopUpToggle} onPfmcPopUpOpen={handlePfmcPopUpToggle} />
        ) : null}

        <TabMenu type="type1" mount={false} isScroll={true} defaultTab={isTab} isFix={isFix} mode="fix" calH={190}>
          <TabCont tabTitle="옵션 정보" id="scroll-tab1" index={0}>
            <BuyCarDetailOptionTab
              carAccident={carAccident}
              carBaseInfo={carBaseInfo}
              carOption={carOption}
              performance={performance}
              onCarOptionClick={handleCarOptions}
              onHistoryPopUpOpen={handleHistoryPopUpToggle}
              onPfmcPopUpOpen={handlePfmcPopUpToggle}
              onViewAccidentHistory={handleFullpagePopup('view_accident_history')}
              onViewPerformance={handleFullpagePopup('view_performance')}
              onViewReport={handleFullpagePopup('view_report')}
            />
          </TabCont>
          <TabCont tabTitle="차량 정보" id="scroll-tab2" index={1}>
            <div className="content-sec">
              <div className="content-wrap info-wrap car-details">
                <CarDetail content={carContent} />
              </div>
            </div>
          </TabCont>
          <TabCont tabTitle="판매자 정보" id="scroll-tab3" index={2}>
            <BuyCarDetailSellerTab
              carInfo={carInfo}
              dealerInfo={dealerInfo}
              bannerInfo={detailBannerInfo}
              equivalentList={equivalentList}
              smartList={smartList}
              onCounselPopUpOpen={handleCounselPopUpToggle}
              onClickSeller={handleFullpagePopup('view_seller')}
            />
          </TabCont>
        </TabMenu>
      </div>

      <div className="content-sec">
        <div className="content-wrap goods-wrap">
          {!objIsEmpty(detailBannerInfo) && (
            <div className="goods-banner">
              <div className="img-wrap">
                <a href={detailBannerInfo?.pcLinkAddr} target={detailBannerInfo?.pcNewWndwYn === 'Y' ? '_blank' : '_self'} rel="noopener noreferrer">
                  <img src={`${imgUrl}${detailBannerInfo?.pcImgUrl}`} alt={detailBannerInfo?.pcAlt} />
                </a>
              </div>
            </div>
          )}
          {!isEmpty(smartList) && (
            <div className="list-wrap">
              <h4>오토벨스마트추천</h4>
              <ul className="goods-list">
                {smartList.map((car, i) => {
                  if (i < 4) {
                    return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                  }
                })}
              </ul>
            </div>
          )}
          {!isEmpty(equivalentList) && (
            <div className="list-wrap">
              <h4>동급 차량 추천</h4>
              <ul className="goods-list">
                {equivalentList.map((car, i) => {
                  if (i < 4) {
                    return <BannerItemBuyCar key={car.dlrPrdId} data={car} />;
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <RodalPopup show={loginPopup} type={'slideUp'} closedHandler={handleLoginPopUpClose} title="로그인" mode="normal" size="small">
        <LoginPopup url={`/buycar/buyCarDetailType?dlrPrdId=${dlrPrdId}&detailType=${detailType}`} />
      </RodalPopup>

      {/* ======================= 총비용계산 팝업 ======================= */}
      <TotalCostPopup
        costPopupShow={costPopupShow}
        setCostPopupShow={setCostPopupShow}
        closeCostPopup={() => setCostPopupShow(false)}
        BuyViewInfo={{
          carPrice: carInfo?.slAmt || 0, // 차량 가격
          yy: carAccident?.carYear || '', // 차량 연식
          commercialYn: carAccident?.carPlug || '', // 차량사용용도(일반: , 영업)
          crTypeCd: carAccident?.carTypeNo || 0, // 차종코드
          dspl: carBaseInfo?.dspl || 0, // 차량 배기량
          seatingCapacity: carBaseInfo?.crTkcarPsncpa || 0, // 인승
          maxTon: carBaseInfo?.crMaxton || 0 // 톤
        }}
      />

      {/* ======================= 허위매물신고 팝업 ======================= */}
      <FalseForSaleReport
        notifyPopupShow={notifyPopupShow}
        setNotifyPopupShow={setNotifyPopupShow}
        closeNotifyPopup={() => setNotifyPopupShow(false)}
        falseInfo={{ rptCarNo: carBaseInfo?.carNo || '', rptCarNm: carInfo?.crNm, dlrPrdId, slrId: carInfo?.dlrMbId || '' }}
      />

      {/* ======================= 1:1 쪽지 팝업 ======================= */}
      <CounselMessage
        counselPopupShow={counselPopupShow}
        setCounselPopupShow={setCounselPopupShow}
        closeCounselPopup={() => setCounselPopupShow(false)}
        CounselInfo={{ dlrPrdId, dlrId: dealerInfo.dlrId, recipientId: `${dealerInfo.dlrNm}(${dealerInfo.dlrEntrCorpNm})` }}
      />

      {/* ======================= 보험이력조회 팝업 ======================= */}
      <RodalPopup show={historyPopupShow} type={'fade'} closedHandler={() => setHistoryPopupShow(false)} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory accidData={carAccident} />
      </RodalPopup>

      {/* ======================= 성능점검조회 팝업 ======================= */}
      <RodalPopup show={pfmcPopupShow} type={'fade'} closedHandler={() => setPfmcPopupShow(false)} title="성능점검기록부" mode="normal" size="large">
        <CarPerformanceCheck perfData={performance} onChange={handlePfmcPopUpToggle} />
      </RodalPopup>

      {/* ======================= 오토벨 상세진단서 팝업 ======================= */}
      <RodalPopup show={autobellPopupShow} type={'fade'} closedHandler={() => setAutobellPopupShow(false)} mode="normal" title="오토벨 상세진단서" size="large">
        <DetailDiagnosis inspData={autobellIns} />
      </RodalPopup>
    </AppLayout>
  );
});

BuyCarDetailType.getInitialProps = async (http) => {
  const { dispatch } = http.reduxStore;
  const helper = new RenderHelper(http);
  const { query, accessToken } = helper;
  const { dlrPrdId } = query;

  await helper.setRedirectUrl('/buycar/buyCarList').requiredQuery('dlrPrdId');
  const carInfo = await dispatch(fetchCarInfoAction(dlrPrdId, !!accessToken));
  if (isEmpty(carInfo)) return helper.redirect('/buycar/buyCarList');

  let detailType;
  switch ('Y') {
    case carInfo.lvstdYn:
      detailType = LIVESTD_TYPE;
      break;
    case carInfo.lvshotYn:
      detailType = LIVESTD_TYPE;
      break;
    case carInfo.auctSbidYn:
      detailType = AUCTION_TYPE;
      break;
    default:
      detailType = COMMON_TYPE;
      break;
  }

  await insertPrdCntAPI(dlrPrdId, !!accessToken);
  await dispatch({ type: SECTION_BUY });
  return { dlrPrdId, detailType };
};

BuyCarDetailType.propTypes = {
  dlrPrdId: PropTypes.string,
  detailType: PropTypes.string
};

export default withRouter(BuyCarDetailType);
