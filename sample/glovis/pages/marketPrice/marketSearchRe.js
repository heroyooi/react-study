import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import RadioGroup from '@lib/share/items/RadioGroup';
import { SECTION_MARKET_PRICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const MarketSearchRe = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MARKET_PRICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '쏘나타',
        options: ['back']
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
        <div className="content-wrap filter-list-wrap">
          <div className="m-tree-wrap">
            <RadioGroup
              dataList={[
                { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '쏘나타 DN8 하이브리드(19년~현재)' },
                { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '쏘나타 DN8 하이브리드(19년~현재)' },
                { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '쏘나타 DN8 하이브리드(19년~현재)' },
                { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '쏘나타 DN8 하이브리드(19년~현재)' }
              ]}
            />
          </div>
        </div>

        <Button className="fixed" size="full" background="blue80" title="선택" />
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

export default MarketSearchRe;
