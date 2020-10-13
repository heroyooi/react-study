import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import Picker from './Picker';

/**
 * html 변경이력
 * 03.06 : inputMeasure props 추가, #a1 부분 참고
 * 03.09 : 달력 풀페이지 팝업 링크로 연결하기 위한 props 처리, #a2 부분 참고
 * 03.12 : 달력 인풋 비활성화를 위한 props 처리, #a3 부분 참고
 *         모바일 달력 버그 해결, #a4 부분 참고
 *
 * 200327 :  김상진 컴포넌트 통합
 * _DatePicker.js 삭제(컴포넌트 이름만변경)
 *  disabled, onChange, min, max, hasMobile 통합
 *
 */

const DatePicker = ({
  datepickerCustomClass = null,
  defaultValue = null,
  disabled = false,
  disableDayBefore,
  disableDayAfter,
  displayDate,
  inputHeight,
  inputMeasure = 'px',
  inputPlaceholder = '날짜선택 필요',
  inputWidth,
  max,
  min,
  width,
  onChange,
  onClick,
  name
}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const now = moment();
  now.locale('ko').utcOffset(0);
  const format = 'YYYY-MM-DD HH:mm:ss';

  const calendarContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [value, setValue] = useState(defaultValue ? (moment.isMoment(defaultValue) ? defaultValue : !moment.isMoment(defaultValue) ? moment(defaultValue) : defaultValue) : null);

  useEffect(() => {
    if (displayDate === null || displayDate === undefined) {
      setValue(null);
    }
  }, [displayDate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(moment(defaultValue));
    }
  }, [defaultValue]);

  const getFormat = (time) => (time ? format : 'YYYY-MM-DD');

  function getMomentDate(value) {
    if (!value) return null;
    if (value instanceof Date || typeof value === 'string') return moment(value);
    if (moment.isMoment(value)) return value;
  }

  function disabledDate(current) {
    if (!current) return false;
    let isDisabled = false;
    let currentDate = current;

    if (moment.isMoment(current)) {
      currentDate = current.toDate();
    }

    const minDate = getMomentDate(min);
    const maxDate = getMomentDate(max);

    if (min && max) {
      return current.diff(minDate, 'days') <= 0 || current.diff(maxDate, 'days') >= 0;
    } else if (min) {
      return current.diff(minDate, 'days') <= 0;
    } else if (max) {
      return current.diff(maxDate, 'days') >= 0;
    }

    if (disableDayBefore) {
      isDisabled = currentDate < disableDayBefore;
    }

    if (isDisabled === true) {
      return true;
    }

    if (disableDayAfter) {
      isDisabled = currentDate > disableDayAfter;
    }

    return isDisabled;
  }

  const onChangeCalendar = (value) => {
    setValue(value);
    setOpen(false);
    if (onChange) onChange(value);
  };
  const onOpenChangeCalendar = (open) => {
    if (!disabled && !hasMobile) setOpen(open); // #a2, #a4
  };

  const getCalendarContainer = () => calendarContainerRef.current;

  const onFocusCalendar = () => {
    if (!hasMobile) {
      !open && isMouseDown ? setIsMouseDown(false) : setOpen(true);
    }
  };

  const onMouseDownCalendar = () => {
    setIsMouseDown(true);
  };

  const getCalendarDisplayDate = () => {
    if (displayDate) {
      return moment(displayDate);
    }

    if (defaultValue && moment.isMoment(defaultValue)) {
      return defaultValue;
    } else if (defaultValue && !moment.isMoment(defaultValue)) {
      return moment(defaultValue);
    }
    return now;
  };

  const getDisplayText = () => {
    let _defaultDate = defaultValue;

    if (defaultValue && !moment.isMoment(_defaultDate)) {
      _defaultDate = moment(_defaultDate);

      return moment(defaultValue).format('YYYY-MM-DD');
    }

    if (defaultValue && moment.isMoment(_defaultDate)) {
      return moment(defaultValue).format('YYYY-MM-DD');
    }

    if (displayDate) {
      return value ? value.format(getFormat(false)) : '';
    }

    return '';
  };

  const calendar = (
    <Calendar
      style={{ zIndex: 1001 }}
      dateInputPlaceholder="날짜선택 필요"
      format={getFormat(false)}
      disabledTime={null}
      timePicker={null}
      defaultValue={getCalendarDisplayDate()}
      disabledDate={disabledDate}
      focusablePanel={false}
      className="ui-calendar"
      showDateInput={false}
      showTime={false}
    />
  );

  const inputStyle = {};
  if (inputWidth !== undefined) inputStyle.width = inputWidth + inputMeasure; // #a1
  if (inputHeight !== undefined) inputStyle.height = inputHeight;

  const spanStyle = {};
  if (width !== undefined) {
    spanStyle.display = 'inline-block';
    spanStyle.width = width;
    inputStyle.width = '100%';
  }

  const handleDatepicker = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <Picker
      animation="slide-up"
      calendar={calendar}
      value={value}
      disabled={disabled}
      onChange={onChangeCalendar}
      getCalendarContainer={getCalendarContainer}
      onOpenChange={onOpenChangeCalendar}
      open={open}
      style={{ zIndex: 1001 }}
      defaultValue={value}
    >
      {() => {
        return (
          <span className="input-base type-1 date-picker" tabIndex="0" onMouseDown={onMouseDownCalendar} onFocus={onFocusCalendar} style={spanStyle}>
            <input name={name} placeholder={inputPlaceholder} disabled={disabled} readOnly tabIndex="-1" value={getDisplayText()} style={inputStyle} onClick={handleDatepicker} />
            <div ref={calendarContainerRef} className={datepickerCustomClass} />
          </span>
        );
      }}
    </Picker>
  );
};

DatePicker.propTypes = {
  datepickerCustomClass: PropTypes.string,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  displayDate: PropTypes.instanceOf(Date),
  disableDayBefore: PropTypes.instanceOf(Date),
  disableDayAfter: PropTypes.instanceOf(Date),
  inputHeight: PropTypes.node,
  inputMeasure: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputWidth: PropTypes.node,
  max: PropTypes.any,
  min: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default DatePicker;
