import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Link from 'next/link'
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const LoginState01 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  const handleMemberMode = useCallback((mode) => () => {
    setMemMode(mode);
  }, []);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '휴면해제',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 60,
        color: '#f6f7f8'
      }
    });
    return (
      <AppLayout>      
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <span className="ico-wrap"><i className="ico-resting"></i></span>
            <h4>고객님의 계정은 1년 이상 로그인하지 않아<br />현재 <span>휴면 상태</span>입니다.</h4>
            <p>원활한 서비스를 위하여 휴면 해제를 해주세요.</p>
          </div>

          <div className="ico-tx-wrap">              
            <p>
              현대 오토벨에서는 고객님의 정보를 안전하게<br /> 
              보호하기 위하여 이용 내역이 없는 경우<br />
              휴면 상태로 전환하는 정책을 실시하고 있습니다.<br />
              휴면 회원은 서비스 이용이 제한될 수 있으며,<br /> 
              아래의  본인인증 절차에 따라 휴면 해제를 할 수 있습니다.
            </p>
          </div>            
        </div>
        <MobBottomArea isFix={true} isSimple={true}>
          <Buttons align="center" className="full">
            <Button size="big" background="blue20" color="blue80" title="취소" height={56} href="/main" nextLink={true} />
            <Button size="big" background="blue80" title="휴면 해제" height={56} href="loginState01_02" nextLink={true} />
          </Buttons>
        </MobBottomArea>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h4>고객님의 계정은 1년 이상 로그인하지 않아<br />현재 <span>휴면 상태</span>입니다.</h4>
            <p>원활한 서비스를 위하여 휴면 해제를 해주세요.</p>
          </div>

          <div className="ico-tx-wrap">
            <span className="ico-wrap"><i className="ico-resting"></i></span>
            <p>
              현대 오토벨에서는 고객님의 정보를 안전하게 보호하기 위하여 이용 내역이 없는 경우<br />
              휴면 상태로 전환하는 정책을 실시하고 있습니다.<br />
              휴면 회원은 서비스 이용이 제한될 수 있으며, 아래의  본인인증 절차에 따라 휴면 해제를 할 수 있습니다.
            </p>
          </div>

          <div className="login-wrap">
            <form className="login-form">
              <fieldset>
                <legend className="away">휴면계정 해제</legend>
                <ul className="vert-step">
                  <li>
                    <span className="step">1</span>
                    <div className="con">
                      <p className="tit">아이디/이름 입력</p>
                      <span>휴면해제를 원하시는 아이디, 이름을<br />입력해주세요.</span>
                      <ul>
                        <li>
                          <label htmlFor="user-id" className="hide" >아이디</label>
                          <Input type="text" placeHolder="아이디" id="user-id" width={308} />
                        </li>
                        <li>
                          <label htmlFor="user-name" className="hide" >이름</label>
                          <Input type="text" placeHolder="이름" id="user-name" width={308} />
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <span className="step">2</span>
                    <div className="con">
                      <p className="tit">본인인증</p>
                      <span>휴대폰 본인인증을 진행해 주세요.</span>
                      <Button size="mid" background="blue80" title="휴대폰 본인인증" width={160} height={48} />
                      <p className="tx-sub">
                        입력하신 회원님의 개인 정보는 <span>본인인증 이외의<br />목적으로 활용하지 않습니다.</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </fieldset>
            </form>
          </div>

          <Buttons align="center" marginTop={60} className="w-line">
            <Button size="big" background="gray" title="취소" width={180} height={60} href="/main" />
            <Button size="big" background="blue80" title="휴면 해제" width={180} height={60} onClick={(e) => rodalPopupHandler(e, "fade")} />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" size="xs">
        <div className="con-wrap">
          <p>휴면상태가 해제되었습니다.</p>
          <Buttons align="center" marginTop={60}>
            <Button size="big" background="blue80" title="확인" width={245} height={48} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default LoginState01;