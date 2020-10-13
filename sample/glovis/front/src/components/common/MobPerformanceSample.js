import React, { useState, useCallback } from 'react';
import Router from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';

const MobPerformanceSample = () => {
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
  // const onTabClick = useCallback((key) => {
  //   if (+key === 5) {
  //     document.location.href = `https://www.glovisaa.com/cm/fileDownMan.do?menuCd=PDF&filename=CD%2F9EdFVldkmj4UP5X2THKWVWm5GuDn6NSNfn3sr7c8%3D`;
  //     //Router.push('/cm/fileDownMan.do?menuCd=PDF&amp;ilename=CD%2F9EdFVldkmj4UP5X2THKWVWm5GuDn6NSNfn3sr7c8%3D');
  //   }
  // }, []);
  const onFileDownload = useCallback((e) => {
    e.preventDefault();
    document.location.href = `https://www.glovisaa.com/cm/fileDownMan.do?menuCd=PDF&filename=CD%2F9EdFVldkmj4UP5X2THKWVWm5GuDn6NSNfn3sr7c8%3D`;
  }, []);
  return (
    <div className="con-wrap popup-auction">
      <div className={`tabmenu-swipe active-${tabKey}`}>
        <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={3} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
          <TabPane tab="성능점검절차" data-extra="tabpane" key="1">
            <div className="performace-wrap">
              <div className="auction-step tp2">
                <Steps type={2} contents={['전체평가', '실내평가', '외관평가', '엔진룸/\n하체평가', '주행평가']} />
              </div>
              <ul className="process-detail">
                <li>
                  <h4 className="tit4">
                    <span className="tx-blue80 tx-b">01</span> 전체평가
                  </h4>
                  <p className="tx-tp2 mt8">자동차의 전체적인 인상 및 자세 확인(표준사양과의 차이점, 개조유무 등 도장색 상태 등)</p>
                </li>
                <li>
                  <h4 className="tit4">
                    <span className="tx-blue80 tx-b">02</span> 실내평가
                  </h4>
                  <p className="tx-tp2 mt8">실내옵션유무 / 작동성 및 상태확인</p>
                </li>
                <li>
                  <h4 className="tit4">
                    <span className="tx-blue80 tx-b">03</span> 외관평가
                  </h4>
                  <p className="tx-tp2 mt8">외관상태 및 사고유무 확인 (등화장치, 유리, 휠, 타이어 등)</p>
                </li>
                <li>
                  <h4 className="tit4">
                    <span className="tx-blue80 tx-b">04</span> 엔진룸/하체평가
                  </h4>
                  <p className="tx-tp2 mt8">엔진, 미션 기타장비의 성능 및 상태점검 (사고흔적, 누수, 누유 각 부의 상태점검)</p>
                </li>
                <li>
                  <h4 className="tit4">
                    <span className="tx-blue80 tx-b">05</span> 주행평가
                  </h4>
                  <p className="tx-tp2 mt8">엔진, 미션 조향, 현가, 제동장치 등의 종합적인 성능상태 확인</p>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane tab="성능점검표" data-extra="tabpane" key="2">
            <div className="performace-wrap">
              <table summary="기능상태점검에 대한 내용" className="table-tp1 th-c td-c">
                <caption>기능상태점검</caption>
                <colgroup>
                  <col width="8.5%" />
                  <col width="8.5%" />
                  <col width="8.5%" />
                  <col width="8.5%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>기관</th>
                    <td>보통</td>
                    <th>조향</th>
                    <td className="tx-blue80">정비요</td>
                  </tr>
                  <tr>
                    <th>제동</th>
                    <td>보통</td>
                    <th>전기</th>
                    <td>보통</td>
                  </tr>
                  <tr>
                    <th>기관</th>
                    <td>보통</td>
                    <th>동력전달</th>
                    <td>보통</td>
                  </tr>
                  <tr>
                    <th>제동</th>
                    <td>보통</td>
                    <th>실내</th>
                    <td>보통</td>
                  </tr>
                </tbody>
              </table>
              <ul className="car-detail">
                <li>
                  <p className="tit2">평가점</p>
                  <p className="grade">
                    A <em>8</em>
                  </p>
                </li>
                <li>
                  <p className="tit2">점검의견</p>
                  <p className="txt-box">PS이음 / 유격</p>
                </li>
                <li>
                  <p className="tit2">차량상태점검</p>
                  <p>
                    <img src="/images/contents/car-img-top2.png" alt="차량상태점검 이미지" />
                  </p>
                </li>
              </ul>
            </div>
          </TabPane>
          <TabPane tab="평가점기준" data-extra="tabpane" key="3">
            <div className="performace-wrap">
              <p className="tx-tp3">&#8251; 평가결과는 경매장 자체 평가기준에 의해 결정됩니다.</p>
              <p className="tx-tp3">&#8251; 상품(중고차)의 특성으로 인해 평가기관에 따라 그 평가가 달라질 수 있습니다.</p>
              <ul className="m-toggle-list up-blue">
                <MenuItem>
                  <MenuTitle>01 사고평가점</MenuTitle>
                  <MenuCont>
                    <table summary="사고평가점에 대한 내용" className="table-tp1 th-c">
                      <caption className="away">1. 사고평가점</caption>
                      <colgroup>
                        <col width="26%" />
                        <col width="74%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>평점</th>
                          <th>평가기준</th>
                        </tr>
                        <tr>
                          <th>A</th>
                          <td>주요골격 교환이력 없음</td>
                        </tr>
                        <tr>
                          <th>B</th>
                          <td>앞/뒤 패널, 패널 1곳 이내, 주요골격 1곳 이내</td>
                        </tr>
                        <tr>
                          <th>C</th>
                          <td>인사이드 패널, 트렁크플로어 패널 사고, 휠하우스 기준 주요골격 사고차량, B등급 사고 2곳 이상</td>
                        </tr>
                        <tr>
                          <th>D</th>
                          <td>휠하우스 1곳 이내, C등급 사고 2곳 이상</td>
                        </tr>
                        <tr>
                          <th>F</th>
                          <td>플로어패털/프레임 교환 시, 루프/탑 교환, D등급 사고 2곳 이상</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="tx-tp3 mt8">* 주요골격의 교환(xx)유무로만 평가 (주요골격은 사고평가부위 참조)</p>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>02 종합평가점</MenuTitle>
                  <MenuCont>
                    <table summary="종합평가점에 대한 내용" className="table-tp1 th-c">
                      <caption className="away">2. 종합평가점</caption>
                      <colgroup>
                        <col width="26%" />
                        <col width="74%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>평점</th>
                          <th>평가기준</th>
                        </tr>
                        <tr>
                          <th>9</th>
                          <td>감점의 합 : 0 ~ 10점</td>
                        </tr>
                        <tr>
                          <th>8</th>
                          <td>감점의 합 : 11 ~ 25점</td>
                        </tr>
                        <tr>
                          <th>7</th>
                          <td>감점의 합 : 26 ~ 40점</td>
                        </tr>
                        <tr>
                          <th>6</th>
                          <td>감점의 합 : 41 ~ 55점</td>
                        </tr>
                        <tr>
                          <th>5</th>
                          <td>감점의 합 : 56 ~ 70점</td>
                        </tr>
                        <tr>
                          <th>4</th>
                          <td>감점의 합 : 71 ~ 85점</td>
                        </tr>
                        <tr>
                          <th>3</th>
                          <td>감점의 합 : 86 ~ 100점</td>
                        </tr>
                        <tr>
                          <th>2</th>
                          <td>감점의 합 : 101 ~ 115점</td>
                        </tr>
                        <tr>
                          <th>1</th>
                          <td>감점의 합 : 116점 이상</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
                <MenuItem>
                  <MenuTitle>03 표기방법</MenuTitle>
                  <MenuCont>
                    <table summary="표기방법에 대한 내용" className="table-tp1 th-c">
                      <caption className="away">3. 표기방법</caption>
                      <colgroup>
                        <col width="26%" />
                        <col width="74%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>평가종류</th>
                          <th>표기점수</th>
                        </tr>
                        <tr>
                          <th>사고평점</th>
                          <td>A, B, C, D, F</td>
                        </tr>
                        <tr>
                          <th>종합평점</th>
                          <td>9, 8, 7, 6, 5, 4, 3, 2, 1</td>
                        </tr>
                      </tbody>
                    </table>
                  </MenuCont>
                </MenuItem>
              </ul>
            </div>
          </TabPane>
          <TabPane tab="외관표시기준" data-extra="tabpane" key="4">
            <div className="performace-wrap">
              <p className="tx-tp3">&#8251; 출품차량에 대한 평가점(사고평가/종합평가)은 내, 외관 및 주행거리에 한합니다.</p>
              <table summary="외관표시기준에 대한 내용" className="table-tp1 th-c mark-tb mt16">
                <caption className="away">외관표시기준</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="75%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      <span>약어</span>
                      <br />
                      표기방법
                    </th>
                    <th>상세설명</th>
                  </tr>
                  <tr>
                    <td>
                      <span>xx</span>교환
                    </td>
                    <td>
                      <p>볼트체결 : 모든 볼트가 풀린 흔적이 있는 경우 (단.앞판넬 : 펜더나 본넷중 하나만이라도 조정작업이거나 교환이면 교환)</p>
                      <p className="mt8">용접부위 : 잘라낸 부분이 명확히 확인되는 경우, 시작점과 마무리점이 명확</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>pp</span>도장/판금
                    </td>
                    <td>
                      <p>육안으로 확인해서 도장이 들어간 것으로 판단한 경우</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>f</span>꺾임
                    </td>
                    <td>
                      <p>골격부위가 꺾여 있거나, 꺾인 흔적이 있다고 판단한 경우</p>
                      <p className="mt8">골격부위 교환이 없으나 다른 여파로 인한 골격의 꺾임이 확인되는 경우</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>w</span>용접
                    </td>
                    <td>
                      <p>골격부위의 교환수리가 아닌 본래 차량의 부위를 판금 후 용접해서 작업한 경우</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>m</span>조정작업
                    </td>
                    <td>
                      <p>볼트체결부위 중 단 1개라도 풀리지 않은 폴드가 있는 경우</p>
                      <p className="mt8">볼트체결앞판넬 : 팬더나 본넷의 교환이 없고 조정작업도 없을 시 기재</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>x</span>교환필요
                    </td>
                    <td>
                      <p>외관의 찌그러짐이나 부식이 심해서 판넬이 찢어져있거나 떨어진 경우</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>P</span>도장필요
                    </td>
                    <td>
                      <p>외관의 찌그러짐은 없으나 페인트가 긁혀서 도장을 필요하다고 판단 또는 문콕 개수가 3개 이하</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Q</span>판금필요
                    </td>
                    <td>
                      <p>외관의 찌그러짐이 있을 때나 부식으로 인해 판금이 필요하다고 판단 또는 문콕 개수가 3개 이상</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>A</span>상처
                    </td>
                    <td>
                      <p>외관의 상처가 없고 잔기스(광택으로 제거가능)가 있을 시 기재 또는 문콕 개수가 1~2개 이하</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>C</span>부식
                    </td>
                    <td>
                      <p>외관의 부식이 진행되고 있거나, 부식으로 인한 구멍이 발생한 경우</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>
          <TabPane tab="기능상태점검 항목" data-extra="tabpane" key="5">
            <div className="performace-wrap" style={{ textAlign: 'center' }}>
              <Button size="mid" color="blue80" background="blue20" radius={true} title="기능상태점검 항목" width={139} height={38} fontWeight={500} fontSize={14} onClick={onFileDownload} />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MobPerformanceSample;
