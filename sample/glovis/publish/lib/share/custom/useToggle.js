import { useState, useCallback } from 'react';

const useToggle = (initValue = false) => {
  const [value, setter] = useState(initValue)
  const handler = useCallback((e) => {
      setter(!value)
  }, [value])
  return [value, handler]
}

export default useToggle;