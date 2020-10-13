/**
 * Trade-in 본인인증
 * @fileOverview 본인인증
 * @author 김지현
 */
import FrameLayout from '@src/components/layouts/FrameLayout';
import React, { useEffect, useState,useCallback } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { apiUrl } from '@src/utils/HttpUtils';
import { aixosGetCert, axiosGet } from '@src/utils/HttpUtils';

const tradeincerti = (query) => {
    //console.log(query.query.gno);
    const [gno,setGno] = useState(query.query.gno);

    const hasMobile = useSelector((state) => state.common.hasMobile);

    if(hasMobile){
        const [certShow,setCertShow] = useState(false);

        const certCallback = (e) => { //본인인증 callback
            console.log("callback ee >>> ", e.data);
            console.log("callback ee >>> ", typeof e.data);
            let certPop = document.getElementById("certPop");
            setGno(gno);
            setCertShow(false);

            aixosGetCert('/api/tradein/certi.do?gNo='+gno+'&inhanoCi='+e.data.LGD_AUTHSUB_CI+'&lgdRespcode='+e.data.RETURN_CD+'&lgdRespmsg='+encodeURIComponent(e.data.RETURN_MSG))
                .then(({ data }) => {
                   console.log(data);
                   if(data.statusinfo.returncd == "SUCCESS") {
                       console.log("성공")
                   }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        useEffect(() => {
            window.addEventListener('message', certCallback);
        }, []);

        const onClickCert = (e) => {
            e.preventDefault();
            setCertShow(true);
            const url = `${apiUrl}/api/certification/certModRequest.do`
            console.log("url:::::::::", url)

            
            let iframe = document.getElementById("iframe");
            if(iframe == null) {
                iframe = document.createElement("Iframe");
                iframe.setAttribute("id", "iframe");
                iframe.setAttribute("name", "iframe");
                iframe.setAttribute("width", "100%");
                iframe.setAttribute("height", "100%");
            }
            let form = document.getElementById("certificationPop");
            if(form == null) {
                form = document.createElement('form');
                form.setAttribute("id", "certificationPop")
                
            }

            let certPop = document.getElementById("certPop");
            certPop.appendChild(iframe);
            certPop.appendChild(form);

            console.log(url);
            form.action = url;
            form.target = 'iframe';
            form.method = 'post';
            form.submit();
        };    

        return (
            <>
                <FrameLayout>
                    <div className="lmsconfirm-area">
                    <p>접수자와 신차구매자 일치 여부<br />확인을 위해 아래 '본인인증 요청' 버튼을 눌러<br />본인 인증을 진행해주세요.</p>
                    <span>본인인증 완료 시, 차량 매각 대금은 고객님의<br />신차 구매 가상계좌로 입금됩니다.</span>
                    </div>
                    <div id="certPop" style={{display: certShow? 'inline-block':'none',position:'fixed',zIndex:1,left:0,top:0,width:'100%',height:'100%',overflow:'auto'}}></div>
                    <Button className="fixed" size="full" background="blue80" title="본인인증 요청" onClick={onClickCert} />
                </FrameLayout>
            </>
        );
    } else{
        const [certShow,setCertShow] = useState(false);

        const certCallback = (e) => { //본인인증 callback
            console.log("callback ee >>> ", e.data);
            console.log("callback ee >>> ", typeof e.data);
            let certPop = document.getElementById("certPop");
            setGno(gno);
            setCertShow(false);

            aixosGetCert('/api/tradein/certi.do?gNo='+gno+'&inhanoCi='+e.data.LGD_AUTHSUB_CI+'&lgdRespcode='+e.data.RETURN_CD+'&lgdRespmsg='+encodeURIComponent(e.data.RETURN_MSG,"UTF-8"))
                .then(({ data }) => {
                    console.log(data);
                    if(data.statusinfo.returncd == "SUCCESS") {
                        console.log("성공")
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        useEffect(() => {
            window.addEventListener('message', certCallback);
        }, []);

        const onClickCert = (e) => {
            e.preventDefault();
            setCertShow(true);
            const url = `${apiUrl}/api/certification/certRequest.do`
            console.log("url:::::::::", url)

            
            let iframe = document.getElementById("iframe");
            if(iframe == null) {
                iframe = document.createElement("Iframe");
                iframe.setAttribute("id", "iframe");
                iframe.setAttribute("name", "iframe");
                iframe.setAttribute("width", "100%");
                iframe.setAttribute("height", "100%");
            }
            let form = document.getElementById("certificationPop");
            if(form == null) {
                form = document.createElement('form');
                form.setAttribute("id", "certificationPop")
                
            }

            let certPop = document.getElementById("certPop");
            certPop.appendChild(iframe);
            certPop.appendChild(form);

            console.log(url);
            form.action = url;
            form.target = 'iframe';
            form.method = 'post';
            form.submit();
        };    
        
       

        return (
            <>
                <Buttons align="center" marginTop={20}>
                    <div id="certPop" style={{display: certShow? 'inline-block':'none',position:'fixed',zIndex:1,left:0,top:0,width:'100%',height:'100%',overflow:'auto'}}></div>
                    <Button size="mid" background="blue80" radius={true} title="휴대폰 본인인증" width={126} height={40} fontWeight={500} onClick={onClickCert} nextLink={true}  />
                </Buttons>
            </>
        );
    }

}

tradeincerti.getInitialProps = async http => {  
    const { req } = http;
    const query = req?.query || http?.query || '';
    return {
        query
    }; 
  
}

export default tradeincerti;