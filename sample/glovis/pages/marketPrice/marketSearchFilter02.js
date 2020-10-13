import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarOptions from '@src/components/common/CarOptions';
import Button from '@lib/share/items/Button';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MarketSearchFilter02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '옵션',
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
          <div className="content-wrap pt20">
            <CarOptions title="기본옵션" type={1} mode="check" />
            <Button className="fixed" size="full" background="blue80" title="선택" />
          </div>
        </div>
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

export default MarketSearchFilter02;
