import React, { useRef, useContext, useEffect, memo } from 'react'
import { TooltipContext } from './TooltipContext';
import PropTypes from 'prop-types'

const TooltipItem = memo(({ children }) => {
  const { isActive, setIsActive, event, setTooltipStyle, handleFlag, setHandleFlag, placement, width, disabled, exception } = useContext(TooltipContext)
  const buttonEl = useRef(null)
  const calDiff = 12;
  let calLeft = 0;
  let calTop = 0;

  const onCSSttip = () => {
    let posTop = window.pageYOffset + 
    buttonEl.current.getBoundingClientRect().top;
    let posLeft = window.pageXOffset +
    buttonEl.current.getBoundingClientRect().left;
    let buttonWidth = buttonEl.current.clientWidth;
    let buttonHeight = buttonEl.current.clientHeight;
    if (placement[0] === 't') { // top (Common)
      calTop = posTop - calDiff;
      if (placement[3] === 'L') { // topLeft
        calLeft = posLeft;
      } else if ( placement[3] === 'R') { // topRight
        calLeft = posLeft + buttonWidth;
      } else { // top (Only)
        calLeft = posLeft + buttonWidth/2;
      }
    } else if (placement[0] === 'l') { // left (Common)
      calLeft = posLeft - calDiff;
      if (placement[4] === 'T') { // leftTop
        calTop = posTop;
      } else if (placement[4] === 'B') { // leftBottom
        calTop = posTop + buttonHeight;
      } else { // Left (Only)
        calTop = posTop + buttonHeight/2;
      }
    } else if (placement[0] === 'r') { // right (Common)
      calLeft = posLeft + buttonWidth + calDiff;
      if (placement[5] === 'T') { // rightTop
        calTop = posTop;
      } else if (placement[5] === 'B') { // rightBottom
        calTop = posTop + buttonHeight;
      } else { // right (Only)
        calTop = posTop + buttonHeight/2;
      }
    } else if (placement[0] === 'b') { // bottom (Common)
      calTop = posTop + buttonHeight + calDiff;
      if (placement[6] === 'L') { // bottomLeft
        calLeft = posLeft;
      } else if (placement[6] === 'R') { // bottomRight
        calLeft = posLeft + buttonWidth;
      } else { // bottom (Only)
        calLeft = posLeft + buttonWidth/2;
      }
    }
    if (exception !== undefined) {
      // if (exception === 'car-option') {
      //   calLeft = calLeft - 39;
      // }
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
  children: PropTypes.node.isRequired,
}

export default TooltipItem;