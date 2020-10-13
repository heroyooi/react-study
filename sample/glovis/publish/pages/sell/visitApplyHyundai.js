/* eslint-disable react/no-danger */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Router, { withRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '@src/components/layouts/AppLayout';
import FrameLayout from '@src/components/layouts/FrameLayout';
import MobSelectLocal from '@src/components/common/MobSelectLocal';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { getTermDummy, getLocationDummy, getLocationCityDummy } from '@src/dummy/visitApplyHyundaiDummy';
import { padLeft } from '@src/components/pricingSystem/pricingUtil';
import { auction_check_term } from '@src/dummy/terms';

const VisitApplyHyundai = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_SELL });

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const hasHyandai = useSelector((state) => state.common.hasHyandai);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  if (hasMobile) {
    dispatch({ type: MOBILE_HEADER_TYPE_SUB, data: { title: '방문평가 판매', options: ['back', 'close'] } });
    dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 74, color: '#f6f7f8' } });
  }

  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const [rodalShow4, setRodalShow4, rodalPopupHandler4] = useRodal(false, true);

  //현대용 팝업 노출
  const [hyundaiLayer, setHyundaiLayer] = useState(false);

  const mobileOptions = [
    { id: 'radio_phone_1', value: 1, checked: true, disabled: false, label: '010' },
    { id: 'radio_phone_2', value: 2, checked: false, disabled: false, label: '011' },
    { id: 'radio_phone_3', value: 3, checked: false, disabled: false, label: '012' },
    { id: 'radio_phone_4', value: 4, checked: false, disabled: false, label: '013' },
    { id: 'radio_phone_5', value: 5, checked: false, disabled: false, label: '014' },
    { id: 'radio_phone_6', value: 6, checked: false, disabled: false, label: '015' },
    { id: 'radio_phone_7', value: 7, checked: false, disabled: false, label: '016' },
    { id: 'radio_phone_8', value: 8, checked: false, disabled: false, label: '017' },
    { id: 'radio_phone_9', value: 9, checked: false, disabled: false, label: '018' },
    { id: 'radio_phone_10', value: 10, checked: false, disabled: false, label: '019' }
  ];

  //질문
  const [qGreet, setQGreet] = useState(false);
  const [qName, setQName] = useState(false);
  const [qBirth, setQBirth] = useState(false);
  const [qMobile, setQMobile] = useState(false);
  const [qLocal, setQLocal] = useState(false);
  const [qCarName, setQCarName] = useState(false);
  const [qCarNum, setQCarNum] = useState(false);
  const [qTerms, setQTerms] = useState(false);

  // 더보기, change 되는 값
  const [moreActive, setMoreActive] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [mobileValue, setMobileValue] = useState('');
  const [birthYearValue, setBirthYearValue] = useState('');
  const [birthMonthValue, setBirthMonthValue] = useState('');
  const [birthDayValue, setBirthDayValue] = useState('');
  const [carNameValue, setCarNameValue] = useState('');
  const [carNumValue, setCarNumValue] = useState('');

  // 결과 값
  const [isName, setIsName] = useState(null);
  const [isBirth, setIsBirth] = useState(null);
  const [isMobile, setIsMobile] = useState(null);
  const [isLocal, setIsLocal] = useState(null);
  const [isCarName, setIsCarName] = useState(null);
  const [isCarNum, setIsCarNum] = useState(null);
  const [isTerm, setIsTerm] = useState(null);

  // 팝업
  const [applyName, setApplyName] = useState(false);
  const [applyBirth, setApplyBirth] = useState(false);
  const [applyMobile, setApplyMobile] = useState(false);
  const [applyLocal, setApplyLocal] = useState(false);
  const [applyCarName, setApplyCarName] = useState(false);
  const [applyCarNum, setApplyCarNum] = useState(false);
  const [applyTerms, setApplyTerms] = useState(false);
  const [applyConfirm, setApplyConfirm] = useState(false);

  const [fpTerms, setFpTerms] = useState(false);
  const [termCont, setTermCont] = useState('');

  const [selValue, setSelValue] = useState(mobileOptions[mobileOptions.findIndex((v) => v.checked === true)].label);
  const [locationList, setLocationList] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({ value: '', label: '', citys: [] });
  const [selectedCity, setSeletedCity] = useState({});

  // 생년월일
  const [yearList, setYearList] = useState([]);

  const [monthList] = useState([
    { value: '1', label: '01월' },
    { value: '2', label: '02월' },
    { value: '3', label: '03월' },
    { value: '4', label: '04월' },
    { value: '5', label: '05월' },
    { value: '6', label: '06월' },
    { value: '7', label: '07월' },
    { value: '8', label: '08월' },
    { value: '9', label: '09월' },
    { value: '10', label: '10월' },
    { value: '11', label: '11월' },
    { value: '12', label: '12월' }
  ]);

  const [dayList] = useState([
    { value: '1', label: '1일' },
    { value: '2', label: '2일' },
    { value: '3', label: '3일' },
    { value: '4', label: '4일' },
    { value: '5', label: '5일' },
    { value: '6', label: '6일' },
    { value: '7', label: '7일' },
    { value: '8', label: '8일' },
    { value: '9', label: '9일' },
    { value: '10', label: '10일' },
    { value: '11', label: '11일' },
    { value: '12', label: '12일' },
    { value: '13', label: '13일' },
    { value: '14', label: '14일' },
    { value: '15', label: '15일' },
    { value: '16', label: '16일' },
    { value: '17', label: '17일' },
    { value: '18', label: '18일' },
    { value: '19', label: '19일' },
    { value: '20', label: '20일' },
    { value: '21', label: '21일' },
    { value: '22', label: '22일' },
    { value: '23', label: '23일' },
    { value: '24', label: '24일' },
    { value: '25', label: '25일' },
    { value: '26', label: '26일' },
    { value: '27', label: '27일' },
    { value: '28', label: '28일' },
    { value: '29', label: '29일' },
    { value: '30', label: '30일' },
    { value: '31', label: '30일' }
  ]);

  useEffect(() => {
    console.log(document.body.clientHeight - window.innerHeight, applyLocal);

    if (process.env.systemEnv === 'publisher') {
      setTermCont(getTermDummy.data);

      const data = getLocationDummy.data;

      data.forEach((item) => {
        item.value = item.locCd;
        item.label = item.locNm;
        item.citys = [];
      });
      setLocationList(data);
    } else {
      axiosGet('/InfoPolicy/selectInfoPolicy.do?tmsId=AA000010&tmsTp=0010').then((res) => {
        setTermCont(res.data.data);
      });

      axiosGet(`/api/pricing/getLocation.do`).then((res) => {
        const data = res.data.data;

        data.forEach((item) => {
          item.value = item.locCd;
          item.label = item.locNm;
          item.citys = [];
        });
        setLocationList(data);
      });
    }

    const tmpYearList = [];
    for (let year = new Date().getFullYear(); year > new Date().getFullYear() - 100; year--) {
      tmpYearList.push({ value: year, label: `${year}년` });
    }

    setYearList(tmpYearList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hyundaiLayerOpen = useCallback((e) => {
    e.preventDefault();
    setHyundaiLayer(true);
  }, []);

  const hyundaiLayerClose = useCallback((e) => {
    e.preventDefault();
    setHyundaiLayer(false);
  }, []);

  const onHandleChangeInput = useCallback((e) => {
    const targetId = e.target.id;

    if (targetId === 'isName') {
      setNameValue(e.target.value);
    }
    if (targetId === 'isMobile') {
      setMobileValue(e.target.value);
    }
  }, []);

  const onHandleChangedLocationList = useCallback(
    (e) => {
      if (e.citys.length === 0) {
        if (process.env.systemEnv === 'publisher') {
          const data = getLocationCityDummy.data;

          data.forEach((item) => {
            item.value = item.ctyCd;
            item.label = item.ctyNm;
          });
          e.citys = data;
          setSelectedLocation(e);
          setLocationList(locationList);
        } else {
          axiosGet(`/api/pricing/getLocationCity.do?locCd=${e.value}`).then((res) => {
            const data = res.data.data;

            data.forEach((item) => {
              item.value = item.ctyCd;
              item.label = item.ctyNm;
            });
            e.citys = data;
            setSelectedLocation(e);
            setLocationList(locationList);
          });
        }
      } else {
        setSelectedLocation(e);
      }
    },
    [locationList]
  );

  const onHandleChangedCity = useCallback((e) => {
    setSeletedCity(e);
  }, []);

  const handleChangeTerm1 = useCallback(() => {
    setIsTerm((prevTerm) => !prevTerm);
  }, []);

  const handleTermPopup = useCallback(
    (e) => {
      rodalPopupHandler1(e, 'fade');
    },
    [rodalPopupHandler1]
  );

  const handleClickMobileSel = useCallback(
    (e) => {
      setSelValue(mobileOptions[e - 1].label);
    },
    [mobileOptions]
  );

  const handleNameValue = useCallback((e) => {
    setNameValue(e.target.value);
  }, []);

  const handleBirthYearValue = useCallback((e) => {
    if (e.target && e.target.value) {
      setBirthYearValue(e.target.value);
    } else {
      setBirthYearValue(e.value);
    }
  }, []);

  const handleBirthMonthValue = useCallback((e) => {
    if (e.target && e.target.value) {
      setBirthMonthValue(e.target.value);
    } else {
      setBirthMonthValue(e.value);
    }
  }, []);

  const handleBirthDayValue = useCallback((e) => {
    if (e.target && e.target.value) {
      setBirthDayValue(e.target.value);
    } else {
      setBirthDayValue(e.value);
    }
  }, []);

  const handleMobileValue = useCallback((e) => {
    setMobileValue(e.target.value);
  }, []);

  const handleCarNameValue = useCallback((e) => {
    setCarNameValue(e.target.value);
  }, []);

  const handleCarNumValue = useCallback((e) => {
    setCarNumValue(e.target.value);
  }, []);

  // 더보기 클릭 시, 방문지역 선택
  const handleLocalMore = useCallback((e) => {
    e.preventDefault();
    setMoreActive((prevActive) => !prevActive);
  }, []);

  const timeouts = useRef([]);
  const duration = 500;

  useEffect(() => {
    timeouts.current[0] = setTimeout(() => {
      setQGreet(true);
      timeouts.current[1] = setTimeout(() => {
        setQName(true);
        setApplyName(true);
      }, duration);
    }, duration);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, []);

  useEffect(() => {
    if (applyName) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyBirth) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyMobile) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyLocal) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyCarName) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyCarNum) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyTerms) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    if (applyConfirm) {
      dispatch({ type: MOBILE_CONTENT_STYLE, data: { bottom: 88, color: '#f6f7f8' } });
    }
    setTimeout(() => {
      window.scrollTo(0, document.body.clientHeight - window.innerHeight);
    }, 10);
  }, [applyName, applyMobile, applyLocal, applyTerms, applyConfirm, dispatch, applyCarName, applyCarNum, applyBirth]);

  // 전송 클릭 시
  const handleNameApply = useCallback(
    (e) => {
      e.preventDefault();
      if (nameValue !== '') {
        setIsName(nameValue);
        setApplyName(false);
        timeouts.current[2] = setTimeout(() => {
          setQBirth(true);
          setApplyBirth(true);
        }, duration);
      }
    },
    [nameValue]
  );

  const handleBirthApply = useCallback(
    (e) => {
      e.preventDefault();
      if (!objIsEmpty(birthYearValue) && !objIsEmpty(birthMonthValue) && !objIsEmpty(birthDayValue)) {
        setIsBirth(`${birthYearValue}-${birthMonthValue}-${birthDayValue}`);
        setApplyBirth(false);
        timeouts.current[3] = setTimeout(() => {
          setQMobile(true);
          setApplyMobile(true);
        }, duration);
      }
    },
    [birthYearValue, birthMonthValue, birthDayValue]
  );

  const handleMobileApply = useCallback(
    (e) => {
      e.preventDefault();
      if (mobileValue !== '') {
        setIsMobile(`${selValue}${mobileValue}`);
        setApplyMobile(false);
        timeouts.current[3] = setTimeout(() => {
          setQLocal(true);
          setApplyLocal(true);
        }, duration);
      }
    },
    [mobileValue, selValue]
  );

  const handleLocalApply = useCallback(
    (e) => {
      e.preventDefault();
      const location = selectedLocation && selectedLocation.label ? selectedLocation.label : '';
      const city = selectedCity && selectedCity.label ? selectedCity.label : '';

      if (!objIsEmpty(location) && !objIsEmpty(city)) {
        setIsLocal(`${location} ${city}`);
        setApplyLocal(false);
        timeouts.current[4] = setTimeout(() => {
          setQCarName(true);
          setApplyCarName(true);
        }, duration);
      }
    },
    [selectedCity, selectedLocation]
  );

  const handleCarNameApply = useCallback(
    (e) => {
      e.preventDefault();
      if (!objIsEmpty(carNameValue)) {
        setIsCarName(carNameValue);
        setApplyCarName(false);
        timeouts.current[6] = setTimeout(() => {
          setQCarNum(true);
          setApplyCarNum(true);
        }, duration);
      }
    },
    [carNameValue]
  );

  const handleCarNumApply = useCallback(
    (e) => {
      e.preventDefault();
      if (!objIsEmpty(carNumValue)) {
        setIsCarNum(carNumValue);
        setApplyCarNum(false);
        timeouts.current[7] = setTimeout(() => {
          setQTerms(true);
          setApplyTerms(true);
        }, duration);
      }
    },
    [carNumValue]
  );

  // 수정 클릭 시
  const handleNameModify = useCallback(() => {
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCarName(false);
    setApplyCarNum(false);
    setApplyTerms(false);
    setApplyConfirm(false);
    setApplyName(true);
  }, []);

  const handleMobileModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyLocal(false);
    setApplyCarName(false);
    setApplyCarNum(false);
    setApplyTerms(false);
    setApplyMobile(true);
  }, []);

  const handleBirthModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCarName(false);
    setApplyCarNum(false);
    setApplyTerms(false);
    setApplyBirth(true);
  }, []);

  const handleLocalModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyCarName(false);
    setApplyCarNum(false);
    setApplyTerms(false);
    setApplyConfirm(false);
    setApplyLocal(true);
  }, []);

  const handleCarNameModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCarNum(false);
    setApplyTerms(false);
    setApplyConfirm(false);
    setApplyCarName(true);
  }, []);

  const handleCarNumModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCarName(false);
    setApplyTerms(false);
    setApplyConfirm(false);
    setApplyCarNum(true);
  }, []);

  const handleTermsModify = useCallback(() => {
    setApplyName(false);
    setApplyBirth(false);
    setApplyMobile(false);
    setApplyCarName(false);
    setApplyCarNum(false);
    setApplyLocal(false);
    setApplyConfirm(false);
    setApplyTerms(true);
  }, []);

  const onClickRequest = useCallback(
    (e, termsCheckAll) => {
      e.preventDefault();
      let isAgree = isTerm;
      if (hasMobile) {
        setIsTerm(termsCheckAll);
        isAgree = termsCheckAll;
      }

      if (validationSubmitData(nameValue, mobileValue, birthYearValue, birthMonthValue, birthDayValue, carNumValue, carNameValue, isAgree)) {
        if (hasMobile) {
          timeouts.current[5] = setTimeout(() => {
            setApplyConfirm(true);
          });
        } else {
          if ((hasHyandai || false) === false) {
            rodalPopupHandler4(e, 'fade');
          } else {
            hyundaiLayerOpen(e);
          }
        }
      }
    },
    [birthDayValue, birthMonthValue, birthYearValue, carNameValue, carNumValue, hasHyandai, hasMobile, hyundaiLayerOpen, isTerm, mobileValue, nameValue, rodalPopupHandler4]
  );

  const onCloseClick = useCallback(
    (e) => {
      e.preventDefault();
      setRodalShow4(false);
    },
    [setRodalShow4]
  );

  const onClickSummit = useCallback(
    (e) => {
      e.preventDefault();

      setMpop(true);

      const location = selectedLocation && selectedLocation.label ? selectedLocation.label : '';
      const city = selectedCity && selectedCity.label ? selectedCity.label : '';

      const inputData = {
        customerName: nameValue,
        customerNumber: `${selValue}${mobileValue}`,
        customerAddr: `${location} ${city}`,
        customerBirthDay: `${birthYearValue}${padLeft(birthMonthValue, 2, '0')}${padLeft(birthDayValue, 2, '0')}`,
        customerCarNo: carNumValue,
        customerCarNm: carNameValue
      };
      console.log('VisitApply -> inputData', inputData);

      axiosPost('/api/pricing/insertVisitApply.do', inputData)
        .then(({ data }) => {
          if (data.statusinfo.ReturnCd === 'SUCCESS') {
            if (hasMobile) {
              Router.push('/sell/visitComplete');
            } else {
              // eslint-disable-next-line no-alert
              alert('방문신청 요청이 처리되었습니다.');
            }
          } else {
            // eslint-disable-next-line no-alert
            alert('방문신청 요청에 실패하였습니다.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [selectedLocation, selectedCity, nameValue, selValue, mobileValue, birthYearValue, birthMonthValue, birthDayValue, carNumValue, carNameValue, hasMobile]
  );

  const handleFullpagePopup = useCallback(name => e => {
    // e.preventDefault();
    if (name === "terms") {
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '방문평가 이용약관',
          options: ['back', 'close']
        }
      });
      setFpTerms(true);
    }
    setTimeout(() => document.getElementsByTagName('html')[0].style.overflow = 'hidden', 35);
  });
  const handleFpClose = useCallback((e) => {
    e.preventDefault();
    setFpTerms(false);
    dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, [fpTerms]);
  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback((e) => {
    e.preventDefault();
    setMpop(false);
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-sec">
          <div className="chat-list-wrap">
            <div className="left">
              {qGreet && <p>안녕하세요. 오토벨입니다. 간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서 매각까지 도와 드립니다.</p>}
              {qName && <p>고객님의 이름을 알려주세요.</p>}
            </div>
            {!objIsEmpty(isName) && (
              <div className="right">
                <p>{isName}입니다.</p>
                <span className="edit" onClick={handleNameModify}>
                  수정
                </span>
              </div>
            )}
            {qBirth && (
              <div className="left">
                <p>고객님의 생년월일을 입력해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isBirth) && (
              <div className="right">
                <p>{`${isBirth}`}입니다.</p>
                <span className="edit" onClick={handleBirthModify}>
                  수정
                </span>
              </div>
            )}
            {qMobile && (
              <div className="left">
                <p>전화번호를 입력해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isMobile) && (
              <div className="right">
                <p>{`${isMobile}`}입니다.</p>
                <span className="edit" onClick={handleMobileModify}>
                  수정
                </span>
              </div>
            )}
            {qLocal && (
              <div className="left">
                <p>방문지역을 선택해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isLocal) && (
              <div className="right">
                <p>{`${isLocal}`}입니다.</p>
                <span className="edit" onClick={handleLocalModify}>
                  수정
                </span>
              </div>
            )}
            {qCarName && (
              <div className="left">
                <p>차량명을 선택해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isCarName) && (
              <div className="right">
                <p>{isCarName}입니다.</p>
                <span className="edit" onClick={handleCarNameModify}>
                  수정
                </span>
              </div>
            )}
            {qCarNum && (
              <div className="left">
                <p>차량번호를 선택해주세요.</p>
              </div>
            )}
            {!objIsEmpty(isCarNum) && (
              <div className="right">
                <p>{isCarNum}입니다.</p>
                <span className="edit" onClick={handleCarNumModify}>
                  수정
                </span>
              </div>
            )}
            {qTerms && (
              <div className="left">
                <p>방문평가 판매를 위해서는 서비스 이용동의가 필요해요.</p>
              </div>
            )}
            {isTerm === true && (
              <div className="right last-message">
                <p>방문평가 판매 이용에 동의합니다.</p>
                <span className="edit" onClick={handleTermsModify}>
                  수정
                </span>
              </div>
            )}
          </div>

          {/* 채팅창 로딩중 */}
          <MobBottomArea isFix={true} isSimple={true}>
            <div className="inner">
              <div className="loading-wrap" />
            </div>
          </MobBottomArea>

          {/* step01 : 이름작성 */}
          <MobBottomArea active={applyName} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="user-name" className="hide">
                  이름
                </label>
                <Input type="text" placeHolder="이름" id="user-name" uiType={2} width={160} height={32} value={nameValue} onChange={handleNameValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleNameApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step02 : 생년월일작성 */}
          <MobBottomArea active={applyBirth} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="birth-year" className="hide">
                  년
                </label>
                <Input maxLength={4} type="number" placeHolder="2000" id="birth-year" uiType={2} className="tx-c" width={48} height={32} value={birthYearValue} onChange={handleBirthYearValue} />
                <em className="input-tx">년</em>
                <label htmlFor="birth-month" className="hide">
                  월
                </label>
                <Input maxLength={2} type="number" placeHolder="01" id="birth-month" uiType={2} className="tx-c" width={30} height={32} value={birthMonthValue} onChange={handleBirthMonthValue} />
                <em className="input-tx">월</em>
                <label htmlFor="birth-day" className="hide">
                  일
                </label>
                <Input maxLength={2} type="number" placeHolder="01" id="birth-day" uiType={2} className="tx-c" width={30} height={32} value={birthDayValue} onChange={handleBirthDayValue} />
                <em className="input-tx">일</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleBirthApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step03 : 휴대폰번호 작성 */}
          <MobBottomArea active={applyMobile} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <MobSelectBox options={mobileOptions} uiType={2} width={74} height={32} onClick={handleClickMobileSel} />
                <label htmlFor="user-phone" className="hide">
                  번호
                </label>
                <Input type="number" placeHolder="번호" id="user-phone" uiType={2} width={124} height={32} value={mobileValue} onChange={handleMobileValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" color="blue80" title="전송" onClick={handleMobileApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step04 : 방문지역 선택 */}
          <MobBottomArea active={applyLocal} isSimple={true} mode="fade" className={moreActive ? '' : 'half'} isFixButton={true}>
            <MobSelectLocal
              active={moreActive}
              dataContext={locationList}
              selectedValue={selectedCity ? selectedCity.value : -1}
              onMore={handleLocalMore}
              onChange={onHandleChangedCity}
              onClick={handleLocalApply}
              onMenuClick={onHandleChangedLocationList}
            />
          </MobBottomArea>

          {/* step05 : 차량명 */}
          <MobBottomArea active={applyCarName} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="user-car-name" className="hide">
                  차량명
                </label>
                <Input type="text" placeHolder="차량명" id="user-car-name" uiType={2} width={160} height={32} value={carNameValue} onChange={handleCarNameValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleCarNameApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step05 : 차량번호 */}
          <MobBottomArea active={applyCarNum} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="user-car-num" className="hide">
                  차량번호
                </label>
                <Input type="text" placeHolder="차량번호" id="user-car-num" uiType={2} width={160} height={32} value={carNumValue} onChange={handleCarNumValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleCarNumApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step04 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms onTermsClick={handleFullpagePopup("terms")} onClick={onClickRequest} termsData={[{ id: 'chk1', title: '방문평가 이용약관 (필수)', checked: false }]} />
          </MobBottomArea>

          {/* step05 : 신청팝업 */}
          <MobBottomArea active={applyConfirm} isSimple={true} mode="fade">
            <div className="inner bottom-write-area">
              <p className="tit1">
                입력하신 내용으로
                <br />
                방문평가 판매를 신청하시겠습니까?
              </p>
              <table className="table-tp1" summary="방문평가 판매 신청에 대한 내용">
                <caption className="away">방문평가 판매 신청</caption>
                <colgroup>
                  <col width="33%" />
                  <col width="67%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>{nameValue}</td>
                  </tr>
                  <tr>
                    <th>휴대전화번호</th>
                    <td>{`${selValue}${mobileValue}`}</td>
                  </tr>
                  <tr>
                    <th>고객방문 지역</th>
                    <td>{`${selectedLocation.label} ${selectedCity.label}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button size="full" background="blue80" title="확인" onClick={onClickSummit} />
          </MobBottomArea>
        </div>

        <MobFullpagePopup active={mFullpagePopup}>
          {fpTerms && <div className="member-terms-wrap">
            <div className="view-wrap">
              <div className="content">
                {auction_check_term[0]}
              </div>                      
              <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpClose} />
            </div>          
          </div>}
        </MobFullpagePopup>

        <RodalPopup show={mpop} type={'fade'} width={380} closedHandler={closeDimmMpop} isButton={false} subPop={false}>
          <div className="con-wrap">
            {/* <p className="tit1">정말 나가시겠습니까?</p>
            <p>작성한 내용은 임시저장 됩니다.</p> */}
            <p>내차팔기 접수가 완료되었습니다.</p>
            <Buttons align="center" marginTop={24}>
              {/* <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} /> */}
              <Button fontSize={14} title="확인" color="blue80" marginLeft={16} fontWeight="bold" onClick={closeMpop} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }

  return (
    <FrameLayout>
      <div className="content-wrap visit-apply-wrap">
        <div className="visit-img-sec">
          <i className="ico-sell-01" />
          <div className="apply-tit">
            <ul>
              <li>#오래된차</li>
              <li>#누가대신해줬으면</li>
              <li>#원하는장소와시간</li>
            </ul>
            <p>간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서 매각까지 도와드립니다.</p>
            <h3>방문평가판매</h3>
          </div>
        </div>
        <div className="visit-apply-sec">
          <div className="apply-tit">
            <h3>방문평가판매</h3>
            <p>간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서 매각까지 도와 드립니다.</p>
          </div>
          <form className="apply-form">
            <fieldset>
              <legend className="away">방문 신청</legend>
              <h4>방문 신청</h4>
              <ul className="register-tp1">
                <li>
                  <label htmlFor="userName">이름</label>
                  <Input type="text" id="isName" onChange={onHandleChangeInput} />
                  {objIsEmpty(nameValue) ? <p className="tx-exp-tp4">이름을 입력해주세요</p> : <p className="tx-exp-tp4">&nbsp;</p>}
                </li>
                <li className="birthLi">
                  <label htmlFor="birth">생년월일</label>
                  <span className="bridge">
                    <SelectBox id="birth" className="items-sbox" placeHolder={(new Date().getFullYear() - 30).toString()} options={yearList} width={170} height={48} onChange={handleBirthYearValue} />
                  </span>
                  <span className="bridge">
                    <SelectBox id="birth" className="items-sbox" placeHolder="01월" options={monthList} width={171} height={48} onChange={handleBirthMonthValue} />
                  </span>
                  <span>
                    <SelectBox id="birth" className="items-sbox" placeHolder="01일" options={dayList} width={171} height={48} onChange={handleBirthDayValue} />
                  </span>
                </li>
                <li>
                  <label htmlFor="user-phone">휴대 전화 번호</label>
                  <div className="clear">
                    <span className="bridge">
                      <SelectBox id="user-phone" className="items-sbox" options={mobileOptions} width={157} height={48} onClick={handleClickMobileSel} />
                    </span>
                    <Input type="number" placeHolder="" id="isMobile" width={373} onChange={onHandleChangeInput} />
                  </div>
                  {objIsEmpty(mobileValue) ? <p className="tx-exp-tp4">연락처를 입력해주세요</p> : <p className="tx-exp-tp4">&nbsp;</p>}
                </li>
                <li>
                  <label htmlFor="address">
                    거주 지역 <span className="select-option">(선택항목)</span>
                  </label>
                  <span className="bridge">
                    <SelectBox id="custRegion1" className="items-sbox" placeHolder="시/도 선택" options={locationList || []} width={265} height={48} onChange={onHandleChangedLocationList} />
                  </span>
                  <SelectBox id="custRegion2" className="items-sbox" placeHolder="시군구 선택" options={selectedLocation.citys} width={265} height={48} onChange={onHandleChangedCity} />
                </li>
                <li>
                  <label htmlFor="carName">차량명</label>
                  <Input type="text" placeHolder="" id="carName" isSelf={false} data={carNameValue} onChange={handleCarNameValue} />
                  {objIsEmpty(carNameValue) ? <p className="tx-exp-tp4">차량명을 입력해주세요</p> : <p className="tx-exp-tp4">&nbsp;</p>}
                </li>
                <li>
                  <label htmlFor="carNum">차량번호</label>
                  <Input type="text" placeHolder="" id="carNum" isSelf={false} data={carNumValue} onChange={handleCarNumValue} />
                  {objIsEmpty(carNumValue) ? <p className="tx-exp-tp4">차량번호를 입력해주세요</p> : <p className="tx-exp-tp4">&nbsp;</p>}
                </li>
              </ul>
            </fieldset>
            <div className="register-agree mt40">
              <CheckBox id="chk-useGuide" title="방문평가 이용약관 (필수)" isSelf={false} checked={isTerm} termPop={true} onChange={handleChangeTerm1} termPopHandle={handleTermPopup} />
            </div>
          </form>
          <Buttons align="center" marginTop={30}>
            <Button size="big" background="blue80" title="신청하기" width={245} height={60} onClick={onClickRequest} />
          </Buttons>
        </div>
      </div>

      {hyundaiLayer && (
        <div className="popup-visit">
          <div>
            <div>내차팔기 접수가 완료되었습니다.</div>
            <Button size="big" background="blue80" title="완료" width={304} height={60} onClick={hyundaiLayerClose} />
          </div>
        </div>
      )}

      <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="방문평가 이용약관 (필수)" mode="normal" size="medium">
        <div className="con-wrap" dangerouslySetInnerHTML={{ __html: termCont.tmsCntn }} />
      </RodalPopup>

      <RodalPopup show={rodalShow4} type={'fade'} closedHandler={onCloseClick} mode="normal" size="xs">
        <div className="con-wrap">
          <p className="mb33">입력하신 내용으로 방문평가 판매를 신청하시겠습니까?</p>
          <table summary="방문평가 신청에 대한 내용" className="table-tp1">
            <caption className="away">방문평가</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{nameValue}</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>{`${selValue}${mobileValue}`}</td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>{`${selectedLocation.label} ${selectedCity.label}`}</td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={40}>
            <Button size="big" background="gray" title="취소" width={130} onClick={onCloseClick} />
            <Button size="big" background="blue80" title="확인" width={130} onClick={onClickSummit} />
          </Buttons>
        </div>
      </RodalPopup>
    </FrameLayout>
  );
};

const validationSubmitData = (name, mobile, birthYear, birthMonth, birtyDay, carNum, carName, isTerm) => {
  if (objIsEmpty(name)) {
    return false;
  }
  if (objIsEmpty(mobile)) {
    return false;
  }
  if (objIsEmpty(birthYear)) {
    return false;
  }
  if (objIsEmpty(birthMonth)) {
    return false;
  }
  if (objIsEmpty(birtyDay)) {
    return false;
  }
  if (objIsEmpty(carNum)) {
    return false;
  }
  if (objIsEmpty(carName)) {
    return false;
  }
  if (!isTerm) {
    // eslint-disable-next-line no-alert
    alert('정보제공에 동의하여 주시기 바랍니다.');
    return false;
  }
  return true;
};

export default withRouter(VisitApplyHyundai);
