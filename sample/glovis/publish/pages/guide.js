import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

import { check1_list, check2_list, radio_basic, radio_group, car_list, select1_list, select2_list, select3_list, chartData, dataProvider } from '@src/dummy'

import { LineSeries, BarSeries, AreaSeries, ConvertData } from '@src/utils/ChartUtils'
import { ColorList } from '@src/utils/ColorUtil'

import CheckBox from '@lib/share/items/CheckBox'
import CheckBoxGroup from '@lib/share/items/CheckBoxGroup'
import CheckBoxItem from '@lib/share/items/CheckBoxItem'
import RadioGroup from '@lib/share/items/RadioGroup'
import SelectBox from '@lib/share/items/SelectBox'
import Counter from '@lib/share/items/Counter'
import Input from '@lib/share/items/Input'
import TreeCheckCount from '@lib/share/items/TreeCheckCount'

import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'

import MenuItem from '@lib/share/menu/MenuItem'
import MenuTitle from '@lib/share/menu/MenuTitle'
import MenuCont from '@lib/share/menu/MenuCont'

import SlideBanner from '@src/components/common/banner/SlideBanner'
import BannerItem from '@src/components/common/banner/BannerItem'

import DoughnutChart from '@lib/share/chart/DoughnutChart'
import LineChart from '@lib/share/chart/LineChart'
import BarChart from '@lib/share/chart/BarChart'
import MixChart from '@lib/share/chart/MixChart'
import DynamicChart from '@lib/share/chart/DynamicChart'

import InputRange from 'react-input-range'

import { api_list } from '@src/dummy/guide'

import GuideApi from '@lib/share/guide/GuideApi'

import animateScrollTo from 'animated-scroll-to'
import Prism from 'prismjs'
import classNames from "classnames/bind"
import SlideAnimate from '@lib/share/items/SlideAnimate'
import ImgUploadItem from '@lib/share/items/ImgUploadItem'

