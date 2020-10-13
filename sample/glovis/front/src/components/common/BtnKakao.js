import { useSelector } from 'react-redux';
const BtnKakao = ({type=1, style, onClick}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-kakao tp${type}`} style={style} onClick={onClick}>카카오로 로그인</button>
    )
  }
  return(
    <button className={`btn-kakao tp${type}`} style={style} onClick={onClick}>로그인</button>
  )
}

export default BtnKakao