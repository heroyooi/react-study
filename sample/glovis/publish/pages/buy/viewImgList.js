import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ViewImgList = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '사진보기',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap buy-wrap">
          <ul className="img-list">
            <li><img src="/images/dummy/list-auction-img-1.png" alt=""/></li>
            <li><img src="/images/dummy/list-auction-img-2.png" alt=""/></li>
            <li><img src="/images/dummy/list-auction-img-3.png" alt=""/></li>
          </ul>
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

export default ViewImgList;