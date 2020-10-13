import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import CheckBox from '@lib/share/items/CheckBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import { select1_list, color } from '@src/dummy';

const CarStatus = ({ mode = "apply" }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer

  return (
    <>
      {
        isMode === "apply" &&
        <fieldset>
          <legend className="away">자동차 종합상태</legend>
          <table summary="자동차 종합상태에 대한 내용" className="table-tp1 input fs14 th-c">
            <caption>자동차 종합상태</caption>
            <colgroup>
              <col width="20%" />
              <col width="30%" />
              <col width="50%" />
            </colgroup>
            <thead>
              <tr>
                <th>사용이력</th>
                <th>상태</th>
                <th>항목/해당부품</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>주행거리 계기상태</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'state1', value: 1, checked: true, disabled: false, title: '양호' },
                    { id: 'state2', value: 2, checked: false, disabled: false, title: '불량' }
                  ]} />
                </td>
                <td></td>
              </tr>
              <tr>
                <th>주행거리 상태</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'state3', value: 1, checked: true, disabled: false, title: '많음' },
                    { id: 'state4', value: 2, checked: false, disabled: false, title: '보통' },
                    { id: 'state5', value: 2, checked: false, disabled: false, title: '적음' }
                  ]} />
                </td>
                <td>
                  <em className="mr8">현재 주행거리</em>
                  <Input type="text" id="note3" width={122} height={40} />
                  <em>km</em>
                </td>
              </tr>
              <tr>
                <th>차대번호 표기</th>
                <td><SelectBox id="vin-number2" className="items-sbox" options={[
                  { value: 1, label: '양호' },
                  { value: 2, label: '부식' },
                  { value: 3, label: '훼손' },
                  { value: 4, label: '상이' },
                  { value: 5, label: '변조' },
                  { value: 6, label: '도말' }
                ]} placeHolder="양호" width={160} height={40} /></td>
                <td></td>
              </tr>
              <tr>
                <th>배출가스</th>
                <td className="chk-y-wrap">
                  <CheckBox id='chk-gas-co1' title='일산화탄소' />
                  <CheckBox id='chk-gas-hc1' title='탄화수소' />
                </td>
                <td>
                  <span className="bridge2 gas">
                    <span>일산화탄소(CO)</span>
                    <Input type="text" id="gas-co2" width={122} height={40} />
                    <em>%</em>
                  </span>
                  <span className="bridge2 gas">
                    <span>탄화수소(HC)</span>
                    <Input type="text" id="gas-hc2" width={122} height={40} />
                    <em>ppm</em>
                  </span>
                </td>
              </tr>
              <tr>
                <th rowSpan="2">튜닝</th>
                <td rowSpan="2">
                  <RadioGroup dataList={[
                    { id: 'none1', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'exist1', value: 2, checked: false, disabled: false, title: '있음' }
                  ]} />
                </td>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-legality' title='적법' />
                  <CheckBox id='chk-illegality' title='불법' />
                </td>
              </tr>
              <tr>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-structure' title='구조' />
                  <CheckBox id='chk-device' title='장치' />
                </td>
              </tr>
              <tr>
                <th>특별이력</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'none2', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'exist2', value: 2, checked: false, disabled: false, title: '있음' }
                  ]} />
                </td>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-waterlogging' title='침수' />
                  <CheckBox id='chk-fire' title='화재' />
                </td>
              </tr>
              <tr>
                <th>용도변경</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'none3', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'exist3', value: 2, checked: false, disabled: false, title: '있음' }
                  ]} />
                </td>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-rent' title='렌트' />
                  <CheckBox id='chk-lease' title='리스' />
                  <CheckBox id='chk-business' title='영업용' />
                </td>
              </tr>
              <tr>
                <th>색상</th>
                <td><RadioGroup dataList={color} /></td>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-all-painting' title='전체도색' />
                  <CheckBox id='chk-painting' title='색상변경' />
                </td>
              </tr>
              <tr>
                <th>주요옵션</th>
                <td>
                  <RadioGroup dataList={[
                    { id: 'none4', value: 1, checked: true, disabled: false, title: '없음' },
                    { id: 'exist4', value: 2, checked: false, disabled: false, title: '있음' }
                  ]} />
                </td>
                <td className="chk-w-wrap">
                  <CheckBox id='chk-option-other' title='기타' />
                  <CheckBox id='chk-option-sunroof' title='선루프' />
                  <CheckBox id='chk-option-nav' title='네비게이션' />
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
              <fieldset className="car-status">
                <table summary="자동차 종합상태에 대한 내용" className="table-tp1">
                  <caption>자동차 종합상태</caption>
                  <colgroup>
                    <col width="25%" />
                    <col width="37.5%" />
                    <col width="37.5%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>사용이력</th>
                      <th>상태</th>
                      <th>항목 / 해당부품</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>주행거리 계기상태</th>
                      <td>양호</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>주행거리 상태</th>
                      <td>보통</td>
                      <td><em className="mr8">현재 주행거리</em><span>50,000</span><em>km</em></td>
                    </tr>
                    <tr>
                      <th>차대번호 표기</th>
                      <td>양호</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th rowSpan="2">배출가스</th>
                      <td>일산화탄소</td>
                      <td><em className="mr8">일산화탄소(CO)</em><span>0</span><em>%</em></td>
                    </tr>
                    <tr>
                      <td>탄화수소</td>
                      <td><em className="mr8">탄화수소(HC)</em><span>0</span><em>ppm</em></td>
                    </tr>
                    <tr>
                      <th>튜닝</th>
                      <td>없음</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>특별이력</th>
                      <td>없음</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th>용도변경</th>
                      <td>있음</td>
                      <td>렌트</td>
                    </tr>
                    <tr>
                      <th>색상</th>
                      <td>무채색</td>
                      <td>전체도색</td>
                    </tr>
                    <tr>
                      <th>주요옵션</th>
                      <td>없음</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            ) : (
              <div className="accident-history-cont">
                <table summary="주행거리 및 계기상태" className="table-tp1">
                  <caption className="away">주행거리 및 계기상태</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">주행거리 및 계기상태</th>
                    </tr>
                    <tr>
                      <th>계기상태</th>
                      <td>양호</td>
                    </tr>
                    <tr>
                      <th>주행거리상태</th>
                      <td>보통</td>
                    </tr>
                    <tr>
                      <th>현재주행거리</th>
                      <td>10,354km</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="차대번호 표기" className="table-tp1">
                  <caption className="away">차대번호 표기</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">차대번호 표기</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>양호</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="배출가스" className="table-tp1">
                  <caption className="away">배출가스</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">배출가스</th>
                    </tr>
                    <tr>
                      <th>일산화탄소(CO)</th>
                      <td>0.03%</td>
                    </tr>
                    <tr>
                      <th>탄화수소(HC)</th>
                      <td>9 ppm</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="튜닝" className="table-tp1">
                  <caption className="away">튜닝</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">튜닝</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <th>항목</th>
                      <td>&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="용도변경" className="table-tp1">
                  <caption className="away">용도변경</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">용도변경</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <th>항목</th>
                      <td>렌트</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="색상" className="table-tp1">
                  <caption className="away">색상</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">색상</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>무채색</td>
                    </tr>
                    <tr>
                      <th>항목</th>
                      <td>전체도색</td>
                    </tr>
                  </tbody>
                </table>
                <table summary="주요옵션" className="table-tp1">
                  <caption className="away">주요옵션</caption>
                  <colgroup>
                    <col width="40%" />
                    <col width="60%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th colSpan="2" className="tx-c">주요옵션</th>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>없음</td>
                    </tr>
                    <tr>
                      <th>항목</th>
                      <td>&nbsp;</td>
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

export default CarStatus;