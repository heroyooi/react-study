import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const SimpleTextarea = ({ countLimit, type, placeHolder = '', disabled = false, value = '', onBlur, name }) => {
  const [computed, setComputed] = useState(value)

  const onChangeHook = (e) => {
    const { value, name } = e.target
    setComputed(value)
  }
  const onBlurHook = (e) => {
    onBlur({
      target : {
        name,
        value:computed
      }
    })
  }

  useEffect(()=>{
    setComputed(value)
  }, [ value ])

  return (
    <div className="textarea-wrap">
      <textarea
        className={`textarea-${type}`}
        maxLength={countLimit}
        placeholder={placeHolder}
        disabled={disabled}
        value={computed ?? ""}
        onChange={onChangeHook}
        onBlur={onBlurHook}
        name={name}
      />
      {countLimit !== undefined && (
        <p className={`text-counter ${computed?.length > countLimit ? ` error` : ''}`} style={{ bottom: '5%' }}>
          <span>{computed?.length}</span>/{countLimit}
        </p>
      )}
    </div>
  );
};

SimpleTextarea.propTypes = {
  countLimit: PropTypes.number,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onBlur: PropTypes.func,
};

export default SimpleTextarea;
