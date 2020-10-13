/* eslint-disable react/no-children-prop */
import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Radio from './Radio';

const RadioGroup = memo(
  ({
    dataList,
    defaultValue = '1',
    className,
    size = 'large',
    children,
    boxType = false,
    mode = 'horizon',
    onChange,
    disabledLabel = false,
    uuid = false,
    pricingMgrade,
    onClickArr = [],
    onAccdClick,
    selfTrigger = false
  }) => {
    const [isValue, setIsValue] = useState(dataList.length !== 1 ? defaultValue : dataList[0].checked ? '1' : '0');

    useEffect(() => {
      setIsValue(defaultValue);
    }, [defaultValue]);

    const handleRadioChange = useCallback(
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsValue(e.target.value);
        if (onChange) onChange(e);
      },
      [onChange]
    );

    const handleRadioCallback = useCallback(
      (id) => (e, data) => {
        onClickArr[id] && onClickArr[id](e, data);
        e.stopPropagation();
        e.preventDefault();
        setIsValue(e.target.value);
        if (onChange) onChange(e);
      },
      [onChange, onClickArr]
    );

    const handleRadioClick = useCallback(
      (mode, onClick) => (e) => {
        e.stopPropagation();
        setIsValue(e.currentTarget.dataset.id);
        if (mode === 'onClick' && onClick) onClick(e);
        if (onChange) onChange(e);
        if (onChange && selfTrigger === true) onChange(e.currentTarget.dataset.id);
      },
      [onChange, selfTrigger]
    );
    const handleRadioGroupClick = useCallback((e, title) => {
      e.preventDefault();
      if (title === '사고') {
        if (onAccdClick) onAccdClick(e);
      }
    }, []);

    const createRadioList = (arg) => {
      const arr = [];
      if (arg === undefined) {
        dataList.map((v, i) => {
          if (mode === 'horizon') {
            arr.push(
              <Radio
                key={v.id}
                id={v.id}
                name={v.name}
                title={v.title}
                label={v.label}
                checked={isValue}
                value={v.value}
                disabled={v.disabled}
                size={size}
                onChange={!onClickArr ? handleRadioChange : handleRadioCallback(i)}
                onClick={
                  onAccdClick
                    ? (e) => {
                        handleRadioGroupClick(e, v.title);
                      }
                    : null
                }
              />
            );
          } else {
            arr.push(
              <li key={!uuid ? v.id : uuidv4()} className={v.class !== undefined ? v.class : null}>
                <Radio
                  id={v.id}
                  key={v.id}
                  name={v.name}
                  title={v.title}
                  label={!disabledLabel ? v.label : null}
                  checked={isValue}
                  value={v.value}
                  disabled={v.disabled}
                  size={size}
                  hasDetail={v.hasDetail}
                  price={v.price}
                  num={v.num}
                  onChange={handleRadioChange}
                  pricingMgrade={pricingMgrade}
                />
              </li>
            );
          }
        });
      } else {
        const newArg = arg.length > 1 ? arg : [arg];
        dataList.map((v, i) => {
          if (mode === 'horizon') {
            arr.push(
              <Radio
                key={!uuid ? v.id : uuidv4()}
                id={v.id}
                name={v.name}
                title={v.title}
                label={!disabledLabel ? v.label : null}
                checked={isValue}
                value={v.value}
                disabled={v.disabled}
                size={size}
                children={newArg[i]}
                onChange={handleRadioChange}
                onClick={newArg[i]?.props?.onClick === undefined ? handleRadioClick() : handleRadioClick('onClick', newArg[i]?.props?.onClick)}
              />
            );
          } else {
            arr.push(
              <li key={!uuid ? v.id : uuidv4()} className={v.class !== undefined ? v.class : null}>
                <Radio
                  id={v.id}
                  key={v.id}
                  name={v.name}
                  title={v.title}
                  label={!disabledLabel ? v.label : null}
                  checked={isValue}
                  value={v.value}
                  disabled={v.disabled}
                  size={size}
                  children={newArg[i]}
                  onChange={handleRadioChange}
                  hasDetail={v.hasDetail}
                  price={v.price}
                  num={v.num}
                  onClick={newArg[i]?.props?.onClick === undefined ? handleRadioClick() : handleRadioClick('onClick', newArg[i]?.props?.onClick)}
                />
              </li>
            );
          }
        });
      }
      return arr;
    };

    if (boxType === false) {
      return (
        <div className={className !== undefined ? `radio-group ${className}` : `radio-group`}>
          {mode === 'vertical' ? <ul className="vertical">{createRadioList(children)}</ul> : createRadioList()}
        </div>
      );
    }
    return <div className={className !== undefined ? `radio-chk-wrap list${children.length} ${className}` : `radio-chk-wrap list${children.length}`}>{createRadioList(children)}</div>;
  }
);

RadioGroup.propTypes = {
  dataList: PropTypes.array,
  defaultValue: PropTypes.any,
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
  boxType: PropTypes.bool,
  mode: PropTypes.string,
  disabledLabel: PropTypes.bool,
  onChange: PropTypes.func,
  uuid: PropTypes.bool,
  pricingMgrade: PropTypes.func,
  onClickArr: PropTypes.any,
  onAccdClick: PropTypes.func,
  selfTrigger: PropTypes.bool
};

RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;
