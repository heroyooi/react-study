import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RadioGroup from '@lib/share/items/RadioGroup';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { preventScroll } from '@src/utils/CommonUtil';

const MobSelectBox = memo(
  ({
    options = [],
    uiType = 1,
    width = '100%',
    height = 40,
    customMode = false,
    children,
    customName = '',
    isActive = false,
    customButton = false,
    customButtonName = '선택',
    customButtonSize = 'full',
    customButtonWidth = '100%',
    customButtonHeight,
    customButtonFontSize,
    areaClass,
    onChange,
    onClick,
    isDimm = true,
    dimmColor = 'black',
    isFixButton = true,
    isSimple = false,
    disabled = false,
    isClose = false,
    placeHolder,
    zid = 103,
    isOpen,
    onOpen,
    subPop = false,
    uuid=false,
    pricingMgrade
  }) => {
    const createBodyPortal1 = useCreatePortalInBody(null, 'wrap');
    const createBodyPortal2 = useCreatePortalInBody(null, 'wrap');
    const [dummyVal, setDummyVal] = useState(options.findIndex((v) => v.checked === true) + 1);
    const [value, setValue] = useState(options.findIndex((v) => v.checked === true) + 1);
    const [dimm, setDimm] = useState(isActive);
    const [active, setActive] = useState(isActive);
    const [areaActive, setAreaActive] = useState(isActive);

    const selectClass = classNames('select-box', { tp2: uiType === 2 });

    useEffect(() => {
      setAreaActive(active);
    }, [active]);

    useEffect(() => {
      setActive(isOpen);
      setDimm(isOpen);
      if (isOpen === true) {
        if (!subPop) preventScroll(false);
      } else {
        preventScroll(true);
      }
    }, [isOpen, subPop]);

    useEffect(() => {
      setActive(false);
      setDimm(false);
      if (!subPop) preventScroll(false);
    }, [isClose, subPop]);

    useEffect(() => {
      setDummyVal(options.findIndex((v) => v.checked === true) + 1);
      setValue(options.findIndex((v) => v.checked === true) + 1);
    }, [options]);

    const handleOpen = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      preventScroll(true);
      if (onOpen) {
        onOpen(e);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleConfirm = useCallback(
      (e) => {
        e.preventDefault();
        setActive(false);
        setDimm(false);
        setValue(dummyVal);
        if (!subPop) preventScroll(false);
        if (onClick) onClick(dummyVal, e);
      },
      [dummyVal, onClick, subPop]
    );

    const handleChange = useCallback(
      (e) => {
        setDummyVal(+e.target.value);
        if (onChange) onChange(e);
      },
      [onChange]
    );

    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      setValue(value);
      if (!subPop) preventScroll(false);
    }, [subPop, value]);

    // prettier-ignore
    return (
      <>
        <div className={selectClass} onClick={disabled ? null : handleOpen} style={{ width: width }}>
          {customButton ? (
            <Button size={customButtonSize} background="blue20" color="blue80" fontSize={customButtonFontSize} radius={true} title={customButtonName} width={customButtonWidth} height={customButtonHeight} disabled={disabled} />
          ) : (
            <button type="button" style={{ height: height }} disabled={disabled}>
              {
                !customMode
                  ? value === 0
                      ? placeHolder
                          ? placeHolder
                          : options[0] ? options[0].label : ''
                      : options[0] 
                        ? options[value - 1]
                          ? options[value - 1].label : ''
                        : ''
                  : customName
              }
            </button>
          )}
        </div>
        {isDimm && createBodyPortal1(<div className={dimm ? `modal-bg v-2 ${dimmColor} active` : `modal-bg v-2 ${dimmColor}`} style={{ zIndex: zid }} onClick={handleCloseDimm} />)}
        {createBodyPortal2(
          <MobBottomArea active={areaActive} className={areaClass} isFixButton={isFixButton} isSimple={isSimple} zid={zid}>
            {customMode ? (
              children
            ) : (
              <>
                {active && <RadioGroup uuid={uuid} dataList={options} mode="vertical" pricingMgrade={pricingMgrade} defaultValue={value === 0 && placeHolder === undefined ? 1 : value} onChange={handleChange} />}
                <Button className="fixed" size="full" background="blue80" title="확인" height={56} onClick={handleConfirm} />
              </>
            )}
          </MobBottomArea>
        )}
      </>
    );
  }
);

MobSelectBox.prototype = {
  options: PropTypes.array,
  uiType: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customMode: PropTypes.bool,
  children: PropTypes.any,
  customName: PropTypes.string,
  isActive: PropTypes.bool,
  customButton: PropTypes.bool,
  customButtonName: PropTypes.string,
  customButtonSize: PropTypes.string,
  customButtonWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customButtonHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customButtonFontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  areaClass: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  isDimm: PropTypes.bool,
  dimmColor: PropTypes.string,
  isFixButton: PropTypes.bool,
  isSimple: PropTypes.bool,
  disabled: PropTypes.bool,
  isClose: PropTypes.bool,
  placeHolder: PropTypes.string,
  zid: PropTypes.number,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.bool,
  subPop: PropTypes.bool,
  uuid :  PropTypes.bool,
  pricingMgrade :  PropTypes.func
};

MobSelectBox.displayName = 'MobSelectBox';
export default MobSelectBox;
