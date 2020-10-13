import { useSelector } from 'react-redux';
const BtnNaver = ({type=1, style, onClick}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-naver tp${type}`} style={style} onClick={onClick}>네이버로 로그인</button>
    )
  }
  return(
    <button className={`btn-naver tp${type}`} style={style} onClick={onClick}>로그인</button>
  )
}

export default BtnNaver