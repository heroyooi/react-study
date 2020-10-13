import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CheckColors from '../../src/components/common/CheckColors';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingSearchFilter03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '색상',
        options: ['back', 'reset']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 56,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="filter-list-wrap">
          <div className="content-wrap">
            <CheckColors mode="radio" />
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
  </AppLayout>
  )
}

export default PricingSearchFilter03;
