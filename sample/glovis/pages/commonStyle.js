import { useState, useEffect, useRef, useCallback, useReducer, createContext } from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';
import 'moment/locale/ko';
// import 'moment/locale/en-gb';
import Prism from 'prismjs';
import InputRange from 'react-input-range';
import { CSSTransition } from 'react-transition-group';
import animateScrollTo from 'animated-scroll-to';
import classNames from "classnames/bind";
import Slider from 'react-slick';
import Calendar from 'rc-calendar';

import Tabs, { TabPane } from "rc-tabs";
import TabContent from "rc-tabs/lib/TabContent";
import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxGroup from '@lib/share/items/CheckBoxGroup';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import Radio from '@lib/share/items/Radio';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import FilterRange from '@lib/share/items/FilterRange';
import GuideModule from '@lib/share/guide/GuideModule';
import GuideApi from '@lib/share/guide/GuideApi';
import PreCode from '@lib/share/guide/PreCode';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';

import DatePicker from '@src/components/common/calendar/DatePicker';
import DynamicCategory from '@lib/share/items/DynamicCategory';
import CategoryItem from '@lib/share/items/CategoryItem';
import PageItem from '@lib/share/items/PageItem';
import Pagination from '@lib/share/items/Pagination';
import PageCont from '@lib/share/items/PageCont';
import Steps from '@lib/share/items/Steps';

import CarInfo from '@src/components/common/CarInfo';
import CarStatus from '@src/components/common/CarStatus';
import CarHistory from '@src/components/common/CarHistory';
import CarDetails from '@src/components/common/CarDetails';
import CarPicture from '@src/components/common/CarPicture';
import CarSignature from '@src/components/common/CarSignature';
import CarOptions from '@src/components/common/CarOptions';
import CarAddOption from '@src/components/common/CarAddOption';
import CheckColors from '@src/components/common/CheckColors';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import BannerItem from '@src/components/common/banner/BannerItem';

import MobFilterModel from '@src/components/common/MobFilterModel';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import Link from 'next/link';

import { numberFormat } from '@src/utils/CommonUtil';
import { car_list, car_list2, radio_basic, radio_basic_sml, radio_group, radio_group_sml, radio_disabled, radio_disabled_sml, radio_autobel_as, radio_pay, radio_guaranteed, state0, state1, state2, none_exist1, none_exist2, none_exist3, none_exist4, color, select1_list, dataProvider, car_gallery, textDummy, mCarList, mobDataProvider } from '@src/dummy';
import { api_list, menuState, reducer, CLICK_MENU } from '@src/dummy/guide';

import useScroll from '@lib/share/custom/useScroll';

// Components (Only Mobile)
import MobSelectBox from '@lib/share/items/MobSelectBox';

const CommonStyleGuide = () => {
  const hasMobile = useSelector((state) => state.common.hasMobile);

  // Event Handler (Only Mobile)
  const handleAgreeChange = useCallback((e) => console.log(+e.target.value), []);
  // Event Handler (Only Mobile) End

  // 버튼
  const handleClick = () => alert('onClick props가 설정된 버튼!')

  // 셀렉트 박스
  const handleChangeSelect = () => console.log('첫번째 select 값이 선택되어졌음 !')

  // 체크박스

  // Textarea
  const textareaChange = (e) => {
    console.log('textareaChange');
    console.log(e);
  }
  const textareaBlur = (e) => {
    console.log('textareaBlur');
    console.log(e);
  }
  const textareaFocus = (e) => {
    console.log('textareaFocus');
    console.log(e);
  }

  // 필터
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)
  const [isChecked4, setIsChecked4] = useState(false)
  const [isChecked5, setIsChecked5] = useState(false)
  const [isChecked6, setIsChecked6] = useState(false)
  const [filterCheck1, setFilterCheck1] = useState(false)
  const [filterCheck2, setFilterCheck2] = useState(false)
  const [filterCheck3, setFilterCheck3] = useState(false)
  const [yearRange, setYearRange] = useState({ min: 2011, max: 2015 })
  const [distanceRange, setDistanceRange] = useState({ min: 20000, max: 60000 })
  const [priceRange, setPriceRange] = useState({ min: 2750, max: 3000 })

  const handleCheck1 = useCallback(() => setIsChecked1(!isChecked1), [isChecked1])
  const handleCheck2 = useCallback(() => setIsChecked2(!isChecked2), [isChecked2])
  const handleCheck3 = useCallback(() => setIsChecked3(!isChecked3), [isChecked3])
  const handleCheck4 = useCallback(() => setIsChecked4(!isChecked4), [isChecked4])
  const handleCheck5 = useCallback(() => setIsChecked5(!isChecked5), [isChecked5])
  const handleCheck6 = useCallback(() => setIsChecked6(!isChecked6), [isChecked6])
  const handleChangeFilter1 = useCallback(() => setFilterCheck1(!filterCheck1), [filterCheck1])
  const handleChangeFilter2 = useCallback(() => setFilterCheck2(!filterCheck2), [filterCheck2])
  const handleChangeFilter3 = useCallback(() => setFilterCheck3(!filterCheck3), [filterCheck3])

  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)
  const [value3, setValue3] = useState(null)
  const [value4, setValue4] = useState(null)
  const [value5, setValue5] = useState(null)
  const [value6, setValue6] = useState(null)
  const handleSelect1 = useCallback((value) => {
    setValue1(value)
  }, [value1])
  const handleSelect2 = useCallback((value) => {
    setValue2(value)
  }, [value2])
  const handleSelect3 = useCallback((value) => {
    setValue3(value)
  }, [value3])
  const handleSelect4 = useCallback((value) => {
    setValue4(value)
  }, [value4])
  const handleSelect5 = useCallback((value) => {
    setValue5(value)
  }, [value5])
  const handleSelect6 = useCallback((value) => {
    setValue6(value)
  }, [value6])

  // 옵션 더보기
  const [carOptionMore1, setCarOptionMore1] = useState(false)
  const [carOptionMore2, setCarOptionMore2] = useState(false)
  const [carOptionMore3, setCarOptionMore3] = useState(false)
  const [carOptionMore4, setCarOptionMore4] = useState(false)
  const [colorOptionMore, setColorOptionMore] = useState(false)
  const handleCarOption1 = (e) => {
    e.preventDefault()
    setCarOptionMore1(!carOptionMore1)
  }
  const handleCarOption2 = (e) => {
    e.preventDefault()
    setCarOptionMore2(!carOptionMore2)
  }
  const handleCarOption3 = (e) => {
    e.preventDefault()
    setCarOptionMore3(!carOptionMore3)
  }
  const handleCarOption4 = (e) => {
    e.preventDefault()
    setCarOptionMore4(!carOptionMore4)
  }
  const handleColorOption = (e) => {
    e.preventDefault()
    setColorOptionMore(!colorOptionMore)
  }

  // 팝업
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
  const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false, true);
  const [rodalShow5, setRodalShow5, rodalPopupHandler5, modalCloseHandler5] = useRodal(false, true);
  const [rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6] = useRodal(false, true);
  const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, false);
  const [rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8] = useRodal(false, false);

  const closeAlertPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow7(false);
  }, []);
  const closeConfirmPopup = useCallback((e) => {
    e.preventDefault();
    setRodalShow8(false);
  }, []);

  // 모바일 팝업
  const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
  const closeMPop = useCallback((e) => {
    e.preventDefault();
    setMPop(false);
  }, []);

  // 풀사이즈 슬라이더 팝업 예시
  const [popupNav1, setPopupNav1] = useState(null)
  const [popupNav2, setPopupNav2] = useState(null)
  const popupSlider1 = useRef(null)
  const popupSlider2 = useRef(null)
  useEffect(() => {
    setPopupNav1(popupSlider1.current)
    setPopupNav2(popupSlider2.current)
  }, [])

  const NextArrow = ({ onClick }) => {
    return (<button type="button" className="btn-next" onClick={onClick}><span className="hide">다음</span></button>)
  }
  const PrevArrow = ({ onClick }) => {
    return (<button type="button" className="btn-prev" onClick={onClick}><span className="hide">이전</span></button>)
  }
  const ccc = (e) => {
    //console.log(e && e.format('YYYY-MM-DD HH:mm:ss'));
  }
  let settings_popup_slick = {
    infinite: true,
    draggable: true,
    touchMove: true
  }

  // 안심지수
  const [gradeValue, setGradeValue] = useState(null)
  const createGrade = () => {
    let gradeGage = -180;
    let gradeText = '';
    if (gradeValue === 'A') {
      gradeGage = 0;
      gradeText = '아주 좋음';
    } else if (gradeValue === 'B') {
      gradeGage = -45;
      gradeText = '좋음';
    } else if (gradeValue === 'C') {
      gradeGage = -90;
      gradeText = '보통';
    } else if (gradeValue === 'D') {
      gradeGage = -135;
      gradeText = '나쁨';
    } else if (gradeValue === 'E') {
      gradeGage = -180;
      gradeText = '아주 나쁨';
    }
    return (
      <>
        <div className="grade-range">
          <div className="circular-progress">
            <div className="track"></div>
            <div className="gage" style={{ transform: 'rotate(' + gradeGage + 'deg)' }}></div>
          </div>
        </div>
        <span className="circular-edge gray"></span>
        <span className="circular-edge blue"></span>
        <div className="bar-cover" style={{ transform: 'rotate(' + gradeGage + 'deg)' }}>
          <span className="bar"></span>
        </div>
        <span className="grade-num"><strong>{gradeValue}</strong>{gradeText}</span>
      </>
    )
  }
  useEffect(() => {
    setTimeout(() => { setGradeValue('B') }, 300)
  }, [])

  // 달력
  const now = moment()

  // 좌측 메뉴
  const [state, dispatch] = useReducer(reducer, menuState)
  const codeOffets = useRef([])
  let codeId;
  useEffect(() => {
    let codeList = Array.from(document.getElementsByClassName('guide-tit'))
    codeList.map((code, i) => codeOffets.current[i] = code.offsetTop - 65)
  })
  const handleMenu = (e) => {
    codeId = e.target.dataset.id
    dispatch({ type: CLICK_MENU, num: codeId })
    setTimeout(() => animateScrollTo(codeOffets.current[codeId]), 100)
  }

  // 버튼 이벤트 전달
  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, [isValue1]);

  // 모바일 팝업
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  useEffect(() => {
    let goComp = ''; // 가고 싶은 컴포넌트
    let menuCondition = state.isMenu.findIndex(x => x.property === goComp)
    let target = (menuCondition === -1) ? 0 : menuCondition
    setTimeout(() => {
      dispatch({ type: CLICK_MENU, num: target }) // 컴포넌트 메뉴명 활성화
      animateScrollTo(codeOffets.current[target]) // 컴포넌트 위치로 이동
    }, 500)
  }, []);

  // const { currentY } = useScroll()
  // useEffect(() => {
  //   for (let i=0; i<codeOffets.current.length; i++) {
  //     if (codeOffets.current[i]-65 < currentY && codeOffets.current[i+1]-65 >= currentY) {
  //       dispatch({type: CLICK_MENU, num: i})
  //     }
  //   }
  // }, [currentY])

  // Tab Type Scroll
  //const { currentY } = useScroll()

  if (hasMobile) {
    // bottom sheet button select
    const [dimm, setDimm] = useState(false);
    const [active, setActive] = useState(false);
    const handleOpenPop = useCallback((e) => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }, []);
    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      document.getElementsByTagName('html')[0].style.overflow = "auto";
    }, []);

    // 슬라이드 탭
    const [tabKey, setTabKey] = useState(1);
    const tabCallback = useCallback(key => {
      if (+key < 2) {
        setTabKey('first');
      } else if (+key >= 2 && +key < 5) {
        setTabKey(key);
      } else {
        setTabKey('last');
      }
    }, []);
    
    return (
      <div className="guide-wrap" id="wrap">
        <div className="guide-header">PUB-COMMON-STYLE <span>(Ver. 모바일)</span></div>
        <div className="guide-aside"></div>
        <div className="guide-cont">
          <GuideModule title="Button" id={0}>
            <div className="guide-inner">
              <div className="code-box" id="buttons">
                <h4 className="mb40">Buttons</h4>
                <Buttons align="right">
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="임시 저장" width={120} height={30} />
                  <Button size="sml" background="blue80" radius={true} title="다음" width={120} height={30} />
                </Buttons>

                <Buttons marginTop={20}>
                  <span className="step-btn-l">
                    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
                    <Button size="sml" background="blue20" color="blue80" radius={true} title="임시 저장" width={63} height={30} />
                  </span>
                  <span className="step-btn-r">
                    <Button size="sml" background="gray60" radius={true} title="입력" width={88} height={30} />
                  </span>
                </Buttons>

                <Buttons marginTop={20}>
                  <span className="step-btn-l">
                    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
                  </span>
                  <span className="step-btn-r">
                    <Button size="sml" background="blue80" radius={true} title="다음" width={120} height={30} />
                  </span>
                </Buttons>

                <Buttons align="center" marginTop={20}>
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
                  <Button size="sml" background="blue80" radius={true} title="다음" width={63} height={30} />
                </Buttons>

                <Buttons marginTop={20}>
                  <span className="step-btn-c">
                    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
                  </span>
                  <span className="step-btn-r">
                    <Button size="sml" background="blue80" radius={true} title="다음" width={63} height={30} />
                  </span>
                </Buttons>

                <Buttons align="center" className="full" marginTop={20}>
                  <Button size="sml" background="blue20" color="blue80" title="이전" height={30} />
                  <Button size="sml" background="blue80" title="다음" height={30} />
                </Buttons>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';`
              }</code>
              <code className="language-markup">{
                `
<Buttons align="right">
  <Button size="sml" background="blue20" color="blue80"  radius={true} title="임시 저장" width={120} height={30} />
  <Button size="sml" background="blue80" radius={true} title="다음" width={120} height={30} />
</Buttons>

<Buttons marginTop={20}>
  <span className="step-btn-l">
    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
    <Button size="sml" background="blue20" color="blue80" radius={true} title="임시 저장" width={63} height={30} />
  </span>
  <span className="step-btn-r">
    <Button size="sml" background="gray60" radius={true} title="입력" width={88} height={30} />
  </span>
</Buttons>

<Buttons marginTop={20}>
  <span className="step-btn-l">
    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
  </span>
  <span className="step-btn-r">
    <Button size="sml" background="blue80" radius={true} title="다음" width={120} height={30} />
  </span>
</Buttons>

<Buttons align="center" marginTop={30}>
  <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
  <Button size="sml" background="blue80" radius={true} title="다음" width={63} height={30} />
</Buttons>

<Buttons marginTop={20}>
  <span className="step-btn-c">
    <Button size="sml" background="blue20" color="blue80" radius={true} title="이전" width={63} height={30} />
  </span>
  <span className="step-btn-r">
    <Button size="sml" background="blue80" radius={true} title="다음" width={63} height={30} />
  </span>
</Buttons>`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4>Button Type</h4>
                <div className="app-down">
                  <i className="ico-app"></i>
                  <Button color="blue80" title="오토벨앱 다운로드" href="#" />
                </div>

                <MobSelectBox options={[
                  { id: 'm-radio1', value: 1, checked: true, disabled: false, label: '스마트', hasDetail: '/marketPrice/MarketSpecify' },
                  { id: 'm-radio2', value: 2, checked: false, disabled: false, label: '모던', hasDetail: '/marketPrice/MarketSpecify', price: 10000000 },
                  { id: 'm-radio3', value: 2, checked: false, disabled: false, label: '모던', num: 904 },
                ]} customButton={true} customButtonName="Custom - Select" customButtonHeight={56} areaClass="btn-v" />

                <Buttons align="center" marginTop={16}>
                  <Button size="full" background="blue80" radius={true} title="Button - Select" onClick={handleOpenPop} />
                </Buttons>

                <div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>
                <MobBottomArea active={active} isFixButton={true}>
                  <div className="inner search-cover">
                    <p className="tit1">
                      김현대님,
                    <span>
                        현대 오토벨만의 특별한 진짜 시세를 확인해보세요.<br />
                        1일 1회 무료조회 가능하며,<br />
                        이용권을 구매하시면 더 이용하실 수 있습니다.
                    </span>
                    </p>
                  </div>
                  <Button className="fixed" size="full" background="blue80" title="이용권 구매" height={56} href="pricingSearchNum" />
                </MobBottomArea>

              </div>
            </div>
          </GuideModule>
          <GuideModule title="Typography" id={1}>
            <div className="guide-inner">
              <div className="code-box">
                <h4>Title Type</h4>
                <div className="list-wrap">
                  <h3>list-wrap h3</h3>
                </div>

                <div className="float-wrap btn-s">
                  <h3 className="tit1">옵션</h3>
                  <Button size="sml" background="blue20" color="blue80" radius={true} title="초기화" width={50} />
                </div>

                <h3 className="tit2">h3.tit2</h3>
                <h4 className="tit2">h4.tit2</h4>
                <h4 className="tit3">h4.tit3</h4>
                <p className="tit1">p.tit1</p>
                <p className="tit2">p.tit2</p>

                <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이할 경우, 차량 검색을 이용해주세요.</p>
                <p className="tx-exp-tp5">&#8251; 자동차관리법 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</p>
                <p className="tx-exp-tp5"><span className="tx-black">&#8251; 자동차관리법 :</span> 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</p>

              </div>
            </div>
          </GuideModule>
          <GuideModule title="Menu" id={2}>
            <div className="guide-inner">
              <div className="code-box">
                <ul className="m-toggle-list">
                  <MenuItem>
                    <MenuTitle>Menu Title</MenuTitle>
                    <MenuCont>MenuCont</MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>Menu Title</MenuTitle>
                    <MenuCont>MenuCont</MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>Menu Title</MenuTitle>
                    <MenuCont>MenuCont</MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>Menu Title</MenuTitle>
                    <MenuCont>MenuCont</MenuCont>
                  </MenuItem>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
`
                }
              </code>
              <code className="language-markup">
                {
                  `<MenuItem>
<MenuTitle>Menu Title</MenuTitle>
<MenuCont>MenuCont</MenuCont>
</MenuItem>
<MenuItem>
<MenuTitle>Menu Title</MenuTitle>
<MenuCont>MenuCont</MenuCont>
</MenuItem>
<MenuItem>
<MenuTitle>Menu Title</MenuTitle>
<MenuCont>MenuCont</MenuCont>
</MenuItem>
<MenuItem>
<MenuTitle>Menu Title</MenuTitle>
<MenuCont>MenuCont</MenuCont>
</MenuItem>`
                }
              </code>
            </PreCode>
          </GuideModule>

          <GuideModule title="Pagination Menu" id={3}>
            <div className="guide-inner">Pagination Menu</div>
          </GuideModule>
          <GuideModule title="Steps" id={4}>
            <div className="guide-inner">
              <div className="code-box">
                <Steps type={1} contents={['Title1', 'Title2', 'Title3', 'Title4', 'Title5']} active={2} mode="stick" />
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <Steps type={2} contents={['Title1', 'Title2', 'Title3', 'Title4', 'Title5']} active={2} />
              </div>
            </div>
          </GuideModule>
          <GuideModule title="Icon" id={5}>
            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Large Icons</h4>
                <ul className="ico-list ico-large-wrap">
                  <li><i className="ico-confirm-big"></i></li>
                  <li><i className="ico-deliver-big"></i></li>
                  <li><i className="ico-refund-big"></i></li>
                </ul>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Medium Icons</h4>
                <ul className="ico-list ico-medium-wrap">
                  <li className="on"><i className="ico-sunroof"></i></li>
                  <li className="on"><i className="ico-navigation"></i></li>
                  <li className="on"><i className="ico-ventilation-seat"></i></li>
                  <li className="on"><i className="ico-smartcruze"></i></li>
                  <li className="on"><i className="ico-smart-key"></i></li>
                  <li className="on"><i className="ico-hud"></i></li>
                  <li className="on"><i className="ico-around-view"></i></li>
                  <li className="on"><i className="ico-led"></i></li>
                  <li className="on"><i className="ico-hipass"></i></li>
                  <li className="on"><i className="ico-back-camera"></i></li>

                  <li><i className="ico-sunroof"></i></li>
                  <li><i className="ico-navigation"></i></li>
                  <li><i className="ico-ventilation-seat"></i></li>
                  <li><i className="ico-smartcruze"></i></li>
                  <li><i className="ico-smart-key"></i></li>
                  <li><i className="ico-hud"></i></li>
                  <li><i className="ico-around-view"></i></li>
                  <li><i className="ico-led"></i></li>
                  <li><i className="ico-hipass"></i></li>
                  <li><i className="ico-back-camera"></i></li>
                  <li><i className="ico-checking"></i></li>
                  <li><i className="ico-insurance"></i></li>
                  <li><i className="ico-result"></i></li>
                  <li><i className="ico-refund"></i></li>
                  <li><i className="ico-individual"></i></li>
                  <li><i className="ico-business"></i></li>
                  <li><i className="ico-corporation"></i></li>
                  <li><i className="ico-clock"></i></li>
                  <li><i className="ico-smartphone"></i></li>
                  <li><i className="ico-setting"></i></li>
                  <li><i className="ico-talk"></i></li>
                  <li><i className="ico-facebook"></i></li>
                  <li><i className="ico-url"></i></li>
                </ul>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Small Icons</h4>
                <ul className="ico-list ico-small-wrap">
                  <li><i className="ico-prev-gray"></i></li>
                  <li><i className="ico-next-gray"></i></li>
                  <li><i className="ico-prev-black"></i></li>
                  <li><i className="ico-next-black"></i></li>
                  <li><i className="ico-arrow-top-gray"></i></li>
                  <li><i className="ico-arrow-bottom-gray"></i></li>
                  <li><i className="ico-app"></i></li>
                  <li><i className="ico-app-close"></i></li>
                  <li><i className="ico-sharing"></i></li>
                  <li><i className="ico-download"></i></li>
                  <li><i className="ico-plus"></i></li>
                  <li><i className="ico-close"></i></li>
                  <li><i className="ico-file"></i></li>
                  <li><i className="ico-state-x on"></i></li>
                  <li><i className="ico-state-w on"></i></li>
                  <li><i className="ico-state-c on"></i></li>
                  <li><i className="ico-state-x"></i></li>
                  <li><i className="ico-state-w"></i></li>
                  <li><i className="ico-state-c"></i></li>
                  <li><i className="ico-autobell-gray"></i></li>
                  <li><i className="ico-calculate"></i></li>
                  <li><i className="ico-triangle-top"></i></li>
                  <li><i className="ico-triangle-bottom"></i></li>
                  <li className="on"><i className="ico-heart"></i></li>
                  <i className="ico-check-gray"></i>
                </ul>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Small Icons - White</h4>
                <ul className="ico-list ico-small-wrap white">
                  <li><i className="ico-sharing-white"></i></li>
                  <li><i className="ico-heart"></i></li>
                  <li><i className="ico-close-white"></i></li>
                </ul>
              </div>
            </div>
          </GuideModule>
          <GuideModule title="Badge &amp; Label" id={6}>
            <div className="guide-inner">Badge &amp; Label</div>
          </GuideModule>
          <GuideModule title="Checkbox" id={7}>
            <div className="guide-inner">
              <div className="code-box" id="chk-demo-basic">
                <h4 className="mb40">Basic</h4>
                <ul className="chk-list">
                  <li><CheckBox id='chk-basic' title='Checkbox' /></li>
                  <li><CheckBox id='chk-basic-sml' title='Checkbox' size="small" /></li>
                  <li><CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} /></li>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import CheckBox from '@lib/share/items/CheckBox';
`
              }</code>
              <code className="language-markup">{
                `CheckBox id='chk-basic' title='Checkbox' />
<CheckBox id='chk-basic-sml' title='Checkbox' size="small" />
<CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box" id="chk-demo-disabled">
                <h4 className="mb40">Disabled</h4>
                <ul className="chk-list">
                  <li><CheckBox id='chk-basic' title='Checkbox' disabled={true} /></li>
                  <li><CheckBox id='chk-basic-sml' title='Checkbox' size="small" disabled={true} /></li>
                  <li><CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} disabled={true} /></li>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import CheckBox from '@lib/share/items/CheckBox';
`
              }</code>
              <code className="language-markup">{
                `<CheckBox id='chk-basic' title='Checkbox' disabled={true} />
<CheckBox id='chk-basic-sml' title='Checkbox' size="small" disabled={true} />
<CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} disabled={true} />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box" id="chk-demo-color1">
                <CheckColors isSelectButton={false} />
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import CheckColors from '@src/components/common/CheckColors';
`
              }</code>
              <code className="language-markup">{
                `<CheckColors />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box check-list-wrap">
                <h4 className="mb40">Check Style - Select</h4>
                <ul className="check-select-list">
                  <li><CheckBox id='chk1' title='(필수)' size="noborder" /></li>
                  <li><CheckBox id='chk2' title='(필수)' size="noborder" /></li>
                  <li><CheckBox id='chk3' title='(선택)' size="noborder" checked={true} /></li>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import CheckBox from '@lib/share/items/CheckBox';
`
              }</code>
              <code className="language-markup">{
                `<ul className="check-select-list">
<li><CheckBox id='chk1' title='(필수)' size="noborder" /></li>
<li><CheckBox id='chk2' title='(필수)' size="noborder" /></li>
<li><CheckBox id='chk3' title='(선택)' size="noborder" checked={true} /></li>
</ul>`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Check Style - false</h4>
                <ul className="false-chk-list">
                  <li><CheckBox id='ss-chk1' title='가격허위' /></li>
                  <li><CheckBox id='ss-chk2' title='주행거리허위' /></li>
                  <li><CheckBox id='ss-chk3' title='차량정보허위' /></li>
                  <li><CheckBox id='ss-chk4' title='사고유무오류' /></li>
                  <li><CheckBox id='ss-chk5' title='미끼매물' /></li>
                  <li><CheckBox id='ss-chk6' title='차량설명허위' /></li>
                  <li><CheckBox id='ss-chk7' title='옵션정보허위' /></li>
                  <li><CheckBox id='ss-chk8' title='차량번호오류' /></li>
                </ul>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Check Style - Autobell</h4>
                <ul className="autobell-chk-list">
                  <li><CheckBox id='autobell-chk1' title='라이브 스튜디오 차량' /></li>
                  <li><CheckBox id='autobell-chk2' title='경매낙찰 차량' /></li>
                  <li><CheckBox id='autobell-chk3' title='프랜차이즈 차량' /></li>
                  <li><CheckBox id='autobell-chk4' title='홈서비스 차량' /></li>
                </ul>
              </div>
            </div>

          </GuideModule>
          <GuideModule title="Radio" id={8}>
            <div className="guide-inner">
              <div className="code-box" id="radio-demo-basic">
                <h4 className="mb40">Basic</h4>
                <RadioGroup dataList={[
                  { id: 'm-radio-1', value: 1, checked: true, disabled: false, label: 'Radio' }
                ]} />
                <RadioGroup size="small" dataList={[
                  { id: 'm-radio-sml-1', value: 1, checked: false, disabled: false, label: 'Radio Small 1' }
                ]} />
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import RadioGroup from '@lib/share/items/RadioGroup';
const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);
`
              }</code>
              <code className="language-markup">{
                `
