const globalThis = require('globalthis')();
import { useState, useEffect, useContext, useRef } from 'react';
import moment from 'moment';
import qs from 'qs';
import produce from 'immer'

import CheckBox from '@lib/share/items/CheckBox'
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

import DealerCarSuggest from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarSuggest';
import DealerCarInfo from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarInfo';
import DealerCarTotalStatus from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarTotalStatus';
import DealerCarHistory from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarAccidentHistory';
import DealerCarDetailStatus from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarDetailStatus';
import DealerCarPhoto from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarPhoto';
import DealerCarSignature from '@src/components/mypage/dealer/DealerCarPerformance/DealerCarSignature';

import { SystemContext } from '@src/provider/SystemProvider'
import { selectSaleCarPerf, updateSaleCarPerf } from '@src/api/mypage/dealer/CarPerfInspApi'
import { createValidator } from '@lib/share/validator';
import perfInspSchema from '@lib/share/validator/mypage/dealer/perfInsp';
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'

const validator = createValidator({
  crPrsnNum : {
    type: 'string',
    label: '차량제시번호',
  },
  ...perfInspSchema
}, {
  required : [
    'crPrsnNum', 'perfInspId', 'vin', 'mortorFrm', 'frstRegDt',
    'inspStrtVldty', 'inspEndVldty', 'prsnDrvDist', 'ehstGas1',
    'ehstGas2', 'sttChckr', 'sttNtc', 'uniqChkrOpn'
  ]
});

