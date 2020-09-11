import React, { useEffect, useState, useCallback } from 'react';
import ModalPopup from '../components/popup/ModalPopup';

const Modal = () => {
  const [open, setOpen] = useState(false);
  
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  return (
    <div>
      <button onClick={onOpen}>팝업 호출1</button>
      <ModalPopup isOpen={open} onClose={onClose}>
        <div>{Array(10).fill().map((v, i) => (<p key={i}>ModalContent</p>))}</div>
      </ModalPopup>
      <div style={{height: 1000, background: 'gold'}}></div>
      <button onClick={onOpen}>팝업 호출2</button>
      <div style={{height: 1500, background: 'gold'}}></div>
    </div>
  );
}

export default Modal;