<RadioGroup dataList={[
{id:'m-radio-1', value:1, checked:true, disabled:false, title:'Radio Basic 1'}
]} />
<RadioGroup size="small" dataList={[
{id:'m-radio-sml-1', value:1, checked:true, disabled:false, title:'Radio Small 1'}
]} />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box" id="radio-demo-basic">
                <h4 className="mb40">Disabled</h4>
                <RadioGroup dataList={[
                  { id: 'm-radio-1', value: 1, checked: true, disabled: true, label: 'Radio' }
                ]} />
                <RadioGroup size="small" dataList={[
                  { id: 'm-radio-sml-1', value: 1, checked: false, disabled: true, label: 'Radio Small 1' }
                ]} />
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import RadioGroup from '@lib/share/items/RadioGroup';
const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);
`
              }</code>
              <code className="language-markup">{
                `
<RadioGroup dataList={[
{id:'m-radio-1', value:1, checked:true, disabled:true, title:'Radio Basic 1'}
]} />
<RadioGroup size="small" dataList={[
{id:'m-radio-sml-1', value:1, checked:true, disabled:true, title:'Radio Small 1'}
]} />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box" id="radio-demo-basic">
                <h4 className="mb40">Radio Style - Check</h4>
                <RadioGroup
                  defaultValue={0}
                  dataList={[
                    { id: 'chk-areee', value: 1, checked: true, disabled: false, label: '동의' },
                    { id: 'chk-disagree', value: 2, checked: false, disabled: false, label: '미동의' }
                  ]}
                  className="chk"
                  onChange={handleAgreeChange}
                ></RadioGroup>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import RadioGroup from '@lib/share/items/RadioGroup';
const handleAgreeChange = useCallback((e) => setAgreeReply(Number(e.target.value) == 1 ? true : false), []);
`
              }</code>
              <code className="language-markup">{
                `
<RadioGroup
defaultValue={0}
dataList={[
  { id: 'chk-areee', value: 1, checked: false, disabled: false, label: '동의' },
  { id: 'chk-disagree', value: 2, checked: false, disabled: false, label: '미동의' }
]}
className="chk"
onChange={handleAgreeChange}
></RadioGroup>`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box" id="radio-demo-basic">
                <h4 className="mb40">Radio Style - list</h4>
                <ul className="radio-group vertical">
                  <li><Radio id="member1" label="단체회원" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio id="member2" label="금융사제휴회원" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio id="member3" label="수입인증제휴회원" value={3} checked={isValue1} onChange={handleChange1} /></li>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import Radio from '@lib/share/items/Radio';
                const [isValue1, setIsValue1] = useState(0);

                const handleChange1 = useCallback((e) => {
                e.preventDefault();
                setIsValue1(Number(e.target.value));
                }, [isValue1]);
`
              }</code>
              <code className="language-markup">{
                `
                <ul className="radio-group vertical">
                <li><Radio id="member1" label="단체회원" value={1} checked={isValue1} onChange={handleChange1} /></li>
                <li><Radio id="member2" label="금융사제휴회원" value={2} checked={isValue1} onChange={handleChange1} /></li>
                <li><Radio id="member3" label="수입인증제휴회원" value={3} checked={isValue1} onChange={handleChange1} /></li>
              </ul>`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box check-list-wrap">
                <h4 className="mb40">Radio Style - Block</h4>
                <ul className="radio-block tp1">
                  <li><Radio className="txt" id="zone1" label="Block" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone2" label="Block" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone3" label="Block" value={3} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone4" label="Block" value={4} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone5" label="Block" value={5} checked={isValue1} onChange={handleChange1} /></li>
                </ul>

                <ul className="radio-block small">
                  <li><Radio className="txt" id="zone1" label="Block" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone2" label="Block" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone3" label="Block" value={3} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="zone4" label="Block" value={4} checked={isValue1} onChange={handleChange1} /></li>
                </ul>

                <ul className="radio-block tp2">
                  <li><Radio className="txt" id="block1-1" label="Block" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block1-2" label="Block" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block1-3" label="Block" value={3} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block1-4" label="Block" value={4} checked={isValue1} onChange={handleChange1} /></li>
                </ul>

                <ul className="radio-block tp3">
                  <li><Radio className="txt" id="block2-1" label="Block" value={1} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block2-2" label="Block" value={2} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block2-3" label="Block" value={3} checked={isValue1} onChange={handleChange1} /></li>
                  <li><Radio className="txt" id="block2-4" label="Block" value={4} checked={isValue1} onChange={handleChange1} /></li>
                </ul>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import Radio from '@lib/share/items/Radio';

const [isValue1, setIsValue1] = useState(0);

const handleChange1 = useCallback((e) => {
e.preventDefault();
setIsValue1(Number(e.target.value));
}, [isValue1]);
`
              }</code>
              <code className="language-markup">{
                `<ul className="zone-select">
<li><Radio className="txt" id="zone1" label="종로구" value={1} checked={isValue1} onChange={handleChange1} /></li>
<li><Radio className="txt" id="zone2" label="중구" value={2} checked={isValue1} onChange={handleChange1} /></li>
<li><Radio className="txt" id="zone3" label="용산구" value={3} checked={isValue1} onChange={handleChange1} /></li>
<li><Radio className="txt" id="zone4" label="성동구" value={4} checked={isValue1} onChange={handleChange1} /></li>
<li><Radio className="txt" id="zone5" label="광진구" value={5} checked={isValue1} onChange={handleChange1} /></li>
</ul>`
              }</code>
            </PreCode>
          </GuideModule>

          <GuideModule title="Selectbox" id={9}>
            <div className="guide-inner">
              <div className="code-box" id="mob-select-box">
                <h4>Basic</h4>
                <MobSelectBox options={[
                  { id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '서울' },
                  { id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '인천' },
                  { id: 'radio_local_3', value: 3, checked: false, disabled: false, label: '대전' },
                  { id: 'radio_local_4', value: 4, checked: false, disabled: false, label: '부산' },
                ]} />
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import MobSelectBox from '@lib/share/items/MobSelectBox';
`
              }</code>
              <code className="language-markup">{
                `
<MobSelectBox options={[
{id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '서울'},
{id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '인천'},
{id: 'radio_local_3', value: 3, checked: false, disabled: false, label: '대전'},
{id: 'radio_local_4', value: 4, checked: false, disabled: false, label: '부산'},
]} />`
              }</code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4>Custom Select</h4>
                <MobSelectBox customMode={true} customName="선택">
                  <div className="inner car-option">
                    <div className="float-wrap">
                      <h3 className="tit1">옵션</h3>
                      <Button size="sml" background="blue20" color="blue80" radius={true} title="초기화" width={50} />
                    </div>
                    <CarOptions type={1} addOption={true} toggle={true} isValue={false} defaultClass="m-toggle-list option" />
                  </div>
                  <Button size="full" background="blue80" title="선택" height={56} />
                </MobSelectBox>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">{
                `import MobSelectBox from '@lib/share/items/MobSelectBox';
`
              }</code>
              <code className="language-markup">{
                `
<MobSelectBox customMode={true} customName="옵션" isActive={true}>
<div className="inner">
  <CarOptions type={1} addOption={true} toggle={true} isValue={false} defaultClass="m-toggle-list option" />
</div>
</MobSelectBox>`
              }</code>
            </PreCode>
          </GuideModule>
          <GuideModule title="Input" id={10}>
            <div className="guide-inner">
              <div className="code-box">
                <h4>Input Type</h4>
                <Input type="text" placeHolder="Input Tp1" id="input-tp1" />
                <Input type="text" placeHolder="Input Tp2" id="input-tp2" uiType={2} />
                <Input type="text" placeHolder="Search Input" id="input-tp3" uiType={3} />
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4>Disabled</h4>
                <Input type="text" placeHolder="Input Disabled" id="input-disabled" disabled={true} />
              </div>
            </div>
          </GuideModule>
          <GuideModule title="Tab" id={11}>
            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Tab Type1</h4>
                <TabMenu type="type1" defaultTab={0} mount={false}>
                  <TabCont tabTitle="Tab1" id="tab2-1" index={0}>
                    Content1
                </TabCont>
                  <TabCont tabTitle="Tab2" id="tab2-2" index={1}>
                    Content2
                </TabCont>
                  <TabCont tabTitle="Tab3" id="tab2-3" index={2}>
                    Content3
                </TabCont>
                </TabMenu>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont
`
                }
              </code>
              <code className="language-markup">
                {
                  `<TabMenu type="type1" defaultTab={0} mount={false}>
<TabCont tabTitle="Tab1" id="tab2-1" index={0}>
Content1
</TabCont>
<TabCont tabTitle="Tab2" id="tab2-2" index={1}>
Content2
</TabCont>
<TabCont tabTitle="Tab3" id="tab2-3" index={2}>
Content3
</TabCont>
</TabMenu>`
                }
              </code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Tab Type2</h4>
                <TabMenu type="type2" defaultTab={0} mount={false}>
                  <TabCont tabTitle="Tab1" id="tab2-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab2-2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="tab2-3" index={2}>
                    Content3
                  </TabCont>
                </TabMenu>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'
`
                }
              </code>
              <code className="language-markup">
                {
                  `
<TabMenu type="type2" defaultTab={1} mount={false}>
<TabCont tabTitle="Tab1" id="tab2-1" index={0}>
Content1
</TabCont>
<TabCont tabTitle="Tab2" id="tab2-2" index={1}>
Content2
</TabCont>
<TabCont tabTitle="Tab3" id="tab2-3" index={2}>
Content3
</TabCont>
</TabMenu>`
                }
              </code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Tab Swipe Type1</h4>
                <div className={`tabmenu-swipe tp1 active-${tabKey}`}>
                  <Tabs
                    renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
                    renderTabContent={() => <TabContent />}
                    defaultActiveKey="1"
                    onChange={tabCallback}
                  >
                    <TabPane tab="Tab1" data-extra="tabpane" key="1">

                    </TabPane>
                    <TabPane tab="Tab2" data-extra="tabpane" key="2">

                    </TabPane>
                    <TabPane tab="Tab3" data-extra="tabpane" key="3">

                    </TabPane>
                    <TabPane tab="Tab4" data-extra="tabpane" key="4">

                    </TabPane>
                    <TabPane tab="Tab5" data-extra="tabpane" key="5">

                    </TabPane>
                    <TabPane tab="Tab6" data-extra="tabpane" key="6">

                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `
                  import Tabs, { TabPane } from "rc-tabs";
                  import TabContent from "rc-tabs/lib/TabContent";
                  import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
                  
                  const [tabKey, setTabKey] = useState(1);
                  const tabCallback = useCallback(key => {
                    if (+key < 2) {
                      setTabKey('first');
                    } else if (+key >= 2 && +key < 5) {
                      setTabKey(key);
                    } else {
                      setTabKey('last');
                    }
                  }, []);
                  '
`
                }
              </code>
              <code className="language-markup">
                {
                  `
                  `
                }
              </code>
            </PreCode>

            <div className="guide-inner">
              <div className="code-box">
                <h4 className="mb40">Tab Swipe Type2</h4>
                <div className={`tabmenu-swipe tp2 active-${tabKey}`}>
                  <Tabs
                    renderTabBar={() => <SwipeableInkTabBar pageSize={4} />}
                    renderTabContent={() => <TabContent />}
                    defaultActiveKey="1"
                    onChange={tabCallback}
                  >
                    <TabPane tab="Tab1" data-extra="tabpane" key="1">

                    </TabPane>
                    <TabPane tab="Tab2" data-extra="tabpane" key="2">

                    </TabPane>
                    <TabPane tab="Tab3" data-extra="tabpane" key="3">

                    </TabPane>
                    <TabPane tab="Tab4" data-extra="tabpane" key="4">

                    </TabPane>
                    <TabPane tab="Tab5" data-extra="tabpane" key="5">

                    </TabPane>
                    <TabPane tab="Tab6" data-extra="tabpane" key="6">

                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `
                  import Tabs, { TabPane } from "rc-tabs";
                  import TabContent from "rc-tabs/lib/TabContent";
                  import SwipeableInkTabBar from "rc-tabs/lib/SwipeableInkTabBar";
                  
                  const [tabKey, setTabKey] = useState(1);
                  const tabCallback = useCallback(key => {
                    if (+key < 2) {
                      setTabKey('first');
                    } else if (+key >= 2 && +key < 5) {
                      setTabKey(key);
                    } else {
                      setTabKey('last');
                    }
                  }, []);
                  '
`
                }
              </code>
              <code className="language-markup">
                {
                  `
                  `
                }
              </code>
            </PreCode>

          </GuideModule>
          <GuideModule title="Table" id={12}>
            <div className="guide-inner">
              <div className="code-box">
                <h4>Table Type</h4>
                <table summary="content" className="table-tp1">
                  <caption>Title</caption>
                  <colgroup>
                    <col width="30%" />
                    <col width="70%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>Option</th>
                      <td><RadioGroup dataList={state0} /></td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>
                        <CheckBox id='chk-gas-co1' title='CheckBox' />
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td className="chk-w-wrap">
                        <CheckBox id='chk-legality' title='CheckBox1' />
                        <CheckBox id='chk-illegality' title='CheckBox2' />
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>
                        <em className="mr8">Content</em>
                        <Input type="text" id="calculated" width={100} height={40} />
                        <em>만원</em>
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>
                        <span className="bridge">
                          <MobSelectBox options={[
                            { id: 'radio_local_1', value: 1, checked: true, disabled: false, label: '서울' },
                            { id: 'radio_local_2', value: 2, checked: false, disabled: false, label: '인천' },
                            { id: 'radio_local_3', value: 3, checked: false, disabled: false, label: '대전' },
                            { id: 'radio_local_4', value: 4, checked: false, disabled: false, label: '부산' },
                          ]} />
                        </span>
                        <Input type="text" placeHolder="" id="user-phone2" width={100} height={40} />
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>
                        <span className="bridge2 gas">
                          <span>Content</span>
                          <Input type="text" id="bridge2" width={122} height={40} />
                          <em>%</em>
                        </span>
                        <span className="bridge2 gas">
                          <span>Content</span>
                          <Input type="text" id="bridge2-1" width={122} height={40} />
                          <em>%</em>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td className="chk-y-wrap">
                        <CheckBox id='chk-legality' title='CheckBox1' />
                        <CheckBox id='chk-illegality' title='CheckBox2' />
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>Content</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box" id="textarea-demo-basic">
                <h4>Textarea</h4>
                <Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." disabledEnter={true} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
                <Textarea countLimit={1000} type="tp1" height={200} data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Textarea from '@lib/share/items/Textarea';
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
<Textarea countLimit={1000} type="tp1" height={200} data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
`
                  }
                </code>
              </PreCode>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4>Textarea Type - Chat</h4>
                <div className="chat">
                  <Textarea type="tp1" placeHolder="입력해주세요." onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
                  <Buttons>
                    <span className="step-btn-l">
                      <Button size="sml" background="blue20" color="blue80" radius={true} title="특이사항 없음" width={85} height={30} />
                    </span>
                    <span className="step-btn-r">
                      <Button size="sml" background="blue80" radius={true} title="입력" width={88} height={30} />
                    </span>
                  </Buttons>
                </div>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Textarea from '@lib/share/items/Textarea';
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<Textarea countLimit={30} type="tp1" height={50} placeHolder="입력해주세요." onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
<Textarea countLimit={1000} type="tp1" height={200} data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
`
                  }
                </code>
              </PreCode>
            </div>
          </GuideModule>
          <GuideModule title="List" id={13}>
            <div className="guide-inner">
              <div className="code-box">
                <h4>List Type1</h4>
                <ul className="goods-list none-slide-list">
                  {car_list.map((v, i) => {
                    if (i < 3) {
                      return (
                        <BannerItem key={v.id} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                      )
                    }
                  })}
                </ul>
              </div>
            </div>
          </GuideModule>

          <GuideModule title="Slide" id={14}>
            <div className="guide-inner">
              <div className="code-box">
                <h4>List Type1</h4>
                <ul className="goods-list">
                  <SlideBanner car_list={mCarList} touch={true} dots={true} autoplay={false} customArrow={true} multiNum={1} centerMode={true} infinite={false}></SlideBanner>
                </ul>
              </div>
            </div>
          </GuideModule>

          <GuideModule title="Tooltip" id={15}>
            <div className="guide-inner">Tooltip</div>
          </GuideModule>
          <GuideModule title="Design Module" id={16}>
            <div className="guide-inner" id="car-option">
              <CarOptions title="기본 옵션" type={1} mode="check" addOption={true} />
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <h4>Search None</h4>
                <div className="search-none bg">
                  <h3>검색결과가 없습니다.</h3>
                  <p>
                    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                  </p>
                  <p className="tx-disabled">
                    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                  </p>
                </div>

                <div className="search-none">
                  <h3>검색결과가 없습니다.</h3>
                  <p>
                    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
                    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
                  </p>
                  <p className="tx-disabled">
                    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
                  </p>
                </div>

                <div className="search-none">
                  <p>
                    차량 번호로 조회가 되지 않을 경우,<br />
                    차량 조건 검색을 이용해보세요.
                  </p>
                  <Buttons align="center" marginTop={16}>
                    <Button size="big" background="blue20" color="blue80" radius={true} title="차량 조건으로 조회" width={189} fontWeight={500} />
                  </Buttons>
                </div>
              </div>
              <PreCode>
                <code className="language-markup">
                  {
                    `<div className="search-none bg">
  <h3>검색결과가 없습니다.</h3>
  <p>
    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
  </p>
  <p className="tx-disabled">
    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
  </p>
  </div>

  <div className="search-none">
  <h3>검색결과가 없습니다.</h3>
  <p>
    1. 검색 옵션을 변경해서 다시 검색해 보세요.<br />
    2. 단어의 철자가 정확한지 확인해 보시기 바랍니다.
  </p>
  <p className="tx-disabled">
    * 현재 해당 옵션으로 등록된 차량이 없을 수 있습니다.
  </p>
</div>`
                  }
                </code>
              </PreCode>
            </div>

            <div className="guide-inner">
              <div className="co-wrap bg">
                <p className="tit">24시간 실시간 비교견적<br />접수가 완료되었습니다.</p>
                <p className="exp">
                  접수 내용이 확인된 후 24시간 비교견적이 시작됩니다.<br />
                  비교견적이 시작되면 마이페이지 또는 SMS로 확인이 가능합니다.<br />
                  감사합니다.
                </p>
                <div className="co-result">
                  <p className="num">신청번호 : <span>XXXXXXXNNNXXX</span></p>
                  <p className="sub">(마이페이지 현황 조회하시려면 신청번호가 필요합니다.)</p>
                </div>
                <Buttons align="center" marginTop={16}>
                  <Button size="sml" background="blue80" radius={true} title="마이페이지로 이동" width={108} href="#" />
                </Buttons>
              </div>
              <div className="co-wrap">
                <p className="tit">24시간 실시간 비교견적<br />접수가 완료되었습니다.</p>
                <p className="exp">
                  접수 내용이 확인된 후 24시간 비교견적이 시작됩니다.<br />
                  비교견적이 시작되면 마이페이지 또는 SMS로 확인이 가능합니다.<br />
                  감사합니다.
                </p>
                <div className="co-result">
                  <p className="num">신청번호 : <span>XXXXXXXNNNXXX</span></p>
                  <p className="sub">(마이페이지 현황 조회하시려면 신청번호가 필요합니다.)</p>
                </div>
                <Buttons align="center" marginTop={16}>
                  <Button size="sml" background="blue80" radius={true} title="마이페이지로 이동" width={108} href="#" />
                </Buttons>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <div className="essential-point">
                  <ul>
                    <li><i className="ico-dot"></i><span className="tx-black">차량관리비 : </span>24벨브 V6 3.7리터 24벨브 V6 3.7리터 24벨브 V6 3.7리터 24벨브 V6</li>
                    <li><i className="ico-dot"></i>전자 제어식 7단 자동 변속기</li>
                    <li><i className="ico-dot"></i>후륜구동</li>
                  </ul>
                </div>

                <div className="essential-point tp2">
                  <ul>
                    <li><span className="tx-black">&#8251; 자동차관리법 :</span> 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</li>
                    <li><span className="tx-black">&#8251; 자동차관리법 :</span> 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</li>
                    <li><span className="tx-black">&#8251; 자동차관리법 :</span> 시행규칙 제122조 제2항, 제3항에 따라, 등록신청대행수수료와 관리비용이 별도 부과되며 상세 견적은 예상결제금액 확인단계에서 확인하실 수 있습니다.</li>
                  </ul>
                </div>
              </div>
              <PreCode>
                <code className="language-markup">
                  {
                    `<div className="essential-point">
<ul>
  <li><i className="ico-dot"></i>3.7리터 24벨브 V6</li>
  <li><i className="ico-dot"></i>전자 제어식 7단 자동 변속기</li>
  <li><i className="ico-dot"></i>후륜구동</li>
</ul>
</div>`
                  }
                </code>
              </PreCode>
            </div>

            <div className="guide-inner">
              <div className="code-box" id="address-basic">
                <div className="address-wrap">
                  <ul className="bottom">
                    <li>
                      <div className="float-wrap">
                        <p className="num fl">12323</p>
                        <ul className="fr">
                          <li>영문보기</li>
                          <li>지도</li>
                        </ul>
                      </div>
                      <p className="address">
                        경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                      <span className="num">경기 성남시 분당구 판삼평동 681</span>
                      </p>
                    </li>
                    <li>
                      <div className="float-wrap">
                        <p className="num fl">12323</p>
                        <ul className="fr">
                          <li>영문보기</li>
                          <li>지도</li>
                        </ul>
                      </div>
                      <p className="address">
                        경기 성남시 분당구 판교역로 234 (에이치스퀘어 엔동)
                      <span className="num">경기 성남시 분당구 판삼평동 681</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-inner">
              <div className="code-box">
                <div className="used-car-summary">
                  <h2>투싼(TUCSAN) 66부00**</h2>
                  <p className="info">정보조회일자: 2019-09-27</p>
                </div>
              </div>
            </div>
          </GuideModule>
          <GuideModule title="Popup" id={17}>
            <div className="guide-inner">
              <div className="code-box">
                <Button size="mid" background="blue80" radius={true} title="Popup" width={160} onClick={(e) => openMpop(e, "fade")} />

                <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
                  <div className="con-wrap">
                    <p className="tit1">Title</p>
                    <p>Sub Title</p>
                    <Buttons align="right" marginTop={24}>
                      <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
                      <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
                    </Buttons>
                  </div>
                </RodalPopup>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
