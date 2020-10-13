import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import PricingSearchCar from '@src/components/pricingSystem/pricingSearchCar';
import PricingCarTitle from '@src/components/pricingSystem/pricingCarTitle';
import PricingCarInfo from '@src/components/pricingSystem/pricingCarInfo';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import PriceChart from '@src/components/pricingSystem/chart/priceChart';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';

const MarketPrice = ({
  hasCarInfo,
  hasMobile,
  hasPricing,
  isLoading,
  isMobileCarNumInput,
  isMode,
  isReportPopUp,
  marketPrice,
  pricingCarInfo,
  router,
  targetEl,
  withoutGrade,
  onGetPricingCarInfo,
  onSearchCarNo,
  onSearchCarCond,
  onSearchResult,
  onSellCar,
  onSetPricingCarInfoName,
  onSetPricingReset,
  onTabChanged,
  onTsCancel,
  onToggleMobileCarNoInput,
  onToggleReportPopUp,
  onUpdateCarInfo
}) => {
  const dispatch = useDispatch();

  const [reportPopupShow, setReportPopupShow] = useRodal(false, true);

  useEffect(() => {
    setReportPopupShow(isReportPopUp);
  }, [isReportPopUp, setReportPopupShow]);

  useEffect(() => {
    dispatch({ type: SECTION_MARKET_PRICE });
    onSetPricingReset();
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
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: true
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });

      if (router.query && router.query.crNo) {
        onToggleMobileCarNoInput();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="market-main-area">
          <div className="market-top-banner" ref={targetEl}>
            <div className="content-wrap">
              <h3>시세조회</h3>
              <p>도/소매 실거래 빅데이터 분석을 통한 정확한 중고차 시세를 조회하세요!</p>
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
                  title={'차량 번호로 조회'}
                  iconType="input-search"
                  iconReverse={true}
                  height={64}
                  onClick={onToggleMobileCarNoInput}
                />
              ) : (
                <PricingSearchCar
                  hasNoInit={true}
                  hasMobile={true}
                  type="marketPrice"
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
                  onClick={onSearchCarCond}
                />
              )}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="market-top-banner">
        <div className="content-wrap">
          <h3>시세조회</h3>
          <p>도/소매 실거래 빅데이터 분석을 통한 정확한 중고차 시세를 조회하세요!</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="content-wrap market-wrap">
        <PricingSearchCar
          type="marketPrice"
          dataContext={pricingCarInfo}
          onSearchCarNoClick={onSearchCarNo}
          onSearchCarCondClick={onSearchCarCond}
          onSetPricingCarInfoName={onSetPricingCarInfoName}
          onTabCanged={onTabChanged}
          onUpdateCarInfo={onUpdateCarInfo}
          onTsCancel={onTsCancel}
        />
        {isMode === 'CarCondition' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasCarInfo={hasCarInfo} isPrint={false} withoutGrade={withoutGrade} />
            <PriceChart marketPrice={marketPrice} width={'331px'} height={'352px'} />
            <Buttons align="center" marginTop={56}>
              {hasPricing === true && <Button size="big" background="blue80" title="시세 리포트 출력" width={202} onClick={onToggleReportPopUp} />}
            </Buttons>
          </>
        )}
        {isMode === 'CarNumber' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasCarInfo={hasCarInfo} hasPricing={hasPricing} isPrint={false} onReportPrint={onToggleReportPopUp} />
            <PricingCarInfo
              dataContext={pricingCarInfo}
              hasCarInfo={hasCarInfo}
              isLoading={isLoading}
              type={'marketPrice'}
              withoutGrade={withoutGrade}
              onGetPricingCarInfo={onGetPricingCarInfo}
              onValueChange={onUpdateCarInfo}
            />
            <PriceChart marketPrice={marketPrice} width={'331px'} height={'352px'} />
            <Buttons align="center" marginTop={56}>
              {isLoading === false && pricingCarInfo && pricingCarInfo.seriesNo && (
                <Button size="big" background="blue80" title={hasPricing === false ? '결과보기' : '재조회'} width={202} onClick={onSearchResult} />
              )}
              {isLoading === false && pricingCarInfo && pricingCarInfo.seriesNo && hasPricing === true && (
                <Button size="big" background="blue80" title="시세 리포트 출력" width={202} onClick={onToggleReportPopUp} />
              )}
              {isLoading === false && hasPricing === true && pricingCarInfo && pricingCarInfo.seriesNo && (
                <Button size="big" background="blue80" title="조회차량 판매하기" onClick={onSellCar} width={202} />
              )}
            </Buttons>
          </>
        )}
      </div>
      <div className="content-sec">
        <div className="content-wrap market-banner">
          <div className="pic" />
          <div className="con">
            <p>
              <span>나에게 어울리는 내차 팔기 방법은?</span>
              믿을 수 있는 현대 글로비스 오토벨에서 편리하게 내 차를 팔 수 있게 도와드립니다.
              <br />
              나에게 맞는 방법을 확인해보세요.
            </p>
            <Button size="big" background="blue80" title="내 차 파는 방법 보기" width={202} marginTop={56} href="/sellcar/sellCar" />
          </div>
        </div>
      </div>
      {isLoading === true ? (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={40} color={'#fff'} loading={true} />
        </div>
      ) : null}
      <RodalPopup show={reportPopupShow} type={'fade'} closedHandler={onToggleReportPopUp} mode="normal" size="large">
        <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} isSellReceipt={true} onSellClick={onSellCar} />
      </RodalPopup>
    </AppLayout>
  );
};

MarketPrice.propTypes = {
  hasCarInfo: PropTypes.bool,
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobileCarNumInput: PropTypes.bool,
  isMode: PropTypes.string,
  isReportPopUp: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  router: PropTypes.object,
  targetEl: PropTypes.object,
  withoutGrade: PropTypes.bool,
  onGetPricingCarInfo: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSearchResult: PropTypes.func,
  onSellCar: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onSetPricingReset: PropTypes.func,
  onTabChanged: PropTypes.func,
  onTsCancel: PropTypes.func,
  onToggleMobileCarNoInput: PropTypes.func,
  onToggleReportPopUp: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

export default withPricing(MarketPrice);
