import { useSelector } from 'react-redux';
const BtnApple = ({type=1, style, onClick}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-apple tp${type}`} style={style} onClick={onClick}>Apple로 로그인</button>
    )
  }
  return (
    <button className={`btn-apple tp${type}`} style={style} onClick={onClick}>로그인</button>
  )
}

export default BtnApple