const closeMpop = useCallback((e) => {
  e.preventDefault();
  setMpop(false);
}, []);
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `<Button size="mid" background="blue80" radius={true} title="컨펌 or 얼럿 팝업 호출" width={160} onClick={(e) => openMpop(e, "fade")} />

<RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isMask={true} isButton={false} subPop={false}>
  <div className="con-wrap">
    <p className="tit1">정말 나가시겠습니까?</p>
    <p>작성한 내용은 임시저장 됩니다.</p>
    <Buttons align="right" marginTop={24}>
      <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
      <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" />
    </Buttons>
  </div>
</RodalPopup>`
                  }
                </code>
              </PreCode>
            </div>
          </GuideModule>
          <GuideModule title="Calendar" id={18}>
            <div className="guide-inner">
              <div className="code-box">
                <DatePicker defaultValue={now} />
                <DatePicker inputWidth={210} inputHeight={60} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import DatePicker from '@src/components/common/calendar/DatePicker'
import moment from 'moment'

const now = moment()

`
                  }
                </code>
                <code className="language-markup">
                  {
                    `<DatePicker defaultValue={now}/>
<DatePicker inputWidth={210} inputHeight={60} />`
                  }
                </code>
              </PreCode>
            </div>
          </GuideModule>
        </div>
      </div>
    )
  }

  return (
    <div className="guide-wrap" id="wrap">
      <div className="guide-header">PUB-COMMON-STYLE <span>(Version. 컴포넌트)</span></div>
      <div className="guide-aside">
        <ColoredScrollbars style={{ height: '100%' }} autoHeight={false}>
          <ul>
            {state.isMenu.map((menu, i) => (
              <li className={classNames({ "on": state.isMenu[i].active })} key={i} data-id={i} onClick={handleMenu}>{menu.property}</li>
            ))}
          </ul>
        </ColoredScrollbars>
      </div>
      <div className="guide-cont">
        <GuideModule title="Button" id={0}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="guide-inner-left">
                <div className="code-box" id="button-demo-size">
                  <h4 className="mb40">Basic</h4>
                  <Button size="full" background="blue80" title="Full" onClick={handleClick} />

                  <Button size="big" background="blue80" title="Big" width={180} />
                  <Button size="big" line="black" color="darkgray" title="Big" width={180} />
                  <Button size="big" line="gray" color="darkgray" title="Big" width={180} /><br />

                  <Button size="mid" background="blue80" title="Middle" width={160} />
                  <Button size="mid" line="black" color="darkgray" radius={true} title="Middle" width={160} />
                  <Button size="mid" line="gray" color="darkgray" title="Middle" width={160} /><br />

                  <Button size="sml" background="blue80" radius={true} title="Small" width={88} />
                  <Button size="sml" line="black" color="darkgray" radius={true} title="Small" width={88} />
                  <Button size="sml" line="gray" color="darkgray" radius={true} title="Small" width={88} /><br />

                  <Button background="blue80" title="Circle" circle={true} />
                  <Button line="black" color="darkgray" title="Circle" circle={true} />
                  <Button line="gray" color="darkgray" title="Circle" circle={true} />
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Button from '@lib/share/items/Button'

const handleClick = () => alert('onClick props가 설정된 버튼')
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Button size="full" background="blue80" title="Full" onClick={handleClick} />

<Button size="big" background="blue80" title="Big" width={180} />
<Button size="big" line="black" color="darkgray" title="Big" width={180} />
<Button size="big" line="gray" color="darkgray" title="Big" width={180} />

<Button size="mid" background="blue80" title="Middle" width={160} />
<Button size="mid" line="black" color="darkgray" radius={true} title="Middle" width={160} />
<Button size="mid" line="gray" color="darkgray" title="Middle" width={160} />

<Button size="sml" background="blue80" radius={true} title="Small" width={88} />
<Button size="sml" line="black" color="darkgray" radius={true} title="Small" width={88} />
<Button size="sml" line="gray" color="darkgray" radius={true} title="Small" width={88} />

<Button background="blue80" title="Circle" circle={true} />
<Button line="black" color="darkgray" title="Circle" circle={true} />
<Button line="gray" color="darkgray" title="Circle" circle={true} />
`
                  }</code>
                </PreCode>

                <div className="code-box">
                  <h4 className="mb40">Button Size</h4>
                  <Button line="black" color="black" radius={true} title="width={300} height={45}" width={300} height={45} />
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Button from '@lib/share/items/Button'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Button line="black" color="black" radius={true} title="width={300} height={45}" width={300} height={45} />`
                  }</code>
                </PreCode>
              </div>
              <div className="guide-inner-right">
                <div className="code-box" id="button-demo-style">
                  <h4 className="mb40">Button Type</h4>
                  <Button size="mid" line="black" color="black" title="More" iconType='arrow' width={160} />
                  <Button size="mid" line="black" color="black" title="Reset" iconType='reset' width={160} /><br />
                  <Button size="mid" line="gray" color="blue60" title="Link" nextLink={true} href="/" width={160} />
                  <Button size="mid" line="gray" color="blue60" title="Link - Page Change" href="/" width={160} /><br />
                  <Button size="big" background="blue80" title="Title" sub="(sub title)" className="ws1" width={240} height={72} /><br />
                  <span className="input-tx-wrap">
                    <Input type="text" width={220} height={40} value="인증번호를 입력하세요." />
                    <Button size="mid" color="blue80" title="인증" />
                  </span>
                  <div className="app-down">
                    <i className="ico-app-blue"></i>
                    <Button size="sml" line="blue80" color="blue60" title="모바일로 편리하게! 오토벨앱 다운로드" href="#" />
                  </div>
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Button from '@lib/share/items/Button'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Button size="mid" line="black" color="black" title="More" iconType='arrow' />
<Button size="mid" line="black" color="black" title="Reset" iconType='reset' />
<Button size="mid" line="gray" color="blue60" title="Link" nextLink={true} href="/" />
<Button size="mid" line="gray" color="blue60" title="Link - Page Change" href="/" />`
                  }</code>
                </PreCode>

                <div className="code-box" id="button-demo-margin">
                  <h4 className="mb40">Button Margin</h4>
                  <p><Button size="mid" line="black" color="black" title="Top" marginTop={10} width={120} /></p>
                  <p><Button size="mid" line="black" color="black" title="Left" marginLeft={10} width={120} /></p>
                  <p><Button size="mid" line="black" color="black" title="Right" marginRight={10} width={120} /></p>
                  <p><Button size="mid" line="black" color="black" title="Bottom" marginBottom={10} width={120} /></p>
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Button from '@lib/share/items/Button'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Button size="mid" line="black" color="black" title="Top" marginTop={10} />
<Button size="mid" line="black" color="black" title="Left" marginLeft={10} />
<Button size="mid" line="black" color="black" title="Right" marginRight={10} />
<Button size="mid" line="black" color="black" title="Bottom" marginBottom={10} />`
                  }</code>
                </PreCode>

                <div className="code-box" id="buttons">
                  <h4 className="mb40">Buttons</h4>

                  <Buttons align="right">
                    <Button size="sml" background="gray" title="임시 저장" width={120} height={30} />
                    <Button size="sml" background="blue80" title="다음" width={120} height={30} />
                  </Buttons>

                  <Buttons marginTop={20}>
                    <span className="step-btn-l">
                      <Button size="sml" background="gray" title="이전" width={120} height={30} />
                    </span>
                    <span className="step-btn-r">
                      <Button size="sml" background="gray" title="임시 저장" width={120} height={30} />
                      <Button size="sml" background="blue80" title="다음" width={120} height={30} />
                    </span>
                  </Buttons>

                  <Buttons marginTop={20}>
                    <span className="step-btn-l">
                      <Button size="sml" background="gray" title="이전" width={120} height={30} />
                    </span>
                    <span className="step-btn-r">
                      <Button size="sml" background="blue80" title="다음" width={120} height={30} mode="normal" />
                    </span>
                  </Buttons>

                  <Buttons align="center" marginTop={30}>
                    <Button size="sml" background="gray" title="이전" width={120} height={30} />
                    <Button size="sml" background="blue80" title="다음" width={120} height={30} />
                  </Buttons>

                  <Buttons marginTop={20}>
                    <span className="step-btn-c">
                      <Button size="sml" background="gray" title="이전" width={120} height={30} />
                    </span>
                    <span className="step-btn-r">
                      <Button size="sml" background="blue80" title="다음" width={120} height={30} mode="normal" />
                    </span>
                  </Buttons>
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Buttons from '@lib/share/items/Buttons'
import Button from '@lib/share/items/Button'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Buttons align="right">
  <Button size="sml" background="gray" title="임시 저장" width={120} height={30}/>
  <Button size="sml" background="blue80" title="다음" width={120} height={30}/>
</Buttons>

<Buttons marginTop={20}>
  <span className="step-btn-l">
    <Button size="sml" background="gray" title="이전" width={120} height={30}/>
  </span>
  <span className="step-btn-r">
    <Button size="sml" background="gray" title="임시 저장" width={120} height={30}/>
    <Button size="sml" background="blue80" title="다음" width={120} height={30}/>
  </span>
</Buttons>

<Buttons marginTop={20}>
  <span className="step-btn-l">
    <Button size="sml" background="gray" title="이전" width={120} height={30} />
  </span>
  <span className="step-btn-r">
    <Button size="sml" background="blue80" title="다음" width={120} height={30} mode="normal" />
  </span>
</Buttons>

<Buttons align="center" marginTop={30}>
  <Button size="sml" background="gray" title="이전" width={120} height={30}/>
  <Button size="sml" background="blue80" title="다음" width={120} height={30}/>
</Buttons>
`
                  }</code>
                </PreCode>
              </div>
            </div>
            <GuideApi cname="Button" api_info={api_list["button"]} />
          </div>
        </GuideModule>

        <GuideModule title="Typography" id={1}>
          <div className="guide-inner">
            <div className="guide-inner-wrap" id="menu-demo">
              <div className="code-box" id="title-demo-basic">
                <h4 className="mb40">Title Component</h4>
                <h1 className="h1-tit">h1 버려진 섬마다 꽃이 피었다.</h1><br /><br />
                <h2 className="h2-tit">h2 버려진 섬마다 꽃이 피었다.</h2><br /><br />
                <h3 className="h3-tit">h3 버려진 섬마다 꽃이 피었다.</h3><br /><br />
                <h4 className="h4-tit">h4 버려진 섬마다 꽃이 피었다.</h4><br /><br />
                <h5 className="h5-tit">h5 버려진 섬마다 꽃이 피었다.</h5><br /><br />
                <h6 className="h6-tit">h6 버려진 섬마다 꽃이 피었다.</h6>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `
<h1 className="h1-tit">h1 버려진 섬마다 꽃이 피었다.</h1>
<h2 className="h2-tit">h2 버려진 섬마다 꽃이 피었다.</h2>
<h3 className="h3-tit">h3 버려진 섬마다 꽃이 피었다.</h3>
<h4 className="h4-tit">h4 버려진 섬마다 꽃이 피었다.</h4>
<h5 className="h5-tit">h5 버려진 섬마다 꽃이 피었다.</h5>
<h6 className="h6-tit">h6 버려진 섬마다 꽃이 피었다.</h6>`
                }</code>
              </PreCode>

              <div className="code-box" id="exp-demo-basic">
                <h4 className="mb40">Text Component</h4>
                <p className="tx-exp-tp1">* 이 차량은 헛걸음 보상제 등록차량 입니다.</p>
                <Tooltip placement="bottom">
                  <TooltipItem>
                    <i className="ico-question"></i>
                  </TooltipItem>
                  <TooltipCont>
                    <p>툴팁 내용이 나옵니다.</p>
                  </TooltipCont>
                </Tooltip>
                <p className="tx-exp-tp2">* 이 차량은 헛걸음 보상제 등록차량 입니다.</p>
                <p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이한 경우, 차량 검색을 이용해주세요.</p>
                <p className="tx-exp-tp4">이름을 입력해주세요</p>
                <p className="tx-exp-tp5">&#8251; 본 차량의 보험처리 이력정보는 2019년 03월 11일에 조회한 내용입니다.</p>
                <p className="tx-exp-tp6">&#8251; 본 차량의 보험처리 이력정보는 2019년 03월 11일에 조회한 내용입니다.</p>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<p className="tx-exp-tp1">* 이 차량은 헛걸음 보상제 등록차량 입니다.</p>
<Tooltip placement="bottom">
  <TooltipItem>
    <i className="ico-question"></i>
  </TooltipItem>
  <TooltipCont>
    <p>툴팁 내용이 나옵니다.</p>
  </TooltipCont>
</Tooltip>
<p className="tx-exp-tp2">* 이 차량은 헛걸음 보상제 등록차량 입니다.</p>
<p className="tx-exp-tp3">* 차량번호 결과가 실제 차량과 상이한 경우, 차량 검색을 이용해주세요.</p>
<p className="tx-exp-tp4">이름을 입력해주세요</p>
<p className="tx-exp-tp5">&#8251; 본 차량의 보험처리 이력정보는 2019년 03월 11일에 조회한 내용입니다.</p>`
                }</code>
              </PreCode>
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Menu" id={2}>
          <div className="guide-inner">
            <div className="guide-inner-wrap" id="menu-demo">
              <div className="code-box">
                <h4 className="mb40">Inline Menu</h4>
                <ul className="menu-list">
                  <MenuItem>
                    <MenuTitle>
                      <h4>Navigation</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className="options">
                        <p>Option 1</p>
                        <p>Option 2</p>
                      </div>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>
                      <h4>Navigation</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className="options">
                        <p>Option 1</p>
                        <p>Option 2</p>
                      </div>
                    </MenuCont>
                  </MenuItem>
                  <MenuItem>
                    <MenuTitle>
                      <h4>Navigation</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className="options">
                        <p>Option 1</p>
                        <p>Option 2</p>
                      </div>
                    </MenuCont>
                  </MenuItem>
                </ul>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import MenuItem from '@lib/share/menu/MenuItem'
import MenuTitle from '@lib/share/menu/MenuTitle'
import MenuCont from '@lib/share/menu/MenuCont'
`
                  }
                </code>
                <code className="language-markup">{
                  `
<ul className="menu-list">
  <MenuItem>
    <MenuTitle>
      <h4>Navigation</h4>
    </MenuTitle>
    <MenuCont>
      <p>Option 1</p>
      <p>Option 2</p>
    </MenuCont>
  </MenuItem>
  <MenuItem>
    <MenuTitle>
      <h4>Navigation</h4>
    </MenuTitle>
    <MenuCont>
      <p>Option 1</p>
      <p>Option 2</p>
    </MenuCont>
  </MenuItem>
  <MenuItem>
    <MenuTitle>
      <h4>Navigation</h4>
    </MenuTitle>
    <MenuCont>
      <p>Option 1</p>
      <p>Option 2</p>
    </MenuCont>
  </MenuItem>
