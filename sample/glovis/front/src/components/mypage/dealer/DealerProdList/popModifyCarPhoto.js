import { useEffect, useState, memo, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import produce from 'immer'

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import CarPictureApply from '@src/components/common/CarPictureApplyPc';
import AutobellAppDownload from '@src/components/sellcar/self/sub/AutobellAppDownload';

// import { mainPhotoList, subPhotoList } from '@src/dummy/sellcar/carPhotoOptions';
import { selectSaleCarPic, insertSaleCarPic } from '@src/api/mypage/dealer/dealerProdApi'
import { SystemContext } from '@src/provider/SystemProvider';
import { getShootingPartList } from '@src/actions/sellcar/sellCarAction';

const popModifyCarPhoto = ({changingEvent, onClose, prodItem}) =>{
  const dispatch = useDispatch();

  const formRef = useRef(null)
  const { crId, dlrPrdId } = prodItem
  console.log("popModifyCarPhoto -> prodItem", prodItem)
  const [ carPhotoList, setCarPhotoList ] = useState([])
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [displayAppDownPop, setDisplayAppDownPop, showAppDownPop, hideAppDownPop] = useRodal(false, true);
  const { mainPhotoList, subPhotoList } = useSelector((store) => store.sellCarStore);

  console.log("registerCarPhoto -> mainPhotoList", mainPhotoList)
  console.log("registerCarPhoto -> subPhotoList", subPhotoList)

  const sendData = (e) => {
    const formData = new FormData()
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file]'))
    
    formData.append('crId', crId)
    formData.append('dlrPrdId', dlrPrdId)
    formData.append('picType', 'carPic')

    fileInputs
      .filter(input => !!input.files[0])
      .forEach((input,i) => {
        console.log('i : ', i)
        const file = input.files[0]
        
        formData.append('files', file, input.dataset.sortNo)
      })

    const orgFiles = formData.get('files')

    if(orgFiles){
      changingEvent(formData, 'updateCarPhoto');
      onClose()
    } else {
      showAlert('업로드 한 이미지가 없습니다')
    }
  }

  useEffect(()=>{
    showLoader()

    Promise.all([
      selectSaleCarPic(crId).then(res => res?.data),
      dispatch(getShootingPartList('dealer')),
    ]).then(([res]) => {
      
      const { data, statusinfo } = res
      console.log("registerCarPhoto -> data", data)
      if(statusinfo?.returncd === '000'){
        setCarPhotoList(data)
      }

    }).finally(()=>{
      hideLoader()
    })
  },[])

  return (
    <>
      <div className="con-wrap">
        <form ref={formRef}>
          <div className="img-upload main mt0">
            <h4 className="mb33">대표 사진 등록</h4>
            <div className="app-down">
              <i className="ico-app-blue" />
              <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" onClick={(e) => showAppDownPop(e, 'fade')} />
            </div>
            <CarPictureApply options={mainPhotoList} items={carPhotoList} name="sortNo" />
          </div>
          <div className="img-upload detail">
            <h4 className="mb33">상세 사진 등록</h4>
            <p>옵션, 하자 부분이 잘 나오게 등록하시면 더 정확한 견적을 받으실 수 있습니다.</p>
            <CarPictureApply options={subPhotoList} items={carPhotoList} name="sortNo" />
          </div>

          <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" buttonMarkup={true} width={172} height={60} onClick={onClose}/>
              <Button size="big" background="blue80" title="수정" buttonMarkup={true} width={172} height={60} onClick={(e)=> sendData(e)}/>
          </Buttons>
        </form>
      </div>
      
      <RodalPopup show={displayAppDownPop} type={'fade'} closedHandler={hideAppDownPop} mode="normal" size="xs" className="today-banner sml">
        <AutobellAppDownload />
      </RodalPopup>
    </>
  )
}

export default memo(popModifyCarPhoto)