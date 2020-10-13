/**
 * 설명 : 본인인증 창(추후, 통신사 연결)
 * @fileoverview 
 * @requires 
 * @author 김지현
 */
import React, {useState,useEffect} from 'react';
//import window from 'global'

import AppLayout from '@src/components/layouts/AppLayout';
import SignUpCheckBoxGroup from '@src/components/common/SignUpCheckBoxGroup';
import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Router, { withRouter } from 'next/router';
import { isEmpty, orderBy } from 'lodash'

const oneselfCertifyNew = (props) => {

  console.log("##########################");
  console.log(props.router.query);
  const resultdata = props.router.query;
  
  const [certData,setCertData] = useState({});
  const [certShow,setCertShow] = useState(false);  

  useEffect(() => {
    // Update the document title using the browser API
    
    if(!isEmpty(resultdata.data)) {
      let tmp = JSON.parse(resultdata.data);
      if(tmp.RETURN_CD == '0000') {
        // 인증 성공
        /*
        axios.get("/mock/api/member/url")
        .then((response) => {
          if(response.state == "01") {
            alert("이미 가입된 일반회원 아이디가 있습니다.");
          } if(response.state == "02") {
            alert("회원 탈퇴 후 30일이 경과되지 않아 재가입할 수 없습니다.");
          } else {
            Router.push("/member/personalMemberInfo");
           } 
        });*/
        // 통신사별로 필요 테스트 하여 필요데이타 넘기기
        Router.push("/member/personalMemberInfo");
      } else {
        alert("인증에 실패하였습니다.");
        Router.push("/member/oneselfCertify");
      }
    }
    //let data = JSON.parse(resultdata);
    
  });

  const onHandleSearchClick = (e) => { //본인인증 click
    alert("이미 본인인증을 진행하였습니다."); 
  };
  return (
    <AppLayout>
      <div className="content-sec">
        <div className="member-sec-w">
          <div className="content-wrap member-steps">
            <div className="member-tit-area">
              <h3>일반회원 가입</h3>
            </div>
            <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={2} reverse={true} marginTop={59} /> 
          </div>
        </div>
        <div className="member-sec">
          <div className="content-wrap member-contents">
            <div className="member-tit-area">
              <h4>본인인증</h4>
              <p>안전한 회원가입을 위해 휴대폰 본인인증을 진행해 주세요.</p>
            </div>
            <Buttons align="center" marginTop={48}>
                <Button size="big" background="blue80" title="인증 진행" width={172} height={60} onClick={onHandleSearchClick} />
            </Buttons>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default withRouter(oneselfCertifyNew);

// https://github.com/iamport/iamport-react-example/blob/master/manuals/CERTIFICATION.md