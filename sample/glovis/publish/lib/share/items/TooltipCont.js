import { useContext, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TooltipContext } from './Tooltip';
import PropTypes from 'prop-types';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

const TooltipCont = ({children, half=false}) => {
  const { isActive, setIsActive, setHandleFlag, tooltipStyle, setTooltipStyle, placeStyle, event, simple, exception, zid } = useContext(TooltipContext)
  const handleClose = useCallback((e) => {
    e.preventDefault()
    setIsActive(false)
    setHandleFlag(false)
    setTooltipStyle({...tooltipStyle, display: 'none'})
  }, [])
  const createBodyPortal = useCreatePortalInBody(zid !== undefined ? zid : null)
  return createBodyPortal(
    <CSSTransition 
      in={isActive}
      timeout={300}
      classNames={'fade'}
    >
      <div 
        className={
          simple
            ? `tooltip-area simple ${placeStyle} ${exception}`
            : half
                ? `tooltip-area custom half ${placeStyle} ${exception}`
                : `tooltip-area custom ${placeStyle} ${exception}`
              
        }
        style={tooltipStyle}
      >
        <i className="edge"></i>
        {!simple && <i className="edge copy"></i>}
        {event === 'click' && <button className="btn-close" onClick={handleClose}></button>}
        {children}
      </div>
    </CSSTransition>
  )
}

TooltipCont.propTypes = {
  children: PropTypes.node,
  half: PropTypes.bool
}

export default TooltipCont