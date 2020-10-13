
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Link from 'next/link'
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
  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '비밀번호 찾기',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 84,
        color: '#ffffff'
      }
    });
    return (
      <AppLayout>
        <div className="content-wrap login-contents">
          <div className="login-wrap">
            <div className="nomember-wrap bg-white">            
              <form className="login-form">
                <fieldset>
                  <legend className="away">비회원 로그인</legend>
                  <ul className="vert-step">
                    <li className="active">{/*진행해야하는 단계 active클래스 추가 -> 완료되면 active제거*/}
                      <div className="con">
                        <p className="tit"><span className="step">1</span>아이디/이름 입력</p>
                        <span>비밀번호를 찾고자 하는 아이디, 이름을 입력해주세요.</span>
                        <ul className="mt16">
                          <li>
                            <label htmlFor="m-user-id" className="hide" >신청번호</label>
                            <Input type="text" placeHolder="아이디" id="m-user-id" height={40} />
                          </li>
                          <li>
                            <label htmlFor="m-user-name" className="hide" >이름</label>
                            <Input type="text" placeHolder="이름" id="m-user-name" height={40} />
                            <p className="tx-sub tx-red80">이름을 입력해주세요.</p>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div className="con">
                        <p className="tit"><span className="step">2</span>본인인증</p>
                        <span>휴대폰 본인인증을 진행해 주세요.</span>
                        <p className="tx-sub">입력하신 회원님의 개인 정보는 본인인증 이외의목적으로 활용하지 않습니다.</p>                      
                        <Button size="full" background="blue80" disabled={true} radius={true} title="휴대폰 본인인증"  height={40} fontSize={14} marginTop={16} />
                      </div>
                      <div className="l-btn-wrap">
                        <Button size="full" background="blue20" color="blue80" radius={true} title="아이디찾기"  height={40} fontSize={14} href="/member/loginInfo" nextLink={true}/> 
                      </div>
                    </li>
                  </ul>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" href="loginInfoPasswordConfirm" nextLink={true} />     
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