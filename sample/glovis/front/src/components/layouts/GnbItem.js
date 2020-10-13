import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const GnbItem = ({ title, sub, link, isSection, id, handleHover}) => {
  //console.log('useEffect>GnbItem title=%o, sub=%o, link=%o, id=%o', title, sub, link, id);

  let gnbHoverTimes;
  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [upMotion, setupMotion] = useState(false);

  const handleMenuMouseEnter = useCallback((e) => {
    if (sub?.length === 0) return;
    setIsActive(true);
    setIsHover(true);
    setupMotion(false);
    handleHover(e, true);
  },[]);

  const handleMenuMouseLeave = useCallback((e) => {
    setupMotion(true);
    setIsHover(false);
    //handleHover(e, false);
  }, [upMotion]);

  useEffect(() => {
    if (upMotion) {
      gnbHoverTimes = setTimeout(() => {
        setIsActive(false);
      }, 300);
    }
    return () => {
      clearTimeout(gnbHoverTimes);
    };
  }, [upMotion]);
  //, { marginLeft: '25px' }
  const li_style = classNames({ active: isHover || isSection === id });

  const subul_style = classNames('submenu', { 'slide-down': !upMotion }, { 'slide-up': upMotion });

  return (
    <li className={li_style}>
      <Link href={link}>
        <a onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
          {title}
        </a>
      </Link>
      {isActive && !isEmpty(sub) ? (
        <ul className={subul_style} onMouseEnter={handleMenuMouseEnter} onMouseLeave={handleMenuMouseLeave}>
          {sub.map((item, index) => {
            return item.menuYn === 'Y' ? (
              <li key={index}>
                <Link href={item.tranSrc}>
                  <a>{item.title}</a>
                </Link>
              </li>
            ) : (
              ''
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </li>
  );
};

GnbItem.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.array,
  link: PropTypes.string,
  isSection : PropTypes.any,
  id : PropTypes.any,
  handleHover : PropTypes.func
};

export default GnbItem;
