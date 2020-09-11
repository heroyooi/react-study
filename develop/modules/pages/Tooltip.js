import React from 'react';
import styled from 'styled-components';

import Tooltip from '../components/tooltip/Tooltip';
import TooltipItem from '../components/tooltip/TooltipItem';
import TooltipCont from '../components/tooltip/TooltipCont';

const TooltipExample = () => {
  const TooltipWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    li {
      display: inline-block;
      padding: 5px;
      border: 1px solid #000;
      border-radius: 3px;
      position: absolute;
      &:nth-child(1), &:nth-child(2), &:nth-child(3) {
        top: 0;
      }
      &:nth-child(1), &:nth-child(4), &:nth-child(6) {
        left: 0;
      }
      &:nth-child(2), &:nth-child(7) {
        left: 50%;
        transform: translateX(-50%);
      }
      &:nth-child(3), &:nth-child(5), &:nth-child(8) {
        right: 0;
      }
      &:nth-child(4), &:nth-child(5) {
        top: 50%;
        transform: translateY(-50%);
      }
      &:nth-child(6), &:nth-child(7), &:nth-child(8) {
        bottom: 0;
      }
    }
  `;
  const TooltipTxt = <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum repellendus dolore earum qui beatae doloremque!</p>;

  return (
    <TooltipWrapper>
      <ul>
        <li>
          <Tooltip placement="bottomLeft">
            <TooltipItem>bottomLeft</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="bottom" exception="black">
            <TooltipItem>bottom (black)</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="bottomRight">
            <TooltipItem>bottomRight</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="right">
            <TooltipItem>right</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="left">
            <TooltipItem>left</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="topLeft">
            <TooltipItem>topLeft</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="top">
            <TooltipItem>top</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
        <li>
          <Tooltip placement="topRight">
            <TooltipItem>topRight</TooltipItem>
            <TooltipCont>{TooltipTxt}</TooltipCont>
          </Tooltip>
        </li>
      </ul>
      
    </TooltipWrapper>
  );
};

export default TooltipExample;