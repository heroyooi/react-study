import { useState, useEffect, useCallback } from 'react';
import { preventScroll } from '@src/utils/CommonUtil';

const useRodal = (initValue = false) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    if (initValue === true) preventScroll(true);
  }, [initValue]);

  const handler1 = useCallback((e) => {
    e && typeof e.preventDefault === 'function' && e.preventDefault();
    setValue(true);
  }, []);

  const handler2 = useCallback((flag) => {
    setValue(flag);
  }, []);

  return [value, setValue, handler1, handler2];
};

export default useRodal;
