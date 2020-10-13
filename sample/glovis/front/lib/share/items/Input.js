import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * html 변경이력
 * 03.13 : [모바일] input 안의 value, placeholder 가운데 오도록 처리하기 위한 className props 추가, #a1 부분 참고
 * 200327 김상진 통합완료
 * Input.js 3개 파일 통합완료 - onInput, style, onKeyUp, hsMobile,추가 및 03.13.추가건 통합완료
 * 200408 D191379 maxLength 추가
 */
const Input = ({
  type = 'text',
  width = '100%',
  height = '48px',
  paddingLeft,
  paddingRight,
  value = '',
  closeButton = false,
  placeType = 1,
  placeLabel = null,
  placeHolder,
  onClick,
  onChange,
  onBlur,
  onFocus,
  id,
  disabled = false,
  readOnly = false,
  numberOnly = false,
  patternString = '[0-9]*',
  onKeyPress,
  onKeyUp,
  name,
  style,
  autoComplete = 'off',
  data,
  isSelf = true,
  countLimit,
  uiType = 1,
  marginTop,
  className,
  maxLength,
  nonNumber = false,
  setFocus = false
}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isValue, setIsValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  const [isPlaceType, setIsPlaceType] = useState(placeType);
  const [count, setCount] = useState(value?.length ?? 0);

  const inputEl = useRef();

  const spanClass = classNames(
    'input-base',
    { counter: countLimit },
    { per: width[width.length - 1] == '%' },
    { active: isActive },
    { 'w-close': closeButton },
    { 'type-1': isPlaceType == 1 },
    { 'type-2': isPlaceType == 2 },
    { tp2: uiType == 2 },
    { tp3: uiType == 3 },
    className // #a1
  );

  let inputStyle = { ...style };
  typeof width === 'number' ? (inputStyle.width = width + 'px') : (inputStyle.width = width);
  typeof height === 'number' ? (inputStyle.height = height + 'px') : (inputStyle.height = height);
  paddingLeft !== undefined ? (inputStyle.paddingLeft = paddingLeft + 'px') : null;
  paddingRight !== undefined ? (inputStyle.paddingRight = paddingRight + 'px') : null;
  marginTop !== undefined ? (inputStyle.marginTop = marginTop + 'px') : null;

  let spanStyle = {};
  if (hasMobile) {
    inputStyle.height = height !== '48px' ? height : 40;
    spanStyle.width = width[width.length - 1] == '%' ? width : null;
    if (width[width.length - 1] == '%') {
      spanStyle.display = 'inline-block';
      inputStyle.width = '100%';
    }
  }

  const handleChange = (e) => {
    //console.log('isValue=%o,patternString=%o, e.target.validity.valid=%o', isValue, patternString, e.target.validity.valid);
    if (numberOnly) {
      if (e.target.validity.valid) {
        setIsValue(e.target.value);
        if (onChange) onChange(e, isValue);
      } else {
        // console.log('입력 skip', e.target.validity.valid);
      }
    } else if (nonNumber) {
      //숫자 입력 막기
      if (e.target.validity.valid) {
        const value = (e.target.value).replace(/[0-9]/gi,"");
        setIsValue(value);
        if (onChange) onChange(e, value);
      }
    } else {
      setIsValue(e.target.value);
      if (onChange) onChange(e, isValue);
    }
  };
  const handleClick = (e) => {
    setIsValue('');
    if (isPlaceType === 2) {
      setIsActive(false);
    } else {
      inputEl.current.focus();
    }
  };
  const handleOnClick = (e) => {
    if (onClick) onClick(e);
  };

  const handleLabelClick = (e) => {
    setIsActive(true);
    inputEl.current.focus();
  };

  const handleFocusIn = (e) => {
    setIsActive(true);
    if (onFocus) onFocus(e);
  };

  const handleFocusOut = (e) => {
    if (isPlaceType !== 2) {
      if (isPlaceType === 4 && isValue !== 0) {
        for (const val of isValue) {
          if (/[ㄱ-ㅎㅏ-ㅣ가-힣\b]+$/.test(val)) {
            setIsValue('');
          }
        }
      }
      setIsActive(false);
    } else {
      if (isValue.trim().length === 0) {
        setIsValue('');
        setIsActive(false);
      }
    }
    if (onBlur) onBlur(e);
  };
  const handleInput = useCallback(
    (e) => {
      setCount(inputEl.current.value.length);
    },
    [count]
  );

  useEffect(() => {
    setIsValue(value);
  }, [value]);
  
  //벨리데이션 포커스 타겟이동
  useEffect(() => {
    if(setFocus){
      inputEl.current.focus();
      window.scrollTo(0,window.pageYOffset + inputEl.current.getBoundingClientRect().top - 100)
    }
  },[setFocus]);
  
  return (
    <span className={spanClass} style={spanStyle}>
      {isPlaceType === 3 ? (
        <label className="tit" htmlFor={id}>
          {placeHolder}
        </label>
      ) : (
        ''
      )}
      <input
        type={type}
        value={isSelf ? isValue : data}
        style={inputStyle}
        ref={inputEl}
        placeholder={isPlaceType === 1 || isPlaceType === 4 ? placeHolder : ''}
        onClick={handleOnClick}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        pattern={numberOnly ? patternString : null}
        name={name}
        autoComplete={autoComplete}
        maxLength={countLimit ? countLimit : maxLength}
        onInput={handleInput}
      />
      {closeButton ? (
        <span className="btn-close" onClick={handleClick}>
          X
        </span>
      ) : (
        ''
      )}
      {isPlaceType === 2 ? (
        <label className="label" onClick={handleLabelClick}>
          <span className="txt">{placeLabel}</span>
          <span className="exp">{placeHolder}</span>
        </label>
      ) : (
        ''
      )}
      {countLimit !== undefined && (
        <p className={`text-counter ${count > countLimit ? ` error` : ''}`}>
          <span>{count}</span>/{countLimit}
        </p>
      )}
    </span>
  );
};

Input.propTypes = {
  countLimit: PropTypes.number,
  type: PropTypes.string,
  width: PropTypes.node,
  height: PropTypes.node,
  value: PropTypes.any,
  closeButton: PropTypes.bool,
  placeType: PropTypes.number,
  placeLabel: PropTypes.string,
  placeHolder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  numberOnly: PropTypes.bool,
  patternString: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  marginTop: PropTypes.number,
  data: PropTypes.string,
  isSelf: PropTypes.bool,
  uiType: PropTypes.number,
  nonNumber: PropTypes.bool,
  setFocus : PropTypes.bool
};

export default React.memo(Input);
