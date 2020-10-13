import { useState, useCallback, createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TopWrapper from './TopWrapper';
import Footer from './Footer';
import QuickMenu from './QuickMenu';
import PropTypes from 'prop-types';
import { ClipLoader } from "react-spinners";
export const DimmContext = createContext();

const AppLayout = ({children}) => {
  const { hasMobile, mPdBottom, mBgColor, isSection } = useSelector(state => state.common);
  const [isLoading, setIsLoading] = useState(false)

  if(hasMobile){
    return (
      <div id="wrap">
        <TopWrapper />
        <section id="container" style={{paddingBottom: mPdBottom, backgroundColor: mBgColor}}>{children}</section>
        {isSection === "main" && <Footer />}
      </div>
    )
  }

  return (    
    <div id="wrap">
      <TopWrapper />
      <section id="container">{children}</section>
      <QuickMenu />
      <Footer />
      {isLoading && 
        <div className="page-loading">
          <span className="dim"></span>
          <ClipLoader
            size={80}
            color={"#fff"}
            loading={isLoading}
          />
        </div>
      }
    </div>    
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout