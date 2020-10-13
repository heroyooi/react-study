import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

const Counter = ({initCount, min, max}) => {
  console.log()
  const [count, setCount] = useState(initCount)
  const handleClick = useCallback((e) => {
    e.preventDefault();
    let mode = e.target.dataset.cmode
    if(mode === 'reset') {
      setCount(initCount)
    } else if (mode === 'plus') {
      if(count < max) setCount(count + 1)
    } else if (mode === 'minus') {
      if(count > min) setCount(count - 1)
    }
  }, [count])
  
  return (
    <div className="counter">
      카운트: {count}
      <span className="btn-base bb-st5 ml10"><button onClick={handleClick} data-cmode="reset">초기화</button></span>
      <span className="btn-base bb-st5 ml10"><button onClick={handleClick} data-cmode="plus">+</button></span>
      <span className="btn-base bb-st5 ml10"><button onClick={handleClick} data-cmode="minus">-</button></span>
    </div>
  )
}

Counter.propTypes = {
  initCount: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}

export default Counter