import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell05_05 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '판매정보입력',
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
        <Steps mode="stick" type={1} contents={['차량정보 입력', 'EW 정보 입력', '등록완료']} active={3} />
        <div className="co-sec">
          <div className="co-wrap">
            <p className="tit">등록이 완료되었습니다.</p>
            <p className="exp">등록 내용은 마이페이지 > 보증차량 판매현황에서<br />확인이 가능합니다.</p>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" href="/mypage/dealerSell05" />
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>보증차량 판매정보 등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', 'EW정보입력', '등록완료']} active={3} />
          </div>
          <div className="co-wrap">
            <p className="tit">등록이 완료되었습니다.</p>
            <p className="exp">등록 내용은 마이페이지 > 보증차량 판매현황에서 확인이 가능합니다.</p>
            <Buttons align="center" marginTop={80}>
              <Button size="big" background="blue80" title="확인" width={200} height={60} />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default DealerSell05_05