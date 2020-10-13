import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const DealerSell05_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량등록',
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
        <div className="car-inquire-sec">
          <p>차량조회 후 신청하실 수 있습니다.</p>
          <div className="car-inquire-wrap pdside20">
            <label htmlFor="car-num">차량번호</label>
            <Input type="text" id="car-num" placeHolder="차량번호를 입력해주세요. (예: 12가1234)" height={48} />
            <p className="tx-sub tx-red80">올바른 차량번호를 입력해주세요. (예: 12가 1234)</p>
          </div>
        </div>
        <Button className="fixed" size="full" background="gray60" title="차량 조회하기" href="/mypage/dealerSell05_02" />
        {/* 인풋 활성화 시 버튼 백그라운드 칼라 변경 */}
        {/* <Button className="fixed" size="full" background="blue80" title="차량 조회하기" /> */}
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>보증차량 판매정보 등록</h3>
          </div>
          <div className="car-inquire-sec">
            <p>차량조회 후 등록하실 수 있습니다.</p>
            <div className="car-inquire-wrap">
              <label htmlFor="car-num">차량번호</label>
              <Input type="text" id="car-num" placeHolder="차량번호를 입력해주세요. (예: 12가1234)" width={323} height={51} />
              <p>올바른 차량번호를 입력해주세요. (예: 12가 1234)</p>
              <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="차량 조회하기" width={244} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
              </Buttons>
            </div>
          </div>
        </div>
      </div>
      {/* <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>해당 차량번호로 조회된 차량정보가 없습니다.<br />차량정보를 직접 등록하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="직접등록" width={130} />
          </Buttons>
        </div>
      </RodalPopup> */}
    </AppLayout>
  )
}

export default DealerSell05_01