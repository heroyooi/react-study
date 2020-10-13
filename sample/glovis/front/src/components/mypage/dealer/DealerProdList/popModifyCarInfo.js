import React, { useState, useEffect, useContext, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import produce from 'immer'

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import CarBasicInfoEditor from '@src/components/sellcar/self/CarBasicInfoEditor.js';
import CarOptionsEditor from '@src/components/sellcar/self/CarOptionsEditor.js';
import CarAddOptionsEditor from '@src/components/sellcar/self/CarAddOptionsEditor.js';
import MypageSeizure from '@src/components/mypage/dealer/DealerProdOption/MypageSeizure';
import MypageAccident from '@src/components/mypage/dealer/DealerProdOption/MypageAccident';
import MypageCarMovie from '@src/components/mypage/dealer/DealerProdOption/MypageCarMovie';
import DealerProdOptionDetail from '@src/components/mypage/dealer/DealerProdOptionDetail';

import { SystemContext } from '@src/provider/SystemProvider'

import { createValidator } from '@lib/share/validator';
import carSchema from '@lib/share/validator/sellcar/Car';
import dealerProdSchema from '@lib/share/validator/mypage/dealer/dealerProd';

// import { inputPropAction } from '@src/actions/sellcar/sellCarAction'
// import { getDealerProdAction } from '@src/actions/mypage/dealer/dealerProdAction'
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'

const validator = createValidator({...carSchema, ...dealerProdSchema}, {
  required: [
    'crRlsPrc', 'dspl', 'drvDist', 'crNo', 'crUseDvcd', 'crClrCd',
    'crTypeCd', 'crMnfcCd', 'crMdlCd', 'crDtlMdlCd',
  ]
});

const popModifyCarInfo = ({ changingEvent, onClose, prodItem = {} }) => {
  const formRef = useRef()
  const { dlrPrdId } = prodItem
  const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm, } = useContext(SystemContext)
  const [ prod, setProd ] = useState({cmnt:{},car:{optionList:[]}});

  const sendData = async (e) => {
    console.log("sendData -> prod ", prod )

    const valid = validator.validate({
      ...prod?.car,
      ...prod?.cmnt,
    });
    const { error } = valid;
    console.log('valid : ', valid);

    const cntnList = ['kpnt', 'scrc', 'hst', 'opn', 'etc']
    const noCntnList = cntnList.filter(cntnText => {
      const { [cntnText+'Yn']:text, [cntnText+'Cntn']:cntn  } = prod?.cmnt
      return text === 'Y' && !cntn
    })

    if(noCntnList?.length){
      const msg = {
        kpnt : 'Key Point를 작성하세요',
        scrc : 'Wear & Tear를 작성하세요',
        hst : '이 차의 History를 작성하세요',
        opn : '진단소견을 작성하세요',
        etc : '기타내용을 작성하세요',
      }
      showAlert(msg[noCntnList[0]])
      return
    }
    
    if (error) {
      showAlert(`[${error?.[0]?.label}] ` + error?.[0]?.messages?.[0] || '에러가 발생했습니다');
    } else {
      showConfirm('저장하시겠습니까?', async () => {
        showLoader()

        const result = await uploadImagesAsync()
        console.log("goNextStep -> result", result)

        if(!result){
          hideLoader()
          showAlert('업로드에 실패했습니다')
          return
        }
        const { data, statusinfo } = await dealerProdApi.updateProdCarInfo(prod).then(res => res?.data)

        changingEvent()
        hideLoader()
        showAlert(data?.carUpdateMsg || '수정되었습니다.', () => {
          onClose && onClose(e)
        })
      })
    }
  };

  const uploadImagesAsync = async () => {
    const fileInputs = Array.from(formRef.current.querySelectorAll('input[type=file][name]')).filter(input => !!input.files[0])
    console.log('formRef fileInputs : ', fileInputs)
    return new Promise((resolve) => {
      if(fileInputs.length){
        const formData = new FormData() // 0010_소트번호 //kpntCntn scrcYn

        fileInputs.forEach((input) => {
          const { name } = input
          console.log("uploadImagesAsync -> name", name)

          if(input.files.length > 4){
            resolve(false)
            return
          }

          input.files.forEach((file,i) => {
            formData.append('files', file, `${name}_${i+1}%&${file.name}` )
          })
        })

        formData.append('dlrPrdId', dlrPrdId)
        formData.append('picType', 'carCmntPic')
        dealerProdApi.insertSaleCarPic(formData)
          .then(res => res?.data)
          .then(({data, statusinfo}) => {
            resolve(statusinfo?.returncd === '000')
          })
          .catch(() => {
            resolve(false)
          })
      } else {
        resolve(true)
      }
    })
  }

  const selectCar = (items, price) => {
    console.log('selectCar items : ', items)
    console.log("selectCar -> price", price)
    setProd(produce(prod, draft => {
      let crNm = ''
      items.forEach((item)=>{
        const { column, code, text } = item
        draft['car'][column] = code
        draft['car'][`${column}Nm`] = text
        if(item?.column !== 'crMdlCd' && text){
          crNm+=`${text} `
        }
      })
      draft['car']['crNm'] = crNm
    }))
  };

  const inputCarProp = (e) => {
    const { name, value } = e.target;
    
    setProd(produce(prod, draft => {
      draft['car'][name] = value
    }))
  };

  const checkOption = (e, item) => {
    const { car : { optionList }} = prod
    const isExist = optionList.find(option => option.optCd == item.optCd)

    if(isExist){
      setProd(produce(prod, draft => {
        draft['car']['optionList'] = optionList.filter(option => option.optCd != item.optCd)
      }))
    } else {
      setProd(produce(prod, draft => {
        draft['car']['optionList'].push(item)
      }))
    }
  };

  const onChangeProd = (e) => {
    const { name, value } = e.target

    setProd(produce(prod, draft => {
      draft[name] = value
    }))
  }

  const onCheckProdCmnt = (e) => {
    const { name, value, checked } = e.target

    setProd(produce(prod, draft => {
      draft['cmnt'][name] = checked ? 'Y' : 'N'
    }))
  }

  const onChangeCmntValues= (item) => {
    setProd(produce(prod, draft => {
      Object.keys(item).forEach(name => {
        draft['cmnt'][name] = item[name]
      })
    }))
  }

  useEffect(()=>{
    console.log('data 가져오기 prodItem : ', prodItem)
    if(dlrPrdId){
      showLoader()

      dealerProdApi.selectSaleProdItem(dlrPrdId)
        .then(res => res?.data?.data)
        .then(res => {
          console.log('selectSaleProdItem res : ', res)
          if(res) setProd(res)
        })
        .finally(() => {
          hideLoader()
        })
    }
    // console.log('dlrPrdId : ', dlrPrdId) //CR20022000009
  }, [])

  return (
    <div className="con-wrap popup-info-modify">
      <form className="register-form" ref={formRef}>
        <legend className="away">차량 기본 정보</legend>
        <h4 className="mb33">차량 기본 정보</h4>
        
        <CarBasicInfoEditor className="input" item={prod?.car} isEditing={true} onInput={inputCarProp} onSelectCar={selectCar} />
        <CarOptionsEditor items={prod?.car?.optionList} isEditing={true} onCheck={checkOption} addOptions={prod?.car?.optionList} />
        <CarAddOptionsEditor items={prod?.car?.optionList} item={prod?.car} isEditing={true} onCheck={checkOption} onInput={inputCarProp} />

        {/* 압류/저당 입력 */}
        <MypageSeizure value={prod?.szrMorCnt} onChange={onChangeProd} />

        {/* 사고이력정보 */}
        <MypageAccident item={prod} onChange={onChangeProd} />

        {/* 동영상 */}
        <MypageCarMovie value={prod?.crMvUrl} onChange={onChangeProd} />

        {/* 나의설명글 */}
        <DealerProdOptionDetail onCheck={onCheckProdCmnt} onChangeValues={onChangeCmntValues} item={prod?.cmnt} />
        
      </form>

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="gray" title="취소" buttonMarkup={true} width={172} onClick={onClose}/>
        <Button size="big" background="blue80" title="수정" buttonMarkup={true} width={172} onClick={sendData} />
      </Buttons>
    </div>
  );
};

export default popModifyCarInfo;
