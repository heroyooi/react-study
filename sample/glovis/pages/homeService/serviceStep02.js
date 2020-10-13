import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Steps from '@lib/share/items/Steps';
import AppLayout from '@src/components/layouts/AppLayout';
import { radio_guaranteed, m_radio_guaranteed } from '@src/dummy';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceStep02 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [chkPop, setChkPop, handleOpenChkPop, handleCloseChkPop] = useRodal(false, false);

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setChkPop(false);
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
        bottom: 80,
        color: '#fff'
      }
    });

    const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
    const closeMPop = useCallback(
      (e) => {
        e.preventDefault();
        setMPop(false);
      },
      [setMPop]
    );

    return (
      <AppLayout>
        <div className="service-step">
          <Steps type={1} contents={['차량정보확인', '보증상품선택', '계약자정보입력', '예상결제금액 확인', '신청완료']} active={2} mode="stick" />
        </div>
        <div className="content-wrap service-wrap">
          <div className="service-tit">
            <h4 className="tit2">
                보증상품 선택
              <p>A/S까지 안심하고 구입하세요.</p>
            </h4>
          </div>
          <div className="service-detail">
            <div className="radio-chk-wrap text list3">
              <RadioGroup
                dataList={m_radio_guaranteed}
                defaultValue={1}
                boxType={true}
                className="text"
              >
                <RadioItem>
                  <div>
                    <span className="sub-title">6개월 / 10,000KM 보증</span>
                    <p className="price-tp3">110,000<span className="won">원</span></p>
                  </div>
                </RadioItem>
                <RadioItem>
                  <div>
                    <span className="sub-title">12개월 / 20,000KM 보증</span>
                    <p className="price-tp3">220,000<span className="won">원</span></p>
                  </div>
                </RadioItem>
                <RadioItem onClick={openMPop}>
                  <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
                </RadioItem>
              </RadioGroup>
            </div>
            <p className="tx-exp-tp5">&#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</p>
          </div>
        </div>
        <Buttons align="center" className="fixed full">
          <Button size="big" background="blue20" color="blue80" title="이전 단계로" sub="(차량정보 확인)" className="ws1" href="serviceStep01" />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 선택)" className="ws1" href="serviceStep03" />
        </Buttons>

        <RodalPopup show={mPop} type={'fade'} width={380} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="exp">
              무보증을 선택하시면 구매차량의 이전대행 서비스만 제공되며, 당사가 제공하는 어떠한 보증서비스도 제공되지 않습니다. (성능보증 제외)
            </p>
            <Buttons align="right" marginTop={16}>
              <Button fontSize={14} title="확인" color="blue80" onClick={closeMPop} />
            </Buttons>
          </div>
        </RodalPopup>
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
        <Steps type={1} contents={['차량정보 확인', '보증상품 선택', '계약자정보 입력', '예상결제금액 확인', '신청 완료']} active={2} />
      </div>
      <div className="content-wrap service-wrap">
        <div className="service-tit">
          <h4>보증상품 선택</h4>
          <p>A/S까지 안심하고 구입하세요.</p>
        </div>
        <div className="service-detail">
          <div className="radio-chk-wrap text list3">
            <RadioGroup
              dataList={radio_guaranteed}
              defaultValue={1}
              boxType={true}
              className="text"
            >
              <RadioItem>
                <div>
                  <span className="sub-title">6개월 / 10,000KM 보증</span>
                  <p className="price-tp3">110,000<span className="won">원</span></p>
                </div>
              </RadioItem>
              <RadioItem>
                <div>
                  <span className="sub-title">12개월 / 20,000KM 보증</span>
                  <p className="price-tp3">220,000<span className="won">원</span></p>
                </div>
              </RadioItem>
              {/* <RadioItem>
                <div>
                  <span className="sub-title">18개월 / 30,000KM 보증</span>
                  <p className="price-tp3">320,000<span className="won">원</span></p>
                </div>
              </RadioItem> */}
              <RadioItem onClick={handleOpenChkPop}>
                <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
              </RadioItem>
            </RadioGroup>
          </div>
          <div className="service-notify">
            <p className="tx-exp-tp5">&#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</p>
            {/* <p className="tx-exp-tp5">&#8251; 차량 구매방법이 '리스'상품일 경우, 보증상품은 무상지원됩니다. (최대 100만원 한도 내)</p> */}
          </div>
        </div>
        <Buttons align="center" marginTop={60}>
          <Button size="big" background="gray" title="이전 단계로" sub="(차량정보 확인)" className="ws1" width={240} height={72} href="serviceStep01" />
          <Button size="big" background="blue80" title="다음 단계로" sub="(계약자정보 입력)" className="ws1" width={240} height={72} href="serviceStep03" />
        </Buttons>
      </div>

      <RodalPopup show={chkPop} type={'fade'} closedHandler={handleCloseChkPop} mode="normal" size="xs" isMask={false} isButton={false}>
        <div className="con-wrap popup-no-warranty">
          <p>무보증을 선택하시면 구매차량의 이전대행 서비스만 제공되며,<br /> 당사가 제공하는 어떠한 보증서비스도 제공되지 않습니다.<br />(성능보증 제외)</p>
          <Buttons align="center" marginTop={40} className="w-line">
            <Button size="big" background="blue80" title="확인" width={130} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default ServiceStep02