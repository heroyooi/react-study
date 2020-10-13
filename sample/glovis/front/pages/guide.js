import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chartData } from '@src/dummy';
import { LineSeries, BarSeries, ConvertData } from '@src/utils/ChartUtils';
import { ColorList } from '@src/utils/ColorUtil';
import CheckBoxGroup from '@lib/share/items/CheckBoxGroup';
import Input from '@lib/share/items/Input';
import SlideAnimate from '@lib/share/items/SlideAnimate';

const Guide = () => {
  // 라디오 버튼
  const [isValue, setIsValue] = useState(1);
  const handleRadioChange = (e) => {
    setIsValue(Number(e.target.value));
  };

  // 셀렉트박스
  const onChangeHandler = () => {
    console.log('첫번째 select 값이 선택되어졌음 !');
  };

  // 팝업
  const [popShow, setPopShow] = useState(false);
  const [rodalShow, setRodalShow] = useState(false);
  const [rodalType, setRodalType] = useState('zoom');
  const popPopupHandler = () => () => {
    setPopShow(true);
  };
  const rodalPopupHandler = (type) => {
    setRodalShow(true);
    setRodalType(type);
  };
  const modalCloseHandler = (flag) => {
    setPopShow(flag);
    setRodalShow(flag);
  };

  // 다이나믹 차트
  const createChartHandler = () => {
    let chart = [];
    let data = ConvertData(chartData, 'stime', ['targetQuantity', 'productionQuantity']);
    let seriesList = [LineSeries('목표판매량', data['targetQuantity'], 'y-axis-1', ColorList(1), 'left'), BarSeries('판매량', data['productionQuantity'], 'y-axis-2', ColorList(3), 'right')];
    let style = {
      width: '500px'
    };

    chart.push(<DynamicChart key="test" serieslist={seriesList} xFieldList={data['stime']} style={style} horizontalGridLine={false} />);

    return chart;
  };

  // 유효성 체크
  const useInput = (initValue = null) => {
    const [value, setValue] = useState(initValue);
    const handler = useCallback((e) => {
      setValue(e.target.value);
    }, []);
    return [value, handler];
  };

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [termChecked, setTermChecked] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTermChecked(e.target.checked);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      id === '' ? setIdError(true) : setIdError(false);
      nickname === '' ? setNicknameError(true) : setNicknameError(false);
      password === '' ? setPasswordError(true) : setPasswordError(false);
      !termChecked ? setTermError(true) : setTermError(false);
      console.log({ id, nickname, password });
    },
    [id, nickname, password, termChecked]
  );

  // InputRange
  const [rangeValue, setRangeValue] = useState({ min: 2, max: 10 });
  const handleInputRange = useCallback((value) => setRangeValue(value));

  // Prism를 위한 코드
  const useCodeView = (initValue) => {
    const [code, setCode] = useState(initValue);
    const handler = (e) => {
      setCode(!code);
      animateScrollTo(codeOffets.current[e.target.dataset.id]);
    };
    return [code, handler];
  };
  const [codeType2, handleCodeType2] = useCodeView(false); // 체크박스 (모두 체크)
  const [codeType13, handleCodeType13] = useCodeView(false); // 유효성 체크

  const codeOffets = useRef([]);
  useEffect(() => {
    let codeList = Array.from(document.getElementsByClassName('guide-tit'));
    codeList.map((code, index) => {
      codeOffets.current[index] = code.offsetTop;
    });
  }, [useCodeView]);

  const [toogleState, setToogleState] = useState(false);
  const slideToggle = () => {
    setToogleState(!toogleState);
  };

  const uploadList1 = (files) => {
    console.log('1번 리스트 : ' + files[0]);
    console.log(files);
  };

  const uploadList2 = (files) => {
    console.log('2번 리스트 : ' + files);
  };

  const [query, setQuery] = useState('');
  // const apiUrl = `https://static.priviatravel.com/UPLOAD//2019/10/04/124795/5b667a37-446d-4eeb-887b-cfef99564d67`;
  return (
    <div className="guide-wrap" style={{ marginTop: '30px' }}>
      {/* fileList={fileList} */}
      {/* <div>
        <ImgUploadItem apiUrl={apiUrl} uploadList={uploadList1} />
        <ImgUploadItem maxLength={10} uploadList={uploadList2} />
      </div> */}
      <button type="button" onClick={slideToggle}>
        슬라이드 토글 버튼
      </button>
      <SlideAnimate toggle={toogleState}>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
        <p>내용</p>
      </SlideAnimate>
      {/* <h3 className="guide-tit">체크박스 <span className={codeType1 ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType1} data-id={0}></span></h3>
      <div className="guide-inner">
        {createCheckBox1()}
      </div> */}

      <h3 className="guide-tit">
        체크박스 (모두 체크) <span className={codeType2 ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType2} data-id={1}></span>
      </h3>
      <div className="guide-inner">
        {/* <CheckBoxAll>
          <CheckBox id="check2_all" title="모두 체크" parentChecked={isChecked} onChange={handleCheckAll} />
          <CheckBoxItem />
        </CheckBoxAll> */}
        {/* <CheckBox id="check2_all" title="모두 체크" parentChecked={isChecked} onChange={handleCheckAll}/>
        <CheckBoxAll dataList={check2_list} checkList={checkList} onChange={handleCheckItem}/> */}
        {/* <CheckBoxGroup
          agree_list={[
            { id: 'chk-agree-1', title: '개인정보 수집/이용 동의(필수)', checked: true },
            { id: 'chk-agree-2', title: '고유식별정보 수집/이용 동의(필수)', checked: true },
            { id: 'chk-agree-3', title: '개인정보처리의 위탁에 관한 사항(필수)', checked: false },
            { id: 'chk-agree-4', title: '마케팅 활용동의(선택)', checked: true },
            { id: 'chk-agree-5', title: '개인정보 제3자 제공에 관한 사항(선택)', checked: true }
          ]}
        /> */}
      </div>

      <h3 className="guide-tit">
        유효성 체크 <span className={codeType13 ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType13} data-id={12}></span>
      </h3>
      <div className="guide-inner">
        <form onSubmit={handleSubmit} style={{ width: '250px' }}>
          <ul className="form-list">
            <li>
              <Input type="text" placeHolder="아이디" id="userId" placeType={3} value={id} onChange={onChangeId} />
              {idError && <span className="valid">아이디를 입력하세요.</span>}
            </li>
            <li>
              <Input type="text" placeHolder="닉네임" id="userNickname" placeType={3} value={nickname} onChange={onChangeNickname} />
              {nicknameError && <span className="valid">닉네임을 입력하세요.</span>}
            </li>
            <li>
              <Input type="password" placeHolder="패스워드" id="userPassword" placeType={3} value={password} onChange={onChangePassword} />
              {passwordError && <span className="valid">패스워드를 입력하세요.</span>}
            </li>
            <li>
              {/* <CheckBox id="agree" title="약관에 동의합니다." onChange={onChangeTerm} /><br /> */}
              {termError && <span className="valid">약관에 동의하셔야 합니다.</span>}
            </li>
            <li className="center">
              <span className="btn-base bb-st5">
                <button type="submit">회원가입</button>
              </span>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Guide;
