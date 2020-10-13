import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const InputNumber = ({
  width = '100%',
  height = '48px',
  value = '',
  closeButton = false,
  placeHolder,
  onClick,
  onChange,
  onBlur,
  onFocus,
  id,
  disabled = false,
  readOnly = false,
  onKeyPress,
  name,
  autoComplete = 'off',
  maxLength,
  className,
  hasMobile = false,
  textAlign = 'left',
  onCloseClick
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const spanClass = classNames('input-base', { per: width[width.length - 1] === '%' }, { active: isEditing }, { 'w-close': closeButton }, 'type-1', className);
  const inputStyle = {
    textAlign: textAlign
  };
  typeof width === 'number' ? (inputStyle.width = width + 'px') : (inputStyle.width = width);
  typeof height === 'number' ? (inputStyle.height = height + 'px') : (inputStyle.height = height);

  const spanStyle = {};
  if (hasMobile) {
    inputStyle.height = height !== '48px' ? height : 40;
    spanStyle.width = width[width.length - 1] === '%' ? width : null;
    if (width[width.length - 1] === '%') {
      spanStyle.display = 'inline-block';
      inputStyle.width = '100%';
    }
  }

  const handleChange = (e) => {
    if (onChange && (e.target.value === '' || !isNaN(e.target.value))) {
      onChange(e);
    }
  };

  const handleOnClick = (e) => {
    if (onClick) onClick(e);
  };

  const handleFocusIn = (e) => {
    setIsEditing(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleFocusOut = (e) => {
    setIsEditing(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleCloseClick = useCallback(
    (e) => {
      if (onCloseClick) {
        onCloseClick(e);
      }
    },
    [onCloseClick]
  );

  const toCurrency = (val) => {
    if (val === undefined || val === null || val === '' || val === 0 || val === '0') {
      return '';
    }

    if (isNaN(val)) {
      return '';
    }

    const formatter = new Intl.NumberFormat('ko-KR', {
      style: 'decimal',
      currency: 'KRW'
    });

    return formatter.format(val || '');
  };

  return (
    <span className={spanClass} style={spanStyle}>
      {isEditing ? (
        <input
          type={'text'}
          value={value || ''}
          style={inputStyle}
          placeholder={placeHolder || ''}
          onClick={handleOnClick}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          onBlur={handleFocusOut}
          maxLength={maxLength || 9}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          autoComplete={autoComplete}
        />
      ) : (
        <input
          type="text"
          value={toCurrency(value)}
          style={inputStyle}
          placeholder={placeHolder || ''}
          onClick={handleOnClick}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          onFocus={handleFocusIn}
          maxLength={maxLength || 9}
          id={id}
          disabled={disabled}
          readOnly={readOnly}
          name={name}
          autoComplete={autoComplete}
        />
      )}
      {closeButton ? (
        <span className="btn-close" onClick={handleCloseClick}>
          X
        </span>
      ) : (
        ''
      )}
    </span>
  );
};

InputNumber.propTypes = {
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.number,
  height: PropTypes.node,
  name: PropTypes.string,
  width: PropTypes.node,
  value: PropTypes.any,
  closeButton: PropTypes.bool,
  placeHolder: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  hasMobile: PropTypes.bool,
  textAlign: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onCloseClick: PropTypes.func
};

InputNumber.displayName = 'InputNumber';
export default React.memo(InputNumber);
