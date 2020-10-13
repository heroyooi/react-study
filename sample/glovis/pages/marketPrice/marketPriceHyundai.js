import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppLayout from '@src/components/layouts/AppLayout';
import FrameLayout from '@src/components/layouts/FrameLayout';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingCarTitle from '@src/components/pricingSystem/pricingCarTitle';
import PricingCarInfo from '@src/components/pricingSystem/pricingCarInfo';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_NONE, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';

const MarketPriceHyundai = ({
  hasMobile,
  hasPricing,
  isMode,
  marketPrice,
  pricingCarInfo,
  withoutGrade,
  onGetPricing,
  onSearchCarNo,
  onSearchCarCond,
  onSetPricingCarInfoName,
  onTabChanged,
  onUpdateCarInfo
}) => {
  const dispatch = useDispatch();

  dispatch({ type: SECTION_MARKET_PRICE });
 
  // 모바일 설정
  const [calH, setCalH] = useState(408);
  const targetEl = useRef(null);

  useEffect(() => {
    if (targetEl && targetEl.current) {
      setCalH(targetEl.current.clientHeight);
    }
  }, []);

  // 팝업
  const [reportPopupShow, setReportPopupShow, openReportPopup, closeReportPopup] = useRodal(false, true);
  const handleSearchCarCond = useCallback(
    (e, deps) => {
      if (onSearchCarCond) {
        onSearchCarCond(e, deps);
      }

      if (hasMobile === false) {
        setTimeout(() => {
          setReportPopupShow(true);
        }, 50);
      }
    },
    [hasMobile, onSearchCarCond, setReportPopupShow]
  );

  const handleSearchResult = useCallback(
    (e) => {
      e.preventDefault();
      if (pricingCarInfo && pricingCarInfo.resStatus && pricingCarInfo.resStatus.rstCode === '2') {
        // eslint-disable-next-line no-alert
        alert('2번 재조회');
        onSearchCarNo(e, pricingCarInfo);
        return;
      }
      if (onGetPricing) {
        onGetPricing(e);
      }
      setTimeout(() => {
        setReportPopupShow(true);
      }, 10);
    },
    [onGetPricing, onSearchCarNo, pricingCarInfo, setReportPopupShow]
  );

  const handleReportPrint = useCallback(
    (e) => {
      openReportPopup(e, 'fade');
    },
    [openReportPopup]
  );

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_NONE
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>
        <div className="market-main-area">
          <div className="market-top-banner" ref={targetEl}>
            <div className="content-wrap">
              <h3 style={{ paddingTop:'0px' }}>시세조회</h3>
              <p>현대 오토벨을 통해, 내차를 팔 때 중고 시세를 편리하게 조회할 수 있습니다.</p>
              <i className="top-banner-bg" />
            </div>
          </div>
          <div className="content-sec" style={{ height: `calc(100vh - ${calH}px)` }}>
            <div className="content-wrap">
              <Button size="full" background="white" color="black" radius={true} shadow={true} title="차량 조건 검색" iconType="car-search" iconReverse={true} height={64} onClick={onSearchCarCond} />
              <Button
                size="full"
                background="white"
                color="black"
                radius={true}
                shadow={true}
                title="차량 번호로 조회"
                iconType="input-search"
                marginTop={16}
                iconReverse={true}
                height={64}
                onClick={onSearchCarNo}
              />
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <FrameLayout>
      <div className="market-top-banner">
        <div className="content-wrap">
          <h3>시세조회</h3>
          <p>현대 오토벨을 통해, 내차를 팔 때 중고 시세를 편리하게 조회할 수 있습니다.{hasPricing.toString()}</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="content-wrap market-wrap">
        <PricingSearchCar
          type="marketPrice"
          pricingCarInfo={pricingCarInfo}
          onSearchCarNoClick={onSearchCarNo}
          onSearchCarCondClick={handleSearchCarCond}
          onSetPricingCarInfoName={onSetPricingCarInfoName}
          onTabCanged={onTabChanged}
          onUpdateCarInfo={onUpdateCarInfo}
        />

        {isMode === 'CarCondition' && <PricingCarTitle withoutGrade={withoutGrade} />}
        {isMode === 'CarNumber' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasPricing={hasPricing} isPrint={true} onReportPrint={handleReportPrint} />
            <PricingCarInfo dataContext={pricingCarInfo} hasPricing={hasPricing} type={'marketPrice'} withoutGrade={withoutGrade} onValueChange={onUpdateCarInfo} />
            {pricingCarInfo && pricingCarInfo.seriesNo && (
              <Buttons align="center" marginTop={56}>
                <Button size="big" background="blue80" title="결과보기" width={202} onClick={handleSearchResult} />
              </Buttons>
            )}
          </>
        )}
      </div>

      <RodalPopup show={reportPopupShow} type={'fade'} closedHandler={closeReportPopup} mode="normal" size="large">
        <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} isSellReceipt={true} />
      </RodalPopup>
    </FrameLayout>
  );
};

MarketPriceHyundai.propTypes = {
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isMode: PropTypes.string,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  withoutGrade: PropTypes.bool,
  onGetPricing: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onTabChanged: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

export default withPricing(MarketPriceHyundai);
