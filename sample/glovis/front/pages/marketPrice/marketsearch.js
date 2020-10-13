import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ShareCarInfo from '@src/components/common/ShareCarInfo';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import PricingMobSearchFilter from '@src/components/pricingSystem/pricingMobSearchFilter';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { axiosGet } from '@src/utils/HttpUtils';
import { getSharedUrl, getSharedTitle, getPricingCarOptions, validationCarCond } from '@src/components/pricingSystem/pricingUtil';

import withSearchCar from '@src/hoc/pricing/withSearchCar';
import withPricing from '@src/hoc/pricing/withPricing';
import { objIsEmpty, stringToDateFotmat, preventScroll } from '@src/utils/CommonUtil';

const MarketSearch = ({
  hasMobile,
  marketPrice,
  pricingCarInfo,
  clrOptions,
  carCondOptions,
  dsplOptions,
  fuelOptions,
  mssOptions,
  noyOptions,
  isCarSelectionPopUp,
  router,
  onGetPricing,
  onSelectOptions,
  onSellCar,
  onSetPricingCarInfoPrice,
  onUpdateCarInfo
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MARKET_PRICE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const query = router ? router.query : {};
  const hasHyundai = router?.query.hyundai === 'Y';
  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);

  useEffect(() => {
    if (query.uid && query.reportId) {
      axiosGet(`https://price.glovisaa.com/api/pricing/getPricingMarketReport.do?uid=${query.uid}&reportId=${query.reportId}`).then((res) => {
        const defaultOptions = getPricingCarOptions();
        if (res.data.data && res.data.data.crNm && res.data.data.priceInfo.currentPrice.price) {
          const carInfo = {
            resStatus: {
              uid: res.data.data.uid
            },
            crNo: res.data.data.crNo,
            crNm: res.data.data.crNm,
            noy: parseInt(res.data.data.year),
            dspl: res.data.data.exha,
            clr: res.data.data.clr,
            mss: res.data.data.mss,
            frstRegDt: res.data.data.firstRegDt ? stringToDateFotmat(res.data.data.firstRegDt, '') : '',
            fuel: res.data.data.fuel,
            drvDist: res.data.data.drvDist,
            rlsPrc: res.data.data.price,
            defaultImg: res.data.data.defaultImg,
            usegubun: res.data.data.useGubun || '일반',
            carOptions: []
          };
          if (res.data.data.options) {
            const dataOptions = res.data.data.options.split(',');
            carInfo.carOptions = [...defaultOptions].map((item) => {
              return Object.assign({ ...item }, { yn: dataOptions.includes(item.value) === true ? 'Y' : 'N' });
            });
          }

          const unit = 10000;
          const monthly = [
            Math.floor(parseInt(res.data.data.priceInfo.currentPrice.price) / unit),
            Math.floor(parseInt(res.data.data.priceInfo.monthlyPrice.predprice3mon) / unit),
            Math.floor(parseInt(res.data.data.priceInfo.monthlyPrice.predprice6mon) / unit),
            Math.floor(parseInt(res.data.data.priceInfo.monthlyPrice.predprice9mon) / unit),
            Math.floor(parseInt(res.data.data.priceInfo.monthlyPrice.predprice12mon) / unit)
          ];

          const currentPrice = {
            minPrice: 0,
            maxPrice: Math.floor(parseInt(res.data.data.priceInfo.currentPrice.marketMaxPrice) / unit),
            marketMinPrice: Math.floor(parseInt(res.data.data.priceInfo.currentPrice.marketMinPrice) / unit),
            marketMaxPrice: Math.floor(parseInt(res.data.data.priceInfo.currentPrice.marketMaxPrice) / unit),
            price: Math.floor(parseInt(res.data.data.priceInfo.currentPrice.price) / unit)
          };

          const marketPrice = {
            reportId: query.reportId,
            monthlyPrice: monthly,
            currentPrice: currentPrice
          };

          onSetPricingCarInfoPrice(carInfo, marketPrice);
          setDimm1(true);
          setActive1(true);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenReport = useCallback(
    (e) => {
      e.preventDefault();
      if (validationCarCond(pricingCarInfo) !== true) {
        return;
      }
      onGetPricing(e, pricingCarInfo);
      setActive1(true);
      setDimm1(true);
      preventScroll(true);
    },
    [onGetPricing, pricingCarInfo]
  );

  const handleOpenShare = useCallback((e) => {
    e.preventDefault();
    setActive2(true);
    setDimm2(true);
    preventScroll(true);
  }, []);

  const handleCloseDimm1 = useCallback(() => {
    if (query.uid && query.reportId) {
      return;
    }
    setActive1(false);
    setDimm1(false);
    preventScroll(false);
  }, [query.reportId, query.uid]);

  const handleCloseDimm2 = useCallback(() => {
    setActive2(false);
    setDimm2(false);
    preventScroll(false);
  }, []);

  const handleSellClick = useCallback(
    (e) => {
      e.preventDefault();
      if (hasHyundai) {
        setDimm1(false);
        setActive1(false);
        preventScroll(false);
      } else {
        onSellCar(e);
      }
    },
    [hasHyundai, onSellCar]
  );

  useEffect(() => {
    if (hasMobile === true) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '차량검색',
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
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <PricingMobSearchFilter
          casUseAccd={false}
          clrOptions={clrOptions}
          carCondOptions={carCondOptions}
          dsplOptions={dsplOptions}
          fuelOptions={fuelOptions}
          mssOptions={mssOptions}
          noyOptions={noyOptions}
          isCarSelectionPopUp={isCarSelectionPopUp}
          onSelectOptions={onSelectOptions}
          onUpdateCarInfo={onUpdateCarInfo}
        />
        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1}>
          <PricingReport
            dataContext={pricingCarInfo}
            marketPrice={marketPrice}
            hasMobile={true}
            hasHyundai={hasHyundai}
            hasShare={!objIsEmpty(query.uid) && !objIsEmpty(query.reportId)}
            hasNoEdit={query.uid && query.reportId ? true : false}
            onOpenShare={handleOpenShare}
            onSellClick={handleSellClick}
          />
        </MobBottomArea>
        <div className={dimm2 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm2} />
        <MobBottomArea active={active2}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            {active2 && pricingCarInfo && pricingCarInfo.resStatus && pricingCarInfo.resStatus.uid && marketPrice && marketPrice.reportId ? (
              <ShareCarInfo url={getSharedUrl(marketPrice.reportId, pricingCarInfo.resStatus.uid)} title={getSharedTitle()} />
            ) : null}
          </div>
        </MobBottomArea>
        <Button className="fixed" size="full" background="blue80" title="조회" height={56} onClick={handleOpenReport} />
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

MarketSearch.propTypes = {
  hasMobile: PropTypes.bool,
  clrOptions: PropTypes.array,
  carCondOptions: PropTypes.array,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  isCarSelectionPopUp: PropTypes.bool,
  marketPrice: PropTypes.object,
  pricingCarInfo: PropTypes.object,
  router: PropTypes.object,
  onGetPricing: PropTypes.func,
  onUpdateCarInfo: PropTypes.func,
  onSelectOptions: PropTypes.func,
  onSellCar: PropTypes.func,
  onSetPricingCarInfoPrice: PropTypes.func
};

export default withPricing(withSearchCar(MarketSearch));
