import React, { memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import { numberFormat, transformText } from '@src/utils/CommonUtil';
/**
 * 200327 김상진 컴포넌트 통합 완료 Radio.js
 * hasMobile 통합완료
 */
const Radio = memo(({ id, name, title, label, checked, value, disabled, className = '', children, size, onClick, onChange, hasDetail, price, num, dataContext, pricingMgrade }) => {
  const radioStyle = classNames('radio-basic', { on: checked == value }, { disabled: disabled }, { sml: size === 'small' }, className);
  const handleClick = useCallback(
    (e) => {
      if (onClick) {
        onClick(e, dataContext);
      }
    },
    [dataContext, onClick]
  );

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        onChange(e, dataContext);
      }
    },
    [dataContext, onChange]
  );
  
  const gradeFullPop = (e) => {
    if(pricingMgrade) {
      pricingMgrade(e, hasDetail);
    }
  }

  return (
    <span className={radioStyle} data-id={value} onClick={handleClick}>
      <input type="radio" id={id} value={value} name={name} disabled={disabled} checked={checked === value} onChange={handleChange} data-label={label} />
      <label htmlFor={id}>{label !== undefined ? label : transformText(title)}</label>
      {children}
      {(price || hasDetail || num) && (
        <div className="fr">
          {price && <span className="price">{numberFormat(price)}</span>}
          {hasDetail && (
              pricingMgrade ?
              <Button size="sml" line="gray" radius={true} title="상세사양 보기" width={80} onClick={gradeFullPop} />
              :
              <Button size="sml" line="gray" radius={true} title="상세사양 보기" width={80} href={hasDetail} />
            )
          }
          {num && <span className="num">{num}</span>}
        </div>
      )}
    </span>
  );
});

Radio.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.any,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  dataContext: PropTypes.object,
  hasDetail: PropTypes.any,
  price: PropTypes.any,
  num: PropTypes.any,
  pricingMgrade : PropTypes.func
};

export default React.memo(Radio);
