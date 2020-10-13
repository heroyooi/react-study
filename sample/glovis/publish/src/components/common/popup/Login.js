import Link from 'next/link';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';

const LoginPopup = () => {
  return (
    <div className="con-wrap popup-login">
      <form className="login-form">
        <fieldset>
          <div className="input-wrap">
            <legend className="away">로그인</legend>
            <label htmlFor="id" className="hide">아이디</label>
            <Input type="text" placeHolder="아이디" value="" id="id" width={252} />
            <label htmlFor="pw" className="hide">비밀번호</label>
            <Input type="text" placeHolder="비밀번호" value="" id="pw" width={252} />
          </div>
          <Button size="big" background="blue80" title="로그인" width={106} height={106} />
        </fieldset>
      </form>
      <ul className="find-info">
        <li><Link href="/member/memberHome"><a>회원가입</a></Link></li>
        <li><Link href=""><a>아이디찾기</a></Link></li>
        <li><Link href=""><a>비밀번호찾기</a></Link></li>
      </ul>
      <Button size="full" line="black" title="비회원으로 신청하기" height={60} marginBottom={20} />
      <p>비회원으로 신청하실 때 반드시 휴대폰인증을 하셔야 합니다.</p>
    </div>
  )
}

export default LoginPopup;