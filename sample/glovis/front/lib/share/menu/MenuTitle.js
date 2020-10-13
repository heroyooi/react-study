import React, { useCallback, useContext, useEffect, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import DynamicTag from '@lib/share/items/DynamicTag';
import { MenuContext } from './MenuContext';

const MenuTitle = memo(({ children, toggle = true, dataContext, menuActive = false, callback, tagName = 'a' }) => {
  const { menuValue, setMenuValue, fragment } = useContext(MenuContext);
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
      typeof mTit.current.click === 'function' && mTit.current.click();
    }
  }, [menuActive]);

  if (fragment) return children;

  return (
    <dt>
      {toggle ? (
        <DynamicTag ref={mTit} tagName={tagName} className={titleOn} onClick={handleClick}>
          {children}
        </DynamicTag>
      ) : (
        <div className="n-toggle">{children}</div>
      )}
    </dt>
  );
});

MenuTitle.propTypes = {
  children: PropTypes.node,
  dataContext: PropTypes.any,
  tagName: PropTypes.string,
  toggle: PropTypes.bool,
  menuActive: PropTypes.bool,
  callback: PropTypes.func
};

export default MenuTitle;
