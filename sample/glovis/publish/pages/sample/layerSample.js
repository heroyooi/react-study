import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const layerSample = () => {
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(true, true);

  return (
    <>
      <Button size="mid" background="blue80" radius={true} title="제목 없는 팝업 (FADE)" width={160} onClick={(e) => rodalPopupHandler1(e, "fade")} />

      <RodalPopup show={rodalShow1} type={'fade'} width={500} closedHandler={modalCloseHandler1} mode="normal">
        <div className="con-wrap">
          <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={109} />
            <Button size="big" background="blue80" title="직접등록" width={109} />
          </Buttons>
        </div>
      </RodalPopup>
    </>
  )
}

export default layerSample;