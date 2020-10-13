import { useContext } from 'react'
import { GuideContext } from '../../../src/dummy/guide'


const PreCode = ({children}) => {
  const { codeType } = useContext(GuideContext)
  return (
    <pre className={codeType ? 'prism-code language-javascript active' : 'prism-code language-javascript'}>
      {children}
    </pre>
  )
}

export default PreCode