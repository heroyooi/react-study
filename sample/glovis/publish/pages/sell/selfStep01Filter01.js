import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobFilterModel from '@src/components/common/MobFilterModel';
import Button from '@lib/share/items/Button'
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const SelfStep01Filter01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '제조사',
        options: ['back', 'close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <MobFilterModel />
        {/* <Button className="fixed" size="full" background="blue80" title="선택" /> */}
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
  </AppLayout>
  )
}

export default SelfStep01Filter01;
