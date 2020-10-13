import { useState, useCallback } from 'react'
import InputRange from 'react-input-range'
import { numberFormat } from '../../../src/utils/CommonUtil'

const FilterRange = ({rangeUnit, initMin, initMax, rangeMin, rangeMax, defaultValue, disabled=false, onChange, step=1}) => {
  const [initValue, setInitValue] = useState({ min: initMin, max: initMax })
  const [rangeValue, setRangeValue] = useState({ min: rangeMin, max: rangeMax })
  const handleRange = useCallback((value) => {
    if (onChange) {
      onChange(value)
    } else {
      setRangeValue(value)
    }
  }, [])

  const filterTitle = () => {
    if (rangeUnit === '연식') {
      return <p className="search-filter-tit"><span className="tx-blue80">{defaultValue !== undefined ? defaultValue.min : rangeValue.min}</span> ~ <span className="tx-blue80">{defaultValue !== undefined ? defaultValue.max : rangeValue.max}</span> 연식</p>
    } else if (rangeUnit === '주행거리') {
      return <p className="search-filter-tit"><span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)}</span> ~ <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)}</span> km</p>
    } else if (rangeUnit === '가격') {
      return <p className="search-filter-tit"><span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)}</span> 만원 ~ <span className="tx-blue80">{defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)}</span> 만원</p>
    } else if (rangeUnit === '적정시세') {
      return <p className="proper-price-tit">적정시세<span>{defaultValue !== undefined ? numberFormat(defaultValue.min) : numberFormat(rangeValue.min)} ~ {defaultValue !== undefined ? numberFormat(defaultValue.max) : numberFormat(rangeValue.max)}</span></p>
    }
  }

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
        {
          rangeUnit === '적정시세' &&
          <>
            <p className="low-price"><i className="ico-low-price"></i>최저<span className="tx-blue80"> {numberFormat(initValue.min)}</span></p>
            <p className="high-price"><i className="ico-high-price"></i>최고<span className="tx-blue80"> {numberFormat(initValue.max)}</span></p>
          </>
        }
      </div>
    </>
  )
}

export default FilterRange