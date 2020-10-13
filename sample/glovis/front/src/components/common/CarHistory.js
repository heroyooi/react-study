import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';
import useRadio from '@lib/share/custom/useRadio';

const CarHistory = memo(({ perfData, mode = 'apply', type, event = false, callback }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode] = useState(mode);

  const [isValue1, isView1, handleChange1] = useRadio(0);
  const [isValue2, isView2, handleChange2] = useRadio(0);
  const [isValue3, isView3, handleChange3] = useRadio(0);
  const [isValue4, isView4, handleChange4] = useRadio(0);
  const [isValue5, isView5, handleChange5] = useRadio(0);
  const [isValue6, isView6, handleChange6] = useRadio(0);
  const [isValue7, isView7, handleChange7] = useRadio(0);
  const [isValue8, isView8, handleChange8] = useRadio(0);
  const [isValue9, isView9, handleChange9] = useRadio(0);
  const [isValue10, isView10, handleChange10] = useRadio(0);
  const [isValue11, isView11, handleChange11] = useRadio(0);
  const [isValue12, isView12, handleChange12] = useRadio(0);
  const [isValue13, isView13, handleChange13] = useRadio(0);
  const [isValue14, isView14, handleChange14] = useRadio(0);
  const [isValue15, isView15, handleChange15] = useRadio(0);
  const [isValue16, isView16, handleChange16] = useRadio(0);
  const [isValue17, isView17, handleChange17] = useRadio(0);
  const [isValue18, isView18, handleChange18] = useRadio(0);
  const [isValue19, isView19, handleChange19] = useRadio(0);
  const [isValue20, isView20, handleChange20] = useRadio(0);
  const [isValue21, isView21, handleChange21] = useRadio(0);
  const [isValue22, isView22, handleChange22] = useRadio(0);
  const [isValue23, isView23, handleChange23] = useRadio(0);
  const [isValue24, isView24, handleChange24] = useRadio(0);
  const [isValue25, isView25, handleChange25] = useRadio(0);
  const [isValue26, isView26, handleChange26] = useRadio(0);
  const [isValue27, isView27, handleChange27] = useRadio(0);
  const [isValue28, isView28, handleChange28] = useRadio(0);
  const [isValue29, isView29, handleChange29] = useRadio(0);
  const [isValue30, isView30, handleChange30] = useRadio(0);
  const [isValue31, isView31, handleChange31] = useRadio(0);
  const [isValue32, isView32, handleChange32] = useRadio(0);
  const [isValue33, isView33, handleChange33] = useRadio(0);
  const [isValue34, isView34, handleChange34] = useRadio(0);
  const [isValue35, isView35, handleChange35] = useRadio(0);
  const [isValue36, isView36, handleChange36] = useRadio(0);
  const [isValue37, isView37, handleChange37] = useRadio(0);

  const handleConfirm = useCallback(
    (e, deps) => {
      if (callback) callback(e, deps);
    },
    [callback]
  );

  const createIco = useCallback((num, state) => {
    return (
      <span className={`ico-wrap${num}`}>
        <i className={state === 1 ? 'ico-state-x on active' : 'ico-state-x on'} />
        <i className={state === 2 ? 'ico-state-w on active' : 'ico-state-w on'} />
        <i className={state === 3 ? 'ico-state-c on active' : 'ico-state-c on'} />
      </span>
    );
  }, []);

  console.log('CarHistory perfData', perfData);
  return (
    <>
      {isMode === 'apply' &&
        (!hasMobile ? (
          <fieldset className={`car-record ${mode}`}>
            <ul className="car-record-label">
              <li>
                <i className="ico-state-x on" />
                교환(교체)
              </li>
              <li>
                <i className="ico-state-w on" />
                판금/용접
              </li>
              <li>
                <i className="ico-state-c on" />
                흠집
              </li>
            </ul>
            <legend className="away">사고 교환 수리 등 이력</legend>
            <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
              <caption>
                사고 <i className="ico-dot big" /> 교환 <i className="ico-dot big" /> 수리 등 이력
              </caption>
              <colgroup>
                <col width="45%" />
                <col width="7%" />
                <col width="7%" />
                <col width="20%" />
                <col width="7%" />
                <col width="7%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>외판 부위의 교환, 흠집 및 판금/용접 수리</th>
                  <th>랭크</th>
                  <th>NO</th>
                  <th>부위 명칭</th>
                  <th>교환</th>
                  <th>판금/용접</th>
                  <th>흠집</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="14">
                    <div className="car-record-state1">
                      <img src="/images/mobile/contents/car-img-top.png" alt="자동차 도면(위)" />
                      {createIco(1, isView1)}
                      {createIco(2, isView2)}
                      {createIco(3, isView3)}
                      {createIco(4, isView4)}
                      {createIco(5, isView5)}
                      {createIco(6, isView6)}
                      {createIco(7, isView7)}
                      {createIco(8, isView8)}
                      {createIco(9, isView9)}
                      {createIco(10, isView10)}
                      {createIco(11, isView11)}
                      {createIco(12, isView12)}
                      {createIco(13, isView13)}
                      {createIco(14, isView14)}
                    </div>
                  </td>
                  <td rowSpan="9">1랭크</td>
                  <td>1</td>
                  <td className="tl">후드</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history1-1" value={1} checked={isValue1} disabled={false} onChange={handleChange1} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history1-2" value={2} checked={isValue1} disabled={false} onChange={handleChange1} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history1-3" value={3} checked={isValue1} disabled={false} onChange={handleChange1} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="tl">프론트 휀더(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history2-1" value={1} checked={isValue2} disabled={false} onChange={handleChange2} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history2-2" value={2} checked={isValue2} disabled={false} onChange={handleChange2} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history2-3" value={3} checked={isValue2} disabled={false} onChange={handleChange2} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="tl">프론트 휀더(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history3-1" value={1} checked={isValue3} disabled={false} onChange={handleChange3} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history3-2" value={2} checked={isValue3} disabled={false} onChange={handleChange3} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history3-3" value={3} checked={isValue3} disabled={false} onChange={handleChange3} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="tl">프론트 도어(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history4-1" value={1} checked={isValue4} disabled={false} onChange={handleChange4} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history4-2" value={2} checked={isValue4} disabled={false} onChange={handleChange4} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history4-3" value={3} checked={isValue4} disabled={false} onChange={handleChange4} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="tl">프론트 도어(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history5-1" value={1} checked={isValue5} disabled={false} onChange={handleChange5} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history5-2" value={2} checked={isValue5} disabled={false} onChange={handleChange5} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history5-3" value={3} checked={isValue5} disabled={false} onChange={handleChange5} />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="tl">리어 도어(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history6-1" value={1} checked={isValue6} disabled={false} onChange={handleChange6} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history6-2" value={2} checked={isValue6} disabled={false} onChange={handleChange6} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history6-3" value={3} checked={isValue6} disabled={false} onChange={handleChange6} />
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="tl">리어 도어(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history7-1" value={1} checked={isValue7} disabled={false} onChange={handleChange7} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history7-2" value={2} checked={isValue7} disabled={false} onChange={handleChange7} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history7-3" value={3} checked={isValue7} disabled={false} onChange={handleChange7} />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="tl">트렁크리드</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history8-1" value={1} checked={isValue8} disabled={false} onChange={handleChange8} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history8-2" value={2} checked={isValue8} disabled={false} onChange={handleChange8} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history8-3" value={3} checked={isValue8} disabled={false} onChange={handleChange8} />
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="tl">
                    라디에이터 서포트
                    <br />
                    (볼트체결부품)
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history9-1" value={1} checked={isValue9} disabled={false} onChange={handleChange9} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history9-2" value={2} checked={isValue9} disabled={false} onChange={handleChange9} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history9-3" value={3} checked={isValue9} disabled={false} onChange={handleChange9} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="5">2랭크</td>
                  <td>10</td>
                  <td className="tl">루프패널</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history10-1" value={1} checked={isValue10} disabled={false} onChange={handleChange10} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history10-2" value={2} checked={isValue10} disabled={false} onChange={handleChange10} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history10-3" value={3} checked={isValue10} disabled={false} onChange={handleChange10} />
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="tl">쿼터 패널(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history11-1" value={1} checked={isValue11} disabled={false} onChange={handleChange11} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history11-2" value={2} checked={isValue11} disabled={false} onChange={handleChange11} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history11-3" value={3} checked={isValue11} disabled={false} onChange={handleChange11} />
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="tl">쿼터 패널(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history12-1" value={1} checked={isValue12} disabled={false} onChange={handleChange12} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history12-2" value={2} checked={isValue12} disabled={false} onChange={handleChange12} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history12-3" value={3} checked={isValue12} disabled={false} onChange={handleChange12} />
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="tl">사이드실 패널(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history13-1" value={1} checked={isValue13} disabled={false} onChange={handleChange13} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history13-2" value={2} checked={isValue13} disabled={false} onChange={handleChange13} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history13-3" value={3} checked={isValue13} disabled={false} onChange={handleChange13} />
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="tl">사이드실 패널(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history14-1" value={1} checked={isValue14} disabled={false} onChange={handleChange14} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history14-2" value={2} checked={isValue14} disabled={false} onChange={handleChange14} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history14-3" value={3} checked={isValue14} disabled={false} onChange={handleChange14} />
                  </td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>주요 골격 부위의 교환, 흠집 및 판금/용접 수리</th>
                  <th>랭크</th>
                  <th>NO</th>
                  <th>부위 명칭</th>
                  <th>교환</th>
                  <th>판금/용접</th>
                  <th>흠집</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="23">
                    <div className="car-record-state2">
                      <img src="/images/contents/car-img-bottom.png" alt="자동차 도면(아래)" />
                      {createIco(1, isView15)}
                      {createIco(2, isView16)}
                      {createIco(3, isView17)}
                      {createIco(4, isView18)}
                      {createIco(5, isView19)}
                      {createIco(6, isView20)}
                      {createIco(7, isView21)}
                      {createIco(8, isView22)}
                      {createIco(9, isView23)}
                      {createIco(10, isView24)}
                      {createIco(11, isView25)}
                      {createIco(12, isView26)}
                      {createIco(13, isView27)}
                      {createIco(14, isView28)}
                      {createIco(15, isView29)}
                      {createIco(16, isView30)}
                      {createIco(17, isView31)}
                      {createIco(18, isView32)}
                      {createIco(19, isView33)}
                      {createIco(20, isView34)}
                      {createIco(21, isView35)}
                      {createIco(22, isView36)}
                      {createIco(23, isView37)}
                    </div>
                  </td>
                  <td rowSpan="6">A랭크</td>
                  <td>1</td>
                  <td className="tl">프론트 패널</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history15-1" value={1} checked={isValue15} disabled={false} onChange={handleChange15} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history15-2" value={2} checked={isValue15} disabled={false} onChange={handleChange15} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history15-3" value={3} checked={isValue15} disabled={false} onChange={handleChange15} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="tl">크로스 멤버</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history16-1" value={1} checked={isValue16} disabled={false} onChange={handleChange16} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history16-2" value={2} checked={isValue16} disabled={false} onChange={handleChange16} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history16-3" value={3} checked={isValue16} disabled={false} onChange={handleChange16} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="tl">인사이드 패널(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history17-1" value={1} checked={isValue17} disabled={false} onChange={handleChange17} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history17-2" value={2} checked={isValue17} disabled={false} onChange={handleChange17} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history17-3" value={3} checked={isValue17} disabled={false} onChange={handleChange17} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="tl">인사이드 패널(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history18-1" value={1} checked={isValue18} disabled={false} onChange={handleChange18} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history18-2" value={2} checked={isValue18} disabled={false} onChange={handleChange18} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history18-3" value={3} checked={isValue18} disabled={false} onChange={handleChange18} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="tl">리어 패널</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history19-1" value={1} checked={isValue19} disabled={false} onChange={handleChange19} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history19-2" value={2} checked={isValue19} disabled={false} onChange={handleChange19} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history19-3" value={3} checked={isValue19} disabled={false} onChange={handleChange19} />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="tl">트렁크 플로어</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history20-1" value={1} checked={isValue20} disabled={false} onChange={handleChange20} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history20-2" value={2} checked={isValue20} disabled={false} onChange={handleChange20} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history20-3" value={3} checked={isValue20} disabled={false} onChange={handleChange20} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="15">B랭크</td>
                  <td>7</td>
                  <td className="tl">프론트 사이드 멤버(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history21-1" value={1} checked={isValue21} disabled={false} onChange={handleChange21} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history21-2" value={2} checked={isValue21} disabled={false} onChange={handleChange21} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history21-3" value={3} checked={isValue21} disabled={false} onChange={handleChange21} />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="tl">트론트 사이드 멤버(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history22-1" value={1} checked={isValue22} disabled={false} onChange={handleChange22} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history22-2" value={2} checked={isValue22} disabled={false} onChange={handleChange22} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history22-3" value={3} checked={isValue22} disabled={false} onChange={handleChange22} />
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="tl">리어 사이드 멤버(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history23-1" value={1} checked={isValue23} disabled={false} onChange={handleChange23} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history23-2" value={2} checked={isValue23} disabled={false} onChange={handleChange23} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history23-3" value={3} checked={isValue23} disabled={false} onChange={handleChange23} />
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="tl">리어 사이드 멤버(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history24-1" value={1} checked={isValue24} disabled={false} onChange={handleChange24} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history24-2" value={2} checked={isValue24} disabled={false} onChange={handleChange24} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history24-3" value={3} checked={isValue24} disabled={false} onChange={handleChange24} />
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="tl">프론트 휠하우스(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history25-1" value={1} checked={isValue25} disabled={false} onChange={handleChange25} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history25-2" value={2} checked={isValue25} disabled={false} onChange={handleChange25} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history25-3" value={3} checked={isValue25} disabled={false} onChange={handleChange25} />
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="tl">프론트 휠하우스(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history26-1" value={1} checked={isValue26} disabled={false} onChange={handleChange26} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history26-2" value={2} checked={isValue26} disabled={false} onChange={handleChange26} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history26-3" value={3} checked={isValue26} disabled={false} onChange={handleChange26} />
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="tl">리어 휠하우스(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history27-1" value={1} checked={isValue27} disabled={false} onChange={handleChange27} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history27-2" value={2} checked={isValue27} disabled={false} onChange={handleChange27} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history27-3" value={3} checked={isValue27} disabled={false} onChange={handleChange27} />
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="tl">리어 휠하우스(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history28-1" value={1} checked={isValue28} disabled={false} onChange={handleChange28} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history28-2" value={2} checked={isValue28} disabled={false} onChange={handleChange28} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history28-3" value={3} checked={isValue28} disabled={false} onChange={handleChange28} />
                  </td>
                </tr>
                <tr>
                  <td>15</td>
                  <td className="tl">필러 패널A(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history29-1" value={1} checked={isValue29} disabled={false} onChange={handleChange29} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history29-2" value={2} checked={isValue29} disabled={false} onChange={handleChange29} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history29-3" value={3} checked={isValue29} disabled={false} onChange={handleChange29} />
                  </td>
                </tr>
                <tr>
                  <td>16</td>
                  <td className="tl">필러 패널A(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history30-1" value={1} checked={isValue30} disabled={false} onChange={handleChange30} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history30-2" value={2} checked={isValue30} disabled={false} onChange={handleChange30} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history30-3" value={3} checked={isValue30} disabled={false} onChange={handleChange30} />
                  </td>
                </tr>
                <tr>
                  <td>17</td>
                  <td className="tl">필러 패널B(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history31-1" value={1} checked={isValue31} disabled={false} onChange={handleChange31} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history31-2" value={2} checked={isValue31} disabled={false} onChange={handleChange31} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history31-3" value={3} checked={isValue31} disabled={false} onChange={handleChange31} />
                  </td>
                </tr>
                <tr>
                  <td>18</td>
                  <td className="tl">필러 패널B(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history32-1" value={1} checked={isValue32} disabled={false} onChange={handleChange32} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history32-2" value={2} checked={isValue32} disabled={false} onChange={handleChange32} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history32-3" value={3} checked={isValue32} disabled={false} onChange={handleChange32} />
                  </td>
                </tr>
                <tr>
                  <td>19</td>
                  <td className="tl">필러 패널C(좌)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history33-1" value={1} checked={isValue33} disabled={false} onChange={handleChange33} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history33-2" value={2} checked={isValue33} disabled={false} onChange={handleChange33} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history33-3" value={3} checked={isValue33} disabled={false} onChange={handleChange33} />
                  </td>
                </tr>
                <tr>
                  <td>20</td>
                  <td className="tl">필러 패널C(우)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history34-1" value={1} checked={isValue34} disabled={false} onChange={handleChange34} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history34-2" value={2} checked={isValue34} disabled={false} onChange={handleChange34} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history34-3" value={3} checked={isValue34} disabled={false} onChange={handleChange34} />
                  </td>
                </tr>
                <tr>
                  <td>21</td>
                  <td className="tl">패키지트레이</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history35-1" value={1} checked={isValue35} disabled={false} onChange={handleChange35} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history35-2" value={2} checked={isValue35} disabled={false} onChange={handleChange35} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history35-3" value={3} checked={isValue35} disabled={false} onChange={handleChange35} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="2">C랭크</td>
                  <td>22</td>
                  <td className="tl">대쉬 패널</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history36-1" value={1} checked={isValue36} disabled={false} onChange={handleChange36} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history36-2" value={2} checked={isValue36} disabled={false} onChange={handleChange36} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history36-3" value={3} checked={isValue36} disabled={false} onChange={handleChange36} />
                  </td>
                </tr>
                <tr>
                  <td>23</td>
                  <td className="tl">플로어 패널(바닥)</td>
                  <td>
                    <Radio className="simple checkbox" id="car-history37-1" value={1} checked={isValue37} disabled={false} onChange={handleChange37} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history37-2" value={2} checked={isValue37} disabled={false} onChange={handleChange37} />
                  </td>
                  <td>
                    <Radio className="simple checkbox" id="car-history37-3" value={3} checked={isValue37} disabled={false} onChange={handleChange37} />
                  </td>
                </tr>
              </tbody>
            </table>
            {type !== 'pricing' && (
              <table summary="사고 교환 수리 등 이력에 대한 내용2" className="table-tp1 input">
                <caption className="away">사고 교환 수리 등 이력2</caption>
                <colgroup>
                  <col width="19%" />
                  <col width="28%" />
                  <col width="23%" />
                  <col width="17%" />
                  <col width="13%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>
                      사고이력
                      <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                        <TooltipItem>
                          <i className="ico-question" />
                        </TooltipItem>
                        <TooltipCont>
                          <div className="car-record-tooltip">
                            <p className="tx-exp-tp2">
                              사고이력은 사고로 자동차의 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단. 쿼터패널, 루프패널, 사이드실패널 부위는 절단, 용접시에만 사고로
                              표기합니다.
                              <br />
                              (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                            </p>
                          </div>
                        </TooltipCont>
                      </Tooltip>
                    </th>
                    <td colSpan="4">없음</td>
                  </tr>
                  <tr>
                    <th>
                      단순수리
                      <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                        <TooltipItem>
                          <i className="ico-question" />
                        </TooltipItem>
                        <TooltipCont>
                          <div className="car-record-tooltip">
                            <p className="tx-exp-tp2">단순수리는 후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위가 교체 및 판금, 용접수리가 된 경우로 한정합니다.</p>
                          </div>
                        </TooltipCont>
                      </Tooltip>
                    </th>
                    <td colSpan="4">없음</td>
                  </tr>
                  <tr>
                    <th rowSpan="3">
                      부위별 이상여부
                      <br />
                      (하단참조)
                    </th>
                    <td>외판부위 1랭크 : 없음</td>
                    <td />
                    <td>
                      <Input type="text" id="calculated10" width={92} height={40} />
                      <em>만원</em>
                    </td>
                    <td>
                      <Input type="text" id="note12" width="100%" height={40} />
                    </td>
                  </tr>
                  <tr>
                    <td>외판부위 1랭크 : 없음</td>
                    <td />
                    <td>
                      <Input type="text" id="calculated11" width={92} height={40} />
                      <em>만원</em>
                    </td>
                    <td>
                      <Input type="text" id="note13" width="100%" height={40} />
                    </td>
                  </tr>
                  <tr>
                    <td>주요 골격 : 없음</td>
                    <td />
                    <td>
                      <Input type="text" id="calculated12" width={92} height={40} />
                      <em>만원</em>
                    </td>
                    <td>
                      <Input type="text" id="note14" width="100%" height={40} />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </fieldset>
        ) : (
            <DealerCarHistory
              historyData={perfData}
              sttArray={[perfData?.acdtHstYn, perfData?.smplRprYn, perfData?.partsOutPanelFRankYn, perfData?.partsOutPanelSRankYn, perfData?.partsMainSkltYn]}
              type={type}
              onComfirm={handleConfirm}
            />
          ))}
      {isMode === 'viewer' &&
        (!hasMobile ? (
          <fieldset className={event ? `car-record ${mode} event` : `car-record ${mode}`}>
            <ul className="car-record-label">
              <li>
                <i className="ico-state-x on" />
                교환(교체)
              </li>
              <li>
                <i className="ico-state-w on" />
                판금/용접
              </li>
              <li>
                <i className="ico-state-c on" />
                흠집
              </li>
            </ul>
            <legend className="away">사고 교환 수리 등 이력</legend>
            <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
              <caption>
                사고 <i className="ico-dot big" /> 교환 <i className="ico-dot big" /> 수리 등 이력
              </caption>
              <colgroup>
                <col width="45%" />
                <col width="7%" />
                <col width="7%" />
                <col width="20%" />
                <col width="7%" />
                <col width="7%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th>외판 부위의 교환, 흠집 및 판금/용접 수리</th>
                  <th>랭크</th>
                  <th>NO</th>
                  <th>부위 명칭</th>
                  <th>교환</th>
                  <th>판금/용접</th>
                  <th>흠집</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="14">
                    <div className="car-record-state1">
                      <img src="/images/contents/car-img-top.png" alt="자동차 도면(위)" />
                      {createIco(1, perfData ? perfData.hood : isView1)}
                      {createIco(2, perfData ? perfData.frontFenderLeft : isView2)}
                      {createIco(3, perfData ? perfData.frontFenderRight : isView3)}
                      {createIco(4, perfData ? perfData.frontDoorLeft : isView4)}
                      {createIco(5, perfData ? perfData.frontDoorRight : isView5)}
                      {createIco(6, perfData ? perfData.rearDoorLeft : isView6)}
                      {createIco(7, perfData ? perfData.rearDoorRight : isView7)}
                      {createIco(8, perfData ? perfData.trunklid : isView8)}
                      {createIco(9, perfData ? perfData.rdarSpt : isView9)}
                      {createIco(10, perfData ? perfData.roofPnst : isView10)}
                      {createIco(11, perfData ? perfData.qrtrPnstLeft : isView11)}
                      {createIco(12, perfData ? perfData.qrtrPnstRight : isView12)}
                      {createIco(13, perfData ? perfData.sideSealPnstLeft : isView13)}
                      {createIco(14, perfData ? perfData.sideSealPnstRight : isView14)}
                    </div>
                  </td>
                  <td rowSpan="9">1랭크</td>
                  <td>1</td>
                  <td className="tl">후드</td>
                  <td>
                    <Radio className="simple state-x" id="car-history1-1" value={1} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history1-2" value={2} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history1-3" value={3} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="tl">프론트 휀더(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history2-1" value={1} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history2-2" value={2} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history2-3" value={3} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="tl">프론트 휀더(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history3-1" value={1} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history3-2" value={2} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history3-3" value={3} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="tl">프론트 도어(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history4-1" value={1} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history4-2" value={2} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history4-3" value={3} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="tl">프론트 도어(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history5-1" value={1} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history5-2" value={2} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history5-3" value={3} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="tl">리어 도어(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history6-1" value={1} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history6-2" value={2} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history6-3" value={3} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td className="tl">리어 도어(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history7-1" value={1} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history7-2" value={2} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history7-3" value={3} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="tl">트렁크리드</td>
                  <td>
                    <Radio className="simple state-x" id="car-history8-1" value={1} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history8-2" value={2} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history8-3" value={3} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="tl">
                    라디에이터 서포트
                    <br />
                    (볼트체결부품)
                  </td>
                  <td>
                    <Radio className="simple state-x" id="car-history9-1" value={1} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history9-2" value={2} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history9-3" value={3} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="5">2랭크</td>
                  <td>10</td>
                  <td className="tl">루프패널</td>
                  <td>
                    <Radio className="simple state-x" id="car-history10-1" value={1} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history10-2" value={2} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history10-3" value={3} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="tl">쿼터 패널(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history11-1" value={1} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history11-2" value={2} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history11-3" value={3} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="tl">쿼터 패널(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history12-1" value={1} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history12-2" value={2} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history12-3" value={3} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="tl">사이드실 패널(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history13-1" value={1} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history13-2" value={2} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history13-3" value={3} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="tl">사이드실 패널(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history14-1" value={1} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history14-2" value={2} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history14-3" value={3} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                  </td>
                </tr>
              </tbody>

              <thead>
                <tr>
                  <th>주요 골격 부위의 교환, 흠집 및 판금/용접 수리</th>
                  <th>랭크</th>
                  <th>NO</th>
                  <th>부위 명칭</th>
                  <th>교환</th>
                  <th>판금/용접</th>
                  <th>흠집</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="23">
                    <div className="car-record-state2">
                      <img src="/images/contents/car-img-bottom.png" alt="자동차 도면(아래)" />
                      {createIco(1, perfData ? perfData.frtPnst : isView15)}
                      {createIco(2, perfData ? perfData.crossMem : isView16)}
                      {createIco(3, perfData ? perfData.insdPnstLeft : isView17)}
                      {createIco(4, perfData ? perfData.insdPnstRight : isView18)}
                      {createIco(5, perfData ? perfData.rearPnst : isView19)}
                      {createIco(6, perfData ? perfData.trunkFloor : isView20)}
                      {createIco(7, perfData ? perfData.frtSideMemLeft : isView21)}
                      {createIco(8, perfData ? perfData.frtSideMemRight : isView22)}
                      {createIco(9, perfData ? perfData.rearSideMemLeft : isView23)}
                      {createIco(10, perfData ? perfData.rearSideMemRight : isView24)}
                      {createIco(11, perfData ? perfData.frtWhlHouseLeft : isView25)}
                      {createIco(12, perfData ? perfData.frtWhlHouseRight : isView26)}
                      {createIco(13, perfData ? perfData.rearWhlHouseLeft : isView27)}
                      {createIco(14, perfData ? perfData.rearWhlHouseRight : isView28)}
                      {createIco(15, perfData ? perfData.pilrPnstFrtLeft : isView29)}
                      {createIco(16, perfData ? perfData.pilrPnstFrtRight : isView30)}
                      {createIco(17, perfData ? perfData.pilrPnstMedmLeft : isView31)}
                      {createIco(18, perfData ? perfData.pilrPnstMedmRight : isView32)}
                      {createIco(19, perfData ? perfData.pilrPnstRearLeft : isView33)}
                      {createIco(20, perfData ? perfData.pilrPnstRearRight : isView34)}
                      {createIco(21, perfData ? perfData.pckgTray : isView35)}
                      {createIco(22, perfData ? perfData.dashPnst : isView36)}
                      {createIco(23, perfData ? perfData.floorPnst : isView37)}
                    </div>
                  </td>
                  <td rowSpan="6">A랭크</td>
                  <td>1</td>
                  <td className="tl">프론트 패널</td>
                  <td>
                    <Radio className="simple state-x" id="car-history15-1" value={1} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history15-2" value={2} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history15-3" value={3} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td className="tl">크로스 멤버</td>
                  <td>
                    <Radio className="simple state-x" id="car-history16-1" value={1} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history16-2" value={2} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history16-3" value={3} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td className="tl">인사이드 패널(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history17-1" value={1} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history17-2" value={2} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history17-3" value={3} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td className="tl">인사이드 패널(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history18-1" value={1} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history18-2" value={2} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history18-3" value={3} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td className="tl">리어 패널</td>
                  <td>
                    <Radio className="simple state-x" id="car-history19-1" value={1} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history19-2" value={2} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history19-3" value={3} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td className="tl">트렁크 플로어</td>
                  <td>
                    <Radio className="simple state-x" id="car-history20-1" value={1} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history20-2" value={2} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history20-3" value={3} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="15">B랭크</td>
                  <td>7</td>
                  <td className="tl">프론트 사이드 멤버(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history21-1" value={1} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history21-2" value={2} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history21-3" value={3} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                  </td>
                </tr>
                <tr>
                  <td>8</td>
                  <td className="tl">프론트 사이드 멤버(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history22-1" value={1} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history22-2" value={2} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history22-3" value={3} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                  </td>
                </tr>
                <tr>
                  <td>9</td>
                  <td className="tl">리어 사이드 멤버(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history23-1" value={1} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history23-2" value={2} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history23-3" value={3} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                  </td>
                </tr>
                <tr>
                  <td>10</td>
                  <td className="tl">리어 사이드 멤버(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history24-1" value={1} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history24-2" value={2} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history24-3" value={3} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                  </td>
                </tr>
                <tr>
                  <td>11</td>
                  <td className="tl">프론트 휠하우스(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history25-1" value={1} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history25-2" value={2} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history25-3" value={3} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                  </td>
                </tr>
                <tr>
                  <td>12</td>
                  <td className="tl">프론트 휠하우스(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history26-1" value={1} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history26-2" value={2} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history26-3" value={3} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                  </td>
                </tr>
                <tr>
                  <td>13</td>
                  <td className="tl">리어 휠하우스(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history27-1" value={1} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history27-2" value={2} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history27-3" value={3} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                  </td>
                </tr>
                <tr>
                  <td>14</td>
                  <td className="tl">리어 휠하우스(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history28-1" value={1} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history28-2" value={2} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history28-3" value={3} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                  </td>
                </tr>
                <tr>
                  <td>15</td>
                  <td className="tl">필러 패널A(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history29-1" value={1} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history29-2" value={2} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history29-3" value={3} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                  </td>
                </tr>
                <tr>
                  <td>16</td>
                  <td className="tl">필러 패널A(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history30-1" value={1} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history30-2" value={2} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history30-3" value={3} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                  </td>
                </tr>
                <tr>
                  <td>17</td>
                  <td className="tl">필러 패널B(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history31-1" value={1} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history31-2" value={2} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history31-3" value={3} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                  </td>
                </tr>
                <tr>
                  <td>18</td>
                  <td className="tl">필러 패널B(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history32-1" value={1} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history32-2" value={2} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history32-3" value={3} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                  </td>
                </tr>
                <tr>
                  <td>19</td>
                  <td className="tl">필러 패널C(좌)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history33-1" value={1} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history33-2" value={2} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history33-3" value={3} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                  </td>
                </tr>
                <tr>
                  <td>20</td>
                  <td className="tl">필러 패널C(우)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history34-1" value={1} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history34-2" value={2} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history34-3" value={3} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                  </td>
                </tr>
                <tr>
                  <td>21</td>
                  <td className="tl">패키지트레이</td>
                  <td>
                    <Radio className="simple state-x" id="car-history35-1" value={1} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history35-2" value={2} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history35-3" value={3} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="2">C랭크</td>
                  <td>22</td>
                  <td className="tl">대쉬 패널</td>
                  <td>
                    <Radio className="simple state-x" id="car-history36-1" value={1} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history36-2" value={2} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history36-3" value={3} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                  </td>
                </tr>
                <tr>
                  <td>23</td>
                  <td className="tl">플로어 패널(바닥)</td>
                  <td>
                    <Radio className="simple state-x" id="car-history37-1" value={1} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                  </td>
                  <td>
                    <Radio className="simple state-w" id="car-history37-2" value={2} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                  </td>
                  <td>
                    <Radio className="simple state-c" id="car-history37-3" value={3} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                  </td>
                </tr>
              </tbody>
            </table>

            <table summary="사고 교환 수리 등 이력에 대한 내용2" className="table-tp1">
              <caption className="away">사고 교환 수리 등 이력2</caption>
              <colgroup>
                <col width="19%" />
                <col width="28%" />
                <col width="23%" />
                <col width="17%" />
                <col width="13%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>
                    사고이력
                    <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                      <TooltipItem>
                        <i className="ico-question" />
                      </TooltipItem>
                      <TooltipCont>
                        <div className="car-record-tooltip">
                          <p className="tx-exp-tp2">
                            사고이력은 사고로 자동차의 주요 골격 부위의 판금, 용접수리 및 교환이 있는 경우로 한정합니다. 단. 쿼터패널, 루프패널, 사이드실패널 부위는 절단, 용접시에만 사고로 표기합니다.
                            <br />
                            (후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위 및 범퍼에 대한 판금, 용접수리 및 교환은 단순수리로서 사고에 포함되지 않습니다.)
                          </p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </th>
                  <td colSpan="4">{perfData?.acdtHstYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th>
                    단순수리
                    <Tooltip placement="rightTop" width={430} exception="car-record" zid={101}>
                      <TooltipItem>
                        <i className="ico-question" />
                      </TooltipItem>
                      <TooltipCont>
                        <div className="car-record-tooltip">
                          <p className="tx-exp-tp2">단순수리는 후드, 프론트휀더, 도어, 트렁크리드 등 외판 부위가 교체 및 판금, 용접수리가 된 경우로 한정합니다.</p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </th>
                  <td colSpan="4">{perfData?.smplRprYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <th rowSpan="3">
                    부위별 이상여부
                    <br />
                    (하단참조)
                  </th>
                  <td colSpan="4">외판부위 1랭크 : {perfData?.partsOutPanelFRankYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <td colSpan="4">외판부위 1랭크 : {perfData?.partsOutPanelSRankYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
                <tr>
                  <td colSpan="4">주요 골격 : {perfData?.partsMainSkltYn === 'Y' ? '있음' : '없음'}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ) : (
            <div className="accident-history-cont">
              <table summary="사고이력" className="table-tp1">
                <caption className="away">사고이력</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan="2" className="tx-c">
                      사고이력
                  </th>
                  </tr>
                  <tr>
                    <th>상태</th>
                    <td>{perfData?.acdtHstYn === 'Y' ? '있음' : '없음'}</td>
                  </tr>
                  <tr>
                    <th>단순수리</th>
                    <td>{perfData?.smplRprYn === 'Y' ? '있음' : '없음'}</td>
                  </tr>
                  {/* <tr>
                  <th>현재주행거리</th>
                  <td>{nf.format(perfData?.prsnDrvDist)}km</td>
                </tr> */}
                </tbody>
              </table>
              <table summary="부위별 이상여부 (하단참조)" className="table-tp1">
                <caption className="away">부위별 이상여부 (하단참조)</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th colSpan="2" className="tx-c">
                      부위별 이상여부 (하단참조)
                  </th>
                  </tr>
                  <tr>
                    <th>외판부위1랭크</th>
                    <td>{perfData?.partsOutPanelFRankYn === 'Y' ? '있음' : '없음'}</td>
                  </tr>
                  <tr>
                    <th>가격산정평가액</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>외판부위2랭크</th>
                    <td>{perfData?.partsOutPanelSRankYn === 'Y' ? '있음' : '없음'}</td>
                  </tr>
                  <tr>
                    <th>가격산정평가액</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>주요골격</th>
                    <td>{perfData?.partsMainSkltYn === 'Y' ? '있음' : '없음'}</td>
                  </tr>
                  <tr>
                    <th>가격산정평가액</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>비고</th>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              <h3>자동차 상태표시</h3>
              <fieldset className="car-record">
                <legend className="away">사고 교환 수리 등 이력</legend>
                <div className="car-record-state1">
                  <img src="/images/mobile/contents/car-img-top.png" alt="자동차 도면(위)" />
                  {createIco(1, perfData ? perfData.hood : isView1)}
                  {createIco(2, perfData ? perfData.frontFenderLeft : isView2)}
                  {createIco(3, perfData ? perfData.frontFenderRight : isView3)}
                  {createIco(4, perfData ? perfData.frontDoorLeft : isView4)}
                  {createIco(5, perfData ? perfData.frontDoorRight : isView5)}
                  {createIco(6, perfData ? perfData.rearDoorLeft : isView6)}
                  {createIco(7, perfData ? perfData.rearDoorRight : isView7)}
                  {createIco(8, perfData ? perfData.trunklid : isView8)}
                  {createIco(9, perfData ? perfData.rdarSpt : isView9)}
                  {createIco(10, perfData ? perfData.roofPnst : isView10)}
                  {createIco(11, perfData ? perfData.qrtrPnstLeft : isView11)}
                  {createIco(12, perfData ? perfData.qrtrPnstRight : isView12)}
                  {createIco(13, perfData ? perfData.sideSealPnstLeft : isView13)}
                  {createIco(14, perfData ? perfData.sideSealPnstRight : isView14)}
                </div>
                <ul className="car-record-label">
                  <li>
                    <i className="ico-state-x on"></i>교환
                </li>
                  <li>
                    <i className="ico-state-w on"></i>판금/용접
                </li>
                  <li>
                    <i className="ico-state-c on"></i>흠집
                </li>
                </ul>
                <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
                  <caption className="hide">
                    사고 <i className="ico-dot big"></i> 교환 <i className="ico-dot big"></i> 수리 등 이력
                </caption>
                  <colgroup>
                    <col width="12.5%" />
                    <col width="50%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colSpan="5">1랭크</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>부위 명칭</th>
                      <th>X</th>
                      <th>W</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="tl">후드</td>
                      <td>
                        <Radio className="simple state-x" id="car-history1-1" value={1} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history1-2" value={2} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history1-3" value={3} checked={perfData ? perfData.hood : isValue1} disabled={true} onChange={handleChange1} />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="tl">프론트 휀더(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history2-1" value={1} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history2-2" value={2} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history2-3" value={3} checked={perfData ? perfData.frontFenderLeft : isValue2} disabled={true} onChange={handleChange2} />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="tl">프론트 휀더(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history3-1" value={1} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history3-2" value={2} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history3-3" value={3} checked={perfData ? perfData.frontFenderRight : isValue3} disabled={true} onChange={handleChange3} />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="tl">프론트 도어(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history4-1" value={1} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history4-2" value={2} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history4-3" value={3} checked={perfData ? perfData.frontDoorLeft : isValue4} disabled={true} onChange={handleChange4} />
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="tl">프론트 도어(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history5-1" value={1} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history5-2" value={2} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history5-3" value={3} checked={perfData ? perfData.frontDoorRight : isValue5} disabled={true} onChange={handleChange5} />
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="tl">리어 도어(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history6-1" value={1} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history6-2" value={2} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history6-3" value={3} checked={perfData ? perfData.rearDoorLeft : isValue6} disabled={true} onChange={handleChange6} />
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td className="tl">리어 도어(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history7-1" value={1} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history7-2" value={2} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history7-3" value={3} checked={perfData ? perfData.rearDoorRight : isValue7} disabled={true} onChange={handleChange7} />
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="tl">트렁크리드</td>
                      <td>
                        <Radio className="simple state-x" id="car-history8-1" value={1} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history8-2" value={2} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history8-3" value={3} checked={perfData ? perfData.trunklid : isValue8} disabled={true} onChange={handleChange8} />
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="tl">
                        라디에이터 서포트
                      <br />
                      (볼트체결부품)
                    </td>
                      <td>
                        <Radio className="simple state-x" id="car-history9-1" value={1} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history9-2" value={2} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history9-3" value={3} checked={perfData ? perfData.rdarSpt : isValue9} disabled={true} onChange={handleChange9} />
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="5">2랭크</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>부위 명칭</th>
                      <th>X</th>
                      <th>W</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10</td>
                      <td className="tl">루프패널</td>
                      <td>
                        <Radio className="simple state-x" id="car-history10-1" value={1} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history10-2" value={2} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history10-3" value={3} checked={perfData ? perfData.roofPnst : isValue10} disabled={true} onChange={handleChange10} />
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="tl">쿼터 패널(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history11-1" value={1} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history11-2" value={2} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history11-3" value={3} checked={perfData ? perfData.qrtrPnstLeft : isValue11} disabled={true} onChange={handleChange11} />
                      </td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="tl">쿼터 패널(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history12-1" value={1} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history12-2" value={2} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history12-3" value={3} checked={perfData ? perfData.qrtrPnstRight : isValue12} disabled={true} onChange={handleChange12} />
                      </td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="tl">사이드실 패널(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history13-1" value={1} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history13-2" value={2} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history13-3" value={3} checked={perfData ? perfData.sideSealPnstLeft : isValue13} disabled={true} onChange={handleChange13} />
                      </td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="tl">사이드실 패널(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history14-1" value={1} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history14-2" value={2} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history14-3" value={3} checked={perfData ? perfData.sideSealPnstRight : isValue14} disabled={true} onChange={handleChange14} />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="car-record-state2">
                  <img src="/images/mobile/contents/car-img-bottom.png" alt="자동차 도면(아래)" />
                  {createIco(1, perfData ? perfData.frtPnst : isView15)}
                  {createIco(2, perfData ? perfData.crossMem : isView16)}
                  {createIco(3, perfData ? perfData.insdPnstLeft : isView17)}
                  {createIco(4, perfData ? perfData.insdPnstRight : isView18)}
                  {createIco(5, perfData ? perfData.rearPnst : isView19)}
                  {createIco(6, perfData ? perfData.trunkFloor : isView20)}
                  {createIco(7, perfData ? perfData.frtSideMemLeft : isView21)}
                  {createIco(8, perfData ? perfData.frtSideMemRight : isView22)}
                  {createIco(9, perfData ? perfData.rearSideMemLeft : isView23)}
                  {createIco(10, perfData ? perfData.rearSideMemRight : isView24)}
                  {createIco(11, perfData ? perfData.frtWhlHouseLeft : isView25)}
                  {createIco(12, perfData ? perfData.frtWhlHouseRight : isView26)}
                  {createIco(13, perfData ? perfData.rearWhlHouseLeft : isView27)}
                  {createIco(14, perfData ? perfData.rearWhlHouseRight : isView28)}
                  {createIco(15, perfData ? perfData.pilrPnstFrtLeft : isView29)}
                  {createIco(16, perfData ? perfData.pilrPnstFrtRight : isView30)}
                  {createIco(17, perfData ? perfData.pilrPnstMedmLeft : isView31)}
                  {createIco(18, perfData ? perfData.pilrPnstMedmRight : isView32)}
                  {createIco(19, perfData ? perfData.pilrPnstRearLeft : isView33)}
                  {createIco(20, perfData ? perfData.pilrPnstRearRight : isView34)}
                  {createIco(21, perfData ? perfData.pckgTray : isView35)}
                  {createIco(22, perfData ? perfData.dashPnst : isView36)}
                  {createIco(23, perfData ? perfData.floorPnst : isView37)}
                </div>
                <ul className="car-record-label">
                  <li>
                    <i className="ico-state-x on"></i>교환
                </li>
                  <li>
                    <i className="ico-state-w on"></i>판금/용접
                </li>
                  <li>
                    <i className="ico-state-c on"></i>흠집
                </li>
                </ul>
                <table summary="사고 교환 수리 등 이력에 대한 내용" className="table-tp1 th-c td-c">
                  <caption className="hide">
                    사고 <i className="ico-dot big"></i> 교환 <i className="ico-dot big"></i> 수리 등 이력
                </caption>
                  <colgroup>
                    <col width="12.5%" />
                    <col width="50%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th colSpan="5">A랭크</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>부위 명칭</th>
                      <th>X</th>
                      <th>W</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="tl">프론트 패널</td>
                      <td>
                        <Radio className="simple state-x" id="car-history15-1" value={1} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history15-2" value={2} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history15-3" value={3} checked={perfData ? perfData.frtPnst : isValue15} disabled={true} onChange={handleChange15} />
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td className="tl">크로스 멤버</td>
                      <td>
                        <Radio className="simple state-x" id="car-history16-1" value={1} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history16-2" value={2} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history16-3" value={3} checked={perfData ? perfData.crossMem : isValue16} disabled={true} onChange={handleChange16} />
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td className="tl">인사이드 패널(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history17-1" value={1} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history17-2" value={2} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history17-3" value={3} checked={perfData ? perfData.insdPnstLeft : isValue17} disabled={true} onChange={handleChange17} />
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td className="tl">인사이드 패널(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history18-1" value={1} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history18-2" value={2} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history18-3" value={3} checked={perfData ? perfData.insdPnstRight : isValue18} disabled={true} onChange={handleChange18} />
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td className="tl">리어 패널</td>
                      <td>
                        <Radio className="simple state-x" id="car-history19-1" value={1} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history19-2" value={2} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history19-3" value={3} checked={perfData ? perfData.rearPnst : isValue19} disabled={true} onChange={handleChange19} />
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td className="tl">트렁크 플로어</td>
                      <td>
                        <Radio className="simple state-x" id="car-history20-1" value={1} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history20-2" value={2} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history20-3" value={3} checked={perfData ? perfData.trunkFloor : isValue20} disabled={true} onChange={handleChange20} />
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="5">B랭크</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>부위 명칭</th>
                      <th>X</th>
                      <th>W</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7</td>
                      <td className="tl">프론트 사이드 멤버(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history21-1" value={1} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history21-2" value={2} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history21-3" value={3} checked={perfData ? perfData.frtSideMemLeft : isValue21} disabled={true} onChange={handleChange21} />
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td className="tl">트론트 사이드 멤버(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history22-1" value={1} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history22-2" value={2} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history22-3" value={3} checked={perfData ? perfData.frtSideMemRight : isValue22} disabled={true} onChange={handleChange22} />
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td className="tl">리어 사이드 멤버(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history23-1" value={1} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history23-2" value={2} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history23-3" value={3} checked={perfData ? perfData.rearSideMemLeft : isValue23} disabled={true} onChange={handleChange23} />
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td className="tl">리어 사이드 멤버(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history24-1" value={1} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history24-2" value={2} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history24-3" value={3} checked={perfData ? perfData.rearSideMemRight : isValue24} disabled={true} onChange={handleChange24} />
                      </td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td className="tl">프론트 휠하우스(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history25-1" value={1} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history25-2" value={2} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history25-3" value={3} checked={perfData ? perfData.frtWhlHouseLeft : isValue25} disabled={true} onChange={handleChange25} />
                      </td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td className="tl">프론트 휠하우스(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history26-1" value={1} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history26-2" value={2} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history26-3" value={3} checked={perfData ? perfData.frtWhlHouseRight : isValue26} disabled={true} onChange={handleChange26} />
                      </td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td className="tl">리어 휠하우스(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history27-1" value={1} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history27-2" value={2} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history27-3" value={3} checked={perfData ? perfData.rearWhlHouseLeft : isValue27} disabled={true} onChange={handleChange27} />
                      </td>
                    </tr>
                    <tr>
                      <td>14</td>
                      <td className="tl">리어 휠하우스(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history28-1" value={1} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history28-2" value={2} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history28-3" value={3} checked={perfData ? perfData.rearWhlHouseRight : isValue28} disabled={true} onChange={handleChange28} />
                      </td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td className="tl">필러 패널A(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history29-1" value={1} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history29-2" value={2} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history29-3" value={3} checked={perfData ? perfData.pilrPnstFrtLeft : isValue29} disabled={true} onChange={handleChange29} />
                      </td>
                    </tr>
                    <tr>
                      <td>16</td>
                      <td className="tl">필러 패널A(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history30-1" value={1} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history30-2" value={2} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history30-3" value={3} checked={perfData ? perfData.pilrPnstFrtRight : isValue30} disabled={true} onChange={handleChange30} />
                      </td>
                    </tr>
                    <tr>
                      <td>17</td>
                      <td className="tl">필러 패널B(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history31-1" value={1} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history31-2" value={2} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history31-3" value={3} checked={perfData ? perfData.pilrPnstMedmLeft : isValue31} disabled={true} onChange={handleChange31} />
                      </td>
                    </tr>
                    <tr>
                      <td>18</td>
                      <td className="tl">필러 패널B(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history32-1" value={1} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history32-2" value={2} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history32-3" value={3} checked={perfData ? perfData.pilrPnstMedmRight : isValue32} disabled={true} onChange={handleChange32} />
                      </td>
                    </tr>
                    <tr>
                      <td>19</td>
                      <td className="tl">필러 패널C(좌)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history33-1" value={1} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history33-2" value={2} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history33-3" value={3} checked={perfData ? perfData.pilrPnstRearLeft : isValue33} disabled={true} onChange={handleChange33} />
                      </td>
                    </tr>
                    <tr>
                      <td>20</td>
                      <td className="tl">필러 패널C(우)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history34-1" value={1} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history34-2" value={2} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history34-3" value={3} checked={perfData ? perfData.pilrPnstRearRight : isValue34} disabled={true} onChange={handleChange34} />
                      </td>
                    </tr>
                    <tr>
                      <td>21</td>
                      <td className="tl">패키지트레이</td>
                      <td>
                        <Radio className="simple state-x" id="car-history35-1" value={1} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history35-2" value={2} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history35-3" value={3} checked={perfData ? perfData.pckgTray : isValue35} disabled={true} onChange={handleChange35} />
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <th colSpan="5">C랭크</th>
                    </tr>
                    <tr>
                      <th>NO</th>
                      <th>부위 명칭</th>
                      <th>X</th>
                      <th>W</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>22</td>
                      <td className="tl">대쉬 패널</td>
                      <td>
                        <Radio className="simple state-x" id="car-history36-1" value={1} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history36-2" value={2} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history36-3" value={3} checked={perfData ? perfData.dashPnst : isValue36} disabled={true} onChange={handleChange36} />
                      </td>
                    </tr>
                    <tr>
                      <td>23</td>
                      <td className="tl">플로어 패널(바닥)</td>
                      <td>
                        <Radio className="simple state-x" id="car-history37-1" value={1} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                      </td>
                      <td>
                        <Radio className="simple state-w" id="car-history37-2" value={2} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                      </td>
                      <td>
                        <Radio className="simple state-c" id="car-history37-3" value={3} checked={perfData ? perfData.floorPnst : isValue37} disabled={true} onChange={handleChange37} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </fieldset>
            </div>
          ))}
    </>
  );
});

CarHistory.propTypes = {
  perfData: PropTypes.object,
  mode: PropTypes.string,
  type: PropTypes.string,
  event: PropTypes.bool,
  callback: PropTypes.func
};
CarHistory.displayName = 'CarHistory';
export default CarHistory;
