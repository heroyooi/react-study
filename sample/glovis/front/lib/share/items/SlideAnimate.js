import { useState, useEffect, useRef, memo } from 'react';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';

const SlideAnimate = memo(({children, toggle, mount=true}) =>{
  const targetRef = useRef(null);
  const [contHeight, setContHeight] = useState(0);
  const [display, setDisplay] = useState(false);
    
  useEffect(()=>{
    let shortTimer, longTimer = null;
    if (toggle) {
      setDisplay(true)
      shortTimer = setTimeout(() =>{
        setContHeight(targetRef.current.scrollHeight)
        longTimer = setTimeout(() =>{
          setContHeight()
        },300)
      }, 10)
    } else {
      if (targetRef.current) setContHeight(targetRef.current.scrollHeight);
      shortTimer = setTimeout(() =>{
        setContHeight(0);
        longTimer = setTimeout(() => {
          setDisplay(false)
        }, 300)
      }, 35);
    }
    return () => {
      clearTimeout(shortTimer)
      clearTimeout(longTimer)
    }
  }, [toggle])
  
  const menuClass = classNames(
    "slide-animate",
    {"active": display}
  )  

  return (
    <>
      {mount?
      (display && <div ref={targetRef} className={menuClass} style={{height:contHeight}}>{children}</div>)
      :<div ref={targetRef} className={menuClass} style={{height:contHeight}}>{children}</div>
      }
    </>
  )
});

SlideAnimate.propTypes = {
  children: PropTypes.node,
  toggle : PropTypes.bool,
  mount : PropTypes.bool
}

export default SlideAnimate