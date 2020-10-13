import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import Button from '@lib/share/items/Button';
import AppLayout from '@src/components/layouts/AppLayout';
import PricingCarGradeSpec from '@src/components/pricingSystem/pricingCarGradeSpec';
import { getPringCarGradeSpecifation } from '@src/components/pricingSystem/pricingUtil';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingSpecify = memo(({ router }) => {
  const dispatch = useDispatch();
  const [pricingCarGradeSpecData, setPricingCarGradeSpecData] = useState({});

  useEffect( () => {
    dispatch({ type: SECTION_PRICING_SYSTEM });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '상세사양',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });

    const query = router ? router.query : {};

    if (query.modelNo && query.seriesNo && query.seriesNm && query.seriesPrice) {
      getPringCarGradeSpecifation(query.modelNo, query.seriesNo).then((list) => {
        const payload = {
          seriesNm: query.seriesNm,
          seriesPrice: query.seriesPrice,
          list: list | []
        };
        setPricingCarGradeSpecData(payload);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <PricingCarGradeSpec mode={'self'} pricingCarGradeSpec={pricingCarGradeSpecData} />
      <Button className="fixed" size="full" background="blue80" title="확인" height={56} />
    </AppLayout>
  );
});

PricingSpecify.propTypes = {
  router: PropTypes.object
};
PricingSpecify.displayName = 'PricingSpecify';
export default withRouter(PricingSpecify);
