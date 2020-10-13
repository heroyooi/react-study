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
import { subStringOfAnchor } from '@src/utils/StringUtil';

const CarOptions = ({
  addOption = false,
  canUseSelectOption = false,
  categoryMemberPath = 'cat1Nm',
  className = '',
  defaultAddOption = false,
  displayMemberPath,
  descriptionMemberPath = 'optCmnt',
  iConMemberPath = 'iconClass',
  imgMemberPath = 'imgUrl',
  isButton = false,
  isSelectButton,
  isMore = true,
  mode = 'view',
  more = true,
  optionList = [],
  popup = false,
  selectedValuePath,
  selectedOptions,
  title,
  type = 1,
  callback
}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const divClass = popup === false ? `option-cate ${className}` : className;
  const addOptionNum = 24;
  const categorys = ['외장', '내장', '안전', '편의'];
  const [isActive, setIsActive] = useState(isMore ? false : true);
  const [carOptionMore, setCarOptionMore] = useState(defaultAddOption);
  const [localSelectedOptions, setLocalSelectedOptions] = useState(selectedOptions);

  const handleMoreToggle = useCallback(
    (e) => {
      e.preventDefault();
      setCarOptionMore(!carOptionMore);
      if (callback) {
        callback();
      }
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

  const handleOptionSelect = useCallback(
    (e, deps) => {
      console.log(selectedValuePath);
       let tmp = [...localSelectedOptions];
       if (mode !== 'check') {
         tmp = [deps[selectedValuePath]];
       } else if (mode === 'check' && tmp.includes(deps[selectedValuePath])) {
         tmp.splice(tmp.indexOf(deps[selectedValuePath]), 1);
       } else {
         tmp.push(deps[selectedValuePath]);
       }
       console.log(tmp);
       setLocalSelectedOptions(tmp);
    },
    [localSelectedOptions, mode, selectedValuePath]
  );

  const handleForceChange = useCallback(() => {
    callback();
  }, [callback]);

  const handleSelect = useCallback(
    (e) => {
      e.preventDefault();
      if (callback) {
        callback(e, localSelectedOptions);
      }
    },
    [callback, localSelectedOptions]
  );

  const createMoreButton = () => {
    return (
      <div className={carOptionMore ? `cate-list-btn${type === 1 ? null : type} active` : `cate-list-btn${type === 1 ? null : type}`}>
        <button onClick={handleMoreToggle}>{carOptionMore ? '추가옵션 닫기' : addOptionNum + '개의 추가옵션 더보기'}</button>
      </div>
    );
  };

  // const useViews = (initValue = false) => {
  //   const [view, setView] = useState(initValue);
  //   const openHandler = useCallback(() => {
  //     setView(true);
  //   }, []);
  //   const closeHandler = useCallback((e) => {
  //     e.stopPropagation();
  //     setView(false);
  //   }, []);
  //   return [view, openHandler, closeHandler];

  const [optDetail1, setOptDetail1] = useState(false);
  const [optDetail2, setOptDetail2] = useState(false);
  const [optDetail3, setOptDetail3] = useState(false);
  const [optDetail4, setOptDetail4] = useState(false);
  const [optDetail5, setOptDetail5] = useState(false);
  const [optDetail6, setOptDetail6] = useState(false);
  const [optDetail7, setOptDetail7] = useState(false);
  const [optDetail8, setOptDetail8] = useState(false);
  const [optDetail9, setOptDetail9] = useState(false);
  const [optDetail10, setOptDetail10] = useState(false);

  const optDetailArr = [optDetail1, optDetail2, optDetail3, optDetail4, optDetail5, optDetail6, optDetail7, optDetail8, optDetail9, optDetail10];
  const openOptDetail1 = useCallback(() => {
    setOptDetail1(true);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail2 = useCallback(() => {
    setOptDetail2(true);
    setOptDetail1(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail3 = useCallback(() => {
    setOptDetail3(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail4 = useCallback(() => {
    setOptDetail4(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail5 = useCallback(() => {
    setOptDetail5(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail6 = useCallback(() => {
    setOptDetail6(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail7 = useCallback(() => {
    setOptDetail7(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail8(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail8 = useCallback(() => {
    setOptDetail8(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail9(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail9 = useCallback(() => {
    setOptDetail9(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail10(false);
  }, []);
  const openOptDetail10 = useCallback(() => {
    setOptDetail10(true);
    setOptDetail1(false);
    setOptDetail2(false);
    setOptDetail3(false);
    setOptDetail4(false);
    setOptDetail5(false);
    setOptDetail6(false);
    setOptDetail7(false);
    setOptDetail8(false);
    setOptDetail9(false);
  }, []);
  const closeOptDetail1 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail1(false);
  }, []);
  const closeOptDetail2 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail2(false);
  }, []);
  const closeOptDetail3 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail3(false);
  }, []);
  const closeOptDetail4 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail4(false);
  }, []);
  const closeOptDetail5 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail5(false);
  }, []);
  const closeOptDetail6 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail6(false);
  }, []);
  const closeOptDetail7 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail7(false);
  }, []);
  const closeOptDetail8 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail8(false);
  }, []);
  const closeOptDetail9 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail9(false);
  }, []);
  const closeOptDetail10 = useCallback((e) => {
    e.stopPropagation();
    setOptDetail10(false);
  }, []);
  const openOptDetailArr = [openOptDetail1, openOptDetail2, openOptDetail3, openOptDetail4, openOptDetail5, openOptDetail6, openOptDetail7, openOptDetail8, openOptDetail9, openOptDetail10];
  const closeOptDetailArr = [closeOptDetail1, closeOptDetail2, closeOptDetail3, closeOptDetail4, closeOptDetail5, closeOptDetail6, closeOptDetail7, closeOptDetail8, closeOptDetail9, closeOptDetail10];

  if (hasMobile) {
    return (
      <>
        <div className={divClass}>
          <h3 className="tit2 mb16">기본옵션</h3>
          {mode === 'view' ? (
            <ul className="cate-ico">
              {optionList
                .filter((x) => x.optDiv === 'D')
                .map((data, idx) => {
                  return (
                    <li className={data.crId ? 'on' : ''} key={idx} onClick={openOptDetailArr[idx]}>
                      <i className={data.iconClass} />
                      <span className="ico-exp">{data.optNm}</span>
                      {optDetailArr[idx] && (
                        <div className={idx === 0 || idx === 1 || idx === 4 || idx === 5 || idx === 8 || idx === 9 ? 'caroption-exp' : 'caroption-exp right'}>
                          <i className="edge" />
                          <span className="close" onClick={closeOptDetailArr[idx]} />
                          <i className={data.iconClass} />
                          <p className="tit">{data.desc}</p>
                          <span className="sub-tit">{data.optCmnt}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          ) : (
            <ul className="cate-ico">
              {optionList
                .filter((x) => x.optDiv === 'D')
                .map((data, idx) => {
                  return (
                    <CheckBoxItem
                      key={idx}
                      id={`chk-${subStringOfAnchor('-', data.iconClass)}`}
                      checked={localSelectedOptions.includes(data?.optCode || data.optCd)}
                      dataContext={data}
                      onSelect={handleOptionSelect}
                      size="small"
                    >
                      <i className={data.iconClass} />
                      <span className="ico-exp">{data[displayMemberPath || 'optNm']}</span>
                    </CheckBoxItem>
                  );
                })}
            </ul>
          )}
          {addOption && (
            <>
              <div className={mode === 'view' ? `cate-list-view` : `cate-list-chk`}>
                {mode === 'view' ? (
                  <>
                    {isActive && (
                      <>
                        <h3 className="tit2 mb16">추가옵션</h3>
                        <TabMenu type="type1" defaultTab={0} mount={false} callBack={handleForceChange} calScroll={true}>
                          {categorys.map((category, categoryIdx) => {
                            return (
                              <TabCont tabTitle={category} id={`tab2-${categoryIdx + 1}`} key={categoryIdx} index={categoryIdx}>
                                <ul className="cate-list-detail">
                                  {(optionList || [])
                                    .filter((x) => {
                                      return x.optDiv === 'A' && (x?.categoryMemberPath || x?.cat1Nm || '').includes(category);
                                    })
                                    .map((data, idx) => {
                                      return (
                                        <li key={idx} className={data.crId ? 'on' : ''}>
                                          <span>{data[displayMemberPath || 'optNm']}</span>
                                        </li>
                                      );
                                    })}
                                </ul>
                              </TabCont>
                            );
                          })}
                        </TabMenu>
                        {canUseSelectOption && (
                          <>
                            <h3 className="tit2 mt32">선택옵션</h3>
                            <ul className="cate-list-detail choice">
                              {(optionList || [])
                                .filter((x) => x.optDiv === 'S')
                                .map((data, idx) => {
                                  return (
                                    <li key={idx} className={data.crId ? 'on' : ''}>
                                      <span dangerouslySetInnerHTML={{ __html: data[descriptionMemberPath] }} />
                                    </li>
                                  );
                                })}
                            </ul>
                          </>
                        )}
                      </>
                    )}
                    {isMore && (
                      <Button
                        className="mt10"
                        size="full"
                        line="gray"
                        radius={true}
                        title={
                          isActive
                            ? `${(optionList || []).filter((x) => x.optDiv === 'A').length}개의 추가옵션 닫기 -`
                            : `${(optionList || []).filter((x) => x.optDiv === 'A').length}개의 추가옵션 더보기 +`
                        }
                        height={38}
                        onClick={handleActive}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <div className={`cate-list-chk`}>
                      <h3 className="tit2 mb16">추가옵션</h3>
                      <TabMenu type="type1" defaultTab={0} mount={false}>
                        {categorys.map((category, categoryIdx) => {
                          return (
                            <TabCont tabTitle={category} id={`tab2-${categoryIdx + 1}`} key={categoryIdx} index={categoryIdx}>
                              <ul className="cate-list-detail">
                                {(optionList || [])
                                  .filter((x) => x[categoryMemberPath] === category)
                                  .map((data, idx) => {
                                    return (
                                      <li key={idx}>
                                        <CheckBox
                                          isSelf={false}
                                          id={`chk-${categoryIdx}-${data[selectedValuePath]}`}
                                          // checked={localSelectedOptions.includes(data[selectedValuePath])}
                                          checked={localSelectedOptions.includes(data?.optCode || data.optCd)}
                                          dataContext={data}
                                          title={data[displayMemberPath]}
                                          onChange={handleOptionSelect}
                                        />
                                      </li>
                                    );
                                  })}
                              </ul>
                            </TabCont>
                          );
                        })}
                      </TabMenu>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        {isSelectButton === true ? <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleSelect} /> : null}
      </>
    );
  }

  return (
    <div className={divClass}>
      {title !== undefined && <h4 className="mb33">{title}</h4>}
      {isButton === true && <Button size="mid" line="gray" radius={true} title="+ 전체 옵션보기" width={139} />}
      <div className={mode === 'view' ? `car-option-tp${type}` : `car-option-tp${type} chk`}>
        {mode === 'view' ? (
          <ul className="cate-ico">
            {optionList
              .filter((x) => x.optDiv === 'D')
              .map((data, idx) => {
                return (
                  <li className="on" key={idx}>
                    <Tooltip placement="bottomLeft" width={400} zid={101}>
                      <TooltipItem>
                        <i className={data[iConMemberPath]} />
                        <span dangerouslySetInnerHTML={{ __html: data[displayMemberPath] }} />
                      </TooltipItem>
                      <TooltipCont>
                        <div className="cate-list-tooltip img-none">
                          <img src={data[imgMemberPath]} alt={data[displayMemberPath]} />
                          <p>
                            {data[displayMemberPath]}
                            <span dangerouslySetInnerHTML={{ __html: data[descriptionMemberPath] }} />
                          </p>
                        </div>
                      </TooltipCont>
                    </Tooltip>
                  </li>
                );
              })}
          </ul>
        ) : (
          <fieldset>
            <legend className="away">차량옵션</legend>
            <ul className="cate-ico">
              {optionList
                .filter((x) => x.optDiv === 'D')
                .map((data, idx) => {
                  return (
                    <CheckBoxItem
                      key={idx}
                      id={`chk-opt-d-${data[selectedValuePath]}`}
                      // checked={localSelectedOptions.includes(data[selectedValuePath])}
                      checked={true}
                      dataContext={data}
                      onSelect={handleOptionSelect}
                      size="small"
                    >
                      <i className={data[iConMemberPath]} />
                      <span className="ico-exp">{data[displayMemberPath]}</span>
                    </CheckBoxItem>
                  );
                })}
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
                    {categorys.map((category, categoryIdx) => {
                      return (
                        <li key={categoryIdx}>
                          <p>{category}</p>
                          <ul className="cate-list-detail">
                            {(optionList || [])
                              .filter((x) => x[categoryMemberPath] === category)
                              .map((data, idx) => {
                                return (
                                  <li key={idx} className="on">
                                    <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                                      <TooltipItem>
                                        <span>{data[displayMemberPath]}</span>
                                      </TooltipItem>
                                      <TooltipCont>
                                        <div className="cate-list-tooltip">
                                          <img src={data[imgMemberPath]} alt={data[displayMemberPath]} />
                                          <p>
                                            {data[displayMemberPath]}
                                            <span dangerouslySetInnerHTML={{ __html: data[descriptionMemberPath] }} />
                                          </p>
                                        </div>
                                      </TooltipCont>
                                    </Tooltip>
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="tit">선택옵션</p>
                  <ul className="cate-list bd0">
                    {(optionList || [])
                      .filter((x) => x.optDiv === 'S')
                      .map((data, idx) => {
                        return (
                          <li key={idx}>
                            <ul className="cate-list-detail">
                              <li className="on">
                                <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                                  <TooltipItem>
                                    <span>{data[displayMemberPath]}</span>
                                  </TooltipItem>
                                  <TooltipCont>
                                    <div className="cate-list-tooltip">
                                      <img src={data[imgMemberPath]} alt={data[displayMemberPath]} />
                                      <p>
                                        {data[displayMemberPath]}
                                        <span dangerouslySetInnerHTML={{ __html: data[descriptionMemberPath] }} />
                                      </p>
                                    </div>
                                  </TooltipCont>
                                </Tooltip>
                              </li>
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ) : (
                <fieldset>
                  <legend className="away">추가옵션</legend>
                  <ul className="cate-list">
                    {categorys.map((category, categoryIdx) => {
                      return (
                        <li key={categoryIdx}>
                          <p>{category}</p>
                          <ul className="cate-list-detail">
                            {(optionList || [])
                              .filter((x) => x[categoryMemberPath] === category)
                              .map((data, idx) => {
                                return (
                                  <li key={idx}>
                                    <CheckBox
                                      isSelf={false}
                                      id={`chk-${categoryIdx}-${data[selectedValuePath]}`}
                                      // checked={localSelectedOptions.includes(data[selectedValuePath])}
                                      checked={true}
                                      dataContext={data}
                                      title={data[displayMemberPath]}
                                      onChange={handleOptionSelect}
                                    />
                                  </li>
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              )}
            </div>
            {popup === false && createMoreButton()}
          </>
        )}
      </div>
    </div>
  );
};

CarOptions.propTypes = {
  addOption: PropTypes.bool,
  canUseSelectOption: PropTypes.bool,
  categoryMemberPath: PropTypes.string,
  className: PropTypes.string,
  defaultAddOption: PropTypes.bool,
  descriptionMemberPath: PropTypes.string,
  displayMemberPath: PropTypes.string,
  iConMemberPath: PropTypes.string,
  imgMemberPath: PropTypes.string,
  isButton: PropTypes.bool,
  isSelectButton: PropTypes.bool,
  isMore: PropTypes.bool,
  mode: PropTypes.string,
  more: PropTypes.bool,
  selectedValuePath: PropTypes.string,
  selectedOptions: PropTypes.array,
  title: PropTypes.string,
  type: PropTypes.number,
  popup: PropTypes.bool,
  optionList: PropTypes.array,
  callback: PropTypes.func
};

CarOptions.displayName = 'CarOptions';
export default CarOptions;