</ul>`
                }</code>
              </PreCode>

              <div className="code-box">
                <div className="tree-menu-demo">
                  <h4 className="mb40">Tree</h4>
                  <TreeCheckCount dataProvider={dataProvider} />
                </div>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TreeCheckCount dataProvider={dataProvider} />`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Search Filter</h4>
                <ul className="menu-list search-filter">
                  <MenuItem>
                    <MenuTitle>
                      <h4>국산/수입</h4>
                    </MenuTitle>
                    <MenuCont>
                      <p className="domestic-income">
                        <CheckBox id='chk-domestic' title='국산' />
                        <CheckBox id='chk-income' title='수입' />
                      </p>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>차종</h4>
                    </MenuTitle>
                    <MenuCont>
                      <p>Option 1</p>
                      <p>Option 2</p>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>제조사/모델/등급</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className="tree-wrapper">
                        <TreeCheckCount dataProvider={dataProvider} />
                      </div>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>연식</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className={filterCheck1 === false ? 'year-filter-tp1' : 'year-filter-tp1 hidden'}>
                        <FilterRange rangeUnit="연식" initMin={2009} initMax={2018} rangeMin={2011} rangeMax={2015} />
                      </div>
                      <div className={filterCheck1 === true ? 'year-filter-tp2' : 'year-filter-tp2 hidden'}>
                        <div className="mb8">
                          <SelectBox id="from-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" />
                          <SelectBox id="from-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" />부터
                        </div>
                        <div>
                          <SelectBox id="until-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" />
                          <SelectBox id="until-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" />까지
                        </div>
                      </div>
                      <p className="mt20"><CheckBox id='chk-year-self' title='직접 입력' checked={filterCheck1} onChange={handleChangeFilter1} /></p>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>주행거리</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className={filterCheck2 === false ? 'distance-filter-tp1' : 'distance-filter-tp1 hidden'}>
                        <FilterRange rangeUnit="주행거리" initMin={10000} initMax={100000} rangeMin={20000} rangeMax={60000} />
                      </div>
                      <div className={filterCheck2 === true ? 'distance-filter-tp2' : 'distance-filter-tp2 hidden'}>
                        <div className="mb8">
                          <SelectBox id="from-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" />부터
                        </div>
                        <div>
                          <SelectBox id="until-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" />까지
                        </div>
                      </div>
                      <p><CheckBox id='chk-distance-self' className="mt20" title='직접 입력' checked={filterCheck2} onChange={handleChangeFilter2} /></p>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>가격</h4>
                    </MenuTitle>
                    <MenuCont>
                      <div className={filterCheck3 === false ? 'price-filter-tp1' : 'price-filter-tp1 hidden'}>
                        <FilterRange rangeUnit="가격" initMin={2400} initMax={3800} rangeMin={2750} rangeMax={3000} />
                      </div>
                      <div className={filterCheck3 === true ? 'price-filter-tp2' : 'price-filter-tp2 hidden'}>
                        <p>
                          <Input type="text" placeHolder="만원" width={89} height={40} />&nbsp;~&nbsp;
                          <Input type="text" placeHolder="만원" width={89} height={40} />
                          <span className="ico-search"></span>
                        </p>
                      </div>
                      <p><CheckBox id='chk-price-self' className="mt20" title='직접 입력' checked={filterCheck3} onChange={handleChangeFilter3} /></p>
                    </MenuCont>
                  </MenuItem>

                  <MenuItem>
                    <MenuTitle>
                      <h4>오토벨서비스</h4>
                    </MenuTitle>
                    <MenuCont>
                      <ul className="car-type-filter">
                        <li>
                          <CheckBox id='chk-livestudio' title='라이브스튜디오 차량' />
                          <i className="ico-question"></i>
                          <span className="count">23,999</span>
                        </li>
                        <li>
                          <CheckBox id='chk-bid' title='경매낙찰 차량' />
                          <i className="ico-question"></i>
                          <span className="count">1,323</span>
                        </li>
                        <li>
                          <CheckBox id='chk-franchise' title='프랜차이즈 차량' />
                          <i className="ico-question"></i>
                          <span className="count">21,323</span>
                        </li>
                        <li className="mb0">
                          <CheckBox id='chk-homeservice' title='홈서비스 차량' />
                          <i className="ico-question"></i>
                          <span className="count">1,234</span>
                        </li>
                      </ul>
                    </MenuCont>
                  </MenuItem>
                </ul>
                <div className="search-filter-btn">
                  <Button size="full" line="black" color="black" title="더보기" iconType='arrow' className="mb8" />
                  <Button size="full" background="blue80" title="최근 검색조건" />
                </div>

              </div>
              <PreCode>
                <code className="language-markup">{
                  `<ul className="menu-list search-filter">
  <MenuItem>
    <MenuTitle>
      <h4>국산/수입</h4>
    </MenuTitle>
    <MenuCont>
      <p className="domestic-income">
        <CheckBox id='chk-domestic' title='국산' />
        <CheckBox id='chk-income' title='수입' />
      </p>
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>차종</h4>
    </MenuTitle>
    <MenuCont>
      <p>Option 1</p>
      <p>Option 2</p>
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>제조사/모델/등급</h4>
    </MenuTitle>
    <MenuCont>
    <TreeCheckCount dataProvider={dataProvider} />
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>연식</h4>
    </MenuTitle>
    <MenuCont>
      <div className="year-filter-tp1">
        <p className="year-tit"><span className="tx-blue80">2015</span> ~ <span className="tx-blue80">2018</span> 연식</p>
        <div className="price-range">
          <InputRange
            minValue={initValue.min}
            maxValue={initValue.max}
            value={rangeValue}
            disabled={false}
            onChange={handleInputRange}
          />
        </div>
      </div>
      <div className="year-filter-tp2" style={{display: 'none'}}>
        <p className="mb8">
          <SelectBox id="from-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" />
          <SelectBox id="from-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" />부터
        </p>
        <p>
          <SelectBox id="until-year" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="년" />
          <SelectBox id="until-month" className="items-sbox mr8" options={select1_list} width={100} height={40} placeHolder="월" />까지
        </p>
      </div>
      <p className="mt20"><CheckBox id='chk-year-self' title='직접 입력' /></p>
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>주행거리</h4>
    </MenuTitle>
    <MenuCont>
      <div className="distance-filter-tp1">
        <p className="distance-tit"><span className="tx-blue80">4만</span> ~ <span className="tx-blue80">8만</span> km</p>
        <div className="price-range">
          <InputRange
            minValue={initValue.min}
            maxValue={initValue.max}
            value={rangeValue}
            disabled={true}
            onChange={handleInputRange}
          />
        </div>
      </div>
      <div className="distance-filter-tp2" style={{display: 'none'}}>
        <p className="mb8">
          <SelectBox id="from-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" />부터
        </p>
        <p>
          <SelectBox id="until-distance" className="items-sbox mr8" options={select1_list} width={208} height={40} placeHolder="선택" />까지
        </p>
      </div>
      <p><CheckBox id='chk-distance-self' className="mt20" title='직접 입력' /></p>
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>가격</h4>
    </MenuTitle>
    <MenuCont>
      <div className="price-filter-tp1">
        <p className="price-tit"><span className="tx-blue80">2,850</span> 만원 ~<span className="tx-blue80"> 4,700</span> 만원</p>
        <div className="price-range">
          <InputRange
            minValue={initValue.min}
            maxValue={initValue.max}
            value={rangeValue}
            disabled={true}
            onChange={handleInputRange}
          />
        </div>
      </div>
      <div className="price-filter-tp2" style={{display: 'none'}}>
        <p>
          <Input type="text" placeHolder="만원" width={89} height={40} />&nbsp;~&nbsp;
          <Input type="text" placeHolder="만원" width={89} height={40} />
          <span className="ico-search"></span>
        </p>
      </div>
      <p><CheckBox id='chk-price-self' className="mt20" title='직접 입력' /></p>
    </MenuCont>
  </MenuItem>

  <MenuItem>
    <MenuTitle>
      <h4>오토벨서비스</h4>
    </MenuTitle>
    <MenuCont>
      <ul className="car-type-filter">
        <li>
          <CheckBox id='chk-livestudio' title='라이브스튜디오 차량' />
          <i className="ico-question"></i>
          <span className="count">23,999</span>
        </li>
        <li>
          <CheckBox id='chk-bid'title='경매낙찰 차량' />
          <i className="ico-question"></i>
          <span className="count">1,323</span>
        </li>
        <li>
          <CheckBox id='chk-franchise'title='프랜차이즈 차량' />
          <i className="ico-question"></i>
          <span className="count">21,323</span>
        </li>
        <li className="mb0">
          <CheckBox id='chk-homeservice'title='홈서비스 차량' />
          <i className="ico-question"></i>
          <span className="count">1,234</span>
        </li>
      </ul>
    </MenuCont>
  </MenuItem>

  <MenuItem buttons={true}>
    <Button size="full" line="black" color="black" title="더보기" iconType='arrow' className="mb8" />
    <Button size="full" background="blue80" title="최근 검색조건" />
  </MenuItem>
</ul>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">My Page</h4>
                <MypageNavi mode="dealer" />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import MypageNavi from '@src/components/common/MypageNavi';`
                  }
                </code>
                <code className="language-markup">{
                  `
<MypageNavi mode="dealer" />`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">PricingSystem</h4>

              </div>
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Pagination Menu" id={3}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">Pagination Type1</h4>
                <div className="list-wrap">
                  <PageItem max={3} initNum={1}>
                    <div className="list-tit">
                      <Pagination />
                    </div>
                    <PageCont id={1}>
                      <ul className="goods-list col3">{car_list.map((v, i) => {
                        if (i < 3) return (<BannerItem key={i} name={`테스트 1 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
                      })}</ul>
                    </PageCont>
                    <PageCont id={2}>
                      <ul className="goods-list col3">{car_list.map((v, i) => {
                        if (i < 3) return (<BannerItem key={i} name={`테스트 2 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
                      })}</ul>
                    </PageCont>
                    <PageCont id={3}>
                      <ul className="goods-list col3">{car_list.map((v, i) => {
                        if (i < 3) return (<BannerItem key={i} name={`테스트 3 - ${v.name}`} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
                      })}</ul>
                    </PageCont>
                  </PageItem>
                </div>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import PageItem from '@lib/share/items/PageItem'
import Pagination from '@lib/share/items/Pagination'
import PageCont from '@lib/share/items/PageCont'

const handleBtnClick = useCallback((e, id) => {
  alert(id);
}, []);
`
                  }
                </code>
                <code className="language-markup">{
                  `
<div className="list-autobell">
  <PageItem min={1} max={3} initNum={2}>
    <div className="list-tit">
      <h3>Autobell Studio 차량</h3>
      <Pagination />
    </div>
    <PageCont id={1}>
      <ul className="goods-list col3">{car_list.map((v, i) => {
        if(i < 6) return (<BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
      })}</ul>
    </PageCont>
    <PageCont id={2}>
      <ul className="goods-list col3">{car_list.map((v, i) => {
        if(i < 6) return (<BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
      })}</ul>
    </PageCont>
    <PageCont id={3}>
      <ul className="goods-list col3">{car_list.map((v, i) => {
        if(i < 6) return (<BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />)
      })}</ul>
    </PageCont>
  </PageItem>
</div>`
                }</code>
              </PreCode>
            </div>

            <div className="code-box">
              <h4 className="mb40">Pagination Type2</h4>
              <PageNavigator recordCount={100} />
            </div>
            <PreCode>
              <code className="language-javascript">
                {
                  `import PageNavigator from '@src/components/common/PageNavigator'
`
                }
              </code>
              <code className="language-markup">{
                `
<PageNavigator recordCount={100} />`
              }</code>
            </PreCode>
          </div>
          <GuideApi cname="PageItem" api_info={api_list["page_item"]} />
          <GuideApi cname="PageCont" api_info={api_list["page_cont"]} />
        </GuideModule>

        <GuideModule title="Steps" id={4}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <Steps type={1} contents={['title1-1', 'title1-1', 'title1-1', 'title1-1', 'title1-1']} active={1} mode="hasLink" links={['a1', 'b1', 'c1', 'd1', 'e1']} />
                <Steps type={1} contents={['title1-2', 'title1-2', 'title1-2', 'title1-2', 'title1-2']} active={2} mode="hasLink" links={['a2', 'b2', 'c2', 'd2', 'e2']} />
                <Steps type={1} contents={['title1-3', 'title1-3', 'title1-3', 'title1-3', 'title1-3']} active={3} mode="hasLink" links={['a3', 'b3', 'c3', 'd3', 'e3']} />
                <Steps type={1} contents={['title1-4', 'title1-4', 'title1-4', 'title1-4', 'title1-4']} active={4} mode="hasLink" links={['a4', 'b4', 'c4', 'd4', 'e4']} />
                <Steps type={1} contents={['title1-5', 'title1-5', 'title1-5', 'title1-5', 'title1-5']} active={5} mode="hasLink" links={['a5', 'b5', 'c5', 'd5', 'e5']} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Steps from '@lib/share/items/Steps'
`
                  }
                </code>
                <code className="language-markup">{
                  `
<Steps type={1} contents={['title1-1', 'title1-1', 'title1-1', 'title1-1', 'title1-1']} active={1} mode="hasLink" links={['a1', 'b1', 'c1', 'd1', 'e1']} />
<Steps type={1} contents={['title1-2', 'title1-2', 'title1-2', 'title1-2', 'title1-2']} active={2} mode="hasLink" links={['a2', 'b2', 'c2', 'd2', 'e2']} />
<Steps type={1} contents={['title1-3', 'title1-3', 'title1-3', 'title1-3', 'title1-3']} active={3} mode="hasLink" links={['a3', 'b3', 'c3', 'd3', 'e3']} />
<Steps type={1} contents={['title1-4', 'title1-4', 'title1-4', 'title1-4', 'title1-4']} active={4} mode="hasLink" links={['a4', 'b4', 'c4', 'd4', 'e4']} />
<Steps type={1} contents={['title1-5', 'title1-5', 'title1-5', 'title1-5', 'title1-5']} active={5} mode="hasLink" links={['a5', 'b5', 'c5', 'd5', 'e5']} />`
                }</code>
              </PreCode>

              <div className="code-box bg-blue80">
                <Steps type={2} contents={['title2-1-1', 'title2-1-2', 'title2-1-3', 'title2-1-4', 'title2-1-5']} active={1} mode="hasLink" links={['a1', 'b1', 'c1', 'd1', 'e1']} />
                <Steps type={2} contents={['title2-2-1', 'title2-2-2', 'title2-2-3', 'title2-2-4', 'title2-2-5']} active={2} mode="hasLink" links={['a2', 'b2', 'c2', 'd2', 'e2']} />
                <Steps type={2} contents={['title2-3-1', 'title2-3-2', 'title2-3-3', 'title2-3-4', 'title2-3-5']} active={3} mode="hasLink" links={['a3', 'b3', 'c3', 'd3', 'e3']} />
                <Steps type={2} contents={['title2-4-1', 'title2-4-2', 'title2-4-3', 'title2-4-4', 'title2-4-5']} active={4} mode="hasLink" links={['a4', 'b4', 'c4', 'd4', 'e4']} />
                <Steps type={2} contents={['title2-5-1', 'title2-5-2', 'title2-5-3', 'title2-5-4', 'title2-5-5']} active={5} mode="hasLink" links={['a5', 'b5', 'c5', 'd5', 'e5']} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Steps from '@lib/share/items/Steps'
`
                  }
                </code>
                <code className="language-markup">{
                  `
<Steps type={2} contents={['title2-1-1', 'title2-1-2', 'title2-1-3', 'title2-1-4', 'title2-1-5']} active={1} mode="hasLink" links={['a1', 'b1', 'c1', 'd1', 'e1']} />
<Steps type={2} contents={['title2-2-1', 'title2-2-2', 'title2-2-3', 'title2-2-4', 'title2-2-5']} active={2} mode="hasLink" links={['a2', 'b2', 'c2', 'd2', 'e2']} />
<Steps type={2} contents={['title2-3-1', 'title2-3-2', 'title2-3-3', 'title2-3-4', 'title2-3-5']} active={3} mode="hasLink" links={['a3', 'b3', 'c3', 'd3', 'e3']} />
<Steps type={2} contents={['title2-4-1', 'title2-4-2', 'title2-4-3', 'title2-4-4', 'title2-4-5']} active={4} mode="hasLink" links={['a4', 'b4', 'c4', 'd4', 'e4']} />
<Steps type={2} contents={['title2-5-1', 'title2-5-2', 'title2-5-3', 'title2-5-4', 'title2-5-5']} active={5} mode="hasLink" links={['a5', 'b5', 'c5', 'd5', 'e5']} />`
                }</code>
              </PreCode>

              <div className="code-box bg-blue80">
                <Steps type={2} contents={['title2-1-1', 'title2-1-2', 'title2-1-3']} active={1} />
                <Steps type={2} contents={['title2-2-1', 'title2-2-2', 'title2-2-3']} active={2} />
                <Steps type={2} contents={['title2-3-1', 'title2-3-2', 'title2-3-3']} active={3} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Steps from '@lib/share/items/Steps'
`
                  }
                </code>
                <code className="language-markup">{
                  `
<Steps type={2} contents={['title2-1-1', 'title2-1-2', 'title2-1-3']} active={1} />
<Steps type={2} contents={['title2-2-1', 'title2-2-2', 'title2-2-3']} active={2} />
<Steps type={2} contents={['title2-3-1', 'title2-3-2', 'title2-3-3']} active={3} />`
                }</code>
              </PreCode>

              <div className="code-box">
                <Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} />
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Steps from '@lib/share/items/Steps'
`
                  }
                </code>
                <code className="language-markup">{
                  `
<Steps type={1} contents={['이용약관 및 개인정보수집 및 \n이용에 관한 동의', '본인인증', '가입정보입력', '회원가입완료']} active={1} reverse={true} />`
                }</code>
              </PreCode>
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Icon" id={5}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box" id="tag-demo-basic">
                <h4 className="mb40">Ellipse Icons</h4>
                {/* <ul className="ico-list ico-like-wrap">
                  <li>
                    <i className="ico-like"></i>
                  </li>
                  <li>
                    <i className="ico-view"></i>
                  </li>
                  <li>
                    <i className="ico-share"></i>
                  </li>
                </ul> */}

                <ul className="ico-list ico-sns-wrap">
                  <li>
                    <i className="ico-talk"></i>
                  </li>
                  <li>
                    <i className="ico-story"></i>
                  </li>
                  <li>
                    <i className="ico-line"></i>
                  </li>
                  <li>
                    <i className="ico-band"></i>
                  </li>
                  <li>
                    <i className="ico-facebook"></i>
                  </li>
                  <li>
                    <i className="ico-twitter"></i>
                  </li>
                  <li>
                    <i className="ico-mail"></i>
                  </li>
                  <li>
                    <i className="ico-url"></i>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<ul className="ico-like-wrap">
  <li><i className="ico-like"></i></li>
  <li><i className="ico-view"></i></li>
  <li><i className="ico-share"></i></li>
</ul>

<ul className="ico-sns-wrap">
  <li><i className="ico-talk"></i></li>
  <li><i className="ico-story"></i></li>
  <li><i className="ico-line"></i></li>
  <li><i className="ico-band"></i></li>
  <li><i className="ico-facebook"></i></li>
  <li><i className="ico-twitter"></i></li>
  <li><i className="ico-mail"></i></li>
</ul>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Large Icons</h4>
                <ul className="ico-list ico-large-wrap">
                  <li>
                    <i className="ico-service-01"></i>
                  </li>
                  <li>
                    <i className="ico-service-02"></i>
                  </li>
                  <li>
                    <i className="ico-service-03"></i>
                  </li>
                  <li>
                    <i className="ico-visit-assess"></i>
                  </li>
                  <li>
                    <i className="ico-self-register"></i>
                  </li>
                  <li>
                    <i className="ico-none-assess"></i>
                  </li>
                  <li>
                    <i className="ico-confirm-big"></i>
                  </li>
                  <li>
                    <i className="ico-deliver-big"></i>
                  </li>
                  <li>
                    <i className="ico-refund-big"></i>
                  </li>
                  <li>
                    <i className="ico-inquiry"></i>
                  </li>
                  <li>
                    <i className="ico-certify"></i>
                  </li>
                  <li>
                    <i className="ico-resting"></i>
                  </li>
                  <li>
                    <i className="ico-lock"></i>
                  </li>
                  <li>
                    <i className="ico-date"></i>
                  </li>
                  <li>
                    <i className="ico-car"></i>
                  </li>
                  <li>
                    <i className="ico-notify-big"></i>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<i className="ico-service-01"></i>
<i className="ico-service-02"></i>
<i className="ico-service-03"></i>
<i className="ico-confirm-big"></i>
<i className="ico-deliver-big"></i>
<i className="ico-refund-big"></i>
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Large Icons - white</h4>
                <ul className="ico-list ico-large-wrap white">
                  <li>
                    <i className="ico-confirm-white"></i>
                  </li>
                  <li>
                    <i className="ico-deliver-white"></i>
                  </li>
                  <li>
                    <i className="ico-refund-white"></i>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<i className="ico-confirm-white"></i>
<i className="ico-deliver-white"></i>
<i className="ico-refund-white"></i>
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Medium Icons</h4>
                <ul className="ico-list ico-medium-wrap">
                  <li className="on"><i className="ico-sunroof"></i></li>
                  <li className="on"><i className="ico-navigation"></i></li>
                  <li className="on"><i className="ico-ventilation-seat"></i></li>
                  <li className="on"><i className="ico-smartcruze"></i></li>
                  <li className="on"><i className="ico-smart-key"></i></li>
                  <li className="on"><i className="ico-hud"></i></li>
                  <li className="on"><i className="ico-around-view"></i></li>
                  <li className="on"><i className="ico-blind-spot-warning"></i></li>
                  <li className="on"><i className="ico-led"></i></li>
                  <li className="on"><i className="ico-hid"></i></li>
                  <li className="on"><i className="ico-hipass"></i></li>
                  <li className="on"><i className="ico-parking-sensor"></i></li>
                  <li className="on"><i className="ico-back-camera"></i></li>
                  <li className="on"><i className="ico-checking"></i></li>
                  <li className="on"><i className="ico-insurance"></i></li>
                  <li className="on"><i className="ico-result"></i></li>
                  <li className="on"><i className="ico-refund"></i></li>
                  <li className="on"><i className="ico-business"></i></li>
                  <li className="on"><i className="ico-clock"></i></li>
                  <li className="on"><i className="ico-corporation"></i></li>
                  <li className="on"><i className="ico-individual"></i></li>
                  <li className="on"><i className="ico-setting"></i></li>
                  <li className="on"><i className="ico-smartphone"></i></li>

                  <li><i className="ico-sunroof"></i></li>
                  <li><i className="ico-navigation"></i></li>
                  <li><i className="ico-ventilation-seat"></i></li>
                  <li><i className="ico-smartcruze"></i></li>
                  <li><i className="ico-smart-key"></i></li>
                  <li><i className="ico-hud"></i></li>
                  <li><i className="ico-around-view"></i></li>
                  <li><i className="ico-blind-spot-warning"></i></li>
                  <li><i className="ico-led"></i></li>
                  <li><i className="ico-hid"></i></li>
                  <li><i className="ico-hipass"></i></li>
                  <li><i className="ico-parking-sensor"></i></li>
                  <li><i className="ico-back-camera"></i></li>
                  <li><i className="ico-checking"></i></li>
                  <li><i className="ico-insurance"></i></li>
                  <li><i className="ico-result"></i></li>
                  <li><i className="ico-refund"></i></li>
                  <li><i className="ico-business"></i></li>
                  <li><i className="ico-clock"></i></li>
                  <li><i className="ico-corporation"></i></li>
                  <li><i className="ico-individual"></i></li>
                  <li><i className="ico-setting"></i></li>
                  <li><i className="ico-smartphone"></i></li>
                  <li><i className="ico-setting"></i></li>
                  <li><i className="ico-autobell-gray"></i></li>
                  <li><i className="ico-document"></i></li>
                  <li><i className="ico-counsel"></i></li>
                  <li>
                    <button className="btn-arrow-next-mid"></button>
                  </li>
                  <li>
                    <button className="btn-arrow-prev-mid"></button>
                  </li>
                  <li>
                    <button className="btn-close-mid"></button>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<li className="on"><i className="ico-sunroof"></i></li>
<li className="on"><i className="ico-navigation"></i></li>
<li className="on"><i className="ico-ventilation-seat"></i></li>
<li className="on"><i className="ico-smartcruze"></i></li>
<li className="on"><i className="ico-smart-key"></i></li>
<li className="on"><i className="ico-hud"></i></li>
<li className="on"><i className="ico-around-view"></i></li>
<li className="on"><i className="ico-blind-spot-warning"></i></li>
<li className="on"><i className="ico-led"></i></li>
<li className="on"><i className="ico-hid"></i></li>
<li className="on"><i className="ico-hipass"></i></li>
<li className="on"><i className="ico-parking-sensor"></i></li>
<li className="on"><i className="ico-back-camera"></i></li>
<li className="on"><i className="ico-checking"></i></li>
<li className="on"><i className="ico-insurance"></i></li>
<li className="on"><i className="ico-result"></i></li>
<li className="on"><i className="ico-refund"></i></li>
<li className="on"><i className="ico-business"></i></li>
<li className="on"><i className="ico-clock"></i></li>
<li className="on"><i className="ico-corporation"></i></li>
<li className="on"><i className="ico-individual"></i></li>
<li className="on"><i className="ico-setting"></i></li>
<li className="on"><i className="ico-smartphone"></i></li>

<li><i className="ico-sunroof"></i></li>
<li><i className="ico-navigation"></i></li>
<li><i className="ico-ventilation-seat"></i></li>
<li><i className="ico-smartcruze"></i></li>
<li><i className="ico-smart-key"></i></li>
<li><i className="ico-hud"></i></li>
<li><i className="ico-around-view"></i></li>
<li><i className="ico-blind-spot-warning"></i></li>
<li><i className="ico-led"></i></li>
<li><i className="ico-hid"></i></li>
<li><i className="ico-hipass"></i></li>
<li><i className="ico-parking-sensor"></i></li>
<li><i className="ico-back-camera"></i></li>
<li><i className="ico-checking"></i></li>
<li><i className="ico-insurance"></i></li>
<li><i className="ico-result"></i></li>
<li><i className="ico-refund"></i></li>
<li><i className="ico-business"></i></li>
<li><i className="ico-clock"></i></li>
<li><i className="ico-corporation"></i></li>
<li><i className="ico-individual"></i></li>
<li><i className="ico-setting"></i></li>
<li><i className="ico-smartphone"></i></li>
<button className="btn-arrow-next-mid"></button>
<button className="btn-arrow-prev-mid"></button>
<button className="btn-close-mid"></button>
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Midium Icons - white</h4>
                <ul className="ico-list ico-medium-wrap white">
                  <li><i className="ico-allcar"></i></li>
                  <li><i className="ico-livestudio"></i></li>
                  <li><i className="ico-bid"></i></li>
                  <li><i className="ico-income"></i></li>
                  <li><i className="ico-financial"></i></li>
                  <li><i className="ico-franchise"></i></li>
                  <li><i className="ico-notify-white"></i></li>
                  <li><i className="ico-arrow-white"></i></li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<i className="ico-allcar"></i>
<i className="ico-livestudio"></i>
<i className="ico-bid"></i>
<i className="ico-income"></i>
<i className="ico-financial"></i>
<i className="ico-franchise"></i>
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Small Icons</h4>
                <ul className="ico-list ico-small-wrap">
                  <li>
                    <button className="btn-prev-xs"></button>
                  </li>
                  <li>
                    <button className="btn-next-xs"></button>
                  </li>
                  <li>
                    <button className="btn-close"></button>
                  </li>
                  <li>
                    <i className="ico-plus"></i>
                  </li>
                  <li>
                    <i className="ico-question"></i>
                  </li>
                  <li>
                    <i className="ico-del"></i>
                  </li>
                  <li>
                    <i className="ico-del xs"></i>
                  </li>
                  <li>
                    <i className="ico-talk-blue"></i>
                  </li>
                  <li>
                    <i className="ico-reset"></i>
                  </li>
                  <li>
                    <i className="ico-sel-arrow"></i>
                  </li>
                  <li>
                    <i className="ico-arrow"></i>
                  </li>
                  <li>
                    <i className="ico-pencil"></i>
                  </li>
                  <li>
                    <i className="ico-thumb-view"></i>
                  </li>
                  <li className="on">
                    <i className="ico-thumb-view"></i>
                  </li>
                  <li>
                    <i className="ico-list-view"></i>
                  </li>
                  <li className="on">
                    <i className="ico-list-view"></i>
                  </li>
                  <li>
                    <i className="ico-low-price"></i>
                  </li>
                  <li>
                    <i className="ico-high-price"></i>
                  </li>
                  <li>
                    <i className="ico-next-blue"></i>
                  </li>
                  <li>
                    <i className="ico-plus-blue"></i>
                  </li>
                  <li>
                    <i className="ico-dot big"></i>
                  </li>
                  <li>
                    <i className="ico-dot mid"></i>
                  </li>
                  <li>
                    <i className="ico-dot sml"></i>
                  </li>
                  <li>
                    <i className="ico-state-x on"></i>
                  </li>
                  <li>
                    <i className="ico-state-w on"></i>
                  </li>
                  <li>
                    <i className="ico-state-c on"></i>
                  </li>
                  <li>
                    <i className="ico-state-x"></i>
                  </li>
                  <li>
                    <i className="ico-state-w"></i>
                  </li>
                  <li>
                    <i className="ico-state-c"></i>
                  </li>
                  <li>
                    <i className="ico-essential-chk"></i>
                  </li>
                  <li>
                    <i className="ico-app-blue"></i>
                  </li>
                  <li>
                    <i className="ico-notify"></i>
                  </li>
                  <li>
                    <i className="ico-file"></i>
                  </li>
                  <li>
                    <i className="ico-delete"></i>
                  </li>
                  <li>
                    <i className="ico-heart"></i>
                  </li>
                  <li className="on">
                    <i className="ico-heart"></i>
                  </li>
                  <li>
                    <i className="ico-compare"></i>
                  </li>
                  <li className="on">
                    <i className="ico-compare"></i>
                  </li>
                  <li>
                    <i className="ico-heart-xs"></i>
                  </li>
                  <li>
                    <i className="ico-count-xs"></i>
                  </li>
                  <li>
                    <i className="ico-circle-plus"></i>
                  </li>
                  <li>
                    <i className="ico-circle-equal"></i>
                  </li>
                  <li>
                    <i className="ico-heart-line"></i>
                  </li>
                  <li>
                    <i className="ico-note"></i>
                  </li>
                  <li>
                    <i className="ico-notice"></i>
                  </li>
                  <li>
                    <i className="ico-triangle-top"></i>
                  </li>
                  <li>
                    <i className="ico-triangle-bottom"></i>
                  </li>
                  <li>
                    <i className="ico-yes"></i>
                  </li>
                  <li>
                    <i className="ico-none"></i>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<button className="btn-prev"></button>
<button className="btn-next"></button>
<button className="btn-close"></button>
<i className="ico-question"></i>
<i className="ico-del"></i>
<i className="ico-talk-blue"></i>
<i className="ico-reset"></i>
<i className="ico-sel-arrow"></i>
<i className="ico-arrow"></i>
<i className="ico-check-white"></i>
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Small Icons - white</h4>
                <ul className="ico-list ico-small-wrap white">
                  <li>
                    <i className="ico-arrow-white sml"></i>
                  </li>
                  <li>
                    <i className="ico-play"></i>
                  </li>
                  <li>
                    <i className="ico-pause"></i>
                  </li>
                  <li>
                    <i className="ico-fullscreen"></i>
                  </li>
                  <li>
                    <i className="ico-zoomin"></i>
                  </li>
                  <li>
                    <i className="ico-zoomout"></i>
                  </li>
                  <li>
                    <i className="ico-search"></i>
                  </li>
                  <li>
                    <i className="ico-chat"></i>
                  </li>
                  <li>
                    <button className="ico-close-white"></button>
                  </li>
                  <li>
                    <i className="ico-plus-white"></i>
                  </li>
                  <li>
                    <i className="ico-check-white"></i>
                  </li>
                  <li>
                    <i className="ico-step-arrow-white"></i>
                  </li>
                </ul>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `
<i className="ico-question"></i>
<i className="ico-del"></i>
<i className="ico-talk-blue"></i>
<i className="ico-reset"></i>
<i className="ico-sel-arrow"></i>
<i className="ico-arrow"></i>
<i className="ico-check-white"></i>
`
                }</code>
              </PreCode>
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Badge &amp; Label" id={6}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="guide-inner-left">

                <div className="code-box">
                  <h4 className="mb40">Remove Dynamically</h4>
                  <DynamicCategory>
                    <CategoryItem category={['Categories1', 'Tag 1-1', 'Tag 1-2', 'Tag 1-3']} />
                    <CategoryItem category={['Categories2', 'Tag 2-1', 'Tag 2-2', 'Tag 2-3']} />
                    <CategoryItem category={['Categories3', 'Tag 3-1', 'Tag 3-2', 'Tag 3-3']} />
                    <CategoryItem category={['Categories4', 'Tag 4-1', 'Tag 4-2']} />
                  </DynamicCategory>
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import DynamicCategory from '@lib/share/items/DynamicCategory'
import CategoryItem from '@lib/share/items/CategoryItem'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<DynamicCategory>
  <CategoryItem category={['Categories 1', 'Tag 1-1', 'Tag 1-2', 'Tag 1-3']} />
  <CategoryItem category={['Categories 2', 'Tag 2-1', 'Tag 2-2', 'Tag 2-3']} />
  <CategoryItem category={['Categories 3', 'Tag 3-1', 'Tag 3-2', 'Tag 3-3']} />
  <CategoryItem category={['Categories 4', 'Tag 4-1', 'Tag 4-2']} />
</DynamicCategory>`
                  }</code>
                </PreCode>

                <div className="code-box" id="option-demo-basic">
                  <h4 className="mb40">Label</h4>
                  <span className="option-tp1">홈서비스</span>
                  <span className="option-tp1">EW</span><br /><br />

                  <span className="option-tp2 bg-red">라이브</span>
                  <span className="option-tp2 bg-blue60">경매</span><br /><br />

                  <span className="option-tp3-big bg-blue60">인증</span>
                  <span className="option-tp3-sml bg-blue60">인증</span><br /><br />

                  <span className="option-tp4 bg-blue80">낙찰차량</span>
                  <span className="option-tp4 bg-gray">대기차량</span>
                  <span className="option-tp4 bg-green">프랜차이즈</span>
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<span className="option-tp1">홈서비스</span>
<span className="option-tp1">EW</span>

<span className="option-tp2 bg-red">라이브</span>
<span className="option-tp2 bg-blue60">경매</span>

<span className="option-tp3-big bg-blue60">인증</span>
<span className="option-tp3-sml bg-blue60">인증</span>`
                  }</code>
                </PreCode>
              </div>

              <div className="guide-inner-right">
                <div className="code-box" id="tag-demo-basic">
                  <h4 className="mb40">Colorful Tag</h4>
                  <em className="tag-tp1 tx-blue60">EW</em>
                  <em className="tag-tp1 tx-pink">헛걸음</em>
                  <em className="tag-tp1 tx-sky">수입/금융사인증</em>
                  <em className="tag-tp1 tx-purple">홈서비스</em>
                  <em className="tag-tp1 tx-gold">프랜차이즈</em>
                  <em className="tag-tp1 tx-green">금융인증</em><br /><br />

                  <em className="tag-tp2 tx-blue60">EW</em>
                  <em className="tag-tp2 tx-pink">헛걸음</em>
                  <em className="tag-tp2 tx-sky">수입/금융사인증</em>
                  <em className="tag-tp2 tx-purple">홈서비스</em>
                  <em className="tag-tp2 tx-gold">프랜차이즈</em>
                  <em className="tag-tp2 tx-green">금융인증</em><br /><br />

                  <em className="tag-tp3 bg-blue60">E</em>
                  <em className="tag-tp3 bg-pink">헛</em>
                  <em className="tag-tp3 bg-sky80">수</em>
                  <em className="tag-tp3 bg-purple">홈</em>
                  <em className="tag-tp3 bg-gold">프</em>
                  <em className="tag-tp3 bg-green">금</em><br /><br />

                  <em className="tag-tp4 bg-sky80">홈</em>
                  <em className="tag-tp4 bg-green">프</em>
                  <em className="tag-tp4 bg-purple">오</em>
                  <em className="tag-tp4 bg-yellow">Fc</em>

                  <span className="tag-tp5">차량등록상품</span>
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<em className="tag-tp1 tx-blue60">EW</em>
<em className="tag-tp1 tx-pink">헛걸음</em>
<em className="tag-tp1 tx-sky">수입/금융사인증</em>
<em className="tag-tp1 tx-purple">홈서비스</em>
<em className="tag-tp1 tx-gold">프랜차이즈</em>
<em className="tag-tp1 tx-green">금융인증</em>

<em className="tag-tp2 tx-blue60">EW</em>
<em className="tag-tp2 tx-pink">헛걸음</em>
<em className="tag-tp2 tx-sky">수입/금융사인증</em>
<em className="tag-tp2 tx-purple">홈서비스</em>
<em className="tag-tp2 tx-gold">프랜차이즈</em>
<em className="tag-tp2 tx-green">금융인증</em>

<em className="tag-tp3 bg-blue60">E</em>
<em className="tag-tp3 bg-pink">헛</em>
<em className="tag-tp3 bg-sky80">수</em>
<em className="tag-tp3 bg-purple">홈</em>
<em className="tag-tp3 bg-gold">프</em>
<em className="tag-tp3 bg-green">금</em>`
                  }</code>
                </PreCode>

                <div className="code-box">
                  <p className="price-tp1">4,080<span className="won">만원</span></p><br />
                  <p className="price-tp2">4,080<span className="won">만원</span></p><br />
                  <p className="price-tp3">665,000<span className="won">원</span></p><br />
                  <p className="price-tp4">150,000<span className="won">원</span></p><br />
                  <p className="price-tp4 tx-gray">150,000<span className="won">원</span></p><br />
                  <p className="price-tp5">150,000<span className="won">원</span></p><br />
                  <p className="price-tp6">7,760<span className="won">원</span></p><br />
                  <p className="price-tp7">1,890<span className="won">원</span></p><br />
                  <p className="num-tx">총 <span className="ea">1,023</span> 대</p>
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<p className="price-tp1">4,080<span className="won">만원</span></p>
<p className="price-tp2">4,080<span className="won">만원</span></p>
<p className="price-tp3">665,000<span className="won">원</span></p>
<p className="price-tp4">150,000<span className="won">원</span></p>
<p className="price-tp4 tx-gray">150,000<span className="won">원</span></p>
<p className="num-tx">총 <span className="ea">1,023</span> 대</p>`
                  }</code>
                </PreCode>

              </div>



            </div>
          </div>
        </GuideModule>

        <GuideModule title="Checkbox" id={7}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="guide-inner-left">
                <div className="code-box" id="chk-demo-basic">
                  <h4 className="mb40">Basic</h4>
                  <ul className="color-list">
                    <li><CheckBox id='chk-basic' title='Checkbox' /></li>
                    <li><CheckBox id='chk-basic-sml' title='Checkbox' size="small" /></li>
                    <li><CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} /></li>
                  </ul>
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import CheckBox from '@lib/share/items/CheckBox'

`
                  }</code>

                  <code className="language-markup">{
                    `
<CheckBox id='chk-basic' title='Checkbox' />
<CheckBox id='chk-basic-sml' title='Checkbox' size="small" />
<CheckBox id='chk-basic-no' title='No Border' size="noborder" checked={true} />`
                  }</code>
                </PreCode>
              </div>

              <div className="guide-inner-right">
                <div className="code-box" id="chk-demo-disabled">
                  <h4 className="mb40">Disabled</h4>
                  <ul className="color-list">
                    <li><CheckBox id='chk-basic-dis' title='Checkbox' disabled={true} /></li>
                    <li><CheckBox id='chk-basic-sml-dis' title='Checkbox' size="small" disabled={true} /></li>
                    <li><CheckBox id='chk-basic-no-dis' title='No Border' size="noborder" checked={true} disabled={true} /></li>
                  </ul>
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import CheckBox from '@lib/share/items/CheckBox'

