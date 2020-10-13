
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
            <div className="certify-wrap bg-white">
              <span className="ico-wrap"><i className="ico-certify"></i></span>
              <p className="tit">휴대폰 본인인증 진행해 주세요.</p>                    
              <p className="tx-sub">
                입력하신 회원님의 개인 정보는<br />본인인증 이외의 목적으로 활용하지 않습니다.
              </p>
              <Buttons align="center" marginTop={20}>
                <Button size="mid" background="blue80" radius={true} title="휴대폰 본인인증" width={126} height={40} fontWeight={500} href="loginInfoIdConfirm" nextLink={true}  />
                <Button size="mid" line="gray" color="darkgray" radius={true} title="비밀번호찾기" width={126} height={40} fontWeight={500} href="loginInfoPassword" nextLink={true} />
              </Buttons>
            </div>                
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
            <h3>아이디/비밀번호 찾기</h3>
          </div>

          <div className="login-wrap">
            <TabMenu type="type7" callBack={tabClick} defaultTab={tabActive}>
              <TabCont tabTitle="아이디 찾기" id="tab7-1" index={0}>
                {
                  isIdCert === false
                    ? (
                      <div className="certify-wrap">
                        <p className="tit"><span>휴대폰 본인인증</span>을<br />진행해 주세요.</p>
                        <span className="ico-wrap"><i className="ico-certify"></i></span>
                        <p className="tx-sub">
                          입력하신 회원님의 개인 정보는<br /><span>본인인증 이외의 목적으로 활용하지 않습니다.</span>
                        </p>
                        <Button size="big" background="blue80" title="휴대폰 본인인증" width={160} marginTop={40} onClick={handleCert} />
                      </div>
                    ) : (
                      <>
                        <div className="tx-bg"><p>회원님의 정보와 일치하는 아이디입니다.</p></div>
                        <dl>
                          <dt>· 이름</dt>
                          <dd>김현대</dd>
                          <dt>· 아이디</dt>
                          <dd><em>[개인]</em> hyundai</dd>
                          <dd><em>[딜러]</em> deal_hyundai</dd>
                        </dl>
                      </>
                    )
                }
              </TabCont>
              <TabCont tabTitle="비밀번호 찾기" id="tab7-2" index={1}>
                {
                  isPwCert === false
                    ? (
                      <form className="login-form">
                        <fieldset>
                          <legend className="away">비밀번호 찾기</legend>
                          <ul className="vert-step">
                            <li>
                              <span className="step">1</span>
                              <div className="con">
                                <p className="tit">아이디/이름 입력</p>
                                <span>비밀번호를 찾고자 하는  아이디, 이름을 <br />입력해주세요.</span>
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
                    ) : (
                      <form className="login-form">
                        <fieldset>
                          <legend className="away">비밀번호 재설정</legend>
                          <div className="tx-bg">
                            <dl className="pw-wrap">
                              <dt>· 아이디</dt>
                              <dd><em>hyundai</em></dd>
                            </dl>
                          </div>
                          <p className="tx-tit">비밀번호를 재설정해주세요.</p>
                          <ul>
                            <li>
                              <label htmlFor="new-pw" className="hide" >새 비밀번호</label>
                              <Input type="password" placeHolder="새 비밀번호" id="new-pw" width={368} />
                            </li>
                            <li>
                              <label htmlFor="new-pw-chk" className="hide" >새 비밀번호 확인</label>
                              <Input type="password" placeHolder="새 비밀번호 확인" id="new-pw-chk" width={368} />
                            </li>
                          </ul>
                          <p className="tx-not">비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 입력해주세요.</p>
                        </fieldset>
                      </form>
                    )
                }
              </TabCont>
            </TabMenu>
          </div>

          {
            (
              (isIdCert === true || findMode === "password") // 아이디 인증 이후 이거나 비밀번호 찾기 모드일 경우
              && isPwCert === false // 패스워드 인증 이전
            ) && (
              <Buttons align="center" marginTop={60} className="w-line">
                {findMode === "password" && <Button size="big" line="black" color="black" title="비밀번호 찾기" width={180} height={60} onClick={handleCertPassword} />}
                <Button size="big" background="blue80" title="로그인" width={180} height={60} href="/member/login" />
              </Buttons>
            )}

          {
            isPwCert === true &&
            <>
              <div className="tx-wrap">
                <p className="tit">안내</p>
                <p className="con">
                  · 비밀번호는 영문, 숫자, 특수문자 혼합 8~15자 이내로 설정해주세요.<br />
                  · 아이디를 포함한 문자/숫자 비밀번호로 사용할 수 없습니다.<br />
                  · 연속된 문자/숫자 3자리, 동일한 문자/숫자 3자리 이상은 입력 불가  (ex. 123kbcha, aaa, 111 등)<br />
                  · 타 사이트에서 사용하지 않는 비밀번호로 설정하여 변경해주시기 바랍니다.
                </p>
              </div>
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="gray" title="다음에 변경하기" width={180} height={60} href="/main" />
                <Button size="big" background="blue80" title="변경하기" width={180} height={60} href="/main" />
              </Buttons>
              <p>* 비밀번호 변경 후, 새로운 비밀번호로 로그인해주세요.</p>
            </>
          }
        </div>
      </div>
    </AppLayout>
  )
}

export default LoginInfo;