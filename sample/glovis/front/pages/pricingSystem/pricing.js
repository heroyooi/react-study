import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import PricingCarTitle from '@src/components/pricingSystem/pricingCarTitle';
import PricingAuctionInfo from '@src/components/pricingSystem/pricingAuctionInfo';
import PricingTitleNavi from '@src/components/pricingSystem/pricingTitleNavi';
import PricingUserInfo from '@src/components/pricingSystem/pricingUserInfo';
import PricingCarInfo from '@src/components/pricingSystem/pricingCarInfo';
import PricingBidSucessList from '@src/components/pricingSystem/pricingBidSucessList';
import PricingCoverAllim from '@src/components/pricingSystem/pricingCoverAllim';
import PricingLayerPopUp from '@src/components/pricingSystem/pricingLayerPopUp';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import AppLayout from '@src/components/layouts/AppLayout';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingAccidentAndPerformance from '@src/components/pricingSystem/pricingAccidentAndPerformance';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import { MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, SECTION_PRICING_SYSTEM, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { axiosPost } from '@src/utils/HttpUtils';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { isAllowPricingSearch } from '@src/components/pricingSystem/pricingUtil';
import { getMemberType, isLogin } from '@src/utils/LoginUtils';
import withPricing from '@src/hoc/pricing/withPricing';

const globalThis = require('globalthis')();

const Pricing = ({
  bidList,
  hasCarInfo,
  hasMobile,
  hasPricing,
  isLoading,
  isMobileCarNumInput,
  isMode,
  isReportPopUp,
  marketPrice,
  pricingCarInfo,
  pricingTicketInfo,
  router,
  searchCarDefaultOptions,
  searchMode,
  targetEl,
  userInfo,
  viewableCnt,
  withoutGrade,
  onLoadingToggle,
  onSearchCarNo,
  onSearchCarCond,
  onSearchResult,
  onSetPricingCarInfoName,
  onSetPricingReset,
  onTabChanged,
  onTsCancel,
  onToggleMobileCarNoInput,
  onUpdateCarInfo,
  onToggleReportPopUp,
  onUpdateSearchMode
}) => {
  const dispatch = useDispatch();
  const [auctionDetailPopupShow, setAuctionDetailPopupShow] = useRodal(false);
  const [reportPopupShow, setReportPopupShow] = useRodal(false);
  const [isShowCoverAllim, setIsShowCoverAllim] = useState(false);
  const [isEavluator, setIsEavluator] = useState(false);
  const [isPerformancePopUpOpen, setIsPerformancePopUpOpen] = useRodal(false);
  const [isAccidentPopUpOpen, setIsAccidentPopUpOpen] = useRodal(false);
  const [carPefroraccidentInfo, setCarPefroraccidentInfo] = useState(null);
  const [selectAuctionInfo, setSelectedAuctionInfo] = useState(null);
  const [accidentData, setAccidentData] = useState(null);
  const [historyPopupShow, setHistoryPopupShow] = useRodal(false); //보험이력조회(사고이력)

  const handleAuctionOpen = useCallback(
    (e, des) => {
      setSelectedAuctionInfo(des);
      setCarPefroraccidentInfo(null);
      setAuctionDetailPopupShow(true);
    },
    [setAuctionDetailPopupShow]
  );

  const handleAuctionClose = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      setCarPefroraccidentInfo(null);
      setAuctionDetailPopupShow(false);
    },
    [setAuctionDetailPopupShow]
  );

  const handleSearchCarCond = useCallback(
    (e) => {
      if (isAllowPricingSearch(viewableCnt, pricingTicketInfo, true) === false) {
        e.preventDefault();
        return;
      }

      onSearchCarCond(e);
    },
    [onSearchCarCond, pricingTicketInfo, viewableCnt]
  );
  const handleCoverAllimToggle = useCallback(
    (e) => {
      e.preventDefault();
      setIsShowCoverAllim(!isShowCoverAllim);

      preventScroll(!isShowCoverAllim);
    },
    [isShowCoverAllim]
  );

  const handleConvertAllimConfirm = useCallback(
    (e) => {
      e.preventDefault();

      setIsShowCoverAllim(!isShowCoverAllim);

      if (isAllowPricingSearch(viewableCnt, pricingTicketInfo, true) === false) {
        return;
      }

      preventScroll(!isShowCoverAllim);
      onToggleMobileCarNoInput(e);
    },
    [isShowCoverAllim, onToggleMobileCarNoInput, pricingTicketInfo, viewableCnt]
  );

  const handleCovertAllimClose = useCallback(
    (e) => {
      if (isAllowPricingSearch(viewableCnt, pricingTicketInfo, true) === false) {
        return;
      }

      if (onUpdateSearchMode) {
        onUpdateSearchMode(e);
      }
    },
    [onUpdateSearchMode, pricingTicketInfo, viewableCnt]
  );

  const handlePerformancePopUpClose = useCallback(() => {
    setIsPerformancePopUpOpen(false);
  }, [setIsPerformancePopUpOpen]);

  const handlePerformancePopUpToggle = useCallback(
    (e, deps) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const nextIsPerformancePopUpOpen = !isPerformancePopUpOpen;
      if (nextIsPerformancePopUpOpen) {
        setIsAccidentPopUpOpen(false);
      }

      if (nextIsPerformancePopUpOpen === true) {
        axiosPost('/api/pricing/getPerformanceInspNo.do', { crNo: deps.crNo, crId: deps.crId, goodNo: deps.goodNo }, null).then((res) => {
          setCarPefroraccidentInfo(res.data.data);
          setIsPerformancePopUpOpen(nextIsPerformancePopUpOpen);
        });
      } else {
        setIsPerformancePopUpOpen(nextIsPerformancePopUpOpen);
      }
    },
    [isPerformancePopUpOpen, setIsAccidentPopUpOpen, setIsPerformancePopUpOpen]
  );

  const handleAccidentPopUpClose = useCallback(() => {
    setIsAccidentPopUpOpen(false);
  }, [setIsAccidentPopUpOpen]);

  const handleAccidentPopUpToggle = useCallback(
    (e, deps) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      const nextIsAccidentPopUpOpen = !isAccidentPopUpOpen;

      if (nextIsAccidentPopUpOpen) {
        setIsPerformancePopUpOpen(false);
      }

      if (nextIsAccidentPopUpOpen === true) {
        setCarPefroraccidentInfo({ crNo: deps.crNo, crId: deps.crId });
      }
      setIsAccidentPopUpOpen(nextIsAccidentPopUpOpen);
    },
    [isAccidentPopUpOpen, setIsAccidentPopUpOpen, setIsPerformancePopUpOpen]
  );

  const onOpenHistory = useCallback(
    (e) => {
      e.preventDefault();
      onLoadingToggle();
      const { crNo } = pricingCarInfo;
      axiosPost(`/api/autobell/sitemanagement/carHistory/carHistoryView.do`, { crNo: crNo }).then((res) => {
        setAccidentData(res.data.data);
        setHistoryPopupShow(true);
        onLoadingToggle();
      });
    },
    [onLoadingToggle, pricingCarInfo, setHistoryPopupShow]
  );

  useEffect(() => {
    onSetPricingReset();
    if (isLogin() !== true) {
      // Router.push('/login');
      globalThis.window.location.href = '/login';
      return;
    }
    const memberType = getMemberType();

    if (!(memberType === '0020' || memberType === '0030' || memberType === '0040' || memberType === '0110')) {
      alert('딜러회원만 이용가능 합니다.');
      Router.push('/main');
      return;
    }

    dispatch({ type: SECTION_PRICING_SYSTEM });
    if (hasMobile === true) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          options: ['back', 'voucher', 'gnb', 'transparent'],
          events: [
            null,
            () => {
              alert('이용 구매 페이지로 이동합니다.');
            },
            null,
            null
          ]
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }

    router.prefetch('/pricingSystem/pricingview');
    router.prefetch('/pricingSystem/pricingsearch');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReportPopupShow(isReportPopUp);
  }, [isReportPopUp, setReportPopupShow]);

  useEffect(() => {
    //isAllowPricingSearch(viewableCnt, pricingTicketInfo, true);
    console.log(viewableCnt, pricingTicketInfo);
  }, [viewableCnt, pricingTicketInfo]);

  useEffect(() => {
    setIsEavluator(Cookies.get('membertype') === '0110' ? true : false); //평가사 여부
    //평가사 로그인 1.알림팝업 숨김, 2.무료조회 가능횟수 숨김
    console.log('Cookies.membertype=%o, isEavluator=%o', Cookies.get('membertype'), isEavluator);
    if (isEavluator === true) {
      setIsShowCoverAllim(false); //PricingCoverAllim
      console.log('setIsShowCoverAllim isShowCoverAllim=%o', isShowCoverAllim);
    }
  }, []); //

  if (process.env.systemEnv !== 'local' && isLogin() !== true) {
    return <AppLayout />;
  }

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="pricing-main-area">
          <div className="pricing-top-banner" ref={targetEl}>
            <div className="content-wrap">
              <h3>프라이싱시스템</h3>
              <p>
                오토벨 스마트옥션으로 실제 판매되었던 차량의 판매가격으로
                <br />
                정확한 시세정보를 제공해드립니다..
              </p>
              <i className="top-banner-bg" />
            </div>
          </div>
          <div className="content-sec">
            <div className="content-wrap">
              {isMobileCarNumInput === false ? (
                <Button
                  size="full"
                  background="white"
                  color="black"
                  radius={true}
                  shadow={true}
                  title="차량 번호로 조회"
                  iconType="input-search"
                  iconReverse={true}
                  height={64}
                  onClick={handleCoverAllimToggle}
                />
              ) : (
                <PricingSearchCar
                  canUseOwnerName={false}
                  type="pricingSystem"
                  hasNoInit={true}
                  hasMobile={true}
                  hasMobileOnlyCarNumberInput={true}
                  dataContext={pricingCarInfo}
                  onSearchCarNoClick={onSearchCarNo}
                  onTsCancel={onTsCancel}
                />
              )}
              {isMobileCarNumInput === false && (
                <Button
                  size="full"
                  background="white"
                  color="black"
                  radius={true}
                  shadow={true}
                  title="차량정보 입력 조회"
                  iconType="car-search"
                  marginTop={16}
                  iconReverse={true}
                  height={64}
                  onClick={handleSearchCarCond}
                />
              )}
            </div>
          </div>
        </div>

        <div className={isShowCoverAllim ? 'modal-bg v-2 active' : 'v-2 modal-bg'} onClick={handleCoverAllimToggle} />
        <MobBottomArea active={isShowCoverAllim} zid={101} isFixButton={true}>
          <div className="inner">
            <PricingCoverAllim userName={userInfo?.name} onClose={handleCovertAllimClose} />
            <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleConvertAllimConfirm} />
          </div>
        </MobBottomArea>

        <PricingLayerPopUp />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PricingTitleNavi />
      <div className="content-wrap pricing-wrap">
        <PricingUserInfo userName={userInfo?.name} viewableCnt={viewableCnt} pricingTicketInfo={pricingTicketInfo} isEavluator={isEavluator} />
        <div className="pricing-sec">
          {Number(pricingTicketInfo?.availableAdCnt) > 0 || searchMode === true || isEavluator ? (
            <>
              <PricingSearchCar
                canUseOwnerName={false}
                dataContext={pricingCarInfo}
                type="pricingSystem"
                onSearchCarNoClick={onSearchCarNo}
                onSearchCarCondClick={onSearchCarCond}
                onSetPricingCarInfoName={onSetPricingCarInfoName}
                onTabCanged={onTabChanged}
                onUpdateCarInfo={onUpdateCarInfo}
                onTsCancel={onTsCancel}
              />
              <p className="tx-exp-tp5">&#8251; 시세를 조회하시면 차량을 매입할 때의 시세와 예측 가능한 미래시세, 동급 차량의 실제 경매 낙찰 시세를 확인하실 수 있습니다. (최근 3개월 data 제공)</p>
            </>
          ) : (
            <PricingCoverAllim userName={userInfo?.name} onClose={handleCovertAllimClose} />
          )}

          {isMode === 'CarNumber' &&
          !isEmpty(pricingCarInfo) && ( // 차량 번호로 조회
              <>
                <div className="best-register-car grade">
                  <PricingCarTitle carInfo={pricingCarInfo} hasCarInfo={hasCarInfo} hasPricing={hasPricing} isPrint={false} withoutGrade={false} onReportPrint={onToggleReportPopUp} />
                  <PricingCarInfo
                    canUseAccd={true}
                    withoutGrade={withoutGrade}
                    hasCarInfo={hasCarInfo}
                    hasPricing={hasPricing}
                    isLoading={isLoading}
                    dataContext={pricingCarInfo}
                    onCarInfoUpdate={onUpdateCarInfo}
                    onGetPricingCarInfo={onSearchCarNo}
                    carCondOptions={searchCarDefaultOptions}
                    onValueChange={onUpdateCarInfo}
                    onSearchResult={onSearchResult}
                  />
                </div>
                {withoutGrade === true && !isEmpty(marketPrice) && (
                  <div className="best-register-graph">
                    <div className="tit-wrap">
                      <h4>조회하신 차량의 시세 결과입니다.</h4>
                      <Button size="mid" line="black" color="black" title="보험 이력 보기" width={136} onClick={onOpenHistory} />
                    </div>
                    <PriceChart hasPricingSystem={true} marketPrice={marketPrice} height={368} />
                  </div>
                )}
              </>
            )}
          {isMode === 'CarCondition' && !isEmpty(pricingCarInfo) && <PriceChart hasPricingSystem={true} marketPrice={marketPrice} height={368} />}

          {bidList?.length > 0 && <PricingBidSucessList bidList={bidList} isMode={isMode} onAuctionClick={handleAuctionOpen} />}
        </div>
      </div>

      <PricingLayerPopUp />
      {isLoading === true ? (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={40} color={'#fff'} loading={true} />
        </div>
      ) : null}
      <RodalPopup show={auctionDetailPopupShow} type={'fade'} closedHandler={handleAuctionClose} title="경매정보 상세" mode="normal" width={894}>
        {auctionDetailPopupShow && <PricingAuctionInfo dataContext={selectAuctionInfo} onPerformancePopUpToggle={handlePerformancePopUpToggle} onAccidentPopUpToggle={handleAccidentPopUpToggle} />}
      </RodalPopup>
      <RodalPopup show={reportPopupShow} type={'fade'} closedHandler={onToggleReportPopUp} mode="normal" size="large">
        {reportPopupShow && <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} />}
      </RodalPopup>
      <RodalPopup show={isPerformancePopUpOpen} type={'fade'} closedHandler={handlePerformancePopUpClose} mode="normal" size="large" subPop={true}>
        {isPerformancePopUpOpen && objIsEmpty(carPefroraccidentInfo) ? null : (
          <PricingAccidentAndPerformance isPerf={true} crNo={carPefroraccidentInfo?.crNo} crId={carPefroraccidentInfo?.crId} carInfo={carPefroraccidentInfo} onClose={handlePerformancePopUpToggle} />
        )}
      </RodalPopup>
      <RodalPopup show={isAccidentPopUpOpen} type={'fade'} closedHandler={handleAccidentPopUpClose} mode="normal" size="large" subPop={true}>
        {isPerformancePopUpOpen && objIsEmpty(carPefroraccidentInfo) ? null : (
          <PricingAccidentAndPerformance isPerf={false} crNo={carPefroraccidentInfo?.crNo} crId={carPefroraccidentInfo?.crId} carInfo={carPefroraccidentInfo} onClose={handlePerformancePopUpToggle} />
        )}
      </RodalPopup>

      <RodalPopup show={historyPopupShow} type={'fade'} closedHandler={() => setHistoryPopupShow(false)} title="중고차 사고이력 정보 보고서" mode="normal" size="large">
        <CarAccidentHistory accidData={accidentData} mode="viewer" onChange={() => setHistoryPopupShow(false)} />
      </RodalPopup>
    </AppLayout>
  );
};

Pricing.propTypes = {
  bidList: PropTypes.array,
  hasCarInfo: PropTypes.bool,
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobileCarNumInput: PropTypes.bool,
  isMode: PropTypes.string,
  isReportPopUp: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  pricingTicketInfo: PropTypes.object,
  router: PropTypes.object,
  searchCarDefaultOptions: PropTypes.array,
  searchMode: PropTypes.bool,
  targetEl: PropTypes.object,
  userInfo: PropTypes.object,
  viewableCnt: PropTypes.number,
  withoutGrade: PropTypes.bool,
  onLoadingToggle: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSearchResult: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onSetPricingReset: PropTypes.func,
  onTabChanged: PropTypes.func,
  onTsCancel: PropTypes.func,
  onToggleMobileCarNoInput: PropTypes.func,
  onToggleReportPopUp: PropTypes.func,
  onUpdateCarInfo: PropTypes.func,
  onUpdateSearchMode: PropTypes.func
};

export default withRouter(withPricing(Pricing));
