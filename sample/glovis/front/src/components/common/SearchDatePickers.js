import React, { useState, useEffect } from 'react';
import { produce } from 'immer';
import moment, { defaultFormat } from 'moment';
import Button from '@lib/share/items/Button';
import DatePicker from '@src/components/common/calendar/DatePicker';

/**
 * 020206 김민철 수정
 * 'tableStyle' 추가 : 테이블 스타일로 나타나게함
 *
 * 200225 왕태식 수정
 * 'StartData' 추가 : 초기 시작일자를 정해줄수있음
 *
 * 200327 김상진 컴포넌트 통합
 * _SearchDatePickers.js __SearchDatePickers.js 삭제(컴포넌트 이름만 수정)
 *
 * 200414 왕태식 수정
 * 'limitDate' 추가 : 오늘날짜 기준으로 이전날짜 disable처리
 *
 * 200611 박진하 수정
 * 'limitDate' Defualt 값 제거
 * beforeDate 기준을 endDate -> fromDate로 변경
 * 날짜 선택시 시작일보다 종료일이 이전 날짜인경우 시작일과 동일하게 맞춤
 * limitDate가 존재할 경우 endDate가 fromDate기준 limitDate날짜를 초과할 경우 최대치로 설정
 */
const SearchDatePickers = ({ checkedbtnArray, resetSignal, onChange, inputHeight, inputWidth, tableStyle = false, StartDate = 1, limitDate }) => {
  const [clickedBtnIdx, setClickedBtnIdx] = useState(1);
  const [fromDate, setFromDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [beforeDate, setBeforeDate] = useState(moment());
  const [checkedBtns, setCheckedBtns] = useState(checkedbtnArray);

  const clickDateRangeBtnHandler = (e, val, idx) => {
    e.preventDefault();
    setCheckedBtns(
      produce((draft) => {
        draft[clickedBtnIdx].clicked = false;
        draft[clickedBtnIdx].line = 'gray';
        draft[clickedBtnIdx].color = 'gray';
        draft[idx].clicked = true;
        draft[idx].line = 'blue80';
        draft[idx].color = 'blue80';
        setClickedBtnIdx(idx);
      })
    );
    changeDatePickersValue(checkedBtns[idx]);
  };

  const changeFromDatePickerHandler = (value) => {
    setFromDate(value);
    if (value > endDate) {
      setEndDate(value);
    }
  };

  const changeEndDatePickerHandler = (value) => {
    setEndDate(value);
    if (value < fromDate) {
      setFromDate(value);
    }
  };

  const changeDatePickersValue = ({ unit, value }) => {
    setFromDate(moment().subtract(value, unit));
    setEndDate(moment());
  };

  useEffect(() => {
    if (onChange !== undefined && onChange !== null && fromDate !== undefined) {
      onChange({
        fromDate: fromDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      });
    }
  }, [fromDate, endDate]);

  useEffect(() => {
    setFromDate(moment().subtract(StartDate, 'month'));
    setEndDate(moment());
    setCheckedBtns(checkedbtnArray);
    setClickedBtnIdx(0);
  }, [resetSignal]);

  useEffect(() => {
    if (limitDate > 0) {
      const limitDt = moment(fromDate).add(limitDate, 'month');
      setBeforeDate(limitDt);
      if (limitDt < endDate) {
        setEndDate(limitDt);
      }
    }
  }, [fromDate]);

  return (
    <>
      {!tableStyle ? (
        <>
          <DatePicker
            defaultValue={fromDate}
            onChange={changeFromDatePickerHandler}
            inputHeight={inputHeight}
            inputWidth={inputWidth}
            max={endDate}
            disableDayAfter={beforeDate?.toDate() > moment().toDate() ? moment().toDate() : beforeDate?.toDate()}
          />
          <em className="mg8">-</em>
          <DatePicker
            defaultValue={endDate}
            onChange={changeEndDatePickerHandler}
            inputHeight={inputHeight}
            inputWidth={inputWidth}
            min={fromDate}
            max={moment().add(1, 'days')}
            disableDayAfter={beforeDate?.toDate() > moment().toDate() ? moment().toDate() : beforeDate?.toDate()}
            disableDayBefore={fromDate}
          />
          <em className="mg8" />
          {checkedBtns.map((v, idx) => (
            <span key={idx}>
              <Button size="mid" line={v.line} color={v.color} title={v.title} width={50} height={40} onClick={(e) => clickDateRangeBtnHandler(e, v.value, idx)} />
              &nbsp;
            </span>
          ))}
        </>
      ) : (
        <>
          <tr>
            <th rowSpan="3">조회기간</th>
            <td>
              {checkedBtns.map((v, idx) => (
                <span key={idx}>
                  <Button size="mid" line={v.line} color={v.color} title={v.title} width={50} height={40} onClick={(e) => clickDateRangeBtnHandler(e, v.value, idx)} />
                  &nbsp;
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <td>
              <DatePicker defaultValue={fromDate} onChange={changeFromDatePickerHandler} inputHeight={inputHeight} inputWidth={inputWidth} />
              <em className="mg8">-</em>
              <DatePicker defaultValue={endDate} onChange={changeEndDatePickerHandler} inputHeight={inputHeight} inputWidth={inputWidth} />
            </td>
          </tr>
        </>
      )}
    </>
  );
};

export default SearchDatePickers;
