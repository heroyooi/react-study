import React, { useState } from 'react';
import RadioGroup from '@lib/share/items/RadioGroup';
import Radio from '@lib/share/items/Radio';

const sttTypeA = [
  { title: '양호', value: 0 },
  { title: '불량', value: 1 },
]

const sttTypeB = [
  { title: '적정', value: 0 },
  { title: '불량', value: 1 },
]

const sttTypeC = [
  { title: '없음', value: 0 },
  { title: '미세누유', value: 1 },
  { title: '누유', value: 2 },
]

const sttTypeD = [
  { title: '적정', value: 0 },
  { title: '부족', value: 1 },
]

const sttTypeE = [
  { title: '적정', value: 0 },
  { title: '부족', value: 1 },
  { title: '과다', value: 2 },
]

const sttTypeF = [
  { title: '없음', value: 0 },
  { title: '있음', value: 1 },
]

const CarDetails = ({ onChange, item = {}, target }) => {
  console.log('CarDetails item : ', item)

  return (
    <fieldset>
      <legend className="away">차량 세부사항</legend>
      <table summary="차량 세부사항" className="table-tp1 input th-c td-c">
        <caption>차량 세부사항</caption>
        <colgroup>
          <col width="10%" />
          <col width="15%" />
          <col width="18%" />
          <col width="27%" />
          <col width="17%" />
          <col width="13%" />
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
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`selfDnsMortor-${i}`}
                      onChange={onChange}
                      name="selfDnsMortor"
                      value={stt?.value}
                      checked={item?.selfDnsMortor}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">변속기</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`selfDnsMss-${i}`}
                      onChange={onChange}
                      name="selfDnsMss"
                      value={stt?.value}
                      checked={item?.selfDnsMss}
                      title={stt?.title}
                      size="large"
                    />

                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="9">원동기</td>
            <td colSpan="2">작동상태(공회전)</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeB.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorWkStt-${i}`}
                      onChange={onChange}
                      name="mortorWkStt"
                      value={stt?.value}
                      checked={item?.mortorWkStt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="3">오일누유</td>
            <td>로커암커버</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorOilLkRocArmCov-${i}`}
                      onChange={onChange}
                      name="mortorOilLkRocArmCov"
                      value={stt?.value}
                      checked={item?.mortorOilLkRocArmCov}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>실린더 헤더/가스켓</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorCylHd-${i}`}
                      onChange={onChange}
                      name="mortorCylHd"
                      value={stt?.value}
                      checked={item?.mortorCylHd}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>오일팬</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorOilLkOilFan-${i}`}
                      onChange={onChange}
                      name="mortorOilLkOilFan"
                      value={stt?.value}
                      checked={item?.mortorOilLkOilFan}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">오일유량</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeD.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorOilFlowRtCntm-${i}`}
                      onChange={onChange}
                      name="mortorOilFlowRtCntm"
                      value={stt?.value}
                      checked={item?.mortorOilFlowRtCntm}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="4">냉각수 누수</td>
            <td>실린더 헤드/가스켓</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorClngwtrLkCylhd-${i}`}
                      onChange={onChange}
                      name="mortorClngwtrLkCylhd"
                      value={stt?.value}
                      checked={item?.mortorClngwtrLkCylhd}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>워터 펌프</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorClngwtrLkWtrpmp-${i}`}
                      onChange={onChange}
                      name="mortorClngwtrLkWtrpmp"
                      value={stt?.value}
                      checked={item?.mortorClngwtrLkWtrpmp}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>라디에이터</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorClngwtrRdar-${i}`}
                      onChange={onChange}
                      name="mortorClngwtrRdar"
                      value={stt?.value}
                      checked={item?.mortorClngwtrRdar}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>냉각수 수량</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeD.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mortorClngwtrLkClngwtrAmount-${i}`}
                      onChange={onChange}
                      name="mortorClngwtrLkClngwtrAmount"
                      value={stt?.value}
                      checked={item?.mortorClngwtrLkClngwtrAmount}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="3">변속기</td>
            <td rowSpan="3">자동변속기</td>
            <td>오일누유</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mssAtTmOilLkage-${i}`}
                      onChange={onChange}
                      name="mssAtTmOilLkage"
                      value={stt?.value}
                      checked={item?.mssAtTmOilLkage}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>오일 누유 및 상태</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeE.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mssAtTmOilFlowRtStt-${i}`}
                      onChange={onChange}
                      name="mssAtTmOilFlowRtStt"
                      value={stt?.value}
                      checked={item?.mssAtTmOilFlowRtStt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>작동상태(공회전)</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`mssAtTmWkStt-${i}`}
                      onChange={onChange}
                      name="mssAtTmWkStt"
                      value={stt?.value}
                      checked={item?.mssAtTmWkStt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="3">동력전달</td>
            <td colSpan="2">클러치 어셈블리</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`powerTransCltcAssem-${i}`}
                      onChange={onChange}
                      name="powerTransCltcAssem"
                      value={stt?.value}
                      checked={item?.powerTransCltcAssem}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">등속죠인트</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`powerTransConsJoin-${i}`}
                      onChange={onChange}
                      name="powerTransConsJoin"
                      value={stt?.value}
                      checked={item?.powerTransConsJoin}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">추진축 및 베어링</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`powerTransPropellerBear-${i}`}
                      onChange={onChange}
                      name="powerTransPropellerBear"
                      value={stt?.value}
                      checked={item?.powerTransPropellerBear}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="4">조향</td>
            <td colSpan="2">동력조향 작동 오일누유</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`powerSteerWkOilLkage-${i}`}
                      onChange={onChange}
                      name="powerSteerWkOilLkage"
                      value={stt?.value}
                      checked={item?.powerSteerWkOilLkage}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td rowSpan="3">작동상태</td>
            <td>스티어링 기어</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`strgGear-${i}`}
                      onChange={onChange}
                      name="strgGear"
                      value={stt?.value}
                      checked={item?.strgGear}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>스티어링 펌프</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`wkSttStrgPmp-${i}`}
                      onChange={onChange}
                      name="wkSttStrgPmp"
                      value={stt?.value}
                      checked={item?.wkSttStrgPmp}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>타이로드 앤드 및 볼죠인트</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`wkSttTre-${i}`}
                      onChange={onChange}
                      name="wkSttTre"
                      value={stt?.value}
                      checked={item?.wkSttTre}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>

          <tr>
            <td rowSpan="3">제동</td>
            <td colSpan="2">브레이크 마스터 실린더오일 누유</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`brkBrkeMstCylOilLk-${i}`}
                      onChange={onChange}
                      name="brkBrkeMstCylOilLk"
                      value={stt?.value}
                      checked={item?.brkBrkeMstCylOilLk}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">브레이크 오일 누유</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeC.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`brkBrkeOilLkage-${i}`}
                      onChange={onChange}
                      name="brkBrkeOilLkage"
                      value={stt?.value}
                      checked={item?.brkBrkeOilLkage}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">배력장치 상태</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`brkBstStt-${i}`}
                      onChange={onChange}
                      name="brkBstStt"
                      value={stt?.value}
                      checked={item?.brkBstStt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>

          <tr>
            <td rowSpan="6">전기</td>
            <td colSpan="2">발전기 출력</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltGenOput-${i}`}
                      onChange={onChange}
                      name="eltGenOput"
                      value={stt?.value}
                      checked={item?.eltGenOput}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">시동모터</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltStrtMt-${i}`}
                      onChange={onChange}
                      name="eltStrtMt"
                      value={stt?.value}
                      checked={item?.eltStrtMt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">와이퍼 모터기능</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltWiperFlct-${i}`}
                      onChange={onChange}
                      name="eltWiperFlct"
                      value={stt?.value}
                      checked={item?.eltWiperFlct}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">실내송풍 모터</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltInsBlowMt-${i}`}
                      onChange={onChange}
                      name="eltInsBlowMt"
                      value={stt?.value}
                      checked={item?.eltInsBlowMt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">라디에이터 팬 모터</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltRdarFanMt-${i}`}
                      onChange={onChange}
                      name="eltRdarFanMt"
                      value={stt?.value}
                      checked={item?.eltRdarFanMt}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">윈도우 모터 작동</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeA.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`eltWindMtWk-${i}`}
                      onChange={onChange}
                      name="eltWindMtWk"
                      value={stt?.value}
                      checked={item?.eltWindMtWk}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
          <tr>
            <td>기타</td>
            <td colSpan="2">연료누출(LP 가스 포함)</td>
            <td className="tl">
              <div className="radio-group">
                {
                  sttTypeF.map((stt, i) =>
                    <Radio
                      key={i}
                      id={`etcFuelLkage-${i}`}
                      onChange={onChange}
                      name="etcFuelLkage"
                      value={stt?.value}
                      checked={item?.etcFuelLkage}
                      title={stt?.title}
                      size="large"
                    />
                  )
                }
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
};

export default CarDetails;
