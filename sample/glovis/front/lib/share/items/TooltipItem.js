import { useRef, useContext, useCallback, useEffect, memo } from 'react'
import { TooltipContext } from './TooltipContext';
import PropTypes from 'prop-types'

const TooltipItem = memo(({children}) => {
  const { isActive, setIsActive, event, tooltipStyle, setTooltipStyle, handleFlag, setHandleFlag, placement, width, disabled, exception } = useContext(TooltipContext)
  const buttonEl = useRef(null)
  let calLeft = 0;
  let calTop = 0;

  const onCSSttip = () => {
    console.log('onCSSttip');
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
      left: calLeft,
      top: calTop,
      width
    });
  };

  useEffect(() => {
    isActive && window.addEventListener('resize', onCSSttip);
    return () => isActive && window.removeEventListener('resize', onCSSttip);
  }, [isActive]);

  const onCloseTtip = (e) => {
    e.stopPropagation();
    let container = document.getElementsByClassName('tooltip-area')[0];
    
    if(!container?.contains(e.target)){
      setIsActive(false)
      setHandleFlag(false)
      event === "click" && document.removeEventListener('click', onCloseTtip);
    }
  }
  
  const onOpenTtip = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(isActive){return false}
    if (!handleFlag) {
      onCSSttip();
      setHandleFlag(true);
    }
    setIsActive(true);
    event === "click" && document.addEventListener('click', onCloseTtip);
  }
  
  return (
    event === 'over'
      ? <div ref={buttonEl} onMouseOver={disabled === false ? onOpenTtip : null}>{children}</div>
      : <div ref={buttonEl} onClick={disabled === false ? onOpenTtip : null}>{children}</div>
  )
});

TooltipItem.propTypes = {
  children: PropTypes.node
}

export default TooltipItem