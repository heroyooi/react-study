import window from 'global';
import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  function getWindowDimensions() {
    return { 
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    }
  }
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;