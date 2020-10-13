import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobCalendar from '@lib/share/items/MobCalendar';
import { MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const CalendarUi = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '달력',
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

        <MobCalendar />

        <hr />

        {/* 선택하는 날짜가 팝업 내부 날짜에 반영이 되지 않길 원하는 경우 */}
        <MobCalendar changeDate={false} />
        <hr />

        {/* 날짜를 가지고 있는 경우 */}
        <MobCalendar date="2019-10-18" />

      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}
  
export default CalendarUi;