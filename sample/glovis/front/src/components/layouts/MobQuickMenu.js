import React, { memo, useState, useCallback, useEffect } from 'react';
import Router from 'next/router';
import Draggable from 'react-draggable';
import DynamicTag from '@lib/share/items/DynamicTag';
import { getQuickMenus } from '@src/utils/SitemapUtil';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import classNames from 'classnames/bind';

const MobQuickMenu = memo(() => {
  const [active, setActive] = useState(false);
  const [quickMenus] = useState(getQuickMenus());
  const [cookies, setCookie, removeCookie] = useCookies(['recentCar']);

  const { isLogin } = useSelector((state) => ({
    isLogin: state.login.isLogin // state.login.isLogin
  }));
  const [isLoginScreen, setIsLoginScreen] = useState(false); //isEmpty(cookies.accessToken) ? isLogin : true); // 화면단 사용


  useEffect(() => {
    setIsLoginScreen(isEmpty(Cookies.get('accessToken')) ? isLogin : true);
  });


  const handleToggle = useCallback(
    (e) => {
      e.preventDefault();
      setActive(!active);
    },
    [active]
  );

  const handleClick = useCallback((e, deps) => {
    e.preventDefault();
    // if ( isLoginScreen) {
    //   Router.push(deps.url);
    // } else if(!isLoginScreen &&  deps.idx !== 3) {
    //   Router.push(deps.url);
    // }
    Router.push(deps.url);
  }, []);

  const [activeDrags, setActiveDrags] = useState(0);

  const onStart = useCallback(() => {
    setActiveDrags((prevDrags) => ++prevDrags);
  }, []);

  const onStop = useCallback(() => {
    setActiveDrags((prevDrags) => --prevDrags);
  }, []);

  const dragHandlers = { onStart, onStop };
  const activeIdx = isLoginScreen ? 2 : 0;

  return (
    <Draggable {...dragHandlers}>
      <div className="quick-wrap">
        <ul className={classNames('quick-list', { 'active': active }, `item-${activeIdx+1}`)}>
          {quickMenus.map((item, idx) => {
            if (idx <= activeIdx) {
              return (
                <li key={idx}>
                  <DynamicTag className={item.className} dataContext={item} tagName={'button'} onClick={handleClick}>
                    <span>{item.title}</span>
                    <i />
                  </DynamicTag>
                </li>
              );  
            }
          })}
        </ul>
        <button className={!active ? 'btn-quick' : 'btn-quick active'} onTouchEnd={handleToggle}>
          <span>퀵메뉴</span>
          <i />
        </button>
      </div>
    </Draggable>
  );
});

MobQuickMenu.propTypes = {};

MobQuickMenu.displayName = 'MobQuickMenu';

export default MobQuickMenu;
