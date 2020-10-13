import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import { numberFormat, transformText } from '@src/utils/CommonUtil';

const RadioButton = memo(({ id, title, label, checked, value, disabled, className = '', children, size, onClick, onChange, hasDetail, price, num, dataContext }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const radioStyle = classNames('radio-basic', { on: checked === value }, { disabled: disabled }, { sml: size === 'small' }, className);

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e, dataContext);
      }
    },
    [dataContext, onChange]
  );

  return (
    <span className={radioStyle} data-id={value} onClick={onClick}>
      <input type="radio" id={id} value={value} disabled={disabled} checked={checked === value} onChange={handleChange} data-label={label} />
      <label htmlFor={id}>{hasMobile ? label || transformText(title) : transformText(title)}</label>
      {children}
      {(price || hasDetail || num) && (
        <div className="fr">
          {price && <span className="price">{numberFormat(price)}</span>}
          {hasDetail && <Button size="sml" line="gray" radius={true} title="상세사양 보기" width={80} href={hasDetail} />}
          {num && <span className="num">{num}</span>}
        </div>
      )}
    </span>
  );
});

RadioButton.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  hasDetail: PropTypes.any,
  price: PropTypes.any,
  num: PropTypes.any,
  dataContext: PropTypes.object
};

export default React.memo(RadioButton);
