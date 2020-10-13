import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import DatePicker from '@src/components/common/calendar/DatePicker';
// import { carWrntTpOptions } from '@src/dummy/carTypeCd';
import { getCommonCodeAsync } from '@src/utils/DataUtils';

import { select_day_list, mobile_select_year, mobile_select_month, mobile_select_day } from '@src/dummy';
import { preventScroll } from '@src/utils/CommonUtil';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

/*
html 변경이력
03.12 : 출고가격 -> 원동기 형식, 가격산정 기준가격 행이 삭제  #a1 부분 참고
03.12 : DataPicker로 변경 #a2 부분 참고
*/
/**
 * 수정: D191379
 * viewer 부분만 변경
 * @param {perfData} perfData 성능점검 조회 데이터
 */
const CarInfo = ({ perfData = {}, onChange, mode = 'apply' }) => {

  //const { crNm, crNo, frmYyyy, mssKnds, fuelDvcd, fuelNm, vin, wrntTp, inspStrtVldty, inspEndVldty, frstRegDt, mortorFrm } = perfData;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // apply, viewer

  const dateFormat = (data) => {
    if (data) {
      let dt = data.replace(/\s/gi, '');
      dt = dt.replace(/(\d{4})(\d{2})(\d{2})/, '$1년 $2월 $3일');
      return dt;
    }
    return '';
  };

  // 버튼식 라디오
  // const [isValue1, setIsValue1] = useState(0);
  // const [optWrntTp, setOptWrntTp] = useState(wrntTp === '' || wrntTp === null || wrntTp === undefined ? 0 : wrntTp);
  // const handleChange1 = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     setIsValue1(Number(e.target.value));
  //   },
  //   [isValue1]
  // );
  const createBodyPortal = useCreatePortalInBody(null, 'wrap');

  // 차량 기본정보 - 달력
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);
  const [calPop3, setCalPop3] = useState(false);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [frstRegDate, setFrstRegDate] = useState();
  const [fuelTypes, setFuelTypes] = useState([]);
  const [carMssList, setCarMssList] = useState([]);

  useEffect(() => {
    setStartDate(perfData?.inspStrtVldty ? moment(perfData?.inspStrtVldty).toDate() : null);
    setEndDate(perfData?.inspEndVldty ? moment(perfData?.inspEndVldty).toDate() : null);
    setFrstRegDate(perfData?.frstRegDt ? moment(perfData?.frstRegDt).toDate() : null);
  }, [perfData]);

  useEffect(() => {
    // getCommonCodeAsync('AM110'),
    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);
  }, []);

  const handleCalendarPop1 = (e) => {
    e.preventDefault();
    setCalPop1(true);
    preventScroll(true);
  };
  const handleCalendarPop2 = (e) => {
    e.preventDefault();
    setCalPop2(true);
    preventScroll(true);
  };
  const handleCalendarPop3 = (e) => {
    e.preventDefault();
    setCalPop3(true);
    preventScroll(true);
  };
  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'inspStrtVldty'
      }
    });
    setStartDate(date);
    setCalPop1(false);
    preventScroll(false);
  };
  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'inspEndVldty'
      }
    });
    setEndDate(date);
    setCalPop2(false);
    preventScroll(false);
  };
  const calendarCallback3 = (e, date) => {
    e.preventDefault();
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'frstRegDt'
      }
    });
    setFrstRegDate(date);
    setCalPop3(false);
    preventScroll(false);
  };
  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    setCalPop3(false);
    preventScroll(false);
  };

  console.log('CarInfo perfData', perfData);
  // console.log('optWrntTp', optWrntTp);

  return (
    <>
      {isMode === 'apply' && (
        <div className="accident-history-cont">
          <table summary="자동차 기본정보에 대한 내용" className="table-tp3">
            <colgroup>
              <col width="37%" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th>차명</th>
                <td>
                  <Input type="text" value={perfData?.crNm} disabled={true} id="input-tp1" width="100%" />
                </td>
              </tr>
              <tr>
                <th>차량등록번호</th>
                <td>
                  <Input type="text" value={perfData?.crNo} disabled={true} id="input-tp2" width="100%" />
                </td>
              </tr>
              <tr>
                <th>연식</th>
                <td>
                  <Input type="text" value={perfData?.frmYyyy} disabled={true} id="input-tp3" width="100%" />
                </td>
              </tr>
              <tr>
                <th>검사유효기간</th>
                <td>
                  <DatePicker defaultValue={startDate} max={endDate} width="100%" name="inspStrtVldty" onClick={handleCalendarPop1} />
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <em className="mr8">~</em>
                  <DatePicker defaultValue={endDate} min={startDate} name="inspEndVldty" width="91.5%" onClick={handleCalendarPop2} />
                </td>
              </tr>
              <tr>
                <th>최초등록일</th>
                <td>
                  <DatePicker defaultValue={frstRegDate} max={endDate} width="100%" onClick={handleCalendarPop3} />
                </td>
              </tr>
              <tr>
                <th>변속기종류</th>
                <td>
                  <Input type="text" value={carMssList.find((carMss) => carMss.value === perfData?.mssKnds)?.label} disabled={true} id="input-tp4" width="100%" />
                </td>
              </tr>
              <tr>
                <th>사용연료</th>
                <td>
                  <Input type="text" value={fuelTypes.find((carFuel) => carFuel.value === perfData?.fuelDvcd)?.label || perfData?.fuelNm} disabled={true} id="input-tp5" width="100%" />
                </td>
              </tr>
              <tr>
                <th>차대번호</th>
                <td>
                  <Input type="text" id="vin-number" width="100%" value={perfData?.vin} name="vin" onBlur={onChange} />
                </td>
              </tr>
              <tr>
                <th>보증유형</th>
                <td>
                  <ul className="radio-block tp2 mid">
                    <li>
                      <Radio className="txt" id="block0-1" name="wrntTp" label="자가보증" value={1} checked={perfData?.wrntTp} onChange={onChange} />
                    </li>
                    <li>
                      <Radio className="txt" id="block0-2" name="wrntTp" label="보험사보증" value={2} checked={perfData?.wrntTp} onChange={onChange} />
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th>원동기형식</th>
                <td>
                  <Input type="text" id="release-price" width="100%" name="mortorFrm" value={perfData?.mortorFrm} onBlur={onChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {hasMobile === true && calPop1
        ? createBodyPortal(
          <>
            {calPop1 && <div className={calPop1 ? `modal-bg v-3 black active` : `modal-bg v-3 black`} onClick={calendarClose} />}
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
              <MobCalendar date={startDate || moment()} max={endDate} callback={calendarCallback1} isDateLimit={true} />
            </MobBottomArea>
          </>
        )
        : null}
      {hasMobile === true && calPop2
        ? createBodyPortal(
          <>
            {calPop2 && <div className={calPop2 ? `modal-bg v-3 black active` : `modal-bg v-3 black`} onClick={calendarClose} />}
            <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
              <MobCalendar date={endDate || moment()} min={startDate} callback={calendarCallback2} isDateLimit={true} />
            </MobBottomArea>
          </>
        )
        : null}
      {hasMobile === true && calPop3
        ? createBodyPortal(
          <>
            {calPop3 && <div className={calPop3 ? `modal-bg v-3 black active` : `modal-bg v-3 black`} onClick={calendarClose} />}
            <MobBottomArea active={calPop3} isFixButton={true} zid={102}>
              <MobCalendar date={frstRegDate || moment()} max={endDate} callback={calendarCallback3} isDateLimit={true} />
            </MobBottomArea>
          </>
        )
        : null}
      {isMode === 'viewer' &&
        (!hasMobile ? (
          <fieldset>
            <table summary="자동차 기본정보에 대한 내용" className="table-tp1">
              <caption>제 {perfData?.perfInspId} 호</caption>
              <colgroup>
                <col width="15%" />
                <col width="27%" />
                <col width="15%" />
                <col width="43%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차명</th>
                  <td>{perfData?.crNm}</td>
                  <th>차량등록번호</th>
                  <td>{perfData?.crNo}</td>
                </tr>
                <tr>
                  <th>연식</th>
                  <td>{perfData?.frmYyyy}년</td>
                  <th>검사유효기간</th>
                  <td>
                    {perfData?.inspStrtVldty} ~ {perfData?.inspEndVldty}
                  </td>
                </tr>
                <tr>
                  <th>최초등록일</th>
                  <td>{dateFormat(perfData?.frstRegDt)}</td>
                  <th>변속기종류</th>
                  <td>{perfData?.mssKnds}</td>
                </tr>
                <tr>
                  <th>사용연료</th>
                  <td>{perfData?.fuelDvcd}</td>
                  <th>차대번호</th>
                  <td>{perfData?.vin}</td>
                </tr>
                <tr>
                  <th>보증유형</th>
                  <td>{perfData?.wrntTp === 1 ? '자가보증' : '보험사보증'}</td>
                  <th>원동기형식</th>
                  <td>{perfData?.mortorFrm}</td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        ) : (
            <div className="accident-history-cont">
              <table summary="자동차 기본정보에 대한 내용" className="table-tp1">
                <caption>제 {perfData?.perfInspId} 호</caption>
                <colgroup>
                  <col width="35%" />
                  <col width="65%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차명</th>
                    <td>{perfData?.crNm}</td>
                  </tr>
                  <tr>
                    <th>차량등록번호</th>
                    <td>{perfData?.crNo}</td>
                  </tr>
                  <tr>
                    <th>연식</th>
                    <td>{perfData?.frmYyyy}년</td>
                  </tr>
                  <tr>
                    <th>검사유효기간</th>
                    <td>
                      {perfData?.inspStrtVldty} ~ {perfData?.inspEndVldty}
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>{dateFormat(perfData?.frstRegDt)}</td>
                  </tr>
                  <tr>
                    <th>변속기종류</th>
                    <td>{perfData?.mssKnds}</td>
                  </tr>
                  <tr>
                    <th>사용연료</th>
                    <td>{perfData?.fuelDvcd}</td>
                  </tr>
                  <tr>
                    <th>차대번호</th>
                    <td>{perfData?.vin}</td>
                  </tr>
                  <tr>
                    <th>보증유형</th>
                    <td>{perfData?.wrntTp}</td>
                  </tr>
                  <tr>
                    <th>원동기형식</th>
                    <td>{perfData?.mortorFrm}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
    </>
  );
};

export default CarInfo;
