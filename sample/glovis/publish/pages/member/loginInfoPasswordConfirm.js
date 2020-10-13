
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
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
          <div className="login-tit-area v-2">
            <h4>아이디 : hyundai</h4>
            <p>비밀번호를 재설정 해주세요.</p>
          </div>          
          <div className="login-wrap mt16">
            <form className="login-form">
              <fieldset>
                <legend className="away">비밀번호 변경</legend>
                <ul>
                  <li>
                    <label htmlFor="new-pw" className="hide" >새 비밀번호</label>
                    <Input type="password" placeHolder="새 비밀번호" id="m-new-pw" height={40} />
                  </li>
                  <li>
                    <label htmlFor="m-new-pw-chk" className="hide" >새 비밀번호 확인</label>
                    <Input type="password" placeHolder="새 비밀번호 확인" id="m-new-pw-chk" height={40} />
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>
          <div className="tx-wrap">
            <p className="tit">[안내]</p>
            <dl className="con">
              <dd>비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.</dd>
              <dd>아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.</dd>
              <dd>연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가  (ex. 123kbcha, aaa, 111 등)</dd>
              <dd>타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.</dd>
            </dl>
            <p className="b-tit">비밀번호 변경 후, 새로운 비밀번호로 로그인해주세요.</p>
          </div>          
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" onClick={(e) => openMpop(e, "fade")} />
        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
          <div className="con-wrap">
            <p className="tit1"></p>
            <p>정상적으로 비밀번호가 변경되었습니다.<br />확인을 누르시면 로그인 페이지로 이동합니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="확인" color="blue80" fontWeight="bold"  href="login" nextLink={true} />
            </Buttons>
          </div>
        </RodalPopup>   
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