import { useContext } from 'react'
import { PageContext } from './PageContext';

const PageCont = ({children, id}) => {
  const {num} = useContext(PageContext)
  let page_style = (num === id) ? {display: 'block'} : {display: 'none'};
  
  return (
    <div style={page_style}>{children}</div>
  )
}

export default PageCont