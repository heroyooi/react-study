import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { setComma } from '@src/utils/StringUtil';

import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';

import { SystemContext } from '@src/provider/SystemProvider'
import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi'
import { setHpPnFormat } from '@src/utils/MemberUtil'
import { Date } from 'globalthis/implementation';


const popSendProd = ({ changingEvent, onClose, prodItem = {}, memberInfo = {} }) => {
  console.log('prodItem -> : ', prodItem)
  console.log("popSendProd -> memberInfo", memberInfo)

  const { car, sbidDt, sbidAmt, dlrMbId, sttDvcd, dlrPrdId } = prodItem
  const { brn } = memberInfo
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [ dealerList, setDealerList] = useState([])
  const [ selectedCorworker, setSelectedCorworker] = useState(null)

  const onSubmit = () => {
    console.log('onSubmit : ', selectedCorworker)
    if(selectedCorworker){
      showConfirm(`${selectedCorworker?.mbnm} 딜러에게 차량을 보내시겠습니까?`, async () => {
        console.log('예 보냅니다 selectedCorworker : ', selectedCorworker)
        showLoader()
        const { data } = await dealerProdApi.updateSendAnotherDealer({
          assgnDlrId : selectedCorworker?.mbid,
          assgnDlrTelEnc : setHpPnFormat(selectedCorworker?.mbhppn),
          dlrMbId,
          sttDvcd,
          dlrPrdId,
        })
        hideLoader()

        const { statusinfo } = data ?? {}

        if(statusinfo?.returncd === '000'){
          onClose && onClose()
          showAlert('처리되었습니다', changingEvent)
        } else {
          showAlert('오류가 발생했습니다')
        }
      })
    } else {
      showAlert('차량을 보내고자 하는 딜러를 선택하세요')
    }
  }
  
  const onChange = (item, e) => {
    console.log('onChange item : ', item)
    setSelectedCorworker(item)
  }

  useEffect(() => {
    showLoader() 
    dealerProdApi.selectCoworkers({brn}).then((res) => {
      const { data, statusinfo } = res?.data
      if(statusinfo?.returncd === '000'){
        console.log("popSendProd ::::::: 정상 data", data)
        setDealerList(() =>
          data.map(item => {
            const { mbhppn, mbnm } = item
            const phone = setHpPnFormat(mbhppn)

            return {
              ...item,
              value : mbhppn,
              label : `${mbnm}(${phone})`,
            }
          })
        )
      }
    }).finally(() => {
      hideLoader() 
    })
  }, [])

  return (
    <div className="con-wrap popup-bid-send">
      <table summary="차량정보에 대한 내용" className="table-tp1">
        <caption>차량정보</caption>
        <colgroup>
          <col width="35%" />
          <col width="65%" />
        </colgroup>
        <tbody>
          <tr>
            <th>차량명</th>
            <td>{car?.crNm}</td>
          </tr>
          <tr>
            <th>차량번호</th>
            <td>{car?.crNo}</td>
          </tr>
          <tr>
            <th>년식</th>
            <td>{car?.frmYyyy}년식</td>
          </tr>
          <tr>
            <th>주행거리</th>
            <td>{setComma(car?.drvDist)} km</td>
          </tr>
          <tr>
            <th>변속기</th>
            <td>{car?.mssNm}</td>
          </tr>
          <tr>
            <th>연료</th>
            <td>{car?.fuelNm}</td>
          </tr>
        </tbody>
      </table>
      <ul className="dot-wrap">
        <li><i className="ico-dot sml"></i><span>낙찰 받은 날짜</span><strong>{moment(sbidDt ?? new Date()).format('YYYY.MM.DD')}</strong></li>
        <li><i className="ico-dot sml"></i><span>낙찰 금액</span><strong>{setComma(sbidAmt)}<span> 원</span></strong></li>
      </ul>
      <form>
        <fieldset>
          <legend>받는사람</legend>
          <SelectBox
            id="select1"
            className="items-sbox mr8"
            options={dealerList}
            width={300}
            height={40}
            onChange={onChange}
            value={selectedCorworker?.mbid}
          />
        </fieldset>
      </form>
      <Buttons align="center" marginTop={48}>
        <Button size="big" background="blue80" title="확인" width={245} onClick={onSubmit} buttonMarkup={true} />
      </Buttons>
    </div>
  );
};

export default popSendProd;
