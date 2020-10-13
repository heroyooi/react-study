import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import PricingAccidentAndPerformance from '@src/components/pricingSystem/pricingAccidentAndPerformance';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { axiosPost } from '@src/utils/HttpUtils';

const PricingPerformance = memo(({ router }) => {
  const dispatch = useDispatch();
  const [carInfo, setCarInfo] = useState(null);

  //57구9618
  useEffect(() => {
    dispatch({ type: SECTION_PRICING_SYSTEM });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: router.query.perf === 'Y' ? '성능점검기록부' : '사고이력조회',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });

    if (router.query.perf === 'Y') {
      axiosPost('/api/pricing/getPerformanceInspNo.do', { crNo: router.query.crNo, crId: router.query.crId, goodNo: router.query.goodNo }, null).then((res) => {
        setCarInfo(res.data.data);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <PricingAccidentAndPerformance isPerf={router.query.perf === 'Y'} crNo={router.query.crNo} crId={router.query.crId} carInfo={carInfo} goodNo={router.query.goodNo} />
    </AppLayout>
  );
});

PricingPerformance.propTypes = {
  router: PropTypes.object
};

PricingPerformance.displayName = 'PricingPerformance';

export default withRouter(PricingPerformance);
