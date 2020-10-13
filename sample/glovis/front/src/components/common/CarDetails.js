import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import RadioGroup from '@lib/share/items/RadioGroup';
import Radio from '@lib/share/items/Radio';
import Button from '@lib/share/items/Button';

const sttTypeA = [
  { title: '양호', value: 0 },
  { title: '불량', value: 1 }
];

const sttTypeB = [
  { title: '적정', value: 0 },
  { title: '불량', value: 1 }
];

const sttTypeC = [
  { title: '없음', value: 0 },
  { title: '미세누유', value: 1 },
  { title: '누유', value: 2 }
];

const sttTypeD = [
  { title: '적정', value: 0 },
  { title: '부족', value: 1 }
];

const sttTypeE = [
  { title: '적정', value: 0 },
  { title: '부족', value: 1 },
  { title: '과다', value: 2 }
];

const CarDetails = memo(({ perfData, mode = 'apply', callback }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const numberToMsg = (number, target) => {
    const num = Number(number);
    let msg = '';
    if (num === 0) {
      if (target === 'state1') msg = '양호';
      if (target === 'state2') msg = '적정';
      if (target === 'state3') msg = '없음';
      if (target === 'state4') msg = '적정';
      if (target === 'state5') msg = '적정';
      if (target === 'state6') msg = '없음';
    } else if (num === 1) {
      if (target === 'state1') msg = '불량';
      if (target === 'state2') msg = '불량';
      if (target === 'state3') msg = '미세누유';
      if (target === 'state4') msg = '부족';
      if (target === 'state5') msg = '부족';
      if (target === 'state6') msg = '있음';
    } else if (num === 2) {
      if (target === 'state3') msg = '누유';
      if (target === 'state5') msg = '과다';
    }
    return msg;
  };

  const [mainDeviceData, setMainDeviceData] = useState(perfData?.mainDevice);
  const handleConfirm = (e) => {
    if (callback) callback(e, mainDeviceData);
  };

  const handleChangeMainDevice = (e) => {
    const { name, value } = e.target;
    if (hasMobile) {
      const newMainDeviceData = Object.assign({ ...mainDeviceData }, { [name]: parseInt(value) });
      setMainDeviceData(newMainDeviceData);
    }
  };

  return (
    <>
      {mode === 'apply' &&
        (!hasMobile ? (
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
                    <RadioGroup
                      dataList={[
                        { id: 'state5', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state6', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">변속기</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state7', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state8', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="9">원동기</td>
                  <td colSpan="2">작동상태(공회전)</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state9', value: 1, checked: true, disabled: false, title: '적정' },
                        { id: 'state10', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="3">오일누유</td>
                  <td>로커암 커버</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state11', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state12', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state13', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>실린더 헤더/가스켓</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state14', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state15', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state16', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>오일팬</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state17', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state18', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state19', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">오일유량</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state20', value: 1, checked: true, disabled: false, title: '적정' },
                        { id: 'state21', value: 2, checked: false, disabled: false, title: '부족' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="4">냉각수 누수</td>
                  <td>실린더 헤드/가스켓</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state22', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state23', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state24', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>워터 펌프</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state25', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state26', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state27', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>라디에이터</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state28', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state29', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state30', value: 2, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>냉각수 수량</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state31', value: 1, checked: true, disabled: false, title: '적정' },
                        { id: 'state32', value: 2, checked: false, disabled: false, title: '부족' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="3">변속기</td>
                  <td rowSpan="3">
                    자동변속기
                    <br />
                    (A/T)
                  </td>
                  <td>오일누유</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state33', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state34', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state35', value: 3, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>오일 유량 및 상태</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state36', value: 1, checked: true, disabled: false, title: '적정' },
                        { id: 'state37', value: 2, checked: false, disabled: false, title: '부족' },
                        { id: 'state38', value: 3, checked: false, disabled: false, title: '과다' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>작동상태(공회전)</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state39', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state40', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="3">동력전달</td>
                  <td colSpan="2">클러치 어셈블리</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state41', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state42', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">등속죠인트</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state43', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state44', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">추진축 및 베어링</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state45', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state46', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>

                <tr>
                  <td rowSpan="4">조향</td>
                  <td colSpan="2">동력조향 작동 오일누유</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state47', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state48', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state49', value: 2, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="3">작동상태</td>
                  <td>스티어링 기어</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state50', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state51', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>스티어링 펌프</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state52', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state53', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td>타이로드 앤드 및 볼죠인트</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state54', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state55', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>

                <tr>
                  <td rowSpan="3">제동</td>
                  <td colSpan="2">브레이크 마스터 실린더오일 누유</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state56', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state57', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state58', value: 2, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">브레이크 오일 누유</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state59', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state60', value: 2, checked: false, disabled: false, title: '미세누유' },
                        { id: 'state61', value: 2, checked: false, disabled: false, title: '누유' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">배력장치 상태</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state62', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state63', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>

                <tr>
                  <td rowSpan="6">전기</td>
                  <td colSpan="2">발전기 출력</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state64', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state65', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">시동모터</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state66', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state67', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">와이퍼 모터기능</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state68', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state69', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">실내송풍 모터</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state70', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state71', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">라디에이터 팬 모터</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state72', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state73', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">윈도우 모터 작동</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state74', value: 1, checked: true, disabled: false, title: '양호' },
                        { id: 'state75', value: 2, checked: false, disabled: false, title: '불량' }
                      ]}
                    />
                  </td>
                </tr>

                <tr>
                  <td>기타</td>
                  <td colSpan="2">연료누출(LP 가스 포함)</td>
                  <td className="tl">
                    <RadioGroup
                      dataList={[
                        { id: 'state76', value: 1, checked: true, disabled: false, title: '없음' },
                        { id: 'state77', value: 2, checked: false, disabled: false, title: '있음' }
                      ]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ) : (
          <div className="accident-history-cont pd20">
            <table summary="자가진단" className="table-tp1 th-c">
              <caption>자가진단</caption>
              <colgroup>
                <col width="40.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>원동기</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              id={`selfDnsMortor-${i}`}
                              onChange={handleChangeMainDevice}
                              name="selfDnsMortor"
                              value={stt?.value}
                              checked={mainDeviceData?.selfDnsMortor}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>변속기</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              id={`selfDnsMss-${i}`}
                              onChange={handleChangeMainDevice}
                              name="selfDnsMss"
                              value={stt?.value}
                              checked={mainDeviceData?.selfDnsMss}
                              label={stt.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="원동기" className="table-tp1 th-c mt32">
              <caption>원동기</caption>
              <colgroup>
                <col width="16%" />
                <col width="24.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2">작동상태(공회전)</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeB.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorWkStt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorWkStt"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorWkStt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th rowSpan="3">
                    오일
                    <br />
                    누유
                  </th>
                  <th>로커암 커버</th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorOilLkRocArmCov-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorOilLkRocArmCov"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorOilLkRocArmCov}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>
                    실린더 헤더
                    <br />
                    /가스켓
                  </th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorCylHd-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorCylHd"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorCylHd}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>오일팬</th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorOilLkOilFan-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorOilLkOilFan"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorOilLkOilFan}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">오일유량</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeD.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorOilFlowRtCntm-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorOilFlowRtCntm"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorOilFlowRtCntm}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th rowSpan="4">
                    냉각수
                    <br />
                    누수
                  </th>
                  <th>
                    실린더 헤드
                    <br />
                    /가스켓
                  </th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorClngwtrLkCylhd-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorClngwtrLkCylhd"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorClngwtrLkCylhd}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>워터펌프</th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorClngwtrLkWtrpmp-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorClngwtrLkWtrpmp"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorClngwtrLkWtrpmp}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>라디에이터</th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorClngwtrRdar-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorClngwtrRdar"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorClngwtrRdar}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>냉각수 수량</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeD.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mortorClngwtrLkClngwtrAmount-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mortorClngwtrLkClngwtrAmount"
                              value={stt?.value}
                              checked={mainDeviceData?.mortorClngwtrLkClngwtrAmount}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="변속기" className="table-tp1 th-c mt32">
              <caption>변속기</caption>
              <colgroup>
                <col width="16%" />
                <col width="24.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th rowSpan="3">
                    자동
                    <br />
                    변속기
                    <br />
                    (A/T)
                  </th>
                  <th>오일누유</th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mssAtTmOilLkage-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mssAtTmOilLkage"
                              value={stt?.value}
                              checked={mainDeviceData?.mssAtTmOilLkage}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>
                    오일누유
                    <br />및 상태
                  </th>
                  <td>
                    <ul className="radio-block tp4 col3">
                      {sttTypeE.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mssAtTmOilFlowRtStt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mssAtTmOilFlowRtStt"
                              value={stt?.value}
                              checked={mainDeviceData?.mssAtTmOilFlowRtStt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>
                    작동상태
                    <br />
                    (공회전)
                  </th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`mssAtTmWkStt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="mssAtTmWkStt"
                              value={stt?.value}
                              checked={mainDeviceData?.mssAtTmWkStt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="동력전달" className="table-tp1 th-c mt32">
              <caption>동력전달</caption>
              <colgroup>
                <col width="40.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>클러치 어셈블리</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`powerTransCltcAssem-${i}`}
                              onChange={handleChangeMainDevice}
                              name="powerTransCltcAssem"
                              value={stt?.value}
                              checked={mainDeviceData?.powerTransCltcAssem}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>등속죠인트</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`powerTransConsJoin-${i}`}
                              onChange={handleChangeMainDevice}
                              name="powerTransConsJoin"
                              value={stt?.value}
                              checked={mainDeviceData?.powerTransConsJoin}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>추진축 및 베어링</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`powerTransPropellerBear-${i}`}
                              onChange={handleChangeMainDevice}
                              name="powerTransPropellerBear"
                              value={stt?.value}
                              checked={mainDeviceData?.powerTransPropellerBear}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="조향" className="table-tp1 th-c mt32">
              <caption>조향</caption>
              <colgroup>
                <col width="16%" />
                <col width="24.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th colSpan="2">동력조향 작동 오일누유</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`powerSteerWkOilLkage-${i}`}
                              onChange={handleChangeMainDevice}
                              name="powerSteerWkOilLkage"
                              value={stt?.value}
                              checked={mainDeviceData?.powerSteerWkOilLkage}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th rowSpan="3">작동상태</th>
                  <th>스티어링 기어</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`strgGear-${i}`}
                              onChange={handleChangeMainDevice}
                              name="strgGear"
                              value={stt?.value}
                              checked={mainDeviceData?.strgGear}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>스티어링 펌프</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`wkSttStrgPmp-${i}`}
                              onChange={handleChangeMainDevice}
                              name="wkSttStrgPmp"
                              value={stt?.value}
                              checked={mainDeviceData?.wkSttStrgPmp}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>타이로드 앤드 및 볼죠인트</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`wkSttTre-${i}`}
                              onChange={handleChangeMainDevice}
                              name="wkSttTre"
                              value={stt?.value}
                              checked={mainDeviceData?.wkSttTre}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="제동" className="table-tp1 th-c mt32">
              <caption>제동</caption>
              <colgroup>
                <col width="40.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>브레이크 마스터 실린더오일 누유</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`brkBrkeMstCylOilLk-${i}`}
                              onChange={handleChangeMainDevice}
                              name="brkBrkeMstCylOilLk"
                              value={stt?.value}
                              checked={mainDeviceData?.brkBrkeMstCylOilLk}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>브레이크 오일 누유</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeC.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`brkBrkeOilLkage-${i}`}
                              onChange={handleChangeMainDevice}
                              name="brkBrkeOilLkage"
                              value={stt?.value}
                              checked={mainDeviceData?.brkBrkeOilLkage}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>배력장치 상태</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`brkBstStt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="brkBstStt"
                              value={stt?.value}
                              checked={mainDeviceData?.brkBstStt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="전기" className="table-tp1 th-c mt32">
              <caption>전기</caption>
              <colgroup>
                <col width="40.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>발전기 출력</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltGenOput-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltGenOput"
                              value={stt?.value}
                              checked={mainDeviceData?.eltGenOput}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>시동모터</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltStrtMt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltStrtMt"
                              value={stt?.value}
                              checked={mainDeviceData?.eltStrtMt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>와이퍼 모터기능</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltWiperFlct-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltWiperFlct"
                              value={stt?.value}
                              checked={mainDeviceData?.eltWiperFlct}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>실내송풍 모터</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltInsBlowMt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltInsBlowMt"
                              value={stt?.value}
                              checked={mainDeviceData?.eltInsBlowMt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>라디에이터 팬 모터</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltRdarFanMt-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltRdarFanMt"
                              value={stt?.value}
                              checked={mainDeviceData?.eltRdarFanMt}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>윈도우 모터 작동</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`eltWindMtWk-${i}`}
                              onChange={handleChangeMainDevice}
                              name="eltWindMtWk"
                              value={stt?.value}
                              checked={mainDeviceData?.eltWindMtWk}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="기타" className="table-tp1 th-c mt32">
              <caption>기타</caption>
              <colgroup>
                <col width="40.5%" />
                <col width="59.5%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>연료누출(LP 가스 포함)</th>
                  <td>
                    <ul className="radio-block tp4">
                      {sttTypeA.map((stt, i) => {
                        return (
                          <li key={i}>
                            <Radio
                              className="txt"
                              key={i}
                              id={`etcFuelLkage-${i}`}
                              onChange={handleChangeMainDevice}
                              name="etcFuelLkage"
                              value={stt?.value}
                              checked={mainDeviceData?.etcFuelLkage}
                              label={stt?.title}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>

            <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleConfirm} />
          </div>
        ))}
      {mode === 'viewer' &&
        (!hasMobile ? (
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
                  <td rowSpan="2">자가진단</td>
                  <td colSpan="2">원동기</td>
                  <td>{numberToMsg(perfData?.selfDnsMortor, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">변속기</td>
                  <td>{numberToMsg(perfData?.selfDnsMss, 'state1')}</td>
                </tr>
                <tr>
                  <td rowSpan="9">원동기</td>
                  <td colSpan="2">작동상태(공회전)</td>
                  <td>{numberToMsg(perfData?.mortorWkStt, 'state2')}</td>
                </tr>
                <tr>
                  <td rowSpan="3">오일누유</td>
                  <td>로커암 커버</td>
                  <td>{numberToMsg(perfData?.mortorOilLkRocArmCov, 'state3')}</td>
                </tr>
                <tr>
                  <td>실린더 헤더/가스켓</td>
                  <td>{numberToMsg(perfData?.mortorCylHd, 'state3')}</td>
                </tr>
                <tr>
                  <td>오일팬</td>
                  <td>{numberToMsg(perfData?.mortorOilLkOilFan, 'state3')}</td>
                </tr>
                <tr>
                  <td colSpan="2">오일유량</td>
                  <td>{numberToMsg(perfData?.mortorOilFlowRtCntm, 'state4')}</td>
                </tr>
                <tr>
                  <td rowSpan="4">냉각수 누수</td>
                  <td>실린더 헤더/가스켓</td>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkCylhd, 'state3')}</td>
                </tr>
                <tr>
                  <td>워터 펌프</td>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkWtrpmp, 'state3')}</td>
                </tr>
                <tr>
                  <td>라디에이터</td>
                  <td>{numberToMsg(perfData?.mortorClngwtrRdar, 'state3')}</td>
                </tr>
                <tr>
                  <td>냉각수 수량</td>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkClngwtrAmount, 'state4')}</td>
                </tr>
                <tr>
                  <td rowSpan="3">변속기</td>
                  <td rowSpan="3">
                    자동변속기
                    <br />
                    (A/T)
                  </td>
                  <td>오일누유</td>
                  <td>{numberToMsg(perfData?.mssAtTmOilLkage, 'state3')}</td>
                </tr>
                <tr>
                  <td>오일유량 및 상태</td>
                  <td>{numberToMsg(perfData?.mssAtTmOilFlowRtStt, 'state5')}</td>
                </tr>
                <tr>
                  <td>작동상태(공회전)</td>
                  <td>{numberToMsg(perfData?.mssAtTmWkStt, 'state1')}</td>
                </tr>
                <tr>
                  <td rowSpan="3">동력전달</td>
                  <td colSpan="2">클러치 어셈블리</td>
                  <td>{numberToMsg(perfData?.powerTransCltcAssem, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">등속죠인트</td>
                  <td>{numberToMsg(perfData?.powerTransConsJoin, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">추진축 및 베어링</td>
                  <td>{numberToMsg(perfData?.powerTransPropellerBear, 'state1')}</td>
                </tr>
                <tr>
                  <td rowSpan="4">조항</td>
                  <td colSpan="2">동력조향 작동 오일누유</td>
                  <td>{numberToMsg(perfData?.powerSteerWkOilLkage, 'state3')}</td>
                </tr>
                <tr>
                  <td rowSpan="3">작동상태</td>
                  <td>스티어링 기어</td>
                  <td>{numberToMsg(perfData?.strgGear, 'state1')}</td>
                </tr>
                <tr>
                  <td>스티어링 펌프</td>
                  <td>{numberToMsg(perfData?.wkSttStrgPmp, 'state1')}</td>
                </tr>
                <tr>
                  <td>타이로드엔드 및 볼죠인트</td>
                  <td>{numberToMsg(perfData?.wkSttTre, 'state1')}</td>
                </tr>
                <tr>
                  <td rowSpan="3">제동</td>
                  <td colSpan="2">브레이크 마스터 실린더오일 누유</td>
                  <td>{numberToMsg(perfData?.brkBrkeMstCylOilLk, 'state3')}</td>
                </tr>
                <tr>
                  <td colSpan="2">브레이크오일 누유</td>
                  <td>{numberToMsg(perfData?.brkBrkeOilLkage, 'state3')}</td>
                </tr>
                <tr>
                  <td colSpan="2">배력장치 상태</td>
                  <td>{numberToMsg(perfData?.brkBstStt, 'state1')}</td>
                </tr>
                <tr>
                  <td rowSpan="6">전기</td>
                  <td colSpan="2">발전기 출력</td>
                  <td>{numberToMsg(perfData?.eltGenOput, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">시동모터</td>
                  <td>{numberToMsg(perfData?.eltStrtMt, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">와이퍼 모터기능</td>
                  <td>{numberToMsg(perfData?.eltWiperFlct, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">실내송풍 모터</td>
                  <td>{numberToMsg(perfData?.eltInsBlowMt, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">라디에이터 팬 모터</td>
                  <td>{numberToMsg(perfData?.eltRdarFanMt, 'state1')}</td>
                </tr>
                <tr>
                  <td colSpan="2">윈도우 모터 작동</td>
                  <td>{numberToMsg(perfData?.eltWindMtWk, 'state1')}</td>
                </tr>
                <tr>
                  <td>기타</td>
                  <td colSpan="2">연료누출(LP가스 포함)</td>
                  <td>{numberToMsg(perfData?.etcFuelLkage, 'state6')}</td>
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
                  <th colSpan="2" className="tx-c">
                    원동기
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.selfDnsMortor, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    변속기
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.selfDnsMss, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    작동상태(공회전)
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorWkStt, 'state2')}</td>
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
                  <th colSpan="2" className="tx-c">
                    오일누유 로커암 커버
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorOilLkRocArmCov, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    오일누유 실린더 헤더/가스켓
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorCylHd, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    오일누유 오일팬
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorOilLkOilFan, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    오일유량
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorOilFlowRtCntm, 'state4')}</td>
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
                  <th colSpan="2" className="tx-c">
                    냉각수 누수 실린더 헤드/가스켓
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkCylhd, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    냉각수 누수 워터펌프
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkWtrpmp, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    냉각수 누수 라디에이터
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorClngwtrRdar, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    냉각수 누수 냉각수 수량
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mortorClngwtrLkClngwtrAmount, 'state4')}</td>
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
                  <th colSpan="2" className="tx-c">
                    자동변속기(A/T) 오일누유
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mssAtTmOilLkage, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    자동변속기(A/T) 오일유량 및 상태
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mssAtTmOilFlowRtStt, 'state5')}</td>
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
                  <th colSpan="2" className="tx-c">
                    자동변속기(A/T) 작동상태(공회전)
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mssAtTmWkStt, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    클러치 어셈블리
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.powerTransCltcAssem, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    등속죠인트
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.powerTransConsJoin, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    추진축 및 베어링
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.powerTransPropellerBear, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    동력조항 작동 오일 누유
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.powerSteerWkOilLkage, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    스티어링 기어
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.strgGear, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    자동변속기(A/T) 작동상태(공회전)
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.mssAtTmWkStt, 'state1')}</td>
                </tr>
                {/* 누락?? 스티어링 펌프 : {numberToMsg(perfData?.wkSttStrgPmp, 'state1')} */}
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
                  <th colSpan="2" className="tx-c">
                    타이어로드엔드 및 볼조인트
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.wkSttTre, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    브레이크 오일 유량상태
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.brkBrkeMstCylOilLk, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    브레이크 오일 누유
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.brkBrkeOilLkage, 'state3')}</td>
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
                  <th colSpan="2" className="tx-c">
                    배력장치 상태
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.brkBstStt, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    발전기 출력
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltGenOput, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    시동모터
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltStrtMt, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    와이퍼기능
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltWiperFlct, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    실내 송풍 모터
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltInsBlowMt, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    라디에이터 팬모터
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltRdarFanMt, 'state1')}</td>
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
                  <th colSpan="2" className="tx-c">
                    연료누출
                  </th>
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
                  <th colSpan="2" className="tx-c">
                    윈도우 모터 작동
                  </th>
                </tr>
                <tr>
                  <th>상태</th>
                  <td>{numberToMsg(perfData?.eltWindMtWk, 'state1')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
    </>
  );
});

CarDetails.propTypes = {
  mode: PropTypes.string,
  perfData: PropTypes.object,
  callback: PropTypes.func
};
CarDetails.displayName = 'CarDetails';
export default CarDetails;
