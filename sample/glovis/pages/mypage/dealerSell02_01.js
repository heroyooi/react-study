import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerSell02_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>차량등록</h3>
          </div>
          <div className="car-inquire-sec">
            <p>차량조회 후 신청하실 수 있습니다.</p>
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
      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>이미 판매등록 중인 차량입니다.<br />다른 차량을 조회해 주세요.</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>

        {/* <div className="con-wrap">
          <p>해당 차량번호로 조회된 차량 정보가 없습니다.<br />차량정보를 직접 등록하시겠습니까?</p>
          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div> */}
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerSell02_01