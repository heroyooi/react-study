import { useState, useEffect, createContext } from 'react'
export const CategoryContext = createContext()

const DynamicCategory = ({children}) => {
  const [categoryNum, setCategoryNum] = useState(children.length)

  return (
    <CategoryContext.Provider value={{categoryNum, setCategoryNum}}>
      {categoryNum !== 0 ? <div className="del-tag-wrap">{children}</div> : <div className="del-tag-wrap no-result"><ul className="del-tag"><li>최근 검색조건이 없습니다.</li></ul></div>}
    </CategoryContext.Provider>
  )
}

export default DynamicCategory