import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const useCreatePortalInBody = (zid, targetId) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current === null && typeof document !== 'undefined') {
      const div = document.createElement('div');
      if (targetId !== 'top-area') {
        div.style.position = 'absolute';
        div.style.left = 0;
        div.style.top = 0;
        div.style.width = '100%';
      }
      div.style.zIndex = zid !== undefined ? zid : null;
      wrapperRef.current = div;
    }

    const wrapper = wrapperRef.current;
    if (!wrapper || typeof document === 'undefined') {
      return;
    }
    if (targetId !== undefined) {
      document.getElementById(targetId).appendChild(wrapper);
      document.getElementById(targetId).classList.add('active');
    } else {
      document.body.appendChild(wrapper);
    }

    return () => {
      if (targetId !== undefined) {
        document.getElementById(targetId).removeChild(wrapper);
        document.getElementById(targetId).classList.remove('active');
      } else {
        document.body.removeChild(wrapper);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (children) => wrapperRef.current && createPortal(children, wrapperRef.current);
};

useCreatePortalInBody.displayName = 'useCreatePortalInBody';
export default useCreatePortalInBody;