`
                  }</code>

                  <code className="language-markup">{
                    `
<CheckBox id='chk-basic-dis' title='Checkbox' disabled={true} />
<CheckBox id='chk-basic-sml-dis' title='Checkbox' size="small" disabled={true} />
<CheckBox id='chk-basic-no-dis' title='No Border' size="noborder" checked={true} disabled={true} />`
                  }</code>
                </PreCode>
              </div>

              <div className="code-box">
                <h4 className="mb40">Check all</h4>
                <CheckBoxGroup title="Check all" id="chk-group-all" agree_list={[
                  { id: 'chk-group-1', title: 'Essential', checked: true },
                  { id: 'chk-group-2', title: 'Essential', checked: false },
                  { id: 'chk-group-3', title: 'Essential', checked: true },
                  { id: 'chk-group-4', title: 'Choice', checked: false },
                  { id: 'chk-group-5', title: 'Choice', checked: true }
                ]} />
              </div>
              <div className="code-box">
                <h4 className="mb40">전체 동의</h4>
                <CheckBoxGroup title="전체 동의" id="chk-agree-all" type="terms" agree_list={[
                  { id: 'chk-agree-1', title: '개인정보 수집/이용 동의(필수)', checked: true },
                  { id: 'chk-agree-2', title: '고유식별정보 수집/이용 동의(필수)', checked: false },
                  { id: 'chk-agree-3', title: '개인정보처리의 위탁에 관한 사항(필수)', checked: false },
                  { id: 'chk-agree-4', title: '마케팅 활용동의(선택)', checked: false },
                  { id: 'chk-agree-5', title: '개인정보 제3자 제공에 관한 사항(선택)', checked: false }
                ]} />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CheckBox from '@lib/share/items/CheckBox'
`
                }</code>

                <code className="language-markup">{
                  `
<CheckBoxGroup title="Check all" agree_list={[
  { id: 'chk-agree-1', title:'Essential', checked: true },
  { id: 'chk-agree-2', title:'Essential', checked: false },
  { id: 'chk-agree-3', title:'Essential', checked: true },
  { id: 'chk-agree-4', title:'Choice', checked: false },
  { id: 'chk-agree-5', title:'Choice', checked: true }
]} />`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Basic Color List</h4>
                <CheckColors />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CheckBox from '@lib/share/items/CheckBox'

`
                }</code>
                <code className="language-markup">{
                  `<CheckBox id='chk-white' title='흰색' />
<CheckBox id='chk-pearl' className="chip-pearl chk-black" title='진주색' />
<CheckBox id='chk-black' className="chip-black chk-white" title='검정색' checked={true} />
<CheckBox id='chk-black2' className="chip-black2 chk-white" title='검정투톤' type='chk-color2' checked={true} />
<CheckBox id='chk-gray' className="chip-gray chk-white" title='쥐색' />
`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Checkbox Style</h4>
                <ul className="chk-info-wrap">
                  <CheckBoxItem id="chk-performance" checked={true}>
                    <p>차량성능, 상태점검기록부를<br />확인하셨습니까?</p>
                    <p className="ico"><i className="ico-checking"></i></p>
                  </CheckBoxItem>
                  <CheckBoxItem id="chk-insurance" checked={false}>
                    <p>보험이력을<br />확인하셨습니까?</p>
                    <p className="ico"><i className="ico-insurance"></i></p>
                  </CheckBoxItem>
                  <CheckBoxItem id="chk-autobel" checked={false}>
                    <p>현대 오토벨 진단결과를<br />확인하셨습니까?</p>
                    <p className="ico"><i className="ico-refund"></i></p>
                  </CheckBoxItem>
                  <CheckBoxItem id="chk-refundterms" checked={false}>
                    <p>홈서비스 환불약관을<br />확인하셨습니까?</p>
                    <p className="ico"><i className="ico-result"></i></p>
                  </CheckBoxItem>
                </ul>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CheckBox from '@lib/share/items/CheckBox'

`
                }</code>
                <code className="language-markup">{
                  `
<ul className="chk-info-wrap">
  <CheckBoxItem id="chk-performance" checked={true}>
    <p>차량성능, 상태점검기록부를<br />확인하셨습니까?</p>
    <p className="ico"><i className="ico-checking"></i></p>
  </CheckBoxItem>
  <CheckBoxItem id="chk-insurance" checked={false}>
    <p>보험이력을<br />확인하셨습니까?</p>
    <p className="ico"><i className="ico-insurance"></i></p>
  </CheckBoxItem>
  <CheckBoxItem id="chk-autobel" checked={false}>
    <p>현대 오토벨 진단결과를<br />확인하셨습니까?</p>
    <p className="ico"><i className="ico-refund"></i></p>
  </CheckBoxItem>
  <CheckBoxItem id="chk-refundterms" checked={false}>
    <p>홈서비스 환불약관을<br />확인하셨습니까?</p>
    <p className="ico"><i className="ico-result"></i></p>
  </CheckBoxItem>
</ul>
`
                }</code>
              </PreCode>

              <GuideApi cname="Checkbox" api_info={api_list["checkbox"]} />
              <GuideApi cname="CheckboxGroup" api_info={api_list["checkbox_group"]} />
              <GuideApi cname="CheckboxItem" api_info={api_list["checkbox_item"]} />
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Radio" id={8}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="guide-inner-left">
                <div className="code-box" id="radio-demo-basic">
                  <h4 className="mb40">Basic</h4>
                  <RadioGroup dataList={radio_basic} />
                  <RadioGroup dataList={radio_basic_sml} size="small" />
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import { radio_basic, radio_basic_sml } from '@src/dummy'
import RadioGroup from '@lib/share/items/RadioGroup'
import RadioItem from '@lib/share/items/RadioItem'
`
                  }</code>
                  <code className="language-markup">{
                    `
<RadioGroup dataList={radio_basic} />
<RadioGroup dataList={radio_basic_sml} size="small" />`
                  }</code>
                </PreCode>
              </div>

              <div className="guide-inner-right">
                <div className="code-box" id="radio-demo-disabled">
                  <h4 className="mb40">Disabled</h4>
                  <RadioGroup dataList={radio_disabled} />
                  <RadioGroup dataList={radio_disabled_sml} size="small" />
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import { radio_disabled, radio_disabled_sml } from '@src/dummy'
import RadioGroup from '@lib/share/items/RadioGroup'
import RadioItem from '@lib/share/items/RadioItem'
`
                  }</code>
                  <code className="language-markup">{
                    `
<RadioGroup dataList={radio_disabled} />
<RadioGroup dataList={radio_disabled_sml} size="small" />`
                  }</code>
                </PreCode>
              </div>

              <div className="code-box" id="radio-demo-group">
                <h4 className="mb40">Radio Group</h4>
                <RadioGroup dataList={radio_group} />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { radio_group } from '@src/dummy'
import RadioGroup from '@lib/share/items/RadioGroup'
import RadioItem from '@lib/share/items/RadioItem'
`
                }</code>
                <code className="language-markup">{
                  `
<RadioGroup dataList={radio_group} />`
                }</code>
              </PreCode>

              <div className="code-box" id="radio-demo-group">
                <h4 className="mb40">Radio Group - vertical</h4>
                <RadioGroup dataList={radio_group} mode="vertical" />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { radio_group } from '@src/dummy'
import RadioGroup from '@lib/share/items/RadioGroup'
import RadioItem from '@lib/share/items/RadioItem'
`
                }</code>
                <code className="language-markup">{
                  `
<RadioGroup dataList={radio_group} mode="vertical" />`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Radio Style - Check</h4>
                <RadioGroup
                  dataList={radio_autobel_as}
                  defaultValue={1}
                  boxType={true}
                  className="text mb20"
                >
                  <RadioItem>
                    <p>1</p>
                  </RadioItem>
                  <RadioItem>
                    <p>2</p>
                  </RadioItem>
                  <RadioItem>
                    <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
                  </RadioItem>
                </RadioGroup>
                <RadioGroup
                  dataList={radio_pay}
                  defaultValue={2}
                  boxType={true}
                  className="icon mb20"
                >
                  <RadioItem>
                    <p><i className="ico-clock"></i></p>
                  </RadioItem>
                  <RadioItem>
                    <p><i className="ico-smartphone"></i></p>
                  </RadioItem>
                  <RadioItem>
                    <p><i className="ico-setting"></i></p>
                  </RadioItem>
                </RadioGroup>
                <RadioGroup
                  dataList={radio_guaranteed}
                  defaultValue={3}
                  boxType={true}
                  className="text"
                >
                  <RadioItem>
                    <div>
                      <span className="sub-title">90일 / 5,000km</span>
                      <p className="price-tp3">265,000<span className="won">원</span></p>
                    </div>
                  </RadioItem>
                  <RadioItem>
                    <div>
                      <span className="sub-title">180일 / 10,000km</span>
                      <p className="price-tp3">465,000<span className="won">원</span></p>
                    </div>
                  </RadioItem>
                  <RadioItem>
                    <div>
                      <span className="sub-title">270일 / 15,000km</span>
                      <p className="price-tp3">665,000<span className="won">원</span></p>
                    </div>
                  </RadioItem>
                  <RadioItem>
                    <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
                  </RadioItem>
                </RadioGroup>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { radio_autobel_as, radio_pay, radio_guaranteed } from '@src/dummy'
import RadioGroup from '@lib/share/items/RadioGroup'
import RadioItem from '@lib/share/items/RadioItem'
`
                }</code>
                <code className="language-markup">{
                  `
<RadioGroup
  dataList={radio_autobel_as}
  defaultValue={1}
  boxType={true}
  className="text mb20"
>
  <RadioItem>
    <p>1</p>
  </RadioItem>
  <RadioItem>
    <p>2</p>
  </RadioItem>
  <RadioItem>
    <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
  </RadioItem>
</RadioGroup>
<RadioGroup
  dataList={radio_pay}
  defaultValue={2}
  boxType={true}
  className="icon mb20"
>
  <RadioItem>
    <p><i className="ico-clock"></i></p>
  </RadioItem>
  <RadioItem>
    <p><i className="ico-smartphone"></i></p>
  </RadioItem>
  <RadioItem>
    <p><i className="ico-setting"></i></p>
  </RadioItem>
</RadioGroup>
<RadioGroup
  dataList={radio_guaranteed}
  defaultValue={3}
  boxType={true}
  className="text"
>
  <RadioItem>
    <div>
      <span className="sub-title">90일 / 5,000km</span>
      <p className="price-tp3">265,000<span className="won">원</span></p>
    </div>
  </RadioItem>
  <RadioItem>
    <div>
      <span className="sub-title">180일 / 10,000km</span>
      <p className="price-tp3">465,000<span className="won">원</span></p>
    </div>
  </RadioItem>
  <RadioItem>
    <div>
      <span className="sub-title">270일 / 15,000km</span>
      <p className="price-tp3">665,000<span className="won">원</span></p>
    </div>
  </RadioItem>
  <RadioItem>
    <p className="as-none">현대 오토벨의 보증서비스가<br />적용되지 않습니다.</p>
  </RadioItem>
</RadioGroup>`
                }</code>
              </PreCode>

              <GuideApi cname="RadioGroup" api_info={api_list["radio_group"]} />

            </div>
          </div>
        </GuideModule>

        <GuideModule title="Selectbox" id={9}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="guide-inner-left">
                <div className="code-box">
                  <h4 className="mb20">Basic</h4>
                  <SelectBox id="select1" className="items-sbox" options={select1_list} />
                  <br /><br />
                  <h4 className="mb20">Disabled</h4>
                  <SelectBox id="select2" className="items-sbox" options={select1_list} disabled={true} />
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import SelectBox from '@lib/share/items/SelectBox'
  `
                    }
                  </code>
                  <code className="language-markup">
                    {
                      `
<SelectBox id="select1" className="items-sbox" options={select1_list} />
<SelectBox id="select2" className="items-sbox" options={select1_list} disabled={true}  />`
                    }
                  </code>
                </PreCode>
              </div>

              <div className="guide-inner-right">
                <div className="code-box">
                  <h4 className="mb40">Selectbox Size - Width</h4>
                  <SelectBox id="select3" className="items-sbox" options={select1_list} width={300} placeHolder="width={300}" />
                  <SelectBox id="select4" className="items-sbox" options={select1_list} width='200px' placeHolder="width='200px'" />
                  <h4 className="mt40 mb40">Selectbox Size - Height</h4>
                  <SelectBox id="select5" className="items-sbox" options={select1_list} width={300} height={48} placeHolder="width={300} height={48}" />
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<SelectBox id="select3" className="items-sbox" options={select1_list} width={300} placeHolder="width={300}"/>
<SelectBox id="select4" className="items-sbox" options={select1_list} width='200px' placeHolder="width='200px'"/>

<SelectBox id="select5" className="items-sbox" options={select1_list} width='50%' height={60} placeHolder="width='50%' height={48}"/>`
                  }</code>
                </PreCode>
              </div>

            </div>
            <GuideApi cname="Selectbox" api_info={api_list["selectbox"]} />
          </div>
        </GuideModule>

        <GuideModule title="Input" id={10}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">

              <div className="guide-inner-left">
                <div className="code-box">
                  <h4 className="mb40">Basic Input</h4>
                  <Input placeHolder="input text" value="Basic Input" />
                  <h4 className="mb40 mt40">Disabled</h4>
                  <Input placeHolder="disabled text" value="disabled text" disabled={true} />
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import Input from '@lib/share/items/Input'
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<Input placeHolder="input text" value="Basic Input" />
<Input placeHolder="disabled text" value="disabled text" disabled={true} />`
                  }</code>
                </PreCode>


              </div>

              <div className="guide-inner-right">
                <div className="code-box">
                  <h4 className="mb40">Input Size - Width</h4>
                  <Input type="text" placeHolder="설명 문구가 나옵니다." width={300} value="width={300}" />
                  <Input type="text" placeHolder="설명 문구가 나옵니다." width='200px' value="width='200px'" />
                  <h4 className="mt40 mb40">Input Size - Height</h4>
                  <Input type="text" placeHolder="설명 문구가 나옵니다." width='50%' height={48} value="width='50%' height={48}" />
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<Input type="text" placeHolder="설명 문구가 나옵니다." width={300} value="width={300}" />
<Input type="text" placeHolder="설명 문구가 나옵니다." width='200px' value="width='200px'" />
<Input type="text" placeHolder="설명 문구가 나옵니다." width='50%' height={48} value="width='50%' height={48}" />`
                  }</code>
                </PreCode>
              </div>

              <div className="code-box" id="search-demo-basic">
                <h4 className="mb40">Search Box</h4>
                <div className="search-tp1">
                  <span className="search-area">
                    <Input type="text" placeHolder="input search text" width='100%' height={60} />
                  </span>
                  <Button size="full" background="blue80" title="Search" width={180} height={60} />
                </div>

                <div className="search-tp2">
                  <span className="search-area">
                    <Input type="text" placeHolder="input search text" width='100%' height={48} />
                  </span>
                  <Button size="full" background="blue80" title="Search" width={210} height={48} />
                </div>

                <div className="search-tp3">
                  <span className="search-area">
                    <Input type="text" placeHolder="input search text" width='100%' height={80} />
                  </span>
                  <Button size="full" background="indigo80" title="Search" width={180} height={80} />
                </div>

                <div className="search-tp4">
                  <span className="search-area">
                    <SelectBox id="search-manufacturer-1-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
                    <SelectBox id="search-manufacturer-1-2" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
                    <SelectBox id="search-model-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
                    <SelectBox id="search-detailmodel-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
                  </span>
                  <Button size="full" background="indigo80" title="Search" width={180} height={80} />
                </div>

                <div className="search-tp5">
                  <span className="search-area">
                    <SelectBox id="search-manufacturer-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
                    <SelectBox id="search-model-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
                    <SelectBox id="search-detailmodel-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
                  </span>
                  <Button size="full" background="indigo60" title="Search" width={140} height={100} />
                </div>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<div className="search-tp1">
  <span className="search-area">
    <Input type="text" placeHolder="input search text" width='100%' height={60} />
  </span>
  <Button size="full" background="blue80" title="Search" width={180} height={60} />
</div>

<div className="search-tp2">
  <span className="search-area">
    <Input type="text" placeHolder="input search text" width='100%' height={48} />
  </span>
  <Button size="full" background="blue80" title="Search" width={210} height={48} />
</div>

<div className="search-tp3">
  <span className="search-area">
    <Input type="text" placeHolder="input search text" width='100%' height={80} />
  </span>
  <Button size="full" background="indigo80" title="Search" width={180} height={80} />
</div>

<div className="search-tp4">
  <span className="search-area">
    <SelectBox id="search-manufacturer-1-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
    <SelectBox id="search-manufacturer-1-2" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
    <SelectBox id="search-model-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
    <SelectBox id="search-detailmodel-1" className="items-sbox" options={select1_list} height={80} placeHolder="Title" selectedColor={null} />
  </span>
  <Button size="full" background="indigo80" title="Search" width={180} height={80} />
</div>

<div className="search-tp5">
  <span className="search-area">
    <SelectBox id="search-manufacturer-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
    <SelectBox id="search-model-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
    <SelectBox id="search-detailmodel-2" className="items-sbox" options={select1_list} height={100} placeHolder="Title" selectedColor={null} />
  </span>
  <Button size="full" background="indigo60" title="Search" width={140} height={100} />
</div>
`
                }</code>
              </PreCode>
            </div>
            <GuideApi cname="Input" api_info={api_list["input"]} />
          </div>
        </GuideModule>

        <GuideModule title="Tab" id={11}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">Tab Type1</h4>
                <TabMenu type="type1" mount={false}>
                  <TabCont tabTitle="Tab1" id="tab1-1" index={0}>
                    Content1
                    </TabCont>
                  <TabCont tabTitle="Tab2" id="tab1-2" index={1}>
                    Content2
                    </TabCont>
                  <TabCont tabTitle="Tab3" id="tab1-3" index={2}>
                    Content3
                    </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<TabMenu type="type1">
  <TabCont tabTitle="Tab1" id="tab1-1" index={0}>
  Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab1-2" index={1}>
  Content2
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab1-3" index={2}>
  Content3
  </TabCont>
