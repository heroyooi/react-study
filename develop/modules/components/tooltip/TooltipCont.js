import React, { useContext, useCallback, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from "classnames/bind";

import { TooltipContext } from './TooltipContext';
import PropTypes from 'prop-types';
import usePortal from '../hooks/usePortal';

const TooltipCont = memo(({children}) => {
  const { isActive, setIsActive, setHandleFlag, tooltipStyle, setTooltipStyle, placeStyle, event, exception, zid } = useContext(TooltipContext)
  const handleClose = useCallback((e) => {
    e.preventDefault()
    setIsActive(false)
    setHandleFlag(false)
    setTooltipStyle({...tooltipStyle, display: 'none'})
  }, []);
  const createBodyPortal = usePortal(zid !== undefined ? zid : null);

  const tooltipClass = classNames(
    'tooltip-area',
    placeStyle,
    { [exception]: exception }
  );

  return isActive && createBodyPortal(
    <CSSTransition 
      in={isActive}
      timeout={300}
      classNames={'fade'}
    >
      <div className={tooltipClass} style={tooltipStyle}>
        <i className="edge"></i>
        {event === 'click' && <button className="btn-close" onClick={handleClose}></button>}
        {children}
      </div>
    </CSSTransition>
  )
});

TooltipCont.propTypes = {
  children: PropTypes.node.isRequired,
  half: PropTypes.bool
}

export default TooltipCont