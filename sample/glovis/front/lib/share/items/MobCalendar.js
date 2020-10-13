import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Calendar from 'rc-calendar';
import Button from '@lib/share/items/Button';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

const MobCalendar = ({ date, changeDate = true, callback, min = null, max = null, isDateLimit = true, exception = false }) => {
  const myDate = date !== undefined ? moment(new Date(date)) : moment();
  const createBodyPortal = useCreatePortalInBody(null, 'wrap');
  myDate.locale('ko').utcOffset(0);

  function disabledDate(current) {
    if (!current) return false;
    const currentDate = moment(current).format('YYYYMMDD');
    const minDate = min instanceof Date || min ? moment(min).format('YYYYMMDD') : null;
    const maxDate = max instanceof Date || max ? moment(max).format('YYYYMMDD') : null;

    if (min && max) {
      return currentDate - minDate < 0 || currentDate - maxDate > 0;
    } else if (min) {
      return currentDate - minDate < 0;
    } else if (max) {
      return currentDate - maxDate > 0;
    }

    return false;
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
            <p className="year">{myDate.format('YYYY')}년</p>111
            <p className="mmdd">{myDate.format('MMMM Do dddd')}</p>
          </>
        )}
      </div>
      {myDate ? (
        <Calendar
          style={{ zIndex: 1001 }}
          dateInputPlaceholder="날짜선택 필요"
          format={'YYYY-MM-DD'}
          disabledTime={null}
          timePicker={null}
          defaultValue={myDate.add(1, 'days')}
          //value={myDate.add(1, 'days')}
          disabledDate={isDateLimit ? disabledDate : null}
          focusablePanel={false}
          className="ui-calendar"
          showDateInput={false}
          showTime={false}
          onChange={onChangeDate}
        />
      ) : (
        <></>
      )}
      <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
    </>
  );
};

export default MobCalendar;
