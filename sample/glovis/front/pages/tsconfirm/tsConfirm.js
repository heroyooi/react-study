import React, { useEffect, useState } from 'react';
import * as http from '@src/utils/HttpUtils';

const  tsConfrim = () => {
  const [hashValue, setHashValue] = useState('');
  const [timeStamp, setTimeStamp] = useState('');
  const [svcCodeArr, setSvcCodeArr] = useState('');

  // useEffect(() => {
  //   http.axiosGet(`https://testautobell.glovis.net/api/ts/data/getTsConfirmValue.do?carNo=${carNo}&userNm=${name}`).then((res) => {
  //     const result = res.data.data;
  //     setHashValue(result.hashValue);
  //     setTimeStamp(result.timeStamp);
  //     setSvcCodeArr(result.svcCodeArr);
  //   })
  // }, []);

  const getHash = () => {
    http.axiosGet(`https://testautobell.glovis.net/api/ts/data/getTsConfirmValue.do?carNo=${carNo}&userNm=${name}`).then((res) => {
      const result = res.data.data;
      setHashValue(result.hashValue);
      setTimeStamp(result.timeStamp);
      setSvcCodeArr(result.svcCodeArr);
    })
  }

  let popup = '';
  //form submit
  const onsubmit =(e) => {
    e.preventDefault();
    const form = document.querySelector('#provideHashFromUnifixed');

    if (popup) {
      console.log(popup);
      return false;
    } else {
      popup = window.open("", "privde", "height=0, width=0");
      console.log(popup);
      form.target = "privde";
      form.submit();
    }
  }

  //인증 팝업 닫힐 때
  const timer = setInterval(() => {
    if (popup && popup.closed) {
      console.log('closed');
      popup = null;
      clearInterval(timer);
    }
  }, 1000);

  const [name, setName] = useState('');
  const [carNo, setCarNo] = useState('');

  const handleCar = (e) => {
    setCarNo(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="content-wrap">
      <br />
      <br />T E S T<br />
      <br />
      HASH : {hashValue}
      <hr />
      <form method="post" action="https://car365.go.kr/aio365/provide/ProvideContent.do" id="provideHashFromUnifixed" name="provideHashFromUnifixed" acceptCharset="euc-kr">
        <input type="hidden" id="hashValue" name="hashValue" value= {hashValue} />
        <input type="hidden" id="timeStamp" name="timeStamp" value= {timeStamp} />
        <input type="hidden" id="svcCodeArr" name="svcCodeArr" value= {svcCodeArr} />
        <input type="hidden" id="svcType" name="svcType" value= "Y" />
        <input type="hidden" id="carOwner" name="carOwner" value= {name} />
        <input type="hidden" id="carRegNo" name="carRegNo" value= {carNo} />
        <input type="hidden" id="returnURLA" name="returnURLA" value= {`https://testautobell.glovis.net/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${hashValue}&recCode=A`}/>
        <input type="hidden" id="returnURLD" name="returnURLD" value={`https://testautobell.glovis.net/api/ts/data/getSuccesTsCompInfo.do?hashvalue=${hashValue}&recCode=D`}/>

        <div style={{marginTop:30}}>
          <em>이름 : </em>
          <input type="text" value={name} disabled={false} readOnly={false} onChange={handleName} />
          <hr />
          <em>차량번호 : </em>
          <input type="text" value={carNo} disabled={false} readOnly={false} onChange={handleCar} />
          <hr />
          <button type="button" className="btn-base radius line-black bg-box tx-black" onClick={getHash}>
            해시
          </button>
          <hr />
          <button type="button" className="btn-base radius line-black bg-box tx-black" onClick={(e) => onsubmit(e)}>
            차량소유인증
          </button>
          <hr />
        </div>
        <span>해시 값 획득 후 차량 소유 인증 진행</span>
      </form>
    </div>
  )

};

tsConfrim.getInitialProps = async (http) => {
  const { reduxStore, req } = http;
  const query = req?.query || http?.query || '';

  return {
    query
  };
}

export default tsConfrim;