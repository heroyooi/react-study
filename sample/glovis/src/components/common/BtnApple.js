import { useSelector } from 'react-redux';
const BtnApple = ({type=1, style}) =>{
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if(hasMobile){
    return(
      <button className={`btn-apple tp${type}`} style={style}>로그인</button>
    )
  }
}

export default BtnApple