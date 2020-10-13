import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { MenuContext } from './MenuContext';

const MenuItem = memo(({ children, isValue = false, buttons = false, fragment = false, className="" }) => {
  const [menuValue, setMenuValue] = useState(isValue);

  useEffect(() => {
    setMenuValue(isValue);
  }, [isValue]);

  if (buttons === false) {
    if (fragment) {
      return (
        <li className={className}><MenuContext.Provider value={{ menuValue, setMenuValue, fragment }}>{children}</MenuContext.Provider></li>
      )
    }
    return (
      <li className={className}>
        <dl>
          <MenuContext.Provider value={{ menuValue, setMenuValue, fragment }}>{children}</MenuContext.Provider>
        </dl>
      </li>
    );
  }
  return <li className={`btns ${className}`}>{children}</li>;
});

MenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isValue: PropTypes.bool,
  buttons: PropTypes.bool,
  fragment: PropTypes.bool
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
