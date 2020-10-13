import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import DetailDiagnosis from '@src/components/common/popup/DetailDiagnosis';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceDetailDiagnosis = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '오토벨 상세진단서',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <DetailDiagnosis />
        <Button className="fixed" size="full" background="blue80" title="확인" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default ServiceDetailDiagnosis;