import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import MobSearchFilter from '@src/components/common/MobSearchFilter';
import PricingReport from '@src/components/pricingSystem/pricingReport';
import BtnShare from '@src/components/common/BtnShare';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

import withSearchCar from '@src/hoc/pricing/withSearchCar';

const MarketSearch = ({
  hasMobile,
  clrOptions,
  carCondOptions,
  dsplOptions,
  fuelOptions,
  mssOptions,
  noyOptions,
  isCarSelectionPopUp,
  isIdentityVerify,
  type,
  onSetPricingCarInfoName,
  onSearchCarNoClick,
  onSearchCarCondClick,
  onTabCanged,
  onSetToggleCarSelectionPopUp
}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasHyundai = useSelector((state) => state.common.hasHyundai);

  const [dimm1, setDimm1] = useState(false);
  const [dimm2, setDimm2] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const handleOpenReport = useCallback((e) => {
    e.preventDefault();
    setActive1(true);
    setDimm1(true);
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handleOpenShare = useCallback((e) => {
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

  if (hasMobile) {
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

    console.log(carCondOptions);
    return (
      <AppLayout>
        <MobSearchFilter
          clrOptions={clrOptions}
          carCondOptions={carCondOptions}
          dsplOptions={dsplOptions}
          fuelOptions={fuelOptions}
          mssOptions={mssOptions}
          noyOptions={noyOptions}
          isCarSelectionPopUp={isCarSelectionPopUp}
          isIdentityVerify={isIdentityVerify}
          router="/marketPrice/marketSearchFilter01"
        />

        <div className={dimm1 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm1} />
        <MobBottomArea active={active1}>
          <PricingReport handleOpenShare={handleOpenShare} />
        </MobBottomArea>
        <div className={dimm2 ? 'modal-bg active' : 'modal-bg'} onClick={handleCloseDimm2} />
        <MobBottomArea active={active2}>
          <div className="inner">
            <h3 className="tit1 mb24">공유하기</h3>
            <BtnShare />
          </div>
        </MobBottomArea>
        {hasHyundai ? (
          <Button className="fixed" size="full" background="blue80" title="조회" height={56} onClick={handleOpenReport} nextLink={true} />
        ) : (
          <Button className="fixed" size="full" background="blue80" title="조회" height={56} href="/marketPrice/marketView?search=condition" nextLink={true} />
        )}
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
  isIdentityVerify: PropTypes.bool,
  type: PropTypes.string,
  onSetPricingCarInfoName: PropTypes.func,
  onSearchCarNoClick: PropTypes.func,
  onSearchCarCondClick: PropTypes.func,
  onTabCanged: PropTypes.func,
  onSetToggleCarSelectionPopUp: PropTypes.func
};

export default withSearchCar(MarketSearch);
