import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import { objIsEmpty, splitChunk } from '@src/utils/CommonUtil';

const PricingMobFilterPopUp = ({ col, options = [], selectedLabel, callback }) => {
  const [selectItem, setSelectItem] = useState({});

  useEffect(() => {
    if (options && selectedLabel && objIsEmpty(selectItem)) {
      const findItem = options.find((x) => x.label === selectedLabel);
      if (findItem) {
        setSelectItem(findItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabel]);

  const handleChange = useCallback(
    (e) => {
      const findItem = options.find((x) => x.value === e.target.name);
      if (findItem) {
        setSelectItem(findItem);
      }
    },
    [options]
  );

  const handleClick = useCallback(
    (e) => {
      if (callback) {
        callback(e, selectItem);
      }
    },
    [callback, selectItem]
  );

  return (
    <>
      <div className="filter-list-wrap">
        <div className={`content-wrap float-wrap ${col > 1 ? 'col' + col : ''}`}>
          <ul>
            {splitChunk(options || [], col).map((items, idx) => {
              return (
                <li key={idx}>
                  {items.map((item, j) => {
                    return <CheckBox key={j} id={`chk-${item.value}`} title={item.label} name={item.value} checked={selectItem.value === item.value} isSelf={false} onChange={handleChange} />;
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
    </>
  );
};

PricingMobFilterPopUp.propTypes = {
  col: PropTypes.number,
  options: PropTypes.array,
  selectedLabel: PropTypes.string,
  callback: PropTypes.func
};

PricingMobFilterPopUp.defaultProps = {
  col: 1
};

export default PricingMobFilterPopUp;
