import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import CarPictureApply from '@src/components/common/CarPictureApply';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';

/*
html 변경이력
  03.17 : 가격 및 차량소개와 성능점검 서로 위치 바뀜 
*/

const DealerSell02_06 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>차량등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', '성능점검', '가격 및 차량소개', '차량사진 등록', '결제', '등록완료']} active={4} /> {/* 가격 및 차량소개와 성능점검 서로 위치 바뀜  */}
          </div>
          <div className="mt64">
            <CarPictureApply mode="dealer" />
          </div>
          <Buttons marginTop={48}>
            <span className="step-btn-l">
              <Button size="big" background="gray" title="이전" width={150} height={60} />
            </span>
            <span className="step-btn-r">
              <Button size="big" background="blue80" title="다음" width={150} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
            </span>
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>저장 후, 차량 정보등록페이지로<br />결재 페이지로 이동하겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} href="/mypage/dealerSell02_07"/>
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerSell02_06