/**
 * 설명 : 홈서비스 가이드
 * @fileoverview 홈서비스>홈서비스 가이드
 * @requires [homeserviceAction]
 * @author 김지훈
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import { getReqData, getPolicy } from '@src/actions/homeservice/homeserviceAction';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_QUICK_EXIST } from '@src/actions/types';

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

/**
 * 설명 : 홈서비스 신청시 가이드 페이지
 * @returns {HomeServiceGuide} 홈서비스 가이드 페이지
 */
const HomeServiceGuide = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { policyList, faqList } = useSelector((state) => state.home);

  const [policy, setPolicy] = useState();
  const [rodalShow, setRodalShow, handleOpenRodal, handleCloseRodal] = useRodal(false, true);

  useEffect(() => {
    if (policyList) {
      policyList.map((v) => {
        if (v.tmsDiv === '0420') {
          setPolicy(v.tmsCntn);
        }
      });
    }
  }, [policyList]);

  useEffect(() => {
    console.log('useEffect');
    dispatch(getReqData());
    dispatch({ type: SECTION_HOME_SERVICE });
    dispatch(getPolicy({ tmsTp: '0400', tmsSbj: '0020', tmsDiv: '0420' }));
  }, []);

  if (hasMobile) {
    useEffect(() => {
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
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
    }, []);

    const tremsOpen = (e) => {
      e.preventDefault();
      handleFullpagePopup(e);
    };
    const [fpTerms, setFpTerms] = useState(false);
    const handleFullpagePopup = useCallback(
      (e) => {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '환불규정 안내',
            options: ['close']
          }
        });
        setFpTerms(true);
      },
      [dispatch]
    );

    const CloseFpPop = useCallback((e) => {
      e.preventDefault();
      setFpTerms(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    }, []);
    return (
      <AppLayout>
        <div className="service-top-banner sml">
          <div className="content-wrap">
            <h3>홈서비스</h3>
            <p>중고차 비대면 구매 서비스! <br />집에서 배송받고 3일간 타보고 사세요. <br />전체 차량 중 <b>#홈서비스</b> 마크가 붙은 <br />차량을 구매 신청하세요!</p>
          </div>
        </div>
        <div className="content-wrap">
          <h4 className="service-tit">오토벨 홈서비스란?</h4>
          <p className="service-exp">
          오토벨 홈서비스는 집에서 배송받고 3일간 타보고 사는 중고차 비대면 서비스입니다.<br />전체 차량 중 <b>#홈서비스</b> 마크가 붙은 차량을 온라인 구매 신청하시면, 오토벨 상담사가 결제, 보험, 배송까지 친절하게 안내해드립니다.
          </p>
          <ul className="service-point">
            <li>
              <i className="ico-confirm-big"></i>
              <p>안심차량</p>
              <span>
                현대 오토벨이
                <br />
                인증한 차량
              </span>
            </li>
            <li>
              <i className="ico-deliver-big"></i>
              <p>배송 서비스</p>
              <span>
                편리하게
                <br />
                우리집까지
              </span>
            </li>
            <li>
              <i className="ico-refund-big"></i>
              <p>환불 가능</p>
              <span>
                3일 동안
                <br />
                타보고 결정
              </span>
            </li>
          </ul>
        </div>
        <div className="content-sec">
          <div className="content-wrap service-use">
            <h4 className="service-tit">홈서비스 이용 방법</h4>
            <ul className="use-step">
              <li></li>
              <li>
                <div className="img-wrap">
                  <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
                <p>
                  <span className="step">STEP1</span>
                  <span className="tit">구매 차량 결정</span>
                  <span className="exp">
                    마음에 드는 차량을 찾으셨나요?<em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP2</span>
                  <span className="tit">온라인 구매 신청</span>
                  <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/mobile/contents/bg-apply-online.png" alt="온라인 구매 신청" />
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src="/images/contents/home-info-03.png" alt="결제" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
                <p>
                  <span className="step">STEP3</span>
                  <span className="tit">전화 상담</span>
                  <span className="exp">오토벨 상담사가 고객님이 원하는 배송 시간과 장소, 결제 방법을 친절하게 상담해드립니다. </span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP4</span>
                  <span className="tit">결제</span>
                  <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/contents/home-info-04.png" alt="상담" />
                </div>
              </li>
              <li>
                <div className="img-wrap">
                  <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
                <p>
                  <span className="step">STEP5</span>
                  <span className="tit">차량 배송</span>
                  <span className="exp">
                    고객님께서 지정하신
                    <br />
                    시간 장소로 차량을 안전하게 배송해 드립니다.
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP6</span>
                  <span className="tit">구매확정</span>
                  <span className="exp">3일 동안 차량을 이용해보시고,최종 구매 결정을 하실 수 있어요.</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/contents/home-info-06.png" alt="구매확정" />
                </div>
              </li>
              <li></li>
            </ul>
            <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
            <Buttons align="center" marginTop={16}>
              <Button size="sml" line="gray" radius={true} title="환불규정 안내" width={85} height={24} onClick={tremsOpen} />
            </Buttons>
          </div>
        </div>
        <div className="faq-wrap">
          <FaqList faqData={faqList} />
        </div>
        <Button className="fixed" size="full" background="blue80" title="홈서비스 차량보기" href="/homeService/homeService" />

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={24}>
          {fpTerms && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content">
                  <div className="con-wrap frminbox">
                    <Editor value={policy ? policy : ''} editing={false} />
                  </div>
                </div>
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={CloseFpPop} />
              </div>
            </div>
          )}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3 style={{paddingTop: 102}}>홈서비스</h3>
          <p>집에서 배송 받고 3일간 타보고 결정하세요!</p>
          <i className="top-banner-bg" />
        </div>
      </div>
      <div className="home-service-wrap">
        <TabMenu type="type1" mount={false} isScroll={true} tabLink={[{ index: 3, url: '/homeService/homeService' }]}>
          <TabCont tabTitle="서비스 안내" id="scroll-tab1" index={0}>
            <div className="content-wrap service-guide">
              <h4 className="service-tit">
                오토벨 <em>홈서비스</em>란?
              </h4>
              <p className="service-exp">
                오토벨 홈서비스는 집에서 배송받고 3일간 타보고 사는 중고차 비대면 서비스입니다.<br />
                전체 차량 중 <b>#홈서비스</b> 마크가 붙은 차량을 온라인 구매 신청하시면,<br />
                오토벨 상담사가 결제, 보험, 배송까지 친절하게 안내해드립니다.
              </p>
              <ul className="service-point">
                <li>
                  <i className="ico-confirm-big" />
                  <p>안심차량</p>
                  <span>현대 오토벨이 인증한 차량</span>
                </li>
                <li>
                  <i className="ico-deliver-big" />
                  <p>배송 서비스</p>
                  <span>편리하게 우리집까지</span>
                </li>
                <li>
                  <i className="ico-refund-big" />
                  <p>환불 가능</p>
                  <span>3일 동안 타보고 결정</span>
                </li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="이용 방법" id="scroll-tab2" index={1}>
            <div className="content-sec">
              <div className="content-wrap service-use">
                <h4 className="service-tit">
                  홈서비스 <em>이용 방법</em>
                </h4>
                <ul className="use-step">
                  <li />
                  <li>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                    </div>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <p>
                      <span className="step">step1</span>
                      <span className="tit">구매 차량 결정</span>
                      <span className="exp">
                        마음에 드는 차량을 찾으셨나요?
                        <br />
                        <em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step2</span>
                      <span className="tit">온라인 구매 신청</span>
                      <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
                    </p>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
                    </div>
                  </li>
                  <li>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-03.png" alt="결제" />
                    </div>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <p>
                      <span className="step">step3</span>
                      <span className="tit">전화 상담</span>
                      <span className="exp">오토벨 상담사가 고객님이 원하는 배송 시간과 장소, <br />결제 방법을 친절하게 상담해드립니다.</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step4</span>
                      <span className="tit">결제</span>
                      <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
                    </p>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-04.png" alt="상담" />
                    </div>
                  </li>
                  <li>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                    </div>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <p>
                      <span className="step">step5</span>
                      <span className="tit">차량 배송</span>
                      <span className="exp">
                        고객님께서 지정하신
                        <br />
                        시간 장소로 차량을 안전하게 배송해 드립니다.
                      </span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">step6</span>
                      <span className="tit">구매확정</span>
                      <span className="exp">
                        3일 동안 차량을 이용해보시고,
                        <br />
                        최종 구매 결정을 하실 수 있어요.
                      </span>
                    </p>
                    <span>
                      <i className="ico-point">
                        <i className="line" />
                      </i>
                    </span>
                    <div className="img-wrap">
                      <img src="/images/contents/home-info-06.png" alt="구매확정" />
                    </div>
                  </li>
                  <li />
                </ul>
                <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
                <Buttons align="center" marginTop={11}>
                  <Button size="mid" line="gray" title="환불규정 안내" width={118} height={32} buttonMarkup={true} onClick={handleOpenRodal} />
                </Buttons>
              </div>
            </div>
          </TabCont>
          <TabCont tabTitle="자주 묻는 질문" id="scroll-tab3" index={2}>
            <div className="content-wrap pt120">
              <div className="faq-list">
                <div className="content-wrap">
                  <FaqList faqData={faqList} />
                </div>
              </div>
            </div>
          </TabCont>
          <TabCont tabTitle="홈서비스 대상 차량 보기" id="scroll-tab4" index={3} />
        </TabMenu>
        <Buttons align="center" marginTop={80}>
          <Button size="big" background="blue80" title="홈서비스 차량 보기" width={300} height={60} href="homeService" />
        </Buttons>
        <RodalPopup show={rodalShow} type={'fade'} closedHandler={handleCloseRodal} title="홈서비스 환불약관" mode="normal" size="large">
          <div className="con-wrap frminbox">
            <Editor value={policy ? policy : ''} editing={false} />
          </div>
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

export default HomeServiceGuide;
