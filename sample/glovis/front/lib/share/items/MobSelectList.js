import React, { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RadioGroupList from '@lib/share/items/RadioGroupList';
import Button from '@lib/share/items/Button';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';

const MobSelectList = memo(
  ({
    selectedItem, // 기본선택값
    selectedValuePath, // value로 사용할 프로퍼티명
    displayMemberPath, // label로 사용할 프로퍼티명
    itemsSource, // loop data
    uiType = 1,
    width = '100%',
    height = 40,
    isActive = false,
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
    subPop = false
  }) => {
    const createBodyPortal1 = useCreatePortalInBody(null, 'wrap');
    const createBodyPortal2 = useCreatePortalInBody(null, 'wrap');
    const [dimm, setDimm] = useState(isActive);
    const [active, setActive] = useState(isActive);
    const [areaActive, setAreaActive] = useState(isActive);
    const [internalSelectedItem, setInternalSelectedItem] = useState(selectedItem);

    const selectClass = classNames('select-box', { tp2: uiType === 2 });

    useEffect(() => {
      setAreaActive(active);
    }, [active]);

    useEffect(() => {
      setInternalSelectedItem(selectedItem);
    }, [selectedItem, itemsSource]);

    useEffect(() => {
      setActive(false);
      setDimm(false);
      if (!subPop) preventScroll(false);
    }, [isClose, subPop]);

    const handleOpen = useCallback(
      (e) => {
        e.preventDefault();
        if (!objIsEmpty(itemsSource)) {
          setActive(true);
          setDimm(true);
          if (!subPop) preventScroll(true);
        }
      },
      [itemsSource, subPop]
    );

    const handleConfirm = useCallback(
      (e) => {
        e.preventDefault();
        setActive(false);
        setDimm(false);
        if (!subPop) preventScroll(false);
        if (onClick) {
          onClick(e, internalSelectedItem);
        }
      },
      [internalSelectedItem, onClick, subPop]
    );

    const handleChange = useCallback(
      (e) => {
        const newSelectedItem = itemsSource.find((x) => x[selectedValuePath].toString() === e.target.value.toString());

        setInternalSelectedItem(newSelectedItem);
        if (onChange && newSelectedItem) {
          onChange(e, newSelectedItem);
        }
      },
      [itemsSource, onChange, selectedValuePath]
    );

    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      if (!subPop) preventScroll(false);
    }, [subPop]);

    return (
      <>
        <div className={selectClass} onClick={disabled ? null : handleOpen} style={{ width: width }}>
          <button type="button" style={{ height: height }} disabled={objIsEmpty(itemsSource) ? true : disabled}>
            {!objIsEmpty(selectedItem)
              ? selectedItem[displayMemberPath]
              : selectedItem === undefined && !objIsEmpty(internalSelectedItem)
              ? internalSelectedItem[displayMemberPath]
              : placeHolder || ''}
          </button>
        </div>
        {isDimm && createBodyPortal1(<div className={dimm ? `modal-bg ${dimmColor} active` : `modal-bg ${dimmColor}`} style={{ zIndex: zid }} onClick={handleCloseDimm} />)}
        {createBodyPortal2(
          <MobBottomArea active={areaActive} className={areaClass} isFixButton={isFixButton} isSimple={isSimple} zid={zid}>
            <>
              {active && (
                <RadioGroupList
                  itemsSource={itemsSource || []}
                  mode="vertical"
                  selectedItem={internalSelectedItem}
                  selectedValuePath={selectedValuePath}
                  displayMemberPath={displayMemberPath}
                  defaultValue={!objIsEmpty(internalSelectedItem) ? internalSelectedItem[selectedValuePath] : null}
                  onChange={handleChange}
                />
              )}
              <Button className="fixed" size="full" background="blue80" title="확인" height={56} onClick={handleConfirm} />
            </>
          </MobBottomArea>
        )}
      </>
    );
  }
);

MobSelectList.propTypes = {
  areaClass: PropTypes.string,
  itemsSource: PropTypes.array,
  dimmColor: PropTypes.string,
  disabled: PropTypes.bool,
  displayMemberPath: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isActive: PropTypes.bool,
  isClose: PropTypes.bool,
  isDimm: PropTypes.bool,
  isFixButton: PropTypes.bool,
  isSimple: PropTypes.bool,
  placeHolder: PropTypes.string,
  selectedItem: PropTypes.object,
  selectedValuePath: PropTypes.string,
  uiType: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zid: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  subPop: PropTypes.bool
};

MobSelectList.displayName = 'MobSelectList';
export default MobSelectList;
