import React, { useEffect, useState,useCallback } from 'react'
import { useSelector } from 'react-redux';

const globalThis = require('globalthis')();
const windows = globalThis?.window;

const BtnKakao2 = ({type=1, style, onClick}) =>{

  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-kakao tp${type}`} style={style} onClick={onClick}>로그인</button>
    )
  } else{
    
    useEffect(() => {
      windows.Kakao.init('4a7be481fb849c9e5bfc5a9c4436ac3b');
    }, []);

    const onClickHandler = e => {
      
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          console.log(res);
        },
        fail : function(error) {
          console.log(error);
        }
      });

    }

    return(
      <>
      {/*<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script> */}
      <script src="kakao.min.js"></script>
      <button id="kakao-login-btn" className={`btn-kakao tp${type}`} style={style} onClick={onClickHandler}>로그인</button>
      </>
    )
  }
}

export default BtnKakao2