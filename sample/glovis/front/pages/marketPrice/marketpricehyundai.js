import React, { useCallback, useEffect } from 'react';
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
import { MOBILE_HEADER_TYPE_NONE, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import withPricing from '@src/hoc/pricing/withPricing';

const MarketPriceHyundai = ({
  hasCarInfo,
  hasMobile,
  isLoading,
  isMobileCarNumInput,
  isMode,
  isReportPopUp,
  marketPrice,
  pricingCarInfo,
  targetEl,
  withoutGrade,
  onGetPricingCarInfo,
  onSearchCarNo,
  onSearchCarCond,
  onSearchResult,
  onSetPricingCarInfoName,
  onSetPricingReset,
  onTabChanged,
  onTsCancel,
  onToggleMobileCarNoInput,
  onToggleReportPopUp,
  onUpdateCarInfo
}) => {
  const dispatch = useDispatch();
  // 팝업
  const [reportPopupShow, setReportPopupShow] = useRodal(false, true);

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

  useEffect(() => {
    setReportPopupShow(isReportPopUp);
  }, [isReportPopUp, setReportPopupShow]);

  useEffect(() => {
    onSetPricingReset();

    if (hasMobile === true) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="market-main-area">
          <div className="market-top-banner" ref={targetEl}>
            <div className="content-wrap">
              <h3 style={{ paddingTop: '0px' }}>시세조회</h3>
              <p>현대글로비스 오토벨을 통해, 내 차를 팔 때 시세를 편리하게 조회할 수 있습니다.</p>
              <i className="top-banner-bg" />
            </div>
          </div>
          <div className="content-sec">
            <div className="content-wrap">
              {isMobileCarNumInput === false && (
                <Button
                  size="full"
                  background="white"
                  color="black"
                  radius={true}
                  shadow={true}
                  title="차량정보 입력 조회"
                  iconType="car-search"
                  iconReverse={true}
                  height={64}
                  onClick={onSearchCarCond}
                />
              )}
              {isMobileCarNumInput === false ? (
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
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <FrameLayout>
      <div className="content-wrap market-wrap" style={{ paddingTop: '0px' }}>
        <PricingSearchCar
          type="marketPrice"
          dataContext={pricingCarInfo}
          onSearchCarNoClick={onSearchCarNo}
          onSearchCarCondClick={handleSearchCarCond}
          onSetPricingCarInfoName={onSetPricingCarInfoName}
          onTabCanged={onTabChanged}
          onUpdateCarInfo={onUpdateCarInfo}
          onTsCancel={onTsCancel}
        />

        {isMode === 'CarCondition' && <PricingCarTitle withoutGrade={withoutGrade} />}
        {isMode === 'CarNumber' && (
          <>
            <PricingCarTitle carInfo={pricingCarInfo} hasCarInfo={hasCarInfo} isPrint={false} onReportPrint={onToggleReportPopUp} />
            <PricingCarInfo
              dataContext={pricingCarInfo}
              isLoading={isLoading}
              hasCarInfo={hasCarInfo}
              type={'marketPrice'}
              withoutGrade={withoutGrade}
              onGetPricingCarInfo={onGetPricingCarInfo}
              onValueChange={onUpdateCarInfo}
            />
            {pricingCarInfo && pricingCarInfo.seriesNo && (
              <Buttons align="center" marginTop={56}>
                <Button size="big" background="blue80" title="결과보기" width={202} onClick={onSearchResult} />
              </Buttons>
            )}
          </>
        )}
      </div>

      <RodalPopup show={reportPopupShow} type={'fade'} closedHandler={onToggleReportPopUp} mode="normal" size="large">
        <PricingReport dataContext={pricingCarInfo} marketPrice={marketPrice} isSellReceipt={false} />
      </RodalPopup>
    </FrameLayout>
  );
};

MarketPriceHyundai.propTypes = {
  hasCarInfo: PropTypes.bool,
  hasMobile: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMobileCarNumInput: PropTypes.bool,
  isMode: PropTypes.string,
  isReportPopUp: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  targetEl: PropTypes.object,
  withoutGrade: PropTypes.bool,
  onGetPricingCarInfo: PropTypes.func,
  onSearchCarNo: PropTypes.func,
  onSearchCarCond: PropTypes.func,
  onSearchResult: PropTypes.func,
  onSetPricingCarInfoName: PropTypes.func,
  onSetPricingReset: PropTypes.func,
  onTabChanged: PropTypes.func,
  onTsCancel: PropTypes.func,
  onToggleMobileCarNoInput: PropTypes.func,
  onToggleReportPopUp: PropTypes.func,
  onUpdateCarInfo: PropTypes.func
};

export default withPricing(MarketPriceHyundai);
