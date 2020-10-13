import { useState, useCallback } from 'react';

const useRadio = (initValue = 1) => {
  const [value1, setter1] = useState(initValue);
  const [value2, setter2] = useState(initValue);
  const handler = useCallback((e) => {
    e.preventDefault();
    const index = Number(e.target.value);
    setter1(index);
    setter2(index);
  }, []);
  return [value1, value2, handler];
}


export default useRadio;