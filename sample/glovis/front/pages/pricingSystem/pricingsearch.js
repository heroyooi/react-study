import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import PricingMobSearchFilter from '@src/components/pricingSystem/pricingMobSearchFilter';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { validationCarCond } from '@src/components/pricingSystem/pricingUtil';
import { setPricingCarInfoClear } from '@src/actions/pricing/pricingSystemActions';
import withSearchCar from '@src/hoc/pricing/withSearchCar';
import withPricing from '@src/hoc/pricing/withPricing';

const PricingSearch = ({ hasMobile, pricingCarInfo, clrOptions, carCondOptions, dsplOptions, fuelOptions, mssOptions, noyOptions, isCarSelectionPopUp, onSelectOptions, onUpdateCarInfo }) => {
  const dispatch = useDispatch();

  const handleRetrieve = useCallback(
    (e) => {
      e.preventDefault();
      if (validationCarCond(pricingCarInfo) !== true) {
        return;
      }
      Router.push({ pathname: '/pricingSystem/pricingview', query: { carInfo: JSON.stringify(pricingCarInfo) } }, '/pricingSystem/pricingview');
    },
    [pricingCarInfo]
  );

  useEffect(() => {
    dispatch(setPricingCarInfoClear());
    dispatch({ type: SECTION_PRICING_SYSTEM });

    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량검색',
        options: ['back', 'voucher', 'gnb'],
        events: [
          null,
          () => {
            alert('이용 구매 페이지로 이동합니다.');
          },
          null
        ]
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
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <PricingMobSearchFilter
          casUseAccd={true}
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
        <Button className="fixed" size="full" background="blue80" title="조회" height={56} onClick={handleRetrieve} />
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

PricingSearch.propTypes = {
  hasMobile: PropTypes.bool,
  clrOptions: PropTypes.array,
  carCondOptions: PropTypes.array,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  isCarSelectionPopUp: PropTypes.bool,
  pricingCarInfo: PropTypes.object,
  onUpdateCarInfo: PropTypes.func,
  onSelectOptions: PropTypes.func
};

export default withPricing(withSearchCar(PricingSearch));
