import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import { radio_contractor, m_radio_contractor } from '@src/dummy';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceStep03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, false);
  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow(false);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '홈서비스',
        options: ['back', 'gnb']
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
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={3} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">
              계약자선택
              <p>신청정보 입력을 위해 명의자 구분을 선택해주세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap icon list3">
              <RadioGroup
                dataList={m_radio_contractor}
                defaultValue={0}
                boxType={true}
                className="icon"
              >
                <RadioItem>
                  <p><i className="ico-individual"></i></p>
                </RadioItem>
                <RadioItem>
                  <p><i className="ico-business"></i></p>
                </RadioItem>
                <RadioItem>
                  <p><i className="ico-corporation"></i></p>
                </RadioItem>
              </RadioGroup>
            </div>
          </div>
        </div>
        <Buttons align="center" className="fixed full">
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(보증상품 선택)" className="ws1" href="serviceStep02" />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" href="serviceStep03_01" />
        </Buttons>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>홈서비스</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg"></i>
        </div>
      </div>
      <div className="service-step">
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={3} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>계약자 선택</h4>
          <p>신청정보 입력을 위해 명의자 구분을 선택해주세요.</p>
        </div>
        <div className="service-detail">
          <div className="radio-chk-wrap icon list3">
            <RadioGroup
              dataList={radio_contractor}
              defaultValue={0}
              boxType={true}
              className="icon"
            >
              <RadioItem>
                <p><i className="ico-individual"></i></p>
              </RadioItem>
              <RadioItem>
                <p><i className="ico-business"></i></p>
              </RadioItem>
              <RadioItem>
                <p><i className="ico-corporation"></i></p>
              </RadioItem>
            </RadioGroup>
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <Button size="big" background="gray" title="이전 단계로" sub="(보증상품 선택)" className="ws1" width={240} height={72} href="serviceStep02" />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" width={240} height={72} onClick={(e) => rodalPopupHandler(e, "fade")} />
        </Buttons>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs" isMask={false} isButton={false}>
        <div className="con-wrap">
          <p>계약자 유형을 선택해주세요.</p>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="닫기" width={130} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default ServiceStep03