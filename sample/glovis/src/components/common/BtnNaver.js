import { useSelector } from 'react-redux';
const BtnNaver = ({type=1, style}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-naver tp${type}`} style={style}>로그인</button>
    )
  }
  return(
    <button className={`btn-naver tp${type}`} style={style}>NAVER</button>
  )
}

export default BtnNaver