const popModifyPerfInsp = ({eventHandler, onClose, prodItem }) =>{
  const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm, } = useContext(SystemContext)
  const [ isConfirm, setIsConfirm ] = useState(true);
  const [ isAllow, setIsAllow ] = useState(true);
  const [ crPrsnNum, setCrPrsnNum ] = useState();
  const [ perfInspRec, setPerfInspRec ] = useState({
    mainDevice : {},
    skinStt : {},
  });
  const { dlrPrdId, crId } = prodItem
  const prodRef = useRef(null)
  console.log("popModifyPerfInsp -> prodItem", prodItem)

  const sendData = async (e) => {
    if(!isAllow){
      showAlert('서명란에 중고자동차성능 상태 점검을 체크해주세요')
      return
    }
    if(!isConfirm){
      showAlert('매물등록 규정을 확인해주세요')
      return
    }

    const valid = validator.validate({
      crPrsnNum,
      ...perfInspRec,
    });
    const { error } = valid;
    console.log('TCL: goNextStep -> valid : ', valid);

    if (error) {
      const { messages, field, label} = error[0]
      let message =  `[${label}] ${messages[0]}`
      showAlert(message);
    } else {
      showConfirm('저장하시겠습니까?', async () => {
        showLoader()
        const { data : { data, statusinfo }  } = await updateSaleCarPerf({
          crPrsnNum,
          dlrPrdId,
          crId,
          perfInspRecVO:perfInspRec
        })
    
        if(statusinfo?.returncd == '000'){
          //이미지 업로드
          const formData = new FormData()
          console.log('prodRef : ', prodRef)
          const fileInputs = Array.from(prodRef.current.querySelectorAll('input[type=file]'))
          
          formData.append('dlrPrdId', dlrPrdId)
          formData.append('perfInspId', perfInspRec?.perfInspId)

          fileInputs
            .filter(input => !!input.files[0])
            .forEach(input => {
              const file = input.files[0]
              formData.append('files', file, input.dataset.columnName)
            })

          const orgFiles = formData.get('files')
          console.log("orgFiles : ", orgFiles)

          if(orgFiles){ 
            console.log('업로드')
            const result = await dealerProdApi.updatePerfInspRecPic(formData)
            console.log("goNextStep -> result", result)
          }

          console.log('저장완료')
          hideLoader();
          onClose && onClose()
        } else if(statusinfo?.returncd === 'MBR4005'){
          hideLoader();
          showLoginForm(Router.router.asPath, (data) => {
            console.log('loginCallback data ::::: ', data)
            if(data?.isLogin) {
              sendData()
            } else {
              showAlert('로그인에 실패했습니다. 관리자에게 문의 바랍니다')
            }
          })
        } else {
          hideLoader();
          showAlert("에러가 발생했습니다")
        }
      })

    }


  }

  const inputCrPrsnNum = (e) => {
    const {name, value} = e.target
    console.log('inputCrPrsnNum name : ', name);
    console.log('inputCrPrsnNum value : ', value);
    setCrPrsnNum(value)
  };

  const inputMainDevice = (e) => {
    const { name, value } = e.target

    setPerfInspRec(produce(perfInspRec, draft => {
      draft['mainDevice'][name] = parseInt(value)
    }))
  }

  const inputRecord = (e) => {
    const { name, value } = e.target;

    setPerfInspRec(produce(perfInspRec, draft => {
      draft[name] = value
    }))
  };

  const inputRecordValues = (items) => {
    setPerfInspRec(produce(perfInspRec, draft => {
      items?.forEach(item => {
        draft[item?.name] = items[item?.value]
      })
    }))
  }

  const inputSkin = (v, target, name) => {
    console.log("inputSkin -> v", v)
    console.log("inputSkin -> target", target)
    console.log("inputSkin -> name", name)
    const value = parseInt(v)

    const currentSkinStt = {
      ...perfInspRec?.skinStt,
      [name]: value,
    }

    const map = Object.keys(currentSkinStt).reduce((map,item)=>{
      const value = currentSkinStt[item]
      const type = stt[item]

      if(value == 3){
        map.set(type, (map.get(type) ?? 0)+1 ) 
      } else if(value == 2){
        if(type == 'frame'){
          map.set('accident', (map.get('accident') ?? 0)+1 ) 
        } else {
          map.set('repair', (map.get('repair') ?? 0)+1 ) 
        }
      } else if(value == 1){
        if(type == 'frame'){
          map.set('accident', (map.get('accident') ?? 0)+1 ) 
        } else {
          map.set('repair', (map.get('repair') ?? 0)+1 ) 
        }
      }
      return map
    }, new Map())

    console.log('map: ', map)
    setPerfInspRec(produce(perfInspRec, draft => {
      draft['skinStt'][name] = value
      draft['acdtHstYn'] = map.get('accident') ? 'Y' : 'N';
      draft['smplRprYn'] = map.get('repair') ? 'Y' : 'N';
      draft['partsOutPanelFRankYn'] = map.get('skinRank1') ? 'Y' : 'N';
      draft['partsOutPanelSRankYn'] = map.get('skinRank2') ? 'Y' : 'N';
      draft['partsMainSkltYn'] = map.get('frame') ? 'Y' : 'N';
    }))
  };

  const inputSignature = (e) => {
    const { name, checked, value } = e.target
    switch (name) {
      case 'isAllow':
        setIsAllow(checked);
        break;
      default :
        inputRecord(e)
        break;
    }
  };

  useEffect(() => {
    const {dlrPrdId} = prodItem
    showLoader()
    selectSaleCarPerf(dlrPrdId)
      .then(res => res?.data?.data ?? {})
      .then(data => {
        console.log('data : ', data)
        const {
          crPrsnNum,
          perfInspRecVO = {
            mainDevice : {},
            skinStt : {},
          }
        } = data
        console.log('perfInspRecVO : ', perfInspRecVO)

        setCrPrsnNum(crPrsnNum)

        // {
        //   ...perfInspRecVO,
        //   frstRegDt : moment(perfInspRecVO?.frstRegDt ?? new Date())
        // }
        setPerfInspRec(produce(perfInspRecVO, draft => {
          draft['frstRegDt'] = moment(perfInspRecVO?.frstRegDt ?? new Date())
        }))
      })
      .finally(()=>{
        hideLoader()
      })
  }, [ prodItem.dlrPrdId ])

  return (
    <div className="con-wrap popup-perform-record">

      <DealerCarSuggest
        crPrsnNum={crPrsnNum}
        perfInspId={perfInspRec?.perfInspId}
        onChangePrsNum={inputCrPrsnNum}
        onChange={inputRecord}
        isEditing={false}
      />

      <form className="register-form history-form" ref={prodRef}>
        <DealerCarInfo item={perfInspRec} onChange={inputRecord} isEditing={false} />
        <DealerCarTotalStatus item={perfInspRec} onChange={inputRecord} onChangeValues={inputRecordValues} />
        <DealerCarHistory historyData={perfInspRec?.skinStt} onChange={inputSkin} sttArray={
          [
            perfInspRec['acdtHstYn'] ?? 'N',
            perfInspRec['smplRprYn'] ?? 'N',
            perfInspRec['partsOutPanelFRankYn'] ?? 'N',
            perfInspRec['partsOutPanelSRankYn'] ?? 'N',
            perfInspRec['partsMainSkltYn'] ?? 'N',
          ]
        } />

        <DealerCarDetailStatus
          item={perfInspRec?.mainDevice}
          onChange={inputMainDevice}
        />

        <fieldset className="car-expert">
          <legend className="away">특기사항 및 점검자의 의견</legend>
          <table summary="특기사항 및 점검자의 의견에 대한 내용" className="table-tp1 input">
            <caption className="away">특기사항 및 점검자의 의견</caption>
            <colgroup>
              <col width="19%" />
              <col width="24%" />
              <col width="57%" />
            </colgroup>
            <tbody>
              <tr>
                <th>특기사항 및 점검자의 의견</th>
                <td>성능•상태 점검자</td>
                <td>
                  <Input
                    type="text"
                    id="expert-opinion"
                    onChange={inputRecord}
                    name="uniqChkrOpn"
                    value={perfInspRec?.uniqChkrOpn}
                    disalbed={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>
        <DealerCarPhoto
          frontImgUrl={perfInspRec?.insShotPhtUrl1}
          backImgUrl={perfInspRec?.insShotPhtUrl2}
        />
        <DealerCarSignature
          signData={perfInspRec}
          isAllow={isAllow}
          onChange={inputSignature}
          isEditing={false}  
        />

        <div className="agree-terms-wrap mt40">
          <CheckBox
            id='chk-agree'
            title='매물등록 규정 확인'
            checked={isConfirm}
            onChange={(e)=>{ setIsConfirm(e.target.checked)}}
          />
          <div className="terms-wrap">
            내용
          </div>
        </div>
      </form>

      <Buttons align="center" marginTop={48}>
        <Button size="big" background="gray" title="닫기" buttonMarkup={true} width={172} buttonMarkup={true} onClick={onClose} />
        <Button size="big" background="blue80" title="등록완료" buttonMarkup={true} width={172} buttonMarkup={true} onClick={sendData}/>
      </Buttons>
    </div>
  )
}

