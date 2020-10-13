import React, { useState, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { produce } from 'immer';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import { imgUrl } from '@src/utils/HttpUtils';

const CarOptions = ({ title, mode = 'view', more = true, type = 1, popup = false, isButton = false, className = '', onClick, data, selectData = [] }) => {
  let defaultOpt = [];
  let addOpt = [];
  const addOptCategory = [
    { id: 2, name: '외장' },
    { id: 3, name: '내장' },
    { id: 4, name: '안전' },
    { id: 5, name: '편의' }
  ];

  const [carOptionMore, setCarOptionMore] = useState(false);
  const [carOption, setCarOption] = useState(selectData);

  //무한로딩 문제로 주석처리
  useEffect(() => {
    if (!isEqual(carOption, selectData)) {
      console.log(carOption);
      console.log(selectData);
      setCarOption(selectData);
    }
  }, [selectData]);
  const handleCarOption = useCallback(
    (e) => {
      e.preventDefault();
      setCarOptionMore(!carOptionMore);
    },
    [carOptionMore]
  );

  if (!isEmpty(data) && Array.isArray(data)) {
    defaultOpt = data.filter((item) => item.optDiv === 'D');
    addOpt = data.filter((item) => item.optDiv === 'A');
  }

  const divClass = popup === false ? `option-cate ${className}` : className;
  const createMoreButton = () => {
    return (
      <div className={carOptionMore ? `cate-list-btn${type === 1 ? null : type} active` : `cate-list-btn${type === 1 ? null : type}`}>
        <button onClick={handleCarOption}>{carOptionMore ? '추가옵션 닫기' : '추가옵션 더보기'}</button>
      </div>
    );
  };

  const handleCheck = (id, name, ischeked) => {
    console.log('handleCheck');
    setCarOption(
      produce((draft) => {
        if (ischeked) {
          draft.push(name);
        } else {
          draft.splice(draft.indexOf(name), 1);
        }
      })
    );
  };

  const handleCheck2 = (e) => {
    console.log('handleCheck2');
    const name = e.target.name;
    const checked = e.target.checked;
    setCarOption(
      produce((draft) => {
        if (checked) {
          draft.push(name);
        } else {
          draft.splice(draft.indexOf(name), 1);
        }
      })
    );
  };

  useEffect(() => {
    console.log('[useEffect] onClick');
    if (onClick) onClick(carOption);
  }, [carOption]);

  return (
    <div className={divClass}>
      {title !== undefined && <h4 className="mb33">{title}</h4>}
      {isButton === true && <Button size="mid" line="gray" radius={true} title="+ 전체 옵션보기" width={139} />}
      <div className={mode === 'view' ? `car-option-tp${type}` : `car-option-tp${type} chk`}>
        {mode === 'view' ? (
          <ul className="cate-ico">
            {!isEmpty(defaultOpt) &&
              defaultOpt.map((data, idx) => {
                return (
                  <li className="on" key={idx}>
                    <Tooltip placement="bottomLeft" width={400} zid={101}>
                      <TooltipItem>
                        <i className={data.iconClass} />
                        <span>{data?.optName || data.optNm}</span>
                      </TooltipItem>
                      <TooltipCont>
                        <div className="cate-list-tooltip img-none">
                          <img src={data?.imgUrl || data.optImgUrl} alt={data?.optName || data.optNm} />
                          <p>
                            {data?.optName || data.optNm}
                            <span dangerouslySetInnerHTML={{ __html: data.optCmnt }} />
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
              {!isEmpty(defaultOpt) &&
                defaultOpt.map((data, idx) => {
                  return (
                    <li key={idx} className={carOption.includes(data?.optCode || data.optCd) ? 'on' : 'off'}>
                      <CheckBoxItem id={'chk-dopt' + idx} checked={carOption.includes(data?.optCode || data.optCd)} name={data?.optCode || data.optCd} size="small" key={idx} onChange={handleCheck}>
                        <i className={data.iconClass} />
                        <span className="ico-exp">{data?.optName || data.optNm}</span>
                      </CheckBoxItem>
                    </li>
                  );
                })}
            </ul>
          </fieldset>
        )}
        {popup !== false && createMoreButton()}
        {more === true && (
          <>
            <CSSTransition in={carOptionMore} timeout={300} classNames={'fade'} unmountOnExit>
              {mode === 'view' && popup === false ? (
                <div className="cate-list-wrap">
                  <p className="tit">추가옵션</p>
                  <ul className="cate-list">
                    {!isEmpty(defaultOpt) &&
                      addOptCategory.map((data, idx) => {
                        return (
                          <li key={idx}>
                            <p>{data.name}</p>
                            <ul className="cate-list-detail">
                              {addOpt
                                .filter((ftdata) => ftdata.cat1Nm === data.name || (idx > 2 && ftdata.cat1Nm.includes('멀티미디어')))
                                .map((adddata, idx2) => {
                                  return (
                                    <li className={adddata.crId && 'on'} key={idx2}>
                                      <Tooltip placement="bottomLeftLeft" width={560} exception="car-option">
                                        <TooltipItem>
                                          <span>{adddata?.optName || adddata.optNm}</span>
                                        </TooltipItem>
                                        <TooltipCont>
                                          <div className="cate-list-tooltip">
                                            <img src={imgUrl + (adddata?.imgUrl || adddata.optImgUrl)} alt={adddata?.optName || adddata.optNm} />
                                            <p>
                                              {adddata?.optName || adddata.optNm}
                                              <span dangerouslySetInnerHTML={{ __html: adddata.optCmnt }} />
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
                </div>
              ) : (
                <fieldset>
                  <legend className="away">추가옵션</legend>
                  <ul className="cate-list">
                    {!isEmpty(defaultOpt) &&
                      addOptCategory.map((data, idx) => {
                        return (
                          <li key={idx}>
                            <p>{data.name}</p>
                            <ul className="cate-list-detail">
                              {addOpt
                                .filter((ftdata) => ftdata.cat1Nm === data.name || (idx > 2 && ftdata.cat1Nm.includes('멀티미디어')))
                                .map((adddata, idx2) => {
                                  return (
                                    <li className="on" key={idx2}>
                                      <CheckBox
                                        id={'chk-' + idx + '-' + idx2}
                                        title={adddata?.optName || adddata.optNm}
                                        checked={carOption.includes(adddata?.optCode || adddata.optCd)}
                                        name={adddata?.optCode || adddata.optCd}
                                        onChange={(e) => handleCheck2(e)}
                                        isSelf={false}
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
            </CSSTransition>
            {popup === false && createMoreButton()}
          </>
        )}
      </div>
    </div>
  );
};

export default CarOptions;

CarOptions.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  more: PropTypes.bool,
  type: PropTypes.number,
  popup: PropTypes.bool,
  isButton: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.array,
  selectData: PropTypes.array
};
