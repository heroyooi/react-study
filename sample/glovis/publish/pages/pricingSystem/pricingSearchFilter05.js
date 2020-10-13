import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFilterGearbox from '@src/components/common/MobFilterGearbox';
import { SECTION_PRICING_SYSTEM, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const PricingSearchFilter05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_PRICING_SYSTEM });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '변속기',
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
        <MobFilterGearbox mode="radio"/>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
  </AppLayout>
  )
}

export default PricingSearchFilter05;
