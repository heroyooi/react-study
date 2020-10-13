import { useState, useEffect, useContext, useRef, memo } from 'react'
import { useSelector } from 'react-redux';
import { MenuContext } from './MenuItem'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const MenuCont = memo(({children, className=''}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const menuContHeight = useRef(null)
  const {menuValue} = useContext(MenuContext)
  const [menuH, setMenuH] = useState(0)
  const [display, setDisplay] = useState(false)
  
  useEffect(()=>{
    let shortTimer, longTimer = null;
    if(menuValue){
      setDisplay(true)
      shortTimer = setTimeout(() =>{
        setMenuH(menuContHeight.current.scrollHeight)
        longTimer = setTimeout(() =>{
          setMenuH()
        },300)
      }, 10)
    }
    else{
      if(menuContHeight.current){
        setMenuH(menuContHeight.current.scrollHeight)
      }
      shortTimer = setTimeout(() =>{
        setMenuH(0)
        longTimer = setTimeout(() => {
          setDisplay(false)
        }, 300)
      },20)
    }
    return () => {
      clearTimeout(shortTimer)
      clearTimeout(longTimer)
    }
  }, [menuValue])
  
  const menuClass = classNames(
    {"active": display}
  )

  if (hasMobile) {
    return (
      <dd ref={menuContHeight} className={menuClass} style={{height:menuH}}><div className={`inner ${className}`}>{children}</div></dd>
    )
  }
    
  return (
    <dd ref={menuContHeight} className={menuClass} style={{height:menuH}}>{children}</dd>
  )
});

MenuCont.propTypes = {
  children: PropTypes.node
}

export default MenuCont;
