import React, { useState, useEffect, createElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classNames from 'classnames/bind';

import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';

import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import { preventScroll } from '@src/utils/CommonUtil';

const periodList = [
  { title: '3개월', code: '3month', id: '3month' },
  { title: '1개월', code: '1month', id: '1month' },
  { title: '15일', code: '15days', id: '15days' },
  { title: '1주일', code: '1week', id: '1week' },
  { title: '오늘', code: 'today', id: 'today' }
];
const mobPeriodList = [
  { title: '오늘', id: 'today', code: 'today', checked: false },
  { title: '1주일', id: '1week', code: '1week', checked: true },
  { title: '15일', id: '15days', code: '15days', checked: false },
  { title: '1개월', id: '1month', code: '1month', checked: false },
  { title: '3개월', id: '3month', code: '3month', checked: false }
];

const HistoryFilter = ({ params = {}, onChangeDate, limitationYear = 1, maxLimitationYear = 10, }) => {
  const { startDt, endDt, period } = params;
  const [startDate, setStartDate] = useState(startDt ? moment(startDt).toDate() : new Date());
  const [endDate, setEndDate] = useState(endDt ? moment(endDt).toDate() : new Date());
  const [ limitDate, setLimitDate ] = useState(moment(endDate).subtract(limitationYear, 'year').toDate());
  console.log("HistoryFilter -> limitDate", limitDate)
  const [max, setMax] = useState(() => {
    const nextDate = moment(new Date()).add(maxLimitationYear, 'year').format('YYYY-MM-DD')
    console.log("HistoryFilter -> nextDate", nextDate)
    return nextDate
  });
  const [selectedPeriod, selectPeriod] = useState(period ?? '');
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [calPop1, setCalPop1] = useState(false);
  const [calPop2, setCalPop2] = useState(false);

  const selectStartDate = (momentDate) => {
    onChangeDate({
      startDt: momentDate.format('YYYY-MM-DD')
    });
  };

  const selectEndDate = (momentDate) => {
    onChangeDate({
      endDt: momentDate.format('YYYY-MM-DD')
    });
  };

  const clickPeriod = (periodCode) => {
    console.log('clickPeriod -> periodCode', periodCode);
    const newToday = new Date();
    const startMt = moment(newToday);
    const endMt = moment(newToday);

    switch (periodCode) {
      case '3month':
        startMt.add(-3, 'months');
        break;
      case '1month':
        startMt.add(-1, 'months');
        break;
      case '15days':
        startMt.add(-15, 'days');
        break;
      case '1week':
        startMt.add(-7, 'days');
        break;
    }

    onChangeDate({
      startDt: startMt.format('YYYY-MM-DD'),
      endDt: endMt.format('YYYY-MM-DD'),
      period: periodCode
    });
  };

  useEffect(() => {
    setStartDate(startDt ? moment(startDt).toDate() : new Date());
    setEndDate(endDt ? moment(endDt).toDate() : new Date());
    selectPeriod(period ?? '');
    setLimitDate(moment(endDt).subtract(limitationYear, 'year').toDate())
  }, [startDt, endDt, period, maxLimitationYear]);

  // 모바일 달력 팝업 제어
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

  const calendarCallback1 = (e, date) => {
    e.preventDefault();
    selectStartDate(date);
    setCalPop1(false);
    preventScroll(false);
  };

  const calendarCallback2 = (e, date) => {
    e.preventDefault();
    selectEndDate(date);
    setCalPop2(false);
    preventScroll(false);
  };

  const calendarClose = (e) => {
    e.preventDefault();
    setCalPop1(false);
    setCalPop2(false);
    preventScroll(false);
  };

  // const { handleCalendarPop1, handleCalendarPop2 } = useContext(DealerContext);

  if (hasMobile) {
    const createBodyPortal = useCreatePortalInBody(null, 'wrap');
    return (
      <>
        <MobButtonFilter checkList={mobPeriodList} onClick={(e, obj, code) => clickPeriod(code)} />
        <div className="mt8">
          <DatePicker defaultValue={startDate} width="46%" onClick={handleCalendarPop1} />
          <em className="from">~</em>
          <DatePicker defaultValue={endDate} width="46%" onClick={handleCalendarPop2} />
        </div>
        {createBodyPortal(
          <>
            <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
              <MobCalendar date={startDate} callback={calendarCallback1} max={endDate} isDateLimit={true} />
            </MobBottomArea>
            <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
              <MobCalendar date={endDate} callback={calendarCallback2} min={startDate} isDateLimit={true} />
            </MobBottomArea>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <DatePicker
        defaultValue={startDate}
        inputWidth={160}
        inputHeight={40}
        onChange={selectStartDate}
        max={endDate}
        min={limitDate}
      />
      <em className="mg8">~</em>
      <DatePicker
        defaultValue={endDate}
        inputWidth={160}
        inputHeight={40}
        onChange={selectEndDate}
        max={max}
        min={startDate}
      />

      {periodList.map((period, i) => (
        <Button
          key={i}
          className={classNames({ on: selectedPeriod == period?.code })}
          size="mid"
          line={ selectedPeriod == period?.code ? "blue80" : "gray"}
          color={ selectedPeriod == period?.code ? "blue80" : "gray"}
          title={period.title}
          width={50}
          height={40}
          marginLeft={i == 0 ? 16 : 8}
          onClick={() => clickPeriod(period?.code)}
          buttonMarkup={true}
        />
      ))}
    </>
  );
};
export default HistoryFilter;
