import { useState, useEffect } from 'react';
//import throttle from 'lodash.throttle';

const useScroll = () => {
  const [state, setState] = useState({
    currentX: 0,
    currentY: 0
  });
  const onScroll = () => {
    setState({ currentX: window.scrollX, currentY: window.pageYOffset });
  };
  useEffect(() => {
    window.addEventListener("load", onScroll);
    //window.addEventListener("scroll",_.throttle(onScroll,100));
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("load", onScroll);
      window.removeEventListener("scroll", onScroll);
    }
  }, []);
  return state;
};

export default useScroll;
