
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import MobLogin from '@src/components/common/MobLogin';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Link from 'next/link';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const Login = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MEMBER });

  const [errorPw, setErrorPw] = useState(true); // 패스워드 5번 잘못 입력시 값을 true로 설정해주세요. true 시 캡챠모드로 전환
  const [memMode, setMemMode] = useState("member") // 비회원시 값을 nonmember로 설정해주세요.
  const handleMemberMode = useCallback((mode) => () => {
    setMemMode(mode);
  }, []);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  if(hasMobile){
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '로그인',
        options: ['back']
      }
    });
    
    useEffect(() => {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#f6f7f8',
        }
      });
    }, []);
    

    useEffect(() => {
      if (memMode === "member") {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 24,
            color: '#f6f7f8',
          }
        });
      } else if (memMode === "nonmember") {
        dispatch({
          type: MOBILE_CONTENT_STYLE,
          data: {
            bottom: 80,
            color: '#ffffff',
          }
        });
      }
    }, [memMode])
    
    return (
      <AppLayout>        
        <div className="login-contents">
          <div className="login-wrap">
            <TabMenu type="type2 big">
              <TabCont tabTitle="회원 로그인" id="tab7-1" index={0} onClick={handleMemberMode("member")}>
                <div className="pdside20">
                  <MobLogin errorPw={errorPw} />
                </div>
              </TabCont>
              <TabCont tabTitle="비회원 로그인" id="tab7-2" index={1} onClick={handleMemberMode("nonmember")}>
                <div className="nomember-wrap bg-white pdside20">
                  <p className="p2">비회원으로 이용하신 내역을 조회하실 수 있습니다.</p>
                  <form className="login-form">
                    <fieldset>
                      <legend className="away">비회원 로그인</legend>
                      <ul className="vert-step">
                        <li>                       
                          <div className="con">
                            <p className="tit"><span className="step">1</span>신청번호 입력</p>
                            <span>신청번호를 입력해주세요.</span>
                            <label htmlFor="m-apply-num" className="hide" >신청번호</label>
                            <Input type="text" value="1234" placeHolder="신청번호" id="m-apply-num" height={40} marginTop={16}/>
                          </div>
                        </li>
                        <li className="active">{/*진행해야하는 단계 active클래스 추가 -> 완료되면 active제거*/}
                          <div className="con">
                            <p className="tit"><span className="step">2</span>본인인증</p>
                            <span>휴대폰 본인인증을 진행해 주세요.</span>
                            <p className="tx-sub">입력하신 회원님의 개인 정보는 본인인증 이외의목적으로 활용하지 않습니다.</p>
                            <Button size="full" background="blue80" disabled={true} radius={true} title="휴대폰 본인인증"  height={40} fontSize={14} marginTop={16} />
                            <p className="tx-sub tx-red80">본인인증을 진행해주세요.</p>
                          </div>
                        </li>
                      </ul>
                    </fieldset>
                  </form>
                </div>
                <MobBottomArea isFix={true} isSimple={true}>
                  <Buttons align="center" className="full">
                    <Button size="big" background="blue20" color="blue80" title="취소" height={56} onClick={handleMemberMode("member")} />
                    <Button size="big" background="blue80" title="조회" height={56} onClick={(e) => openMpop(e, "fade")} />
                  </Buttons>
                </MobBottomArea>
                <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
                  <div className="con-wrap">
                    <p className="tit1"></p>
                    <p>내역이 없습니다.<br />입력하신 정보가 맞는지 확인해주세요</p>
                    <Buttons align="right" marginTop={24}>
                      <Button fontSize={14} title="확인" color="blue80" fontWeight="bold" onClick={closeMpop} />
                    </Buttons>
                  </div>
                </RodalPopup>                
              </TabCont>
            </TabMenu>
          </div>
        </div>        
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="content-wrap login-contents">
          <div className="login-tit-area">
            <h3>로그인</h3>
          </div>

          <div className="login-wrap">
            <TabMenu type="type7">
              <TabCont tabTitle="회원 로그인" id="tab7-1" index={0} onClick={handleMemberMode("member")}>
                <form className="login-form">
                  <fieldset>
                    <legend className="away">로그인</legend>
                    <ul>
                      <li>
                        <label htmlFor="user-id" className="hide" >아이디</label>
                        <Input type="text" placeHolder="아이디" id="user-id" width={368} />
                      </li>
                      <li>
                        <label htmlFor="user-pw" className="hide" >비밀번호</label>
                        <Input type="password" placeHolder="비밀번호" id="user-pw" width={368} />
                      </li>
                      {errorPw === false && <li><CheckBox id='chk-save' title='아이디 저장' /></li>}
                    </ul>
                    {
                      errorPw === true &&
                      <div className="captcha-wrap">
                        <p className="tx-not">5회 이상 비밀번호를 잘못 입력하셨습니다.<br />정보보호를 위해 자동입력 방지문자를 함께 입력 후 로그인해주세요.</p>
                        <div className="captcha-box">
                          <div className="img-wrap"><img src="/images/dummy/captcha-img.png" alt="자동입력 방지문자 이미지" /></div>
                          <div className="btn-wrap">
                            <Button size="mid" title="새로고침" width={138} height={43} />
                            <Button size="mid" title="음성으로 듣기" width={138} height={43} marginTop={4} />
                          </div>
                          <label htmlFor="security-tx" className="hide" >보안문자</label>
                          <Input type="text" placeHolder="보안문자" id="security-tx" width={348} />
                        </div>
                      </div>
                    }
                  </fieldset>
                  <Button size="full" background="blue80" title="로그인" marginTop={20} />
                </form>

                <div className="other-login">
                  <Buttons marginTop={40}>
                    <BtnNaver />
                    <BtnKakao />
                    {/* <BtnApple /> */}
                  </Buttons>
                  <p className="tx-sub">
                    <span>SNS 로그인은 일반회원만 가능합니다.</span><br />
                    딜러회원이시면, 아이디와 비밀번호를 입력하여 로그인해주세요.
                  </p>
                </div>
              </TabCont>
              <TabCont tabTitle="비회원 로그인" id="tab7-2" index={1} onClick={handleMemberMode("nonmember")}>
                <div className="tx-bg"><p>비회원으로 이용하신 내역을<br />조회하실 수 있습니다.</p></div>
                <form className="login-form">
                  <fieldset>
                    <legend className="away">비회원 로그인</legend>
                    <ul className="vert-step">
                      <li>
                        <span className="step">1</span>
                        <div className="con">
                          <p className="tit">신청번호 입력</p>
                          <span>신청번호를 입력해주세요.</span>
                          <label htmlFor="apply-num" className="hide" >신청번호</label>
                          <Input type="text" placeHolder="신청번호" id="apply-num" width={308} />
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
              </TabCont>
            </TabMenu>
          </div>
          {
            memMode === "member" &&
            <>
              <ul className="find-info">
                <li><Link href=""><a>아이디찾기</a></Link></li>
                <li><Link href=""><a>비밀번호찾기</a></Link></li>
              </ul>
              <div className="member-etc-area">
                <p className="member-etc-msg">
                  아직 현대 오토벨 회원이 아니세요?<br />
                  <Link href="memberHome"><a className="btn">회원가입</a></Link>
                </p>
              </div>
            </>
          }

          {
            memMode === "nonmember" &&
            <Buttons align="center" marginTop={60} className="w-line">
              <Button size="big" background="blue80" title="조회" width={180} height={60} />
            </Buttons>
          }

        </div>
      </div>
    </AppLayout>
  )
}

export default Login;