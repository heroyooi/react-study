
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const LoginInfo = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const [isIdCert, setIsIdCert] = useState(false);
  const [isPwCert, setIsPwCert] = useState(false);
  const [findMode, setFindMode] = useState("id");
  const [tabActive, setTabActive] = useState(0);

  const handleCert = useCallback((e) => {
    e.preventDefault();
    setIsIdCert(true);
  }, []);
  const tabClick = (e, idx) => {
    setFindMode(idx === 0 ? "id" : "password");
  }
  const handleCertPassword = useCallback((e) => {
    e.preventDefault();
    setIsPwCert(true);
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '아이디 찾기',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 84,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>        
        <div className="content-wrap login-contents pd20">
          <div className="login-wrap">            
            <div className="ico-tx-wrap v-2">
              <p>회원님의 정보와 일치하는 아이디입니다.</p>
              <dl className="mt16">
                <dt>· 이름</dt>
                <dd>김현대</dd>
              </dl>
              <dl>
                <dt>· 아이디</dt>
                <dd><span>[개인]hyundai</span><span>[딜러] deal_hyundai</span></dd>
              </dl>
              <Button size="full" background="blue20" color="blue80" radius={true} title="비밀번호찾기" height={40} fontWeight={500} marginTop={22} href="loginInfoPassword" nextLink={true} />
            </div>
            <Button className="fixed" size="full" background="blue80" title="로그인" href="login" nextLink={true} />                  
          </div>
        </div>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 전용 페이지입니다.      
    </AppLayout>
  )
}

export default LoginInfo;