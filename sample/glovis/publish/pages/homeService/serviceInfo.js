import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const ServiceInfo = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_HOME_SERVICE });
  const hasMobile = useSelector((state) => state.common.hasMobile);

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
        <div className="service-top-banner sml">
          <div className="content-wrap">
            <h3>홈서비스</h3>
            <p>집으로 배송 받고 3일간 타보고<br />결정하는 현대 오토벨의 홈서비스</p>
          </div>
        </div>
        <div className="content-wrap">
          <h4 className="service-tit">현대 오토벨 홈서비스란?</h4>
          <p className="service-exp">
            현대 오토벨 홈서비스 광고중인 차량에서 마음에 드시는 차량을 선택하여 접수하시면,
            오토벨 전문 어드바이저가 고객님께 전화를 드려 구매 상담이 진행됩니다.<br />
            구매결정 후 결제와 차량 보험가입이 모두 완료되면 전문기사를 통해 안전하게 고객님께서 원하시는 장소로 보내드리는 구매 방식입니다.
          </p>
          <ul className="service-point">
            <li>
              <i className="ico-confirm-big"></i>
              <p>안심차량</p>
              <span>현대 오토벨이<br />인증한 차량</span>
            </li>
            <li>
              <i className="ico-deliver-big"></i>
              <p>배송 서비스</p>
              <span>편리하게<br />우리집까지</span>
            </li>
            <li>
              <i className="ico-refund-big"></i>
              <p>환불 가능</p>
              <span>3일 동안<br />타보고 결정</span>
            </li>
          </ul>
        </div>
        <div className="content-sec">
          <div className="content-wrap service-use">
            <h4 className="service-tit">홈서비스 이용 방법</h4>
            <ul className="use-step">
              <li></li>
              <li>
                <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP1</span>
                  <span className="tit">구매 차량 결정</span>
                  <span className="exp">마음에 드는 차량을 찾으셨나요?<em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP2</span>
                  <span className="tit">온라인 구매 신청</span>
                  <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
              </li>
              <li>
                <img src="/images/contents/home-info-03.png" alt="결제" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP3</span>
                  <span className="tit">상담</span>
                  <span className="exp">전문 상담원이 차량 및 구매에 대한 상담을 진행합니다.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP4</span>
                  <span className="tit">결제</span>
                  <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-04.png" alt="상담" />
              </li>
              <li>
                <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                <span><i className="ico-point"><i className="line"></i></i></span>
                <p>
                  <span className="step">STEP5</span>
                  <span className="tit">차량 배송</span>
                  <span className="exp">고객님께서 지정하신<br />시간 장소로 차량을 안전하게 배송해 드립니다.</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP6</span>
                  <span className="tit">구매확정</span>
                  <span className="exp">3일 동안 차량을 이용해보시고,최종 구매 결정을 하실 수 있어요.</span>
                </p>
                <span><i className="ico-point"><i className="line"></i></i></span>
                <img src="/images/contents/home-info-06.png" alt="구매확정" />
              </li>
              <li></li>
            </ul>
            <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="환불규정 안내" width={85} height={24} />
            </Buttons>
          </div>
        </div>
        <div className="faq-wrap">
          <FaqList />
        </div>
        <Button className="fixed" size="full" background="blue80" title="홈서비스 차량보기" href="/homeService/serviceHome" />
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
      <div className="home-service-wrap">
        <TabMenu
          type="type1"
          mount={false}
          isScroll={true}
          tabLink={[{ index: 3, url: '/buy/list' }]}
        >
          <TabCont tabTitle="서비스 안내" id="scroll-tab1" index={0}>
            <div className="content-wrap service-guide">
              <h4 className="service-tit">현대 오토벨 <em>홈서비스란?</em></h4>
              <p className="service-exp">
                현대 오토벨 홈서비스 광고중인 차량에서 마음에 드시는 차량을 선택하여 접수하시면,<br />
                오토벨 전문 어드바이저가 고객님께 전화를 드려 구매 상담이 진행됩니다.<br />
                구매결정 후 결제와 차량 보험가입이 모두 완료되면 전문기사를 통해 안전하게 고객님께서 원하시는 장소로 보내드리는 구매 방식입니다.
              </p>
              <ul className="service-point">
                <li>
                  <i className="ico-confirm-big"></i>
                  <p>안심차량</p>
                  <span>현대 오토벨이 인증한 차량</span>
                </li>
                <li>
                  <i className="ico-deliver-big"></i>
                  <p>배송 서비스</p>
                  <span>편리하게 우리집까지</span>
                </li>
                <li>
                  <i className="ico-refund-big"></i>
                  <p>환불 가능</p>
                  <span>3일 동안 타보고 결정</span>
                </li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="이용 방법" id="scroll-tab2" index={1}>
            <div className="content-sec">
              <div className="content-wrap service-use">
                <h4 className="service-tit">홈서비스 <em>이용 방법</em></h4>
                <ul className="use-step">
                  <li></li>
                  <li>
                    <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">step1</span>
                      <span className="tit">구매 차량 결정</span>
                      <span className="exp">마음에 드는 차량을 찾으셨나요?<br /><em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step2</span>
                      <span className="tit">온라인 구매 신청</span>
                      <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
                  </li>
                  <li>
                    <img src="/images/contents/home-info-03.png" alt="결제" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">step3</span>
                      <span className="tit">상담</span>
                      <span className="exp">전문 상담원이 차량 및 구매에 대한 상담을 진행합니다.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step4</span>
                      <span className="tit">결제</span>
                      <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-04.png" alt="상담" />
                  </li>
                  <li>
                    <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">step5</span>
                      <span className="tit">차량 배송</span>
                      <span className="exp">고객님께서 지정하신<br />시간 장소로 차량을 안전하게 배송해 드립니다.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step6</span>
                      <span className="tit">구매확정</span>
                      <span className="exp">3일 동안 차량을 이용해보시고,<br />최종 구매 결정을 하실 수 있어요.</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-06.png" alt="구매확정" />
                  </li>
                  <li></li>
                </ul>
                <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
                <Buttons align="center" marginTop={11}>
                  <Button size="mid" line="gray" title="환불규정 안내" width={118} height={32} />
                </Buttons>
              </div>
            </div>
          </TabCont>
          <TabCont tabTitle="자주 묻는 질문" id="scroll-tab3" index={2}>
            <div className="content-wrap pt120">
              <FaqList />
            </div>
          </TabCont>
          <TabCont tabTitle="홈서비스 대상 차량 보기" id="scroll-tab4" index={3}></TabCont>
        </TabMenu>
        <Buttons align="center" marginTop={80}>
          <Button size="big" background="blue80" title="홈서비스 차량 보기" width={300} height={60} href="/buy/list" />
        </Buttons>
      </div>
    </AppLayout>
  )
}

export default ServiceInfo