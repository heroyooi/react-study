import React, { useState, useCallback, useMemo, memo } from 'react'
import PropTypes from 'prop-types'
import { TooltipContext } from './TooltipContext';
import './Tooltip.scss';

const Tooltip = memo(({children, placement, width='auto', event='over', disabled=false, exception, zid}) => {
  let placeStyle = 'place-' + placement;
  const [isActive, setIsActive] = useState(false);
  const [handleFlag, setHandleFlag] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState({left: 0, top: 0, width});
  
  const handleLeave = useCallback((e) => {
    e.preventDefault();
    setIsActive(false);
    setHandleFlag(false);
    setTooltipStyle({...tooltipStyle});
  }, []);

  const value = useMemo(() => ({
    isActive, setIsActive, handleFlag, setHandleFlag,
    tooltipStyle, setTooltipStyle, placement, placeStyle,
    width, event, disabled, exception, zid
  }), [
    isActive, setIsActive, handleFlag, setHandleFlag,
    tooltipStyle, setTooltipStyle
  ]);

  return (
    <div
      className="tooltip-wrap"
      onMouseLeave={event !== 'click' ? handleLeave : null}
    >
      <TooltipContext.Provider value={value}>
        {children}
      </TooltipContext.Provider>
    </div>
  )
});

Tooltip.propTypes = {
  children: PropTypes.node,
  placement: PropTypes.string,
  width: PropTypes.node,
  event: PropTypes.string,
  simple: PropTypes.bool,
  disabled: PropTypes.bool,
  exception: PropTypes.string,
  zid: PropTypes.number
}

export default Tooltip