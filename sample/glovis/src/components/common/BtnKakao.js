import { useSelector } from 'react-redux';
const BtnKakao = ({type=1, style}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-kakao tp${type}`} style={style}>로그인</button>
    )
  }
  return(
    <button className={`btn-kakao tp${type}`} style={style}>KAKAO</button>
  )
}

export default BtnKakao