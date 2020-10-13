import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import MypageCarEx from '@src/components/common/MypageCarEx';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MYPAGE } from '@src/actions/types';

const DealerSell03_02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  
  const [textareaDisabled1, setTextareaDisabled1] = useState(false)
  const [textareaDisabled2, setTextareaDisabled2] = useState(false)
  const [textareaDisabled3, setTextareaDisabled3] = useState(false)
  const [textareaDisabled4, setTextareaDisabled4] = useState(false)
  const [textareaDisabled5, setTextareaDisabled5] = useState(false)

  const handleTextarea1 = useCallback(() => {
    setTextareaDisabled1(!textareaDisabled1)
  }, [textareaDisabled1]);

  const handleTextarea2 = useCallback(() => {
    setTextareaDisabled2(!textareaDisabled2)
  }, [textareaDisabled2]);

  const handleTextarea3 = useCallback(() => {
    setTextareaDisabled3(!textareaDisabled3)
  }, [textareaDisabled3]);

  const handleTextarea4 = useCallback(() => {
    setTextareaDisabled4(!textareaDisabled4)
  }, [textareaDisabled4]);

  const handleTextarea5 = useCallback(() => {
    setTextareaDisabled5(!textareaDisabled5)
  }, [textareaDisabled5]);
  // 팝업
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);

  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }
  
  return (
    <AppLayout>
      <div className="content-wrap my-ex-admin">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>나의 설명글 수정</h3>
            <p>[차량상세>판매자의 차량 가이드]에 노출됩니다.</p>
          </div>
          <MypageCarEx title={true} activeTextarea={false} buttonType={3} />
        </div>

      </div>
      <RodalPopup show={rodalShow} type={'slideUp'} closedHandler={modalCloseHandler} title="나의 설명글 관리" mode="normal" size="small">
        <div className="con-wrap popup-my-ex">
          <p>설명글 제목을 입력하세요.</p>
          <Input type="text" height={48} />
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={130} onClick={(e) => rodalPopupHandler2(e, "fade")} />
            <Button size="big" background="gray" title="취소" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'slideUp'} closedHandler={modalCloseHandler2} mode="normal" size="xs">
        <div className="con-wrap popup-my-ex">
          <p>설명글 저장이 완료되었습니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="blue80" title="확인" width={245} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerSell03_02