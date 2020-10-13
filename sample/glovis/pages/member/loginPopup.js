import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import MobLogin from '@src/components/common/MobLogin';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const LoginPopup = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [errorPw, setErrorPw] = useState(false); // 패스워드 5번 잘못 입력시 값을 true로 설정해주세요. true 시 캡챠모드로 전환
  const [noMemArea, setNoMemArea] = useState(true); // 비회원으로 신청하기 영역
  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '로그인',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#f6f7f8'
      }
    });
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <div className="login-wrap">
          <MobLogin errorPw={errorPw} noMemArea={noMemArea} />
        </div>
      </div>           
    </AppLayout>      
  )
}

export default LoginPopup;