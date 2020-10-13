import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import classNames from "classnames/bind"
import PropTypes from 'prop-types'

const GnbItem = ({title, sub, link, isSection, id}) => {
  let gnbHoverTimes;
  const [isActive, setIsActive] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [upMotion, setupMotion] = useState(false);
  
  const handleMenuMouseEnter = () => {
    if(sub.length === 0) return;
    setIsActive(true);
    setIsHover(true);
    setupMotion(false);
  }  

  const handleMenuMouseLeave = useCallback(() => {
    setupMotion(true)
    setIsHover(false);
  },[upMotion])

  useEffect(()=>{
    if(upMotion){
      gnbHoverTimes = setTimeout(() =>{
        setIsActive(false)
      }, 300)
    }
    return () => {
      clearTimeout(gnbHoverTimes)
    }
  },[upMotion])

  const li_style = classNames({"active": isHover || isSection === id})

  const subul_style = classNames(
    "submenu",
    {"slide-down": !upMotion},
    {"slide-up" : upMotion}
  );

  return (
    <li className={li_style}>
      <Link href={link}><a onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>{title}</a></Link>
      {
        isActive
        ? <ul className={subul_style} onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
            {sub.map((item, index) => {
              return (<li key={index}><Link href={item}><a>- {item}</a></Link></li>)
            })}
          </ul>
        : ''
      }
    </li>
  )
}

GnbItem.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.array,
  link: PropTypes.string,
}

export default GnbItem