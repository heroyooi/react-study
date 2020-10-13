import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import FaqList from '@src/components/common/FaqList';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import { SECTION_HOME_SERVICE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const dealingHome = () => {
  // const dispatch = useDispatch();
  // dispatch({ type: SECTION_HOME_SERVICE });
  // const hasMobile = useSelector((state) => state.common.hasMobile);

  // if (hasMobile) {
  //   dispatch({
  //     type: MOBILE_HEADER_TYPE_SUB,
  //     data: {
  //       title: '홈서비스',
  //       options: ['back', 'gnb']
  //     }
  //   });
  //   dispatch({
  //     type: MOBILE_CONTENT_STYLE,
  //     data: {
  //       bottom: 56,
  //       color: '#fff'
  //     }
  //   });
  //   return (
  //     <AppLayout>
  //       <div className="service-top-banner sml">
  //         <div className="content-wrap">
  //           <h3>홈서비스</h3>
  //           <p>집으로 배송 받고 3일간 타보고<br />결정하는 현대 오토벨의 홈서비스</p>
  //         </div>
  //       </div>
  //       <div className="content-wrap">
  //         <h4 className="service-tit">오토벨 EW 보증 서비스란?</h4>
  //         <p className="service-exp">중고차도 신차 같이, 오토벨 EW보증상품 가입을 통해 안심하고 구매하세요</p>
  //         <ul className="service-point">
  //           <li>
  //             <i className="ico-confirm-big"></i>
  //             <p>안심차량</p>
  //             <span>오토벨이<br />인증한 차량</span>
  //           </li>
  //           <li>
  //             <i className="ico-deliver-big"></i>
  //             <p>배송 서비스</p>
  //             <span>편리하게<br />우리집까지</span>
  //           </li>
  //           <li>
  //             <i className="ico-refund-big"></i>
  //             <p>환불 가능</p>
  //             <span>3일 동안<br />타보고 결정</span>
  //           </li>
  //         </ul>
  //       </div>
  //       <div className="content-sec">
  //         <div className="content-wrap service-use">
  //           <h4 className="service-tit">홈서비스 이용 방법</h4>
  //           <ul className="use-step">
  //             <li></li>
  //             <li>
  //               <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <p>
  //                 <span className="step">STEP1</span>
  //                 <span className="tit">구매 차량 결정</span>
  //                 <span className="exp">마음에 드는 차량을 찾으셨나요?<em className="tx-purple">#홈서비스</em> 마크가 붙은 차량을 확인해주세요.</span>
  //               </p>
  //             </li>
  //             <li>
  //               <p>
  //                 <span className="step">STEP2</span>
  //                 <span className="tit">온라인 구매 신청</span>
  //                 <span className="exp">온라인으로 간편하게 구매 신청하실 수 있어요.</span>
  //               </p>
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
  //             </li>
  //             <li>
  //               <img src="/images/contents/home-info-03.png" alt="결제" />
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <p>
  //                 <span className="step">STEP3</span>
  //                 <span className="tit">상담</span>
  //                 <span className="exp">전문 상담원이 차량 및 구매에 대한 상담을 진행합니다.</span>
  //               </p>
  //             </li>
  //             <li>
  //               <p>
  //                 <span className="step">STEP4</span>
  //                 <span className="tit">결제</span>
  //                 <span className="exp">원하시는 결제수단으로 결제를 진행해주세요.</span>
  //               </p>
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <img src="/images/contents/home-info-04.png" alt="상담" />
  //             </li>
  //             <li>
  //               <img src="/images/contents/home-info-05.png" alt="차량 배송" />
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <p>
  //                 <span className="step">STEP5</span>
  //                 <span className="tit">차량 배송</span>
  //                 <span className="exp">고객님께서 지정하신<br />시간 장소로 차량을 안전하게 배송해 드립니다.</span>
  //               </p>
  //             </li>
  //             <li>
  //               <p>
  //                 <span className="step">STEP6</span>
  //                 <span className="tit">구매확정</span>
  //                 <span className="exp">3일 동안 차량을 이용해보시고,최종 구매 결정을 하실 수 있어요.</span>
  //               </p>
  //               <span><i className="ico-point"><i className="line"></i></i></span>
  //               <img src="/images/contents/home-info-06.png" alt="구매확정" />
  //             </li>
  //             <li></li>
  //           </ul>
  //           <p className="tx-gray">&#8251; 환불 시, 환불정책에 의해 비용이 발생할 수 있습니다.</p>
  //           <Buttons align="center" marginTop={16}>
  //             <Button size="sml" line="gray" radius={true} title="환불규정 안내" width={85} height={24} />
  //           </Buttons>
  //         </div>
  //       </div>
  //       <div className="faq-wrap">
  //         <FaqList />
  //       </div>
  //       <Button className="fixed" size="full" background="blue80" title="홈서비스 차량보기" href="/homeService/serviceHome" />
  //     </AppLayout>
  //   )
  // }
  return (
    <AppLayout>
      <div className="service-top-banner">
        <div className="content-wrap">
          <h3>매매가이드</h3>
          <p>집으로 배송 받고 3일간 타보고 결정하는 현대 오토벨의 홈서비스</p>
          <i className="top-banner-bg"></i>
        </div>
      </div>
      <div className="content-wrap home-service-wrap">
        <TabMenu
          type="type1"
          mount={false}
          tabLink={[{ index: 3, url: '/buy/list' }]}
        >
          <TabCont tabTitle="EW상품" id="tab1" index={0}>
            <div className="service-guide ew">
              <div className="ew-service">
                <h4 className="service-tit">오토벨 <em>EW 보증 서비스란?</em></h4>
                <p className="service-exp">중고차도 신차 같이, 오토벨 EW보증상품 가입을 통해 안심하고 구매하세요</p>
              </div>
              <h4>오토벨 <em>EW 상품을 선택하는 이유</em></h4>
              <ul className="service-point">
                <li>
                  <i className="ico-confirm-big"></i>
                  <p>안심차량</p>
                  <span>오토벨이 직접 인증한 차량</span>
                </li>
                <li>
                  <i className="ico-deliver-big"></i>
                  <p>보증 범위</p>
                  <span>자동차의 모든 것을 보증<br />(일부 소모품 제외)</span>
                </li>
                <li>
                  <i className="ico-refund-big"></i>
                  <p>합리적</p>
                  <span>기간, 가격 등 합리적인 상품 구성</span>
                </li>
              </ul>
            </div>
            <div className="content-sec">
              <div className="service-use">
                <h4 className="service-tit">EW 보증 서비스 <em>이용 방법</em></h4>
                <ul className="use-step">
                  <li></li>
                  <li>
                    <img src="/images/contents/home-info-01.png" alt="구매 차량 결정" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">STEP 01</span>
                      <span className="tit">차량 구매</span>
                      <span className="exp">오토벨이 인증한 EW 구매 가능 차량을<br />검색, 구매하세요</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">STEP 02</span>
                      <span className="tit">EW 가입신청</span>
                      <span className="exp">온라인 및 판매점을 통해 EW 상품에 가입 하세요</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-02.png" alt="온라인 구매 신청" />
                  </li>
                  <li>
                    <img src="/images/contents/home-info-03.png" alt="결제" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">STEP 03</span>
                      <span className="tit">수리 접수</span>
                      <span className="exp">콜센터(1600-0000)을 통해 24시간 접수 해주세요</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">STEP 04</span>
                      <span className="tit">제휴 공업사 방문</span>
                      <span className="exp">콜센터에서 안내한 제휴 공업사로 방문 해주세요</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-04.png" alt="상담" />
                  </li>
                  <li>
                    <img src="/images/contents/home-info-05.png" alt="차량 배송" />
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <p>
                      <span className="step">STEP 05</span>
                      <span className="tit">보증 수리</span>
                      <span className="exp">수리 항목 및 기간 산정 후, 수리를 진행 합니다</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className="step">STEP 06</span>
                      <span className="tit">수리 완료 및 정산</span>
                      <span className="exp">수리가 완료 되면 자기부담금을 정산 합니다.<br />딜리버리 서비스를 통해서 고객님이 원하는<br />장소로 배송 합니다.</span>
                    </p>
                    <span><i className="ico-point"><i className="line"></i></i></span>
                    <img src="/images/contents/home-info-06.png" alt="구매확정" />
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
            
            <div className="content-wrap guarantee-wrap">
              <h4>보증범위안내</h4>
              <TabMenu
                type="type1"
                mount={false}
              >
                <TabCont tabTitle="보장범위/한도" id="tab1" index={0}>
                  <table summary="보장범위/한도에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">보장범위/한도</caption>
                    <colgroup>
                      <col width="20%"/>
                      <col width="80%"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>주요 보장부품</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>엔진</th>
                        <td>
                          1. 실린더블록 및 다음의 내부부품<br />
                          크랭크샤프트 및 베어링세트, 크랭크샤프트 리어오일씰 및 가스켓, 케이스앗세이 및 가스켓,<br />
                          오일펌프앗세이, 커넥팅로드앗세이 및 베어링세트, 피스톤링 및 링세트, 프론트오일씰, 엔진바디씰링 및 가스켓,<br /> 
                          오링팬, 플라이휠, 밸런스샤프트, 흡기 및 배기 매니폴드 및 가스켓<br />
                          <br />
                          2. 실린더헤드 및 다음의 내부부품<br />
                          실린더헤드전체, 캠샤프트, 밸브가이드, 밸브스템씰, 실린더헤드가스켓,  밸브커버 및 밸브스프링,<br />
                          로커암 및 푸싱로드, 로커커버가스켓, 실린더<br />
                          헤드 내부가스켓 및 씰링, 실린더헤드 내부밸브 및 구성품<br />
                          <br />
                          3. 기 타
                          타이밍벨트 및 풀리, 타이밍체인 및 스프로킷, 타이밍커버, 타이밍벨트 텐셔너, 워터펌프, 써모스타트 및 하우징,<br />
                          터보차져, 인젝션펌프, 엔진오일쿨러
                        </td>
                      </tr>
                      <tr>
                        <th>미션</th>
                        <td>
                          1. 자동변속기 및 다음의 내부부품<br />
                          트랜스퍼케이스 및 내부부품, 토크컨버터앗세이, 토크컨버터 하우징 앗세이, 트랜스미션바디씰링 및 가스켓,<br />
                          오일펌프, 프론트/리어 클러치, 로우 및 리버스 브레이크 앗세이, 킥다운밴드 및 드럼, 로우 및 하이 클러치, 기어세트,<br /> 
                          베어링, 샤프트, 밸브바디, 솔레노이드밸브, 구동 플레이트, 인터널디스크, 인터널 씰링 및 가스켓<br />
                          <br />
                          2. 수동변속기 및 다음의 내부부품<br />
                          트랜스퍼케이스, 클러치하우징, 디퍼렌셜 및 기어세트, 인풋 및 아웃풋 샤프트, 싱크로나이져, 기어, 베어링, 샤프트,<br /> 
                          인터널 디스크, 인터널 씰링 및 가스켓<br />
                          <br />
                          3. 기 타<br />
                          자동변속기오일쿨러
                        </td>
                      </tr>
                      <tr>
                        <th>제동장치</th>
                        <td>브레이크 마스터실린더, 브레이크 휠실린더, 브레이크 호스 및 파이프, 진공펌프, 브레이크 부스터, 캘리퍼</td>
                      </tr>
                      <tr>
                        <th>제동장치</th>
                        <td>스티어링 펌프, 스티어링 기어, 스티어링 조인트, 고압호스, 타이로드, 볼 조인트</td>
                      </tr>
                      <tr>
                        <th>제동장치</th>
                        <td>알터네이터, 스타트 모터, 와이퍼 모터, 라디에이터 팬 모터, 윈도우 모터, 블로워 모터</td>
                      </tr>
                    </tbody>
                  </table>
                  <table summary="보장범위/한도에 대한 내용" className="table-tp1 th-c td-c mt42">
                    <caption className="away">보장범위/한도</caption>
                    <colgroup>
                      <col width="20%"/>
                      <col width="40%"/>
                      <col width="40%"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th colSpan="3">보상한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan="2">EW보험<br />보상금액기준</th>
                        <td>청구기준</td>
                        <td>200만원</td>
                      </tr>
                      <tr>
                        <td>차량기준</td>
                        <td>500만원</td>
                      </tr>
                      <tr>
                        <th rowSpan="2">자기부담금</th>
                        <td>국산차</td>
                        <td rowSpan="2">200만원</td>
                      </tr>
                      <tr>
                        <td>수입차</td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
                <TabCont tabTitle="EW상품구성" id="tab2" index={1}>
                  <table summary="EW상품구성에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">보장범위/한도</caption>
                    <colgroup>
                      <col width="17%"/>
                      <col width="17%"/>
                      <col width="17%"/>
                      <col width="*"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th colSpan="3">보상한도</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan="4">EW보험 보험상품<br />구성</th>
                        <td rowSpan="2">6개월 / 1만 km</td>
                        <td>국산</td>
                        <td>5만원</td>
                      </tr>
                      <tr>
                        <td>수입</td>
                        <td>10만원</td>
                      </tr>
                      <tr>
                        <td rowSpan="2">12개월 / 2만 km</td>
                        <td>국산</td>
                        <td>10만원</td>
                      </tr>
                      <tr>
                        <td>수입</td>
                        <td>20만원</td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
                <TabCont tabTitle="가입 대상" id="tab3" index={2}>
                  <table summary="EW상품구성에 대한 내용" className="table-tp1 th-c">
                    <caption className="away">보장범위/한도</caption>
                    <colgroup>
                      <col width="17%"/>
                      <col width="*"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>구분</th>
                        <th>대상 차량 조건</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th rowSpan="3">EW보험 보험상품<br />구성</th>
                        <td>국내 정식 출시중인 국산/수입차 전차종</td>
                      </tr>
                      <tr>
                        <td>성능점검완료 차량 &amp; 선별된 우량매매상사 보유차량</td>
                      </tr>
                      <tr>
                        <td>차량등록기준 7년 &amp; 주행거리 14만km 이내 차량</td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
                <TabCont tabTitle="유의사항" id="tab4" index={3}>
                  <table summary="EW상품구성에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">보장범위/한도</caption>
                    <colgroup>
                      <col width="*"/>
                    </colgroup>
                    <thead>
                      <tr>
                        <th>유의사항</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>유의사항 수급 후 적용예정</td>
                      </tr>
                    </tbody>
                  </table>
                </TabCont>
              </TabMenu>
            </div>
            <Buttons align="center" marginTop={80}>
              <Button size="big" background="blue80" title="EW 대상 차량 보러가기" width={300} height={60} href="/buy/list" />
            </Buttons>
          </TabCont>
          <TabCont tabTitle="서비스가이드" id="tab2" index={1}>
            <div className="dealing-guide">
              <h4>오토벨에서 제공하는 <em>모든 서비스를 한 눈에 살펴보세요</em></h4>
              <ul>
                <li>
                  <h5><em>1</em>차량검색</h5>
                  <p className="sub-tit">
                    Smartpicker
                    <span>최적화된 검색 서비스를 통해 편리한 매물 검색이 가능합니다.</span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <h5><em>2</em>오토벨 프리미엄 차량</h5>
                  <p className="sub-tit">
                    인증몰차량 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>
                      수입인증중고차, 금융사인증중고차, 프랜차이즈를 통한 실 매물 제공<br />
                      1. 수입 : 제조사 운영 브랜드 인증 중고차 매물<br />
                      2. 금융 : 금융사 리스, 렌트 등 금융사 인증 차량으로 다양한 자동차 금융 서비스를 제공하는 인증 차량<br />
                      3. FC :  글로비스와 제휴한 프랜차이즈 매매상사 매물
                    </span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <p className="sub-tit">
                    Live Shot &amp; Live Studio <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>실매물 인증, 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</span>
                  </p>
                  <div className="img-wrap">
                    <div className="img-cover"></div>
                    <div className="img-cover"></div>
                  </div>
                </li>
                <li>
                  <h5><em>3</em>구매지원 서비스</h5>
                  <p className="sub-tit">
                    홈서비스 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>타보고 산다! 중고차 집 앞 배송</span>
                  </p>
                  <div className="img-cover"></div>
                </li>
                <li>
                  <h5><em>4</em>시세조회</h5>
                  <p className="sub-tit">
                    시세조회 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
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
                    프라이싱시스템 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>시세조회 서비스에서 추가로 매입시세, 경매장 낙찰 시세, 경매장 낙찰 리스트 등 전문가용 시세 조회 서비스</span>
                  </p>
                </li>
                <li>
                  <h5><em>5</em>차량판매 서비스</h5>
                  <p className="sub-tit">
                    오토벨 App <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>고객이 손쉽게 중고차를 매각 할 수 있는 빠르고 쉬운 중고차촬영/평가 어플리케이션 제공</span>
                  </p>
                  <p className="sub-tit mt32">
                    방문평가 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>간편 신청을 통한 방문 평가 후, 매각까지 전담 평가사 진행</span>
                  </p>
                  <p className="sub-tit mt32">
                    셀프평가 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>24시간 실시간 경쟁 입찰을 통한 매각</span>
                  </p>
                  <p className="sub-tit mt32">
                    무평가 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>무평가 비대면 매각 서비스</span>
                  </p>
                  <p className="sub-tit mt32">
                    경매출품 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                    <span>1,800여 개 회원사에게 내 차를 직접 경매로 판매하기</span>
                  </p>
                </li>
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="이용권 안내" id="tab3" index={2}>
            <div className="content-wrap service-guide ew">
              <div className="ew-service">
                <h4 className="service-tit">상품구성</h4>
                <p className="service-exp">광고 및 상품 등록 시 필요한 이용권을 만나보세요</p>
              </div>
              <div className="coupon-area">
                <h5>
                  기본상품 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        대당이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">11,000<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">라이브스튜디오를 통해 차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        자유이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">11,000<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">전문 차량 평가사가 직접 방문 하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 프리미엄존 노출</p>
                  </li>
                </ul>

                <h5>
                  프리미엄 상품 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        Live Studio
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">132,000<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">차량 사고 진단, 66가지 점검, 외부 360, 내부 VR, 고해상도 사진 촬영 서비스 제공</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        Live Shot
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">66,000<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">전문 차량 평가사가 직접 방문 하여 라이브스튜디오와 동일한 서비스를 제공하는 출장 서비스로 프리미엄존 노출</p>
                  </li>
                  <li className="mt32">
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        경매낙찰이용권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">44,000<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">글로비스 경매장을 통해서 낙찰 받은 차량만 등록 할 수 있는 상품으로 프리미엄존 노출</p>
                  </li>
                </ul>

                <h5>
                  부가 상품 <Button size="sml" line="gray" color="black" radius={true} title="더보기" width={79} height={32} marginLeft={16} />
                </h5>
                <ul className="coupon-wrap">
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        프라이싱조회권
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">1,100<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">도/소매 실 거래 데이터 분석을 통해 나온 현재 시세, 미래 시세, 경매장 낙찰 시세 등 전용 상품</p>
                  </li>
                  <li>
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        업데이트권(대당)
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">5,500<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품</p>
                  </li>
                  <li className="mt32">
                    <div className="coupon-img">
                      <img src="/images/contents/coupon-img.svg" alt="상품 쿠폰 이미지"/>
                    </div>
                    <div className="con-wrap">
                      <p>
                        업데이트권(자유)
                        <span>제공기간: 1개월</span>
                      </p>
                      <div className="price-wrap">
                        <span>기본가(대당)</span>
                        <p className="price">6,600<em className="won">원</em></p>
                      </div>
                    </div>
                    <p className="exp">차량 광고를 상위에 노출 할 수 있는 업데이트 상품으로 20회 제공(구매 대수와 이용기간에 따라 자유로운 이용 가능) </p>
                  </li>
                  <li className="mt32">
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
                  </li>
                </ul>
              </div>
            </div>
          </TabCont>
        </TabMenu>
      </div>
    </AppLayout>
  )
}

export default dealingHome