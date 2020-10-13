/* eslint-disable no-alert */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingCarTitle from '@src/components/pricingSystem/pricingCarTitle';
import PricingAuctionInfo from '@src/components/pricingSystem/pricingAuctionInfo';
import PricingTitleNavi from '@src/components/pricingSystem/pricingTitleNavi';
import PricingUserInfo from '@src/components/pricingSystem/pricingUserInfo';
import PricingCarInfo from '@src/components/pricingSystem/pricingCarInfo';
import PricingBidSucessList from '@src/components/pricingSystem/pricingBidSucessList';
import PricingCoverAllim from '@src/components/pricingSystem/pricingCoverAllim';
import PricingLayerPopUp from '@src/components/pricingSystem/pricingLayerPopUp';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import AppLayout from '@src/components/layouts/AppLayout';
import CarNameMod from '@src/components/common/CarNameMod';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, SECTION_PRICING_SYSTEM } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';

const Pricing01 = ({
  auctionDetailInfo,
  bidList,
  hasMobile,
  hasPricing,
  isMode,
  marketPrice,
  pricingCarInfo,
  pricingTicketInfo,
  searchMode,
  userInfo,
  viewableCnt,
  withoutGrade,
  onGetAuctionDetailInfo,
  onGetPricing,
  onSearchCarNo,
  onSearchCarCond,
  onSetPricingCarInfoName,
  onTabChanged,
  onUpdateCarInfo,
  onUpdateSearchMode
}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });

  const [auctionDetailPopupShow, setAuctionDetailPopupShow, auctionOpenDetailPopup, auctionCloseDetailPopup] = useRodal(false, true); // 경매정보 상세
  const [namePopupShow, setNamePopupShow, openNamePopup, closeNamePopup] = useRodal(false, true);

  // 모바일 설정
  const [calH, setCalH] = useState(408);
  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const targetEl = useRef(null);

  useEffect(() => {
    if (targetEl && targetEl.current) {
      setCalH(targetEl.current.clientHeight);
    }
  }, [dispatch, userInfo]);

  const handleAuctionClick = useCallback(
    (e, des) => {
      onGetAuctionDetailInfo(pricingCarInfo, des);
      auctionOpenDetailPopup(e);
    },
    [onGetAuctionDetailInfo, pricingCarInfo, auctionOpenDetailPopup]
  );

  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    setActive(true);
    setDimm(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);

  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, []);

  if (hasMobile) {
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

    return (
      <AppLayout>
        <div className="market-main-area">
          <div className="market-top-banner" ref={targetEl}>
            <div className="content-wrap">
              <h3>프라이싱시스템</h3>
              <p>
                현대 오토옥션으로 실제 판매되었던 차량의 판매가격으로
                <br />
                정확한 시세정보를 제공해드립니다..
              </p>
              <i className="top-banner-bg" />
            </div>
          </div>
          <div className="content-sec" style={{ height: `calc(100vh - ${calH}px)` }}>
            <div className="content-wrap">
              <Button size="full" background="white" color="black" radius={true} shadow={true} title="차량 조건 검색" iconType="car-search" iconReverse={true} height={64} href="pricingSearch" />
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
                onClick={handleOpenPop}
              />
            </div>
          </div>
        </div>

        <div className={dimm ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm} />
        <MobBottomArea active={active} isFixButton={true}>
          <PricingCoverAllim userName={userInfo.userName} onClose={onUpdateSearchMode} />
        </MobBottomArea>

        <PricingLayerPopUp />
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <PricingTitleNavi />
      <div className="content-wrap pricing-wrap">
        <PricingUserInfo userName={userInfo.userName} viewableCnt={viewableCnt} pricingTicketInfo={pricingTicketInfo} />
        <div className="pricing-sec">
          {searchMode === true ? (
            <>
              <PricingSearchCar
                isIdentityVerify={userInfo.isIdentityVerify}
                type="pricingSystem"
                pricingCarInfo={pricingCarInfo}
                onOpenCarNamePopUp={openNamePopup}
                onSearchCarNoClick={onSearchCarNo}
                onSearchCarCondClick={onSearchCarCond}
                onSetPricingCarInfoName={onSetPricingCarInfoName}
                onTabCanged={onTabChanged}
                onUpdateCarInfo={onUpdateCarInfo}
              />
              <p className="tx-exp-tp5">&#8251; 시세를 조회하시면 차량을 구매할 때의 시세와 예측 가능한 미래시세, 동급 차량의 실제 경매 낙찰 시세를 확인하실 수 있습니다.</p>
            </>
          ) : (
            <PricingCoverAllim userName={userInfo.userName} onClose={onUpdateSearchMode} />
          )}

          {isMode === 'CarNumber' &&
          !isEmpty(pricingCarInfo) && ( // 차량 번호로 조회
              <>
                <div className="best-register-car">
                  <PricingCarTitle carInfo={pricingCarInfo} hasPricing={hasPricing} withoutGrade={withoutGrade} />
                  <PricingCarInfo
                    withoutGrade={withoutGrade}
                    hasPricing={hasPricing}
                    dataContext={pricingCarInfo}
                    onCarInfoUpdate={onUpdateCarInfo}
                    onGetPricingCarInfo={onSearchCarNo}
                    onGetPricing={onGetPricing}
                  />
                </div>
                {withoutGrade === true && !isEmpty(marketPrice) && (
                  <div className="best-register-graph">
                    <h4>조회하신 차량의 시세 결과입니다.</h4>
                    <PriceChart marketPrice={marketPrice} />
                  </div>
                )}
              </>
            )}
          {isMode === 'CarCondition' &&
          !isEmpty(pricingCarInfo) && ( // 차량 조건으로 조회
              // <div className="best-register-car">
              //   <PricingCarTitle carInfo={pricingCarInfo} hasPricing={hasPricing} withoutGrade={withoutGrade} />
              // </div>
              <PriceChart marketPrice={marketPrice} />
            )}
          <PricingBidSucessList bidList={bidList} isMode={isMode} onAuctionClick={handleAuctionClick} />
        </div>
      </div>

      <PricingLayerPopUp />

      <RodalPopup show={namePopupShow} type={'fade'} closedHandler={closeNamePopup} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup>

      <RodalPopup show={auctionDetailPopupShow} type={'fade'} closedHandler={auctionCloseDetailPopup} title="경매정보 상세" mode="normal" width={894}>
        <PricingAuctionInfo dataContext={auctionDetailInfo} />
      </RodalPopup>
    </AppLayout>
  );
};

Pricing01.propTypes = {
  auctionDetailInfo: PropTypes.object,
  bidList: PropTypes.array,
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isMode: PropTypes.string,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  pricingTicketInfo: PropTypes.object,
  searchMode: PropTypes.bool,
  userInfo: PropTypes.object,
  viewableCnt: PropTypes.number,
  withoutGrade: PropTypes.bool,
  onGetPricing: PropTypes.func,
  onGetAuctionDetailInfo: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onTabChanged: PropTypes.func,
  onUpdateCarInfo: PropTypes.func,
  onUpdateSearchMode: PropTypes.func
};

export default withPricing(Pricing01);
