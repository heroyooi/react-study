import { useRef, useContext, useCallback } from 'react'
import { TooltipContext } from './Tooltip'
import PropTypes from 'prop-types'

const TooltipItem = ({children}) => {
  const { isActive, setIsActive, event, tooltipStyle, setTooltipStyle, handleFlag, setHandleFlag, placement, width, disabled, exception } = useContext(TooltipContext)
  const buttonEl = useRef(null)
  let calLeft = 0;
  let calTop = 0;
  /*
  const closeTooltip = (e) => {
    e.stopPropagation();
    let container = document.getElementsByClassName('tooltip-area')[0]
    
    if(!container.contains(e.target)){
      setIsActive(false)
      setHandleFlag(false)
      setTooltipStyle({...tooltipStyle, display: 'none'})
      document.removeEventListener('click', closeTooltip)
    }
  }
  */
  const handleTooltip = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!handleFlag) {
      let posTop = window.pageYOffset + 
      buttonEl.current.getBoundingClientRect().top;
      let posLeft = window.pageXOffset +
      buttonEl.current.getBoundingClientRect().left;
      let buttonWidth = buttonEl.current.clientWidth;
      let buttonHeight = buttonEl.current.clientHeight;
      if (placement[0] === 't') { // Top (Common)
        calTop = posTop - 10;
        if (placement[3] === 'L') { // TopLeft
          calLeft = posLeft;
        } else if ( placement[3] === 'R') { // TopRight
          calLeft = posLeft + buttonWidth;
        } else { // Top (Only)
          calLeft = posLeft + buttonWidth/2;
        }
      } else if (placement[0] === 'l') { // Left (Common)
        calLeft = posLeft - 10;
        if (placement[4] === 'T') { // LeftTop
          calTop = posTop;
        } else if (placement[4] === 'B') { // LeftBottom
          calTop = posTop + buttonHeight;
        } else { // Left (Only)
          calTop = posTop + buttonHeight/2;
        }
      } else if (placement[0] === 'r') { // Right (Common)
        calLeft = posLeft + buttonWidth + 10;
        if (placement[5] === 'T') { // RightTop
          calTop = posTop;
        } else if (placement[5] === 'B') { // RightBottom
          calTop = posTop + buttonHeight;
        } else { // Right (Only)
          calTop = posTop + buttonHeight/2;
        }
      } else if (placement[0] === 'b') { // Bottom (Common)
        calTop = posTop + buttonHeight + 10;
        if (placement[6] === 'L') { // BottomLeft
          calLeft = posLeft;
        } else if (placement[6] === 'R') { // BottomRight
          calLeft = posLeft + buttonWidth;
        } else { // Bottom (Only)
          calLeft = posLeft + buttonWidth/2;
        }
      }
      if (exception !== undefined) {
        if (exception === 'car-option') {
          calLeft = calLeft - 39;
        }
      }
      setTooltipStyle({
        display: 'block',
        left: calLeft,
        top: calTop,
        width: width
      })
      setHandleFlag(true)
    }
    setIsActive(true)
    
    //document.addEventListener('click', closeTooltip);
  }, [tooltipStyle])
  
  return (
    event === 'over'
      ? <div ref={buttonEl} onMouseOver={disabled === false ? handleTooltip : null}>{children}</div>
      : <div ref={buttonEl} onClick={disabled === false ? handleTooltip : null}>{children}</div>
  )
}

TooltipItem.propTypes = {
  children: PropTypes.node
}

export default TooltipItem