</TabMenu>`
                  }
                </code>
              </PreCode>
              <div className="code-box">
                <h4 className="mb40">Tab Type2</h4>
                <TabMenu type="type2" defaultTab={1} mount={false}>
                  <TabCont tabTitle="Tab1" id="tab2-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab2-2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="tab2-3" index={2}>
                    Content3
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<TabMenu type="type2" defaultTab={1} mount={false}>
  <TabCont tabTitle="Tab1" id="tab2-1" index={0}>
  Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab2-2" index={1}>
  Content2
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab2-3" index={2}>
  Content3
  </TabCont>
</TabMenu>`
                  }
                </code>
              </PreCode>
              <div className="code-box">
                <h4 className="mb40">Tab Type3</h4>
                <TabMenu type="type3" mode="vertical">
                  <TabCont tabTitle="Tab1" id="tab3-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab3-2" index={1}>
                    Content2
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import TabMenu from '@lib/share/tab/TabMenu'
import TabCont from '@lib/share/tab/TabCont'
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<TabMenu type="type3">
  <TabCont tabTitle="Tab1" id="tab3-1" index={0}>
  Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab3-2" index={1}>
  Content2
  </TabCont>
</TabMenu>`
                  }
                </code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type4</h4>
                <TabMenu type="type4" mode="vertical">
                  <TabCont tabTitle="Tab1" id="tab4-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab4-2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="tab4-3" index={2}>
                    Content3
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type4">
  <TabCont tabTitle="Tab1" id="tab4-1" index={0}>
    Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab4-2" index={1}>
    Content2
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab4-3" index={2}>
    Content3
  </TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type5</h4>
                <TabMenu type="type5" defaultTab={1} mount={false}>
                  <TabCont tabTitle="Tab1" id="tab5-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab5-2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="tab5-3" index={2}>
                    Content3
                  </TabCont>
                  <TabCont tabTitle="Tab4" id="tab5-4" index={3}>
                    Content4
                  </TabCont>
                  <TabCont tabTitle="Tab5" id="tab5-5" index={4}>
                    Content5
                  </TabCont>
                  <TabCont tabTitle="Tab6" id="tab5-6" index={5}>
                    Content6
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type5" defaultTab={1} mount={false}>
  <TabCont tabTitle="Tab1" id="tab5-1" index={0}>
    Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab5-2" index={1}>
    Content2
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab5-3" index={2}>
    Content3
  </TabCont>
  <TabCont tabTitle="Tab4" id="tab5-4" index={3}>
    Content4
  </TabCont>
  <TabCont tabTitle="Tab5" id="tab5-5" index={4}>
    Content5
  </TabCont>
  <TabCont tabTitle="Tab6" id="tab5-6" index={5}>
    Content6
  </TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type6</h4>
                <TabMenu type="type6" defaultTab={1} mount={false}>
                  <TabCont tabTitle="Tab1" id="tab6-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab6-2" index={1}>
                    Content2
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type6" defaultTab={1} mount={false}>
  <TabCont tabTitle="Tab1" id="tab6-1" index={0}>
    Content1
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab6-2" index={1}>
    Content2
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab6-3" index={2}>
    Content3
  </TabCont>
  <TabCont tabTitle="Tab4" id="tab6-4" index={3}>
    Content4
  </TabCont>
  <TabCont tabTitle="Tab5" id="tab6-5" index={4}>
    Content5
  </TabCont>
  <TabCont tabTitle="Tab6" id="tab6-6" index={5}>
    Content6
  </TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type7</h4>
                <TabMenu type="type7">
                  <TabCont tabTitle="Tab1" id="tab7-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="tab7-2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="tab7-3" index={2}>
                    Content3
                  </TabCont>
                  <TabCont tabTitle="Tab4" id="tab7-4" index={3}>
                    Content4
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type7">
<TabCont tabTitle="Tab1" id="tab7-1" index={0}>
  Content1
</TabCont>
<TabCont tabTitle="Tab2" id="tab7-2" index={1}>
  Content2
</TabCont>
<TabCont tabTitle="Tab3" id="tab7-3" index={2}>
  Content3
</TabCont>
<TabCont tabTitle="Tab4" id="tab7-4" index={3}>
  Content4
</TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type8</h4>
                <TabMenu type="type8">
                  <TabCont id="tab8-1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont id="tab8-2" index={1}>
                    Content2
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type8">
<TabCont id="tab8-1" index={0}>
  Content1
</TabCont>
<TabCont id="tab8-2" index={1}>
  Content2
</TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type9</h4>
                <TabMenu type="type9" defaultTab={0} >
                  <TabCont id="tab9-1" tabTitle="Tab1" index={0}>
                    Content1
                  </TabCont>
                  <TabCont id="tab9-2" tabTitle="Tab2" index={1}>
                    Content2
                  </TabCont>
                  <TabCont id="tab9-3" tabTitle="Tab3" index={2}>
                    Content3
                  </TabCont>
                  <TabCont id="tab9-4" tabTitle="Tab4" index={3}>
                    Content4
                  </TabCont>
                  <TabCont id="tab9-5" tabTitle="Tab5" index={4}>
                    Content5
                  </TabCont>
                  <TabCont id="tab9-6" tabTitle="Tab6" index={5}>
                    Content6
                  </TabCont>
                  <TabCont id="tab9-7" tabTitle="Tab7" index={6}>
                    Content7
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type9" defaultTab={0} >
<TabCont id="tab9-1" tabTitle="Tab1" index={0}>
  Content1
</TabCont>
<TabCont id="tab9-2" tabTitle="Tab2" index={1}>
  Content2
</TabCont>
<TabCont id="tab9-3" tabTitle="Tab3" index={2}>
  Content3
</TabCont>
<TabCont id="tab9-4" tabTitle="Tab4" index={3}>
  Content4
</TabCont>
<TabCont id="tab9-5" tabTitle="Tab5" index={4}>
  Content5
</TabCont>
<TabCont id="tab9-6" tabTitle="Tab6" index={5}>
  Content6
</TabCont>
<TabCont id="tab9-7" tabTitle="Tab7" index={6}>
  Content7
</TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box" id="scroll-tab-demo">
                <h4 className="mb40">Tab Type Scroll</h4>
                <TabMenu type="type1" mount={false} isScroll={true}>
                  <TabCont tabTitle="Tab1" id="scroll-tab1" index={0}>
                    <div className="tabcont1">
                      <p className="tab-title">Tab1 <b>Title</b></p>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="Tab2" id="scroll-tab2" index={1}>
                    <div className="tabcont2">
                      <p className="tab-title">Tab2 <b>Title</b></p>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="Tab3" id="scroll-tab3" index={2}>
                    <div className="tabcont3">
                      <p className="tab-title">Tab3 <b>Title</b></p>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="Tab4" id="scroll-tab4" index={3}>
                    <div className="tabcont4">
                      <p className="tab-title">Tab4 <b>Title</b></p>
                    </div>
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="type1" mount={false} isScroll={true}>
  <TabCont tabTitle="Tab1" id="scroll-tab1" index={0}>
    <div className="tabcont1">
      <p className="tab-title">Tab1 <b>Title</b></p>
    </div>
  </TabCont>
  <TabCont tabTitle="Tab2" id="scroll-tab2" index={1}>
    <div className="tabcont2">
      <p className="tab-title">Tab2 <b>Title</b></p>
    </div>
  </TabCont>
  <TabCont tabTitle="Tab3" id="scroll-tab3" index={2}>
    <div className="tabcont3">
      <p className="tab-title">Tab3 <b>Title</b></p>
    </div>
  </TabCont>
  <TabCont tabTitle="Tab4" id="scroll-tab4" index={3}>
    <div className="tabcont4">
      <p className="tab-title">Tab4 <b>Title</b></p>
    </div>
  </TabCont>
</TabMenu>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Tab Type Popup</h4>
                <TabMenu type="popup" mode="vertical">
                  <TabCont tabTitle="지역" id="tab5-1" index={0}>
                    <h4>지역을 선택해주세요.</h4>
                    <table summary="content" className="table-tp1 area">
                      <caption className="away">지역 선택</caption>
                      <colgroup>
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                        <col width="12.5%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>서울/경인</th>
                          <th>충청/강원</th>
                          <th>영남</th>
                          <th>호남/제주</th>
                        </tr>
                        <tr>
                          <td>
                            <CheckBox id='chk-seoul' title='서울' />
                            <CheckBox id='chk-gyeonggi' title='경기' />
                            <CheckBox id='chk-incheon' title='인천' />
                          </td>
                          <td>
                            <CheckBox id='chk-daejeon' title='대전' />
                            <CheckBox id='chk-sejong' title='세종' />
                            <CheckBox id='chk-chungnam' title='충남' />
                            <CheckBox id='chk-chungbuk' title='충북' />
                            <CheckBox id='chk-Gangwon' title='강원' />
                          </td>
                          <td>
                            <CheckBox id='chk-busan' title='부산' />
                            <CheckBox id='chk-daegu' title='대구' />
                            <CheckBox id='chk-ulsan' title='울산' />
                            <CheckBox id='chk-gyeongnam' title='경남' />
                            <CheckBox id='chk-gyeongbuk' title='경북' />
                          </td>
                          <td>
                            <CheckBox id='chk-gwangju' title='광주' />
                            <CheckBox id='chk-Jeonnam' title='전남' />
                            <CheckBox id='chk-Jeonbuk' title='전북' />
                            <CheckBox id='chk-jeju' title='제주' />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                      <Button size="big" background="blue80" title="검색" width={180} />
                    </Buttons>
                  </TabCont>
                  <TabCont tabTitle="옵션" id="tab5-2" index={1}>
                    <h4>기본옵션</h4>
                    <div className="car-option-tp1">
                      <ul className="cate-ico">
                        <li className="on">
                          <i className="ico-sunroof"></i>
                          <span>선루프</span>
                        </li>
                        <li className="on">
                          <i className="ico-navigation"></i>
                          <span>네비게이션</span>
                        </li>
                        <li className="on">
                          <i className="ico-ventilation-seat"></i>
                          <span>통풍시트</span>
                        </li>
                        <li className="on">
                          <i className="ico-smartcruze"></i>
                          <span>스마트크루즈</span>
                        </li>
                        <li className="on">
                          <i className="ico-smart-key"></i>
                          <span>스마트키</span>
                        </li>
                        <li className="on">
                          <i className="ico-hud"></i>
                          <span>HUD</span>
                        </li>
                        <li className="on">
                          <i className="ico-around-view"></i>
                          <span>어라운드뷰</span>
                        </li>
                        <li className="on">
                          <i className="ico-blind-spot-warning"></i>
                          <span>사각지대경고등</span>
                        </li>
                        <li className="on">
                          <i className="ico-led"></i>
                          <span>헤드램프(LED)</span>
                        </li>
                        <li className="on">
                          <i className="ico-hid"></i>
                          <span>헤드램프(HID)</span>
                        </li>
                        {/* <li className="on">
                          <i className="ico-hipass"></i>
                          <span>하이패스</span>
                        </li>
                        <li className="on">
                          <i className="ico-parking-sensor"></i>
                          <span>주차감지센서</span>
                        </li>
                        <li className="on">
                          <i className="ico-back-camera"></i>
                          <span>후방카메라</span>
                        </li> */}
                      </ul>
                      <div className={carOptionMore1 ? "cate-list-btn active" : "cate-list-btn"}>
                        <button onClick={handleCarOption1}>{carOptionMore1 ? "추가옵션 닫기" : "추가옵션 열기"}</button>
                      </div>
                      <CSSTransition
                        in={carOptionMore1}
                        timeout={300}
                        classNames={'fade'}
                        unmountOnExit
                      >
                        <ul className="cate-list">
                          <li>
                            <p>카테고리1</p>
                            <ul className="cate-list-detail">
                              <li className="on">
                                <CheckBox id='chk-navigation-1' title='네비게이션(매립)' />
                              </li>
                              <li>
                                <CheckBox id='chk-back-camera-1' title='후방카메라' />
                              </li>
                              <li>
                                <CheckBox id='chk-smart-key-1' title='스마트키' />
                              </li>
                              <li>
                                <CheckBox id='chk-sunroof-1' title='파노라마 썬루프' />
                              </li>
                              <li>
                                <CheckBox id='chk-button-start-1' title='버튼시동/스마트키' />
                              </li>
                              <li>
                                <CheckBox id='chk-blackbox-1' title='블랙박스' />
                              </li>
                              <li>
                                <CheckBox id='chk-fourwheel-1' title='4WD(4륜구동)' />
                              </li>
                              <li>
                                <CheckBox id='chk-isg-1' title='스톱앤고(ISG)' />
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>카테고리2</p>
                            <ul className="cate-list-detail">
                              <li className="on">
                                <CheckBox id='chk-air-1' title='전자동 에어컨' />
                              </li>
                              <li>
                                <CheckBox id='chk-al-wheel-1' title='알루미늄휠' />
                              </li>
                              <li>
                                <CheckBox id='chk-hid-led-1' title='HID/LED헤드램프' />
                              </li>
                              <li>
                                <CheckBox id='chk-leather-sheet-1' title='가죽시트' />
                              </li>
                              <li>
                                <CheckBox id='chk-auto-sheet-1' title='전동시트' />
                              </li>
                              <li>
                                <CheckBox id='chk-heat-sheet-1' title='열선시트' />
                              </li>
                              <li>
                                <CheckBox id='chk-vent-sheet-1' title='통풍시트' />
                              </li>
                              <li>
                                <CheckBox id='chk-mp3-1' title='CD/MP3플레이어' />
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>카테고리3</p>
                            <ul className="cate-list-detail">
                              <li className="on">
                                <CheckBox id='chk-airback-d-1' title='에어백(운전석)' />
                              </li>
                              <li>
                                <CheckBox id='chk-airback-p-1' title='에어백(동반석)' />
                              </li>
                              <li>
                                <CheckBox id='chk-airback-s-1' title='에어백(사이드)' />
                              </li>
                              <li>
                                <CheckBox id='chk-airback-c-1' title='에어백(커튼)' />
                              </li>
                              <li>
                                <CheckBox id='chk-abs-1' title='ABS' />
                              </li>
                              <li>
                                <CheckBox id='chk-tcs-1' title='TCS' />
                              </li>
                              <li>
                                <CheckBox id='chk-esp-vdc-1' title='ESP/VDC' />
                              </li>
                              <li>
                                <CheckBox id='chk-tpms-1' title='TPMS(타이어공기압)' />
                              </li>
                            </ul>
                          </li>
                          <li>
                            <p>카테고리4</p>
                            <ul className="cate-list-detail">
                              <li className="on">
                                <CheckBox id='chk-heat-handle-1' title='열선핸들' />
                              </li>
                              <li>
                                <CheckBox id='chk-back-tv-1' title='뒷자석TV' />
                              </li>
                              <li>
                                <CheckBox id='chk-auto-door-1' title='오토 슬라이딩도어' />
                              </li>
                              <li>
                                <CheckBox id='chk-power-trunk-1' title='파워 트렁크' />
                              </li>
                              <li>
                                <CheckBox id='chk-side-step-1' title='사이드스텝' />
                              </li>
                              <li>
                                <CheckBox id='chk-hud-1' title='HUD(헤드업디스플레이)' />
                              </li>
                              <li>
                                <CheckBox id='chk-lane-departure-1' title='차선이탈 경보시스템' />
                              </li>
                              <li>
                                <CheckBox id='chk-bsd-1' title='후측방 경보시스템(BSD)' />
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </CSSTransition>
                      <Buttons align="center" marginTop={40}>
                        <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                        <Button size="big" background="blue80" title="검색" width={180} />
                      </Buttons>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="색상" id="tab5-3" index={2}>
                    <h4>주요색상</h4>
                    <ul className="color-list">
                      <li>
                        <CheckBox id='chk-white-02' title='흰색' />
                      </li>
                      <li>
                        <CheckBox id='chk-pearl-02' className="chip-pearl chk-black" title='진주색' />
                      </li>
                      <li>
                        <CheckBox id='chk-black-02' className="chip-black chk-white" title='검정색' checked={true} />
                      </li>
                      <li>
                        <CheckBox id='chk-black2-02' className="chip-black2 chk-white" title='검정투톤' type='chk-color2' checked={true} />
                      </li>
                      <li>
                        <CheckBox id='chk-gray-02' className="chip-gray chk-white" title='쥐색' />
                      </li>
                    </ul>
                    <div className={colorOptionMore ? "cate-list-btn active" : "cate-list-btn"}>
                      <button onClick={handleColorOption}>{colorOptionMore ? "색상전체 닫기" : "색상전체 열기"}</button>
                    </div>
                    <CSSTransition
                      in={colorOptionMore}
                      timeout={300}
                      classNames={'fade'}
                      unmountOnExit
                    >
                      <ul className="color-list">
                        <li>
                          <CheckBox id='chk-silver-2' className="chip-silver chk-black" title='은색' />
                        </li>
                        <li>
                          <CheckBox id='chk-silvergray-2' className="chip-silvergray chk-white" title='은회색' />
                        </li>
                        <li>
                          <CheckBox id='chk-silver2-2' className="chip-silver2 chk-white" title='은색투톤' type='chk-color2' />
                        </li>
                        <li>
                          <CheckBox id='chk-white2-2' className="chip-white2 chk-black" title='흰색투톤' type='chk-color2' />
                        </li>
                        <li>
                          <CheckBox id='chk-pearl2-2' className="chip-pearl2 chk-black" title='진주투톤' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-galactic-2' className="chip-galactic chk-white" title='은하색' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-lightsilver-2' className="chip-lightsilver chk-black" title='명은색' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-red-2' className="chip-red chk-white" title='빨간색' />
                        </li>
                        <li>
                          <CheckBox id='chk-orange-2' className="chip-orange chk-white" title='주황색' />
                        </li>
                        <li>
                          <CheckBox id='chk-wine-2' className="chip-wine chk-white" title='자주색' />
                        </li>
                        <li>
                          <CheckBox id='chk-purple-2' className="chip-purple chk-white" title='보라색' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-pink-2' className="chip-pink chk-black" title='분홍색' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-yellow-2' className="chip-yellow chk-black" title='노란색' />
                        </li>
                        <li>
                          <CheckBox id='chk-reed-2' className="chip-reed chk-white" title='갈대색' />
                        </li>
                        <li>
                          <CheckBox id='chk-lightgold-2' className="chip-lightgold chk-white" title='연금색' />
                        </li>
                        <li>
                          <CheckBox id='chk-brown-2' className="chip-brown chk-white" title='갈색' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-brown2-2' className="chip-brown2 chk-white" title='갈색투톤' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-gold-2' className="chip-gold chk-white" title='금색' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-gold2-2' className="chip-gold2 chk-white" title='금색투톤' type='chk-color2' />
                        </li>
                        <li>
                          <CheckBox id='chk-blue-2' className="chip-blue chk-white" title='청색' />
                        </li>
                        <li>
                          <CheckBox id='chk-sky-2' className="chip-sky chk-white" title='하늘색' />
                        </li>
                        <li>
                          <CheckBox id='chk-palegreen-2' className="chip-palegreen chk-white" title='담녹색' />
                        </li>
                        <li>
                          <CheckBox id='chk-green-2' className="chip-green chk-white" title='녹색' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-lightgreen-2' className="chip-lightgreen chk-white" title='연두색' type='chk-color2' checked={true} />
                        </li>
                        <li>
                          <CheckBox id='chk-bluegreen-2' className="chip-bluegreen chk-white" title='청옥색' />
                        </li>
                        <li>
                          <CheckBox id='chk-other-2' title='기타' checked={false} />
                        </li>
                      </ul>
                    </CSSTransition>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                      <Button size="big" background="blue80" title="검색" width={180} />
                    </Buttons>
                  </TabCont>
                  <TabCont tabTitle="연료" id="tab5-4" index={3}>
                    <h4>연료를 선택해주세요.</h4>
                    <ul className="color-list border">
                      <li>
                        <CheckBox id='chk-petrol' title='가솔린' />
                      </li>
                      <li>
                        <CheckBox id='chk-diesel' title='디젤' />
                      </li>
                      <li>
                        <CheckBox id='chk-petrol-electricity' title='가솔린+전기' />
                      </li>
                      <li>
                        <CheckBox id='chk-lpg-electricity' title='LPG+전기' />
                      </li>
                      <li>
                        <CheckBox id='chk-petrol-lpg' title='가솔린+LPG' />
                      </li>
                      <li>
                        <CheckBox id='chk-petrol-cng' title='가솔린+CNG' />
                      </li>
                      <li>
                        <CheckBox id='chk-electricity' title='전기' />
                      </li>
                      <li>
                        <CheckBox id='chk-cng' title='CNG' />
                      </li>
                      <li>
                        <CheckBox id='chk-hydrogen' title='수소' />
                      </li>
                      <li>
                        <CheckBox id='chk-other' title='기타' />
                      </li>
                    </ul>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                      <Button size="big" background="blue80" title="검색" width={180} />
                    </Buttons>
                  </TabCont>
                  <TabCont tabTitle="변속기" id="tab5-5" index={4}>
                    <h4>변속기를 선택해주세요.</h4>
                    <ul className="color-list border">
                      <li>
                        <CheckBox id='chk-auto' title='오토' />
                      </li>
                      <li>
                        <CheckBox id='chk-manual' title='수동' />
                      </li>
                      <li>
                        <CheckBox id='chk-semiauto' title='세미오토' />
                      </li>
                      <li>
                        <CheckBox id='chk-cvt' title='CVT' />
                      </li>
                      <li>
                        <CheckBox id='chk-other' title='기타' />
                      </li>
                    </ul>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" marginRight={10} background="gray" title="취소" width={180} />
                      <Button size="big" background="blue80" title="검색" width={180} />
                    </Buttons>
                  </TabCont>
                </TabMenu>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<TabMenu type="popup">
  <TabCont tabTitle="Tab1" id="tab5-1" index={0}>
    <h4>Content Title</h4>
  </TabCont>
  <TabCont tabTitle="Tab2" id="tab5-2" index={1}>
    <h4>Content Title</h4>
  </TabCont>
  <TabCont tabTitle="Tab3" id="tab5-3" index={2}>
    <h4>Content Title</h4>
  </TabCont>
  <TabCont tabTitle="Tab4" id="tab5-4" index={3}>
    <h4>Content Title</h4>
  </TabCont>
  <TabCont tabTitle="Tab5" id="tab5-5" index={4}>
    <h4>Content Title</h4>
  </TabCont>
</TabMenu>`
                }</code>
              </PreCode>

            </div>
            <GuideApi cname="Tab" api_info={api_list["tab"]} />
          </div>
        </GuideModule>

        <GuideModule title="Table" id={12}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">Table Type<span className="content-exp">height: 48px / padding: 16px 24px</span></h4>
                <table summary="content" className="table-tp1">
                  <caption>Table Title</caption>
                  <colgroup>
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                    <col width="12.5%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>Option<span className="essential">*</span></th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th></th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <PreCode>
                <code className="language-markup">
                  {
                    `<table summary="content" className="table-tp1">
  <caption>Table Title</caption>
  <colgroup>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
  </colgroup>
  <tbody>
    <tr>
      <th>Option<span className="essential">*</span></th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
    </tr>
    <tr>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
    </tr>
    <tr>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th></th>
      <td></td>
    </tr>
  </tbody>
</table>`
                  }
                </code>
              </PreCode>


              <div className="code-box">
                <h4 className="mb40">Table Input Type<span className="content-exp">height: 56px / padding: 8px 24px</span></h4>
                <table summary="content" className="table-tp1 input">
                  <caption>Table Title</caption>
                  <colgroup>
                    <col width="5%" />
                    <col width="20%" />
                    <col width="5%" />
                    <col width="20%" />
                    <col width="5%" />
                    <col width="20%" />
                    <col width="5%" />
                    <col width="20%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>Option</th>
                      <td><RadioGroup dataList={state0} /></td>
                      <th>Option</th>
                      <td>
                        <CheckBox id='chk-gas-co1' title='CheckBox' />
                      </td>
                      <th>Option</th>
                      <td className="chk-w-wrap">
                        <CheckBox id='chk-legality' title='CheckBox1' />
                        <CheckBox id='chk-illegality' title='CheckBox2' />
                      </td>
                      <th>Option</th>
                      <td>
                        <em className="mr8">Content</em>
                        <Input type="text" id="calculated" width={100} height={40} />
                        <em>만원</em>
                      </td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>
                        <span className="bridge">
                          <SelectBox id="user-phone" className="items-sbox" options={select1_list} width={100} height={40} />
                        </span>
                        <Input type="text" placeHolder="" id="user-phone2" width={100} height={40} />
                      </td>
                      <th>Option</th>
                      <td>
                        <span className="bridge2 gas">
                          <span>Content</span>
                          <Input type="text" id="bridge2" width={122} height={40} />
                          <em>%</em>
                        </span>
                        <span className="bridge2 gas">
                          <span>Content</span>
                          <Input type="text" id="bridge2-1" width={122} height={40} />
                          <em>%</em>
                        </span>
                      </td>
                      <th>Option</th>
                      <td className="chk-y-wrap">
                        <CheckBox id='chk-legality' title='CheckBox1' />
                        <CheckBox id='chk-illegality' title='CheckBox2' />
                      </td>
                      <th>Option</th>
                      <td>Content</td>
                    </tr>
                    <tr>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th>Option</th>
                      <td>Content</td>
                      <th></th>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <PreCode>
                <code className="language-markup">
                  {
                    `<table summary="content" className="table-tp2">
  <caption>Table Title</caption>
  <colgroup>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
    <col width="12.5%"/>
  </colgroup>
  <tbody>
    <tr>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
    </tr>
    <tr>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
    </tr>
    <tr>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th>Option</th>
      <td>Content</td>
      <th></th>
      <td></td>
    </tr>
  </tbody>
</table>`
                  }
                </code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Textarea</h4>
                <table summary="추가 상세 정보에 대한 내용" className="table-tp1 input">
                  <caption>Table Title</caption>
                  <colgroup>
                    <col width="17%" />
                    <col width="83%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>Type1</th>
                      <td>
                        <Textarea countLimit={1000} type="tp1" data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <PreCode>
                <code className="language-javascript">
                  {
                    `import Textarea from '@lib/share/items/Textarea'
import { textDummy } from '@src/dummy';

const textareaChange = (e) => {
  console.log('textareaChange');
  console.log(e);
}
const textareaBlur = (e) => {
  console.log('textareaBlur');
  console.log(e);
}
const textareaFocus = (e) => {
  console.log('textareaFocus');
  console.log(e);
}
`
                  }
                </code>
                <code className="language-markup">
                  {
                    `
<Textarea countLimit={1000} type="tp1" data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
<Textarea countLimit={1000} type="tp2" data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />`
                  }
                </code>
              </PreCode>

            </div>
          </div>
        </GuideModule>

        <GuideModule title="List" id={13}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">List Type1</h4>
                <ul className="goods-list">
                  {car_list.map((v, i) => {
                    return (
                      <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                    )
                  })}
                </ul>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { car_list } from '@src/dummy'
