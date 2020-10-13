import { useContext } from 'react'
import { PageContext } from './PageItem'

const Pagination = () => {
  const { min, max, num, setNum } = useContext(PageContext)
  const handleClickPrev = (e) => {
    e.preventDefault()
    if (min < num) setNum(prev => prev-1)
  }
  const handleClickNext = (e) => {
    e.preventDefault()
    if (max > num) setNum(prev => prev+1)
  }

  return (
    <ul className="pagination">
      <li>
        <button className="btn-prev-xs" onClick={handleClickPrev}></button>
      </li>
      <li className="pagination-num"><span className="tx-black">{num}</span>/{max}</li>
      <li>
        <button className="btn-next-xs" onClick={handleClickNext}></button>
      </li>
    </ul>
  )
}

export default Pagination