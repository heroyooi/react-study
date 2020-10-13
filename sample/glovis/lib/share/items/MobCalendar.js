import React, { useState } from 'react';
import moment from 'moment';
import Calendar from 'rc-calendar';
import Button from '@lib/share/items/Button';

const MobCalendar = ({ date, changeDate = true, callback }) => {
  const myDate = date !== undefined ? moment(new Date(date)) : moment();
  myDate.locale('ko').utcOffset(0);

  function disabledDate(current) {
    if (!current) return false;
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }

  const [isDate, setIsDate] = useState(myDate);

  const onChangeDate = (date) => {
    setIsDate(date);
  };

  const handleClick = (e) => {
    if (callback) callback(e, isDate);
  };

  return (
    <>
      <div className="ui-yymd">
        {changeDate ? (
          <>
            <p className="year">{isDate.format('YYYY')}년</p>
            <p className="mmdd">{isDate.format('MMMM Do dddd')}</p>
          </>
        ) : (
          <>
            <p className="year">{myDate.format('YYYY')}년</p>
            <p className="mmdd">{myDate.format('MMMM Do dddd')}</p>
          </>
        )}
      </div>
      <Calendar
        style={{ zIndex: 1001 }}
        dateInputPlaceholder="날짜를 선택해주세요."
        format={'YYYY-MM-DD'}
        disabledTime={null}
        timePicker={null}
        defaultValue={myDate}
        disabledDate={null}
        focusablePanel={false}
        className="ui-calendar"
        showDateInput={false}
        showTime={false}
        onChange={onChangeDate}
      />
      <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
    </>
  );
};

export default MobCalendar;
