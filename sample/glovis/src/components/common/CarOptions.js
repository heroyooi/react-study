/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';

/*
  html 변경이력
  03.12 : defaultAddOption props 추가
  03.13 : [모바일] isMore props 추가 및 더보기 기능이 없을 경우
  03.16 : 스크롤 탑 계산이 잘 안되는 문제 때문에 CSSTransition 컴포넌트 제거, #a1 부분 참고
*/

const CarOptions = ({
  title,
  mode = 'view',
  more = true,
  type = 1,
  popup = false,
  isButton = false,
  className = '',
  addOption = false,
  selectOption = false,
  defaultAddOption = false,
  isMore = true,
  pricingDefaultOptions = [],
  onChange = null,
  callback
}) => {
  const divClass = popup === false ? `option-cate ${className}` : className;
  const addOptionNum = 24;

  const [carOptionMore, setCarOptionMore] = useState(defaultAddOption);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isActive, setIsActive] = useState(isMore ? false : true);
  const [forceChange, setForceChange] = useState(false);
  const [pricingOptions, setPricingOptions] = useState([]);

  React.useEffect(() => {
    // setPricingOptions([...pricingDefaultOptions]);
    // console.log('pricingDefaultOptions', Date.now(), pricingDefaultOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingDefaultOptions]);

  const handleCarOption = useCallback(
    (e) => {
      e.preventDefault();
      setCarOptionMore(!carOptionMore);
      if (callback) callback();
    },
    [callback, carOptionMore]
  );

  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
      if (callback) callback();
    },
    [callback]
  );

  const handleChckBoxItemClick = useCallback(
    (e, isChecked) => {
      const newDefaultOptons = [...pricingDefaultOptions].map((item) => {
        const newItem = { ...item };
        if (item.id === e.currentTarget.id) {
          newItem.yn = isChecked ? 'Y' : 'N';
        }
        return newItem;
      });

      if (onChange) {
        onChange(e, {
          selectedOption: newDefaultOptons
        });
      }
    },
    [onChange, pricingDefaultOptions]
  );

  const createMoreButton = () => {
    return (
      <div className={carOptionMore ? `cate-list-btn${type === 1 ? null : type} active` : `cate-list-btn${type === 1 ? null : type}`}>
        <button onClick={handleCarOption}>{carOptionMore ? '추가옵션 닫기' : addOptionNum + '개의 추가옵션 더보기'}</button>
      </div>
    );
  };

  const handleForceChange = useCallback(() => {
    callback();
  }, [callback]);

  //console.log(pricingDefaultOptions); 
  const useViews = (initValue = false) => {
    const [view, setView] = useState(initValue);
    const openHandler = useCallback(() => {
      setView(true);
    }, []);
    const closeHandler = useCallback((e) => {
      e.stopPropagation();
      setView(false);
    }, []); 
    return [view, openHandler, closeHandler];
  }
  const [optDetail1, openOptDetail1, closeOptDetail1] = useViews(false);
  const [optDetail2, openOptDetail2, closeOptDetail2] = useViews(false);
  const [optDetail3, openOptDetail3, closeOptDetail3] = useViews(false);
  const [optDetail4, openOptDetail4, closeOptDetail4] = useViews(false);
  const [optDetail5, openOptDetail5, closeOptDetail5] = useViews(false);
  const [optDetail6, openOptDetail6, closeOptDetail6] = useViews(false);
  const [optDetail7, openOptDetail7, closeOptDetail7] = useViews(false);
  const [optDetail8, openOptDetail8, closeOptDetail8] = useViews(false);
  const [optDetail9, openOptDetail9, closeOptDetail9] = useViews(false);
  const [optDetail10, openOptDetail10, closeOptDetail10] = useViews(false);

  if (hasMobile) {
    return (
      <div className={divClass}>
        <h3 className="tit2 mb16">기본옵션</h3>
        {
          mode === "view"
            ?
            <ul className="cate-ico">
              <li className="on" onClick={openOptDetail1}>
                <i className="ico-sunroof"></i>
                <span className="ico-exp">썬루프</span>
                {optDetail1 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail1}></span>
                    
                    <i className="ico-sunroof"></i>
                    <p className="tit">선루프</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail2}>
                <i className="ico-led"></i>
                <span className="ico-exp">LED</span>
                {optDetail2 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail2}></span>
                    
                    <i className="ico-led"></i>
                    <p className="tit">LED</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail3}>
                <i className="ico-hipass"></i>
                <span className="ico-exp">하이패스</span>
                {optDetail3 && (
                  <div className="caroption-exp right">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail3}></span>
                    
                    <i className="ico-hipass"></i>
                    <p className="tit">하이패스</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail4}>
                <i className="ico-ventilation-seat"></i>
                <span className="ico-exp">통풍시트</span>
                {optDetail4 && (
                  <div className="caroption-exp right">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail4}></span>
                    
                    <i className="ico-ventilation-seat"></i>
                    <p className="tit">통풍시트</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail5}>
                <i className="ico-back-camera"></i>
                <span className="ico-exp">후측방경보</span>
                {optDetail5 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail5}></span>
                    
                    <i className="ico-back-camera"></i>
                    <p className="tit">후측방경보</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail6}>
                <i className="ico-around-view"></i>
                <span className="ico-exp">어라운드뷰</span>
                {optDetail6 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail6}></span>
                    
                    <i className="ico-around-view"></i>
                    <p className="tit">어라운드뷰</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail7}>
                <i className="ico-hud"></i>
                <span className="ico-exp">HUD</span>
                {optDetail7 && (
                  <div className="caroption-exp right">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail7}></span>
                    
                    <i className="ico-hud"></i>
                    <p className="tit">HUD</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail8}>
                <i className="ico-smart-key"></i>
                <span className="ico-exp">스마트키</span>
                {optDetail8 && (
                  <div className="caroption-exp right">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail8}></span>
                    
                    <i className="ico-smart-key"></i>
                    <p className="tit">스마트키</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail9}>
                <i className="ico-smartcruze"></i>
                <span className="ico-exp">크루즈컨트롤</span>
                {optDetail9 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail9}></span>
                    
                    <i className="ico-smartcruze"></i>
                    <p className="tit">크루즈컨트롤</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
              <li className="on" onClick={openOptDetail10}>
                <i className="ico-navigation"></i>
                <span className="ico-exp">네비게이션</span>
                {optDetail10 && (
                  <div className="caroption-exp">
                    <i className="edge"></i>
                    <span className="close" onClick={closeOptDetail10}></span>
                    
                    <i className="ico-navigation"></i>
                    <p className="tit">네비게이션</p>
                    <span className="sub-tit">스마트키를 몸에 지니는 것만으로도 도어잠금장치를 해제할 수 있거나 버튼을 눌러 시동을 걸 수 있는 편의 장치 입니다.</span>
                  </div>
                )}
              </li>
            </ul>
            :
            <ul className="cate-ico">
              <CheckBoxItem id="chk-sunroof" checked={true} size="small">
                <i className="ico-sunroof"></i>
                <span className="ico-exp">썬루프</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-led" checked={false} size="small">
                <i className="ico-led"></i>
                <span className="ico-exp">LED</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-hipass" checked={false} size="small">
                <i className="ico-hipass"></i>
                <span className="ico-exp">하이패스</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-ventilation-seat" checked={false} size="small">
                <i className="ico-ventilation-seat"></i>
                <span className="ico-exp">통풍시트</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-back-camera" checked={false} size="small">
                <i className="ico-back-camera"></i>
                <span className="ico-exp">후측방경보</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-around-view" checked={false} size="small">
                <i className="ico-around-view"></i>
                <span className="ico-exp">어라운드뷰</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-hud" checked={false} size="small">
                <i className="ico-hud"></i>
                <span className="ico-exp">HUD</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-smart-key" checked={false} size="small">
                <i className="ico-smart-key"></i>
                <span className="ico-exp">스마트키</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-smartcruze" checked={false} size="small">
                <i className="ico-smartcruze"></i>
                <span className="ico-exp">크루즈컨트롤</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-navigation" checked={false} size="small">
                <i className="ico-navigation"></i>
                <span className="ico-exp">네비게이션</span>
              </CheckBoxItem>
            </ul>
        }
        {/* {mode === 'view' ? (
          <ul className="cate-ico">
            {pricingOptions.map((option, idx) => {
              return (
                <li className="on" key={idx}>
                  <span className="ico-exp" dangerouslySetInnerHTML={{ __html: option.displayName || option.name }} />
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="cate-ico">
            {pricingOptions.map((option, idx) => {
              return (
                <CheckBoxItem key={idx} id={`chk-${option.id}`} targetId={option.id} checked={option.yn === 'Y'} isSelf={false} onChange={handleChckBoxItemClick} size="small">
                  <i className={option.icon} />
                  <span className="ico-exp" dangerouslySetInnerHTML={{ __html: option.displayName || option.name }} />
                </CheckBoxItem>
              );
            })}
          </ul>
        )} */}
        {addOption && (
          <>
            <div className={mode === 'view' ? `cate-list-view` : `cate-list-chk`}>
              {mode === 'view' ? (
                <>
                  {isActive && (
                    <>
                      <h3 className="tit2 mb16">추가옵션</h3>
                      <TabMenu type="type1" defaultTab={0} mount={false} callBack={handleForceChange} calScroll={true}>
                        <TabCont tabTitle="외장" id="tab2-1" index={0}>
                          <ul className="cate-list-detail">
                            <li className="on">
                              <span>루프백</span>
                            </li>
                            <li className="on">
                              <span>사이드미러:전동접이</span>
                            </li>
                            <li className="on">
                              <span>썬루프</span>
                            </li>
                            <li>
                              <span>파노라마썬루프</span>
                            </li>
                            <li>
                              <span>알루미늄휠</span>
                            </li>
                            <li className="on">
                              <span>HD</span>
                            </li>
                          </ul>
                        </TabCont>
                        <TabCont tabTitle="내장" id="tab2-2" index={1}>
                          <ul className="cate-list-detail">
                            <li className="on">
                              <span>전자식룸미러(ECM)</span>
                            </li>
                            <li>
                              <span>가죽시트</span>
                            </li>
                            <li className="on">
                              <span>전동시트(운전석)</span>
                            </li>
                            <li className="on">
                              <span>전동시트(뒷자석)</span>
                            </li>
                            <li className="on">
                              <span>열선시트(앞)</span>
                            </li>
                            <li className="on">
                              <span>열선시트(뒤)</span>
                            </li>
                            <li>
                              <span>메모리시트(운전석)</span>
                            </li>
                            <li>
                              <span>메모리시트(동승석)</span>
                            </li>
                            <li>
                              <span>통풍시트(동승석)</span>
                            </li>
                            <li className="on">
                              <span>스티어링:열선내장</span>
                            </li>
                          </ul>
                        </TabCont>
                        <TabCont tabTitle="안전" id="tab2-3" index={2}>
                          <ul className="cate-list-detail">
                            <li className="on">
                              <span>에어백:동승석</span>
                            </li>
                            <li>
                              <span>에어백:운전석</span>
                            </li>
                            <li className="on">
                              <span>에어백:사이드</span>
                            </li>
                            <li className="on">
                              <span>에어백:커튼</span>
                            </li>
                            <li className="on">
                              <span>구동력제어장치(TCS)</span>
                            </li>
                            <li>
                              <span>미끄럼방지장치(ABS)</span>
                            </li>
                            <li className="on">
                              <span>후방감지센서</span>
                            </li>
                            <li className="on">
                              <span>후방카메라</span>
                            </li>
                            <li>
                              <span>차선이탈경보(LDWS)</span>
                            </li>
                            <li>
                              <span>타이어공기압경고(TPMS)</span>
                            </li>
                          </ul>
                        </TabCont>
                        <TabCont tabTitle="편의" id="tab2-4" index={3}>
                          <ul className="cate-list-detail">
                            <li className="on">
                              <span>오토에어컨</span>
                            </li>
                            <li>
                              <span>공기청정기</span>
                            </li>
                            <li>
                              <span>버튼시동</span>
                            </li>
                            <li>
                              <span>스티어링휠리모컨</span>
                            </li>
                            <li>
                              <span>블루투스</span>
                            </li>
                            <li>
                              <span>AUX</span>
                            </li>
                            <li>
                              <span>USB</span>
                            </li>
                            <li>
                              <span>자동주차보조시스템(ASPAS)</span>
                            </li>
                          </ul>
                        </TabCont>
                      </TabMenu>
                      {selectOption && (
                        <>
                          <h3 className="tit2 mt32">선택옵션</h3>
                          <ul className="cate-list-detail choice">
                            <li className="on">
                              <span>하이테크</span>
                            </li>
                            <li>
                              <span>하이테크</span>
                            </li>
                            <li>
                              <span>하이테크</span>
                            </li>
                            <li />
                          </ul>
                        </>
                      )}
                    </>
                  )}
                  {isMore && <Button size="full" line="gray" radius={true} title={isActive ? '24개의 추가옵션 닫기 -' : '24개의 추가옵션 더보기 +'} height={38} onClick={handleActive} />}
                </>
              ) : (
                <>
                  <h3 className="tit2 mb16">추가옵션</h3>
                  <TabMenu type="type1" defaultTab={0} mount={false}>
                    <TabCont tabTitle="외장" id="tab2-1" index={0}>
                      <ul className="cate-list-detail">
                        <li>
                          <CheckBox id="chk-loof-pack" title="루프백" />
                        </li>
                        <li>
                          <CheckBox id="chk-auto-mirror" title="사이드미러:전동접이" />
                        </li>
                        <li>
                          <CheckBox id="chk-sunroof-2" title="썬루프" />
                        </li>
                        <li>
                          <CheckBox id="chk-panorama-sunroof" title="파노라마썬루프" />
                        </li>
                        <li>
                          <CheckBox id="chk-al-wheel" title="알루미늄휠" />
                        </li>
                        <li>
                          <CheckBox id="chk-hd" title="HD" />
                        </li>
                      </ul>
                    </TabCont>
                    <TabCont tabTitle="내장" id="tab2-2" index={1}>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-ecm" title="전자식룸미러(ECM)" />
                        </li>
                        <li>
                          <CheckBox id="chk-leathersheet" title="가죽시트" />
                        </li>
                        <li>
                          <CheckBox id="chk-autosheet-p" title="전동시트(운전석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-autosheet-b" title="전동시트(뒷자석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-heatsheet-f" title="열선시트(앞)" />
                        </li>
                        <li>
                          <CheckBox id="chk-heatsheet-b" title="열선시트(뒤)" />
                        </li>
                        <li>
                          <CheckBox id="chk-memorysheet-p" title="메모리시트(운전석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-memorysheet-d" title="메모리시트(동승석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-ventilation-d" title="통풍시트(동승석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-steering-heat" title="스티어링:열선내장" />
                        </li>
                      </ul>
                    </TabCont>
                    <TabCont tabTitle="안전" id="tab2-3" index={2}>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-airback-d" title="에어백:동승석" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-p" title="에어백:운전석" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-s" title="에어백:사이드" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-c" title="에어백:커튼" />
                        </li>
                        <li>
                          <CheckBox id="chk-tcs" title="구동력제어장치(TCS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-abs" title="미끄럼방지장치(ABS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-back-sensor" title="후방감지센서" />
                        </li>
                        <li>
                          <CheckBox id="chk-back-camera" title="후방카메라" />
                        </li>
                        <li>
                          <CheckBox id="chk-ldws" title="차선이탈경보(LDWS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-tpms" title="타이어공기압경고(TPMS)" />
                        </li>
                      </ul>
                    </TabCont>
                    <TabCont tabTitle="편의" id="tab2-4" index={3}>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-auto-conditioner" title="오토에어컨" />
                        </li>
                        <li>
                          <CheckBox id="chk-air-cleaner" title="공기청정기" />
                        </li>
                        <li>
                          <CheckBox id="chk-button" title="버튼시동" />
                        </li>
                        <li>
                          <CheckBox id="chk-wheel-remote" title="스티어링휠리모컨" />
                        </li>
                        <li>
                          <CheckBox id="chk-bluetooth" title="블루투스" />
                        </li>
                        <li>
                          <CheckBox id="chk-aux" title="AUX" />
                        </li>
                        <li>
                          <CheckBox id="chk-usb" title="USB" />
                        </li>
                        <li>
                          <CheckBox id="chk-aspas" title="자동주차보조시스템(ASPAS)" />
                        </li>
                      </ul>
                    </TabCont>
                  </TabMenu>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={divClass}>
      {title !== undefined && <h4 className="mb33">{title}</h4>}
      {isButton === true && <Button size="mid" line="gray" radius={true} title="+ 전체 옵션보기" width={139} />}
      <div className={mode === 'view' ? `car-option-tp${type}` : `car-option-tp${type} chk`}>
        {mode === 'view' ? (
          <ul className="cate-ico">
            <li className="on">
              <Tooltip placement="bottomLeft" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-sunroof" />
                  <span>선루프</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="선루프" />
                    <p>
                      선루프
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomLeft" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-led" />
                  <span>LED</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="LED" />
                    <p>
                      LED
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomLeft" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-hipass" />
                  <span>하이패스</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="하이패스" />
                    <p>
                      하이패스
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomLeft" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-ventilation-seat" />
                  <span>
                    통풍시트<em>(운전석)</em>
                  </span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="통풍시트(운전석)" />
                    <p>
                      통풍시트(운전석)
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomLeft" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-back-camera" />
                  <span>
                    후측방경보<em>(BSD)</em>
                  </span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="후측방경보(BSD)" />
                    <p>
                      후측방경보(BSD)
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomRight" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-around-view" />
                  <span>
                    어라운드뷰<em>(AVIM)</em>
                  </span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="어라운드뷰(AVIM)" />
                    <p>
                      어라운드뷰(AVIM)
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomRight" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-hud" />
                  <span>HUD</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="HUD" />
                    <p>
                      HUD
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomRight" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-smart-key" />
                  <span>스마트키</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="스마트키" />
                    <p>
                      스마트키
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomRight" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-smartcruze" />
                  <span>크루즈컨트롤</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="크루즈컨트롤" />
                    <p>
                      크루즈컨트롤
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
            <li className="on">
              <Tooltip placement="bottomRight" width={560} zid={101}>
                <TooltipItem>
                  <i className="ico-navigation" />
                  <span>네비게이션</span>
                </TooltipItem>
                <TooltipCont>
                  <div className="cate-list-tooltip">
                    <img src="/images/contents/car-option-img-01.png" alt="네비게이션" />
                    <p>
                      네비게이션
                      <span>
                        내비게이션은 GPS(인공위성을 통한 위치확인시스템)를 이용하여 운전자가 낯선 목적지에 실시간 교통상황을 고려 하여 계산된 최적경로를 따라 목적지 까지 길을 안내하는 기능을 가진 장치
                        입니다.
                      </span>
                    </p>
                  </div>
                </TooltipCont>
              </Tooltip>
            </li>
          </ul>
        ) : (
          <fieldset>
            <legend className="away">차량옵션</legend>
            <ul className="cate-ico">
              <CheckBoxItem id="chk-sunroof" checked={true} size="small">
                <i className="ico-sunroof" />
                <span className="ico-exp">썬루프</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-led" checked={false} size="small">
                <i className="ico-led" />
                <span className="ico-exp">LED</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-hipass" checked={false} size="small">
                <i className="ico-hipass" />
                <span className="ico-exp">하이패스</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-ventilation-seat" checked={false} size="small">
                <i className="ico-ventilation-seat" />
                <span className="ico-exp">
                  통풍시트<em>(운전석)</em>
                </span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-back-camera" checked={false} size="small">
                <i className="ico-back-camera" />
                <span className="ico-exp">
                  후측방경보<em>(BSD)</em>
                </span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-around-view" checked={false} size="small">
                <i className="ico-around-view" />
                <span className="ico-exp">
                  어라운드뷰<em>(AVIM)</em>
                </span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-hud" checked={false} size="small">
                <i className="ico-hud" />
                <span className="ico-exp">HUD</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-smart-key" checked={false} size="small">
                <i className="ico-smart-key" />
                <span className="ico-exp">스마트키</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-smartcruze" checked={false} size="small">
                <i className="ico-smartcruze" />
                <span className="ico-exp">크루즈컨트롤</span>
              </CheckBoxItem>
              <CheckBoxItem id="chk-navigation" checked={false} size="small">
                <i className="ico-navigation" />
                <span className="ico-exp">네비게이션</span>
              </CheckBoxItem>
            </ul>
          </fieldset>
        )}
        {popup !== false && createMoreButton()}
        {more === true && (
          <>
            <div style={carOptionMore ? { display: 'block' } : { display: 'none' }}>
              {/* #a1 Start */}
              {mode === 'view' && popup === false ? (
                <div className="cate-list-wrap">
                  <p className="tit">추가옵션</p>
                  <ul className="cate-list">
                    <li>
                      <p>외장</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>루프팩</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="루프팩" />
                                <p>
                                  루프팩
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>사이드미러:전동접이</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="사이드미러:전동접이" />
                                <p>
                                  사이드미러:전동접이
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560}>
                            <TooltipItem>
                              <span>썬루프</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="썬루프" />
                                <p>
                                  썬루프
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>파노라마썬루프</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="파노라마썬루프" />
                                <p>
                                  파노라마썬루프
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>알루미늄휠</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="알루미늄휠" />
                                <p>
                                  알루미늄휠
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>HD</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="HD" />
                                <p>
                                  HD
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>내장</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>전자식룸미러(ECM)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="전자식룸미러(ECM)" />
                                <p>
                                  전자식룸미러(ECM)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>가죽시트</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="가죽시트" />
                                <p>
                                  가죽시트
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>전동시트(운전석)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="전동시트(운전석)" />
                                <p>
                                  전동시트(운전석)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>전동시트(뒷잣석)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="전동시트(뒷잣석)" />
                                <p>
                                  전동시트(뒷잣석)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>열선시트(앞)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="열선시트(앞)" />
                                <p>
                                  열선시트(앞)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>열선시트(뒤)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="열선시트(뒤)" />
                                <p>
                                  열선시트(뒤)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>메모리시트(운전석)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="메모리시트(운전석)" />
                                <p>
                                  메모리시트(운전석)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>메모리시트(동승석)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="메모리시트(동승석)" />
                                <p>
                                  메모리시트(동승석)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>통풍시트(동승석)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="통풍시트(동승석)" />
                                <p>
                                  통풍시트(동승석)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>스티어링:열선내장</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="스티어링:열선내장" />
                                <p>
                                  스티어링:열선내장
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>안전</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>에어백:동승석</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="에어백:동승석" />
                                <p>
                                  에어백:동승석
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>에어백:운전석</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="에어백:운전석" />
                                <p>
                                  에어백:운전석
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>에어백:사이드</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="에어백:사이드" />
                                <p>
                                  에어백:사이드
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>에어백:커튼</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="에어백:커튼" />
                                <p>
                                  에어백:커튼
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>구동력제어장치(TCS)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="구동력제어장치(TCS)" />
                                <p>
                                  구동력제어장치(TCS)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>미끄럼방지장치(ABS)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="미끄럼방지장치(ABS)" />
                                <p>
                                  미끄럼방지장치(ABS)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>차선이탈경보(LDWS)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="차선이탈경보(LDWS)" />
                                <p>
                                  차선이탈경보(LDWS)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>후방감지센서</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="후방감지센서" />
                                <p>
                                  후방감지센서
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>후방카메라</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="후방카메라" />
                                <p>
                                  후방카메라
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>타이어공기압경고(TPMS)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="타이어공기압경고(TPMS)" />
                                <p>
                                  타이어공기압경고(TPMS)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>편의</p>
                      <ul className="cate-list-detail">
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>오토에어컨</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="오토에어컨" />
                                <p>
                                  오토에어컨
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>공기청정기</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="공기청정기" />
                                <p>
                                  공기청정기
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>버튼시동</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="버튼시동" />
                                <p>
                                  버튼시동
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>스티어링휠리모컨</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="스티어링휠리모컨" />
                                <p>
                                  스티어링휠리모컨
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>자동주차보조시스템(ASPAS)</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="자동주차보조시스템(ASPAS)" />
                                <p>
                                  자동주차보조시스템(ASPAS)
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>블루투스</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="블루투스" />
                                <p>
                                  블루투스
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>AUX</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="AUX" />
                                <p>
                                  AUX
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                        <li>
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>USB</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="USB" />
                                <p>
                                  USB
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p className="tit">선택옵션</p>
                  <ul className="cate-list bd0">
                    <li>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>하이테크</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="하이테크" />
                                <p>
                                  하이테크
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>컴포트</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="컴포트" />
                                <p>
                                  컴포트
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                            <TooltipItem>
                              <span>실내 LED등 장착</span>
                            </TooltipItem>
                            <TooltipCont>
                              <div className="cate-list-tooltip">
                                <img src="/images/contents/car-option-img-01.png" alt="실내 LED등 장착" />
                                <p>
                                  실내 LED등 장착
                                  <span>
                                    스마트키를 몸에 지니는 것만으로도
                                    <br />
                                    도어 잠금장치를 해제할 수 있거나 버튼을 눌러
                                    <br />
                                    시동을 껄 수 있는 편의 장치입니다.
                                  </span>
                                </p>
                              </div>
                            </TooltipCont>
                          </Tooltip>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ) : (
                <fieldset>
                  <legend className="away">추가옵션</legend>
                  <ul className="cate-list">
                    <li>
                      <p>외장</p>
                      <ul className="cate-list-detail">
                        <li>
                          <CheckBox id="chk-loof-pack" title="루프백" />
                        </li>
                        <li>
                          <CheckBox id="chk-auto-mirror" title="사이드미러:전동접이" />
                        </li>
                        <li>
                          <CheckBox id="chk-sunroof-2" title="썬루프" />
                        </li>
                        <li>
                          <CheckBox id="chk-panorama-sunroof" title="파노라마썬루프" />
                        </li>
                        <li>
                          <CheckBox id="chk-al-wheel" title="알루미늄휠" />
                        </li>
                        <li>
                          <CheckBox id="chk-hd" title="HD" />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>내장</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-ecm" title="전자식룸미러(ECM)" />
                        </li>
                        <li>
                          <CheckBox id="chk-leathersheet" title="가죽시트" />
                        </li>
                        <li>
                          <CheckBox id="chk-autosheet-p" title="전동시트(운전석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-autosheet-b" title="전동시트(뒷자석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-heatsheet-f" title="열선시트(앞)" />
                        </li>
                        <li>
                          <CheckBox id="chk-heatsheet-b" title="열선시트(뒤)" />
                        </li>
                        <li>
                          <CheckBox id="chk-memorysheet-p" title="메모리시트(운전석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-memorysheet-d" title="메모리시트(동승석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-ventilation-d" title="통풍시트(동승석)" />
                        </li>
                        <li>
                          <CheckBox id="chk-steering-heat" title="스티어링:열선내장" />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>안전</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-airback-d" title="에어백:동승석" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-p" title="에어백:운전석" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-s" title="에어백:사이드" />
                        </li>
                        <li>
                          <CheckBox id="chk-airback-c" title="에어백:커튼" />
                        </li>
                        <li>
                          <CheckBox id="chk-tcs" title="구동력제어장치(TCS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-abs" title="미끄럼방지장치(ABS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-ldws" title="차선이탈경보(LDWS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-back-sensor" title="후방감지센서" />
                        </li>
                        <li>
                          <CheckBox id="chk-back-camera" title="후방카메라" />
                        </li>
                        <li>
                          <CheckBox id="chk-tpms" title="타이어공기압경고(TPMS)" />
                        </li>
                      </ul>
                    </li>
                    <li>
                      <p>편의</p>
                      <ul className="cate-list-detail">
                        <li className="on">
                          <CheckBox id="chk-auto-conditioner" title="오토에어컨" />
                        </li>
                        <li>
                          <CheckBox id="chk-air-cleaner" title="공기청정기" />
                        </li>
                        <li>
                          <CheckBox id="chk-button" title="버튼시동" />
                        </li>
                        <li>
                          <CheckBox id="chk-wheel-remote" title="스티어링휠리모컨" />
                        </li>
                        <li>
                          <CheckBox id="chk-aspas" title="자동주차보조시스템(ASPAS)" />
                        </li>
                        <li>
                          <CheckBox id="chk-bluetooth" title="블루투스" />
                        </li>
                        <li>
                          <CheckBox id="chk-aux" title="AUX" />
                        </li>
                        <li>
                          <CheckBox id="chk-usb" title="USB" />
                        </li>
                      </ul>
                    </li>
                  </ul>
                </fieldset>
              )}
            </div>{/* #a1 End */}
            {popup === false && createMoreButton()}
          </>
        )}
      </div>
    </div>
  );
};

CarOptions.propTypes = {
  addOption: PropTypes.bool,
  className: PropTypes.string,
  defaultAddOption: PropTypes.bool,
  isButton: PropTypes.bool,
  isMore: PropTypes.bool,
  mode: PropTypes.string,
  more: PropTypes.bool,
  selectOption: PropTypes.bool,
  title: PropTypes.string,
  type: PropTypes.number,
  popup: PropTypes.bool,
  pricingDefaultOptions: PropTypes.array,
  onChange: PropTypes.func,
  callback: PropTypes.func
};

CarOptions.displayName = 'CarOptions';
export default CarOptions;
