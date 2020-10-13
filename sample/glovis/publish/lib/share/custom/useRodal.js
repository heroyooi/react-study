import { useState, useEffect, useCallback } from 'react';

const useRodal = (initValue = false) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    if (initValue === true) document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }, []);
  const handler1 = useCallback((e) => {
    e.preventDefault();
    setValue(true);
  }, []);
  const handler2 = useCallback((flag) => {
    setValue(flag);
  }, []);
  return [value, setValue, handler1, handler2];
};

export default useRodal;