const Guide = () => {
  // 체크박스
  // const createCheckBox1 = () => {
  //   let checkArr = []
  //   check1_list.map((item, index) => {
  //     checkArr.push(<CheckBox key={item.id} id={item.id} title={item.title} checked={item.checked} disabled={item.disabled} />)
  //   })
  //   return checkArr
  // }
  
  // 체크박스(모두 체크)
  // const [isChecked, setIsChecked] = useState(false)
  // const [checkList, setCheckList] = useState([true,true,false,false])
  // const handleCheckAll = useCallback((e) =>{
  //   setIsChecked(!isChecked)
  //   e.target.checked
  //     ? setCheckList([true,true,true,true])
  //     : setCheckList([false,false,false,false])
  // },[isChecked,checkList])
  // const handleCheckItem = useCallback((id) => {
  //   const idx = check2_list.findIndex(check2_list => check2_list.id === id);
  //   let tempCheck = [...checkList];
  //   tempCheck[idx] = !tempCheck[idx];
    
  //   setIsChecked(tempCheck[0] && tempCheck[1] && tempCheck[2] && tempCheck[3])
  //   setCheckList(tempCheck)
  // },[isChecked,checkList])

  // 라디오 버튼
  const [isValue, setIsValue] = useState(1)
  const handleRadioChange = (e) => {
    setIsValue(Number(e.target.value))
  }

  // 셀렉트박스
  const onChangeHandler = () => {
    console.log('첫번째 select 값이 선택되어졌음 !')
  }

  // 팝업
  const [popShow, setPopShow] = useState(false)
  const [rodalShow, setRodalShow] = useState(false)
  const [rodalType, setRodalType] = useState('zoom')
  const popPopupHandler = () => () => {
    setPopShow(true)
  }
  const rodalPopupHandler = (type) => {
    setRodalShow(true)
    setRodalType(type)
  }
  const modalCloseHandler = (flag) => {
    setPopShow(flag)
    setRodalShow(flag)
  }

  // 다이나믹 차트
  const createChartHandler = () => {
		let chart = []
		let data = ConvertData(chartData, "stime", ["targetQuantity","productionQuantity"])
		let seriesList = [
			LineSeries("목표판매량", data["targetQuantity"], "y-axis-1", ColorList(1), "left"),
			BarSeries("판매량", data["productionQuantity"], "y-axis-2", ColorList(3), "right"),
		]
		let style = {
			width: "500px",
		}

		chart.push(<DynamicChart key="test" serieslist={seriesList} xFieldList={data["stime"]} style={style} horizontalGridLine={false}/>)

		return chart
  }
  
  // 유효성 체크
  const useInput = (initValue = null) => {
    const [value, setValue] = useState(initValue)
    const handler = useCallback((e) => {
      setValue(e.target.value)
    }, [])
    return [value, handler]
  }

  const [id, onChangeId] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')
  const [termChecked, setTermChecked] = useState(false)
  const [idError, setIdError] = useState(false)
  const [nicknameError, setNicknameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
    setTermChecked(e.target.checked)
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    id === '' ? setIdError(true) : setIdError(false);
    nickname === '' ? setNicknameError(true) : setNicknameError(false);
    password === '' ? setPasswordError(true) : setPasswordError(false);
    !termChecked ? setTermError(true) : setTermError(false);
    console.log({id, nickname, password});
  }, [id, nickname, password, termChecked])

  // InputRange
  const [rangeValue, setRangeValue] = useState({ min: 2, max: 10 })
  const handleInputRange = useCallback(value => setRangeValue(value));

  // Prism를 위한 코드
  const useCodeView = (initValue) => {
    const [code, setCode] = useState(initValue)
    const handler = (e) => {
      setCode(!code)
      animateScrollTo(codeOffets.current[e.target.dataset.id])
    }
    return [code, handler]
  }
  const [codeType1, handleCodeType1] = useCodeView(false) // 체크박스
  const [codeType2, handleCodeType2] = useCodeView(false) // 체크박스 (모두 체크)
  const [codeType3, handleCodeType3] = useCodeView(false) // 라디오 버튼
  const [codeType4, handleCodeType4] = useCodeView(false) // 셀렉트 박스
  const [codeType5, handleCodeType5] = useCodeView(false) // 상품 목록
  const [codeType6, handleCodeType6] = useCodeView(false) // 상품 슬라이드
  const [codeType7, handleCodeType7] = useCodeView(false) // 팝업
  const [codeType8, handleCodeType8] = useCodeView(false) // 달력
  const [codeType9, handleCodeType9] = useCodeView(false) // 카운터
  const [codeType10, handleCodeType10] = useCodeView(false) // 탭
  const [codeType11, handleCodeType11] = useCodeView(false) // 필터
  const [codeType12, handleCodeType12] = useCodeView(false) // 인풋
  const [codeType13, handleCodeType13] = useCodeView(false) // 유효성 체크

  const codeOffets = useRef([])
  useEffect(() => {
    let codeList = Array.from(document.getElementsByClassName('guide-tit'))
    codeList.map((code, index) => {
      codeOffets.current[index] = code.offsetTop
    })
  }, [useCodeView])

  const [toogleState, setToogleState] = useState(false)
  const slideToggle = () => {
    setToogleState(!toogleState)
  }

  const uploadList1 = (files) =>{
    console.log("1번 리스트 : " + files[0])
    console.log(files)
  }

  const uploadList2 = (files) =>{
    console.log("2번 리스트 : " + files)
  }
  
  const [query, setQuery] = useState("");
  const apiUrl = `https://static.priviatravel.com/UPLOAD//2019/10/04/124795/5b667a37-446d-4eeb-887b-cfef99564d67`;

  // 후기 설정
  const SetEval = ({score=0}) => {
    if (score === 0) {
      return <span>☆☆☆☆☆<em>0.0/5.0</em></span>
    } else if (score === 1) {
      return <span>★☆☆☆☆<em>1.0/5.0</em></span>
    } else if (score === 2) {
      return <span>★★☆☆☆<em>2.0/5.0</em></span>
    } else if (score === 3) {
      return <span>★★★☆☆<em>3.0/5.0</em></span>
    } else if (score === 4) {
      return <span>★★★★☆<em>4.0/5.0</em></span>
    } else if (score === 5) {
      return <span>★★★★★<em>5.0/5.0</em></span>
    }
  }

  const Eval = ({active = false}) => {
    const [isActive, setIsActive] = useState(active);
    const handleCheck = useCallback((e) => {
      setIsActive(isActive => !isActive);
    }, [isActive]);
    return <i onClick={handleCheck}>{isActive ? <>★</> : <>☆</>}</i>
  }

  return (
    <div className="guide-wrap" style={{marginTop:'30px'}}>
      <Link href="/mypage/dealerSell01"><a target="_blank">Context API 예제</a></Link>
      <ul>
        <li>1. 최종 판매 금액에 만족하시나요?<Eval /><Eval /><Eval /><Eval /><Eval /></li>
        <li>1. 최종 판매 금액에 만족하시나요?<SetEval /></li>
        <li>2. 구매 딜러의 서비스에 만족하시나요?<SetEval score={4} /></li>
        <li>3. 주변분들에게 구매 딜러를 추천 의향은 어느 정도 되시나요?<SetEval /></li>
        <li>4. 이용후기를 간단하게 한 줄로 남겨주세요.</li>
      </ul>
      {/* fileList={fileList} */}
      <div>
        <ImgUploadItem apiUrl={apiUrl} uploadList={uploadList1} /> {/* fileList는 file객체를 배열로 제공*/}
        <ImgUploadItem maxLength={10} uploadList={uploadList2} />
      </div>
      <button type="button" onClick={slideToggle}>슬라이드 토글 버튼</button>
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

      <h3 className="guide-tit">체크박스 (모두 체크) <span className={codeType2 ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType2}  data-id={1}></span></h3>
      <div className="guide-inner">
        {/* <CheckBoxAll>
          <CheckBox id="check2_all" title="모두 체크" parentChecked={isChecked} onChange={handleCheckAll} />
          <CheckBoxItem />
        </CheckBoxAll> */}
        {/* <CheckBox id="check2_all" title="모두 체크" parentChecked={isChecked} onChange={handleCheckAll}/>
        <CheckBoxAll dataList={check2_list} checkList={checkList} onChange={handleCheckItem}/> */}
        <CheckBoxGroup agree_list={[
          { id: 'chk-agree-1', title:'개인정보 수집/이용 동의(필수)', checked: true },
          { id: 'chk-agree-2', title:'고유식별정보 수집/이용 동의(필수)', checked: true },
          { id: 'chk-agree-3', title:'개인정보처리의 위탁에 관한 사항(필수)', checked: false },
          { id: 'chk-agree-4', title:'마케팅 활용동의(선택)', checked: true },
          { id: 'chk-agree-5', title:'개인정보 제3자 제공에 관한 사항(선택)', checked: true },
        ]} />
      </div>

      <h3 className="guide-tit">유효성 체크 <span className={codeType13 ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType13} data-id={12}></span></h3>
      <div className="guide-inner">
        <form onSubmit={handleSubmit} style={{width: '250px'}}>
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
              <span className="btn-base bb-st5"><button type="submit">회원가입</button></span>
            </li>
          </ul>
        </form>
      </div>
      
      <h3 className="guide-tit">차트</h3>
      <div className="guide-inner">
        <h4 className="guide-stit">도넛 차트</h4>
        <DoughnutChart width={500} dataProvider={[30,90,60]} />

        <br /><br />

        <h4 className="guide-stit">라인</h4>
        <LineChart width={500} />

        <br /><br />

        <h4 className="guide-stit">막대</h4>
        <BarChart width={500} dataProvider={[65, 59, 80, 81, 56, 55, 40]} />

        <br /><br />

        <h4 className="guide-stit">믹스</h4>
        <MixChart width={500} />

        <br /><br />

        <h4 className="guide-stit">다이나믹</h4>
        {createChartHandler()}
      </div>

      <h3 className="guide-tit">Input Range</h3>
      <div className="guide-inner">
        <InputRange
          maxValue={20}
          minValue={0}
          value={rangeValue}
          onChange={handleInputRange} />
      </div>
    </div>
  )
}

export default Guide