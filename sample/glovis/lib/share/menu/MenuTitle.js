import React, { useCallback, useContext, useEffect, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { MenuContext } from './MenuItem';

const MenuTitle = memo(({ children, toggle = true, dataContext, menuActive = false, callback }) => {
  const { menuValue, setMenuValue } = useContext(MenuContext);
  const titleOn = classNames({ down: !menuValue }, { up: menuValue });
  const mTit = useRef(null);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      setMenuValue(!menuValue);
      if (callback) {
        callback(e, { isExpanded: menuValue, dataItem: dataContext });
      }
    },
    [callback, dataContext, menuValue, setMenuValue]
  );

  useEffect(() => {
    if (menuActive) {
      mTit.current.click();
    }
  }, [menuActive]);

  return (
    <dt>
      {toggle ? (
        <a href="#" ref={mTit} className={titleOn} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <div>{children}</div>
      )}
    </dt>
  );
});

MenuTitle.propTypes = {
  children: PropTypes.node,
  dataContext: PropTypes.any,
  toggle: PropTypes.bool,
  menuActive: PropTypes.bool,
  callback: PropTypes.func
};

export default MenuTitle;
