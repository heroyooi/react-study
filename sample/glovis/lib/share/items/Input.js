import { useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux';
import classNames from "classnames/bind"
import PropTypes from 'prop-types'

/*
html 변경이력
03.13 : [모바일] input 안의 value, placeholder 가운데 오도록 처리하기 위한 className props 추가, #a1 부분 참고
*/
const Input = ({type='text', width='100%', height='48px', value='', closeButton=false, placeType=1, placeLabel=null, placeHolder, onClick, onChange, onBlur, onFocus, id, disabled=false, readOnly=false, onKeyPress, name, paddingLeft, paddingRight, autoComplete="off", data, isSelf=true, countLimit, uiType=1, marginTop, className}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const [isValue, setIsValue] = useState(value);
  const [isActive, setIsActive] = useState(false);
  const [isPlaceType, setIsPlaceType] = useState(placeType);
  const [count, setCount] = useState(value !== undefined ? value.length : 0);

  const inputEl = useRef()

  const spanClass = classNames(
    "input-base",
    { "counter": countLimit},
    { "per" : width[width.length-1] == '%' },
    { "active" : isActive },
    { "w-close" : closeButton },
    { "type-1" : isPlaceType == 1 },
    { "type-2" : isPlaceType == 2 },
    { "tp2" : uiType == 2 },
    { "tp3" : uiType == 3 },
    className // #a1
  )
  let inputStyle = {};
  typeof width === 'number' ? inputStyle.width = width + 'px' : inputStyle.width = width
  typeof height === 'number' ? inputStyle.height = height + 'px' : inputStyle.height = height
  paddingLeft !== undefined ? inputStyle.paddingLeft = paddingLeft + 'px' : null;
  paddingRight !== undefined ? inputStyle.paddingRight = paddingRight + 'px' : null;
  marginTop !== undefined ? inputStyle.marginTop = marginTop + 'px' : null;
  
  let spanStyle = {};
  if (hasMobile) {    
    inputStyle.height = (height !== '48px') ? height : 40;
    spanStyle.width = (width[width.length-1] == '%') ? width : null;
    if (width[width.length-1] == '%') {
      spanStyle.display = 'inline-block';
      inputStyle.width = '100%';
    }
  } 
  
  const handleChange = (e) => {
    setIsValue(e.target.value)
    if(onChange) onChange(e);
  }
  const handleClick = (e) => {
    setIsValue('')
    if(isPlaceType === 2) {
      setIsActive(false)
    }else{
      inputEl.current.focus()
    }
    
  }
  const handleOnClick = (e) => {
    if(onClick) onClick(e);
  }
  
  const handleLabelClick = (e) => {
    setIsActive(true);
    inputEl.current.focus()
  }

  const handleFocusIn = (e) => {
    setIsActive(true);
    if(onFocus) onFocus(e);
  }
  const handleFocusOut = (e) => {
    if(isPlaceType !== 2) {
      setIsActive(false);
    } else {
      if(isValue.trim().length === 0) {
        setIsValue('');
        setIsActive(false);
      }
    }
    if(onBlur) onBlur(e);
  }

  const handleInput = useCallback((e) => {
    setCount(inputEl.current.value.length);
  }, [count]);

  return (
    <span className={spanClass} style={spanStyle}>
      {
        isPlaceType === 3
        ? <label className="tit" htmlFor={id}>{placeHolder}</label> : ""
      }
      <input 
        type={type}
        value={isSelf ? isValue : data}
        style={inputStyle}
        ref={inputEl}
        placeholder={isPlaceType === 1 ? placeHolder : ''}
        onClick={handleOnClick}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onInput={handleInput}
        maxLength={countLimit}
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        autoComplete={autoComplete}
      />
      {closeButton ? <span className="btn-close" onClick={handleClick}>X</span> : ""}
      {
        isPlaceType === 2 
        ? <label className="label" onClick={handleLabelClick}>
            <span className="txt">{placeLabel}</span>
            <span className="exp">{placeHolder}</span>
          </label>
        : ""
      }
      {
        countLimit !== undefined && 
          <p className={`text-counter ${count > countLimit ? ` error` : ''}`}><span>{count}</span>/{countLimit}</p>
      }
    </span>
  )
}

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
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  marginTop: PropTypes.number,
  data: PropTypes.string,
  isSelf: PropTypes.bool,
  uiType: PropTypes.number,
}

export default React.memo(Input)