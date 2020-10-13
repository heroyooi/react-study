import { useState, createContext } from 'react'
export const PageContext = createContext()

const PageItem = ({children, min=1, max, initNum=1}) => {
  const [num, setNum] = useState(initNum)
  return (
    <PageContext.Provider value={{min, max, num, setNum}}>
      {children}
    </PageContext.Provider>
  )
}

export default PageItem