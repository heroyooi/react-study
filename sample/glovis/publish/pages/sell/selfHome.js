import { useDispatch, useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import { screenInfo, mScreenInfo } from '@src/dummy';

const SelfHome = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '셀프등록 판매',
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
        <div className="sell-service-wrap">
          <div className="content-wrap">
            <h3>셀프 등록 판매 서비스 소개</h3>
            <p>모바일로 직접 차량을 평가하여 24시간 실시간 경쟁 입찰을 통해 최고가로 판매하는 서비스입니다.</p>
            <ul className="sell-ico-wrap">
              <li>
                <i className="ico-sell-01"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">셀프 등록</p>
                  <p className="exp">빠르고 편리하게 직접 차량 평가, 사진촬영까지 진행합니다.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-02"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">24시간 실시간 경쟁 입찰</p>
                  <p className="exp">입찰 진행 과정을 실시간으로 확인할 수 있어 투명합니다.</p>
                </div>
              </li>
              <li>
                <i className="ico-sell-03"></i>
                <div className="tx-wrap">
                  <p className="tit tx-blue80">직접 판매 결정</p>
                  <p className="exp">경쟁 입찰 종료 후, 직접 판매 여부를 결정할 수 있어 부담이 없습니다.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-sec">
            <div className="slide-steps-wrap">
              <h3>셀프등록 판매 이용 방법</h3>
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
                        <p className="tit">03. 24시간 경쟁 입찰</p>
                        <p className="exp">내 차의 입찰 진행 과정을 실시간으로 확인 하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">04. 판매 여부 결정</p>
                        <p className="exp">입찰 결과를 확인 후, 직접 판매 여부를 결정하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">05. 차량평가</p>
                        <p className="exp">선택하신 딜러와 차량 평가를 진행 하세요</p>
                      </div>
                    </div>
                  </div>
                  <div className="steps-slide">
                    <div className="steps-exp">
                      <div>
                        <p className="tit">06. 최종 매각 결정</p>
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
          <Button className="fixed" size="full" background="blue80" title="셀프 등록 판매 시작하기" href="selfStep01" />
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="content-wrap sell-service-wrap">
        <h3>셀프 등록 판매 서비스 소개</h3>
        <p>모바일로 직접 차량을 평가하여 24시간 실시간 경쟁 입찰을 통해 최고가로 판매하는 서비스입니다.</p>
        <ul className="sell-ico-wrap">
          <li>
            <i className="ico-sell-01"></i>
            <p className="tit">셀프 등록</p>
            <p className="exp">빠르고 편리하게 직접 차량 평가, 사진<br />촬영까지 진행합니다.</p>
          </li>
          <li>
            <i className="ico-sell-02"></i>
            <p className="tit">24시간 실시간 경쟁 입찰</p>
            <p className="exp">입찰 진행 과정을 실시간으로 확인 할 수 있어<br />투명합니다.</p>
          </li>
          <li>
            <i className="ico-sell-03"></i>
            <p className="tit">직접 판매 결정</p>
            <p className="exp">경쟁 입찰 종료 후, 직접 판매 여부를 결정<br />할 수 있어 부담이 없습니다.</p>
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
                    <p className="exp">판매할 내 차의 차량 번호를 입력하여 정보를 조회하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step2</em>차량 정보 입력</p>
                    <p className="exp">내차의 차량 사진과 차량 옵션 등의 추가 정보를 입력하세요.</p>
                    <p className="sub">
                      <span>사진을 등록하는 2가지 방법</span>
                      1. 내 컴퓨터에 저장된 차량 사진을 업로드한다.<br />
                      2. 모바일 앱으로 편리하게 찍고 사진을 불러온다.
                    </p>
                  </div>
                  <div className="app-down">
                    <i className="ico-app-blue"></i>
                    <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" href="#" />
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step3</em>24시간 경쟁 입찰</p>
                    <p className="exp">24시간 실시간 비교견적과 10분 즉시 견적 중<br />원하는 매각 방법을 선택하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step4</em>판매 여부 결정</p>
                    <p className="exp">입찰 결과를 확인한 후, 직접 판매 여부를 결정하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step5</em>차량 평가</p>
                    <p className="exp">선택하신 딜러와 차량 평가를 진행하세요.</p>
                  </div>
                </div>
              </div>
              <div className="steps-slide">
                <div className="steps-exp">
                  <div>
                    <p className="tit"><em>Step6</em>최종 매각 결정</p>
                    <p className="exp">차량 평가 결과에 따른 최종 매각끔액을 확인한 후<br />매각 여부를 결정하세요.</p>
                  </div>
                </div>
              </div>
            </SlideBanner>
          </div>
        </div>
      </div>
      <Buttons align="center" marginTop={48} marginBottom={140}>
        <Button size="big" background="blue80" title="셀프 등록 판매 시작하기" width={240} height={60} href="selfCertify" />
      </Buttons>
    </AppLayout>
  )
}

export default SelfHome