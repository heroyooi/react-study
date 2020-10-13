/**
 * 설명 : 딜러정보관리(단체) 목록
 * @fileoverview  딜러정보관리 (연락처변경)
 * @requires dealerManagementAction, dealerManagementAction
 * @author 김지현
 */

import React, { useEffect, useState,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router,{withRouter} from 'next/router';
import { isEmpty, orderBy, filter } from 'lodash'
import produce from "immer"

import AppLayout from '@src/components/layouts/AppLayout'
import MypageNavi from '@src/components/common/MypageNavi'

import Buttons from '@lib/share/items/Buttons'
import Button from '@lib/share/items/Button'
import SelectBox from '@lib/share/items/SelectBox'
import PageNavigator from '@src/components/common/PageNavigator'

import { getRepresentativeDealerList , saveDealer } from '@src/actions/mypage/party/dealerManagementAction'

import RodalPopup from '@lib/share/popup/RodalPopup'
import useRodal from '@lib/share/custom/useRodal'

/**
 * 설명 : 딜러정보관리(단체) (연락처변경) 
 * @param 
 * @param 
 * @returns 
 */
const dealerManagementChange = (props) => {
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);

  const data = props.router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [recordSize, setRecordSize] = useState(15);
  const [formData, setFormData] = useState(data);
  const dispatch = useDispatch()
  
  const dealerRepList = useSelector((state) => state.dealerMngt.dealerRepList);
  const assignDataList = useSelector((state) => state.dealerMngt.assignDataList);
  const rtnSave = useSelector((state) => state.dealerMngt.rtnSave);

  
  //딜러등록 취소
  const onCancelDealer = (e) => {
    //Router.push(url + '?mbId=' + mbId, url);
    Router.push("/mypage/party/dealerManagement")
  }

  //딜러등록
  const onSaveDealer = useCallback((e) => { 
    console.log(formData); 
    console.log(JSON.stringify(formData));
    dispatch(saveDealer(formData));
  
  });

  //paging
  const onHandlePageChange = useCallback((e, page) => { 
    console.log(page)
    dispatch(getRepresentativeDealerList({"currentPage" : page, "recordSize" : recordSize}))
  });

  const handleChange = (e, target) => {      
    setFormData(
      [...formData, 
        {
          id : target,
          value : e.value
        }
      ]
    )
    
  }

  useEffect(() => {
    console.log(rtnSave);
    if(!isEmpty(rtnSave)) {
      setRodalShow(true)
    }
  }, [rtnSave]);

  useEffect(() => {
    if(isEmpty(dealerRepList)){
      dispatch(getRepresentativeDealerList({"currentPage" : currentPage, "recordSize" : recordSize}))  
    }
  }, [dealerRepList]);

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow(false);
  }, []);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec dealer-info">
          <div className="mypage-admin-title">
            <h3>딜러정보 관리</h3>
            <p className="tx-exp-tp5">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 미승인 상태의 딜러 및 종사원증 만료 상태인 딜러는 딜러배정을 하실수 없습니다.</p>
          </div>

          <div className="tx-list">
            <p className="inquire-num">[단체대표계정] {data.mbNm}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 광고중인 차량 ( {dealerRepList.length}대)</p>
            <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
              <caption className="away">딜러정보 관리</caption>
              <colgroup>
                <col width="5%" />
                <col width="45%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <thead>
                <tr>                    
                  <th>NO.</th>
                  <th>차량명(기본정보)</th>
                  <th>가격(만원)</th>
                  <th>연락처 변경</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(dealerRepList) &&
                dealerRepList.map((item, index) => {
                return (
                    <tr key={index} >
                      <td>{item.rnum}</td>
                      <td>{item.crNm} {item.crNo}</td>
                      <td>{item.slAmt}</td>
                      <td>
                          <SelectBox id={item.dlrPrdId} className="items-sbox" options={assignDataList} width={200} height={40} value={ item.value } name="assignData" onChange={(e) => handleChange(e, item.dlrPrdId)} isisValue={true} />
                      </td>
                    </tr>
                   );
                })}
                {isEmpty(dealerRepList) && (
                    <tr>
                      <td colSpan="4">결과가 없습니다.</td>
                    </tr>
                )}                
              </tbody>
            </table>
            <PageNavigator currentPage={currentPage} recordCount={dealerRepList.length} recordSize={recordSize} changed={onHandlePageChange}/>
          </div>
          <Buttons align="center" marginTop={110}>
            <Button size="big" background="gray" title="취소" width={130} height={48} buttonMarkup={true} onClick={onCancelDealer}/>
            <Button size="big" background="blue80" title="저장" width={130} height={48} buttonMarkup={true} onClick={onSaveDealer}/>
          </Buttons>
        </div>
      </div>
      <RodalPopup show={rodalShow} type={'fade'} width={380} closedHandler={modalCloseHandler} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>등록되었습니다.</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(dealerManagementChange)