import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

const MobFilterEngine = ({ mode = 'check', options = [], callback }) => {
  const modeCheck = mode === 'check';
  const [selectEngine, setSelectEngine] = useState({});


  const handleChange = useCallback(
    (e) => {
      const findItem = options.find((x) => x.value === e.target.name);
      if (findItem) {
        setSelectEngine(findItem);
      }
    },
    [options]
  );

  const handleClick = useCallback(
    (e) => {
      if (callback) {
        callback(e, selectEngine);
      }
    },
    [callback, selectEngine]
  );

  return (
    <>
      <div className="filter-list-wrap">
        <div className="content-wrap float-wrap">
          <ul>
            {(options || []).map((item, idx) => {
              return (
                <li key={idx}>
                  <CheckBox id={`chk-auto-${item.value}`} title={item.label} name={item.value} checked={selectEngine.value === item.value} isSelf={modeCheck} onChange={handleChange} />
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

MobFilterEngine.propTypes = {
  mode: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func
};

export default MobFilterEngine;
