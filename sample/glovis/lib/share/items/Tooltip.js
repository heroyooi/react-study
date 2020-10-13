import { useState, useRef, createContext, useCallback } from 'react'
import PropTypes from 'prop-types'

export const TooltipContext = createContext()

const Tooltip = ({children, placement, width='auto', event='over', simple=false, disabled=false, exception, zid}) => {
  let placeStyle = 'place-' + placement;
  const [isActive, setIsActive] = useState(false)
  const [handleFlag, setHandleFlag] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState({display: 'none', left: 0, top: 0, width: width})
  
  const handleLeave = useCallback((e) => {
    e.preventDefault()
    setIsActive(false)
    setHandleFlag(false)
    setTooltipStyle({...tooltipStyle, display: 'none'})
  }, [])

  return (
    <div
      className="tooltip-wrap"
      onMouseLeave={event !== 'click' ? handleLeave : null}
    >
      <TooltipContext.Provider value={{
        isActive, setIsActive, 
        tooltipStyle, setTooltipStyle,
        handleFlag, setHandleFlag,
        placement, placeStyle,
        width, event, simple, disabled,
        exception, zid
      }}>
        {children}
      </TooltipContext.Provider>
    </div>
  )
}

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