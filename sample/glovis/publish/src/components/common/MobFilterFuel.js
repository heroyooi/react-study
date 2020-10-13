import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import { objIsEmpty, splitChunk } from '@src/utils/CommonUtil';

const MobFilterFuel = ({ mode = 'check', options, callback = null }) => {
  const modeCheck = mode === 'check';
  const [selectFuel, setSelectFuel] = useState({});

  const handleChange = useCallback(
    (e) => {
      const findItem = options.find((x) => x.value === e.target.name);
      if (findItem) {
        setSelectFuel(findItem);
      }
    },
    [options]
  );

  const handleClick = useCallback(
    (e) => {
      if (callback) {
        callback(e, selectFuel);
      }
    },
    [callback, selectFuel]
  );

  const fules = objIsEmpty(options) ? [] : splitChunk(options, 2);

  return (
    <>
      <div className="filter-list-wrap">
        <div className="content-wrap float-wrap col2">
          <ul>
            {fules.map((items, i) => {
              return (
                <li key={i}>
                  {items.map((item, j) => {
                    return <CheckBox key={j} id={`chk-fuel-${i}-${j}`} title={item.label} name={item.value} checked={selectFuel.value === item.value} isSelf={modeCheck} onChange={handleChange} />;
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

MobFilterFuel.propTypes = {
  mode: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func
};

export default MobFilterFuel;
