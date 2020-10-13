import { useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import AppLayout from '@src/components/layouts/AppLayout';
import { SECTION_SELL } from '@src/actions/types';

const FreeCertify = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
        <p>무평가, 비대면 서비스를 통해 내 차를 빠르게 판매할 수 있는 서비스입니다.</p>
        <div className="desc-tooltip">
          <Tooltip placement="top" width={370}>
            <TooltipItem>
              <p><i className="ico-notify"></i> 무평가 판매 가능 차량이란?</p>
            </TooltipItem>
            <TooltipCont>
              <p className="free-certify-ment">차량 출시 기준 33개월 이하, 주행거리 3만km 이하의<br/>차량이라면 무평가 판매 신청이 가능합니다.</p>
            </TooltipCont>
          </Tooltip>
        </div>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap pb48 sell-step-wrap">
          <p className="ment"><i className="ico-notify-white"></i>본인 차량 정보를 가져오기 위해 본인 인증절차가 필요합니다.</p>
        </div>
      </div>
      <div className="content-wrap co-wrap">
        <p className="tit">본인 인증을 해주세요.</p>
        <p className="exp">
          본인 차량만 무평가 판매가 가능하며,<br />본인확인을 위한 인증절차가 필요합니다.
        </p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="인증 진행" width={172} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
        </Buttons>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>조회하신 차량은 무평가 판매 가능 차량이 아닙니다.<br />방문 평가로 판매해 보시겠습니까?</p>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default FreeCertify