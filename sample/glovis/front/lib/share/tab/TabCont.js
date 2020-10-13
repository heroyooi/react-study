import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './TabContext';

const TabCont = memo(({ children, id, index, onClick, className = '' }) => {
  const { tabValue, isScroll } = useContext(TabContext);
  const tabOn = index === tabValue;
  if (onClick) onClick();
  return (
    <>
      {!isScroll ? (
        <div className={tabOn ? `ui-panel active ${className}` : `ui-panel non-active ${className}`} id={id}>
          {children}
        </div>
      ) : (
        <div className={`ui-panel active ${className}`} id={id}>
          {children}
        </div>
      )}
    </>
  );
});

TabCont.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  id: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func
};

TabCont.displayName = 'TabCont';
export default TabCont;
