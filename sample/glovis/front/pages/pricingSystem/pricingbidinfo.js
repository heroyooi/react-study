import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import PricingBidSucessList from '@src/components/pricingSystem/pricingBidSucessList';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { objIsEmpty } from '@src/utils/CommonUtil';
import withPricing from '@src/hoc/pricing/withPricing';

const PricingBidInfo = memo(({ router }) => {
  const dispatch = useDispatch();
  const [bidList, setBidList] = useState(null);

  useEffect(() => {
    if (objIsEmpty(router.query.bidList)) {
      Router.push('/pricingSystem/pricing');
      return;
    }

    setBidList(JSON.parse(router.query.bidList));

    dispatch({ type: SECTION_PRICING_SYSTEM });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '동급차량 낙찰정보',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 20,
        color: '#fff'
      }
    });
    dispatch({
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <PricingBidSucessList bidList={bidList} isMobile={true} isMode={''} />
    </AppLayout>
  );
});

PricingBidInfo.propTypes = {
  router: PropTypes.object
};

PricingBidInfo.displayName = 'PricingBidInfo';
export default withRouter(withPricing(PricingBidInfo));
