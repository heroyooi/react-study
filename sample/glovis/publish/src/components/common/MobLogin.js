import { memo } from 'react';
import Link from 'next/link';
import BtnNaver from '@src/components/common/BtnNaver';
import BtnKakao from '@src/components/common/BtnKakao';
import BtnApple from '@src/components/common/BtnApple';
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const MobLogin = memo(({errorPw=false, noMemArea=true, snsLogin=true, callback}) => {
  const FindInfo = () => {
    return (
      <ul className="find-info">
        <li><Link href="/member/loginInfo"><a>아이디찾기</a></Link></li>
        <li><Link href="/member/loginInfoPassword"><a>비밀번호찾기</a></Link></li>
        <li><Link href="/member/memberHome"><a className="btn">회원가입</a></Link></li>
      </ul>
    )
  }
  const handleLoginClick = (e) => {
    if (callback) callback(e);
  }
  return (
    <>
      <form className="login-form">
        <fieldset>
          <legend className="away">로그인</legend>
          <div className="ta-center">
            <span className="logo"><img src="/images/mobile/common/autobell-logo-tit.svg" alt="로고" /></span>
          </div>                    
          <ul>
            <li>
              <label htmlFor="m-user-id" className="hide" >아이디</label>
              <Input type="text" placeHolder="아이디를 입력하세요." id="m-user-id" />
            </li>
            <li>
              <label htmlFor="m-user-pw" className="hide" >비밀번호</label>
              <Input type="password" placeHolder="비밀번호 입력하세요." id="m-user-pw" />
            </li>
            {errorPw === true && <li><CheckBox id="chk-basic-sml" title="아이디 저장" size="small" /></li>}
          </ul>
          {
            errorPw === true &&
            <div className="captcha-wrap">
              <p className="tx-not">5회 이상 비밀번호를 잘못 입력하셨습니다.<br />정보보호를 위해 자동입력 방지문자를 함께 입력 후 로그인해주세요.</p>
              <div className="captcha-box">
                <div className="img-wrap"><img src="/images/dummy/captcha-img.png" alt="자동입력 방지문자 이미지" /></div>
                <div className="btn-wrap">
                  <Button size="mid" background="blue20" color="blue80" radius={true} title="새로고침" width={84} height={40} fontWeight={500} />
                  <Button size="mid" background="blue20" color="blue80" title="음성듣기" width={84} height={40} marginTop={8} fontWeight={500} />
                </div>
                <label htmlFor="m-security-tx" className="hide" >보안문자</label>
                <Input type="text" placeHolder="보안문자" id="m-security-tx" />
              </div>
            </div>
          }
        </fieldset>
        <Button size="full" background="blue80" radius={true} title="로그인" marginTop={16} onClick={handleLoginClick} />
      </form>
      {snsLogin && (
        <>
          <div className="other-login">
            <Buttons marginTop={20}>
              <BtnNaver />
              <BtnKakao />
              <BtnApple />
            </Buttons>
            <p className="tx-sub">
              <span>* SNS 로그인은 일반회원만 가능합니다.</span><br />
              * 딜러회원이시면, 아이디와 비밀번호를 입력하여 로그인해주세요.
            </p>
          </div>
          
        </>
      )}
      {noMemArea && (
        <>
          <Button size="full" background="blue20" color="blue80" radius={true} title="비회원으로 신청하기" marginTop={16} fontSize={14}/>
          <p className="tx-sub v-2">비회원으로 신청하실 때  반드시 휴대폰인증을 하셔야 합니다.</p>
        </>
      )}
      <FindInfo />
    </>
  )
});

export default MobLogin;