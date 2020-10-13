import { useDispatch, useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import AppDown from '@src/components/common/popup/AppDown';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { screenInfo, mScreenInfo } from '@src/dummy';

const FreeHome = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '무평가 판매',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 88,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <div className="sell-service-wrap">
          <div className="content-wrap">
            <h3>무평가 판매 서비스 소개</h3>
            <p>무평가, 비대면 서비스를 통해 내 차를 빠르게 판매할 수 있는 서비스입니다.</p>
            <ul className="sell-ico-wrap">
              <li>
                <i className="ico-sell-01"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">무평가 기준</p>
                  <p className="exp">신차 등록일 33개월, 주행거리 3만km 이내의 무사고 차량만 가능합니다.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-02"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">비대면 서비스</p>
                  <p className="exp">차량정보 입력부터 판매 결정까지 비대면 서비스로 진행합니다.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-03"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">빠른 판매 가능</p>
                  <p className="exp">차량정보 입력부터 판매 결정까지 비대면 서비스로 진행합니다.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-sec">
            <div className="slide-steps-wrap">
              <h3>무평가 판매 이용 방법</h3>
              <div className="steps-frame">
                <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={mScreenInfo} dots={true}>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">01. 차량정보 조회</p>
                        <p className="exp">내 차의 차량 번호를 입력하여 차량정보를 조회하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">02. 차량정보 입력</p>
                        <p className="exp">내 차의 차량정보와 옵션, 추가 정보, 사진을 입력하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">03. 차량판매 상담</p>
                        <p className="exp">콜센터 상담을 통해 차량 판매 여부를 결정하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">04. 차량 입고 및 평가</p>
                        <p className="exp">차량 평가를 위한 탁송을 진행하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">05. 최종 매각 결정</p>
                        <p className="exp">차량 평가 결과에 따른 최종 매각금액을 확인 후<br />매각을 결정하세요</p>
                      </div>
                    </div>
                  </div>
                </SlideBanner>
              </div>
            </div>
          </div>
          <div className="content-wrap">
            <h3>사진을 편리하게 등록하는 2가지 방법</h3>
            <p>
              1. 내 컴퓨터에 저장된 차량 사진을 PC 화면에서 업로드 한다.<br />
              2. 모바일 APP으로 편리하게 찍고 사진을 업로드 한다.
            </p>
            <div className="app-down">
              <i className="ico-app"></i>
              <Button color="blue80" title="오토벨앱 다운로드" href="#" />
            </div>
          </div>
          <Button className="fixed" size="full" background="blue80" title="무평가 판매 시작하기" href="#" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-service-wrap">
        <h3>무평가 판매 서비스</h3>
        <p>무평가, 비대면 서비스를 통해 내 차를 빠르게 판매할 수 있는 서비스입니다.</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="ico-sell-01"></i>
            <p className="tit">무평가 기준</p>
            <p className="exp">신차 등록일 33개월,  주행거리 3만km 이내의<br />무사고 차량만 가능합니다.</p>
          </li>
          <li>
            <i className="ico-sell-02"></i>
            <p className="tit">비대면 서비스</p>
            <p className="exp">차량정보 입력부터 판매 결정까지<br />비대면 서비스로 진행합니다.</p>
          </li>
          <li>
            <i className="ico-sell-03"></i>
            <p className="tit">빠른 판매 가능</p>
            <p className="exp">차량정보 입력부터 판매 결정까지<br />비대면 서비스로 진행합니다.</p>
          </li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap slide-steps-wrap">
          <div className="steps-frame">
            <SlideBanner touch={true} slideType="banner-single" screen={true} screenInfo={screenInfo} customArrow={true} buttonType="circle" pagination={true}>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step1</em>차량 정보 조회</p>
                    <p className="exp">내 차의 차량 번호를 입력하여 차량정보를 조회하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step2</em>차량 정보 입력</p>
                    <p className="exp">내 차의 차량정보와 옵션, 추가 정보, 사진을 입력하세요.</p>
                    <p className="sub">
                      <span>사진을 등록하는 2가지 방법</span>
                      1. 내 컴퓨터에 저장된 차량 사진을 PC 화면에서 업로드 한다.<br />
                      2. 모바일 APP으로 편리하게 찍고 사진을 불러온다.
                    </p>
                  </div>
                  <div className="app-down">
                    <i className="ico-app-blue"></i>
                    <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => rodalPopupHandler(e, "fade")} />
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step3</em>차량 판매 상담</p>
                    <p className="exp">콜센터 상담을 통해 차량 판매 여부를 결정하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step4</em>차량 입고 및 평가</p>
                    <p className="exp">차량 평가를 위한 탁송을 진행하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step5</em>최종 매각 결정</p>
                    <p className="exp">차량 평가 결과에 따른 최종 매각금액을 확인한 후<br />매각 여부를 결정하세요.</p>
                  </div>
                </div>
              </div>
            </SlideBanner>
          </div>

        </div>
      </div>
      <Buttons align="center" marginTop={48} marginBottom={140}>
        <Button size="big" background="blue80" title="무평가 판매 시작하기" width={245} height={60} href="freeCertify" />
      </Buttons>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs" className="app-photo-register">
        <AppDown />
      </RodalPopup>
    </AppLayout>
  )
}

export default FreeHome