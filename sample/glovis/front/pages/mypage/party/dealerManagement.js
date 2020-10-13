/**
 * 설명 : 딜러정보관리(단체) 목록, 딜러등록
 * @fileoverview  딜러정보관리
 * @requires dealerManagementAction, dealerManagementAction
 * @author 강윤경
 */

import React, { useEffect, useState,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { isEmpty, orderBy, filter } from 'lodash'

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator'

import { getDealerList  } from '@src/actions/mypage/party/dealerManagementAction'

import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobAdRegistration from '@src/components/common/MobAdRegistration';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

/**
 * 설명 : 딜러정보관리 목록
 * @param {  } 목록
 * @param 
 * @returns 
 */
const dealerManagement = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '딜러정보 관리',
          options: ['back', 'search', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordSize, setRecordSize] = useState(15);
  const [isDelete, setIsDelete] = useState(false);

  
  const dealerList = useSelector((state) => state.dealerMngt.dealerList);
  const rtnSave = useSelector((state) => state.dealerMngt.rtnSave);

  //detail
  const onUrlClick = (e, mbId, gubun, mbNm, mbEn, mbEnEprDday, mbHpPnEnc) => {
    if (gubun == '단체') {
      let data = {
        mbId : mbId,
        mbNm : mbNm
      }
      Router.push({pathname:'/mypage/party/dealerManagementChange', query:data} ,'/mypage/party/dealerManagementChange')
    } else {
      let data = {
        mbId : mbId,
        mbNm : mbNm,
        mbEn : mbEn, 
        mbEnEprDday : mbEnEprDday, 
        mbHpPnEnc : mbHpPnEnc
      }
      Router.push({pathname:'/mypage/party/dealerManagementDlrChange', query:data} ,'/mypage/party/dealerManagementDlrChange')
    }
  };

  //paging
  const onHandlePageChange = useCallback((e, page) => { 
    console.log(page)
    dispatch(getDealerList({"currentPage" : page, "recordSize" : recordSize}))
  });

  useEffect(() => {
      dispatch(getDealerList({"currentPage" : currentPage, "recordSize" : recordSize}))         
  }, [dispatch]);

  const [fpAdRegist, setFpAdRegist] = useState(false);
  const handleFullpagePopup = useCallback(name => e => {
    e.preventDefault();
    if (name === "ad_registration") {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '광고 등록 현황',
          options: ['close']
        }
      });
      setFpAdRegist(true);
    }
  }, []);
  
  if (hasMobile) {
    return (
      <AppLayout>
        <div className="inner pd20">        
          <h3 className="tit2">소속딜러</h3>
          
          <div className="info-list-wrap">
            <p className="list-ex">총<span>15</span>명</p>          
            <ul className="info-list">
              <li onClick={handleFullpagePopup("ad_registration")}>
                <a>
                  <div className="info-left">
                    <p className="days-area">2019.08.01 등록</p>
                    <p className="waterman-area"><span>단체</span>현대 오토오토</p>
                    <p className="count-area">대표계정</p>
                  </div>                  
                  <div className="info-right">
                    <em><span>20</span> 대</em>
                    <span>등록중</span>
                  </div>
                </a>
              </li>
              <li onClick={handleFullpagePopup("ad_registration")}>
                <a>
                  <div className="info-left">
                    <p className="days-area">2019.08.01 등록 <span>D-398</span></p>
                    <p className="waterman-area"><span>단체</span>김현대 (010-1234-5678)</p>
                    <p className="count-area">123-45-67892</p>
                  </div>                  
                  <div className="info-right">
                    <em><span>10</span>대</em>
                    <span>등록중</span>
                  </div>
                </a>
              </li>
              <li onClick={handleFullpagePopup("ad_registration")}>
                  <a>
                    <div className="info-left">
                      <p className="days-area">2019.08.01 등록 <span>D-398</span></p>
                      <p className="waterman-area">김현대 (010-1234-5678)</p>
                      <p className="count-area">대표계정</p>
                    </div>                  
                    <div className="info-right">                    
                      <span>승인필요</span>
                    </div>
                  </a>
              </li>            
            </ul>
          </div> 

          <p className="tx-tp3 mt8">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
          <p className="tx-tp3 mt8">&#8251; 신규 가입 한 딜러인 경우, 단체회원의 승인을 거친 이후 딜러배정을 하실 수 있습니다.</p>
        </div>

        <MobFullpagePopup active={mFullpagePopup}>
          {fpAdRegist && <MobAdRegistration />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec dealer-info">
          <div className="mypage-admin-title">
            <h3>딜러정보 관리</h3>
            <p className="tx-exp-tp5">&#8251; 단체회원 계정으로 등록된 차량에 한해 딜러배정(연락처 변경)을 하실 수 있습니다.</p>
            <p className="tx-exp-tp5">&#8251; 신규 가입한 딜러인 경우, 단체회원의 승인을 거친 이후 딜러 배정을 하실수 있습니다.</p>
          </div>

          <div className="tx-list">
            <p className="inquire-num">총 {dealerList.length}명</p>
            <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
              <caption className="away">딜러정보 관리</caption>
              <colgroup>
                <col width="5%" />
                <col width="8%" />
                <col width="18%" />
                <col width="24%" />
                <col width="30%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>                    
                  <th>NO.</th>
                  <th>구분</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>종사원번호</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {!isEmpty(dealerList) &&
                dealerList.map((board, index) => {
                return (
                <tr key={index} >
                  <td>{board.rnum}</td>
                  <td>{board.gubun}</td>
                  <td key={board.mbId} onClick={(e) => onUrlClick(e, board.mbId, board.gubun, board.mbNm, board.mbEn,board.mbEnEprDDay,board.mbHpPnEnc)}>{board.mbNm}</td>
                  <td>{board.mbHpPnEnc}</td>
                  <td>{board.mbEn} <span className="tx-blue80">[{board.mbEnEprDDay}일]</span></td>
                  <td>{board.regDate}</td>
                </tr>
                   );
                })}
                {isEmpty(dealerList) && (
                  <tr>
                    <td colSpan="6">결과가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
            {!isEmpty(dealerList) && <PageNavigator currentPage={currentPage} recordCount={dealerList.length} recordSize={recordSize} changed={onHandlePageChange}/>}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default dealerManagement