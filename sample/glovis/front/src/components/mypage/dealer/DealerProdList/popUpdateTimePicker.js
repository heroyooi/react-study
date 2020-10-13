import {useState, useEffect, useContext, } from 'react'
import {produce} from 'immer'

import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars'
import Radio from '@lib/share/items/Radio'
import CheckBox from '@lib/share/items/CheckBox';
import IniPayButton from '@lib/share/inipay/IniPayButton'

import PointSelector from '@src/components/common/couponSelector/PointSelector';
import CouponSelector from '@src/components/common/couponSelector/CouponSelector'
import EvidenceSelector from '@src/components/common/couponSelector/EvidenceSelector';
import Marker from '@src/components/common/timePicker/Marker'
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary'

import { getCommonCodeAsync } from '@src/utils/DataUtils'
import { setComma } from '@src/utils/StringUtil';
import { imgUrl, frontUrl } from '@src/utils/HttpUtils';

import {
  selectMyUpdateTicketList,
  selectUpdateBoxList,
  insertUpdateBox,
  updateMyUpdateTicketLocker,
  deleteMyUpdateTicketLocker,
  insertUpdatePassTime,
} from '@src/api/mypage/dealer/dealerTicketApi';
import { selectAdverProductList, selectMyAdProdList } from '@src/api/mypage/dealer/dealerAdverApi';

import { SystemContext } from '@src/provider/SystemProvider'
import {
  commonPaymentMethodList,
} from '@src/constant/payment';


const hourPos = ['00','0.5','01','1.5','02','2.5','03','3.5','04','4.5','05','5.5','06','6.5','07','7.5','08','8.5','09','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','15.5','16','16.5','17','17.5','18','18.5','19','19.5','20','20.5','21','21.5','22','22.5','23','23.5','24']; 
const wrapperWidth = 1029;
const markerWidth = 21;
const ratioX = (parseInt(wrapperWidth)-markerWidth)/1439

