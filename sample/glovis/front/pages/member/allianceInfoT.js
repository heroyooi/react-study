/**
 * 설명 : 제휴 회원가입 시 가입정보입력 화면
 * @fileoverview 가입정보
 * @requires [memberAction, memberReducer]
 * @author D191364
 */
import React, { useEffect, useState,useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import { axiosGet } from '@src/utils/HttpUtils'
import { isEmpty} from 'lodash'
import { produce } from 'immer';

import AppLayout from '@src/components/layouts/AppLayout';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

import JoinBaseInfo from '@src/components/member/JoinBaseInfo'
import JoinSocietyInfo from '@src/components/member/JoinSocietyInfo'
import { chkEmlAddr, chkId, chkPwd, chkMbBrn, getTmsObj, chkTmsAgrNAgrObj  } from '@src/utils/MemberUtil';
import { saveMember, getIdDup, getEmlDup, getRepresentativeId } from '@src/actions/member/memberAction'

//mobile
import Steps from '@lib/share/items/Steps';
import { SECTION_MEMBER, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { signup_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';

const AllianceInfoT = (response) => {
    console.info("AllianceInfoT")
  const dispatch = useDispatch();
  useEffect(() => {     
    dispatch({ type: SECTION_MEMBER });
  }, []);

  console.info("response:", response)

 
    
return (
      <AppLayout>
        <Steps type={1} contents={['회원가입 신청', '회원가입완료']} active={1} reverse={true} mode="stick"/>        
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <form className="join-form">
              
                되냐
            </form>
        </div>
        </div>
      </AppLayout>
 
  
  )
}

AllianceInfoT.getInitialProps = async (http) => {
  /*
  console.info("BACK 필요!!!!!")
  const { req } = http;
  const data = req.query;
  //console.info("AllianceInfo:", req.query);
  const res = await 
  axiosGet(`/api/member/selectRepresentativeId.do?userId=${data.userId}&userTpcd=${data.userTpcd}`, null);  

  return {      
    data: res.data,
    param: req.query

  };  

*/
  const { req } = http;
  const data = req.query;  

  console.info("req:", req)

  return {      
    param: req.query
  };  

};

export default AllianceInfoT;
