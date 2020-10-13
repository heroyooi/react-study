import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import animateScrollTo from 'animated-scroll-to';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind'; // #a1
import { TabContext } from './TabContext';

/*
html 변경이력
03.10 : classNames 모듈 추가 및 탭클래스명 정의 부분 추가, hiddenTab props 추가, #a1 부분 참고
03.12 : [모바일] 강제로 렌더링을 시키기 위한 forceChange props 추가, #a2 부분 참고
        사용처) mypage/generalBuy01 - 차량비교 탭에서 최근, 관심 버튼 클릭 시 강제이동
03.16 : [모바일] setTimeout 구문 추가, #a3 부분 참고
      : [모바일] calScroll props 추가 및 기능 추가 & 기존 잘못된 로직 수정, #a4 부분 참고
*/
const TabMenu = memo(
  ({
    children,
    type,
    defaultTab = 0,
    action = false,
    mount = true,
    isScroll = false,
    liClicked = false,
    onClick,
    callBack,
    tabLink = [],
    mode = 'horizon',
    responsive = false,
    className,
    isFix = false,
    calH = 58,
    fixTab = false,
    disabled = [],
    hiddenTab = [],
    forceChange,
    calScroll = false
  }) => {
    const hasMobile = useSelector((state) => state.common.hasMobile);
    const [tabValue, setTabValue] = useState(defaultTab);
    const [scrollY, setScrollY] = useState([]);
    const hoverType = action ? true : false;

    let tc = 'tabmenu';
    if (responsive) {
      tc += ' item-num' + children.length;
    }
    if (type === 'type1') {
      tc += ' tp1';
    } else if (type === 'type1 border') {
      tc += ' tp1 border';
    } else if (type === 'type2') {
      tc += ' tp2';
    } else if (type === 'type2 big') {
      tc += ' tp2 big';
    } else if (type === 'type3') {
      tc += ' tp3';
    } else if (type === 'type4') {
      tc += ' tp4';
    } else if (type === 'type5') {
      tc += ' tp5';
    } else if (type === 'type6') {
      tc += ' tp6';
    } else if (type === 'type7') {
      tc += ' tp7';
    } else if (type === 'type8') {
      tc += ' tp8';
    } else if (type === 'type9') {
      tc += ' tp9';
    } else if (type === 'popup') {
      tc += ' popup';
    }
    if (mode === 'vertical') tc += ' vertical';
    if (isFix) tc += ' is-tabmenu-fix';
    if (fixTab) tc += ' tab-fixed';

    useEffect(() => {
      setTabValue(defaultTab);
    }, [defaultTab, forceChange]); // #a2

    const returnScrollY = (idx) =>{
      const scrollY = !hasMobile ? window.scrollY : document.querySelector('#wrap').scrollTop;
      const getScrollY = [];
      if (isScroll || calScroll) {
        (children || []).map((v) => {
          v && v.props && getScrollY.push(document.querySelector(`#${v.props.id}`).getBoundingClientRect().top + scrollY);
          console.log(document.querySelector(`#${v.props.id}`).getBoundingClientRect().top)
        });
      }
      return getScrollY[idx];  
    }
    
    const tabArr = [];
    tabLink.map((v) => tabArr.push(v.index));
    const handleAction = useCallback(
      (e, idx) => {
        e.preventDefault();
        if (disabled.includes(idx)) return;
        if (tabLink.length > 0) {
          if (tabArr.includes(idx)) {
            const goUrl = tabLink.filter((v) => v.index === idx)[0].url;
            Router.push(goUrl);
            return false;
          }
        }
        setTabValue(idx);
        if (isScroll) {
          if (!hasMobile) {
            animateScrollTo(returnScrollY(idx) - calH, {
              speed: 300,
              easing: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1) // easeInOutCubic
            });
          } else {
            document.querySelector('#wrap').scrollTo(0, returnScrollY(idx) - calH)
          }          
        }
        if (callBack) callBack(e, idx);
      },
      [disabled, tabLink, isScroll, callBack, tabArr, scrollY, calH]
    );

    // #a1 start
    const viewTab = (children || []).length - hiddenTab.length;
    const tabDivClass = classNames(tc, className, { 'is-hidden': (children || []).length === hiddenTab.length });

    const condType = type === 'type1' || type === 'type1 border' || type === 'type2';
    const tabUlClass = classNames(
      'ui-tab',
      { 'col-1': condType && children.length === 1 },
      { 'col-2': condType && children.length === 2 },
      { 'col-3': condType && children.length === 3 },
      { 'col-4': condType && children.length === 4 },
      { 'col-5': condType && children.length === 5 },
      'is-view-' + viewTab
    );
    const tabLiClass = (id) =>
      classNames('tabTitle' + (id + 1), { 'is-disabled': disabled.includes(id) }, { 'is-hidden': hiddenTab.includes(id) }, { on: mode !== 'fix' ? id === tabValue : id === defaultTab });
    // #a1 end

    return (
      <>
        <div className={tabDivClass}>
          {' '}
          {/* #a1 */}
          <ul className={tabUlClass}>
            {' '}
            {/* #a1 */}
            {(children || []).map((item, index) => {
              if (item === undefined || item === null) {
                return null;
              }

              const { id, tabTitle } = item.props;
              return (
                <li
                  key={index}
                  className={tabLiClass(index)} // #a1
                  onClick={liClicked ? (e) => handleAction(e, index) : null}
                >
                  {hoverType ? (
                    <a
                      href={id ? '#' + id : '#'}
                      onMouseEnter={(e) => {
                        handleAction(e, index);
                      }}
                    >
                      {tabTitle}
                    </a>
                  ) : (
                    <a
                      href={id ? '#' + id : '#'}
                      onClick={
                        liClicked
                          ? null
                          : (e) => {
                              handleAction(e, index);
                            }
                      }
                    >
                      {tabTitle}
                    </a>
                  ) // #a4
                  }
                </li>
              );
            })}
          </ul>
          <TabContext.Provider value={{ tabValue, isScroll }}>{mount ? children[tabValue] : children}</TabContext.Provider>
          {type === 'popup' && <button className="btn-close" onClick={onClick} />}
        </div>
      </>
    );
  }
);

TabMenu.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  defaultTab: PropTypes.number,
  action: PropTypes.bool,
  mount: PropTypes.bool,
  isScroll: PropTypes.bool,
  liClicked: PropTypes.bool,
  onClick: PropTypes.func,
  callBack: PropTypes.func,
  tabLink: PropTypes.array,
  mode: PropTypes.string,
  className: PropTypes.string,
  isFix: PropTypes.bool,
  calH: PropTypes.number,
  fixTab: PropTypes.bool,
  disabled: PropTypes.array,
  responsive: PropTypes.bool,
  hiddenTab: PropTypes.array,
  forceChange: PropTypes.any,
  calScroll: PropTypes.bool
};

TabMenu.displayName = 'TabMenu';
export default TabMenu;
