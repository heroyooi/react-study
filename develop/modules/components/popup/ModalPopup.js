import React, { useState, useEffect, useCallback } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import './ModalPopup.scss';

const ModalPopup = ({ children, isOpen=false, onClose }) => {
  const ModalDimm = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .75);
  `
  const ModalWrapper = styled.div`
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 90%;
    max-width: 1200px;
    margin:0 auto;  
    text-align: left;
    padding: 30px 0;
  `;
  const ModalContent = styled.div`
    background: #fff;
    border-radius: 4px;
  `;

  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    console.log(isOpen);
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = useCallback(() => {
    setOpen(false);
    onClose();
  }, []);

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={handleClick}
      ariaHideApp={false}
      parentSelector={() => document.querySelector('#root')}
      style={{
        overlay: {
          backgroundColor: 'none'
        },
        content: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          padding: 0,
          textAlign: 'center',
          background: 'none',
          border: 0,
          borderRadius: 0,
        }
      }}
    >
      <ModalDimm onClick={handleClick}></ModalDimm>
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
      </ModalWrapper>
    </ReactModal>
  );
}

export default ModalPopup;