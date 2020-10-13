import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const SelfStep03_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '사진촬영 내역',
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
    return (
      <AppLayout>
        <div className="photo-list-wrap">
          <div className="content-sec">
            <ul className="float-wrap">
              <li>촬영하신 사진을 확인해보세요</li>
              <li><Button size="sml" line="gray" radius={true} title="재촬영" width={50} /></li>
            </ul>
          </div>
          <div className="content-wrap">
            <p>차량 전면(측)</p>
            <div className="img-wrap"></div>
            <p>차량 후면(측)</p>
            <div className="img-wrap"></div>
            <p>차량 좌측</p>
            <div className="img-wrap"></div>
            <p>차량 우측</p>
            <div className="img-wrap"></div>
            <p>계기판</p>
            <div className="img-wrap"></div>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
  </AppLayout>
  )
}

export default SelfStep03_01