const popUpdateTimePicker = ({changingEvent, onClose, prodItem={}, memberInfo= {}}) => {
  console.log("popUpdateTimePicker -> prodItem ", prodItem)
  console.log("popUpdateTimePicker -> memberInfo ", memberInfo)
  const [ fuelTypes, setFuelTypes ] = useState([]);
  const [ carMssList, setCarMssList ] = useState([]);
  const { phtUrl = '' } = prodItem?.car?.photoList?.[0] ?? {};

  const { showAlert, showConfirm, Confirm, showLoader, hideLoader, initAlert, initConfirm } = useContext(SystemContext);
  const [ myUpdateTicketList, setMyUpdateTicketList ] = useState([])
  const [ myUpdateTicketLockerList, setMyUpdateTicketLockerList ] = useState([])
  const [ activeMarker, setActiveMarker ] = useState()
  const [ selectedLocker, setSelectedLocker ] = useState()
  const [ newLockerName, setNewLockerName ] = useState('')
  const [ isFreeUser, setIsFreeUser ] = useState(true)

  const [ advProdList, setAdvProdList ] = useState([])
  const [ selectedAdv, selectAdv ] = useState(null)
  const [ selectedCoupon, selectCoupon ] = useState(null)
  const [ selectedPayment, selectPayment ] = useState({id:'Card'})
  const [ usingPoint, setUsingPoint ] = useState(0);
  const [selectedEvidence, setSelectedEvidence] = useState();

  const [ displayUpdateLockerPop, setDisplayUpdateLockerPop, showUpdateLockerPop, hideUpdateLockerPop] = useRodal(false);
  const [ displayModifyLockerPop, setDisplayModifyLockerPop, showModifyLockerPop, hideModifyLockerPop] = useRodal(false);
  const [ displayPurchaseTicketPop, setDisplayPurchaseTicketPop, showPurchaseTicketPop, hidePurchaseTicketPop] = useRodal(false);

  const checkEvidence = (e,item) => {
    setSelectedEvidence(item)
  }

  const changeOneTicketInList = (e, markerNum, newItem) => {
    setMyUpdateTicketList(produce(myUpdateTicketList, draft => {
      draft[markerNum] = newItem
    }))
    setActiveMarker(markerNum)
  }

  const inputPoint = (point) => {
    setUsingPoint(point ?? 0);
    console.log('point : ', point);
  };


  const saveUpdateTime = (e) =>{
    showConfirm('저장하시겠습니까?', async () => {
      showLoader()
      const { dlrPrdId } = prodItem
      const params = myUpdateTicketList?.map(ticket => {
        const { time } = ticket
        return {
          dlrPrdId,
          updatePassType:'custom',
          updHm:parseMinToToTime(time).split(':').join('')
        }
      })
      console.log('myUpdateTicketList params : ', params)
      const { data, statusinfo } = await insertUpdatePassTime(params).then(res => res.data)
      hideLoader()

      console.log("saveUpdateTime -> data", data)
      console.log("saveUpdateTime -> statusinfo", statusinfo)
      
      if(statusinfo?.returncd === '000'){
        onClose()
        showAlert('저장되었습니다')
      } else {
        showAlert('실패했습니다')
      }

      // changingEvent && changingEvent(myUpdateTicketList)
    })
  }

  const showUpdateLocker = async (e) => {
    const { data, statusinfo : { returncd }} = await selectUpdateBoxList().then(res => res?.data)
    if(returncd === 'MBR4005'){
      showAlert('로그인이 필요합니다')
    } else if(returncd === '000'){
      console.log("showUpdateLocker -> data", data)
      setMyUpdateTicketLockerList(
        Object.keys(data).map((key) => {
          const timeInfo = data[key]
          const firstItem = timeInfo[0]
          return {
            id : firstItem?.boxId,
            boxNm : firstItem?.boxNm,
            list : timeInfo
          }
        })
      )
    }
    showUpdateLockerPop(true)
  }

  const inputLockerName = (e) => {
    const { value } = e.target
    setNewLockerName(value)
  }

  const saveLocker = () => {
    if(!newLockerName){
      showAlert('보관명을 입력하세요')
      return
    }
    showConfirm('저장하시겠습니까?', saveLockerMod)
  }

  const saveLockerMod = async (e) => {
    console.log("saveLockerMod : ", e)
    console.log("saveLockerMod selectedLocker : ", selectedLocker)
    console.log("saveLockerMod newLockerName : ", newLockerName)
    console.log("saveLockerMod myUpdateTicketList : ", myUpdateTicketList)
    console.log("saveLockerMod myUpdateTicketLockerList : ", myUpdateTicketLockerList)
    // // console.log("saveLockerMod boxNm : ", boxNm)

    const newUpdateMyUpdateTicketLocker = myUpdateTicketList?.map((item) => ({
      updHhId : item.updHhId,
      boxNm : newLockerName,
      updHm : parseMinToToTime(item.time) ?? item.updHm
    }))
    console.log("saveLockerMod -> newUpdateMyUpdateTicketLocker", newUpdateMyUpdateTicketLocker)
    
    if(selectedLocker){
      await updateMyUpdateTicketLocker({
        boxId : selectedLocker.id,
        boxNm : newLockerName,
      }).then(res => res?.data?.data).then(res => {
        console.log('saveLockerMod res : ', res)
        setMyUpdateTicketLockerList(produce(myUpdateTicketLockerList, draft => {
          const target = draft.find((item) => item.id == selectedLocker.id)
          target['boxNm'] = newLockerName;
          target['list'].forEach(item => item['boxNm'] = newLockerName)
        }))
        
      })
    } else {
      await insertUpdateBox(newUpdateMyUpdateTicketLocker).then(res => res?.data?.data).then(res => {
        console.log('saveLockerMod res : ', res)
      })
    }

    hideModifyLockerPop(false)
    setSelectedLocker(null)
    setNewLockerName('')
  }

  const applyUpdateTimeLocker = (e) => {
    console.log('applyUpdateTimeLocker selectedLocker : ', selectedLocker)

    if(selectedLocker){
      const { list } = selectedLocker

      setMyUpdateTicketList(myUpdateTicketList?.map((item,i) => ({
        ...item,
        time: parseTimeToMin(list[i].updHm) ?? item.updHm
      })))
      hideUpdateLockerPop(false)
      setSelectedLocker(null)
    } else {
      showAlert('보관함을 선택하세요')
    }
  }

  const parseTimeToMin = (HHmm) => {
    if(HHmm){
      const parsedTime = HHmm.split(':')
      console.log("parseTimeToMin -> parsedTime", parsedTime)
      return parseInt(parsedTime[0]) * 60 + parseInt(parsedTime[1])
    }
  }

  const parseMinToToTime = (min) => {
    if(min >= 0){
      const HH =  `${Math.floor(min/60)}`.padStart(2, '0')
      const mm =  `${min%60}`.padStart(2,'0')

      return `${HH}:${mm}:00`
    }
  }

  const openModifyPop = (e) => {
    console.log('openModifyPop : ', selectedLocker)
    if(selectedLocker){
      setNewLockerName(selectedLocker.label)
      showModifyLockerPop(true)
    } else {
      showAlert('보관함을 선택하세요')
    }
  }

  const checkAdvProd = (e, item) => {
    console.log('checkAdvProd item : ', item)
    selectAdv(item)
  }

  const checkPayment = (e) => {
    const { checked, value } = e.target

    if(checked){
      const checkedItem = commonPaymentMethodList.find(tempPaymentMethod => tempPaymentMethod.id == value)
      selectPayment(commonPaymentMethodList.find(tempPaymentMethod => tempPaymentMethod.id == value))

      if(checkedItem?.id !== 'VBank') {
        setSelectedEvidence(null)
      }
    }
  }
  
  const applyAutoSetting = () => {
    console.log('hhhh prodItem : ', prodItem)

    const message = isFreeUser ?
      `<p>이 차량의 등록 시의 분/초를 기준으로<br/>8시/12시/16시/20시에 자동 업데이트 됩니다.<br/>적용하시겠습니까?</p>`
    :
      `<p>이 차량 등록 시의 분/초를 기준으로<br/매 시에 자동 업데이트 됩니다.<br/>적용하시겠습니까?</p>` 

    showConfirm(message, ()=>{
      console.log('popUpdateTimePicker_autoUpdate')
      let fixedTimes = []

      if(isFreeUser){//08 12 16 20
        fixedTimes = [480, 720, 960, 1200]
      } else {
        for(let i=0,len=24; i<len; i++){
          fixedTimes.push(i*60) 
        }
      }
      setMyUpdateTicketList(myUpdateTicketList?.map((item,i) => ({
        ...item,
        time: fixedTimes[i]
      })))
    })
  }

  const removeMyUpdateTicketLocker = async () => {
    console.log('selectedLocker : ', selectedLocker)
    console.log('myUpdateTicketLockerList : ', myUpdateTicketLockerList)
    if(!selectedLocker){
      showAlert('선택된 보관함이 없습니다')
      return
    }

    showConfirm('정말 삭제하시겠습니까?', async () => {
      showLoader()
      await deleteMyUpdateTicketLocker({boxId:selectedLocker.id}).then(res => res?.data?.data).then(res => {
        hideLoader()
        console.log('deleteMyUpdateTicketLocker res : ', res)
        if(res){
          setMyUpdateTicketLockerList(myUpdateTicketLockerList.filter(myUpdateTicketLocker => myUpdateTicketLocker.id !== selectedLocker.id)?.map(myUpdateTicketLocker => ({...myUpdateTicketLocker})))
          hideModifyLockerPop(false)
          setSelectedLocker(null)
        }
      })
      showAlert('삭제되었습니다')
    })
  }
  
  const getTicketPriceAndShowPop = async () => {
    console.log("getTicketPriceAndShowPop -> getTicketPriceAndShowPop")
    const [ perCarUpdate = {}, updatefreepass  = [] ] = await Promise.all([
      selectAdverProductList().then(res => res?.data?.perCarUpdate),
      selectMyAdProdList().then(res => res?.data?.updatefreepass),
    ])
    console.log("getTicketPriceAndShowPop -> perCarUpdate", perCarUpdate)
    console.log("getTicketPriceAndShowPop -> updatefreepass", updatefreepass)

    setAdvProdList([
      ...perCarUpdate,
      ...updatefreepass,
      // ...perCarUpdate.map(item => ({prdSgrpCd : '07'})), //테스트용
    ])
    showPurchaseTicketPop()
  }

  const beforeRequest = () => {
    return new Promise((resolve, reject) => {
      if(!selectedAdv){
        showAlert('상품을 선택하세요')
        reject()
      } else if(!selectedPayment){
        showAlert('결제방법을 선택하세요')
        reject()
      } else {
        resolve()
      }
    })
  }

  const handleFreeUpdatePayment = async e => {
    console.log("handleFreeUpdatePayment e", e)
    showConfirm('업데이트 자유이용권을 이용해 등록하시겠습니까?', async () => {
      let alertMsg = '처리되었습니다'
      
      showAlert(alertMsg, () => {
        hideUpdateLockerPop(false)
        hideModifyLockerPop(false)
        hidePurchaseTicketPop(false)
        getUpdateTicketList()
      })
    })
    
  }

  const inicisCallback = (message) => {
    console.log("inicisCallback -> message", message)
    const {
      merchantData,
      statusinfo,
      vbankinfo,
    } = message?.data;
    const allMessage = {
      ...merchantData,
      ...statusinfo,
      ...vbankinfo,
    }

    console.log('페이지 이동 전 1 : ', dlrPrdId)
    globalThis?.window?.INIStdPay?.viewOff();
    console.log('페이지 이동 전 2 : ', dlrPrdId)

    const {
      dlrPrdId, buyerTel, buyerName, resultMsg, custEmail, CARD_PurchaseName ,
      totprice,
      vactBankName,
      vactDate,
      vactName,
      vactNum,
      vactTime,
    } = allMessage

    let alertMsg = ``
    if(vactBankName){
      alertMsg = `
        <div>
          <p className="tit">입금대기중입니다.</p>
          <p className="exp">입금내역은 마이페이지에서 확인이 가능합니다.</p>

          <div style="width:360px; margin:50px auto;">
            <table className="table-tp1 mt24" summary="결제내역에 대한 내용">
              <caption style="position:absolute; clip:rect(0,0,0,0);">결제내역</caption>
              <colgroup>
                <col width="35%" />
                <col width="65%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>은행</th>
                  <td>${vactBankName}</td>
                </tr>
                <tr>
                  <th>계좌번호</th>
                  <td>${vactNum}</td>
                </tr>
                <tr>
                  <th>결제금액</th>
                  <td>${setComma(totprice)}원</td>
                </tr>
                <tr>
                  <th>입금기한</th>
                  <td>
                    ${vactDate.substring(0,4)}년 ${vactDate.substring(4,6)}월 ${vactDate.substring(6,8)}일 ${vactTime.substring(0,2)}시 ${vactTime.substring(2,4)}분까지
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    } else {
      alertMsg = '결제가 완료되었습니다.'
    }
    
    showAlert(alertMsg, () => {
      hideUpdateLockerPop(false)
      hideModifyLockerPop(false)
      hidePurchaseTicketPop(false)
    })
  };

  const getUpdateTicketList = () => {
    console.log("changeOneTicketInList -> prodItem", prodItem)
    selectMyUpdateTicketList(prodItem.dlrPrdId)
      .then(res => res?.data?.data)
      .then(list => {
        console.log("popUpdateTimePicker -> list", list)
        setMyUpdateTicketList(list?.map(item => ({
          ...item,
          time: parseTimeToMin(item.updHm)
        })))
      })
  }

  useEffect(()=>{
    //업데이트 이용권이 있는가 없는가
    setIsFreeUser(!prodItem?.dlrPrdAdLstList?.find(prd => (prd.prdMgrpDvcd == '32') || prd.prdMgrpDvcd == '33'))
  }, [ prodItem.dlrPrdAdLstList ])

  useEffect(()=>{
    console.log("changeOneTicketInList -> prodItem", prodItem)
    getUpdateTicketList()
    getCommonCodeAsync('FM047').then(setCarMssList);
    getCommonCodeAsync('FM048').then(setFuelTypes);

    globalThis?.window.addEventListener('message', inicisCallback);

    return () => {
      initAlert()
      initConfirm()
      globalThis?.window.removeEventListener('message', inicisCallback);
    }
  },[])

  return (
    <>
      <div className="con-wrap time-update">
        <div className="time-picker-wrap">
          <Buttons align="right" marginTop={0}  marginBottom={15}>
            <Button size="mid" line="gray" radius={true} title="자동세팅 적용" width={109} buttonMarkup={true}
              onClick={applyAutoSetting}
            />
            <Button size="mid" line="gray" radius={true} title="업데이트 시간 보관함" buttonMarkup={true} width={148} onClick={(e) => showUpdateLocker()} />
          </Buttons>
          <div className="time-picker-area">
            <div className="time-picker" style={{width:`${wrapperWidth}px`}}>
              <div className="t-track">
                <div className="t-track-fake"></div>
                {
                  myUpdateTicketList?.map((updateTicket, i) => 
                    <Marker
                      key={i}
                      ratioX={ratioX}
                      item={updateTicket}
                      markerNum={i}
                      onChange={changeOneTicketInList}
                      lastMod={activeMarker===i}
                    />
                  )
                }
              </div>
              {
                hourPos?.map((item, i) =>
                  <span key={i} className={i%2 === 0?"t-hour":"t-hour empty"} style={{left:ratioX*60*parseFloat(item)+3}}>{i%2 === 0?item:''}</span>
                )
              }
            </div>
            <p className="time-picker-msg">최초 등록 시간 : <strong>08</strong>시 <strong>30</strong>분 <strong>25</strong>초</p>
            <p className="time-picker-msg">업데이트 회수 : <strong>{myUpdateTicketList?.length ?? 0}</strong>회</p>
            <Buttons align="right" marginTop={-20}>
              <Button
                size="mid"
                line="blue80"
                color="blue80"
                radius={true}
                title="보관함에 저장"
                width={109}
                buttonMarkup={true}
                onClick={showModifyLockerPop} />
              <Button
                size="mid"
                background="blue80"
                radius={true}
                title="추가업데이트 구매"
                width={148}
                buttonMarkup={true}
                onClick={getTicketPriceAndShowPop}
              />
            </Buttons>
          </div>

          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={() => onClose && onClose(false)} />
            <Button size="big" background="blue80" title="확인" width={172} height={60} buttonMarkup={true} onClick={saveUpdateTime}  />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={displayUpdateLockerPop} type={'fade'} closedHandler={hideUpdateLockerPop} title="업데이트 시간 보관함" mode="normal" size='medium' subPop={true}>
        <div className="con-wrap save-box-pop">
          <Buttons align="right" marginTop={0}>
            <Button size="big" line="blue80" color="blue80" radius={true} title="보관명 변경" width={116} height={48} buttonMarkup={true} onClick={openModifyPop} /> 
          </Buttons>
          <div className="save-box">
          <ColoredScrollbars autoHeightMax={320}>
            <ul>
              {
                myUpdateTicketLockerList?.map((myUpdateTicketLocker,i) =>
                  <li key={i}>
                    <Radio
                      id={`chk-box-item-${i}`}
                      value={myUpdateTicketLocker?.id}
                      checked={selectedLocker?.id}
                      onChange={(e) => setSelectedLocker(myUpdateTicketLocker)}
                      title={myUpdateTicketLocker.boxNm}
                    />
                    <div className="box-item">
                      {myUpdateTicketLocker?.list?.map((times, j) =>
                        <span key={j} className="time-info">{times?.updHm?.substring(0,5)}</span>
                      )}
                    </div>
                  </li>
                )
              }
            </ul>
            </ColoredScrollbars>
          </div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="선택 삭제" width={130} height={48} buttonMarkup={true} onClick={removeMyUpdateTicketLocker} />
            <Button size="big" background="blue80" title="선택 적용" width={130} height={48} buttonMarkup={true} onClick={applyUpdateTimeLocker}/>
          </Buttons>
        </div>
      </RodalPopup>   

      <RodalPopup show={displayModifyLockerPop} type={'fade'} closedHandler={hideModifyLockerPop} title="업데이트 보관함" mode="normal" size="small" subPop={true}>
        <div className="con-wrap">
          <p className="save-box-txt">
            {selectedLocker ? "보관명을 변경하세요." : "보관명을 저장하세요" }
          </p>
          <div>
            <Input type="text" placeHolder="" height={48} value={newLockerName} maxLength="11" onChange={inputLockerName}/>
          </div>
          <div className="input-limit">{newLockerName?.length || 0}/12</div>
          <Buttons align="center" marginTop={48}>
            <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={(e) => hideModifyLockerPop(false)} />
            <Button size="big" background="blue80" title={selectedLocker ? "수정" : "추가"} width={172} height={60} buttonMarkup={true} onClick={saveLocker} />
          </Buttons>
        </div>
      </RodalPopup>   

      <RodalPopup show={displayPurchaseTicketPop} type={'fade'} closedHandler={hidePurchaseTicketPop} size="medium" title="이용권 결제" subPop={true}>
        <div className="con-wrap popup-mypage-payment">
          <ColoredScrollbars autoHeightMax={550}>
            <div className="admin-list tp2">
              <div className="content-top">
                <div className="img-cover">
                  <img src={phtUrl ? imgUrl + phtUrl : frontUrl + '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                </div>
                <ProdCarSummary
                  item={prodItem?.car}
                  slAmt={prodItem?.slAmt}
                  mss={carMssList.find((carMss) => carMss.value == prodItem?.car?.mssDvcd)?.label}
                  fuel={fuelTypes.find((carFuel) => carFuel.value == prodItem?.car?.fuelDvcd)?.label}
                />
              </div>
            </div>

            <div className="usage-wrap" style={{marginTop: "35px"}}>
              <p className="tag-tp5">업데이트 상품</p>
              <div className="radio-group tx-list">
                <ul className="vertical">
                  {
                    advProdList.map((advProd,i) =>
                      <li key={i}>
                        <Radio
                          key={i}
                          id={`adv-prod-${advProd?.prdDvcd}`}
                          title={advProd?.prdNm}
                          checked={selectedAdv?.prdDvcd}
                          value={advProd?.prdDvcd}
                          name="advProd"
                          onChange={e => checkAdvProd(e, advProd)}
                        >
                          {/* {advProd?.prdSgrpCd} */}
                          {
                            advProd?.prdSgrpCd === '06' &&
                            <p>1개</p>
                          }
                          {
                            advProd?.prdSgrpCd === '07' &&
                            <p>잔여 {(advProd?.crSlot ?? 0) - (advProd?.totalPassUseageCnt ?? 0) } 대</p>
                          }
                          <span className="price">{setComma(advProd?.prdSlAmt ?? 0)}원</span>
                        </Radio>
                      </li> 
                    )
                  }
                </ul>
              </div>
            </div>

            <div className="price-wrap">
              <p className="price-name">{selectedAdv?.prdNm}</p>
              <p className="price-tp7">{setComma(selectedAdv?.prdSlAmt)}<span className="won">원</span></p>
            </div>
            
            <div className="payment-sec method">
              {/* <h3 className="sub-tit">쿠폰/포인트 할인</h3>
              <div className="point-area">
                <PointSelector
                  point={usingPoint}
                  onChange={inputPoint}
                />

                <CouponSelector
                  item={selectedCoupon}
                  onChange={selectCoupon}
                >
                  <p className="ex">
                    적립된 포인트는 3,000원부터 사용이 가능하며 쿠폰, 포인트 결제 금액을 제외한 구매 금액의 N%가 포인트로 적립됩니다.<br />
                    <span className="tx-red80">쿠폰 적용 시에는 추가 결제와 혼합 사용하실 수 없습니다.</span>
                  </p>
                </CouponSelector>
              </div>
              <div className="last-sum">
                <ul>
                  <li>이용권금액<span>{setComma(selectedAdv?.prdMstAmt)}<em>원</em></span></li>
                  <li>할인금액<span>12,000<em>원</em></span></li>
                  <li>최종결제금액<span>{setComma(selectedAdv?.prdMstAmt)}<em>원 (VAT 포함)</em></span></li>
                </ul>
              </div> */}
              {
                selectedAdv?.prdSgrpCd !== '07' &&
                <>
                  <div className="method-wrap">
                    <p>결제 수단</p>
                    <div className="radio-group">
                      {
                        commonPaymentMethodList.map((tempPaymentMethod,i) => 
                          <Radio
                            key={i}
                            id={`payment-${tempPaymentMethod?.id}`}
                            title={tempPaymentMethod?.title}
                            checked={selectedPayment?.id}
                            value={tempPaymentMethod?.id}
                            name="payment"
                            onChange={checkPayment}
                          />
                        )
                      }
                    </div>
                  </div>
                  {
                    selectedPayment?.id === 'VBank' &&
                    <EvidenceSelector
                      item={selectedEvidence}
                      onChange={checkEvidence}
                    />
                  }
                </>
              }
            </div>
            <Buttons align="center" marginTop={48}>
              <Button size="big" background="gray" title="취소" width={130} height={48} buttonMarkup={true} onClick={(e) => hidePurchaseTicketPop(false)} />

              {
                selectedAdv?.prdSgrpCd !== '07' ?
                  <IniPayButton
                    background="blue80"
                    title="결제진행"
                    width={130}
                    height={48}
                    mode="normal"
                    beforeRequestAsync={beforeRequest}
                    paymethod={selectedPayment?.id}
                    items={[
                      selectedAdv
                    ]}
                    prodType="pass"
                    dlrPrdId={prodItem.dlrPrdId}
                  />
                : 
                  <Button
                    size="big"
                    background="blue80"
                    title="결제진행"
                    width={130}
                    height={48}
                    buttonMarkup={true}
                    onClick={handleFreeUpdatePayment}
                  />
              }
            </Buttons>
          </ColoredScrollbars>
        </div>
      </RodalPopup>

    </>
  )
}

export default popUpdateTimePicker