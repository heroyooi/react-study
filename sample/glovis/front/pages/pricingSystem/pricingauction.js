import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import PricingAuctionInfo from '@src/components/pricingSystem/pricingAuctionInfo';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { objIsEmpty } from '@src/utils/CommonUtil';
import withPricing from '@src/hoc/pricing/withPricing';

const PricingAuction = memo(({ router }) => {
  const dispatch = useDispatch();
  const [auctionInfo, setAuctionInfo] = useState(null);

  const handleBack = useCallback((e) => {
    e.preventDefault();
    Router.back();
  }, []);

  useEffect(() => {
    if (objIsEmpty(router.query.auctionInfo)) {
      Router.push('/pricingSystem/pricing');
      return;
    }

    setAuctionInfo(JSON.parse(router.query.auctionInfo));

    dispatch({ type: SECTION_PRICING_SYSTEM });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매정보 상세',
        options: ['close'],
        events: [handleBack]
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 76,
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

  return (
    <AppLayout>
      {objIsEmpty(auctionInfo) ? null : <PricingAuctionInfo dataContext={auctionInfo} isMobile={true} />}
      <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleBack} />
    </AppLayout>
  );
});

PricingAuction.propTypes = {
  router: PropTypes.object
};
PricingAuction.displayName = 'PricingAuction';
export default withRouter(withPricing(PricingAuction));
