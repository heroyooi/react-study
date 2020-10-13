import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Steps from '@lib/share/items/Steps';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const DealerSell06Shot04 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: 'Live Shot 촬영 예약',
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
    dispatch({
      type: MOBILE_QUICK_EXIST,
      data: {
        exist: false
      }
    });
    dispatch({
      type: MOBILE_FOOTER_EXIST,
      data: {
        exist: false
      }
    });
  }, []);

  return (
    <AppLayout>
      <div className="live-reserve-sec">
        <Steps type={1} contents={['차량정보 입력', '예약정보 입력', '결제하기', '예약완료']} active={4} mode="stick" />
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

export default DealerSell06Shot04;