import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import CarPictureApply from '@src/components/common/CarPictureApply';
import AppDown from '@src/components/common/popup/AppDown';
import InputPic from '@lib/share/items/InputPic';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const SelfStep03 = ({ router }) => {
  const { result, ver } = router.query;
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, false);
  // alert 팝업
  const [alertPop1, setAlertPop1, openAlertPop1, closeAlertPop1] = useRodal(false, false);
  const [alertPop2, setAlertPop2, openAlertPop2, closeAlertPop2] = useRodal(false, true);
  const [alertPop3, setAlertPop3, openAlertPop3, closeAlertPop3] = useRodal(false, false);
  const [alertPop4, setAlertPop4, openAlertPop4, closeAlertPop4] = useRodal(false, true);
  const [alertPop5, setAlertPop5, openAlertPop5, closeAlertPop5] = useRodal(false, false);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '차량사진 등록',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });
    const [mobileVer, setMobileVer] = useState(ver === undefined ? 1 : +ver);
    return (
      <AppLayout>
        <div className="content-wrap sell-register-wrap">
          
          {mobileVer === 1 && <div className="info-wrap">
            <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
            <p className="exp">이제 쉽고 간편하게<br />오토벨에서 제공하는 촬영기능을 사용해 보세요!</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} />
              <Button size="sml" background="blue80" radius={true} title="오토벨 App 다운받기" width={122} />
            </Buttons>
          </div>}

          {mobileVer === 2 && <div className="info-wrap">
            <p className="tit">어떤 사진을 찍어야 하는지 고민되셨죠?</p>
            <p className="exp">이제 쉽고 간편하게<br />오토벨에서 제공하는 촬영기능을 사용해 보세요!</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="촬영 기능 안내" width={88} />
              <Button size="sml" background="blue80" radius={true} title="촬영하기" width={61} />
            </Buttons>
          </div>}

          {mobileVer === 3 && <div className="info-wrap">
            <p className="tit">촬영하신 사진을 업로드 해주세요.</p>
            <p className="exp">업로드 된 이미지는 [미리보기]를 통해 확인하실 수 있습니다.<br />
              업로드 완료 이후 언제 어디에서나 등록을 진행하실 수 있습니다.<br />사진촬영(10/20)</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="미리보기" width={61} />
              <Button size="sml" line="gray" radius={true} title="다시 촬영" width={63} />
              <Button size="sml" background="blue80" radius={true} title="업로드" width={50} />
            </Buttons>
          </div>}
          <CarPictureApply popOpen={rodalPopupHandler} />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-fore-wrap">
        <h3>셀프 등록 판매</h3>
      </div>
      <div className="content-sec bg-blue80">
        <div className="content-wrap sell-step-wrap">
          <Steps
            type={2}
            contents={['차량 정보 조회', '차량 정보 입력', '차량 사진 등록', '신청 내용 확인', '신청 완료']}
            active={3}
            mode="hasLink"
            links={['/1', '/2', '/3', '/4', '/5']}
            onClickArr={[openAlertPop1, openAlertPop2, openAlertPop3, openAlertPop4, openAlertPop5]}
          />
        </div>
      </div>
      <div className="content-wrap sell-register-wrap">
        <CarPictureApply popOpen={rodalPopupHandler} />
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs" className="app-photo-register">
        <AppDown />
      </RodalPopup>

      <RodalPopup show={alertPop2} type={'fade'} closedHandler={closeAlertPop2} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>저장 후, 차량 정보 등록 페이지로 이동하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} closedHandler={closeAlertPop2} />
            <Button size="big" background="blue80" title="확인" width={130} href="selfStep02" />
          </Buttons>
        </div>
      </RodalPopup>

      <RodalPopup show={alertPop4} type={'fade'} closedHandler={closeAlertPop4} mode="normal" size="xs" isMask={false}>
        <div className="con-wrap">
          <p>입력하신 내용으로<br />셀프 등록 판매를 신청하시겠습니까?</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={130} closedHandler={closeAlertPop2} />
            <Button size="big" background="blue80" title="확인" width={130} href="selfStep04" />
          </Buttons>
        </div>
      </RodalPopup>


    </AppLayout>
  )
}

export default withRouter(SelfStep03);