import BannerItem from '@src/components/common/banner/BannerItem'

const handleBtnClick = useCallback((e, id) => {
  alert(id);
}, []);
`
                }</code>
                <code className="language-markup">{
                  `
<ul className="goods-list">
  {car_list.map((v, i) => {
    return (
      <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} tags={v.tags} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
    )
  })}
</ul>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">List Type2</h4>
                <ul className="goods-list col3">
                  {car_list2.map((v, i) => {
                    if (v.isMarkup === undefined) {
                      return (
                        <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
                      )
                    } else {
                      if (v.isNumber === 1) {
                        return (
                          <BannerItem key={i} isMarkup={true}>
                            <div className="faq-bn">
                              <i className="ico-qna">Q</i>
                              <p className="tit">현대 오토벨 홈서비스는 전국 어디든지 배송이 가능한가요?</p>
                              <p className="exp">네, 고객님 전국 어디든 배송이 가능합니다.<br />배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
                              <p>FAQ 자세히 보기</p>
                            </div>
                          </BannerItem>
                        )
                      } else if (v.isNumber === 2) {
                        return (
                          <BannerItem key={i} isMarkup={true}>
                            <div className="review-bn">
                              <div className="img-wrap">
                                <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
                              </div>
                              <p className="tit">쇼핑몰처럼<br />편리해요!</p>
                              <p className="exp">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
                            </div>
                          </BannerItem>
                        )
                      } else if (v.isNumber === 3) {
                        return (
                          <BannerItem key={i} isMarkup={true}>
                            <div className="autobell-bn">
                              <i className="ico-autobell"></i>
                              <p className="tit">현대 오토벨<br />홈서비스 차량이란</p>
                              <p className="exp">
                                · 년식 9년 이하<br />
                                · 주행거리 14만 키로 이하<br />
                                · 오토벨에서 인증한 차량
                              </p>
                            </div>
                          </BannerItem>
                        )
                      } else if (v.isNumber === 4) {
                        return (
                          <BannerItem key={i} isMarkup={true}>
                            <div className="img-bn">
                              <p>현대 Autobell<br />기획특가전</p>
                              <Link href=""><a>바로가기</a></Link>
                            </div>
                          </BannerItem>
                        )
                      }

                    }
                  })}
                </ul>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { car_list } from '@src/dummy'
import BannerItem from '@src/components/common/banner/BannerItem'

const handleBtnClick = useCallback((e, id) => {
  alert(id);
}, []);
`
                }</code>
                <code className="language-markup">{
                  `
<ul className="goods-list col3">
{car_list2.map((v, i) => {
  if (v.isMarkup === undefined) {
    return (
      <BannerItem key={i} name={v.name} price={v.price} image={v.image} alt={v.alt} isButton={v.isButton} buttonName={v.buttonName} infos={v.infos} options={v.options} btnClick={handleBtnClick} btnId={v.id} />
    )
  } else {
    if (v.isNumber === 1) {
      return (
        <BannerItem key={i} isMarkup={true}>
          <div className="review-bn">
            <div className="img-wrap">
              <img src="/images/dummy/review-img.png" alt="리뷰 프로필" />
            </div>
            <p className="main-tit">쇼핑몰처럼<br />편리해요!</p>
            <p className="sub-tit">직장인이라 차량을 보려면 휴가를 내야해서 부담스러웠는데 쇼핑몰처럼 온라인으로 구매하고 배송 받으니 너무 편리했어요.</p>
          </div>
        </BannerItem>
      )
    } else if (v.isNumber === 2) {
      return (
        <BannerItem key={i} isMarkup={true}>
          <div className="img-bn">
            <p>현대 오토벨</p>
            <p>기획특가전</p>
            <p>바로가기</p>
          </div>
        </BannerItem>
      )
    } else if (v.isNumber === 3) {
      return (
        <BannerItem key={i} isMarkup={true}>
          <div className="faq-bn">
            <i>Q</i>
            <p className="main-tit">현대 오토벨 홈서비스는 전국 어디든지 배송이 가능한가요?</p>
            <p className="sub-tit">네, 고객님 전국 어디든 배송이 가능합니다. 배송비는 거리에 따라 측정되며, 안전하게 배송해드립니다.</p>
            <p>FAQ 자세히 보기</p>
          </div>
        </BannerItem>
      )
    }

  }
})}
</ul>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb40">Admin List Type1</h4>
                <div className="admin-list tp1">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                      <p className="price-tp6">7760<span className="won">만원</span></p>
                    </div>
                    <ul className="numerical">
                      <li><i className="ico-dot sml"></i>판매기간<span>53일</span></li>
                      <li><i className="ico-dot sml"></i>조회수(일평균)<span>20회</span></li>
                      <li><i className="ico-dot sml"></i>관심고객(최근2주)<span>13명</span></li>
                      <li><i className="ico-dot sml"></i>동급매물(최근4주)<span><i className="ico-triangle-top"></i>4주</span></li>
                    </ul>
                  </div>
                  <div className="content-bottom">
                    <p className="state normal">정상<span>(만료 00일 전)</span></p>
                    <ul>
                      <li>대당이용권, 자동업데이트</li>
                      <li><span>등록일</span>2019-08-01</li>
                      <li><span>최종수정일</span> 2019-09-01</li>
                      <li><span>최종업데이트 </span> 2019-09-30 23:10 (6/15회)</li>
                    </ul>
                    <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" onClick={(e) => rodalPopupHandler7(e, "slideUp")} width={129} />
                  </div>
                  <div className="btn-wrap">
                    <div className="btn-left">
                      <Button size="sml" background="blue80" radius={true} title="Live Studio 예약" width={103} />
                      <Button size="sml" background="blue80" radius={true} title="Live Shot 예약" width={103} />
                    </div>
                    <div className="btn-right">
                      <Button size="sml" line="gray" radius={true} title="가격 수정" width={101} onClick={(e) => rodalPopupHandler8(e, "slideUp")} />
                      <Button size="sml" line="gray" radius={true} title="차량정보 수정" width={101} onClick={(e) => rodalPopupHandler9(e, "slideUp")} />
                      <Button size="sml" line="gray" radius={true} title="차량사진 수정" width={101} onClick={(e) => rodalPopupHandler10(e, "slideUp")} />
                      <Button size="sml" line="gray" radius={true} title="성능기록부 수정" width={101} onClick={(e) => rodalPopupHandler11(e, "slideUp")} />
                      <Button size="sml" line="gray" radius={true} title="판매완료 신고" width={101} onClick={(e) => rodalPopupHandler12(e, "slideUp")} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type2</h4>
                <div className="admin-list tp2">
                  <div className="content-top">
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <h5 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h5>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                      <p className="price-tp6">7,760<span className="won">만원</span></p>
                    </div>
                    <ul className="numerical">
                      <li>등록일 : 2019-00-00</li>
                      <li>판매일 : 2019-00-00</li>
                      <li>소요일 : 00일</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type3</h4>
                <div className="admin-list tp3">
                  <div className="content-top">
                    <CheckBox id='register-car-chk' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <span className="option-tp4 bg-gray">등록진행중차량</span>
                      <h4 className="subject">현대 쏘나타 뉴 라이즈 플러그 인 하이브리드 2.0 HEV 프리미엄</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7"><em>낙찰금액</em>3,475<span className="won">만원</span></p>
                    <div className="btn-wrap">
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="등록진행" width={100} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type4</h4>
                <div className="admin-list tp4">
                  <div className="content-top">
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                      <p className="price-tp6">7,760<span className="won">만원</span></p>
                    </div>
                    <div className="admin-update">
                      <p>21분 전 업데이트</p>
                      <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" width={129} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type5</h4>
                <div className="admin-list tp5">
                  <div className="content-top">
                    <CheckBox id='register-car-chk4' />
                    <div className="img-cover">
                      <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                    </div>
                    <div className="summary">
                      <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                      <ul className="info">
                        <li>00가0000</li>
                        <li>09/12식(10년형)</li>
                        <li>84,761km</li>
                        <li>오토</li>
                        <li>디젤</li>
                      </ul>
                    </div>
                    <p className="price-tp7">1,890<span className="won">만원</span></p>
                    <p className="use-chk">미사용</p>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type6</h4>
                <div className="admin-list tp6">
                  <div className="content-top">
                    <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="13%" />
                        <col width="59%" />
                        <col width="13%" />
                        <col width="15%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>낙찰일</th>
                          <th>차량정보</th>
                          <th>진행상태</th>
                          <th>수정/확인</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>2019-09-19</td>
                          <td>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                              <ul className="info">
                                <li>00가0000</li>
                                <li>09/12식(10년형)</li>
                                <li>84,761km</li>
                                <li>오토</li>
                                <li>디젤</li>
                              </ul>
                            </div>
                          </td>
                          <td>낙찰완료</td>
                          <td>
                            <Button size="mid" line="blue80" color="blue80" radius={true} title="방문일자 입력" width={129} marginBottom={8} />
                            <Button size="mid" line="blue80" color="blue80" radius={true} title="거래 지연" width={129} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type7</h4>
                <div className="admin-list tp7">
                  <div className="content-top">
                    <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="14%" />
                        <col width="47%" />
                        <col width="13%" />
                        <col width="13%" />
                        <col width="13%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>신청차량</th>
                          <th>가격</th>
                          <th>판매가</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            2019-09-19<br />
                            <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} />
                          </td>
                          <td>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                              <ul className="info">
                                <li>00가0000</li>
                                <li>09/12식(10년형)</li>
                              </ul>
                              <ul className="info">
                                <li>84,761km</li>
                                <li>오토</li>
                                <li>디젤</li>
                              </ul>
                            </div>
                          </td>
                          <td className="price">7,760만원</td>
                          <td className="seller">박현대<br />010-3333-7777</td>
                          <td className="tx-disabled">신청완료</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="code-box">
                <h4 className="mb40">Admin List Type7 - note</h4>
                <div className="admin-list tp7 note">
                  <div className="content-top">
                    <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="14%" />
                        <col width="30%" />
                        <col width="18%" />
                        <col width="24%" />
                        <col width="14%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>상담진행차량</th>
                          <th>판매자</th>
                          <th>최초상담내용</th>
                          <th>답변여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            2019-09-19<br />
                            <Button size="mid" line="gray" color="black" radius={true} title="상세보기" width={100} height={32} marginTop={8} />
                          </td>
                          <td>
                            <div className="img-cover">
                              <img src="/images/dummy/product-img-06.png" alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h4 className="subject">현대 투싼 ix 디젤 2WD LX20 럭셔리</h4>
                            </div>
                          </td>
                          <td className="seller">박현대<br />010-3333-7777</td>
                          <td>안녕하세요. 내일 이 차량 보러</td>
                          <td className="tx-blue80">
                            답변대기<br />
                            <Button size="mid" line="gray" color="black" radius={true} title="내용보기" width={100} height={32} marginTop={8} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


            </div>
            <GuideApi cname="BannerItem" api_info={api_list["banner_item"]} />
          </div>
        </GuideModule>

        <GuideModule title="Slide" id={14}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <div className="list-slick">
                  <ul className="goods-list">
                    <SlideBanner car_list={car_list} touch={true} />
                  </ul>
                </div>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import { car_list } from '@src/dummy'
import SlideBanner from '@src/components/common/banner/SlideBanner'
`
                }</code>
                <code className="language-markup">{
                  `
<div className="list-slick">
  <ul className="goods-list">
    <SlideBanner car_list={car_list} touch={true} />
  </ul>
</div>`
                }</code>
              </PreCode>
            </div>
            <GuideApi cname="SlideBanner" api_info={api_list["slide_banner"]} />
          </div>
        </GuideModule>

        <GuideModule title="Tooltip" id={15}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box" id="tooltip-demo-basic">
                <h4 className="mb40">Basic</h4>
                <div className="btn-tooltip">
                  <Tooltip placement="topLeft" width={150}>
                    <TooltipItem>
                      <span>Hover me</span>
                    </TooltipItem>
                    <TooltipCont half={true}>
                      <p>Content</p>
                      <p>Content</p>
                    </TooltipCont>
                  </Tooltip>
                </div>

                <div className="btn-tooltip">
                  <Tooltip placement="topLeft" width={150} event="click">
                    <TooltipItem>
                      <span>Click me</span>
                    </TooltipItem>
                    <TooltipCont>
                      <p>Content</p>
                      <p>Content</p>
                    </TooltipCont>
                  </Tooltip>
                </div>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import Tooltip from '@lib/share/items/Tooltip'
import TooltipItem from '@lib/share/items/TooltipItem'
import TooltipCont from '@lib/share/items/TooltipCont'
`
                }</code>
                <code className="language-markup">{
                  `
<div className="btn-tooltip">
  <Tooltip placement="topLeft" width={150}>
    <TooltipItem>
      <span>Hover me</span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>

<div className="btn-tooltip">
  <Tooltip placement="topLeft" width={150} event="click">
    <TooltipItem>
      <span>Click me</span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>`
                }</code>
              </PreCode>

              <div className="guide-inner-left">
                <div className="code-box" id="tooltip-demo-style">
                  <h4 className="mb40">Style</h4>
                  <div className="tooltip-demo">
                    <div className="tooltip-top">
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">Tl</p>
                        <Tooltip placement="topLeft" width={150}>
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">Top</p>
                        <Tooltip placement="top">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">TR</p>
                        <Tooltip placement="topRight">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="tooltip-left">
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">LT</p>
                        <Tooltip placement="leftTop" width={150}>
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">Left</p>
                        <Tooltip placement="left" width={150}>
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">LB</p>
                        <Tooltip placement="leftBottom" width={150}>
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="tooltip-right">
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">RT</p>
                        <Tooltip placement="rightTop">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">Right</p>
                        <Tooltip placement="right">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">RB</p>
                        <Tooltip placement="rightBottom">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                    </div>

                    <div className="tooltip-bottom">
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">BL</p>
                        <Tooltip placement="bottomLeft">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">Bottom</p>
                        <Tooltip placement="bottom">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                      <div className="tooltip-content">
                        <p className="tx-exp-tp1">BR</p>
                        <Tooltip placement="bottomRight">
                          <TooltipItem>
                            <i className="ico-question"></i>
                          </TooltipItem>
                          <TooltipCont>
                            <p>Content</p>
                            <p>Content</p>
                          </TooltipCont>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import Tooltip from '@lib/share/items/Tooltip'
import TooltipItem from '@lib/share/items/TooltipItem'
import TooltipCont from '@lib/share/items/TooltipCont'
`
                  }</code>
                  <code className="language-markup">{
                    `
<div className="tooltip-top">
  <div className="tooltip-content">
    <p className="tx-exp-tp1">Tl</p>
    <Tooltip placement="topLeft" width={150}>
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">Top</p>
    <Tooltip placement="top">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">TR</p>
    <Tooltip placement="topRight">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
</div>

<div className="tooltip-left">
  <div className="tooltip-content">
    <p className="tx-exp-tp1">LT</p>
    <Tooltip placement="leftTop" width={150}>
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">Left</p>
    <Tooltip placement="left" width={150}>
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">LB</p>
    <Tooltip placement="leftBottom" width={150}>
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
</div>

<div className="tooltip-right">
  <div className="tooltip-content">
    <p className="tx-exp-tp1">RT</p>
    <Tooltip placement="rightTop">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">Right</p>
    <Tooltip placement="right">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">RB</p>
    <Tooltip placement="rightBottom">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
</div>

<div className="tooltip-bottom">
  <div className="tooltip-content">
    <p className="tx-exp-tp1">BL</p>
    <Tooltip placement="bottomLeft">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">Bottom</p>
    <Tooltip placement="bottom">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
  </Tooltip>
  </div>
  <div className="tooltip-content">
    <p className="tx-exp-tp1">BR</p>
    <Tooltip placement="bottomRight">
      <TooltipItem>
        <i className="ico-question"></i>
      </TooltipItem>
      <TooltipCont>
        <p>Content</p>
        <p>Content</p>
      </TooltipCont>
    </Tooltip>
  </div>`
                  }</code>
                </PreCode>
              </div>



              <div className="guide-inner-right">
                <div className="code-box">
                  <h4 className="mb40">Placement</h4>
                  <div className="tooltip-demo">
                    <div className="tooltip-top">
                      <Tooltip placement="topLeft" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">Tl</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="top" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">Top</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="topRight" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">TR</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                    </div>
                    <div className="tooltip-left">
                      <Tooltip placement="leftTop" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">LT</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="left" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">Left</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="leftBottom" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">LB</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                    </div>
                    <div className="tooltip-right">
                      <Tooltip placement="rightTop" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">RT</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="right" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">Right</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="rightBottom" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">RB</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                    </div>
                    <div className="tooltip-bottom">
                      <Tooltip placement="bottomLeft" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">BL</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="bottom" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">Bottom</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                      <Tooltip placement="bottomRight" simple={true}>
                        <TooltipItem>
                          <span className="btn-tooltip"><a href="#">BR</a></span>
                        </TooltipItem>
                        <TooltipCont>
                          <p>Content</p>
                        </TooltipCont>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import Tooltip from '@lib/share/items/Tooltip'
import TooltipItem from '@lib/share/items/TooltipItem'
import TooltipCont from '@lib/share/items/TooltipCont'
`
                  }</code>
                  <code className="language-markup">{
                    `
<div className="tooltip-top">
  <Tooltip placement="topLeft" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">Tl</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="top" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">Top</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="topRight" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">TR</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>
<div className="tooltip-left">
  <Tooltip placement="leftTop" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">LT</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="left" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">Left</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="leftBottom" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">LB</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>
<div className="tooltip-right">
  <Tooltip placement="rightTop" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">RT</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="right" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">Right</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="rightBottom" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">RB</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>
<div className="tooltip-bottom">
  <Tooltip placement="bottomLeft" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">BL</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="bottom" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">Bottom</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
  <Tooltip placement="bottomRight" simple={true}>
    <TooltipItem>
      <span className="btn-tooltip"><a href="#">BR</a></span>
    </TooltipItem>
    <TooltipCont>
      <p>Content</p>
    </TooltipCont>
  </Tooltip>
</div>
`
                  }</code>
                </PreCode>
              </div>
            </div>
            <GuideApi cname="Tooltip" api_info={api_list["tooltip"]} />
          </div>
        </GuideModule>

        <GuideModule title="Design Module" id={16}>
          <h4 className="mb40">Seller</h4>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">Seller Type1</h4>
                <div className="seller-info-tp1">
                  <div className="img-wrap">
                    <img src="/images/dummy/dealer-img-big.png" alt="판매자 이미지" />
                    <span></span>
                  </div>
                  <div className="tx-wrap">
                    <ul>
                      <li>판매자
                        <span>장기용</span>
                        <em>(좋은차상사)</em>
                      </li>
                      <li>종사원증 번호
                        <span>A1240B56</span>
                      </li>
                      <li>연락처
                        <span>050-0000-0000</span>
                      </li>
                      <li>판매중<span className="tx-blue60">21</span>
                      </li>
                      <li>판매완료<span className="tx-blue60">35</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<div className="seller-info-tp1">
  <div className="img-wrap">
    <img src="/images/dummy/dealer-img-big.png" alt="판매자 이미지"/>
    <span></span>
  </div>
  <div className="tx-wrap">
    <ul>
      <li>판매자
        <span>장기용</span>
      </li>
      <li>종사원증 번호
        <span>A1240B56</span>
      </li>
      <li>연락처
        <span>050-0000-0000</span>
      </li>
      <li>판매중
        <span className="tx-blue60">21</span>
      </li>
      <li>판매완료
        <span className="tx-blue60">35</span>
      </li>
    </ul>
  </div>
