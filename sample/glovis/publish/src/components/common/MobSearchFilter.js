/* eslint-disable no-debugger */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFilterModel from '@src/components/common/MobFilterModel';
import MobFilterOption from '@src/components/common/MobFilterOption';
import MobFilterColor from '@src/components/common/MobFilterColor';
import MobFilterFuel from '@src/components/common/MobFilterFuel';
import MobFilterGearbox from '@src/components/common/MobFilterGearbox';
import MobFilterEngine from '@src/components/common/MobFilterEngine';
import MobFilterArea from '@src/components/common/MobFilterArea';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobCalendar from '@lib/share/items/MobCalendar';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import FilterRange from '@lib/share/items/FilterRange';
import DynamicCategory from '@lib/share/items/DynamicCategory';
import CategoryItem from '@lib/share/items/CategoryItem';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { objIsEmpty } from '@src/utils/CommonUtil';

// Components (Only Mobile)
import MobSelectBox from '@lib/share/items/MobSelectBox';

/*
html 변경이력
03.20 : [모바일] 브랜드 서치 모드 추가, #a1 참고
*/

const MobSearchFilter = ({ clrOptions, carCondOptions, dsplOptions, fuelOptions, mssOptions, noyOptions, mode, modelNum=1, isReset=false }) => {
  const { isSection, mFullpagePopup } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  // modelNum, 1: 수입인증 인 경우, 2: 금융사/프랜차이즈 인증인 경우

  // 달력
  const now = moment();
  //console.log(carCondOptions);
  //연식
  const [yearRange, setYearRange] = useState({ min: 2011, max: 2015 });
  //주행거리
  const [distanceRange, setDistanceRange] = useState({ min: 20000, max: 60000 });
  //가격
  const [priceRange, setPriceRange] = useState({ min: 2750, max: 3000 });

  // 차량조회 조건
  const [carCond, setCarCond] = useState({
    clr: null,
    dspl: null,
    fuel: null,
    mss: null,
    noy: null,
    frstRegDt: null,
    drvDist: null,
    carOptions: carCondOptions || []
  });

  // componentDidUpdate O, componentDidMount X
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      alert('초기화함');
    }
  }, [isReset]);

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback((e) => {
    e.preventDefault();
    setIsValue1(Number(e.target.value));
  }, []);

  const [yearMode, setYearMode] = useState(1);
  const [distanceMode, setDistanceMode] = useState(1);
  const [priceMode, setPirceMode] = useState(1);

  const handleMethod = (mode) => (e) => {
    e.preventDefault();
    if (mode === 'year') {
      setYearMode(yearMode === 1 ? 2 : 1);
    } else if (mode === 'distance') {
      setDistanceMode(distanceMode === 1 ? 2 : 1);
    } else if (mode === 'price') {
      setPirceMode(priceMode === 1 ? 2 : 1);
    }
  };

  // 풀페이지 팝업 Start
  const [fpFilter01, setFpFilter01] = useState(false); // 제조사,모델,등급 팝업
  const [fpFilter01Result, setFpFilter01Result] = useState('yes'); // 제조사,모델,등급 팝업 (전달 소품1)
  const [fpFilter01Kind, setFpFilter01Kind] = useState(null); // 제조사,모델,등급 팝업 (전달 소품2)
  const [fpFilter01Research, setFpFilter01Research] = useState('no'); // 제조사,모델,등급 팝업 (전달 소품3)
  const [fpFilter02, setFpFilter02] = useState(false); // 옵션 팝업
  const [fpFilter03, setFpFilter03] = useState(false); // 색상 팝업
  const [fpFilter04, setFpFilter04] = useState(false); // 연료 팝업
  const [fpFilter05, setFpFilter05] = useState(false); // 변속기 팝업
  const [fpFilter06, setFpFilter06] = useState(false); // 배기량 팝업
  const [fpFilter07, setFpFilter07] = useState(false); // 지역 팝업
  const [fpCalendar01, setFpCalendar01] = useState(false); // 달력 팝업 (최초등록일)
  const [fpCalendar02A, setFpCalendar02A] = useState(false); // 달력 팝업 (연식1)
  const [fpCalendar02B, setFpCalendar02B] = useState(false); // 달력 팝업 (연식2)

  const [mdFnc, setMdFnc] = useState("radio");

  React.useEffect(() => {
    setCarCond(Object.assign(carCond, { carOptions: carCondOptions }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carCondOptions]);

  const handleFullpagePopup = useCallback(
    (name, query) => (e) => {
      e.preventDefault();
      if (name === 'f1') {
        if (mode !== 'brand') {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '제조사',
              options: ['back', 'reset']
            }
          });
          query.split('&').map((v) => {
            const val = v.split('=');
            if (val[0] === 'result') {
              setFpFilter01Result(val[1]);
              if (val[1] === 'no') setFpFilter01Kind(null);
            } else if (val[0] === 'kind') {
              setFpFilter01Kind(val[1]);
            } else if (val[0] === 'research') {
              setFpFilter01Research(val[1]);
            }
          });
        } else {
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: 'BMW',
              options: ['back', 'reset']
            }
          });
        }
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter01(true);
      } else if (name === 'f2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '옵션',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter02(true);
      } else if (name === 'f3') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '색상',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter03(true);
      } else if (name === 'f4') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '연료',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter04(true);
      } else if (name === 'f5') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '변속기',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter05(true);
      } else if (name === 'f6') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '배기량',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter06(true);
      } else if (name === 'f7') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '지역',
            options: ['back', 'reset']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpFilter07(true);
      } else if (name === 'calendar1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '최초등록일',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar02A(false);
        setFpCalendar02B(false);
        setFpCalendar01(true);
      } else if (name === 'calendar2_1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '연식',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02B(false);
        setFpCalendar02A(true);
      } else if (name === 'calendar2_2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '연식',
            options: ['back']
          }
        });
        setFpFilter01(false);
        setFpFilter02(false);
        setFpFilter03(false);
        setFpFilter04(false);
        setFpFilter05(false);
        setFpFilter06(false);
        setFpFilter07(false);
        setFpCalendar01(false);
        setFpCalendar02A(false);
        setFpCalendar02B(true);
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    },
    [dispatch]
  );
  // 풀페이지 팝업 End

  //각 풀페이지 닫기
  const modelCallback = useCallback(
    (e, v) => {
      e.preventDefault();
      console.log(v);
      setFpFilter01(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [dispatch, isSection]
  );
  
  const optionCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign(carCond, { carOptions: deps }));
      }
      setFpFilter02(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  const colorCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign({ ...carCond }, { clr: deps.label }));
      }
      setFpFilter03(false);
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  const fuelCallback = useCallback(
    (e, fuel) => {
      e.preventDefault();
      setFpFilter04(false);
      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign({ ...carCond }, { fuel: fuel.label }));
      }
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  const gearboxCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      setFpFilter05(false);
      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign({ ...carCond }, { mss: deps.label }));
      }
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  const engineCallback = useCallback(
    (e, deps) => {
      e.preventDefault();
      setFpFilter06(false);
      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign({ ...carCond }, { dspl: deps.label }));
      }
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  const areaCallback = (e) => {
    e.preventDefault();
    setFpFilter07(false);
    dispatch({
      type: MOBILE_FULLPAGE_POPUP_CLOSE
    });
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  };

  const calendarCallback = useCallback(
    (e, selectedDate) => {
      e.preventDefault();
      setFpCalendar01(false);
      setFpCalendar02A(false);
      setFpCalendar02B(false);

      if (isSection === 'marketPrice' || isSection === 'pricingSystem') {
        setCarCond(Object.assign({ ...carCond }, { frstRegDt: selectedDate.format('YYYYMMDD') }));
      }
      dispatch({
        type: MOBILE_FULLPAGE_POPUP_CLOSE
      });
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [carCond, dispatch, isSection]
  );

  //주행거리
  const handleDrvDistChanged = useCallback(
    (e, deps) => {
      if (deps) {
        setCarCond(Object.assign({ ...carCond }, { drvDist: deps.value }));
      } else {
        setCarCond(Object.assign({ ...carCond }, { drvDist: e.target.value }));
      }
    },
    [carCond]
  );

  return (
    <>
      <div className="content-wrap">
        <ul className="m-menu-list tp1">
          {((isSection === 'homeService' || isSection === 'buy') && mode !== "brand") && (
            <li className="arrow-none make-wrap">
              <span className="tit">
                국산/수입
                <span className="fr">
                  <ul className="radio-block small">
                    <li>
                      <Radio className="txt" id="make1" label="전체" value={1} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="make2" label="국산" value={2} checked={isValue1} onChange={handleChange1} />
                    </li>
                    <li>
                      <Radio className="txt" id="make3" label="수입" value={3} checked={isValue1} onChange={handleChange1} />
                    </li>
                  </ul>
                </span>
              </span>
            </li>
          )}

          {((isSection === 'homeService' || isSection === 'buy') && mode !== "brand") && (
            <li className="arrow-none">
              <span className="tit mb16">차종</span>
              <ul className="cate-ico tp2">
                <CheckBoxItem id="chk-sunroof" checked={true} size="small">
                  <i className="ico-light-car" />
                  <span className="ico-exp">경차</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-led" checked={false} size="small">
                  <i className="ico-compact-car" />
                  <span className="ico-exp">소형차</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-hipass" checked={false} size="small">
                  <i className="ico-mid-car" />
                  <span className="ico-exp">준중형차</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-ventilation-seat" checked={false} size="small">
                  <i className="ico-mid-car" />
                  <span className="ico-exp">중형차</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-back-camera" checked={false} size="small">
                  <i className="ico-large-car" />
                  <span className="ico-exp">대형차</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-around-view" checked={false} size="small">
                  <i className="ico-sports-car" />
                  <span className="ico-exp">스포츠카</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-hud" checked={false} size="small">
                  <i className="ico-suv-car" />
                  <span className="ico-exp">SUV</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-smart-key" checked={false} size="small">
                  <i className="ico-mid-car" />
                  <span className="ico-exp">ERC1</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-smartcruze" checked={false} size="small">
                  <i className="ico-mid-car" />
                  <span className="ico-exp">ETC2</span>
                </CheckBoxItem>
                <CheckBoxItem id="chk-navigation" checked={false} size="small">
                  <i className="ico-mid-car" />
                  <span className="ico-exp">ETC3</span>
                </CheckBoxItem>
              </ul>
            </li>
          )}

          {/* 값이 없는 경우 */}
          {/* <li onClick={handleRouter(`${router}?result=no`)}>
            <span className="tit">제조사/모델/등급</span>
          </li> */}
          {
            mode === "brand" && (
              <li onClick={handleFullpagePopup('f1')}>
                <span className="tit">{modelNum === 1 ? "모델" : "제조사 / 모델"}</span>
              </li>
            )
          }
          {
            mode !== "brand" && (
              <>
                <li onClick={handleFullpagePopup('f1', 'result=no')}>
                  <span className="tit">제조사/모델/등급</span>
                </li>

                {/* 값이 있는 경우 */}
                <li className="model">
                  <div className="sel-wrap">
                    <span className="tit">제조사/모델/등급</span>
                    <ul className="select1">
                      {/* <li onClick={handleRouter(`${router}?kind=manufacturer`)}>현대</li>
                      <li onClick={handleRouter(`${router}?kind=model`)}>싼타페</li> */}
                      <li onClick={handleFullpagePopup('f1', 'result=yes&kind=manufacturer')}>현대</li>
                      <li onClick={handleFullpagePopup('f1', 'result=yes&kind=model')}>싼타페</li>
                    </ul>
                  </div>
                  <ul className="select2">
                    {/* <li onClick={handleRouter(`${router}?kind=rating`)}>
                      <span>가솔린 2400cc, 2.4 모던, 2.4 프리미엄, 2.4 프리미엄, 2.4 프리미엄<em>외 1건</em></span>
                    </li> */}
                    <li onClick={handleFullpagePopup('f1', 'result=yes&kind=rating')}>
                      <span>
                        <span>가솔린 2400cc, 2.4 모던, 2.4 프리미엄, 2.4 프리미엄, 2.4 프리미엄</span>
                        <em>외 1건</em>
                      </span>
                    </li>
                  </ul>
                </li>
              </>
            )
          }
          

          {/* <li>
            <span className="tit">대표차명</span>
            <ul className="select">
              <li>그랜져</li>
            </ul>
          </li>
          <li>
            <span className="tit">차명</span>
            <ul className="select">
              <li>그랜져 IG</li>
            </ul>
          </li>
          <li>
            <span className="tit">연료</span>
            <ul className="select">
              <li>가솔린 3000cc</li>
            </ul>
          </li>
          <li>
            <span className="tit">등급</span>
            <ul className="select">
              <li>2.4 프리미엄</li>
            </ul>
          </li> */}
          {((isSection === 'marketPrice' || isSection === 'pricingSystem') && mode !== 'brand') && (
            <li className="arrow-none">
              <span className="tit mb10">
                연식
              </span>
              <MobSelectBox options={[
                { id: 'year2000', value: 1, label: '2000' },
                { id: 'year2001', value: 2, label: '2001' },
                { id: 'year2002', value: 3, label: '2002' },
              ]} width='100%' placeHolder="선택" />
            </li>
          )}
          {(isSection === "buy" && mode !== 'brand') && (
            <li className="arrow-none">
              <span className={yearMode === 1 ? 'tit' : 'tit mb10'}>
                연식
                <Button
                  className="fr"
                  size="sml"
                  background={yearMode === 1 ? 'blue20' : 'blue80'}
                  color={yearMode === 1 ? 'blue80' : null}
                  radius={true}
                  title="직접입력"
                  width={61}
                  height={30}
                  onClick={handleMethod('year')}
                />
              </span>
              {yearMode === 1 ? (
                <FilterRange rangeUnit="연식" initMin={1989} initMax={2020} defaultValue={yearRange} onChange={(value) => setYearRange(value)} />
              ) : (
                <>
                  <MobSelectBox options={[
                    { id: 'formYear2000', value: 1, label: '2000' },
                    { id: 'formYear2001', value: 2, label: '2001' },
                    { id: 'formYear2002', value: 3, label: '2002' },
                  ]} width='46%' placeHolder="선택" />
                  <em className="from">~</em>
                  <MobSelectBox options={[
                    { id: 'ToYear2000', value: 1, label: '2000' },
                    { id: 'ToYear2001', value: 2, label: '2001' },
                    { id: 'ToYear2002', value: 3, label: '2002' },
                  ]} width='46%' placeHolder="선택" />

                  {/* <DatePicker defaultValue={now} width="46%" onClick={handleFullpagePopup('calendar2_1')} />
                  <em className="from">~</em>
                  <DatePicker defaultValue={now} width="46%" onClick={handleFullpagePopup('calendar2_2')} /> */}
                </>
              )}
            </li>
          )}

          {((isSection === 'buy' || isSection === 'homeService') && mode !== 'brand') && (
            <li className="arrow-none">
              <span className={distanceMode === 1 ? 'tit' : 'tit mb10'}>
                주행거리
                <Button
                  className="fr"
                  size="sml"
                  background={distanceMode === 1 ? 'blue20' : 'blue80'}
                  color={distanceMode === 1 ? 'blue80' : null}
                  radius={true}
                  title="직접입력"
                  width={61}
                  height={30}
                  onClick={handleMethod('distance')}
                />
              </span>
              {distanceMode === 1 ? (
                <FilterRange rangeUnit="주행거리" initMin={0} initMax={200000} defaultValue={distanceRange} step={1000} onChange={(value) => setDistanceRange(value)} />
              ) : (
                <>
                  <MobSelectBox
                    options={[
                      { id: 'dis1', value: 1, checked: false, disabled: false, label: '20000' },
                      { id: 'dis2', value: 2, checked: false, disabled: false, label: '30000' }
                    ]}
                    width="46%" placeHolder="선택"
                  />
                  <em className="from">~</em>
                  <MobSelectBox
                    options={[
                      { id: 'dis1_1', value: 1, checked: false, disabled: false, label: '40000' },
                      { id: 'dis1_2', value: 2, checked: false, disabled: false, label: '50000' }
                    ]}
                    width="46%" placeHolder="선택"
                  />
                </>
              )}
            </li>
          )}

          {((isSection === 'homeService' || isSection === 'buy') && mode !== 'brand') && (
            <li className="arrow-none">
              <span className={priceMode === 1 ? 'tit' : 'tit mb10'}>
                가격
                <Button
                  className="fr"
                  size="sml"
                  background={priceMode === 1 ? 'blue20' : 'blue80'}
                  color={priceMode === 1 ? 'blue80' : null}
                  radius={true}
                  title="직접입력"
                  width={61}
                  height={30}
                  onClick={handleMethod('price')}
                />
              </span>
              {priceMode === 1 ? (
                <FilterRange rangeUnit="가격" initMin={0} initMax={10000} defaultValue={priceRange} step={100} onChange={(value) => setPriceRange(value)} />
              ) : (
                <>
                  <Input type="number" height={40} width="46%" placeHolder="0만원" />
                  <em className="from">~</em>
                  <Input type="number" height={40} width="46%" placeHolder="0만원" />
                </>
              )}
            </li>
          )}

          {((isSection === 'marketPrice' || isSection === 'pricingSystem') && mode !== 'brand') && (
            <li className="arrow-none">
              <span className="tit mb16">주행거리</span>
              <MobButtonFilter
                checkList={[
                  { title: '+ 1천', checked: true, value: 1000 },
                  { title: '+ 5천', checked: false, value: 5000 },
                  { title: '+ 1만', checked: false, value: 10000 },
                  { title: '+ 5만', checked: false, value: 50000 }
                ]}
                onClick={handleDrvDistChanged}
              />
              <span className="search-wrap">
                <Input type="number" isSelf={false} data={carCond.drvDist || ''} height={38} placeHolder="주행거리를 입력하세요." onChange={handleDrvDistChanged} />
              </span>
            </li>
          )}

          {(isSection === 'buy' && mode !== 'brand') && (
            <li className="arrow-none">
              <span className="tit mb16">오토벨 서비스</span>
              <ul className="autobell-chk-list">
                <li className="live">
                  <CheckBox id="autobell-chk1" title="라이브 스튜디오 차량" />
                </li>
                <li className="auc">
                  <CheckBox id="autobell-chk2" title="경매낙찰 차량" />
                </li>
                <li className="fran">
                  <CheckBox id="autobell-chk3" title="프랜차이즈 차량" />
                </li>
                <li className="home">
                  <CheckBox id="autobell-chk4" title="홈서비스 차량" />
                </li>
              </ul>
            </li>
          )}

          {((isSection === 'marketPrice' || isSection === 'pricingSystem') && mode !== 'brand') && (
            <li className="arrow-none" onClick={handleFullpagePopup('calendar1')}>
              <span className="tit mb16">최초등록일</span>
              <DatePicker defaultValue={now} inputWidth="100" inputMeasure="%" disabled={true} />
            </li>
          )}

          {(isSection === 'homeService' || isSection === 'buy') && (
            <li onClick={handleFullpagePopup('f7')}>
              <span className="tit">지역</span>
            </li>
          )}
          {(isSection !== 'homeService' && mode !== 'brand') && (
            <li onClick={handleFullpagePopup('f2')}>
              <div className="sel-wrap">
                <span className="tit">옵션</span>
                {/* {carCond.carOptions.filter((x) => x.yn === 'Y').length > 0 ? (
                  <ul className="select1">
                    <li>{carCond.carOptions.filter((x) => x.yn === 'Y').length}개</li>
                  </ul>
                ) : null} */}
              </div>
            </li>
          )}
          {mode !== 'brand' && <li onClick={handleFullpagePopup('f3')}>
            <div className="sel-wrap">
              <span className="tit">색상</span>
              {!objIsEmpty(carCond.clr) && (
                <ul className="select1">
                  <li>{carCond.clr}</li>
                </ul>
              )}
            </div>
          </li>}
          <li onClick={handleFullpagePopup('f4')}>
            <div className="sel-wrap">
              <span className="tit">연료</span>
              {!objIsEmpty(carCond.fuel) && (
                <ul className="select1">
                  <li>{carCond.fuel}</li>
                </ul>
              )}
            </div>
          </li>
          {(isSection !== 'homeService' && mode !== 'brand') && (
            <li onClick={handleFullpagePopup('f5')}>
              <div className="sel-wrap">
                <span className="tit">변속기</span>
                {!objIsEmpty(carCond.mss) && (
                  <ul className="select1">
                    <li>{carCond.mss}</li>
                  </ul>
                )}
              </div>
            </li>
          )}
          {((isSection === 'marketPrice' || isSection === 'pricingSystem') && mode !== 'brand') && (
            <li onClick={handleFullpagePopup('f6')}>
              <div className="sel-wrap">
                <span className="tit">배기량</span>
                {!objIsEmpty(carCond.dspl) && (
                  <ul className="select1">
                    <li>{carCond.dspl}</li>
                  </ul>
              )}
              </div>
            </li>
          )}

          {(isSection === 'buy' && mode !== 'brand') && (
            <li className="arrow-none">
              <span className="tit">최근 검색 조건</span>
              <div className="search-filter-tooltip">
                <p className="tx-exp-tp5 mb16">&#8251; 최근 검색조건은 모델 기준으로 최대 5개까지 자동 저장됩니다.</p>
                <DynamicCategory>
                  <CategoryItem
                    category={[
                      'SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션 SM5 뉴 임프레션',
                      '~2017년2월',
                      '홈서비스차량',
                      '진주색'
                    ]}
                  />
                  <CategoryItem category={['제네시스 G80', '~1,000만원']} />
                  <CategoryItem category={['현대 그랜저 IG 하이브리드', '경매낙찰 차량', '흰색']} />
                </DynamicCategory>
              </div>
            </li>
          )}
        </ul>
      </div>
      <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
        {
          fpFilter01 && 
            <MobFilterModel
              result={fpFilter01Result}
              kind={fpFilter01Kind}
              research={fpFilter01Research}
              callback={modelCallback}
              brandCallback={mode === "brand" ? modelCallback : null}
              defaultNum={
                mode === "brand"
                  ? modelNum === 1 ? 1 : 0
                  : 0
              }
              hiddenTab={
                mode === "brand"
                  ? modelNum === 1 ? [0, 1, 2] : [2]
                  : []
              }
            />
        }
        {fpFilter02 && <MobFilterOption options={carCond.carOptions} callback={optionCallback} />}
        {fpFilter03 && <MobFilterColor options={clrOptions} mode={mdFnc} callback={colorCallback} />}
        {fpFilter04 && <MobFilterFuel options={fuelOptions} mode={mdFnc} callback={fuelCallback} />}
        {fpFilter05 && <MobFilterGearbox options={mssOptions} mode={mdFnc} callback={gearboxCallback} />}
        {fpFilter06 && <MobFilterEngine options={dsplOptions} mode={mdFnc} callback={engineCallback} />}
        {fpFilter07 && <MobFilterArea mode={mdFnc} callback={areaCallback} />}
        {(fpCalendar01 || fpCalendar02A || fpCalendar02B) && <MobCalendar callback={calendarCallback} />}
      </MobFullpagePopup>
    </>
  );
};

MobSearchFilter.propTypes = {
  clrOptions: PropTypes.array,
  carCondOptions: PropTypes.array,
  dsplOptions: PropTypes.array,
  fuelOptions: PropTypes.array,
  mssOptions: PropTypes.array,
  noyOptions: PropTypes.array,
  mode: PropTypes.string,
  modelNum: PropTypes.number,
  isReset: PropTypes.bool,
};

export default MobSearchFilter;
