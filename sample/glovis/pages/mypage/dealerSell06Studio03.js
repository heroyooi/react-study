import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell06Studio03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Studio 촬영 예약',
        options: ['back']
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
        <div className="live-reserve-sec">
          <Steps type={1} contents={['지점/예약시간 선택', '결제하기', '예약완료']} active={3} mode="stick" />
          <div className="co-sec">
            <div className="co-wrap">
              <p className="tit">예약이 완료되었습니다.</p>
              <p className="exp">예약 현황은 마이페이지 Live Service 촬영예약에서<br />확인 가능합니다.</p>
            </div>
          </div>
        </div>
        <Buttons align="center" className="full fixed">
          <Button size="full" background="blue20" color="blue80" title="예약조회" height={56} href="/mypage/dealerSell06" />
          <Button size="full" background="blue80" title="확인" height={56} href="/mypage/dealerSell06Info" />
        </Buttons>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default DealerSell06Studio03;
