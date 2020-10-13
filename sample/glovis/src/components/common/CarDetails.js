import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import RadioGroup from '@lib/share/items/RadioGroup'
import Input from '@lib/share/items/Input'

const CarDetails = ({ mode = "apply" }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer

  return (
    <>
      {
        isMode === "apply" &&
        <fieldset>
          <legend className="away">자동차 세부사항</legend>
          <table summary="자동차 세부사항" className="table-tp1 input th-c td-c">
            <caption>자동차 세부사항</caption>
            <colgroup>
              <col width="20%" />
              <col width="15%" />
              <col width="20%" />
              <col width="*" />
            </colgroup>
            <thead>
              <tr>
                <th>장치</th>
                <th>항목</th>
                <th>해당부품</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="2">자기진단</td>
                <td colSpan="2">원동기</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state5', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state6', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">변속기</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state7', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state8', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="9">원동기</td>
                <td colSpan="2">작동상태(공회전)</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state9', value: 1, checked: true, disabled: false, title: '적정' },
                    { id: 'state10', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">오일누유</td>
                <td>로커암커버</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state11', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state12', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state13', value: 3, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>실린더 헤더/가스켓</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state14', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state15', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state16', value: 3, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>오일팬</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state17', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state18', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state19', value: 3, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">오일유량</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state20', value: 1, checked: true, disabled: false, title: '적정' },
                    { id: 'state21', value: 2, checked: false, disabled: false, title: '부족' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="4">냉각수 누수</td>
                <td>실린더 헤드/가스켓</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state22', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state23', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state24', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>워터 펌프</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state25', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state26', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state27', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>라디에이터</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state28', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state29', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state30', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>냉각수 수량</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state31', value: 1, checked: true, disabled: false, title: '적정' },
                    { id: 'state32', value: 2, checked: false, disabled: false, title: '부족' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">변속기</td>
                <td rowSpan="3">자동변속기<br />(A/T)</td>
                <td>오일누유</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state33', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state34', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state35', value: 3, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>오일 누유 및 상태</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state36', value: 1, checked: true, disabled: false, title: '적정' },
                    { id: 'state37', value: 2, checked: false, disabled: false, title: '부족' },
                    { id: 'state38', value: 3, checked: false, disabled: false, title: '과다' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>작동상태(공회전)</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state39', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state40', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">동력전달</td>
                <td colSpan="2">클러치 어셈블리</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state41', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state42', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">등속죠인트</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state43', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state44', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">추진축 및 베어링</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state45', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state46', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>

              <tr>
                <td rowSpan="4">조향</td>
                <td colSpan="2">동력조향 작동 오일누유</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state47', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state48', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state49', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">작동상태</td>
                <td>스티어링 기어</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state50', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state51', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>스티어링 펌프</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state52', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state53', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td>타이로드 앤드 및 볼죠인트</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state54', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state55', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>

              <tr>
                <td rowSpan="3">제동</td>
                <td colSpan="2">브레이크 마스터 실린더오일 누유</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state56', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state57', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state58', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">브레이크 오일 누유</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state59', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state60', value: 2, checked: false, disabled: false, title: '미세누유' },
                    { id: 'state61', value: 2, checked: false, disabled: false, title: '누유' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">배력장치 상태</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state62', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state63', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>

              <tr>
                <td rowSpan="6">전기</td>
                <td colSpan="2">발전기 출력</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state64', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state65', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">시동모터</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state66', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state67', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">와이퍼 모터기능</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state68', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state69', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">살내송풍 모터</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state70', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state71', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">라디에이터 팬 모터</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state72', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state73', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>
              <tr>
                <td colSpan="2">윈도우 모터 작동</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state74', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state75', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
              </tr>

              <tr>
                <td>기타</td>
                <td colSpan="2">연료누출(LP 가스 포함)</td>
                <td className="tl">
                  <RadioGroup dataList={[
                    { id: 'state76', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'state77', value: 2, checked: false, disabled: false, title: '있음' }
                  ]} />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      }
      {
        isMode === "viewer" && (
          !hasMobile
            ? (
              <fieldset>
                <table summary="자동차 세부사항" className="table-tp1 th-c td-c">
                  <caption>자동차 세부사항</caption>
                  <colgroup>
                    <col width="18%" />
                    <col width="32%" />
                    <col width="32%" />
                    <col width="18%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>장치</th>
                      <th>항목</th>
                      <th>해당부품</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowSpan="2">원동기</td>
                      <td colSpan="2">원동기</td>
                      <td>불량</td>
                    </tr>
                    <tr>
                      <td colSpan="2">변속기</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td rowSpan="9">자가진단</td>
                      <td colSpan="2">작동상태(공회전)</td>
                      <td>적정</td>
                    </tr>
                    <tr>
                      <td rowSpan="3">오일누유</td>
                      <td>로커암 커버</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>실린더 헤더/가스켓</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>오일팬</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td colSpan="2">오일유량</td>
                      <td>적정</td>
                    </tr>
                    <tr>
                      <td rowSpan="4">냉각수 누수</td>
                      <td>실린더 헤더/가스켓</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>워터펌프</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>라디에이터</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>냉각수 수량</td>
                      <td>적정</td>
                    </tr>
                    <tr>
                      <td rowSpan="3">변속기</td>
                      <td rowSpan="3">오일누유</td>
                      <td>오일누유</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td>오일유량 및 상태</td>
                      <td>
                        <span>
                          <i className="ico-yes"></i>적정
                          <i className="ico-yes"></i>부족
                          <i className="ico-yes"></i>과다
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>작동상태(공회전)</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td rowSpan="3">동력전달</td>
                      <td colSpan="2">클러치 어셈블리</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">등속죠인트</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">추진축 및 베어링</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td rowSpan="4">조항</td>
                      <td colSpan="2">동력조항 작동 오일누유</td>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <td rowSpan="3">작동상태</td>
                      <td>스티어링 기어</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td>스티어링 펌프</td>
                      <td>불량</td>
                    </tr>
                    <tr>
                      <td>타이로드엔드 및 볼죠인트</td>
                      <td>불량</td>
                    </tr>
                    <tr>
                      <td rowSpan="3">제동</td>
                      <td colSpan="2">브레이크오 마스터 실린더오일 누유</td>
                      <td>미세누유</td>
                    </tr>
                    <tr>
                      <td colSpan="2">브레이크오일 누유</td>
                      <td>누유</td>
                    </tr>
                    <tr>
                      <td colSpan="2">배력장치 상태</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td rowSpan="6">전기</td>
                      <td colSpan="2">발전기 출력</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">시동모터</td>
                      <td>불량</td>
                    </tr>
                    <tr>
                      <td colSpan="2">와이퍼 모터기능</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">실내송풍 모터</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">라디에이터 팬 모터</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td colSpan="2">윈도우 모터 작동</td>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <td>기타</td>
                      <td colSpan="2">연료누출(LP가스 포함)</td>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
              ) : (
              <div className="accident-history-cont">
                <h3>자가진단</h3>
                <table summary="원동기" className="table-tp1">
                  <caption className="away">원동기</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">원동기</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="변속기" className="table-tp1">
                  <caption className="away">변속기</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">변속기</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <h3>원동기</h3>
                <table summary="작동상태(공회전)" className="table-tp1">
                  <caption className="away">작동상태(공회전)</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">작동상태(공회전)</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="오일누유 로커암 커버" className="table-tp1">
                  <caption className="away">오일누유 로커암 커버</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">오일누유 로커암 커버</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="오일누유 실린더 헤더/가스켓" className="table-tp1">
                  <caption className="away">오일누유 실린더 헤더/가스켓</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">오일누유 실린더 헤더/가스켓</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="오일누유 오일팬" className="table-tp1">
                  <caption className="away">오일누유 오일팬</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">오일누유 오일팬</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="오일유량" className="table-tp1">
                  <caption className="away">오일유량</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">오일유량</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="냉각수 누수 실린더 헤드/가스켓" className="table-tp1">
                  <caption className="away">냉각수 누수 실린더 헤드/가스켓</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">냉각수 누수 실린더 헤드/가스켓</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="냉각수 누수 워터펌프" className="table-tp1">
                  <caption className="away">냉각수 누수 워터펌프</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">냉각수 누수 워터펌프</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="냉각수 누수 라디에이터" className="table-tp1">
                  <caption className="away">냉각수 누수 라디에이터</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">냉각수 누수 라디에이터</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="냉각수 누수 라디에이터" className="table-tp1">
                  <caption className="away">냉각수 누수 라디에이터</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">냉각수 누수 냉각수 수량</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>적정</td>
                    </tr>
                  </tbody>
                </table>
                <h3>변속기</h3>
                <table summary="자동변속기(A/T) 오일누유" className="table-tp1">
                  <caption className="away">자동변속기(A/T) 오일누유</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">자동변속기(A/T) 오일누유</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>적정</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="자동변속기(A/T) 오일유량 및 상태" className="table-tp1">
                  <caption className="away">자동변속기(A/T) 오일유량 및 상태</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">자동변속기(A/T) 오일유량 및 상태</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>적정</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="자동변속기(A/T) 작동상태(공회전)" className="table-tp1">
                  <caption className="away">자동변속기(A/T) 작동상태(공회전)</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">자동변속기(A/T) 작동상태(공회전)</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
                <h3>동력전달</h3>
                <table summary="클러치 어셈블리" className="table-tp1">
                  <caption className="away">클러치 어셈블리</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">클러치 어셈블리</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="등속죠인트" className="table-tp1">
                  <caption className="away">등속죠인트</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">등속죠인트</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="추진축 및 베어링" className="table-tp1">
                  <caption className="away">추진축 및 베어링</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">추진축 및 베어링</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <h3>조향</h3>
                <table summary="동력조항 작동 오일 누유" className="table-tp1">
                  <caption className="away">동력조항 작동 오일 누유</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">동력조항 작동 오일 누유</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="스티어링 기어" className="table-tp1">
                  <caption className="away">스티어링 기어</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">스티어링 기어</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>적정</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="자동변속기(A/T) 작동상태(공회전)" className="table-tp1">
                  <caption className="away">자동변속기(A/T) 작동상태(공회전)</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">자동변속기(A/T) 작동상태(공회전)</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="타이어로드엔드 및 볼조인트" className="table-tp1">
                  <caption className="away">타이어로드엔드 및 볼조인트</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">타이어로드엔드 및 볼조인트</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
                <h3>제동</h3>
                <table summary="브레이크 오일 유량상태" className="table-tp1">
                  <caption className="away">브레이크 오일 유량상태</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">브레이크 오일 유량상태</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>적정</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="브레이크 오일 누유" className="table-tp1">
                  <caption className="away">브레이크 오일 누유</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">브레이크 오일 누유</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="배력장치 상태" className="table-tp1">
                  <caption className="away">배력장치 상태</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">배력장치 상태</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <h3>전기</h3>
                <table summary="발전기 출력" className="table-tp1">
                  <caption className="away">발전기 출력</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">발전기 출력</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="시동모터" className="table-tp1">
                  <caption className="away">시동모터</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">시동모터</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="와이퍼기능" className="table-tp1">
                  <caption className="away">와이퍼기능</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">와이퍼기능</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="실내 송풍 모터" className="table-tp1">
                  <caption className="away">실내 송풍 모터</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">실내 송풍 모터</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="라디에이터 팬모터" className="table-tp1">
                  <caption className="away">라디에이터 팬모터</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">라디에이터 팬모터</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <h3>기타</h3>
                <table summary="연료누출" className="table-tp1">
                  <caption className="away">연료누출</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">연료누출</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="윈도우 모터 작동" className="table-tp1">
                  <caption className="away">윈도우 모터 작동</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">윈도우 모터 작동</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              )
        )
      }
    </>
  )
}

export default CarDetails