import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { produce } from 'immer';

import { PulseLoader } from 'react-spinners';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';
import Steps from '@lib/share/items/Steps';
import CheckBox from '@lib/share/items/CheckBox';
import InputFile from '@lib/share/items/InputFile';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';

import PageNavigator from '@src/components/common/PageNavigator';
import FilterTable from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/FilterTable'

import { setComma } from '@src/utils/StringUtil';
import { combineValues, getCommonCodeAsync } from '@src/utils/DataUtils';
import { selectRequestARefundList } from '@src/api/mypage/dealer/dealerAdverApi';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';

const tabCancelAndRefund = ({params, eventHandler, advStore}) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);

  const { cancelList=[], cancelTotalcnt=0 } = advStore
  const { viewPageCnt, currentPage, startDt, endDt } = params
  const [ refundPopup, setRefundPopup, openRefundPopup, closeRefundPopup ] = useRodal(false, true); // 예상 낙찰가 조회
  const [ step, setStep ] = useState(1)
  const [ refundList, setRefundList ] = useState([])
  const [ selectedItems, setSelectedItems ] = useState([])
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [bankOptions, setBankOptions] = useState([]);
  const [phoneNumOptions, setPhoneNumOptions] = useState([]);
  const [ phoneNum, setPhoneNum ] = useState({
    prePhone : '',
    phone : ''
  })

  const [ payload, setPayload ] = useState({
    banksett : '', //은행코드
    noacct : '', //계좌번호
    nmcomp : '', //예금주
    accountChk : false, //계좌인증
    rltURL: `${process.env.HOSTURL}/api/admin/homeservice/receiveUrlConnection.do`
  })

  const selectValue = (item, e) => {
    const { value } = item
    const { name } = e
    console.log("selectValue -> value", value)
    console.log("selectValue -> name", name)

    setPayload({
      ...payload,
      [name] : value,
      accountChk : false
    })
  }
  
  const onChange = (e) => {
    const { name, value } = e.target
    console.log("onChange -> name", name)
    console.log("onChange -> value", value)

    setPayload({
      ...payload,
      [name] : value,
      accountChk : false
    })
  }
  
  const selectHpValue = (item, e) => {
    const { value } = item
    const { name } = e

    setPhoneNum({
      ...phoneNum,
      [name] : value
    })
  }
  const onChangeHp = (e) => {
    console.log("onChangeHp -> e", e)
    const { name, value } = e.target

    setPhoneNum({
      ...phoneNum,
      [name] : value
    })
  }

  const goNextStep = async () => {
    if(step === 1){
      if(selectedItems?.length > 0){
        setStep(step+1)
      } else {
        showAlert('목록에서 환불 신청 할 이용권을 1개이상 선택하세요')
      }
    } else if(step === 2){
      const validationKeys = Object.keys(payload)
      const msgObj = {
        banksett : '은행을 선택하세요',
        noacct : '계좌번호를 입력하세요',
        nmcomp : '예금주를 입력하세요',
        accountChk : '계좌인증이 필요합니다',
      }
      let valid = 0;
      for(let i=0,len=validationKeys.length; i<len; i++){
        const key = validationKeys[i]
        if(!payload[key]){
          showAlert(msgObj[key])
          break;
        } else {
          valid+=1
        }
      }

      //이미지 업로드
      
      //전화번호
      const phone = Object.keys(phoneNum).reduce((text,key) => {
        text += phoneNum[key]
        return text
      }, '')

      if(valid !== validationKeys.length){
        return
      } else if(!phoneNum.prePhone || !phone.match(/[0-9]{9,10}/)){
        showAlert('전화번호를 입력하세요')
        return
      } else if(false){//이미지
        showAlert('사업자 휴/폐업 확인서를 업로드하세요')
        return
      }
      
      const url = `${process.env.HOSTURL}/api/mypage/dealer/insertRefundItem.do`
      const { data, statusinfo } = await axiosPost(url, {
        refundInfo:payload,
        refundList:selectedItems,
        phone: phoneNum?.prePhone + phoneNum?.phone
      }).then(res => res?.data)

      if(statusinfo?.returncd === '000'){
        setStep(step+1)
      } else {
        showAlert('에러가 발생했습니다')
      }
    }

  }

  const openPop = async (e) => {
    e.persist()
    const { data, statusinfo } = await selectRequestARefundList().then(res => res?.data)

    console.log("openPop -> data", data)
    console.log("openPop -> statusinfo", statusinfo)

    setRefundList(data ?? [])
    setStep(1) 
    openRefundPopup(e)
  }

  const handleCheckRefund = (e, item) => {
    const { checked } = e.target
    console.log("handleCheckRefund -> checked", checked)
    console.log("handleCheckRefund -> item", item)

    if(checked){
      setSelectedItems(produce(selectedItems, draft => {
        draft.push(item)
      }))
    } else {
      setSelectedItems(selectedItems.reduce((array, selectedItem) => {
        if(selectedItem !== item){
          array.push({...selectedItem})
        }
        return array
      }, []))
    }
  }

  const handleCheckAll = e => {
    const { checked } = e.target
    setSelectedItems(checked ? refundList : [] )
  }

  const uploadImage = e => {
    console.log("tabCancelAndRefund -> e ", e )
  }

  const checkAcnt = async () => {
    const url = `/api/admin/homeservice/callUrlConnection.do`
    const { data, statusinfo } = await axiosPost(url, payload).then(res => res?.data)
    console.log("checkAcnt -> data", data)
    console.log("checkAcnt -> statusinfo", statusinfo)
    const msg = {
      'SYS9999' : '서버와 접속이 원활하지 않습니다.<br/>잠시 후 다시 시도해 주세요.',
      '000' : '인증되었습니다',
      '103' : '계좌번호 또는 예금주명이 불일치 합니다.',
    }
    showAlert(msg[statusinfo.returncd])
    setPayload({
      ...payload,
      accountChk : true //임시 - 인증 모두 true로 statusinfo.returncd === '000' ,
    })
  }

  // 모바일 더보기 버튼
  const [mobPage, setMobPage] = useState(1);
  const [isNeedMoreButton, setIsNeedMoreButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowMore = useCallback((e) => {
      if (e !== undefined) e.preventDefault();
      let _p = mobPage;
      _p++;
      setMobPage(_p);
      eventHandler({ caller: 'refund', mobPage: _p, type: 'append' });
      setIsLoading(true);
    },
    [mobPage, eventHandler]
  );
  const handleNewSearch = useCallback((e) => {
      if (e.preventDefault !== undefined) e.preventDefault();
      eventHandler({ caller: 'refund', startDt, endDt });
    },
    [eventHandler, startDt, endDt]
  );
  useEffect(() => {
    handleMoreButton(mobPage);
  }, [cancelTotalcnt]);

  const handleMoreButton = (mobPage) => {
    if (cancelTotalcnt > mobPage * viewPageCnt) {
      setIsNeedMoreButton(true);
    } else {
      setIsNeedMoreButton(false);
    }
  };
  useEffect(() => {
    if (isLoading) setIsLoading(false);
    handleMoreButton(mobPage);
  }, [cancelList]);
  // 모바일 더보기 버튼

  useEffect(() => {
    getCommonCodeAsync('FM053').then(setBankOptions);
    getCommonCodeAsync('FM005').then(setPhoneNumOptions);

  }, [])

  if (hasMobile) {
    return (
      <div className="payment-tx-list content-border pt4">
        <ul className="m-toggle-list search">
          <MenuItem>
            <MenuTitle>
              환불내역<span>상세조회</span>
            </MenuTitle>
            <MenuCont>
              <FilterTable params={params} onSubmit={handleNewSearch} />
            </MenuCont>
          </MenuItem>
          <li>
            <div className="float-wrap">
              <p>
                {moment(startDt).format('YYYY-MM-DD')} ~ {moment(endDt).format('YYYY-MM-DD')}
              </p>
              <p>
                총 <span className="tx-blue80">{cancelTotalcnt}</span>건
              </p>
            </div>
          </li>
        </ul>
        <div className="eposit-tx-list content-border">
          <ul className="pay-tx-list">
            {cancelList?.length ? (
              cancelList.map((cancelItem, i) => (
                <li key={i}>
                  <p className="mb16">{cancelItem?.prdNm}</p>
                  <ul>
                    <li>
                      <span>결제일</span>
                      {cancelItem?.payDt}
                    </li>
                    <li>
                      <span>환불일</span>
                      {cancelItem?.odrRfdDt}
                    </li>
                    <li>
                      <span>결제 수단</span>
                      {cancelItem?.payMthdNm}
                    </li>
                    <li className="tx-b">
                      <span>환불 금액</span>
                      {setComma(cancelItem?.rfdAmt)}원
                    </li>
                    <li>
                      <span>환불 상태</span>
                      {cancelItem?.odrTrnNm}
                    </li>
                  </ul>
                </li>
              ))
            ) : (
              <li>
                <p className="mb16">환불내역이 없습니다.</p>
              </li>
            )}
          </ul>
          {isNeedMoreButton && isLoading && (
            <div className="more-loading">
              <PulseLoader size={15} color={'#ddd'} loading={isLoading} />
            </div>
          )}
          {isNeedMoreButton && !isLoading && (
            <Buttons align="center" marginTop={8}>
              <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} lineHeight={40} fontSize={14} onClick={handleShowMore} />
            </Buttons>
          )}

          <h3 className="tit2 mt32">환불규정</h3>
          <ul className="m-toggle-list up-blue">
            <MenuItem>
              <MenuTitle>서비스별 환불 정책</MenuTitle>
              <MenuCont>
                <div className="essential-point tx-black">
                  <ul>
                    <li>
                      <i className="ico-dot" />
                      대당이용권, 경매낙찰 이용권, 업데이트 대당권
                    </li>
                    <li>
                      <i className="ico-dot" />
                      휴대전화로 결제 후 다음 달, 휴대전화 요금을 납부하면 명의자의 주민등록 번호로 현금영수증이 자동발행됩니다.
                    </li>
                    <li>
                      <i className="ico-dot" />
                      무통장입금 완료 후 현금영수증 또는 세금계산서 중 1개만 증빙자료로 신청하실 수 있습니다. (결제 후 다음 달 5일까지)
                    </li>
                    <li>
                      <i className="ico-dot" />
                      현금영수증 신청 시 세금계산서 대용으로 매입세액공제를 받으시려면 지출증빙용으로 신청해 주세요.
                    </li>
                    <li>
                      <i className="ico-dot" />
                      세금계산서 신청 시 기재하신 이메일로 전자 세금계산서를 발송해 드립니다. (우편 발송은 불가)
                    </li>
                    <li>
                      <i className="ico-dot" />
                      세금계산서 문의 : 고객센터 0000-0000)
                    </li>
                  </ul>
                </div>
              </MenuCont>
            </MenuItem>
          </ul>
          <h3 className="tit2 mt32">환불신청</h3>
          <div className="essential-point tp2 fs12 mt16">
            <ul>
              <li>&#8251; 환불 신청은 사업자 휴/폐업 확인서를 제출하는 경우에만 가능합니다.</li>
              <li>&#8251; 환불 신청은 PC버전에서만 가능합니다.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <FilterTable
        params={params}
        onSubmit={eventHandler}
      />

      <div className="payment-tx-list">
        <p className="inquire-num">환불내역 수 : 총{cancelTotalcnt}건</p>
        <table className="table-tp1 th-c td-c" summary="환불내역에 대한 내용">
          <caption className="away">환불내역</caption>
          <colgroup>
            <col width="12%" />
            <col width="12%" />
            <col width="31%" />
            <col width="16%" />
            <col width="16%" />
            <col width="13%" />
          </colgroup>
          <thead>
            <tr>
              <th>결제일</th>
              <th>환불일</th>
              <th>이용권명</th>
              <th>환불금액</th>
              <th>결제수단</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
          {
// odrTrnCd: "0020"
// odrTrnNm: "결제완료"
// payMthdCd: "06"
// payMthdNm: "무통장입금(가상계좌)"
// prdDtlSno: 1
// prdDvcd: "AA01"
// prdNm: "Live Studio"
// rfdAmt: 0
// rnum: 1
            cancelList?.length ? 
              cancelList?.map((item,i) =>
                <tr key={i}>
                  <td>{item?.payDt}</td>
                  <td>{item?.odrRfdDt}</td>
                  {/* <td>
                    <span onClick={(e) => openRefundPopup(e, "fade")}>{item?.prdNm}</span>
                  </td> */}
                  <td>{item?.prdNm}</td>
                  <td>{setComma(item?.rfdAmt)}원</td>
                  <td>{item?.payMthdNm}</td>
                  <td>{item?.odrTrnNm}</td>
                </tr>
              )
            :
              <tr className="list-none">
                <td colSpan="6">환불내역이 없습니다.</td>
              </tr>

          }
          </tbody>
        </table>
        <PageNavigator
            recordCount={cancelTotalcnt}
            recordSize={parseInt(viewPageCnt)}
            className="mt32"
            currentPage={parseInt(currentPage)}
            changed={(e, currentPage) =>
              eventHandler({
                currentPage
              })
            }
          />
      </div>

      <div className="payment-sec tp2">
        <h3 className="teste">환불규정</h3>
        <p>환불 신청은 사업자 휴/폐업 확인서를 제출하는 경우에만 가능합니다.</p>

        <table className="table-tp1 th-c td-c" summary="환불규정에 대한 내용">
          <caption className="away">환불내역</caption>
          <colgroup>
            <col width="12%" />
            <col width="16%" />
            <col width="12%" />
            <col width="16%" />
            <col width="auto" />
          </colgroup>
          <thead>
            <tr>
              <th>구분</th>
              <th>구분</th>
              <th>서비스<br />제공 기간</th>
              <th>기본가격/대당</th>
              <th>환불정책</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th rowSpan="2">기본상품</th>
              <td>대당 이용권</td>
              <td>1개월</td>
              <td>15,000</td>
              <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산 </td>
            </tr>

              <tr>
                <td>자유 이용권</td>
                <td>1개월부터</td>
                <td>33,000</td>
                <td> 결제금액 - (결제 금액 X 수수료 10%)+일할계산<br />
                단, 구매 후 7일 이내에 사용 내역이 없을 경우 전액 환불</td>
              </tr>
              <tr>
                <th rowSpan="3">프리미엄상품</th>
                <td>Live Studio</td>
                <td>3개월</td>
                <td>165,000</td>
                <td>환불 불가 / 촬영, 진단에 대한 용역 서비스 제공(기간은 무료 제공) </td>
              </tr>
              <tr>
                <td>Live Shot</td>
                <td>3개월</td>
                <td>110,000</td>
                <td>환불 불가 / 촬영, 진단에 대한 용역 서비스 제공(기간은 무료 제공)</td>
              </tr>
              <tr>
                <td>경매낙찰 이용권</td>
                <td>1개월</td>
                <td>55,000</td>
                <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산 </td>
              </tr>
              <tr>
                <th rowSpan="3">부가상품</th>
                <td>프라이싱 조회권</td>
                <td>1회</td>
                <td>1,100</td>
                <td> 미사용시 : 결제 금액-(결제 금액 X 10% or 1,100원 중 높은금액)<br />사용시 : 결제금액-(사용건수X1,100원)-(잔여금액X10% or 1,100원 중 높은금액)</td>
              </tr>
              <tr>
                <td>업데이트권 대당</td>
                <td>1개월</td>
                <td>11,000</td>
                <td>결제 금액 - [(결제금액-일할계산)X10%]-일할계산</td>
              </tr>
              <tr>
                <td>업데이트권 자유</td>
                <td>1개월부터</td>
                <td>11,000</td>
                <td>결제금액 - (결제 금액 X 수수료 10%)+일할계산<br />
                단, 구매 후 7일 이내에 사용 내역이 없을 경우 전액 환불 </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="essential-point">
          <p>환불신청</p>
          <ul>
            <li><i className="ico-dot mid"></i> 환불 신청은 사업자 휴/폐업 확인서를 제출하는 경우에만 가능합니다.</li>
            <li><i className="ico-dot mid"></i> 증빙서류가 정확하지 않을 시, 환불 및 취소 처리가 불가능할 수 있습니다. </li>
            <li><i className="ico-dot mid"></i> 환불 완료 시, 취소가 되지 않으니 신중하게 신청하시기 바랍니다.</li>
          </ul>
          <Button size="mid" line="gray" color="darkgray" radius={true} title="환불신청하기" width={106} buttonMarkup={true} onClick={openPop} />
        </div>

        {/* #a6 환불신청하기 start  */}    
        <RodalPopup show={refundPopup} type={'fade'} closedHandler={closeRefundPopup} title="환불신청하기" mode="normal" size="medium">
          <div className="popup-refund">
            <div className="refund-step">
              <Steps type={2} contents={['환불상품선택', '증빙첨부', '신청완료']} active={step} />
            </div>
            {step === 1 && (
              <div className="refund-wrap">
                <div className="refund_inner">
                <table className="table-tp1 first-chk th-c td-c" summary="시간선택 영역">
                  <caption className="away">시간선택</caption>
                  <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="25%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <CheckBox id='chk-all' onChange={handleCheckAll} />
                      </th>
                      <th>결제일</th>
                      <th>이용권명</th>
                      <th>결제금액</th>
                      <th>결제수단</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      refundList?.length > 0 ?
                        refundList.map((item,i) =>
                          <tr key={i}>
                            <td>
                              <CheckBox
                                id={`chk-refu-${i}`}
                                value={item?.value}
                                name="refund"
                                checked={selectedItems?.find(sItem => sItem === item) ? true : false}
                                onChange={e => handleCheckRefund(e, item)}
                              />
                            </td>
                            <td>{item?.payDt}</td>
                            <td>{item?.prdNm}</td>
                            <td>{setComma(item?.payAmt)}원</td>
                            <td>{item?.payMthdNm}</td>
                          </tr>
                        )
                      :
                        <tr>
                          <td colSpan='5'>
                            환불 신청 가능한 목록이 없습니다.
                          </td>
                        </tr>
                    }
                  </tbody>
                </table> 
              </div>

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={() => closeRefundPopup(false)} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} buttonMarkup={true} mode="normal" onClick={goNextStep} />
              </Buttons>
            </div>
          )}
          {step === 2 && (                
            <div className="refund-wrap">
              <ul className="record-list">
                <li>
                  <strong>사업자 휴/폐업 확인서 첨부</strong>
                  <InputFile uploadList={uploadImage}/>
                </li>
                <li>
                  <strong>계좌인증</strong>                 
                  <label htmlFor="account-num" className="hide">계좌 번호</label>
                  <span className="bridge">
                    <SelectBox
                      id="bank-name"
                      className="items-sbox"
                      placeHolder="은행명"
                      options={bankOptions}
                      width={173}
                      height={40}
                      name='banksett'
                      onChange={selectValue}
                    />
                  </span>
                  <span className="bridge">
                    <Input type="text" placeHolder="계좌번호( ‘ - ‘ 제외 입력)" id="account-num" name="noacct" width={173} onChange={onChange}/>
                  </span>
                  <span className="bridge">
                    <Input type="text" placeHolder="예금주" id="account-holder" name="nmcomp" width={173} onChange={onChange}/>
                  </span>
                  <span className="bridge">
                    <Button size="mid" background="gray" title="계좌인증" width={160} height={40} buttonMarkup={true} onClick={checkAcnt}/>
                  </span>
                  <p className="mb8 mt20">증빙 재발급용 휴대폰번호를 입력해주세요.</p>
                  <SelectBox
                    id="phone-num"
                    className="items-sbox"
                    options={phoneNumOptions}
                    width={173}
                    height={40}
                    name='prePhone'
                    onChange={selectHpValue}
                  />
                  <span className="bridge" style={{marginLeft : '8px'}}>
                  <Input
                    type="text"
                    placeHolder="( ‘ - ‘ 없이 숫자만)"
                    id="account-num"
                    width={173}
                    name="phone"
                    onChange={onChangeHp}
                    maxLength={8}
                  />
                  </span>
                </li>  
              </ul> 

              <ul className="list-gray">
                <li><i className="ico-dot mid"></i> 증빙서류가 정확하지 않을 시, 환불 및 취소처리가 불가능 할 수 있습니다.</li>
                <li><i className="ico-dot mid"></i> 환불 완료 시, 취소가 되지 않으니 신중하게 신청하시기 바랍니다.</li>                
              </ul> 

              <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={() => closeRefundPopup(false)} />
                <Button size="big" background="blue80" title="다음" width={172} height={60} buttonMarkup={true} mode="normal" onClick={goNextStep} />
              </Buttons>
            </div>  
            
          )}
          {step === 3 && (
            <div className="refund-wrap co-wrap">
              <p className="tit">신청이 완료되었습니다.</p>
              <p className="exp">진행 현황은 마이페이지 &gt; 취소 및 환불 탭에서 확인 가능합니다. </p>
                         
              <Buttons align="center" marginTop={64}>
                <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" buttonMarkup={true} onClick={() => closeRefundPopup(false)}/>                
              </Buttons>
            </div>
          )}
        </div>
      </RodalPopup>
      {/* #a6 환불신청하기 end */}
    </>
  );
};
export default tabCancelAndRefund;
