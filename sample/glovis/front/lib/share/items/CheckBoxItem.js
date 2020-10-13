import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';
/**
 * 200327 김상진 컴포넌트 통합 완료 CheckBoxItem.js
 * hasMobile 통합
 */
const CheckBoxItem = ({ checked = false, children, dataContext, id, name = 'dname', size = 'large', targetId, onClick, onChange, onSelect }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleClick = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    if (typeof onClick === 'function' && isChecked === false) onClick(e, dataContext);
    if (typeof onChange === 'function') onChange(id, name, !isChecked);
    if (onSelect) {
      onSelect(
        {
          preventDefault: () => {},
          target: {
            id: id,
            checked: !isChecked
          }
        },
        dataContext
      );
    }
  };

  return (
    <li id={targetId || null} onClick={handleClick} className={hasMobile ? (isChecked ? 'on' : null) : null}>
      <CheckBox id={id} checked={isChecked} isSelf={false} size={size} name={name} />
      {children}
    </li>
  );
};

CheckBoxItem.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  dataContext: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  targetId: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func
};

export default CheckBoxItem;
