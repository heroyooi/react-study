import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import Picker from './Picker';

/*
html 변경이력
03.06 : inputMeasure props 추가, #a1 부분 참고
03.09 : 달력 풀페이지 팝업 링크로 연결하기 위한 props 처리, #a2 부분 참고
03.12 : 달력 인풋 비활성화를 위한 props 처리, #a3 부분 참고
        모바일 달력 버그 해결, #a4 부분 참고
*/
const DatePicker = ({defaultValue = null, inputPlaceholder="날짜를 선택해주세요", width, inputWidth, inputMeasure='px', inputHeight, onChange, onClick, disabled=false, datepickerCustomClass=null}) => {
  const hasMobile = useSelector(state => state.common.hasMobile); // #a4
  const now = moment()
  now.locale('ko').utcOffset(0)
  const format = 'YYYY-MM-DD HH:mm:ss'

  const calendarContainerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [value, setValue] = useState(defaultValue) // null 로 설정하면 input 값이 비어져있음

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const getFormat = (time) => time ? format : 'YYYY-MM-DD'

  function disabledTime(date) {
    if (date && (date.date() === 15)) {
      return {
        disabledHours() {
          return [3, 4];
        },
      };
    }
    return {
      disabledHours() {
        return [1, 2];
      },
    };
  }
  
  function disabledDate(current) {
    if (!current) return false;
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
  }
  
  const onChangeCalendar = (value) => {
    //console.log('DatePicker change: ', (value && value.format(format)));
    setValue(value);
    setOpen(false);
    if(onChange) onChange(value);
  }
  const onOpenChangeCalendar = (open) => {
    if (!disabled && !hasMobile) setOpen(open); // #a2, #a4
  }
  
  const getCalendarContainer = () => calendarContainerRef.current
  
  const onFocusCalendar = () => {
    if (!hasMobile) { // #a4
      !open && isMouseDown ? setIsMouseDown(false) : setOpen(true)
    }
  }
  
  const onMouseDownCalendar = () => {
    setIsMouseDown(true)
  }
  
  const calendar = (<Calendar
    style={{ zIndex: 1001 }}
    dateInputPlaceholder="날짜를 선택해주세요."
    format={getFormat(false)}
    disabledTime={null}
    timePicker={null}
    defaultValue={defaultValue !== undefined ? now : defaultValue}
    disabledDate={disabledDate}
    focusablePanel={false}
    className="ui-calendar"
    showDateInput={false}
    showTime={false}
  />)

  let input_style = {}
  if(inputWidth !== undefined) input_style.width = inputWidth+inputMeasure; // #a1
  if(inputHeight !== undefined) input_style.height = inputHeight;

  let span_style = {};
  if (width !== undefined) {
    span_style.display = 'inline-block';
    span_style.width = width;
    input_style.width = '100%';
  }

  // #a2 start
  const handleDatepicker = (e) => {
    if (onClick) onClick(e);
  }
  // #a2 end

  return (
    <Picker
      animation="slide-up"
      calendar={calendar}
      value={value}
      onChange={onChangeCalendar}
      getCalendarContainer={getCalendarContainer}
      onOpenChange={onOpenChangeCalendar}
      open={open}
      style={{ zIndex: 1001 }}
    >
      {
        ({ value }) => {
          return (
            <span className="input-base type-1 date-picker" tabIndex="0" onMouseDown={onMouseDownCalendar} onFocus={onFocusCalendar} style={span_style}>
              <input
                placeholder={inputPlaceholder}
                disabled={disabled} // #a3
                readOnly
                tabIndex="-1"
                value={value && value.format(getFormat(false)) || ''}
                style={input_style}
                onClick={handleDatepicker} // #a2
              />
              <div ref={calendarContainerRef} className={datepickerCustomClass} />
            </span>
          );
        }
      }
    </Picker>
  )
}

DatePicker.propTypes = {
  defaultValue: PropTypes.any,
  inputWidth: PropTypes.node,
  inputMeasure: PropTypes.string,
  inputHeight: PropTypes.node,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default DatePicker