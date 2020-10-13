import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { fnChkByte } from '@src/utils/CommonUtil';

const Textarea = memo(
  ({
    id,
    countLimit,
    type,
    placeHolder = '',
    disabled = false,
    data = undefined,
    onChange,
    onKeypress,
    onKeyUp,
    onBlur,
    onFocus,
    name,
    height = 120,
    isSelf = true,
    className,
    disabledEnter = false,
    triggerFocus = false
  }) => {
    const hasMobile = useSelector((state) => state.common.hasMobile);
    const [value, setValue] = useState(data);
    const [count, setCount] = useState((value || '').length);
    const textareaEl = useRef(null);

    useEffect(() => {
      setValue(data);
      if (data && data.length > 0) {
        setCount(fnChkByte({ value: data }, countLimit));
      }
    }, [data]);

    useEffect(() => {
      if (triggerFocus === true) {
        textareaEl.current.focus();
      }
    }, [triggerFocus]);

    const handleInput = useCallback(() => {
      //setCount(textareaEl.current.value.length);
      if (!countLimit) return false;
      setCount(fnChkByte(textareaEl.current, countLimit));
    }, []);

    //useCallback 제거 --> component 에서 호출 시 반응속도로 인한 오류
    const handleChange = (e) => {
      setValue(e.target.value);
      if (onChange) onChange(e, value);
    };

    const handleBlur = useCallback(
      (e) => {
        if (onBlur) onBlur(e, value);
      },
      [onBlur, value]
    );

    const handleFocus = useCallback(
      (e) => {
        if (onFocus) onFocus(e, value);
      },
      [onFocus, value]
    );

    const handleKeyPress = useCallback(
      (e) => {
        if (onKeypress) onKeypress(e);
        if (disabledEnter && e.key === 'Enter') {
          e.preventDefault();
        }
      },
      [disabledEnter, onKeypress]
    );

    const handleKeyUp = useCallback(
      (e) => {
        if (onKeyUp) onKeyUp(e);
      },
      [onKeyUp]
    );

    const textareaClass = classNames('textarea-wrap', { 'no-counter': countLimit === undefined }, { row1: disabledEnter }, { disabled: disabled });

    const textareaStyle = height === 48 ? { height: height + 'px', overflow: 'hidden', padding: '15px 20px' } : { height: height + 'px' };

    return (
      <div className={className !== undefined ? `${textareaClass} ${className}` : `${textareaClass}`} style={hasMobile ? { height: height + 'px' } : null}>
        <textarea
          id={id}
          ref={textareaEl}
          className={`textarea-${type}`}
          onInput={handleInput}
          // maxLength={countLimit}
          placeholder={placeHolder}
          disabled={disabled}
          value={isSelf ? value : data}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          name={name}
          style={!hasMobile ? textareaStyle : null}
          onKeyPress={!hasMobile ? (height === 48 ? handleKeyPress : null) : handleKeyPress}
          onKeyUp={handleKeyUp}
        />
        {countLimit !== undefined && (
          <p className={`text-counter ${count > countLimit ? ` error` : ''}`}>
            <span>{count}</span>/{countLimit}
          </p>
        )}
      </div>
    );
  }
);

Textarea.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  countLimit: PropTypes.number,
  data: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeypress: PropTypes.func,
  onKeyUp: PropTypes.func,
  height: PropTypes.number,
  isSelf: PropTypes.bool,
  disabledEnter: PropTypes.bool
};

Textarea.displayName = 'Textarea';
export default Textarea;
