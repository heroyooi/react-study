import React, { useState, useEffect, createContext, memo } from 'react';
import PropTypes from 'prop-types';

export const MenuContext = createContext();

const MenuItem = memo(({ children, isValue = false, buttons = false }) => {
  const [menuValue, setMenuValue] = useState(isValue);

  useEffect(() => {
    setMenuValue(isValue);
  }, [isValue]);

  if (buttons === false) {
    return (
      <li>
        <dl>
          <MenuContext.Provider value={{ menuValue, setMenuValue }}>{children}</MenuContext.Provider>
        </dl>
      </li>
    );
  }
  return <li className="btns">{children}</li>;
});

MenuItem.propTypes = {
  children: PropTypes.node,
  isValue: PropTypes.bool,
  buttons: PropTypes.bool
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
