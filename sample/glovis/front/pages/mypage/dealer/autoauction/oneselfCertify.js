import React, { useState, useRef, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import qs from 'qs';
import Router from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Steps from '@lib/share/items/Steps';
import RenderHelper from '@lib/share/render/helper';

import { SystemContext } from '@src/provider/SystemProvider';
import { auction_check_term } from '@src/dummy/terms';
import Certification from '@src/components/common/Certification';
import { selectMbInfo } from '@src/api/mypage/dealer/AuctionApi';

const nextPage = '/mypage/dealer/autoauction/memberInfo'

const oneselfCertify = ({query, mbCi}) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm, showLoginForm } = useContext(SystemContext);

  const formRef = useRef()
  const [show, setShow] = useState(false);
  const mbTpcd = useSelector((state) => state.member.mbTpcd);
  const [certData, setCertData] = useState({});

  const certify = (e) => {
    console.log('certify e : ', e);
    /*
    setCertData({
      successUrl: nextPage,
      failUrl: '/mypage/dealer/autoauction/oneselfCertify'
    });*/
    setShow(!show);
    //인증로직
    // Router.push(nextPage).then(()=> window.scrollTo(0,0))
  };


  const callback = async (e) => {
    showLoader()

    console.log('callback e : ', e);
    // setCertShow(false);
    for(let key in e){
      console.log('key ::::::::::::::: ', e[key])
    }

    if(e.RETURN_CD === '0000'){
        console.log("e.RETURN_CD : ", e.RETURN_CD)
        // 임시
        const mbCiO =  !e.LGD_AUTHSUB_CI ?  e.LGD_MOBILENUM+"TEMPCI" : e.LGD_AUTHSUB_CI
        const mbNmO =  !e.LGD_MOBILE_SUBAUTH_NAME ?  e.LGD_MOBILENUM+"이름" : e.LGD_MOBILE_SUBAUTH_NAME
        const mbHpPnEncO =  e.LGD_MOBILENUM

        if(mbCi !== mbCiO){
          showAlert('로그인 한 회원 정보와 일치하지 않습니다')
          return
        }

        formRef.current.querySelector('[name=mbCiO]').value = mbCiO
        formRef.current.querySelector('[name=mbNmO]').value = mbNmO
        formRef.current.querySelector('[name=mbBirth]').value = e?.LGD_MOBILE_SUBAUTH_BIRTH
        formRef.current.querySelector('[name=mbHpPnEncO]').value = mbHpPnEncO
        formRef.current.submit()

        // await Router.push(nextPage + '?' + qs.stringify({
        //   mbCiO,
        //   mbNmO,
        //   mbHpPnEncO,
        // }), nextPage)

        // CST_MID: "GLOVIS"
        // LGD_VERSION: "JSP_NON-ActiveX_AuthOnly"
        // LGD_CUSTOM_USABLEPAY: "ASC007"
        // CST_PLATFORM: "service"
        // LGD_WINDOW_TYPE: "iframe"
        // LGD_TIMESTAMP: "20200414162210"
        // LGD_MOBILE_SUBAUTH_SITECD: "123456789abc"
        // LGD_RETURNURL: "http://10.25.44.131:8080/api/certification/certReturn.do"
        // LGD_BUYER: ""
        // LGD_HOLDCHECKYN: "Y"
        // LGD_BUYERSSN: ""
        // LGD_CUSTOM_SKIN: "red"
        // LGD_NAMECHECKYN: "N"
        // LGD_HASHDATA: "8faeba9d370f1176ddead530d632cb47"
        // LGD_MID: "GLOVIS"
        // LGD_RESPCODE: ""
        // LGD_RESPMSG: ""
        // LGD_PAYTYPE: "ASC007"
        // LGD_AUTHONLYKEY: "ENCRYPTED_1dAB5lVB6r909K5h/+rqTIC2C4oOsg0i/mlkBMaOJ5wbvcDDW8Kh677u6GsSXpydWCCD/+JhRHC6↵9DtblYWTrLs/2xxXF2GrLA9xwLLblda1DBEKwnaFBVh2/fNXHaEJSlAxJljecyDEwqJVoMekMn2x↵B4DbJY6yqg3Zj0ADpg9jLr9MgHpBq3rx18XoGSSeU39Ipz1rIK83V/jCFIJQgU9mZ/eQS+5trOgZ↵z0K/i64Y/aGAe8D57r1ergrN8vUwHe1MQALCzdc6ILcId3ix8QcD2ZDSrdSqjq5skMXv91CW9xil↵boLDt7xJ99sfJ2NlKtuY8+1tOumFqLpVF5//V7+c1o4jsGT/G7GfBINTHTUU7hTlno3BiTM5TUyD↵0fmRCRuhhKN25dGJo1YXC8V/Soba1ZQtbkkAv5Za51MafdAe2HBdNaIvvO0TEfE7EVA+OVHz/QGE↵cqCfGZyzecJjGW+kFfAnFJ2X+4AquT7u9SdDzgtKQSvPOWrT84QyRkR0zsoX6NtMOa3O9tMZqMIe↵A7e3XQbj2P/6jZxoGLriaWDwFVirWbo9z8DsxrqOgJ9h+o4v1mtIQhPXdE5jQlOFoZtYUoV0T3tb↵Jv271rWQe5OnJoHpr8t5XyG3ljq7KCt3i0jJ8FwSMglefr+qltbwmqCi6i/3S08gWh9B92KhBDg+↵nwz1TGHKgdYRTdivQmds58NsLg9taQ6VXkebGw9LEOdE0JgMjTCEYp3ZnP7pYRlQePOQqiGfFWRl↵Z9cJOmEGFl3i7qMMRF2KWbAjUzHuRpSCKuszWERAe5wWkkbZ8VNarn8Ui9l/79gmxP3Sh8534dfJ↵o70qiU4+M94pj5gD6wdofIBOMxEUJ+ht+YFTdZjFvZlHKZTOoXd/KkRgRU+R0UQnv9rYYqyogRmt↵6eq7eZS5ifVICdyv+6UEgPEDHqvkzG3CVzepHMi7dPATNi8D/jvNWTV/w1OuXcUWNgCYjM4DyUXI↵W3RHkHq/bwRP/dCGgStG8PwAZa6otxcZwO3dluE8x+0ti/lqui9AUz/dyVJ9pO9xmIj7sE4m6jPH↵mkU9+WYx+Ch0TWilxIC4fOZPY/8G1lPjzPMCYdxBZWU0cWrfL/ecjmvoMDFzbaHj0Dzi/vT4nTNH↵OAfCKe/rc2Nfp5tHTqMj9P5iCYaxw6m0UWNwkNHZeVXtVBnKhXcPidy2xAXF0fVKh8JfXnBvaWdl↵zOkK6O64cSICvWSPJsc6TUJzDcsJIBn5uMDGM4w7rgAS8/BP307MzPn+lH3stOTqNtkY1biH9VTE↵YOUkcbC1MPQlWSUDsyMjTREV0T7s5gpiqzjNfJvq94yzk7W5MQEIVzYV84CsupaIIsLq/GtACiMg↵BbIXHDixzqpXzrKwdUlxod2h5VXviqpWqQ8yRquBPFy1uDP+hzOFX+uEdS0DCudMSdTLlyIszFxV↵ofSswYIewxLLkH7RzCBAzBkFCz06nfMMg3eUiHuprx4QvXeqMHM83cIyx1cQdeez0IaB78P7F1To↵mpSbi+AtHJ077fHw3k0kMXhSfq3zDQFyu9PBvy7JESRxC+scrBFcQ+YGnr8tXepNCoqUaXqdA2tR↵KYc1Umx/TnWc+HPe1kmd6y2MgTRlijMMLqgR3ayX1Cn22LL0A/aqfBaCfyRdto4dxGtlAG6pWQjf↵h69vwit16lOwm/CyDu9JuLY9ZbVDcvbLcTECusGBPIAqVbSA7OrqUcSJYjn/dte+Q0ZeJSBHREsT↵B/Y2niECJpAG0ftyWm5iVNHXZS9Tsz+IhcX2UeINXiQDUxqG4M93aSJXdGnp1SCgKGUL5kHEh5CJ↵Svef5a/bzbe6ACUKfNwYvgJYkQhJzGjBOTHUtDN6BjlYWRyYXphJw/j6Jrx33sLBT5jZ0tmGW6cR↵cteSjw1ytr5iMobS+pACmTk4IvbU4WQwWausWKDb/MW0zhDAXfvhrkM2VB5USkOXt7XsiYOx4Bpy↵+/7lQGx6WCesVlbexcoLTu8kPxTQZC6x9VrcHWJBljdYo0+o1bXK8l1WYf0ZAUhLzYmgypmDCfSS↵eNnq0sB4hD3eXzIsa1G4PtS2hI0iYI1Ljy5BBwa/GDOafAKnr1muEMcxwt8xEmIkOp/zbwXhPAp3↵SWGJgRoG10yMIvq9nhsNFXH2LszRlRM7LZet531eIuVJcMWKyz2hUqqk6iiJOiSOWS3UAjpUmU8E↵IN7w+pVsyhlJu+MzmYAHDNLUE8j0Cls9xnRBbgDBbBjbngPbbw5v1NmGlrEl1nuJBzgipnFkFO7Z↵7pTPVybhY5gTc2RnSfMjQgEMWjdX78pVDrOGRi1aEfu50nzUKJv8zozEVFTzHjBxop1pDDSj9XNW↵i219sIceSZB1SgoRLNgVCC+0lH7p8Ou748rlshAzzT/VY7AZPQdN22ROiY8Nu9/R4D1GZnwAl+oq↵ylVW66fWj0kmS1jl4iw3oExTGVyAYisGBs02TDZvHlXkMXxxArJqoKtEQsB3GhTZhpTDnz1dRt2v↵9hwvS9Ic5SQECz0/QBeN/5dWP2J7rf2Qh7JFc6WyJto7Lolfk6tx9O0+1ywkLyOfEf8CHLnliVOp↵/FSmBi79sDIdC6wE4FYM8w6pHTOGARscMX+lUVAy"
        // SUCCESS_URL: ""
        // FAIL_URL: ""
        // STATUS_INFO: "true"
        // RETURN_MSG: "본인확인성공"
        // RETURN_CD: "0000"
        // LGD_MOBILENUM: "01050544147"
        // LGD_AUTHSUB_CI: "2x/y/R55f0btFvOZtuP9w1KbqXh1CNpGxIegV4SjgcyxZlDeAeVXk5NUZYXF+iS5stQor5Eyyi5y1guFhpqHxw=="
        // LGD_AUTHSUB_DI: "MC0GCCqGSIb3DQIJAyEAsfxhC/s3izlKVnTVJ4lOcXypgXVvc9fsnNG1xt9He0Y="
        // LGD_MOBILE_SUBAUTH_NAME: "최승희"
        // jsessionid: "FA8749D1D8B49A74A0591C80CB1A24A1"
    } else {
      showAlert('인증 실패하였습니다')
    }
    hideLoader()
  };

  useEffect(() => {
    if(query?.errorMsg){
      showAlert(query?.errorMsg)
    }
  }, [])

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        <div className="mypage-state-sec">
          <div className="tabmenu tp1">
            <ul className="ui-tab col-2">
              <li className="on tabTitle1">
                <Link href="/mypage/dealer/autoauction/memberGuide">
                  <a>경매회원안내</a>
                </Link>
              </li>
              <li className="tabTitle2">
                <Link href="/mypage/dealer/autoauction/currentState">
                  <a>경매장 이용 현황</a>
                </Link>
              </li>
            </ul>

            <div className="auction-membership-steps bg-blue80">
              <Steps type={2} contents={['약관동의', '본인인증', '개인정보입력', '회원가입완료']} active={2} />
            </div>

            <div className="auction-membership-certified">
              <h5 className="h5-tit">휴대폰 본인 인증을 진행해주세요.</h5>
              <div className="ico-amc">
                <i className="ico-certify"></i>
              </div>
              <p className="tx-exp-tp5 tx-red80">* 입력하신 회원님의 개인정보는 본인인증 이외의 목적으로 활용하지 않습니다.</p>
            </div>

            <Buttons align="center" marginTop={48}>
              <Button size="big" background="blue80" title="휴대폰 본인인증" width={223} height={60} buttonMarkup={true} onClick={certify} />
            </Buttons>

            {/* <button onClick={() => {
              formRef.current.querySelector('[name=mbCiO]').value = 'abcdefg'
              formRef.current.querySelector('[name=mbNmO]').value = '공일삼'
              formRef.current.querySelector('[name=mbBirth]').value = '900812'
              formRef.current.querySelector('[name=mbHpPnEncO]').value = '01011112222'
              formRef.current.submit()
            }}>임시링크</button> */}

            <Certification data={certData} show={show} callback={callback} />

            <form ref={formRef} action={nextPage} method="POST" >
              <input type="hidden" name="mbCiO" />
              <input type="hidden" name="mbNmO" />
              <input type="hidden" name="mbBirth" />
              <input type="hidden" name="mbHpPnEncO" />
            </form>
            
          </div>
        </div>
      </div>
    </AppLayout>
  );
};


oneselfCertify.getInitialProps = async (http) =>{
  const helper = new RenderHelper(http);
  const { url, accessToken, query } = helper;
  if(!accessToken){
      helper.redirect('/login' + '?' + qs.stringify({url}))
  }

  const { data } = await selectMbInfo().then((res) => res?.data);
  console.log("oneselfCertify.getInitialProps ::::::: -> data", data)

  return {
    query, mbCi:data[0]?.mbCi
  }
}

export default oneselfCertify;
