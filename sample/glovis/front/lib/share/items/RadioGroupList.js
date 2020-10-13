import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import RadioButton from './RadioButton';

const RadioGroupList = memo(({ boxType = false, className, itemsSource, children, displayMemberPath, mode = 'horizon', selectedItem, selectedValuePath, size = 'large', onChange }) => {
  const [internalSelectedItem, setInternalSelectedItem] = useState(selectedItem);
  const [uid] = useState(uuid.v4());

  useEffect(() => {
    setInternalSelectedItem(selectedItem);
  }, [selectedItem]);

  const handleRadioChange = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const findItem = itemsSource.find((x) => x[selectedValuePath].toString() === e.target.value.toString());
      setInternalSelectedItem(findItem);
      if (onChange) {
        onChange(e, findItem);
      }
    },
    [itemsSource, onChange, selectedValuePath]
  );

  const handleRadioClick = useCallback(
    (mode, onClick) => (e) => {
      e.stopPropagation();

      const id = e.currentTarget.dataset.id;
      const findItem = itemsSource.find((x) => x[selectedValuePath].toString() === id);
      setInternalSelectedItem(findItem);
      if (mode === 'onClick' && onClick) {
        onClick(e, findItem);
      }
      if (onChange) {
        onChange(e, findItem);
      }
    },
    [itemsSource, onChange, selectedValuePath]
  );

  const createRadioList = (arg) => {
    const arr = [];
    if (arg === undefined) {
      itemsSource.map((v, idx) => {
        if (mode === 'horizon') {
          arr.push(
            <RadioButton
              key={idx}
              id={v.id || `${uid}-${idx}`}
              title={v[displayMemberPath]}
              label={v.label}
              checked={internalSelectedItem ? internalSelectedItem[selectedValuePath] : null}
              value={v[selectedValuePath]}
              disabled={v.disabled}
              size={size}
              onChange={handleRadioChange}
            />
          );
        } else {
          arr.push(
            <li key={idx} className={v.class !== undefined ? v.class : null}>
              <RadioButton
                id={v.id || `${uid}-${idx}`}
                title={v[displayMemberPath]}
                label={v.label}
                checked={internalSelectedItem ? internalSelectedItem[selectedValuePath] : null}
                value={v[selectedValuePath]}
                disabled={v.disabled}
                size={size}
                hasDetail={v.hasDetail}
                price={v.price}
                num={v.num}
                onChange={handleRadioChange}
              />
            </li>
          );
        }
      });
    } else {
      itemsSource.map((v, idx) => {
        if (mode === 'horizon') {
          arr.push(
            <RadioButton
              key={idx}
              id={v.id || `${uid}-${idx}`}
              title={v[displayMemberPath]}
              label={v[displayMemberPath]}
              checked={internalSelectedItem ? internalSelectedItem[selectedValuePath] : null}
              value={v[selectedValuePath]}
              disabled={v.disabled}
              size={size}
              children={arg[idx]}
              onChange={handleRadioChange}
              onClick={arg[idx].props.onClick === undefined ? handleRadioClick() : handleRadioClick('onClick', arg[idx].props.onClick)}
            />
          );
        } else {
          arr.push(
            <li key={idx} className={v.class !== undefined ? v.class : null}>
              <RadioButton
                id={v.id || `${uid}-${idx}`}
                title={v[displayMemberPath]}
                label={v[displayMemberPath]}
                checked={internalSelectedItem ? internalSelectedItem[selectedValuePath] : null}
                value={v[selectedValuePath]}
                disabled={v.disabled}
                size={size}
                children={arg[idx]}
                onChange={handleRadioChange}
                hasDetail={v.hasDetail}
                price={v.price}
                num={v.num}
                onClick={arg[idx].props.onClick === undefined ? handleRadioClick() : handleRadioClick('onClick', arg[idx].props.onClick)}
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
      <div className={className !== undefined ? `radio-group ${className}` : `radio-group`}>{mode === 'vertical' ? <ul className="vertical">{createRadioList(children)}</ul> : createRadioList()}</div>
    );
  }

  return <div className={className !== undefined ? `radio-chk-wrap list${children.length} ${className}` : `radio-chk-wrap list${children.length}`}>{createRadioList(children)}</div>;
});

RadioGroupList.propTypes = {
  boxType: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  itemsSource: PropTypes.array,
  displayMemberPath: PropTypes.string,
  mode: PropTypes.string,
  selectedItem: PropTypes.object,
  selectedValuePath: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func
};

RadioGroupList.displayName = 'RadioGroupList';
export default RadioGroupList;
