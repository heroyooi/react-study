import PopPop from 'react-poppop'

const ModalPopup = ({show, title, str, closeHandler}) => {
  const toggleShow = (flag) => {
    closeHandler(flag)
  }
  return (
    <PopPop position="rightCenter" open={show} closeBtn={true} closeOnEsc={true} onClose={()=>toggleShow(false)} closeOnOveray={true}>
      <div>
        <div className="">
          <h1>{title}</h1>
        </div>
        <div className="">
          <p>{str}</p>
        </div>
      </div>
    </PopPop>
  )
}

export default ModalPopup