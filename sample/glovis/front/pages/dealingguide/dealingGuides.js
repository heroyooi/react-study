/**
 * 설명 : 매매가이드
 * @fileoverview 매매가이드
 * @requires
 * @author D191364
 */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { Tabs, DefaultTabBar } from 'rmc-tabs';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';
import Cookies from 'js-cookie';

// eslint-disable-next-line react/prop-types
const DealingGuides = ({ router }) => {
  const tabData = [
    { title: '내차사기' },
    { title: '내차팔기' },
    { title: '내차시세' },
    { title: '오토벨앱' }
  ];
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const { tabType } = router.query;
  const [tabValue, setTabValue] = useState(Number(tabType) || 0);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const onLink = (e, url) => {
    e.preventDefault();
    //console.log("onLink")
    if (url === '/pricingSystem/pricing' && (!isLoginLiveCheck() || gInfoLive().membertype === '0010')) {
      alert(`딜러 회원만 이용가능합니다`);
    } else {
      Router.push(url);
    }
  };

  useEffect(() => {
    setTabValue(Number(tabType) || 0);
  }, [tabType]);

  useEffect(() => {
    dispatch({ type: SECTION_HOME_SERVICE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '오토벨 이용가이드',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#fff'
        }
      });
    }
  }, [dispatch]);

  console.log('===> ', Cookies.get('membertype'))

  if (hasMobile) {
    return (
      <AppLayout>
        <TabMenu
          type="type2"
          mount={false}
          defaultTab={tabValue}
          hiddenTab={Cookies.get('membertype') !== '0020' ? [1] : []}
          tabLink={[{ index: 0, url: '/dealingguide/dealingGuides?tabType=0' },{ index: 1, url: '/dealingguide/dealingGuides?tabType=1' }]}
        >
          <TabCont tabTitle="서비스가이드" id="tab1" index={0}>
            <Tabs tabs={tabData} renderTabBar={(props) => <DefaultTabBar {...props} page={4} />}>
              <div key="t1" className="content-wrap content-border dealing-guide">
                <ul className="dealing-guide-list">
                  <li>
                    <p className="tit mb12">하나, 쉽고 빠른 차량검색</p>
                    <div className="img-cover s-finder">
                      <Link href="/buycar/buyCarList"><a><img src="/images/mobile/contents/dealing-smartfinder.png" alt="스마트파인더 이미지" /></a></Link>
                    </div>
                    <p className="exp mt24">검색어 자동완성, 다양한 검색필터, 빠르고 정확한 검색을 지원하는 <span>Smart finder</span>를 이용해보세요.</p>
                  </li>
                  <li>
                    <p className="tit">둘, 믿을 수 있는 실매물</p>
                    <div className="img-cover">
                      <Link href="/buycar/livestudio/buyCarList"><a><img src="/images/mobile/contents/dealing-livestudio.png" alt="라이브 스튜디오 & 라이브 샷 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">내·외부 360° Live 이미지와 61가지 차량 진단으로 생생하게 확인하고, 믿고 구매하실 수 있습니다.</p>

                    <div className="img-cover mt40">
                      <Link href="/buycar/auction/buyCarList"><a><img src="/images/mobile/contents/dealing-smartauction.png" alt="스마트옥션 인증 차량 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">전국 오토벨 경매장에서 인증한 실매물만 모았습니다.</p>

                    <div className="img-cover mt40">
                      <Link href="/buycar/certificationmall/buyCarCertiMall"><a><img src="/images/mobile/contents/dealing-family.png" alt="제휴사 인증 차량 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">오토벨과 함께하는 제휴사에서 인증하고 판매하는 차량입니다.</p>
                  </li>
                  <li>
                    <p className="tit">셋, 구매 플러스</p>

                    <div className="img-cover homeservice">
                      <Link href="/homeService/homeService"><a><img src="/images/mobile/contents/dealing-homeservice.png" alt="홈서비스 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">3일간 타보고 결정하세요! 구매 차량을 집 앞까지 보내드립니다.</p>

                    <div className="img-cover finance mt40">
                      <Link href="/financeService/financeService"><a><img src="/images/mobile/contents/dealing-finance.png" alt="금융서비스 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">고객맞춤 금융서비스를 제공합니다.</p>

                    <div className="img-cover mt40">
                      <Link href="/dealingguide/ewProduct"><a><img src="/images/mobile/contents/dealing-ew.png" alt="EW 상품 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">중고차도 신차같이! 오토벨 중고차 보증연장 서비스입니다.</p>
                  </li>
                </ul>
                
              </div>

              <div key="t2" className="content-wrap content-border dealing-guide">
                <ul className="dealing-guide-list">
                  <li>
                    <div className="img-cover sell-1">
                      <Link href="/sell/visitApply"><a><img src="/images/mobile/contents/dealing-sell-01.png" alt="방문평가 판매 이미지" /></a></Link>
                    </div>
                    {/* <p className="exp tac">간편하게 전문가에게 맡기는 내 차 팔기</p> */}

                    <div className="img-cover sell-2 mt40">
                      <Link href="/sell/selfHome"><a><img src="/images/mobile/contents/dealing-sell-02.png" alt="비교견적 판매 이미지" /></a></Link>
                    </div>
                    {/* <p className="exp tac">내가 직접 올리고 견적도 선택하는 내 차 팔기</p> */}

                    <div className="img-cover sell-3 mt40">
                      <Link href="/sell/freeHome"><a><img src="/images/mobile/contents/dealing-sell-03.png" alt="무평가 판매 이미지" /></a></Link>
                    </div>
                    {/* <p className="exp tac">복잡한 과정없는 비대면 내 차 팔기</p> */}
                  </li>
                </ul>
              </div>
              
              <div key="t3" className="content-wrap content-border dealing-guide">
                <ul className="dealing-guide-list">
                  <li>
                    <div className="img-cover marketprice">
                      <Link href="/marketPrice/marketprice"><a><img src="/images/mobile/contents/dealing-marketprice.png" alt="시세조회 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">도/소매 실거래 데이터 분석을 통해 공신력 있는 시세를 제공합니다.</p>

                    <div className="img-cover pricing mt40">
                      <Link href="/pricingSystem/pricing"><a><img src="/images/mobile/contents/dealing-pricingsystem.jpg" alt="프라이싱시스템 이미지" /></a></Link>
                    </div>
                    <p className="exp tac">시세조회 서비스에서 매입시세와 경매장 낙찰 시세, 경매장 낙찰 목록 등을 추가한 전문가용 시세조회 서비스입니다.</p>

                    <div className="img-cover report mt40">
                      <img src="/images/mobile/contents/dealing-report.png" alt="시세리포트 이미지" />
                    </div>
                    <p className="exp tac">위조 방지 기술을 탑재한 투명한 시세 리포트를 발급해드립니다.</p>
                  </li>
                </ul>
              </div>

              <div key="t4" className="content-wrap content-border dealing-guide">
                <dl className="autobell-app">
                  <dt><img src="/images/mobile/contents/dealing-autobell.jpg" alt=""/></dt>
                  <dd>오토벨의 모든 서비스를 앱으로 간편하게 이용하세요</dd>
                </dl>
                <ul className="app-btns">
                  <li><a href="https://apps.apple.com/kr/app/id1492011865?mt=8" target="_blank"><img src="/images/mobile/contents/dealing-btn-apple.png" alt="AppStore(아이폰용) 가기" /></a></li>
                  <li><a href="https://play.google.com/store/apps/details?id=glovis.glovisaa.autobell" target="_blank"><img src="/images/mobile/contents/dealing-btn-google.png" alt="GooglePlay(안드로이드용) 가기" /></a></li>
                </ul>
              </div>
            </Tabs>
            {/* <div className={`tabmenu-swipe tp2 o-length-2 active-${tabKey}`}>
              <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={3} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
                <TabPane tab="차량검색" data-extra="tabpane" key="1">
                  <div className="content-wrap content-border dealing-guide">
                    <p className="sub-tit">Smart Finder</p>
                    <div className="img-cover">
                      <img src="/images/contents/dealing-smart-finder.png" alt="스마트파인더 이미지"></img>
                    </div>
                    <span>최적화된 검색 서비스를 통해 편리한 매물 검색이 가능합니다.</span>
                  </div>
                </TabPane>
                <TabPane tab="오토벨 프리미엄 차량" data-extra="tabpane" key="2">
                  <div className="content-wrap content-border dealing-guide">
                    <p className="sub-tit">
                      <Link href="/buycar/certificationmall/buyCarCertiMall">
                        <a>인증몰차량</a>
                      </Link>
                    </p>
                    <span>수입인증중고차, 금융사인증중고차를 통한 실 매물 제공</span>
                    <ul className="num">
                      <li>1. 수입 : 제조사 운영 브랜드 인증 중고차 매물</li>
                      <li>2. 금융 : 금융사 리스, 렌트 등 금융사 인증 차량으로 다양한 자동차 금융 서비스를 제공하는 인증 차량</li>
                    </ul>

                    <p className="sub-tit">
                      <Link href="/buycar/livestudio/buyCarliveStudioGuide">
                        <a>Live Studio &amp; Live Shot</a>
                      </Link>
                    </p>
                    <div className="img-cover mt20">
                      <img src="/images/contents/dealing-livestudio.png" alt="라이브스튜디오 이미지"></img>
                    </div>
                    <span>실매물 인증, 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</span>

                    <p className="sub-tit">
                      <Link href="#">
                        <a>스마트옥션 차량</a>
                      </Link>
                    </p>
                    <span>글로비스 경매장(분당, 시화, 양산)에서 검증하고 딜러가 낙찰받은 실 매물</span>
                    <div className="img-cover mt20">
                      <img src="/images/contents/dealing-mall.png" alt="인증몰차량 이미지"></img>
                    </div>
                    <div className="img-cover mt20">
                      <img src="/images/contents/dealing-smartauction.png" alt="스마트옥션차량 이미지"></img>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="구매지원 서비스" data-extra="tabpane" key="3">
                  <div className="content-wrap content-border dealing-guide">
                    <p className="sub-tit">
                      <Link href="/homeService/homeServiceGuide">
                        <a>홈서비스</a>
                      </Link>
                      <div className="img-cover mt32 mb35">
                        <img src="/images/contents/dealing-homeservice-02.png" alt="홈서비스 이미지"></img>
                      </div>
                    </p>
                    <span>타보고 산다! 중고차 집 앞 배송</span>

                    <p className="sub-tit mt24">
                      <Link href="#">
                        <a>금융서비스</a>
                      </Link>
                    </p>
                    <span>고객 맞춤 금융 서비스 제공</span>

                    <p className="sub-tit mt24">
                      <Link href="#">
                        <a>오토벨 EW</a>
                      </Link>
                    </p>
                    <span>중고차도 신차같이! 오토벨 중고차 보증연장 서비스</span>
                    <div className="img-cover">
                      <img src="/images/contents/dealing-finance.png" alt="금융서비스 이미지"></img>
                    </div>
                    <div className="img-cover">
                      <img src="/images/contents/dealing-ew.png" alt="오토벨EW 이미지"></img>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="시세조회" data-extra="tabpane" key="4">
                  <div className="content-wrap content-border dealing-guide">
                    <p className="sub-tit">
                      <Link href="/marketPrice/marketprice">
                        <a>시세조회</a>
                      </Link>
                    </p>
                    <span>도/소매 실거래 데이터 분석을 통해 공신력 있는 시세 제공 (현재 시세, 미래 예측 시세)</span>

                    <p className="sub-tit">시세리포트</p>
                    <span>위조 방지 기술을 탑재한 투명한 시세 리포트 발급</span>

                    <p className="sub-tit">
                      <Link href="#">
                        <a href="#" onClick={(e) => onLink(e, '/pricingSystem/pricing')}>
                          프라이싱시스템
                        </a>
                      </Link>
                    </p>
                    <span>시세조회 서비스에서 추가로 매입시세, 경매장 낙찰 시세, 경매장 낙찰 리스트 등 전문가용 시세 조회 서비스</span>
                    <div className="img-cover">
                      <img src="/images/contents/dealing-report.png" alt="프라이싱시스템 이미지"></img>
                    </div>
                    <div className="img-cover">
                      <img src="/images/contents/dealing-pricing.png" alt="시세리포트 이미지"></img>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="차량판매 서비스" data-extra="tabpane" key="5">
                  <div className="content-wrap content-border dealing-guide">
                    <p className="sub-tit">오토벨 App</p>
                    <span>고객이 손쉽게 중고차를 매각 할 수 있는 빠르고 쉬운 중고차촬영/평가 어플리케이션 제공</span>

                    <p className="sub-tit">
                      <Link href="/sellcar/visit/visitValuationRequest">
                        <a>방문평가</a>
                      </Link>
                    </p>
                    <span>간편 신청을 통한 방문 평가 후, 매각까지 전담 평가사 진행</span>

                    <p className="sub-tit">
                      <Link href="/sellcar/self/selfSellCarGuide">
                        <a>셀프평가</a>
                      </Link>
                    </p>
                    <span>24시간 실시간 경쟁 입찰을 통한 매각</span>

                    <p className="sub-tit">
                      <Link href="/sellcar/nonValue/noneValuationGuide">
                        <a>무평가</a>
                      </Link>
                    </p>
                    <span>무평가 비대면 매각 서비스</span>

                    <p className="sub-tit">
                      <Link href="/autoAuction/auctionGate">
                        <a>경매출품</a>
                      </Link>
                    </p>
                    <span>1,800여 개 회원사에게 내 차를 직접 경매로 판매하기</span>
                  </div>
                </TabPane>
              </Tabs>
            </div> */}
          </TabCont>
          <TabCont tabTitle="이용권 안내" id="tab2" index={1}>
            <div className="content-wrap coupon-area">
              <TabMenu type="type1" mount={false}>
                <TabCont tabTitle="기본상품" id="tab1" index={0}>
                  <ul className="coupon-wrap">
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-b1">
                            <span className="label">대당 이용권</span>
                            <span className="ico">Basic</span>
                          </div>
                          <div className="con-wrap">
                            <p>대당 이용권</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 22,000
                            </span>
                          </div>
                          <p className="exp">차량 광고를 위한 기본 구매 상품</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-b2">
                            <span className="label">자유 이용권</span>
                            <span className="ico">Basic</span>
                          </div>
                          <div className="con-wrap">
                            <p>자유 이용권</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 33,000
                            </span>
                          </div>
                          <p className="exp">구매 대수와 이용기간에 따라 자유롭게 차량 광고를 할 수 있는 상품</p>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </TabCont>
                <TabCont tabTitle="프리미엄 상품" id="tab2" index={1}>
                  <ul className="coupon-wrap">
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-p1">
                            <span className="label">Live Studio</span>
                            <span className="ico">Premium</span>
                          </div>
                          <div className="con-wrap">
                            <p>Live Studio</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 22,000
                            </span>
                          </div>
                          <p className="exp">차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공 및 프리미엄존 노출 상품</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-p2">
                            <span className="label">Live Shot</span>
                            <span className="ico">Premium</span>
                          </div>
                          <div className="con-wrap">
                            <p>Live Shot</p>
                            <span>
                              제공기간: 3개월
                              <br />
                              기본가/대당 : 110,000
                            </span>
                          </div>
                          <p className="exp">전문 차량 평가사가 직접 방문 하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스 및 프리미엄존 노출</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-p3">
                            <span className="label">경매낙찰 이용권</span>
                            <span className="ico">Premium</span>
                          </div>
                          <div className="con-wrap">
                            <p>경매낙찰 이용권</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 55,000
                            </span>
                          </div>
                          <p className="exp">글로비스 경매장을 통해 낙찰 받은 차량만 등록 할 수 있는 상품 및 프리미엄존 노출</p>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </TabCont>
                <TabCont tabTitle="부가 상품" id="tab3" index={2}>
                  <ul className="coupon-wrap">
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-e1">
                            <span className="label">프라이싱 조회권</span>
                            <span className="ico">Extra</span>
                          </div>
                          <div className="con-wrap">
                            <p>프라이싱 조회권</p>
                            <span>
                              제공기간: 1회
                              <br />
                              기본가/대당 : 1,100
                            </span>
                          </div>
                          <p className="exp">도/소매 실 거래 데이터 분석을 통해 나온 현재 시세, 미래 시세, 경매장 낙찰 시세 등 딜러 전용 상품</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-e2">
                            <span className="label">업데이트권(대당)</span>
                            <span className="ico">Extra</span>
                          </div>
                          <div className="con-wrap">
                            <p>업데이트권(대당)</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 11,000
                            </span>
                          </div>
                          <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품으로 20회 제공</p>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/mypage/dealer/sellcar/carManagement?tabA=1">
                        <a>
                          <div className="coupon-img type-e3">
                            <span className="label">업데이트권(자유)</span>
                            <span className="ico">Extra</span>
                          </div>
                          <div className="con-wrap">
                            <p>업데이트권(자유)</p>
                            <span>
                              제공기간: 1개월
                              <br />
                              기본가/대당 : 11,000
                            </span>
                          </div>
                          <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품으로 20회 제공(구매 대수와 이용기간에 따라 자유로운 이용 가능) </p>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </TabCont>
              </TabMenu>
            </div>
          </TabCont>
        </TabMenu>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="dealing service-top-banner">
        <div className="content-wrap">
          <h3 style={{paddingTop: 103}}>오토벨 이용안내</h3>
          <p>오토벨이 알려주는 중고차의 시작과 끝!</p>
          <i className="top-banner-bg guide"></i>
        </div>
      </div>
      <div className="home-service-wrap dealing">
        <TabMenu
          type="type1"
          mount={false}
          defaultTab={tabValue}
          tabLink={[
            { index: 0, url: '/dealingguide/dealingGuides?tabType=0' },
            { index: 1, url: '/dealingguide/dealingGuides?tabType=1' }
          ]}
        >
          <TabCont tabTitle="서비스가이드" id="tab1" index={0}>
            <div className="dealing-guide ex">
              <div className="content-wrap">
                <Link href="/buycar/buyCarList"><a className="btn-more se1">Smart finder, 더보기</a></Link>
              </div>
              <div className="content-sec">
                <div className="content-wrap">
                  {/* 내차사기 */}
                  <Link href="/buycar/livestudio/buyCarList"><a className="btn-more se2-1">Live Studio &amp; Live Shot, 더보기</a></Link>
                  <Link href="/buycar/auction/buyCarList"><a className="btn-more se2-2">스마트옥션 인증 차량, 더보기</a></Link>
                  <Link href="/buycar/certificationmall/buyCarCertiMall"><a className="btn-more se2-3">제휴사 인증 차량, 더보기</a></Link>
                </div>
              </div>
              <div className="content-wrap">
                {/* 구매플러스 */}
                <Link href="/homeService/homeService"><a className="btn-more se3-1">홈서비스, 더보기</a></Link>
                <Link href="/financeService/financeService"><a className="btn-more se3-2">금융서비스, 더보기</a></Link>
                <Link href="/dealingguide/ewProduct"><a className="btn-more se3-3">EW 상품, 더보기</a></Link>
              </div>
              <div className="content-sec">
                <div className="content-wrap">
                  {/* 내차팔기 */}
                  <Link href="/sellcar/visit/visitValuationRequest"><a className="btn-more se4-1">방문평가 판매, 더보기</a></Link>
                  <Link href="/sellcar/self/selfSellCarGuide"><a className="btn-more se4-2">비교견적 판매, 더보기</a></Link>
                  <Link href="/sellcar/nonValue/noneValuationGuide"><a className="btn-more se4-3">무평가 판매, 더보기</a></Link>
                </div>
              </div>
              <div className="content-wrap">
                {/* 내차시세 */}
                <Link href="/marketPrice/marketprice"><a className="btn-more se5-1">시세조회, 더보기</a></Link>
                <Link href="/pricingSystem/pricing"><a className="btn-more se5-2">프라이싱시스템, 더보기</a></Link>
              </div>
              <div className="content-sec">
                <div className="content-wrap">
                  <a className="btn-iphone" href="https://apps.apple.com/kr/app/id1492011865?mt=8" target="_blank">AppStore(아이폰용) 가기</a>
                  <a className="btn-android" href="https://play.google.com/store/apps/details?id=glovis.glovisaa.autobell" target="_blank">GooglePlay(안드로이드용) 가기</a>
                </div>
              </div>
              <div className="img-wrap">
                <img src="/images/contents/dealing-guide-img.png" />
              </div>
            </div>
            {/* <div className="dealing-guide">
              <h4>
                오토벨에서 제공하는 <em>모든 서비스를 한 눈에 살펴보세요</em>
              </h4>
              <ul>
                <li>
                  <h5>
                    <em>1</em>차량검색
                  </h5>
                  <p className="sub-tit">
                    Smart Finder
                    <span>최적화된 검색 서비스를 통해 편리한 매물 검색이 가능합니다.</span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <h5>
                    <em>2</em>오토벨 프리미엄 차량
                  </h5>
                  <p className="sub-tit">
                    인증몰차량{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/buycar/certificationmall/buyCarCertiMall')}
                      buttonMarkup={true}
                    />
                    <span>
                      수입인증중고차, 금융사인증중고차, 프랜차이즈를 통한 실 매물 제공
                      <br />
                      1. 수입 : 제조사 운영 브랜드 인증 중고차 매물
                      <br />
                      2. 금융 : 금융사 리스, 렌트 등 금융사 인증 차량으로 다양한 자동차 금융 서비스를 제공하는 인증 차량
                      <br />
                      3. FC : 글로비스와 제휴한 프랜차이즈 매매상사 매물
                    </span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <p className="sub-tit">
                    Live Shot &amp; Live Studio{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/buycar/livestudio/buyCarliveStudioGuide')}
                      buttonMarkup={true}
                    />
                    <span>실매물 인증, 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</span>
                  </p>
                  <div className="img-wrap">
                    <div className="img-cover"></div>
                    <div className="img-cover"></div>
                  </div>
                </li>
                <li>
                  <h5>
                    <em>3</em>구매지원 서비스
                  </h5>
                  <p className="sub-tit">
                    홈서비스{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/homeService/homeServiceGuide')}
                      buttonMarkup={true}
                    />
                    <span>타보고 산다! 중고차 집 앞 배송</span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <h5>
                    <em>4</em>시세조회
                  </h5>
                  <p className="sub-tit">
                    시세조회{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/marketPrice/marketprice')}
                      buttonMarkup={true}
                    />
                    <span>도/소매 실거래 데이터 분석을 통해 공신력 있는 시세 제공 (현재 시세, 미래 예측 시세)</span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <p className="sub-tit mt35">
                    시세리포트
                    <span>위조 방지 기술을 탑재한 투명한 시세 리포트 발급</span>
                  </p>
                  <p className="sub-tit mt35">
                    프라이싱시스템{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/pricingSystem/pricing')}
                      buttonMarkup={true}
                    />
                    <span>시세조회 서비스에서 추가로 매입시세, 경매장 낙찰 시세, 경매장 낙찰 리스트 등 전문가용 시세 조회 서비스</span>
                  </p>
                </li>
                <li>
                  <h5>
                    <em>5</em>차량판매 서비스
                  </h5>
                  <p className="sub-tit">
                    오토벨 App
                    오토벨 App <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>고객이 손쉽게 중고차를 매각 할 수 있는 빠르고 쉬운 중고차촬영/평가 어플리케이션 제공</span>
                  </p>
                  <p className="sub-tit mt32">
                    방문평가{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/sellcar/visit/visitValuationRequest')}
                      buttonMarkup={true}
                    />
                    <span>간편 신청을 통한 방문 평가 후, 매각까지 전담 평가사 진행</span>
                  </p>
                  <p className="sub-tit mt32">
                    셀프평가{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/sellcar/self/selfSellCarGuide')}
                      buttonMarkup={true}
                    />
                    <span>24시간 실시간 경쟁 입찰을 통한 매각</span>
                  </p>
                  <p className="sub-tit mt32">
                    무평가{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/sellcar/nonValue/noneValuationGuide')}
                      buttonMarkup={true}
                    />
                    <span>무평가 비대면 매각 서비스</span>
                  </p>
                  <p className="sub-tit mt32">
                    경매출품{' '}
                    <Button
                      size="sml"
                      line="gray"
                      color="black"
                      radius={true}
                      title="더보기"
                      width={79}
                      height={32}
                      marginLeft={16}
                      onClick={(e) => onLink(e, '/autoAuction/auctionGate')}
                      buttonMarkup={true}
                    />
                    <span>1,800여 개 회원사에게 내 차를 직접 경매로 판매하기</span>
                  </p>
                </li>
              </ul>
            </div> */}
          </TabCont>
          <TabCont tabTitle="이용권 안내" id="tab2" index={1}>
            <div className="content-wrap service-guide ew">
              <div className="ew-service">
                <h4 className="service-tit">상품구성</h4>
                <p className="service-exp">광고 및 상품 등록 시 필요한 이용권을 만나보세요</p>
              </div>
              <div className="coupon-area">
                <h5>
                  기본상품{' '}
                  {/* <Button
                    size="sml"
                    line="gray"
                    color="black"
                    radius={true}
                    title="더보기"
                    width={79}
                    height={32}
                    marginLeft={16}
                    onClick={(e) => onLink(e, '/mypage/dealer/sellcar/carManagement?management=adver&sub=0')}
                    buttonMarkup={true}
                  /> */}
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        대당이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          15,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        자유이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          33,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">전문 차량 평가사가 직접 방문 하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 프리미엄존 노출</p>
                  </li>
                </ul>

                <h5>
                  프리미엄 상품{' '}
                  {/* <Button
                    size="sml"
                    line="gray"
                    color="black"
                    radius={true}
                    title="더보기"
                    width={79}
                    height={32}
                    marginLeft={16}
                    onClick={(e) => onLink(e, '/mypage/dealer/sellcar/carManagement?management=adver&sub=0')}
                    buttonMarkup={true}
                  /> */}
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        Live Studio
                        <span>제공기간: 3개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          165,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        Live Shot
                        <span>제공기간: 3개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          110,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">전문 차량 평가사가 직접 방문 하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 프리미엄존 노출</p>
                  </li>
                  <li className="mt32">
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        경매낙찰이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          55,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">글로비스 경매장을 통해서 낙찰 받은 차량만 등록 할 수 있는 상품으로 프리미엄존 노출</p>
                  </li>
                </ul>

                <h5>
                  부가 상품{' '}
                  {/* <Button
                    size="sml"
                    line="gray"
                    color="black"
                    radius={true}
                    title="더보기"
                    width={79}
                    height={32}
                    marginLeft={16}
                    onClick={(e) => onLink(e, '/mypage/dealer/sellcar/carManagement?management=adver&sub=0')}
                    buttonMarkup={true}
                  /> */}
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        프라이싱조회권
                        {/* <span>제공기간: 1개월</span> */}
                        <span>1회</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          1,100<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">도/소매 실 거래 데이터 분석을 통해 나온 현재 시세, 미래 시세, 경매장 낙찰 시세 등 전용 상품</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        업데이트권(대당)
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          11,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품</p>
                  </li>
                  <li className="mt32">
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지" />
                    </div>
                    <div className="con-wrap">
                      <p>
                        업데이트권(자유)
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">
                          11,000<em className="won">원</em>
                        </p>
                      </div>
                    </div>
                    <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품으로 20회 제공(구매 대수와 이용기간에 따라 자유로운 이용 가능) </p>
                  </li>
                  {/* <li className="mt32">
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        Best Pick
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">1,100<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">서비스 메인 영역에 노출 되는 상품</p>
                  </li> */}
                </ul>
              </div>
            </div>
          </TabCont>
        </TabMenu>
      </div>
    </AppLayout>
  );
};

export default withRouter(DealingGuides);
