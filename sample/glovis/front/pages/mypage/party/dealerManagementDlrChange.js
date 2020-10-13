/**
 * 설명 : 딜러정보관리(단체) 목록, 딜러 승인, 삭제
 * @fileoverview  딜러정보관리
 * @requires dealerManagementAction, dealerManagementAction
 * @author 김지현
 */

import React, { useEffect, useState,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router,{withRouter} from 'next/router';
import { isEmpty, orderBy, filter } from 'lodash'
import produce from "immer"

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';

import Buttons from '@lib/share/items/Buttons'
import Button from '@lib/share/items/Button'
import SelectBox from '@lib/share/items/SelectBox'
import PageNavigator from '@src/components/common/PageNavigator'
import RodalPopup from '@lib/share/popup/RodalPopup'
import useRodal from '@lib/share/custom/useRodal'

import { approveDealer, deleteDealer } from '@src/actions/mypage/party/dealerManagementAction'

/**
 * 설명 : 딜러정보관리(딜러) 등록, 삭제
 * @param {  } 목록
 * @param 
 * @returns 
 */
const dealerManagementDlrChange = (props) => {
  const data = props.router.query;
  const dispatch = useDispatch();
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);

  const onApproveHandler = e => {
    e.preventDefault();
    dispatch(approveDealer({mbId : data.mbId, mbAprvKncd : "0020"})) 
    setRodalShow1(false);
    setRodalShow(true); 
  }

  const onDeleteHandler = e => {
    e.preventDefault();
    // 삭제처리
    dispatch(approveDealer({mbId : data.mbId, mbAprvKncd : "0030"})) 
    setRodalShow2(false);
    setRodalShow(true); 
  }

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow(false);
  }, []);

  const onApproveCloseHandler = (e) => {
    e.preventDefault();
    setRodalShow1(false);
  }

  const onDeleteCloseHandler = (e) => {
    e.preventDefault();
    setRodalShow2(false);
  }
  
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
            
            <Buttons align="center" marginTop={110}>
                {/*<Button size="big" background="blue80" title="소속딜러 등록" width={130} height={48} onClick={rodalPopupHandler1}/>*/}
                <Button size="big" background="blue80" title="소속딜러 삭제" width={130} height={48} onClick={rodalPopupHandler2}/>
            </Buttons>    
            
            <table summary="content" className="table-tp1">
                <caption>[소속딜러] {data.mbNm}</caption>
                <colgroup>
                    <col width="20%"/>
                    <col width="80%"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th>종사원증 번호</th>
                        <td>{data.mbEn} <span className="tx-blue80">[{data.mbEnEprDday}일]</span></td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>{data.mbHpPnEnc}</td>
                    </tr>
                </tbody>
            </table>  
          
        </div>
      </div>
    </div>
    <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="xs" >
        <div className="con-wrap">
          <p>{data.mbNm} 딜러님을 소속딜러로 승인하시겠습니까?</p>
          <Buttons align="center" marginTop={85}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={onApproveCloseHandler}/>
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={onApproveHandler}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow2} type={'slideUp'} closedHandler={modalCloseHandler2} mode="normal" size="xs" >
        <div className="con-wrap">
          <p>삭제하시겠습니까?</p>
          <Buttons align="center" marginTop={85}>
            <Button size="big" background="gray" title="취소" width={130} height={48} onClick={onDeleteCloseHandler}/>
            <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={onDeleteHandler}/>
          </Buttons>
        </div>
      </RodalPopup>
      <RodalPopup show={rodalShow} type={'fade'} width={380} closedHandler={modalCloseHandler} mode="normal" isMask={false} isButton={false}>
        <div className="con-wrap compact">
          <p>변경되었습니다.</p>
          <Buttons align="center" marginTop={30}>
            <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default withRouter(dealerManagementDlrChange)