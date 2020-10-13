import { useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL } from '@src/actions/types';

const SelfCertify = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  
  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>셀프 등록 판매</h3>
        <p>모바일로 직접 차량을 평가하여 24시간 실시간 경쟁 입찰을 통해 최고가로 판매하는 서비스입니다.</p>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap pb48 sell-step-wrap">
          <p className="ment"><i className="ico-notify-white"></i>본인 차량 정보를 가져오기 위해 본인 인증절차가 필요합니다.</p>
        </div>
      </div>
      <div className="content-wrap co-wrap">
        <p className="tit">본인 인증을 해주세요.</p>
        <p className="exp">
          본인 차량만 셀프 등록 판매가 가능하며,<br />본인확인을 위한 인증절차가 필요합니다.
        </p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="인증 진행" width={172} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
        </Buttons>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>이미 신청중인 차량 정보가 있습니다.<br/>이어서 신청하시겠습니까?</p>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default SelfCertify