import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingCarTitle from '@src/components/pricingSystem/pricingCarTitle';
import PricingCarInfo from '@src/components/pricingSystem/pricingCarInfo';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { objToQueryParams } from '@src/components/pricingSystem/pricingUtil';

import withPricing from '@src/hoc/pricing/withPricing';
const MarketPrice = ({
  hasMobile,
  hasPricing,
  isMode,
  marketPrice,
  pricingCarInfo,
  userInfo,
  withoutGrade,
  onSearchCarNo,
  onSearchCarCond,
  onSetPricingCarInfoName,
  onTabChanged,
  onUpdateCarInfo
}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasHyundai = useSelector((state) => state.common.hasHyundai);
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
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);

  const closeMPop = useCallback(
    (e) => {
      e.preventDefault();
      setMPop(false);
    },
    [setMPop]
  );

  const handleReportPrint = useCallback(
    (e) => {
      openReportPopup(e, 'fade');
    },
    [openReportPopup]
  );
  const [carNumCont, setCarNumCont] = useState(false);
  const handleNumSearach = (e) => {
    e.preventDefault();
    if (hasHyundai) {
      setCarNumCont(true);
    } else {
      openMPop(e, 'fade')
    }
  };

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        options: ['back', 'gnb', 'transparent']
      }
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
              <h3>시세조회</h3>
              <p>현대 오토벨을 통해, 내차를 팔 때 중고 시세를 편리하게 조회할 수 있습니다.</p>
              <i className="top-banner-bg" />
            </div>
          </div>
          <div className="content-sec" style={{ height: `calc(100vh - ${calH}px)` }}>
            <div className="content-wrap">
              <Button size="full" background="white" color="black" radius={true} shadow={true} title="차량 조건 검색" iconType="car-search" iconReverse={true} height={64} href="marketSearch" />
              {carNumCont === false ? (
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
                  onClick={handleNumSearach}
                />
              ) : (
                <div className="carNumCont">
                  <Input type="text" placeHolder="차량번호를 입력하세요. 예) 01가 1234" width="85%" height={64} />
                  <Button title="" width={15} measure="%" height={64} href="/marketPrice/marketView?search=number" />
                </div>
              )}
            </div>
          </div>
        </div>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1">인증진행</p>
            <p>
              본인 차량만 시세조회가 가능하며
              <br />
              본인확인을 위한 인증절차가 필요합니다.
            </p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="취소" color="blue80" marginLeft={16} onClick={closeMPop} />
              <Button fontSize={14} title="인증진행" color="blue80" marginLeft={16} fontWeight={500} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="market-top-banner">
        <div className="content-wrap">
          <h3>시세조회</h3>
          <p>현대 오토벨을 통해, 내차를 팔 때 중고 시세를 편리하게 조회할 수 있습니다.</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="content-wrap market-wrap">
        <PricingSearchCar
          isIdentityVerify={userInfo.isIdentityVerify}
          pricingCarInfo={pricingCarInfo}
          type="marketPrice"
          onSearchCarNoClick={onSearchCarNo}
          onSearchCarCondClick={onSearchCarCond}
          onSetPricingCarInfoName={onSetPricingCarInfoName}
          onTabCanged={onTabChanged}
          onUpdateCarInfo={onUpdateCarInfo}
        />
        {/* 차량 조건 검색 시 */}
        {isMode === 'CarCondition' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasPricing={hasPricing} isPrint={false} withoutGrade={withoutGrade} />
            <PriceChart marketPrice={marketPrice} />
          </>
        )}
        {/* 차량 번호 조회 시*/}
        {isMode === 'CarNumber' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasPricing={hasPricing} isPrint={true} onReportPrint={handleReportPrint} />
            <PricingCarInfo dataContext={pricingCarInfo} hasPricing={hasPricing} type={'marketPrice'} withoutGrade={withoutGrade} onValueChange={onUpdateCarInfo} />
            <PriceChart marketPrice={marketPrice} />
            {pricingCarInfo && pricingCarInfo.seriesNo && (
              <Buttons align="center" marginTop={56}>
                <Button size="big" background="blue80" title="조회차량 판매하기" href={objToQueryParams('/sell/sellHome', pricingCarInfo)} width={202} />
              </Buttons>
            )}
          </>
        )}
      </div>

      <div className="content-sec">
        <div className="content-wrap market-banner">
          <div className="pic" />
          <div className="con">
            <p>
              <span>나에게 어울리는 내차 팔기 방법은?</span>
              믿을 수 있는 현대오토벨에서 편리하게 내 차를 팔 수 있게 도와드립니다.
              <br />
              나에게 맞는 방법을 확인해보세요.
            </p>
            <Button size="big" background="blue80" title="내차 파는 방법 보기" width={202} marginTop={56} href="/sellHome" />
          </div>
        </div>
      </div>

      <RodalPopup show={reportPopupShow} type={'fade'} closedHandler={closeReportPopup} mode="normal" size="large">
        <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} />
      </RodalPopup>
    </AppLayout>
  );
};

MarketPrice.propTypes = {
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isMode: PropTypes.string,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  userInfo: PropTypes.object,
  withoutGrade: PropTypes.bool,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onTabChanged: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

export default withPricing(MarketPrice);
