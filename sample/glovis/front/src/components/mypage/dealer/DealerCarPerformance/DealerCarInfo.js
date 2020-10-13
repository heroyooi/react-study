import { useState, useMemo, useEffect } from 'react';
import moment from 'moment';

import Input from '@lib/share/items/Input';
import RadioGroup from '@src/components/common/car/carRadioGroups';
import DatePicker from '@src/components/common/calendar/DatePicker';

import { carWrntTpOptions } from '@src/dummy/carTypeCd';
import { getCommonCodeAsync } from '@src/utils/DataUtils';

const toDate = new Date()

const DealerCarInfo = ({ item = {}, onChange, isEditing = true }) => {
  const { crNm, crNo, frmYyyy, mssKnds, fuelDvcd, fuelNm, vin, wrntTp, inspStrtVldty, inspEndVldty, frstRegDt, mortorFrm } = item;
  console.log('DealerCarInfo -> item', item);

  const [fuelTypes, setFuelTypes] = useState([]);
  const [carMssList, setCarMssList] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log('DealerCarInfo -> endDate', endDate);

  useEffect(() => {
    // getCommonCodeAsync('AM110'),
    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);
  }, []);

  useEffect(() => {
    setStartDate(inspStrtVldty ? moment(inspStrtVldty).toDate() : null);
    setEndDate(inspEndVldty ? moment(inspEndVldty).toDate() : null);
  }, [inspStrtVldty, inspEndVldty]);

  const onChangeDate = (date) => {
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'frstRegDt'
      }
    });
  };

  const onChangeInspStartDate = (date) => {
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'inspStrtVldty'
      }
    });
  };

  const onChangeInspEndDate = (date) => {
    onChange({
      target: {
        value: date.format('YYYYMMDD'),
        name: 'inspEndVldty'
      }
    });
  };

  const frstRegDtMt = useMemo(() => {
    if (typeof frstRegDt == 'string') {
      return moment(frstRegDt).toDate();
    } else {
      frstRegDt;
    }
  }, [frstRegDt]);

  return (
    <fieldset>
      <legend className="away">자동차 기본 정보</legend>
      <table summary="자동차 기본 정보에 대한 내용" className="table-tp1 input">
        <caption>자동차 기본 정보</caption>
        <colgroup>
          <col width="15%" />
          <col width="27%" />
          <col width="15%" />
          <col width="43%" />
        </colgroup>
        <tbody>
          <tr>
            <th>차명</th>
            <td>{crNm || ''}</td>
            <th>차량등록번호</th>
            <td>{crNo}</td>
          </tr>
          <tr>
            <th>연식</th>
            <td>{frmYyyy}년</td>
            <th>검사유효기간 <span style={{ color: 'red' }}>*</span></th>
            <td>
              <DatePicker disabled={!isEditing} defaultValue={startDate} max={endDate} inputWidth={160} inputHeight={40} onChange={onChangeInspStartDate} name="inspStrtVldty" inputPlaceholder={"날짜선택"} />
              <em className="mg8">-</em>
              <DatePicker disabled={!isEditing} defaultValue={endDate} min={startDate} inputWidth={160} inputHeight={40} onChange={onChangeInspEndDate} name="inspEndVldty" inputPlaceholder={"날짜선택"} />
            </td>
          </tr>
          <tr>
            <th>최초등록일 <span style={{ color: 'red' }}>*</span></th>
            <td>
              <DatePicker disabled={!isEditing} defaultValue={frstRegDt} max={moment(toDate).add(1, 'days').toDate()} inputWidth={160} inputHeight={40} onChange={onChangeDate} />
            </td>
            <th>변속기종류</th>
            <td>{carMssList.find((carMss) => carMss.value == mssKnds)?.label}</td>
          </tr>
          <tr>
            <th>사용연료</th>
            <td>{fuelTypes.find((carFuel) => carFuel.value == fuelDvcd)?.label || fuelNm}</td>
            <th>차대번호 <span style={{ color: 'red' }}>*</span></th>
            <td>
              <Input disabled={!isEditing} type="text" id="vin-number" height={40} value={vin} name="vin" onBlur={onChange} />
            </td>
          </tr>
          <tr>
            <th>보증유형</th>
            <td>
              <RadioGroup disabled={!isEditing} selectedValue={wrntTp} options={carWrntTpOptions} name="wrntTp" vertical={false} onChange={onChange} />
            </td>
            <th>원동기 형식 <span style={{ color: 'red' }}>*</span></th>
            <td>
              <Input disabled={!isEditing} type="text" id="release-price" height={40} value={mortorFrm} name="mortorFrm" onBlur={onChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  );
};

export default DealerCarInfo;
