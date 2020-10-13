import { useContext, useState, useEffect, memo } from 'react';

import Radio from '@lib/share/items/Radio';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';

import FreeTicketList from '../tabAdGuide/FreeTicketList'
import UpdateTicketList from '../tabAdGuide/UpdateTicketList'
import PricingTicketList from '../tabAdGuide/PricingTicketList'
import CouponSelector from '@src/components/common/couponSelector/CouponSelector'
import EvidenceSelector from '@src/components/common/couponSelector/EvidenceSelector';
import EtcTicketListItems from '../tabAdGuide/EtcTicketListItems'

import { setComma } from '@src/utils/StringUtil';
import { SystemContext } from '@src/provider/SystemProvider'
import { selectCouponList } from '@src/api/mypage/dealer/dealerAdverApi'
import IniPayButton from '@lib/share/inipay/IniPayButton'

import {
  commonPaymentMethodList,
  commonEvidenceList,
  // commonEvidenceList
} from '@src/constant/payment';
import { console } from 'globalthis/implementation';

const globalThis = require('globalthis')();

const tabPurchaseTicket = ({params, advStore, memberInfo}) => {
  const { prdDvcd, crSlot } = params
  const {
    usingTicketList,
    free = [],
    update = [],
    pricing = [],
    auction=[],
    perCar=[],

    financeData = [],
    importData = [],
    superiorData = [],
   } = advStore
   const { mbPrtnDvcd  } = memberInfo

  console.log("tabPurchaseTicket -> advStore", advStore)
  console.log("tabPurchaseTicket -> usingTicketList", usingTicketList)

  const { showAlert, showConfirm, Alert,  Confirm, initAlert, initConfirm, } = useContext(SystemContext)
  const [step, setStep] = useState(0)
  const [couponList, setCouponList] = useState([])
  const [selectedCoupon, selectCoupon] = useState(null)
  const [usingCoupon, setUsingCoupon] = useState(false)
  const [checkedFreeTicket, setCheckedFreeTicket] = useState(null)
  const [checkedUpdateTicket, setCheckedUpdateTicket] = useState(null)
  const [checkedPricingTicket, setCheckedFrPricingcket] = useState(null)
  const [checkedCompanyTicket, setCheckedCompanyTicket] = useState(null)
  const [selectedPayment, selectPayment] = useState({id:'Card'})
  const [resultMsg, setResultMsg] = useState({})
  const [selectedEvidence, setSelectedEvidence] = useState();

  const inicisCallback = (message) => {
    console.log("inicisCallback -> message", message)
    const {
      merchantData,
      statusinfo,
      vbankinfo,
    } = message?.data;

    if(statusinfo){
      setResultMsg(message?.data)
      globalThis?.window?.INIStdPay?.viewOff();

      if(statusinfo?.returncd === '0000'){
        setStep(2)
      } else {
        showAlert('결제 실패하였습니다')
      }
    }

  };


  const goNextSteps = () => {
    if(checkedFreeTicket || checkedUpdateTicket || checkedPricingTicket || checkedCompanyTicket){
      setStep(1)
      globalThis?.window?.scrollTo(0,0)
    } else {
      showAlert('이용권을 선택하세요')
    }
  };

  const selectItem = (e, item) => {
    const { name, value} = e.target
    // console.log("selectItem -> name", name)
    // console.log("selectItem -> value", value)
    console.log("selectItem -> item?.prdDvcd", item?.prdDvcd)

    switch(name){
      case 'freeTicket':
        setCheckedFreeTicket(free.find(item => item?.prdDtlSno == value))
        break;
      case 'updateTicket':
        setCheckedUpdateTicket(update.find(item => item?.prdDtlSno == value))
        break;
      case 'pricingTicket':
        setCheckedFrPricingcket(pricing.find(item => item?.prdDtlSno == value))
        break;
      case 'companyTicket' :
        console.log('setCheckedCompanyTicket checked')
        setCheckedCompanyTicket(item)
        break;
    }
  }

  const checkUsingCoupon = (e) =>{
    const { checked } = e.target
    if(!checked){
      selectCoupon(null)
    }
    setUsingCoupon(checked)
  }

  const checkCoupon = (e) => {
    const { checked, value } = e.target

    if(checked){
      selectCoupon(couponList.find(tempCoupon => tempCoupon.id == value))
    }
  }

  const checkPayment = (e) => {
    const { checked, value } = e.target
    console.log("checkPayment -> value", value)

    if(checked){
      const checkedItem = commonPaymentMethodList.find(tempPaymentMethod => tempPaymentMethod.id == value)
      selectPayment(checkedItem);

      if(checkedItem?.id !== 'VBank') {
        setSelectedEvidence(null)
      }
    }
  }

  const initPurchaseState = (e) => {
    e.preventDefault()
    setStep(0)
    selectCoupon(null)
    setUsingCoupon(false)
    setCheckedFreeTicket(null)
    setCheckedUpdateTicket(null)
    setCheckedFrPricingcket(null)
    setCheckedCompanyTicket(null)
    selectPayment({id:'01'})
    globalThis?.window?.scrollTo(0,0)
  }

  useEffect(() => {
    globalThis?.window.addEventListener('message', inicisCallback);

    // selectCouponList()
    //   .then(res => res?.data?.data)
    //   .then(({coupon}) => setCouponList(coupon))
  
    return () => { 
      console.log('out')
      initAlert() 
      initConfirm() 
      globalThis?.window.removeEventListener('message', inicisCallback);
    }
  }, [])

  const beforeRequest = () => {//결제요청 전 벨리데이션 체크
    console.log('beforeRequest selectedCoupon : ', selectedCoupon)
    console.log('beforeRequest selectedPayment : ', selectedPayment)

    return new Promise((resolve, reject) => {
      if(selectedPayment){
        resolve()
      } else {
        showAlert('결제 수단을 선택하세요')
        reject()
      }
    })
  }

  const checkEvidence = (e,item) => {
    setSelectedEvidence(item)
  }

  return (
    <>
      {step === 0 && (
        <div className="payment-sec radio">
          <div className="usage-wrap">
            <p className="tag-tp5">차량등록상품</p>
            <div className="tx-list">
              <ul>
                <li>
                  <h5>경매 낙찰 이용권</h5>
                  <p>경매장에서 낙찰받은 차량만 이용 가능하고, 차량 등록 진행 시 구입 가능합니다.</p>
                  <span className="price">{setComma(auction[0]?.prdSlAmt)}원</span>
                </li>
                <li>
                  <h5>대당 이용권</h5>
                  <p>차종 제한없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                  <span className="price">{setComma(perCar[0]?.prdSlAmt)}원</span>
                </li>
                <li id="free">
                  <h5>자유 이용권</h5>
                  <p>모든 차량 등록 가능합니다. 아래 표에서 원하는 이용권을 선택해주세요.</p>
                  <FreeTicketList
                    items={free}
                    selectable={true}
                    onChange={selectItem}
                    checkedValue={checkedFreeTicket}
                    checkableProps={{prdDvcd, crSlot}}
                    usingTicketList={usingTicketList?.freepassinfo}
                  />
                </li>

                {
                  mbPrtnDvcd === '0030' &&
                  <EtcTicketListItems
                    items={superiorData}
                    name="우량업체"
                    isEditing={true}
                    onChange={selectItem}
                    checkedValue={checkedCompanyTicket}
                    disabled={prdDvcd || crSlot}
                  />
                }

                {
                  mbPrtnDvcd === '0010' &&
                  <EtcTicketListItems
                    items={importData}
                    name="수입인증 중고차 법인 업체"
                    isEditing={true}
                    onChange={selectItem}
                    checkedValue={checkedCompanyTicket}
                    disabled={prdDvcd || crSlot}
                  />
                }

                {
                  mbPrtnDvcd === '0020' &&
                  <EtcTicketListItems
                    items={financeData}
                    name="금융사"
                    isEditing={true}
                    onChange={selectItem}
                    checkedValue={checkedCompanyTicket}
                    disabled={prdDvcd || crSlot}
                  />
                }

              </ul>
            </div>
          </div>

          <div className="usage-wrap">
            <p className="tag-tp5">부가상품</p>
            <div className="tx-list">
              <ul>
                {/* <li>
                  <h5>Bestpick 이용권</h5>
                  <p>차종 제한 없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                  <span className="price">100,000원~</span>
                </li> */}
                <li>
                  <h5>업데이트 20 (대당)</h5>
                  <p>차종 제한 없으며, 차량 등록 진행 시 구입 가능합니다.</p>
                  <span className="price">10,000원</span>
                </li>
                <li id="update20">
                  <h5>업데이트 20 (자유)</h5>
                  <UpdateTicketList
                    items={update}
                    selectable={true}
                    onChange={selectItem}
                    checkedValue={checkedUpdateTicket}
                    checkableProps={{prdDvcd, crSlot}}
                    usingTicketList={usingTicketList?.updatefreepassinfo}
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="usage-wrap">
            <p className="tag-tp5">프라이싱상품</p>
            <div className="tx-list">
              <ul>
                <li>
                  <h5 id="pricing">프라이싱 조회권</h5>
                  <PricingTicketList items={pricing} selectable={true} onChange={selectItem} checkedValue={checkedPricingTicket} checkableProps={{prdDvcd, crSlot}} />
                </li>
              </ul>
            </div>
          </div>

          <div className="pick-list">
            {
              checkedFreeTicket && 
              <ul>
                <li>{checkedFreeTicket.prdNm}</li>
                <li>{`${checkedFreeTicket.regMm}개월 ${checkedFreeTicket.crSlot}대`}</li>
                <li>{`${setComma(checkedFreeTicket.prdSlAmt)}원`}</li>
              </ul>
            }
            {
              checkedUpdateTicket && 
              <ul>
                <li>{checkedUpdateTicket.prdNm}</li>
                <li>{`${checkedUpdateTicket.regMm}개월 ${checkedUpdateTicket.crSlot}대`}</li>
                <li>{`${setComma(checkedUpdateTicket.prdSlAmt)}원`}</li>
              </ul>
            }
            {
              checkedPricingTicket && 
              <ul>
                <li>{checkedPricingTicket.prdNm}</li>
                <li>{`${checkedPricingTicket.prdUseCnt}회`}</li>
                <li>{`${setComma(checkedPricingTicket.prdSlAmt)}원`}</li>
              </ul>
            }
          </div>
          <div className="sum">
            <p>합계 금액</p>
            <p className="price">
              {setComma(
                (checkedFreeTicket?.prdSlAmt||0)+
                (checkedUpdateTicket?.prdSlAmt||0)+
                (checkedPricingTicket?.prdSlAmt||0)
              )}<span>원</span>
            </p>
          </div>
          <Buttons align="center" marginTop={56}>
            {/* <Button size="big" background="gray" title="취소" width={130} onClick={initPurchaseState} buttonMarkup={false} /> */}
            <Button size="big" background="blue80" title="다음단계" width={130} onClick={goNextSteps} buttonMarkup={true} />
          </Buttons>
        </div>
      )}
      {step === 1 && (
        <div className="payment-sec method">
          <h3 className="sub-tit">이용권 결제</h3>
          <div className="point-area">
            <div className="pay-detail">
              <h4>구매내역</h4>
              <div className="pick-list">
                {
                  checkedFreeTicket && 
                  <ul>
                    <li>{checkedFreeTicket.prdNm}</li>
                    <li>{`${checkedFreeTicket.regMm}개월 ${checkedFreeTicket.crSlot}대`}</li>
                    <li>{`${setComma(checkedFreeTicket.prdSlAmt)}원`}</li>
                  </ul>
                }
                {
                  checkedUpdateTicket && 
                  <ul>
                    <li>{checkedUpdateTicket.prdNm}</li>
                    <li>{`${checkedUpdateTicket.regMm}개월 ${checkedUpdateTicket.crSlot}대`}</li>
                    <li>{`${setComma(checkedUpdateTicket.prdSlAmt)}원`}</li>
                  </ul>
                }
                {
                  checkedPricingTicket && 
                  <ul>
                    <li>{checkedPricingTicket.prdNm}</li>
                    <li>{`${checkedPricingTicket.prdUseCnt}회`}</li>
                    <li>{`${setComma(checkedPricingTicket.prdSlAmt)}원`}</li>
                  </ul>
                }
                <div className="sum">
                  <p>합계 금액</p>
                  <p className="price">
                    {setComma(
                      (checkedFreeTicket?.prdSlAmt||0)+
                      (checkedUpdateTicket?.prdSlAmt||0)+
                      (checkedPricingTicket?.prdSlAmt||0)
                    )}<span>원</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <CouponSelector
              item={selectedCoupon}
              onChange={selectCoupon}
            >
              <p className="ex">신규쿠폰등록은 ‘마이페이지 > 쿠폰등록’에서 가능합니다.</p>
            </CouponSelector> */}
          </div>
          <div className="last-sum">
            <ul>
            <li>
              이용권금액
              <span>
                {setComma(
                  (checkedFreeTicket?.prdSlAmt||0)+
                  (checkedUpdateTicket?.prdSlAmt||0)+
                  (checkedPricingTicket?.prdSlAmt||0)
                )}<span>원</span>
              </span>
            </li>
            <li>
              할인금액
              <span>
                0<em>원</em>
              </span>
            </li>
            <li>
              최종결제금액
              <span>
                {setComma(
                  (checkedFreeTicket?.prdSlAmt||0)+
                  (checkedUpdateTicket?.prdSlAmt||0)+
                  (checkedPricingTicket?.prdSlAmt||0)
                )}<em>원</em>
              </span>
            </li>
            </ul>
          </div>

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


          <Buttons align="center" marginTop={56}>
            <Button size="big" background="gray" title="취소" width={130} onClick={initPurchaseState} buttonMarkup={true} />
            <IniPayButton
              size="big"
              background="blue80"
              title="결제"
              width={130}
              mode="normal"
              beforeRequestAsync={beforeRequest}
              paymethod={selectedPayment?.id}
              coupon={selectedCoupon?.id}
              items={[
                checkedFreeTicket,
                checkedUpdateTicket,
                checkedPricingTicket
              ]}
              prodType="pass"
            />
          </Buttons>
        </div>
      )}
      {step === 2 && (
        <div className="co-wrap">
          <p className="tit">이용권 구매가 완료되었습니다.</p>
          {
            resultMsg?.vbankinfo &&
            <div style={{width:'400px', margin:'50px auto'}}>
              <table className="table-tp1 mt24" summary="결제내역에 대한 내용">
                <caption style={{position:'absolute', clip:'rect(0,0,0,0)'}}>결제내역</caption>
                <colgroup>
                  <col width="40%" />
                  <col width="60%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>은행</th>
                    <td>{resultMsg?.vbankinfo?.vactBankName}</td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td>{resultMsg?.vbankinfo?.vactNum}</td>
                  </tr>
                  <tr>
                    <th>결제금액</th>
                    <td>{setComma(resultMsg?.vbankinfo?.totprice)}원</td>
                  </tr>
                  <tr>
                    <th>입금기한</th>
                    <td>
                      {`${resultMsg?.vbankinfo?.vactDate.substring(0,4)}년 ${resultMsg?.vbankinfo?.vactDate.substring(4,6)}월 ${resultMsg?.vbankinfo?.vactDate.substring(6,8)}일 ${resultMsg?.vbankinfo?.vactTime.substring(0,2)}시 ${resultMsg?.vbankinfo?.vactTime.substring(2,4)}분까지`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          <div>
            
          </div>
          <p className="exp">
            구매해주셔서 감사합니다.
            <br />
            구매하신 이용권은 마이페이지 > 광고이용권 안내 > 사용중인 이용권에서 확인 가능합니다.
            <br />
            감사합니다.
          </p>
          <Buttons align="center" marginTop={80}>
            <Button size="big" line="blue80" color="blue80" title="광고 등록하러 가기" width={200} height={60} href="/mypage/dealerSell02_01" />
            <Button size="big" background="blue80" title="확인" width={200} height={60} buttonMarkup={true} onClick={initPurchaseState}/>
          </Buttons>
        </div>
      )}
    </>
  );
};
export default memo(tabPurchaseTicket);
