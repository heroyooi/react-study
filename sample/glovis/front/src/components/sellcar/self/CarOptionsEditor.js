import React, { useState, memo, useMemo, useEffect, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';

import CheckBox from '@lib/share/items/CheckBox';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import DynamicTag from '@lib/share/items/DynamicTag';
// import { iconClass } from '@src/dummy/sellcar/CarOptions';

import { selectAllOptionList } from '@src/api/common/CarInfoApi';

import { SystemContext } from '@src/provider/SystemProvider';
import { getCarMartInfoAction, getReqAction, inputStateAction, inputPropAction, pushObjectAction, removeObjectByKeyAction } from '@src/actions/sellcar/sellCarAction';
import { iconClass } from '@src/constant/sellcar/carOptions';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';

/**
 * @module CarOptionsEditor
 * @desc 차량 옵션 표시/입력
 * @author 최승희
 * @param  {Object} props - props object
 * @param  {Array} props.items - 차량옵션정보를 담은 배열
 * @param  {Boolean} props.isEditing - 차량정보를 수정가능여부
 * @param  {Function} props.onCheck - 수정모드에서 차량옵션을 체크했을때 콜백함수
 * @param  {Boolean} props.addOptions=false - 추가 옵션을 보여줄 것인지 보여주지 않을 것인지 옵션
 */

const findLi = (target) => {
  const { tagName } = target;
  return tagName == 'LI' ? target : findLi(target.parentNode);
};

const CarOptionsEditor = ({ items, isEditing, onCheck, addOptions, className = '', popup = false, isMore = true, selectOption = '', callback, resetFn = false, onSelectCheck, selectOptFlag }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const divClass = popup === false ? `option-cate ${className}` : className;
  const { showLoader, hideLoader } = useContext(SystemContext);
  const [carOptionMore, setCarOptionMore] = useState(false);
  const [carOptions, setCarOptions] = useState([]);
  const [carAddCategoryOptions, setCarAddCategoryOptions] = useState([]);
  const categorys = ['외장', '내장', '안전', '편의'];
  const [selectOptionList, setSelectOptionList] = useState([]);

  useEffect(() => {
    if (selectOption) {
      const temp = selectOption.split(',');
      setSelectOptionList(temp);
    } else {
      setSelectOptionList([]);
    }
  }, [selectOption]);

  const _onCheck = (e, value) => {
    const newValue = {
      optCd: value.optCd
    };

    const isExist = items.find((option) => option.optCd === value.optCd);

    isExist
      ? dispatch(
          removeObjectByKeyAction({
            state: 'car',
            prop: 'optionList',
            key: 'optCd',
            value: value.optCd
          })
        )
      : dispatch(
          pushObjectAction({
            state: 'car',
            prop: 'optionList',
            key: 'optCd',
            value: newValue
          })
        );
  };

  const toggleDisplayCarOption = (e) => {
    e.preventDefault();
    setCarOptionMore(!carOptionMore);
  };

  const isExist = (optCd) => (items?.find((option) => option.optCd === optCd) ? true : false);

  const check = (e, option) => {
    console.log('check clicked', e, option);
    const { optCd } = option;

    if (onCheck) {
      onCheck(e, { optCd });
    } else {
      _onCheck(e, { optCd });
    }
  };

  const clickLi = (e, option) => {
    const { tagName } = e.target;

    if (tagName == 'I' || tagName == 'SPAN') {
      const li = findLi(e.target);
      check(
        {
          target: li.querySelector('input[type=checkbox]')
        },
        option
      );
    }
  };

  const addCategoriesLength = useMemo(
    () =>
      carAddCategoryOptions.reduce((cnt, item) => {
        const { optionList } = item;
        cnt += optionList?.length ?? 0;
        return cnt;
      }, 0),
    [carAddCategoryOptions]
  );

  useEffect(() => {
    showLoader();
    selectAllOptionList()
      .then((res) => res?.data?.data)
      .then((res = {}) => {
        const { optionList = [], addOptionList = [] } = res;
        console.log('CarOptionsEditor -> optionList', optionList);
        console.log('CarOptionsEditor -> addOptionList', addOptionList);
        setCarOptions(optionList);
        setCarAddCategoryOptions(addOptionList);
      })
      .finally(() => {
        hideLoader();
      });
  }, []);

  // 옵션 UI를 위한 추가 함수
  const changeOptNm = useCallback((option) => {
    if (option === '헤드램프(LED)') {
      return '헤드램프<br />(LED)';
    } else if (option === '통풍시트(운전석)') {
      return '통풍시트<br />(운전석)';
    } else if (option === '어라운드뷰(AVM)') {
      return '어라운드뷰<br />(AVM)';
    } else if (option === '후측방경보(BSD)') {
      return '후측방경보<br />(BSD)';
    }
    return option;
  }, []);

  // 모바일 START
  const handleForceChange = useCallback(() => {
    // callback();
  }, [callback]);

  const [isActive, setIsActive] = useState(isMore ? false : true);
  const [selecteOptionId, setSelectedOptionId] = useState(null);
  const handleOptionSelect = useCallback((e, deps) => {
    e.preventDefault();
    setSelectedOptionId(deps.optCd);
  }, []);
  const handleOptionSelectClose = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedOptionId(null);
  }, []);
  const handleActive = useCallback(
    (e) => {
      e.preventDefault();
      setIsActive((prevActive) => !prevActive);
      if (callback) callback();
    },
    [callback]
  );
  const [selectOptCntn, setSelectOptCntn] = useState('');
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSelectCheck(true, e.target.value);
        setSelectOptCntn('');
      }
    },
    [onSelectCheck]
  );

  const onAddSelectOptCntn = useCallback(
    (e) => {
      e.preventDefault();
      if (selectOptCntn) {
        onSelectCheck(true, selectOptCntn);
      }
      setSelectOptCntn('');
    },
    [onSelectCheck, selectOptCntn]
  );

  if (hasMobile) {
    return (
      <div className={divClass}>
        <h3 className="tit2 mb16">기본옵션</h3>
        {resetFn && (
          <button type="button" className="btn-reset">
            초기화
          </button>
        )}

        {!isEditing ? (
          <ul className="cate-ico">
            {carOptions?.map((option, i) => {
              return (
                <DynamicTag key={i} tagName={'li'} id={`opt-id-${i}`} className={classNames({ on: isExist(option.optCd) })} dataContext={option} onClick={handleOptionSelect}>
                  <i key={i} className={classNames({ [`ico-${iconClass[option.optCd]}`]: true })} />
                  <span className="ico-exp">{option.optNm}</span>
                  {option.optCd === selecteOptionId ? (
                    <div className={i == 0 || i == 1 || i == 4 || i == 5 || i == 8 || i == 9 ? 'caroption-exp' : 'caroption-exp right'}>
                      <i key={`${i}-a`} className="edge" />
                      <span className="close" onClick={handleOptionSelectClose} />
                      <i key={`${i}-b`} className={classNames([`ico-${iconClass[option.optCd]}`])} />
                      <span className="sub-tit">{option.desc}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </DynamicTag>
              );
            })}
          </ul>
        ) : (
          <ul className="cate-ico">
            {carOptions?.map((option, i) => {
              return (
                <CheckBoxItem key={i} id={`chk-${option.optCd}`} checked={isExist(option.optCd)} size="small" onChange={(e) => check(e, option)}>
                  <i key={`${i}-a`} className={classNames({ [`ico-${iconClass[option.optCd]}`]: true })} />
                  <span className="ico-exp">{option.optNm}</span>
                </CheckBoxItem>
              );
            })}
          </ul>
        )}
        {addOptions && (
          <>
            <div className={!isEditing ? `cate-list-view` : `cate-list-chk`}>
              {!isEditing ? (
                <>
                  {isActive && (
                    <>
                      <h3 className="tit2 mb16">추가옵션</h3>
                      <TabMenu type="type1" defaultTab={0} mount={false} callBack={handleForceChange} calScroll={true}>
                        {carAddCategoryOptions.map((categorys, categoryIdx) => {
                          return (
                            <TabCont key={categoryIdx} tabTitle={categorys.category === '편의(멀티미디어)' ? '편의' : categorys.category} id="tab2-1" index={categoryIdx}>
                              <ul className="cate-list-detail">
                                {categorys.optionList?.map((option, idx) => {
                                  return (
                                    <li key={`${categoryIdx}-${idx}`} className={isExist(option.optCd) ? 'on' : ''}>
                                      <span>{option.optNm}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </TabCont>
                          );
                        })}
                      </TabMenu>
                    </>
                  )}
                  {isMore && <Button size="full" line="gray" radius={true} title={isActive ? '24개의 추가옵션 닫기 -' : '24개의 추가옵션 더보기 +'} height={38} onClick={handleActive} />}
                </>
              ) : (
                <>
                  <h3 className="tit2 mb16">추가옵션</h3>
                  {resetFn && (
                    <button type="button" className="btn-reset">
                      초기화
                    </button>
                  )}
                  <TabMenu type="type1" defaultTab={0} mount={false}>
                    {carAddCategoryOptions.map((categorys, i) => {
                      return (
                        <TabCont tabTitle={hasMobile ? categorys.category.substr(0, 2) : categorys.category} id="tab2-1" index={i} key={i}>
                          <ul className="cate-list-detail">
                            {categorys.optionList?.map((option, idx) => {
                              return (
                                <li key={`${categorys}-${idx}`}>
                                  <CheckBox id={`chk-${i}-${idx}-${option.optCd}-3`} title={option.optNm} checked={isExist(option.optCd)} onChange={(e) => check(e, option)} />
                                </li>
                              );
                            })}
                          </ul>
                        </TabCont>
                      );
                    })}
                  </TabMenu>
                </>
              )}
            </div>
          </>
        )}
        {!selectOptFlag && (
          <>
            <h3 className="tit2 mt32">선택옵션</h3>
            <ul className={selectOptionList.length === 0 ? 'cate-list-detail choice mt10' : 'cate-list-detail choice'}>
              <>
                {selectOptionList &&
                  selectOptionList.length > 0 &&
                  selectOptionList.map((val, idx) => {
                    return (
                      <>
                        <li key={idx} className="on">
                          <CheckBox
                            id={`chkSel-${idx}`}
                            value={val}
                            title={val}
                            checked={true}
                            isSelf={false}
                            onChange={(e) => {
                              onSelectCheck(e.target.checked, val);
                            }}
                          />
                        </li>
                      </>
                    );
                  })}
              </>
            </ul>
            <div className="car-option-other w-btn">
              <Input
                type="text"
                placeHodler="추가할 옵션을 기재하세요"
                value={selectOptCntn}
                onKeyPress={(e) => {
                  handleKeyPress(e);
                }}
                onChange={(e) => {
                  setSelectOptCntn(e.target.value);
                }}
              />
              <Button size="sml" background="blue20" color="blue80" radius={true} title="추가" width={50} height={40} onClick={onAddSelectOptCntn} />
            </div>
          </>
        )}
      </div>
    );
  }
  // 모바일 END

  return (
    <div className={`option-cate ${className}`}>
      <h4 className="mb33">차량 옵션</h4>
      <div className={classNames('car-option-tp2', { chk: isEditing })}>
        <ul className="cate-ico">
          {isEditing
            ? carOptions?.map((option, i) => {
                return (
                  <li key={i} onClick={(e) => clickLi(e, option)}>
                    <CheckBox id={`chk-${option.optCd}`} checked={isExist(option.optCd)} size="small" onChange={(e) => check(e, option)} name={option.optCd} isSelf={false} />
                    <i className={`ico-${iconClass[option.optCd]}`}></i>
                    <span className="ico-exp" dangerouslySetInnerHTML={{ __html: changeOptNm(option.optNm) }}></span>
                  </li>
                );
              })
            : carOptions?.map((option, i) => (
                <li className={classNames({ on: isExist(option.optCd) })} key={i}>
                  <Tooltip placement="bottomLeft" width={400} zid={101}>
                    <TooltipItem>
                      <i className={classNames({ [`ico-${iconClass[option.optCd]}`]: true })}></i>
                      <span className="cate-ico-exp" dangerouslySetInnerHTML={{ __html: option.optNm }}></span>
                    </TooltipItem>
                    <TooltipCont>
                      <div className="cate-list-tooltip img-none">
                        <img src={option.imgUrl} alt={option.optNm}></img>
                        <p>
                          {option.optNm}
                          {/* <span>{option.desc}</span> */}
                          <span dangerouslySetInnerHTML={{ __html: option.desc }}></span>
                        </p>
                      </div>
                    </TooltipCont>
                  </Tooltip>
                </li>
              ))}
        </ul>

        {addOptions && (
          <>
            <CSSTransition in={carOptionMore} timeout={300} classNames={'fade'} unmountOnExit>
              <ul className="cate-list">
                {isEditing
                  ? carAddCategoryOptions?.map((carAddCategoryOption, i) => (
                      <li key={i}>
                        <p>{carAddCategoryOption.category}</p>
                        <ul className="cate-list-detail">
                          {carAddCategoryOption?.optionList?.map((option, idx) => (
                            <li className={classNames({ on: isExist(option.optCd) })} key={idx}>
                              <CheckBox
                                id={`chk-${i}-${idx}-${option.optCd}-3`}
                                title={option.optNm}
                                checked={isExist(option.optCd)}
                                name={option.optCd}
                                onChange={(e) => check(e, option)}
                                isSelf={true}
                              />
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  : carAddCategoryOptions?.map((carAddCategoryOption, i) => (
                      <li key={i}>
                        <p>{carAddCategoryOption.category}</p>
                        <ul className="cate-list-detail">
                          {carAddCategoryOption?.optionList?.map((option, idx) => (
                            <li className={classNames({ on: isExist(option.optCd) })} key={idx}>
                              <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                                <TooltipItem>
                                  <span>{option.optNm}</span>
                                </TooltipItem>
                                <TooltipCont>
                                  <div className="cate-list-tooltip">
                                    <img src={option.imgUrl} alt="루프팩"></img>
                                    <p>
                                      {option.optNm}
                                      <span dangerouslySetInnerHTML={{ __html: option.desc }}></span>
                                    </p>
                                  </div>
                                </TooltipCont>
                              </Tooltip>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
              </ul>
            </CSSTransition>
            <div className={carOptionMore ? 'cate-list-btn active' : 'cate-list-btn'}>
              <button type="button" onClick={toggleDisplayCarOption}>
                {carOptionMore ? '닫기' : `${addCategoriesLength}개의 옵션 더보기`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CarOptionsEditor);
