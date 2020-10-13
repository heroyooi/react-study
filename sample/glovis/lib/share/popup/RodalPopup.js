import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import Rodal from 'rodal';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';

const RodalPopup = memo(({ children, show, title, type, mode = 'normal', width, maxWidth, measure, size, closedHandler, isMask = true, isButton = true, duration = 300, className, marginLeft, marginTop, buttons = false, subPop=false, subTitle }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [popupTop, setPopupTop] = useState(0);
  const [popupHeight, setPopupHeight] = useState(0);
  const [popupLargeOverflow, setPopupLargeOverflow] = useState(false);
  
  const popupEl = useRef(null);
  const toggleShow = (flag) => {
    closedHandler(flag)
  };
  const closePopup = useCallback((e) => {
    e.preventDefault();
    if (!subPop){
      document.getElementsByTagName('html')[0].style.overflow = "auto";
    }
    toggleShow(false);
  }, []);

  const popupStyles = {
    maxWidth: maxWidth,
    width: measure !== '%' ? width + 'px' : width + '%',
    height: 'auto'
  }
  if (marginLeft !== undefined) popupStyles.marginLeft = marginLeft + 'px';
  if (marginTop !== undefined) popupStyles.marginTop = marginTop + 'px';

  useEffect(() => {
    setPopupTop(document.documentElement.scrollTop);
    setPopupHeight(window.innerHeight);
    setPopupLargeOverflow(window.innerHeight >= popupEl.current.clientHeight ? true : false);
  }, [popupTop, popupHeight])

  let customStyles = {}
  if (mode === 'normal') {
    if (size === 'large') {
      customStyles = { ...popupStyles, width: '1200px' };
    } else if (size === 'medium') {
      customStyles = { ...popupStyles, width: '792px' };
    } else if (size === 'small') {
      customStyles = { ...popupStyles, width: '588px' };
    } else if (size === 'xs') {
      customStyles = { ...popupStyles, width: '500px' };
    } else {
      customStyles = { ...popupStyles }
    }
  } else if (mode === 'fullsize' || mode === 'tabmenu') {
    customStyles = {
      ...popupStyles,
      padding: '44px 0',
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }
  } else if (mode === 'no-padding') {
    customStyles = { ...popupStyles }
  }
  if (hasMobile) {
    customStyles = { ...popupStyles, width: '100%' };
  }
  // customStyles.width = measure !== '%' ? width+'px': width+'%';
  let classPopupWrapper = (size === 'large')
    ? popupLargeOverflow
      ? `popup-wrapper overflow ${size}`
      : `popup-wrapper ${size}`
    : `popup-wrapper`;
  if (className !== undefined) classPopupWrapper += ` ${className}`;

  useEffect(() => {
    const htmlEl = document.getElementsByTagName('html')[0];
    if (show) {
      htmlEl.style.overflow = "hidden";
    } else {
      if (!subPop) {
        htmlEl.style.overflow = "auto";
      }
    }    
  }, [show]);

  return (
    <Rodal className={classPopupWrapper} visible={show} animation={type} width={100} height={100} duration={duration} measure={'%'} onClose={() => toggleShow(false)} showCloseButton={false} showMask={isMask}>
      {isMask === true && <div className="popup-dimm" onClick={closePopup}></div>}
      <div className="popup-wrap" style={customStyles} ref={popupEl}>
        <div className={size !== undefined ? `popup-${mode}-${size}` : `popup-${mode}`}>
          {
            (mode === 'normal' && title !== undefined) && (
              <div className="popup-tit-sec">
                {title !== undefined && <h3 className="popup-title" style={subTitle ? {float: "none"} : null}>{title}</h3>}
                {subTitle !== undefined && <p className="popup-sub-title">{subTitle}</p>}
                {
                  buttons && (
                    <Button size="big" background="blue80" title="인쇄" width={130} />
                  )
                }
              </div>
            )
          }
          {
            mode !== 'tabmenu' && isButton === true
              ? <a href="#" className="popup-close" onClick={closePopup}></a> : null
          }
          {
            mode === 'fullsize' || mode === 'tabmenu'
              ? <>{children}</>
              : <div className="popup-con-sec">{children}</div>
          }
        </div>
      </div>
    </Rodal>
  )
})

RodalPopup.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.string,
  mode: PropTypes.string,
  width: PropTypes.number,
  maxWidth: PropTypes.number,
  duration: PropTypes.number,
  measure: PropTypes.string,
  size: PropTypes.string,
  closedHandler: PropTypes.func,
  isMask: PropTypes.bool,
  className: PropTypes.string,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  buttons: PropTypes.bool,
  subPop: PropTypes.bool,
  subTitle: PropTypes.string,
}

export default RodalPopup