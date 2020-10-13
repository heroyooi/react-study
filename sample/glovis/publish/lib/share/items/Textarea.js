import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

const Textarea = memo(({countLimit, type, placeHolder='', disabled=false, data=undefined, onChange, onBlur, onFocus, onKeypress, name, height=120, isSelf=true, className, mode="normal", disabledEnter=false}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [value, setValue] = useState(data);
  const [count, setCount] = useState(value !== undefined ? value.length : 0);
  const textareaEl = useRef(null);

  const handleInput = useCallback((e) => {
    setCount(textareaEl.current.value.length);
  }, [count]);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    if(onChange) onChange(e);
  }, [value]);
  const handleBlur = useCallback((e) => {
    if(onBlur) onBlur(e);
  }, [value]);
  const handleFocus = useCallback((e) => {
    if(onFocus) onFocus(e);
  }, [value]);
  const handleKeyPress = useCallback((e) => {
    if (onKeypress) onKeypress(e);
    if (disabledEnter && e.key === "Enter") {
      e.preventDefault();
    }
  }, []);

  const textareaClass = classNames(
    "textarea-wrap",
    { "no-counter": countLimit === undefined },
    { "row1": disabledEnter },
  )

  const textareaStyle = (height === 48)
    ? {height: height+'px', overflow: 'hidden', padding: '15px 20px'}
    : {height: height+'px'};

  return (
    <div className={
      className !== undefined
        ? `${textareaClass} ${className}`
        : `${textareaClass}`
    } style={hasMobile ? {height: height+'px'} : null}>
      <textarea ref={textareaEl} className={`textarea-${type}`} onInput={handleInput} maxLength={countLimit} placeholder={placeHolder} disabled={disabled} value={isSelf ? value : data} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} name={name} style={!hasMobile ? textareaStyle : null} onKeyPress={
        !hasMobile
          ? height === 48 ? handleKeyPress : null
          : handleKeyPress
      } />
      {
        countLimit !== undefined && 
          <p className={`text-counter ${count > countLimit ? ` error` : ''}`}><span>{count}</span>/{countLimit}</p>
      }
    </div>
  )
});

Textarea.propTypes = {
  countLimit: PropTypes.number,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  height: PropTypes.number,
  isSelf: PropTypes.bool,
  disabledEnter: PropTypes.bool,
}

export default Textarea