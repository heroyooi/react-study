import React, { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { numberFormat } from '@src/utils/CommonUtil';

const FilterRange = memo(({ displayTitle = true, rangeUnit, initMin, initMax, rangeMin = 0, rangeMax = 0, defaultValue, disabled = false, onChange, step = 1, priceSolo = false, appPrice = 0 }) => {
  const [initValue, setInitValue] = useState({ min: initMin, max: initMax });
  const [rangeValue, setRangeValue] = useState({ min: rangeMin, max: rangeMax });
  useEffect(() => {
    setInitValue((prev) => ({ ...prev, min: initMin, max: initMax }));
    setRangeValue((prev) => ({ ...prev, min: priceSolo ? appPrice : rangeMin, max: priceSolo ? appPrice : rangeMax }));
  }, [initMin, initMax, rangeMin, rangeMax, priceSolo, appPrice]);

  const handleRange = useCallback(
    (value) => {
      if (onChange) {
        onChange(value);
      } else {
        setRangeValue(value);
      }
    },
    [onChange]
  );

  const filterTitle = () => {
    if (rangeUnit === '연식') {
      return (
        <p className="search-filter-tit">
          <span className="tx-blue80">{defaultValue !== undefined ? defaultValue.min : rangeValue.min}</span> ~{' '}
          <span className="tx-blue80">{defaultValue !== undefined ? defaultValue.max : rangeValue.max}</span> 연식
        </p>
      );
    } else if (rangeUnit === '주행거리') {
      return (
        <p className="search-filter-tit">
          <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)}</span> ~{' '}
          <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)}</span> km
        </p>
      );
    } else if (rangeUnit === '가격') {
      return (
        <p className="search-filter-tit">
          <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)}</span> 만원 ~{' '}
          <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)}</span> 만원
        </p>
      );
    } else if (rangeUnit === '적정시세') {
      return (
        <p className="proper-price-tit">
          적정시세
          <span>
            {priceSolo
              ? numberFormat(appPrice)
              : defaultValue !== undefined
              ? numberFormat(defaultValue.min)
              : numberFormat(rangeValue.min) + '~' + defaultValue !== undefined
              ? numberFormat(defaultValue.max)
              : numberFormat(rangeValue.max)}
          </span>
        </p>
      );
    } else if (rangeUnit === '현재시세' && displayTitle) {
      return (
        <>
          <p className="proper-price-tit">적정 시세</p>
          <p className="search-filter-tit">
            <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)}</span> ~{' '}
            <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)} </span>
          </p>
        </>
      );
    }
  };

  return (
    <>
      {filterTitle()}
      <div className="price-range">
        <InputRange
          minValue={initValue.min}
          maxValue={initValue.max}
          value={defaultValue !== undefined ? defaultValue : rangeValue}
          disabled={disabled}
          onChange={handleRange}
          step={step ? step : 1000}
        />
        {(rangeUnit === '적정시세' || rangeUnit === '현재시세') && (
          <>
            <p className="low-price">
              <i className="ico-low-price" />
              최저<span className="tx-blue80"> {numberFormat(initValue.min)}</span>
            </p>
            <p className="high-price">
              <i className="ico-high-price" />
              최고<span className="tx-blue80"> {numberFormat(initValue.max)}</span>
            </p>
          </>
        )}
      </div>
    </>
  );
});

FilterRange.propTypes = {
  displayTitle: PropTypes.bool,
  rangeUnit: PropTypes.string,
  initMin: PropTypes.number,
  initMax: PropTypes.number,
  rangeMin: PropTypes.number,
  rangeMax: PropTypes.number,
  defaultValue: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  step: PropTypes.number,
  priceSolo: PropTypes.bool,
  appPrice: PropTypes.number
};

FilterRange.displayName = 'FilterRange';
export default FilterRange;
