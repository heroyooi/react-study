import { useContext, memo } from 'react';
import { TabContext } from './TabMenu';

const TabCont = memo(({children, id, index, onClick, className=''}) =>{
  const { tabValue, isScroll } = useContext(TabContext)
  const tabOn = (index === tabValue);
  if (onClick) onClick();
  return (
    <>
      {
        !isScroll 
          ? <div className={ tabOn ? `ui-panel active ${className}` : `ui-panel non-active ${className}`} id={id}>{children}</div>
          : <div className={`ui-panel active ${className}`} id={id}>{children}</div>
      }
    </>
  )
});

export default TabCont;