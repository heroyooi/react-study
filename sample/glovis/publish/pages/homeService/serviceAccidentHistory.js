import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceAccidentHistory = ( ) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '중고차 사고이력 정보 보고서',
        options: ['close']
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
        <div className="used-car-summary">
          <h2>투싼(TUCSAN) 66부00**</h2>
          <p className="info">정보조회일자: 2019-09-27</p>
        </div>
        <div className="content-wrap">
          <CarAccidentHistory />
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

export default ServiceAccidentHistory;