import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

const CheckBoxItem = ({ children, id, checked = false, size = 'large', targetId, onClick, onChange }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isChecked, setIsChecked] = useState(checked);
  const handleClick = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    if (isChecked === false && onClick) {
      onClick(e);
    }
    if (onChange) {
      onChange(e, !isChecked);
    }
  };

  return (
    <li id={targetId || null} onClick={handleClick} className={hasMobile ? (isChecked ? 'on' : null) : null}>
      <CheckBox id={id} checked={isChecked} isSelf={false} size={size} />
      {children}
    </li>
  );
};

CheckBoxItem.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  checked: PropTypes.bool,
  size: PropTypes.string,
  targetId: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

export default CheckBoxItem;
