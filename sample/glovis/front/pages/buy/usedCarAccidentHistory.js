import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Button from '@lib/share/items/Button';
import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB } from '@src/actions/types';

const usedCarAccidentHistory = ({ router }) => {
  const { result } = router.query;

  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  dispatch({
    type: MOBILE_HEADER_TYPE_SUB,
    data: {
      title: '중고차 사고이력 정보 보고서',
      options: ['close']
    }
  });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // 중고차 사고이력 정보 보고서
  const now = moment();
  const [dep1Panel, setDep1Panel] = useState(0);
  const [dep2Panel, setDep2Panel] = useState(0);
  const tabDep1Click = useCallback((e, idx) => {
    setDep1Panel(idx);
  }, []);
  const tabDep2Click = useCallback((e, idx) => {
    setDep2Panel(idx);
  }, []);

  const [isCal, setIsCal] = useState(false); // 기본값은 false
  const handleCal = useCallback((e) => {
    e.preventDefault();
    setIsCal(true);
  }, []);

  const [agreeReply, setAgreeReply] = useState(false);
  const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);

  if(hasMobile){
    return (
      <AppLayout>
        <div className="used-car-summary">
          <h2>투싼(TUCSAN) 66부00**</h2>
          <p className="info">정보조회일자: 2019-09-27</p>
        </div>
        <div className="content-wrap">
          <ul className="m-toggle-list">
            <MenuItem>
              <MenuTitle>1. 중고차 사고이력 정보(요약)</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">자동차보험 사고기록이 없었다고 해서 반드시 <strong>무사고</strong>라고 할 수는 없습니다.</p>
                  <table summary="중고차 사고이력 정보" className="table-tp1 th-c td-c">
                    <caption className="away">중고차 사고이력 정보</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>잔손보험사고</th>
                        <th>도난보험사고</th>
                        <th>침수보험사고</th>
                        <th>특수용도이력</th>
                      </tr>
                      <tr>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                      </tr>
                      <tr>
                        <th>내차피해</th>
                        <th>상대차피해</th>
                        <th>소유자변경</th>
                        <th>차량번호변경</th>
                      </tr>
                      <tr>
                        <td>
                          <strong>1회</strong><br />
                          1.234만원
                        </td>
                        <td>
                          <strong>1회</strong><br />
                          1.234만원
                        </td>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>2. 자동차 일반 사양 정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">자동차의 일반적인 사양 정보를 제공합니다.</p>
                  <table summary="자동차 사양" className="table-tp1 td-r">
                    <caption className="away">자동차 사양</caption>
                    <colgroup>
                      <col width="35%" />
                      <col width="65%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>제조사</th>
                        <td>현대자동차</td>
                      </tr>
                      <tr>
                        <th>자동차명</th>
                        <td>투싼(Tucson)</td>
                      </tr>
                      <tr>
                        <th>배기량</th>
                        <td>1,995cc</td>
                      </tr>
                      <tr>
                        <th>사용연료</th>
                        <td>디젤</td>
                      </tr>
                      <tr>
                        <th>연식</th>
                        <td>2015</td>
                      </tr>
                      <tr>
                        <th>차체형상</th>
                        <td>SUV</td>
                      </tr>
                      <tr>
                        <th>용도 및 차종</th>
                        <td>자가용 승용</td>
                      </tr>
                      <tr>
                        <th>최종 보험 가입일자</th>
                        <td>2014년 06월 19일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>3. 자동차 특수 용도 이력 정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">과거 자동차번호 변경기록을 모두 검색하여 제공하는 것으로 <strong>대여용(렌트카), 영업용(택시 등)으로 사용된 적이 있는지</strong> 확인할 수 있습니다.</p>
                  <table summary="중고차 사고이력 정보" className="table-tp1 th-c td-c">
                    <caption className="away">중고차 사고이력 정보</caption>
                    <colgroup>
                      <col width="33.4%" />
                      <col width="33.3%" />
                      <col width="33.3%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>대여용도<br />사용이력(렌터카)</th>
                        <th>영업용도<br />사용이력</th>
                        <th>관용용도<br />사용이력</th>
                      </tr>
                      <tr>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>4. 자동차 번호/소유자 변경이력 정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">소유자 변경이력 정보는 <strong>개인 간의 소유 변경 이외에도 매매상사 간 변경(상품용)까지 모두 포함된 횟수로 제공</strong>됩니다. 참고해주시기 바랍니다.</p>
                  <table summary="자동차 사양" className="table-tp1 td-r">
                    <caption className="away">자동차 사양</caption>
                    <colgroup>
                      <col width="35%" />
                      <col width="65%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>변경등록일</th>
                        <td>2014.06.19</td>
                      </tr>
                      <tr>
                        <th>소유자 변경</th>
                        <td>-</td>
                      </tr>
                      <tr>
                        <th>차량번호</th>
                        <td>66부****</td>
                      </tr>
                      <tr>
                        <th>차량용도</th>
                        <td>자가용 승용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>5. 자동차 특수 사고 이력정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">자동차보험에서 보험금이 지급된 자동차사고기록 중 자동차품질에 특별히 영향을 미칠 가능성이 있는 사고<strong>(전손, 도난, 침수사고)</strong>를 확인할 수 있습니다.</p>
                  <table summary="중고차 사고이력 정보" className="table-tp1 th-c td-c">
                    <caption className="away">중고차 사고이력 정보</caption>
                    <colgroup>
                      <col width="33.3%" />
                      <col width="33.3%" />
                      <col width="33.4%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>전손보험사고</th>
                        <th>도난보험사고</th>
                        <th>침수보험사고(분손)</th>
                      </tr>
                      <tr>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                        <td><strong>없음</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <h4>용어사전</h4>
                  <dl className="term-list">
                    <dt>전손 보험사고</dt>
                    <dd>손상된 자동차의 수리비용이 자동차가치(보험회사에서 적정하다고 인정한)를 초과한 경우(추정전손) 및 손상된 자동차의 수리가 불가능하거나 수리를 하더라도 자동차로서의 기능을 다할 수 없는 경우(절대전손)로 자동차보험에서 보상처리 받은 사고</dd>
                    <dt>도난 보험사고</dt>
                    <dd>자동차를 도난 당하여 경찰서에 신고한지 30일이 지나도록 도난 당한 자동차를 찾지 못하여 자동차 보험에서 보상처리 받은 사고</dd>
                    <dt>침수 보험사고</dt>
                    <dd>자동차를 운행하던 중 자동차 내부로 물이 들어와 시동이 꺼지거나, 주차 중 엔진 등에 물이 들어가 운행이 불가능하게 되어 자동차에 손해가 발생한 경우</dd>
                  </dl>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>6. 보험사고 이력 상세 정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <p className="intro">66부9732 차량이 자기차량손해담보에 <strong>가입하지 않은 동안에는 내 보험으로 처리한 사고이력정보의 제공이 불가능</strong>합니다. (미가입기간: -)</p>
                  <ul className="desc-list">
                    <li>보험금 및 수리(견적)비 출처에 따라서 <strong>'가입한 보험사에서 지급된 경우(내차 보험)'와 '다른 차량 보험에서 지급된 경우(상대 보험)'로 나뉘어 제공</strong>됩니다.</li>
                    <li>자동차사고로 상대 차량 또는 재물에 발생한 <strong>손해를 내 보험금에서 지급된 경우의 정보를 제공</strong>합니다.</li>
                  </ul>
                  <p className="reminders">※ 쌍방과실로 해당 자동차의 손상, 수리 기록이 내차 보험과 상대 보험에서 동시에 처리된 경우에는 '내차 보험’ 에만 표시되고 '상대 보험'에서는 생략됩니다. </p>
                  <TabMenu type="type1" mount={false} isFix={false}>
                    <TabCont tabTitle="내차 사고" id="tab2-1" index={0} className="w-fix-btn">
                      <div className="insurance-history">
                        <h4>2019.06.11</h4>
                        <table summary="내 차 보험(처리)" className="table-tp1 td-r">
                          <caption className="away">자동차 사양</caption>
                          <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>내 차 보험(처리)</th>
                              <td><strong>미확정</strong></td>
                            </tr>
                          </tbody>
                        </table>
                        <button type="button" className="partial-loss">분손</button>
                      </div>
                      <div className="insurance-history">
                        <h4>2019.04.11</h4>
                        <table summary="내 차 보험(처리)" className="table-tp1 td-r">
                          <caption className="away">자동차 사양</caption>
                          <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>내 차 보험(처리)</th>
                              <td><strong>850,873</strong>원</td>
                            </tr>
                            <tr>
                              <th>부품</th>
                              <td>18.715원</td>
                            </tr>
                            <tr>
                              <th>공임</th>
                              <td>366.715원</td>
                            </tr>
                            <tr>
                              <th>도장</th>
                              <td>456.715원</td>
                            </tr>
                          </tbody>
                        </table>
                        <button type="button" className="partial-loss">분손</button>
                      </div>
                    </TabCont>
                    <TabCont tabTitle="상대차 사고" id="tab2-2" index={1}>
                      <div className="insurance-history">
                        <h4>2019.04.11</h4>
                        <table summary="상대 차 보험(처리)" className="table-tp1 td-r">
                          <caption className="away">자동차 사양</caption>
                          <colgroup>
                            <col width="50%" />
                            <col width="50%" />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th>상대 차 보험(처리)</th>
                              <td><strong>850,873</strong>원</td>
                            </tr>
                            <tr>
                              <th>부품</th>
                              <td>18.715원</td>
                            </tr>
                            <tr>
                              <th>공임</th>
                              <td>366.715원</td>
                            </tr>
                            <tr>
                              <th>도장</th>
                              <td>456.715원</td>
                            </tr>
                          </tbody>
                        </table>
                        <button type="button" className="partial-loss">분손</button>
                      </div>
                    </TabCont>
                  </TabMenu>
                  <ul className="desc-list">
                    <li><strong>카히스토리 자료수집 방법상 일부 오류가 발생 할 수 있습니다.</strong> 의심되는 사항이 있으시면 전화주시기 바랍니다.</li>
                    <li>위 ‘수리(견적)비용’은 보험사가 지급하는 보험금 중에서 대차료, 휴차료 등 간접손해와 과실상계액 등을 제외한 수리 및 견적(부품/공임/도장) 비용으로 <strong>실제 지급된 보험금과 차이가 있습니다.</strong></li>
                    <li>보험사고 이력은 <strong>최근 10건의 사고만 표시</strong> 됩니다.</li>
                  </ul>
                  <h4>용어사전</h4>
                  <dl className="term-list">
                    <dt>수리(견적)비용</dt>
                    <dd>자동차사고로 자동차가 손상된 경우 보험회사가 지급하는 보험금 중에서 자동차 운반비, 대차료(렌트비용), 휴차료 등의 간접손해와 과실상계액 등을 제외한, 자동차를 수리하는데 소요되는 비용 또는 견적으로 부품비용, 공임 및 도장료로 이루어집니다</dd>
                    <dt>미가입기간</dt>
                    <dd>자기차량손해담보 미가입기간으로 해당기간에 대해서는 자기차량손해담보에 의해 지급된 자동차수리비 정보를 제공할 수 없는 기간</dd>
                    <dt>내차보험</dt>
                    <dd>내 보험으로 처리한 내 차 사고 (대인사고 제외)</dd>
                    <dt>상대보험</dt>
                    <dd>다른 차량 보험으로 처리한 내 차 사고 (대인사고 제외)</dd>
                    <dt>상대차피해</dt>
                    <dd>내 보험으로 처리한 내 상대차 사고 (대인사고 제외)</dd>
                  </dl>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>7. 부가 이용정보</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <ul className="matters-list">
                    <li>본 중고차 사고이력정보는 정보조회일자를 기준으로 작성된 것입니다.</li>
                    <li>본 정보는 자동차 일반정보로서 조회 차량을 확인하기 위하여 참고로 제공하는 것이며, 일부 차량의 경우, 정보의 누락이나 오류가 있을 수 있습니다.</li>
                    <li>침수사고에는 경미한 부분침수도 포함되며, 자료의 누락으로 ‘이력 없음’ 으로 표시되는 경우가 있습니다.</li>
                    <li>카히스토리 자료수집 방법상 오류가 발생할 수 있으니 의심되는 사항이 있으시면 전화 주시기 바랍니다.</li>
                    <li>수리비용은 보험사에서 지급되는 보험금 산정을 위하여 책정된 차량 수리 관련 항목만의 비용으로 실제 지급받은 보험금과 차이가 있을 수 있습니다.</li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>8. 서비스 이용 제한 안내</MenuTitle>
              <MenuCont>
                <div className="accident-history-cont">
                  <ul className="matters-list">
                    <li>중고차 사고이력정보 서비스는 자동차 보험을 취급하는 11개 손해보험사의 자동차 보험수리 지급기록(1996년 이후)에 근거하여 제공하고 있습니다. 따라서 다음과 같은 경우는 중고차 이력정보 서비스를 제공할 수 없습니다.
                      <ul>
                        <li>사고신고를 하였더라도 보험회사에서 사고신고를 하지 않고 자비로 처리한 경우
                          <ul>
                            <li>사고신고를 하였더라도 면책, 취소 등의 사유로 지급되지 않은 경우</li>
                            <li>사고신고 후 자비로 처리한 경우</li>
                          </ul>
                        </li>
                        <li>자동차보험이 아닌 운수 공제(택시공제,화물공제,버스공제 등)에 가입되어 운수공제로 부터 자동차의 피해에 대한 손해를 보상받은 경우 등</li>
                      </ul>
                    </li>
                    <li>본 중고차 사고이력 정보는 중고차 품질확인은 위한 보조정보이며 결정적 판단자료로 사용되어서는 아니됩니다. 따라서 정밀한 중고차 품질확인을 윈하시면 차량진단 전문업체의 진단을 받아보시기 바랍니다.</li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <div className="about-accident-history-service">
            <h3>중고차사고이력정보서비스는?</h3>
            <p>
              중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여,<br />
              보험개발원에서 보유하고 있거나 수집한 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.<br />
              본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.<br />
              따라서 본 정보의 확대해석이나 오·남용으로 발생하는 사항에 대해서 보험개발원은 어떤 책임도 부담하지 아니합니다.
            </p>
            <ul>
              <li><strong>중고차 거래<br />활성화</strong></li>
              <li><strong>매매시장<br />투명성</strong></li>
            </ul>
            <p>
              보험개발원(<Link href=""><a>www.kidi.or.kr</a></Link>{/* https://www.kidi.or.kr/home/homeIndex.do */})은 보험입법 제176조에 의하여 설립된 보험요율산출기관이며, 중고차사고이력정보서비스(<Link href=""><a>www.carhistory.or.kr</a></Link>{/* https://www.carhistory.or.kr/main.car?realm= */})는 보험업법시행령 제86조 제1호 근거하여 제공합니다.
            </p>
            <p className="sign">
              <time dateTime="2019-07-12">2019.07.12</time><br />
              <strong>보험개발원</strong>
            </p>
          </div>
        </div>
      </AppLayout>
    )
  }
  
  return (
    <AppLayout>
      모바일 전용 페이지입니다.
    </AppLayout>
  )
}

export default withRouter(usedCarAccidentHistory);