</div>`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4 className="mb20">Seller Type2</h4>
                <div className="seller-info-tp2">
                  <div className="img-wrap">
                    <img src="/images/dummy/dealer-img-mid.png" alt="판매자 이미지" />
                    <span></span>
                  </div>
                  <div className="tx-wrap">
                    <p className="veiw-point-tit">최딜러(좋은차상사)</p>
                    <span>050-0000-0000</span>
                  </div>
                  <ul>
                    <li>판매중<span>24</span></li>
                    <li>판매완료<span>32</span></li>
                  </ul>
                </div>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<div className="seller-info-tp2">
  <div className="img-wrap">
    <img src="/images/dummy/dealer-img-mid.png" alt="판매자 이미지"/>
    <span></span>
  </div>
  <div className="tx-wrap">
    <p className="veiw-point-tit">현딜러(오토오토 경기점)</p>
    <span>050-0000-0000</span>
  </div>
  <ul>
    <li>판매중<span className="blue80">24</span></li>
    <li>판매완료<span className="blue80">32</span></li>
  </ul>
</div>`
                }</code>
              </PreCode>

              <div className="code-box mb40">
                <h4 className="mb20">Seller Type3</h4>
                <div className="seller-info-tp3">
                  <div className="img-wrap">
                    <img src="/images/contents/dealer-basic-img-sml.png" alt="판매자 이미지" />
                    <span></span>
                  </div>
                  <div className="tx-wrap">
                    <p className="veiw-point-tit">현딜러(오토오토 경기점)</p>
                    <span>050-0000-0000</span>
                    <ul>
                      <li>판매중 : <strong>24</strong> 건</li>
                      <li>판매완료 : <strong>32</strong> 건</li>
                    </ul>
                  </div>
                </div>
              </div>
              <PreCode>
                <code className="language-markup">{
                  `<div className="seller-info-tp3">
  <div className="img-wrap">
    <img src="/images/contents/dealer-basic-img-sml.png" alt="판매자 이미지"/>
    <span></span>
  </div>
  <div className="tx-wrap">
    <p className="veiw-point-tit">현딜러(오토오토 경기점)</p>
    <span>050-0000-0000</span>
    <ul>
      <li>판매중 : <strong>24</strong> 건</li>
      <li>판매완료 : <strong>32</strong> 건</li>
    </ul>
  </div>
</div>`
                }</code>
              </PreCode>

              <h4 className="mb20">Car Option Form</h4>
              <div className="guide-inner-wrap">
                <div className="code-box">
                  <h4 className="mb40">Car Option Type1</h4>
                  <CarOptions title="차량 옵션" type={1} popup={true} />
                </div>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CarOptions from '@src/components/common/CarOptions'
`
                }
                </code>
                <code className="language-markup">{
                  `
<h4 className="mb40">Car Option Type1</h4>
<CarOptions title="차량 옵션" type={1} popup={true} />`
                }</code>
              </PreCode>

              <div className="code-box">
                <h4>Car Option Type2</h4>
                <CarOptions type={2} />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CarOptions from '@src/components/common/CarOptions'
`
                }
                </code>
                <code className="language-markup">{
                  `
<CarOptions type={2} />`
                }</code>
              </PreCode>

              <div className="code-box mb40">
                <h4>Car Option Type3</h4>
                <CarOptions type={2} mode="check" />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CarOptions from '@src/components/common/CarOptions'
`
                }
                </code>
                <code className="language-markup">{
                  `
<CarOptions type={2} mode="check" />`
                }</code>
              </PreCode>

              <div className="code-box mb40">
                <h4>Car Option Add</h4>
                <CarAddOption />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import CarAddOption from '@src/components/common/CarAddOption`
                }
                </code>
                <code className="language-markup">{
                  `
<CarAddOption />`
                }</code>
              </PreCode>

              <h4 className="mb20">Mypage Dealer Register</h4>
              <div className="guide-inner-wrap">
                <div className="code-box mb40" id="performance-chk">
                  <h4 className="mb40">Register</h4>
                  <form className="register-form">
                    <CarInfo />
                    <CarStatus />
                    <CarHistory />
                    <CarDetails />
                    <CarPicture />
                    <CarSignature />
                  </form>
                </div>
                <PreCode>
                  <code className="language-javascript">{
                    `import CarInfo from '@src/components/common/CarInfo'
import CarStatus from '@src/components/common/CarStatus'
import CarHistory from '@src/components/common/CarHistory'
import CarDetails from '@src/components/common/CarDetails'
import CarPicture from '@src/components/common/CarPicture'
import CarSignature from '@src/components/common/CarSignature'
`
                  }</code>
                  <code className="language-markup">{
                    `
<form className="register-form">
  <CarInfo />
  <CarStatus />
  <CarHistory />
  <CarDetails />
  <CarPicture />
  <CarSignature />
</form>`
                  }</code>
                </PreCode>
              </div>

              <h4 className="mb20">Essential Point</h4>
              <div className="guide-inner">
                <div className="code-box mb40">
                  <div className="essential-point">
                    <ul>
                      <li><i className="ico-dot mid"></i> 중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
                      <li><i className="ico-dot mid"></i> 본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
                      <li><i className="ico-dot mid"></i> 사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
                    </ul>
                  </div>

                  <div className="essential-point tp2">
                    <ul>
                      <li>중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
                      <li>본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
                      <li>사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
                    </ul>
                  </div>
                </div>
                <PreCode>
                  <code className="language-markup">{
                    `<div className="essential-point">
  <ul>
    <li><i className="ico-dot mid"></i> 중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
    <li><i className="ico-dot mid"></i> 본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
    <li><i className="ico-dot mid"></i> 사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
  </ul>
</div>

<div className="essential-point tp2">
  <ul>
    <li>중고차사고이력정보서비스는 중고차 거래의 활성화와 중고차 매매시장의 투명성을 높이기 위하여, 보험개발원에서 보유하고 있는 1996년 이후의 자동차관련 정보를 기초로 제공되는 온라인 서비스입니다.</li>
    <li>본 정보는 중고차품질확인을 위한 보조정보로서 자동차와 관련된 모든 사고의 발생 여부나 품질확인을 위한 결정적인 판단자료로 사용 되어서는 아니 됩니다.</li>
    <li>사고이력정보는 SK엔카사이트 상 광고를 위한 목적으로만 사용되어야 하며 무단으로 복제, 도용, 배포할 수 없습니다.</li>
  </ul>
</div>`
                  }</code>
                </PreCode>
              </div>

              <h4 className="mb20">Admin Title Style</h4>
              <div className="guide-inner">
                <div className="code-box">
                  <div className="mypage-admin-title">
                    <h3>Title</h3>
                    <p className="tx-exp-tp5">&#8251; 회원님의 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인합니다.</p>
                    <p className="tx-exp-tp5">&#8251; 비밀번호 확인 후 회원정보를 수정하실 수 있습니다.</p>
                  </div>
                </div>

                <div className="code-box mb40">
                  <div className="mypage-admin-title">
                    <h3 className="border-none">Title</h3>
                    <div className="sub-tit-wrap">
                      <p>방문평가 판매로 신청하신 내역입니다.</p>
                    </div>
                  </div>
                </div>

                <PreCode>
                  <code className="language-markup">{
                    ``
                  }</code>
                </PreCode>
              </div>

              <h4 className="mb20">Current Price Form</h4>
              <div className="guide-inner-left">
                <div className="code-box">
                  <div className="price-grade-tp1">
                    <div className="cur-price">
                      <p className="veiw-point-tit">이 차량의 현재 시세<span> (단위:만원)</span></p>
                      <div className="proper-price">
                        <FilterRange rangeUnit="적정시세" initMin={2400} initMax={3800} rangeMin={2750} rangeMax={3400} disabled={true} />
                      </div>
                    </div>
                    <div className="car-grade">
                      <p className="veiw-point-tit">안심지수</p>
                      {createGrade()}
                    </div>
                  </div>
                </div>
                <PreCode>
                  <code className="language-javascript">
                    {
                      `import InputRange from 'react-input-range'
// 안심지수
const [gradeValue, setGradeValue] = useState(null)
const createGrade = () => {
  let gradeGage = -180;
  let gradeText = '';
  if(gradeValue === 'A') {
    gradeGage = 0;
    gradeText = '아주 좋음';
  } else if(gradeValue === 'B') {
    gradeGage = -45;
    gradeText = '좋음';
  } else if(gradeValue === 'C') {
    gradeGage = -90;
    gradeText = '보통';
  } else if(gradeValue === 'D') {
    gradeGage = -135;
    gradeText = '나쁨';
  } else if(gradeValue === 'E') {
    gradeGage = -180;
    gradeText = '아주 나쁨';
  }
  return (
    <>
      <div className="grade-range">
        <div className="circular-progress">
          <div className="track"></div>
          <div className="gage" style={{transform:'rotate('+gradeGage+'deg)'}}></div>
        </div>
      </div>
      <span className="circular-edge gray"></span>
      <span className="circular-edge blue"></span>
      <div className="bar-cover" style={{transform:'rotate('+gradeGage+'deg)'}}>
        <span className="bar"></span>
      </div>
      <span className="grade-num"><strong>{gradeValue}</strong>{gradeText}</span>
    </>
  )
}
useEffect(() => {
  setTimeout(() => { setGradeValue('B') }, 300)
}, [])
`
                    }
                  </code>
                  <code className="language-markup">{
                    `
<div className="price-grade-tp1">
  <div className="cur-price">
    <p className="veiw-point-tit">이 차량의 현재 시세<span> (단위:만원)</span></p>
    <div className="proper-price">
      <p className="proper-price-tit">적정시세<span>{numberFormat(rangeValue.min)} ~ {numberFormat(rangeValue.max)}</span></p>
      <div className={rangeControl ? "price-range" : "price-range no-range"}>
        <InputRange
          minValue={initValue.min}
          maxValue={initValue.max}
          value={rangeValue}
          onChange={handleInputRange}
        />
      </div>
      <div className="price-range-tx">
        <p className="low-price"><i></i>최저<span className="tx-blue80"> 2,400</span></p>
        <p className="high-price"><i></i>최고<span className="tx-blue80"> 3,800</span></p>
      </div>
    </div>
  </div>
  <div className="car-grade">
    <p className="veiw-point-tit">안심지수</p>
    {createGrade()}
  </div>
</div>`
                  }</code>
                </PreCode>
              </div>
            </div>
          </div>
        </GuideModule>

        <GuideModule title="Popup" id={17}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <Button size="mid" background="blue80" radius={true} title="제목 없는 팝업 (FADE)" width={160} onClick={(e) => rodalPopupHandler1(e, "fade")} />

                <Button size="mid" background="blue80" radius={true} title="팝업 컨텐츠에 패딩값이 없음, body 고정되지 않음" width={320} onClick={(e) => rodalPopupHandler2(e, "slideUp")} />

                <RodalPopup show={rodalShow1} type={'fade'} width={500} closedHandler={modalCloseHandler1} mode="normal">
                  <div className="con-wrap">
                    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
                    <Buttons align="center" marginTop={40}>
                      <Button size="big" background="gray" title="취소" width={109} />
                      <Button size="big" background="blue80" title="직접등록" width={109} />
                    </Buttons>
                  </div>
                </RodalPopup>

                <RodalPopup show={rodalShow2} type={'slideUp'} width={500} closedHandler={modalCloseHandler2} mode={'no-padding'}>
                  <div>패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠</div>
                </RodalPopup>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';

const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
const [rodalShow2, setRodalShow2, rodalPopupHandler2, modalCloseHandler2] = useRodal(false, true);
`
                }</code>
                <code className="language-markup">{
                  `
<Button size="mid" background="blue80" radius={true} title="제목 없는 팝업 (FADE)" width={160} onClick={(e) => rodalPopupHandler1(e, "fade")} />

<RodalPopup show={rodalShow1} type={'fade'} width={500} closedHandler={modalCloseHandler1} mode="normal">
  <div className="con-wrap">
    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
    <Buttons align="center" marginTop={40}>
      <Button size="big" background="gray" title="취소" width={109} />
      <Button size="big" background="blue80" title="직접등록" width={109} />
    </Buttons>
  </div>
</RodalPopup>


<Button size="mid" background="blue80" radius={true} title="팝업 컨텐츠에 패딩값이 없음, body 고정되지 않음" width={320} onClick={(e) => rodalPopupHandler2(e, "slideUp")} />

<RodalPopup show={rodalShow2} type={'slideUp'} width={500} closedHandler={modalCloseHandler2} mode={'no-padding'}>
  <div>패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠<br />패딩값이 없는 case의 컨텐츠</div>
</RodalPopup>`
                }</code>
              </PreCode>
            </div>
            <div className="guide-inner-wrap">
              <div className="code-box">
                <Button size="mid" background="blue80" radius={true} title="풀사이즈 팝업" width={100} onClick={(e) => rodalPopupHandler3(e, "slideUp")} />

                <RodalPopup show={rodalShow3} type={'slideUp'} maxWidth={1200} width={90} closedHandler={modalCloseHandler3} mode="fullsize" measure='%'>
                  <Slider
                    ref={popupSlider1}
                    asNavFor={popupNav2}
                    prevArrow={<PrevArrow />}
                    nextArrow={<NextArrow />}
                    slidesToShow={1}
                    fade={true}
                    adaptiveHeight={true}
                    {...settings_popup_slick}
                  >
                    {car_gallery.map((v, i) => {
                      return (
                        <div key={i}><img src={v.bImg} alt={v.bAlt} /></div>
                      )
                    })}
                  </Slider>
                  <Slider
                    ref={popupSlider2}
                    asNavFor={popupNav1}
                    slidesToShow={car_gallery.length}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    variableWidth={true}
                    arrows={false}
                    centerMode={false}
                    className="slick-sthumb"
                    {...settings_popup_slick}
                  >
                    {car_gallery.map((v, i) => {
                      return <div key={i} style={{ width: 50 }}><ImgCover src={v.bImg} alt={v.bAlt} /></div>
                    })}
                  </Slider>
                </RodalPopup>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';
import { car_gallery } from '@src/dummy';

const [rodalShow3, setRodalShow3, rodalPopupHandler3, modalCloseHandler3] = useRodal(false, true);
const [popupNav1, setPopupNav1] = useState(null);
const [popupNav2, setPopupNav2] = useState(null);
const popupSlider1 = useRef(null);
const popupSlider2 = useRef(null);
useEffect(() => {
  setPopupNav1(popupSlider1.current);
  setPopupNav2(popupSlider2.current);
}, [])

const NextArrow = ({ onClick }) => {
  return (<button type="button" className="btn-next" onClick={onClick}><span className="hide">다음</span></button>);
}
const PrevArrow = ({ onClick }) => {
  return (<button type="button" className="btn-prev" onClick={onClick}><span className="hide">이전</span></button>);
}

let settings_popup_slick = {
  infinite: true,
  draggable: true,
  touchMove: true
}
`
                }</code>
                <code className="language-markup">{
                  `
<RodalPopup show={rodalShow3} type={'slideUp'} maxWidth={1200} width={90} closedHandler={modalCloseHandler3} mode="fullsize" measure='%'>
  <Slider
    ref={popupSlider1}
    asNavFor={popupNav2}
    prevArrow={<PrevArrow />}
    nextArrow={<NextArrow />}
    slidesToShow={1}
    fade={true}
    adaptiveHeight={true}
    {...settings_popup_slick}
  >
    {car_gallery.map((v, i) => {
      return (
        <div key={i}><img src={v.bImg} alt={v.bAlt} /></div>
      )
    })}
  </Slider>
  <Slider
    ref={popupSlider2}
    asNavFor={popupNav1}
    slidesToShow={car_gallery.length}
    swipeToSlide={true}
    focusOnSelect={true}
    variableWidth={true}
    arrows={false}
    centerMode={false}
    className="slick-sthumb"
    {...settings_popup_slick}
  >
    {car_gallery.map((v, i) => {
      return <div key={i} style={{ width: 50 }}><ImgCover src={v.bImg} alt={v.bAlt} /></div>
    })}
  </Slider>
</RodalPopup>`
                }</code>
              </PreCode>
            </div>
            <div className="guide-inner-wrap">
              <div className="code-box">
                <Button size="mid" background="blue80" radius={true} title="서식 팝업 (LARGE)" width={160} onClick={(e) => rodalPopupHandler4(e, "fade")} />
                <Button size="mid" background="blue80" radius={true} title="서식 팝업 (MEDIUM)" width={160} onClick={(e) => rodalPopupHandler5(e, "fade")} />
                <Button size="mid" background="blue80" radius={true} title="서식 팝업 (SMALL)" width={160} onClick={(e) => rodalPopupHandler6(e, "fade")} />
                <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} title="차량옵션" mode="normal" size="large">
                  <div className="con-wrap">
                    <h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p>
                  </div>
                </RodalPopup>
                <RodalPopup show={rodalShow5} type={'fade'} closedHandler={modalCloseHandler5} title="차량옵션" mode="normal" size="medium">
                  <div style={{ backgroundColor: '#3f64c3', padding: '50px 0' }}>
                    <p style={{ textAlign: 'center', color: '#ffffff' }}>지점/예약시간 선택&nbsp;&nbsp;&nbsp;
                    차량/광고서비스 선택&nbsp;&nbsp;&nbsp;
                    결제하기</p>
                  </div>
                  <div className="con-wrap">
                    <h4>제목 dummy</h4>
                    <p className="con">컨텐츠 내용이 나옵니다.</p>
                    <h4>제목 dummy</h4>
                    <p className="con">컨텐츠 내용이 나옵니다.</p>
                  </div>
                </RodalPopup>
                <RodalPopup show={rodalShow6} type={'fade'} closedHandler={modalCloseHandler6} title="차량옵션" mode="normal" size="small">
                  <div className="con-wrap">
                    <h4>제목 dummy</h4>
                    <p className="con">컨텐츠 내용이 나옵니다.</p>
                    <h4>제목 dummy</h4>
                    <p className="con">컨텐츠 내용이 나옵니다.</p>
                  </div>
                </RodalPopup>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';

const [rodalShow4, setRodalShow4, rodalPopupHandler4, modalCloseHandler4] = useRodal(false, true);
const [rodalShow5, setRodalShow5, rodalPopupHandler5, modalCloseHandler5] = useRodal(false, true);
const [rodalShow6, setRodalShow6, rodalPopupHandler6, modalCloseHandler6] = useRodal(false, true);
                  `
                }</code>
                <code className="language-markup">{
                  `
<Button size="mid" background="blue80" radius={true} title="서식 팝업 (LARGE)" width={160} onClick={(e) => rodalPopupHandler4(e, "fade")} />

<RodalPopup show={rodalShow4} type={'slideUp'} closedHandler={modalCloseHandler4} title="차량옵션" mode="normal" size="large">
  <div className="con-wrap">
    <h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p><h4>제목 dummy</h4><p className="con">컨텐츠 내용이 나옵니다.</p>
  </div>
</RodalPopup>


<Button size="mid" background="blue80" radius={true} title="서식 팝업 (MEDIUM)" width={160} onClick={(e) => rodalPopupHandler5(e, "fade")} />

<RodalPopup show={rodalShow5} type={'slideUp'} closedHandler={modalCloseHandler5} title="차량옵션" mode="normal" size="medium">
  <div style={{ backgroundColor: '#3f64c3', padding: '50px 0' }}>
    <p style={{ textAlign: 'center', color: '#ffffff' }}>지점/예약시간 선택&nbsp;&nbsp;&nbsp;
    차량/광고서비스 선택&nbsp;&nbsp;&nbsp;
    결제하기</p>
  </div>
  <div className="con-wrap">
    <h4>제목 dummy</h4>
    <p className="con">컨텐츠 내용이 나옵니다.</p>
    <h4>제목 dummy</h4>
    <p className="con">컨텐츠 내용이 나옵니다.</p>
  </div>
</RodalPopup>


<Button size="mid" background="blue80" radius={true} title="서식 팝업 (SMALL)" width={160} onClick={(e) => rodalPopupHandler6(e, "fade")} />

<RodalPopup show={rodalShow6} type={'slideUp'} closedHandler={modalCloseHandler6} title="차량옵션" mode="normal" size="small">
  <div className="con-wrap">
    <h4>제목 dummy</h4>
    <p className="con">컨텐츠 내용이 나옵니다.</p>
    <h4>제목 dummy</h4>
    <p className="con">컨텐츠 내용이 나옵니다.</p>
  </div>
</RodalPopup>
                  `
                }</code>
              </PreCode>
            </div>
            <div className="guide-inner-wrap">
              <div className="code-box">
                <Button size="sml" background="blue80" radius={true} title="ALERT" width={80} onClick={(e) => rodalPopupHandler7(e, "fade")} />
                <RodalPopup show={rodalShow7} type={'fade'} width={380} closedHandler={modalCloseHandler7} mode="normal" isMask={false} isButton={false}>
                  <div className="con-wrap compact">
                    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
                    <Buttons align="center" marginTop={30}>
                      <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
                    </Buttons>
                  </div>
                </RodalPopup>

                <Button size="sml" background="blue80" radius={true} title="CONFIRM" width={80} onClick={(e) => rodalPopupHandler8(e, "fade")} />
                <RodalPopup show={rodalShow8} type={'fade'} width={380} closedHandler={modalCloseHandler8} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
                  <div className="con-wrap compact">
                    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
                    <Buttons align="center" marginTop={30}>
                      <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={closeConfirmPopup} />
                      <Button size="sml" background="blue80" radius={true} title="확인" width={68} />
                    </Buttons>
                  </div>
                </RodalPopup>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Button from '@lib/share/items/Button';

const [rodalShow7, setRodalShow7, rodalPopupHandler7, modalCloseHandler7] = useRodal(false, false);
const [rodalShow8, setRodalShow8, rodalPopupHandler8, modalCloseHandler8] = useRodal(false, false);

const closeAlertPopup = useCallback((e) => {
  e.preventDefault();
  setRodalShow7(false);
}, []);
const closeConfirmPopup = useCallback((e) => {
  e.preventDefault();
  setRodalShow8(false);
}, []);
                  `
                }</code>
                <code className="language-markup">{
                  `
<Button size="sml" background="blue80" radius={true} title="ALERT" width={80} onClick={(e) => rodalPopupHandler7(e, "fade")} />

<RodalPopup show={rodalShow7} type={'fade'} width={380} closedHandler={modalCloseHandler7} mode="normal" isMask={false} isButton={false}>
  <div className="con-wrap compact">
    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
    <Buttons align="center" marginTop={30}>
      <Button size="sml" background="gray" radius={true} title="닫기" width={68} onClick={closeAlertPopup} />
    </Buttons>
  </div>
</RodalPopup>


<Button size="sml" background="blue80" radius={true} title="CONFIRM" width={80} onClick={(e) => rodalPopupHandler8(e, "fade")} />

<RodalPopup show={rodalShow8} type={'fade'} width={380} closedHandler={modalCloseHandler8} mode="normal" isMask={false} showCloseButton={false} isButton={false}>
  <div className="con-wrap compact">
    <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
    <Buttons align="center" marginTop={30}>
      <Button size="sml" background="gray" radius={true} title="취소" width={68} onClick={closeConfirmPopup} />
      <Button size="sml" background="blue80" radius={true} title="확인" width={68} />
    </Buttons>
  </div>
</RodalPopup>
                  `
                }</code>
              </PreCode>
            </div>
            <GuideApi cname="Rodal Popup" api_info={api_list["popup"]} />
          </div>
        </GuideModule>

        <GuideModule title="Calendar" id={18}>
          <div className="guide-inner">
            <div className="guide-inner-wrap">
              <div className="code-box">
                <h4 className="mb40">Inline Calendar</h4>
                <Calendar
                  className="ui-calendar"
                  showOk={false}
                  showDateInput={false}
                  defaultValue={now}
                  mode="date"
                />
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import Calendar from 'rc-calendar'
import moment from 'moment'
import 'moment/locale/ko'

const now = moment()
`
                }</code>
                <code className="language-markup">{
                  `
<Calendar
  className="ui-calendar"
  showOk={false}
  showDateInput={false}
  defaultValue={now}
  mode="date"
/>`
                }</code>
              </PreCode>
              <div className="code-box">
                <h4 className="mb40">Date Picker</h4>
                <table summary="content" className="table-tp1" style={{ width: '450px' }}>
                  <colgroup>
                    <col width="170px" />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">최초등록일</th>
                      <td>
                        <DatePicker defaultValue={now} onChange={ccc} />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">인풋 사이즈 조절</th>
                      <td>
                        <DatePicker inputWidth={210} inputHeight={60} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <PreCode>
                <code className="language-javascript">{
                  `import DatePicker from '@src/components/common/calendar/DatePicker'
import moment from 'moment'

const now = moment()
`
                }</code>
                <code className="language-markup">{
                  `
<DatePicker defaultValue={now}/>
<DatePicker inputWidth={210} inputHeight={60} />`
                }</code>
              </PreCode>
            </div>
            <GuideApi cname="Calendar" api_info={api_list["calendar"]} />
          </div>
        </GuideModule>
      </div>
    </div>
  )
}

export default CommonStyleGuide
