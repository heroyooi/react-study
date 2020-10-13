/**
 * 설명 : EW상품
 * @fileoverview EW상품
 * @requires
 * @author D191364
 */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
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

// eslint-disable-next-line react/prop-types
const EwProduct = ({ router }) => {
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
          title: 'EW 상품',
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

  if (hasMobile) {
    // 슬라이드 탭
    const [tabKey, setTabKey] = useState(1);
    const tabCallback = useCallback((key) => {
      if (+key < 2) {
        setTabKey('first');
      } else if (+key >= 2 && +key < 5) {
        setTabKey(key);
      } else {
        setTabKey('last');
      }
    }, []);

    return (
      <AppLayout>
        <div className="service-guide ew">
          <div className="ew-service">
            <h4 className="tit1">오토벨 EW 상품이란?</h4>
            <p className="service-exp">오토벨이 직접 인증한 차량을 신차처럼 보증받는 EW(연장 보증) 서비스입니다.</p>
          </div>
          <ul className="service-point">
            <li>
              <i className="ico-confirm-big"></i>
              <p>안심차량</p>
              <span>
                오토벨이 직접
                <br />
                인증한 차량
              </span>
            </li>
            <li>
              <i className="ico-deliver-big"></i>
              <p>보증 범위</p>
              <span>
                자동차의 모든 것을
                <br />
                보증<em>(일부 소모품 제외)</em>
              </span>
            </li>
            <li>
              <i className="ico-refund-big"></i>
              <p>합리적</p>
              <span>
                기간, 가격 등<br />
                합리적인 상품 구성
              </span>
            </li>
          </ul>
        </div>
        <div className="content-sec">
          <div className="service-use">
            <h4 className="service-tit">EW 보증 서비스 이용 방법</h4>
            <ul className="use-step">
              <li></li>
              <li>
                <div className="img-wrap">
                  <img src="/images/contents/ew-info-01.png" alt="구매 차량 결정" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
                <p>
                  <span className="step">STEP 01</span>
                  <span className="tit">차량 구매</span>
                  <span className="exp">오토벨이 인증한 EW 구매 가능 차량을 검색, 구매하세요</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP 02</span>
                  <span className="tit">가입 신청</span>
                  <span className="exp">온라인 및 판매점을 통해 EW 상품에 가입 하세요</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/contents/ew-info-02.png" alt="온라인 구매 신청" />
                </div>
              </li>
              <li>
                <div className="img-wrap object">
                  <img src="/images/contents/ew-info-03.png" alt="결제" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
                <p>
                  <span className="step">STEP 03</span>
                  <span className="tit">수리 접수</span>
                  <span className="exp">콜센터(1600-0080)을 통해 24시간 접수 해주세요</span>
                </p>
              </li>
              <li>
                <p>
                  <span className="step">STEP 04</span>
                  <span className="tit">제휴 공업사 방문</span>
                  <span className="exp">콜센터에서 안내한 제휴 공업사로 방문 해주세요</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/contents/ew-info-04.png" alt="상담" />
                </div>
              </li>
              <li>
                <div className="img-wrap object">
                  <img src="/images/contents/ew-info-05.png" alt="차량 배송" />
                </div>
                <i className="ico-point"><i className="line"></i></i>
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
                  <span className="exp">수리가 완료 되면 자기부담금을 정산 합니다. 딜리버리 서비스를 통해서 고객님이 원하는 장소로 배송 합니다.</span>
                </p>
                <i className="ico-point"><i className="line"></i></i>
                <div className="img-wrap">
                  <img src="/images/contents/ew-info-06.png" alt="구매확정" />
                </div>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className="content-wrap guarantee-wrap">
          <h4 className="tit2 mb16 mt32">보증범위안내</h4>
          <TabMenu type="type1" mount={false}>
            <TabCont tabTitle="보장범위" id="tab1" index={0}>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>주요 보장부품</MenuTitle>
                  <MenuCont>
                    <table summary="보장범위" className="table-tp1">
                      <caption className="away">보장범위</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>엔진</th>
                          <td>
                            1. 실린더블록 및 다음의 내부부품
                            <br />
                            크랭크샤프트 및 베어링세트, 크랭크샤프트 리어오일씰 및 가스켓, 케이스앗세이 및 가스켓,
                            <br />
                            오일펌프앗세이, 커넥팅로드앗세이 및 베어링세트, 피스톤링 및 링세트, 프론트오일씰, 엔진바디씰링 및 가스켓,
                            <br />
                            오링팬, 플라이휠, 밸런스샤프트, 흡기 및 배기 매니폴드 및 가스켓
                            <br />
                            <br />
                            2. 실린더헤드 및 다음의 내부부품
                            <br />
                            실린더헤드전체, 캠샤프트, 밸브가이드, 밸브스템씰, 실린더헤드가스켓, 밸브커버 및 밸브스프링,
                            <br />
                            로커암 및 푸싱로드, 로커커버가스켓, 실린더
                            <br />
                            헤드 내부가스켓 및 씰링, 실린더헤드 내부밸브 및 구성품
                            <br />
                            <br />
                            3. 기 타 타이밍벨트 및 풀리, 타이밍체인 및 스프로킷, 타이밍커버, 타이밍벨트 텐셔너, 워터펌프, 써모스타트 및 하우징,
                            <br />
                            터보차져, 인젝션펌프, 엔진오일쿨러
                          </td>
                        </tr>
                        <tr>
                          <th>미션</th>
                          <td>
                            1. 자동변속기 및 다음의 내부부품
                            <br />
                            트랜스퍼케이스 및 내부부품, 토크컨버터앗세이, 토크컨버터 하우징 앗세이, 트랜스미션바디씰링 및 가스켓,
                            <br />
                            오일펌프, 프론트/리어 클러치, 로우 및 리버스 브레이크 앗세이, 킥다운밴드 및 드럼, 로우 및 하이 클러치, 기어세트,
                            <br />
                            베어링, 샤프트, 밸브바디, 솔레노이드밸브, 구동 플레이트, 인터널디스크, 인터널 씰링 및 가스켓
                            <br />
                            <br />
                            2. 수동변속기 및 다음의 내부부품
                            <br />
                            트랜스퍼케이스, 클러치하우징, 디퍼렌셜 및 기어세트, 인풋 및 아웃풋 샤프트, 싱크로나이져, 기어, 베어링, 샤프트,
                            <br />
                            인터널 디스크, 인터널 씰링 및 가스켓
                            <br />
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
                          <th>조향장치</th>
                          <td>스티어링 펌프, 스티어링 기어, 스티어링 조인트, 고압호스, 타이로드, 볼 조인트</td>
                        </tr>
                        <tr>
                          <th>전장품</th>
                          <td>알터네이터, 스타트 모터, 와이퍼 모터, 라디에이터 팬 모터, 윈도우 모터, 블로워 모터</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>보장 한도</MenuTitle>
                  <MenuCont>
                    <table summary="보장한도에 대한 내용" className="table-tp1 mt42">
                      <caption className="away">보장한도</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan="2" className="tx-b tx-c">
                            EW 보험 보상금액 기준
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>청구기준</th>
                          <td>200만원</td>
                        </tr>
                        <tr>
                          <th>차량기준</th>
                          <td>500만원</td>
                        </tr>
                      </tbody>
                    </table>
                    <table summary="보상한도에 대한 내용" className="table-tp1 mt16">
                      <caption className="away">보상한도</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="70%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan="2" className="tx-b tx-c">
                            자기부담금
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>국산차</th>
                          <td rowSpan="2">20만원</td>
                        </tr>
                        <tr>
                          <th>수입차</th>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </TabCont>
            <TabCont tabTitle="EW 보험" id="tab2" index={1}>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>가입조건</MenuTitle>
                  <MenuCont>
                    <table summary="EW 보험에 대한 내용" className="table-tp1">
                      <caption className="away">EW 보험</caption>
                      <colgroup>
                        <col width="*" />
                        <col width="32%" />
                        <col width="32%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th colSpan="4" className="tx-b tx-c">
                            EW보험 상품 구성
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th rowSpan="2">6개월 / 1만 km</th>
                          <td>국산</td>
                          <td>5만원</td>
                        </tr>
                        <tr>
                          <td>수입</td>
                          <td>10만원</td>
                        </tr>
                        <tr>
                          <th rowSpan="2">12개월 / 2만 km</th>
                          <td>국산</td>
                          <td>10만원</td>
                        </tr>
                        <tr>
                          <td>수입</td>
                          <td>20만원</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </TabCont>
            <TabCont tabTitle="가입대상" id="tab3" index={2}>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>대상 차량 조건</MenuTitle>
                  <MenuCont>
                    <table summary="가입대상에 대한 내용" className="table-tp1">
                      <caption className="away">가입대상</caption>
                      <colgroup>
                        <col width="30%" />
                        <col width="*" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th rowSpan="3">차량기준</th>
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
                  </MenuCont>
                </MenuItem>
              </ul>
            </TabCont>
            <TabCont tabTitle="유의사항" id="tab4" index={3}>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>유의사항</MenuTitle>
                  <MenuCont>
                    <table summary="유의사항에 대한 내용" className="table-tp1 th-c td-c">
                      <caption className="away">유의사항</caption>
                      <colgroup>
                        <col width="*" />
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
                  </MenuCont>
                </MenuItem>
              </ul>
            </TabCont>
          </TabMenu>
          <Buttons align="center" marginTop={20}>
            <Button
              size="full"
              background="blue20"
              color="blue80"
              radius={true}
              title="EW대상 차량 보러가기"
              height={56}
              fontSize={16}
              fontWeight={500}
              onClick={(e) => onLink(e, '/buycar/buyCarList?type=EW')}
            />
          </Buttons>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="dealing service-top-banner">
        <div className="content-wrap">
          <h3 style={{paddingTop: 93}}>EW 상품</h3>
          <p>합리적인 가격으로 오토벨만의 EW(연장 보증) 상품를 구매하세요.<br />전체 차량 중 <b>#EW보증</b> 해시태그를 확인하세요.</p>
          <i className="top-banner-bg ew"></i>
        </div>
      </div>
      <div className="content-wrap service-guide ew">
        <div className="ew-service">
          <h4 className="service-tit">
            오토벨 <em>EW 상품</em>이란?
          </h4>
          <p className="service-exp">오토벨이 직접 인증한 차량을 신차처럼 보증받는 EW(연장 보증) 서비스입니다.</p>
        </div>
        <h4>
          오토벨 <em>EW 상품을 선택하는 이유</em>
        </h4>
        <ul className="service-point">
          <li>
            <i className="ico-relax"></i>
            <p>안심차량</p>
            <span>오토벨이 직접 인증한 차량</span>
          </li>
          <li>
            <i className="ico-secured"></i>
            <p>보증 범위</p>
            <span>
              자동차의 모든 것을 보증
              <br />
              (일부 소모품 제외)
            </span>
          </li>
          <li>
            <i className="ico-rational"></i>
            <p>합리적</p>
            <span>기간, 가격 등 합리적인 상품 구성</span>
          </li>
        </ul>
      </div>
      <div className="content-sec">
        <div className="content-wrap service-use">
          <h4 className="service-tit">
            EW 보증 서비스 <em>이용 방법</em>
          </h4>
          <ul className="use-step">
            <li></li>
            <li>
              <div className="img-wrap">
                <img src="/images/contents/ew-info-01.png" alt="구매 차량 결정" />
              </div>
              <i className="ico-point"><i className="line"></i></i>
              <p>
                <span className="step">STEP 01</span>
                <span className="tit">차량 구매</span>
                <span className="exp">
                  오토벨이 인증한 EW 구매 가능 차량을
                  <br />
                  검색, 구매하세요
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className="step">STEP 02</span>
                <span className="tit">가입신청</span>
                <span className="exp">온라인 및 판매점을 통해 EW 상품에 가입 하세요</span>
              </p>
              <i className="ico-point"><i className="line"></i></i>
              <div className="img-wrap object">
                <img src="/images/contents/ew-info-02.png" alt="온라인 구매 신청" />
              </div>
            </li>
            <li>
              <div className="img-wrap object payment">
                <img src="/images/contents/ew-info-03r.png" alt="결제" />
              </div>
              <i className="ico-point"><i className="line"></i></i>
              <p>
                <span className="step">STEP 03</span>
                <span className="tit">수리 접수</span>
                <span className="exp">콜센터(1600-0080)을 통해 24시간 접수 해주세요</span>
              </p>
            </li>
            <li>
              <p>
                <span className="step">STEP 04</span>
                <span className="tit">제휴 공업사 방문</span>
                <span className="exp">콜센터에서 안내한 제휴 공업사로 방문 해주세요</span>
              </p>
              <i className="ico-point"><i className="line"></i></i>
              <div className="img-wrap">
                <img src="/images/contents/ew-info-04.png" alt="상담" />
              </div>
            </li>
            <li>
              <div className="img-wrap object">
                <img src="/images/contents/ew-info-05.png" alt="차량 배송" />
              </div>
              <i className="ico-point"><i className="line"></i></i>
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
                <span className="exp">
                  수리가 완료 되면 자기부담금을 정산 합니다.
                  <br />
                  딜리버리 서비스를 통해서 고객님이 원하는
                  <br />
                  장소로 배송 합니다.
                </span>
              </p>
              <i className="ico-point"><i className="line"></i></i>
              <div className="img-wrap">
                <img src="/images/contents/ew-info-06.png" alt="구매확정" />
              </div>
            </li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="content-wrap guarantee-wrap">
        <h4>보증범위안내</h4>
        <TabMenu type="type1" mount={false}>
          <TabCont tabTitle="보장범위/한도" id="tab1" index={0}>
            <table summary="보장범위/한도에 대한 내용" className="table-tp1 th-c">
              <caption className="away">보장범위/한도</caption>
              <colgroup>
                <col width="20%" />
                <col width="80%" />
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
                    1. 실린더블록 및 다음의 내부부품
                    <br />
                    크랭크샤프트 및 베어링세트, 크랭크샤프트 리어오일씰 및 가스켓, 케이스앗세이 및 가스켓,
                    <br />
                    오일펌프앗세이, 커넥팅로드앗세이 및 베어링세트, 피스톤링 및 링세트, 프론트오일씰, 엔진바디씰링 및 가스켓,
                    <br />
                    오링팬, 플라이휠, 밸런스샤프트, 흡기 및 배기 매니폴드 및 가스켓
                    <br />
                    <br />
                    2. 실린더헤드 및 다음의 내부부품
                    <br />
                    실린더헤드전체, 캠샤프트, 밸브가이드, 밸브스템씰, 실린더헤드가스켓, 밸브커버 및 밸브스프링,
                    <br />
                    로커암 및 푸싱로드, 로커커버가스켓, 실린더
                    <br />
                    헤드 내부가스켓 및 씰링, 실린더헤드 내부밸브 및 구성품
                    <br />
                    <br />
                    3. 기 타 타이밍벨트 및 풀리, 타이밍체인 및 스프로킷, 타이밍커버, 타이밍벨트 텐셔너, 워터펌프, 써모스타트 및 하우징,
                    <br />
                    터보차져, 인젝션펌프, 엔진오일쿨러
                  </td>
                </tr>
                <tr>
                  <th>미션</th>
                  <td>
                    1. 자동변속기 및 다음의 내부부품
                    <br />
                    트랜스퍼케이스 및 내부부품, 토크컨버터앗세이, 토크컨버터 하우징 앗세이, 트랜스미션바디씰링 및 가스켓,
                    <br />
                    오일펌프, 프론트/리어 클러치, 로우 및 리버스 브레이크 앗세이, 킥다운밴드 및 드럼, 로우 및 하이 클러치, 기어세트,
                    <br />
                    베어링, 샤프트, 밸브바디, 솔레노이드밸브, 구동 플레이트, 인터널디스크, 인터널 씰링 및 가스켓
                    <br />
                    <br />
                    2. 수동변속기 및 다음의 내부부품
                    <br />
                    트랜스퍼케이스, 클러치하우징, 디퍼렌셜 및 기어세트, 인풋 및 아웃풋 샤프트, 싱크로나이져, 기어, 베어링, 샤프트,
                    <br />
                    인터널 디스크, 인터널 씰링 및 가스켓
                    <br />
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
                  <th>조향장치</th>
                  <td>스티어링 펌프, 스티어링 기어, 스티어링 조인트, 고압호스, 타이로드, 볼 조인트</td>
                </tr>
                <tr>
                  <th>전장품</th>
                  <td>알터네이터, 스타트 모터, 와이퍼 모터, 라디에이터 팬 모터, 윈도우 모터, 블로워 모터</td>
                </tr>
              </tbody>
            </table>
            <table summary="보장범위/한도에 대한 내용" className="table-tp1 th-c td-c mt42">
              <caption className="away">보장범위/한도</caption>
              <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
              </colgroup>
              <thead>
                <tr>
                  <th colSpan="3">보상한도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan="2">
                    EW보험
                    <br />
                    보상금액기준
                  </th>
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
              <caption className="away">EW상품구성</caption>
              <colgroup>
                <col width="17%" />
                <col width="17%" />
                <col width="17%" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분</th>
                  <th colSpan="3">보상한도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan="4">
                    EW 보험상품
                    <br />
                    구성
                  </th>
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
            <table summary="가입 대상에 대한 내용" className="table-tp1 th-c">
              <caption className="away">가입대상</caption>
              <colgroup>
                <col width="17%" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>구분</th>
                  <th>대상 차량 조건</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th rowSpan="3">차량기준</th>
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
            <table summary="유의사항에 대한 내용" className="table-tp1 th-c matters">
              <caption className="away">유의사항</caption>
              <colgroup>
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>유의사항</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    1. 다음과 같은 차량은 가입이 제한됩니다.<br />
                      1) 특수차량(튜닝, 특장 등)<br />
                      2) 렌터카, 영업용 차량, 스포츠카, 화물차, 이륜차, 전기차, 수소차, LPG 3,500cc 이상<br />
                      3) 신차 차량가액 1억 5천만원 이상<br /><br />

                    2. 중고차 특성 상, 가입 후 철회 및 환불은 불가합니다.<br />
                      (※ 단, 제조사 일반 부품 보증기간 만료 전이고 보증수리 이력이 없는 경우, 구입 후 15일 내 철회 가능)<br /><br />
                    3. 엔진 관련 부품 및 미션은 재생품 또는 고장 부품 탈거수리 후 사용해야 합니다.<br /><br />
                    4. 성능점검지가 없을 경우, 가입 불가합니다.<br /><br />
                    5. 제조사 보증기간, 성능 점검 보증기간 종료일 시점 중 나중에 도래하는 시점에 본 상품이 개시됩니다.<br /><br />
                    6. 보장 부품 외의 모든 부품은 보장하지 않습니다.<br /><br />
                    7. 본 상품은 오토벨 제휴처인 BNP파리바 카디프 손해보험에서 제공하는 보험상품으로 보험상품과 관련된 모든 책임은 BNP파리바 카디프 손해보험에 있음을 안내 드립니다.<br /><br />

                    <span className="tx-blue80">[문의] BNP파리바 카디프 손해보험 고객센터 1577-5123 (상담시간: 평일 오전 9시~ 오후 6시)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </TabCont>
        </TabMenu>
      </div>
      <Buttons align="center" marginTop={80} marginBottom={140}>
        <Button size="big" background="blue80" title="EW 대상 차량 보러가기" width={300} height={60} onClick={(e) => onLink(e, '/buycar/buyCarList?type=EW')} buttonMarkup={true} />
      </Buttons>
    </AppLayout>
  );
};

export default withRouter(EwProduct);