const stt = {
  'frtPnst' : 'frame',
  'crossMem' : 'frame',
  'insdPnstLeft' : 'frame',
  'insdPnstRight' : 'frame',
  'rearPnst' : 'frame',
  'trunkFloor' : 'frame',
  'frtSideMemLeft' : 'frame',
  'frtSideMemRight' : 'frame',
  'rearSideMemLeft' : 'frame',
  'rearSideMemRight' : 'frame',
  'frtWhlHouseLeft' : 'frame',
  'frtWhlHouseRight' : 'frame',
  'rearWhlHouseLeft' : 'frame',
  'rearWhlHouseRight' : 'frame',
  'pilrPnstFrtLeft' : 'frame',
  'pilrPnstFrtRight' : 'frame',
  'pilrPnstMedmLeft' : 'frame',
  'pilrPnstMedmRight' : 'frame',
  'pilrPnstRearLeft' : 'frame',
  'pilrPnstRearRight' : 'frame',
  'pckgTray' : 'frame',
  'frtDashPnst' : 'frame',
  'floorPnst' : 'frame',

  'hood' : 'skinRank1',
  'frontFenderLeft' : 'skinRank1',
  'frontFenderRight' : 'skinRank1',
  'frontDoorLeft' : 'skinRank1',
  'frontDoorRight' : 'skinRank1',
  'rearDoorLeft' : 'skinRank1',
  'rearDoorRight' : 'skinRank1',
  'trunklid' : 'skinRank1',
  'rdarSpt' : 'skinRank1',

  'roofPnst' : 'skinRank2',
  'qrtrPnstLeft' : 'skinRank2',
  'qrtrPnstRight' : 'skinRank2',
  'sideSealPnstLeft' : 'skinRank2',
  'sideSealPnstRight' : 'skinRank2',

}

export default popModifyPerfInsp