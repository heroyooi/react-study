import { useState, useEffect, createContext } from 'react';
import Header from './Header';
import SiteMap from './SiteMap';
import useScroll from '@lib/share/custom/useScroll';
export const CommonContext = createContext();

const TopWrapper = () => {
  const [siteMapActive, setSiteMapActive] = useState(false);
  const [headerFix, setHeaderFix] = useState(false);
  const { currentY } = useScroll();

  useEffect(() => {
    setHeaderFix(currentY > 0 ? true : false);
  }, [currentY]); 

  return (
    <CommonContext.Provider value={{
      siteMapActive, setSiteMapActive, headerFix
    }}>
      <Header />
      <SiteMap />
    </CommonContext.Provider>
  )
}

export default TopWrapper;