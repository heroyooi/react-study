import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import CarNameMod from '@src/components/common/CarNameMod';
import AppDown from '@src/components/common/popup/AppDown';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import InputPic from '@lib/share/items/InputPic';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import useToggle from '@lib/share/custom/useToggle';
import { SECTION_SELL } from '@src/actions/types';


const FreeStep03_01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });

  const now = moment()
  // 옵션 더보기
  const [carOptionMore, setCarOptionMore] = useState(false)

  // 차량 기본 정보
  const [toggle1, onToggle1] = useToggle(false)
  const [toggle2, onToggle2] = useToggle(false)
  const [toggle3, onToggle3] = useToggle(false)
  const [toggle4, onToggle4] = useToggle(false)
  const [toggle5, onToggle5] = useToggle(false)
  const [toggle6, onToggle6] = useToggle(false)
  const [toggle7, onToggle7] = useToggle(false)
  const [toggle8, onToggle8] = useToggle(false)
  const [toggle9, onToggle9] = useToggle(false)

  const [term1, setTerm1] = useState(false);
  const [term2, setTerm2] = useState(false);
  // const [term3, setTerm3] = useState(false);
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false);
  //const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false);

  // 알러트 팝업
  const [alertPop1, setAlertPop1, openAlertPop1, closeAlertPop1] = useRodal(false);
  const [alertPop2, setAlertPop2, openAlertPop2, closeAlertPop2] = useRodal(false);
  const [alertPop3, setAlertPop3, openAlertPop3, closeAlertPop3] = useRodal(false);
  const [alertPop4, setAlertPop4, openAlertPop4, closeAlertPop4] = useRodal(false);
  const [appDownShow, setAppDownShow, openAppDown, appDownCloseHandler] = useRodal(false);

  const handleCarOption = (e) => {
    e.preventDefault()
    setCarOptionMore(!carOptionMore)
  }

  const handleChangeTerm1 = useCallback((e) => {
    setTerm1(prevTerm => !prevTerm);
    if (term1 === false) {
      rodalPopupHandler1(e, "fade");
    }
  }, [term1]);
  const handleChangeTerm2 = useCallback((e) => {
    setTerm2(prevTerm => !prevTerm);
    if (term2 === false) {
      rodalPopupHandler2(e, "fade");
    }
  }, [term2]);
  // const handleChangeTerm3 = useCallback((e) => {
  //   setTerm3(prevTerm => !prevTerm);
  //   if (term3 === false) {
  //     rodalPopupHandler3(e, "fade");
  //   }
  // }, [term3]);

  const handleChangeAgree = useCallback((e) =>{
    console.log(e.target)
  }, [])

  const closeAlertPopup4 = useCallback((e) => {
    e.preventDefault();
    setAlertPop4(false);
  }, []);

  const textareaChange = (e) => console.log('textareaChange: ', e);
  const textareaBlur = (e) => console.log('textareaBlur: ', e);
  const textareaFocus = (e) => console.log('textareaFocus: ', e);

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>무평가 판매</h3>
        <p>무평가, 비대면 서비스를 통해 내 차를 빠르게 판매할 수 있는 서비스입니다.</p>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">       
          <Steps
            type={2}
            contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인' , '신청 완료']}
            active={3}
            mode="hasLink"
            links={['/1', '/2', '/3', '/4', '/5']}
            onClickArr={[openAlertPop1, openAlertPop2, openAlertPop3, openAlertPop4]}
          />        
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <form className="register-form">
          <fieldset>
            <div className="img-upload main mt0">
              <h4 className="mb33">대표 사진 등록</h4>
              <div className="app-down">
                <i className="ico-app-blue"></i>
                <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => openAppDown(e, "fade")} />
              </div>
              <ul>
                <li><InputPic title="차량 전면" /></li>
                <li><InputPic title="차량 후면" /></li>
                <li><InputPic title="차량 좌측" /></li>
                <li><InputPic title="차량 우측" /></li>
                <li><InputPic title="계기판" /></li>
              </ul>
            </div>
            <div className="img-upload detail">
              <h4 className="mb33">상세 사진 등록</h4>
              <p>옵션, 하자 부분이 잘 나오게 등록하시면 더 정확한 견적을 받으실 수 있습니다.</p>
              <ul>
                <li><InputPic title="휠&amp;타이어" /></li>
                <li><InputPic title="엔진룸" /></li>
                <li><InputPic title="내부(앞) 전경" /></li>
                <li><InputPic title="센터페시아 전경" /></li>
                <li><InputPic title="룸미러 전경" /></li>
                <li><InputPic title="차량 상단" /></li>
                <li><InputPic title="트렁크" /></li>
                <li><InputPic title="기어 박스" /></li>
                <li><InputPic title="후방 카메라" /></li>
                <li><InputPic title="스크래치" /></li>
              </ul>
            </div>
          </fieldset>
        </form>

        <Buttons marginTop={48}>
          <span className="step-btn-l">
            <Button size="big" background="gray" title="이전 단계(차량 정보 등록)" width={249} height={60} onClick={(e) => openAlertPop2(e, "fade")} />
          </span>
          <span className="step-btn-r">
            <Button size="big" background="gray" title="임시 저장" width={125} height={60} onClick={(e) => openAlertPop6(e, "fade")} />
            <Button size="big" background="blue80" title="다음 단계(신청 내용 확인)" width={239} height={60} onClick={(e) => openAlertPop4(e, "fade")} />
          </span>
        </Buttons>
        
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup>
      
      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="무평가 이용약관 (필수)" mode="normal" size="medium">
        <div className="con-wrap">
          약관내용
        </div>
      </RodalPopup>

      <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="무평가 환불약관(필수)" mode="normal" size="medium">
        <div className="con-wrap">
          약관내용
        </div>
      </RodalPopup>

      {/* <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="마케팅 활동 동의(선택)" mode="normal" size="medium">
        <div className="con-wrap">

        </div>
      </RodalPopup> */}

      <RodalPopup show={alertPop3} type={'fade'} closedHandler={closeAlertPop3} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>저장 후, 다음단계로 이동하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} href="freeStep03" />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={alertPop4} type={'fade'} closedHandler={closeAlertPop4} mode="normal" size="xs" sisMask={false}>
        <div className="con-wrap">
          <p>임시저장 되었습니다.<br />입력하신 내용은 [마이페이지]에서 확인이 가능합니다.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} />
            <Button size="big" background="blue80" title="확인" width={130} />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={appDownShow} type={'fade'} closedHandler={appDownCloseHandler} mode="normal" size="xs" className="app-photo-register">
        <AppDown />
      </RodalPopup>

    </AppLayout >
  )
}

export default FreeStep03_01;
