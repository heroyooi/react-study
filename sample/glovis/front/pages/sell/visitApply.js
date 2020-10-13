import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { ClipLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import MobSelectLocal from '@src/components/common/MobSelectLocal';
import MobSelectTerms from '@src/components/common/MobSelectTerms';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import { SECTION_SELL, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import { CMCDTPID } from '@src/constant/cdMstLib';
import { getSellCarMobileOption } from '@src/actions/sellcar/sellCarAction';
import { insertSellcarAction } from '@src/actions/sellcar/VisitSellCarAction';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { axiosGet } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';
import { gInfoLive } from '@src/utils/LoginUtils';
import CheckBox from '@lib/share/items/CheckBox';
import { selectSellcarTerms } from '@src/api/sellcar/AllSellcarSearchApi';

const VisitApply = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { showAlert } = useContext(SystemContext);
  const [isLoading, setIsLoading] = useState(false); //페이지 딤처리
  const [terms, setTerms] = useState(''); // 방문평가 이용 약관
  const [privacyTerms, setPrivacyTerms] = useState(''); // 개인정보 처리방침 약관

  const [mpop, setMpop, openMpop, closeDimmMpop] = useRodal(false);
  const closeMpop = useCallback(
    (e) => {
      e.preventDefault();
      setMpop(false);
    },
    [setMpop]
  );

  useEffect(() => {
    if (!hasMobile) {
      Router.replace('/sellcar/visit/visitValuationRequest');
    }

    dispatch({ type: SECTION_SELL });
    dispatch(getSellCarMobileOption(CMCDTPID.phone));

    // 약관 조회
    // * tmsTp          tmsDiv
    // * 0500 방문평가    0510 이용약관
    // * 0600 셀프평가    0610 이용약관
    // * 0700 무평가      0710 이용약관
    // * 0700 무평가      0720 환불규정
    selectSellcarTerms({ tmsTp: '0500', tmsDiv: '0510' })
      .then((res) => {
        console.log(res);
        const { data: _terms } = res.data;
        setTerms(_terms ? _terms : {});
      })
      .catch((err) => console.log(err));

    selectSellcarTerms({ tmsTp: '0800', tmsDiv: '0820', tmsSbj: '0010' })
      .then((res) => {
        const { data: _terms } = res.data;
        setPrivacyTerms(_terms ? _terms : {});
      })
      .catch((err) => console.error(err));
    // 약관 조회 끝

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '방문평가 판매',
          options: ['back'],
          events: [(e) => openMpop(e, 'fade')]
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, []);

  // const backButtonFunc = useCallback((e) => {
  //   if (e) {
  //     openMpop(null, 'fade');
  //     e.preventDefault();
  //   }
  // }, []);
  // useEffect(() => {
  // history.pushState(null, document.title, location.href);
  // document.addEventListener('backbutton', backButtonFunc, false);
  // return () => {
  //   document.removeEventListener('backbutton', backButtonFunc, false);
  // };
  // window.addEventListener('navigationhandler', function (e) {
  //   window.history.pushState(null, document.title, window.location.href);
  //   window.addEventListener('popstate', function (event) {
  //     window.history.pushState(null, document.title, window.location.href);
  //   });
  // });
  // window.dispatchEvent(new CustomEvent('navigationhandler'));
  //   window.addEventListener('beforeunload', backButtonFunc);
  //   return () => {
  //     window.removeEventListener('beforeunload', backButtonFunc);
  //   };
  // }, []);

  useEffect(() => {
    const _type = gInfoLive()?.membertype;
    if (_type === '0020' || _type === '0030' || _type === '0040') {
      alert('내차팔기 서비스는 일반 회원만 이용 가능합니다.');
      Router.replace('/cscenter/faq');
    }
  }, []);

  // 질문 영역
  const [qGreet, setQGreet] = useState(false);
  const [qName, setQName] = useState(false);
  const [qMobile, setQMobile] = useState(false);
  const [qLocal, setQLocal] = useState(false);
  const [qCrNo, setQCrNo] = useState(false);
  const [qTerms, setQTerms] = useState(false);

  // 더보기, change되는 값
  const [moreActive, setMoreActive] = useState(false);
  //  const [isLocalNum, setIsLocalNum] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [mobileValue, setMobileValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState({ value: '', label: '', citys: [] });
  const [userCarNumber, setUserCarNumber] = useState('');
  const [selectedCity, setSeletedCity] = useState({});
  const [chkInputCrNo, setChkInputCrNo] = useState(false);

  // 결과 값
  const [isName, setIsName] = useState('');
  const [isMobile, setIsMobile] = useState('');
  const [isLocal, setIsLocal] = useState('');
  const [isCrNo, setIsCrNo] = useState('');
  const [isTerms, setIsTerms] = useState(false);

  // 답변 입력 단계
  const [applyName, setApplyName] = useState(false);
  const [applyMobile, setApplyMobile] = useState(false);
  const [applyLocal, setApplyLocal] = useState(false);
  const [applyCrNo, setApplyCrNo] = useState(false);
  const [applyTerms, setApplyTerms] = useState(false);
  const [applyConfirm, setApplyConfirm] = useState(false);

  // 풀페이지 팝업
  const [fpTerms1, setFpTerms1] = useState(false);
  const [fpTerms2, setFpTerms2] = useState(false);
  //const termList = useSelector((state) => state.sellCarStore.sellCarTermList);
  const [termCheck, setTermCheck] = useState([
    { id: 'chk1', title: '방문평가 이용약관 (필수)', checked: false },
    { id: 'chk2', title: '개인정보 처리방침 (필수)', checked: false }
  ]);

  // 인풋 & 셀렉트 & 라디오 값 컨트롤
  const [selValue, setSelValue] = useState(0);
  const [locationList, setLocationList] = useState(null);
  const mobileOptions = useSelector((state) => state.sellCarStore.sellMobileOptionCode);

  const handleClickMobileSel = useCallback(
    (e) => {
      setSelValue(mobileOptions[e - 1].label);
    },
    [mobileOptions]
  );

  useEffect(() => {
    if (mobileOptions !== undefined) {
      const _idx = mobileOptions.findIndex((v) => v.checked === true);
      setSelValue(_idx > -1 ? mobileOptions[_idx].label : 0);
    }
  }, [mobileOptions]);

  const handleNameValue = useCallback((e) => {
    setNameValue(e.target.value);
  }, []);

  const handleMobileValue = useCallback((e) => {
    setMobileValue(e.target.value.replace(/[^0-9]+/g, ''));
  }, []);

  const onHandleChangedCity = useCallback((e) => {
    setSeletedCity(e);
  }, []);

  const handleCrNoValue = useCallback((e) => {
    setUserCarNumber(e.target.value);
  }, []);

  const onChangeInputCarNumber = useCallback(() => {
    setChkInputCrNo((prev) => !prev);
  }, []);

  // 더보기 클릭 시, 방문지역 선택창 확대
  const handleLocalMore = useCallback((e) => {
    e.preventDefault();
    setMoreActive((prevActive) => !prevActive);
  }, []);
  // 더보기 클릭 시, 방문지역 선택창 확대 끝

  // 방문 지역 선택
  useEffect(() => {
    axiosGet(`/api/pricing/getLocation.do`).then((res) => {
      const { data, statusinfo } = res.data;
      if (statusinfo?.returncd === 'SUCCESS') {
        data.forEach((item) => {
          item.value = item.locCd;
          item.label = item.locNm;
          item.citys = [];
        });
      }
      setLocationList(data);
    });
  }, []);

  const onHandleChangedLocationList = useCallback(
    (e) => {
      if (e.citys.length === 0) {
        axiosGet(`/api/pricing/getLocationCity.do?locCd=${e.value}`).then((res) => {
          const { data, statusinfo } = res.data;
          if (statusinfo?.returncd === 'SUCCESS') {
            data.forEach((item) => {
              item.value = item.ctyCd;
              item.label = item.ctyNm;
            });
            e.citys = data;
            setSelectedLocation(e);
            setLocationList(locationList);
          }
        });
      } else {
        setSelectedLocation(e);
      }
    },
    [locationList]
  );
  // 방문 지역 선택 끝

  // 단계별 화면 제어
  useEffect(() => {
    if (applyName) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyMobile) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 88,
          color: '#f6f7f8'
        }
      });
    }
    if (applyLocal) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 268,
          color: '#f6f7f8'
        }
      });
    }
    if (applyTerms) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 272,
          color: '#f6f7f8'
        }
      });
    }
    if (applyConfirm) {
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 297,
          color: '#f6f7f8'
        }
      });
    }
    setTimeout(() => {
      document.querySelector('#wrap').scrollTo(0, document.querySelector('.chat-list-wrap').clientHeight);
    }, 10);
  }, [applyName, applyMobile, applyLocal, applyTerms, applyConfirm, dispatch]);
  // 단계별 화면 제어 끝

  // 단계별 질문 제어
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
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, []);

  const handleNameApply = useCallback(
    (e) => {
      e.preventDefault();
      if (nameValue !== '') {
        setIsName(nameValue);
        setApplyName(false);
        timeouts.current[2] = setTimeout(() => {
          setQMobile(true);
          setApplyMobile(true);
        }, duration);
      } else {
        showAlert('이름을 입력해주세요.');
      }
    },
    [nameValue]
  );

  // Pattern - Phone
  const phonePattern = /^[0-9]{3,4}[0-9]{4}$/;

  const handleMobileApply = useCallback(
    (e) => {
      e.preventDefault();

      if (mobileValue.match(phonePattern) !== null) {
        setIsMobile(selValue + mobileValue);
        setApplyMobile(false);
        timeouts.current[3] = setTimeout(() => {
          setQLocal(true);
          setApplyLocal(true);
        }, duration);
      } else {
        showAlert('유효한 휴대전화 번호를 입력해주세요.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selValue, mobileValue]
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
          // setQTerms(true);
          // setApplyTerms(true);
          setQCrNo(true);
          setApplyCrNo(true);
        }, duration);
      } else {
        showAlert('지역을 선택해주세요.');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCity, selectedLocation]
  );

  // 차량번호
  const handleCrNoApply = useCallback(
    (e) => {
      e.preventDefault();
      if (userCarNumber !== '' || chkInputCrNo) {
        setIsCrNo(chkInputCrNo ? '차량번호불명' : userCarNumber);
        setApplyCrNo(false);
        timeouts.current[5] = setTimeout(() => {
          setQTerms(true);
          setApplyTerms(true);
        }, duration);
      } else {
        showAlert('차량번호를 모르시면 불명을 체크해주세요');
      }
    },
    [showAlert, userCarNumber, chkInputCrNo]
  );

  const handleTermsApply = useCallback((e) => {
    e.preventDefault();
    if (termCheck[0].checked) {
      setIsTerms(true);
      timeouts.current[6] = setTimeout(() => {
        setApplyConfirm(true);
      });
    } else {
      showAlert('필수 이용 약관에 동의해주세요.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 단계별 질문 제어 끝

  // 답변 수정 클릭
  const handleNameModify = useCallback(() => {
    setApplyName(true);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCrNo(false);
    setApplyTerms(false);
    setApplyConfirm(false);
  }, []);
  const handleMobileModify = useCallback(() => {
    setApplyName(false);
    setApplyMobile(true);
    setApplyLocal(false);
    setApplyCrNo(false);
    setApplyTerms(false);
    setApplyConfirm(false);
  }, []);
  const handleLocalModify = useCallback(() => {
    setApplyName(false);
    setApplyMobile(false);
    setApplyLocal(true);
    setApplyCrNo(false);
    setApplyTerms(false);
    setApplyConfirm(false);
  }, []);
  const handleCrNoModify = useCallback(() => {
    setApplyName(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCrNo(true);
    setApplyTerms(false);
    setApplyConfirm(false);
  }, []);
  const handleTermsModify = useCallback(() => {
    setApplyName(false);
    setApplyMobile(false);
    setApplyLocal(false);
    setApplyCrNo(false);
    setApplyTerms(true);
    setApplyConfirm(false);
  }, []);
  // 답변 수정 클릭 끝

  // 동의 팝업 제어
  const handleFullpagePopup = useCallback(
    (name) => (e) => {
      e.preventDefault();
      if (name === 'terms1') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '방문평가 이용약관',
            options: ['back', 'close']
          }
        });
        setFpTerms2(false);
        setFpTerms1(true);
      } else if (name === 'terms2') {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '개인정보 처리방침',
            options: ['close']
          }
        });
        setFpTerms1(false);
        setFpTerms2(true);
      }
    },
    []
  );
  const handleTermsPopup = useCallback((e, v) => {
    e.preventDefault();
    console.warn(v);
    if (v.id === 'chk1') {
      handleFullpagePopup('terms1')(e);
    } else if (v.id === 'chk2') {
      handleFullpagePopup('terms2')(e);
    }
  }, []);
  const handleFpTermsClose = useCallback(
    (e) => {
      e.preventDefault();
      setFpTerms1(false);
      setFpTerms2(false);
      dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
    },
    [dispatch]
  );
  // 동의 팝업 제어 끝

  // 신청서 접수
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const _number = mobileValue.match(/^([0-9]{3,4})([0-9]{4})$/);

    const params = {
      hasMobile: true,
      nmbNm: nameValue,
      hpPn: `${selValue}-${_number[1]}-${_number[2]}`,
      rgstRsdcAddrCd: selectedLocation.value,
      rgstRsdcAddrCdNm: selectedLocation.label,
      rgstRsdcDtlAddrCd: selectedCity.value,
      rgstRsdcDtlAddrCdNm: selectedCity.label,
      car: {
        crNo: userCarNumber
      }
    };
    if (!isLoading) setIsLoading(true);
    const success = await dispatch(insertSellcarAction(params));
    if (success) {
      // Router.replace('/sell/visitComplete');
      Router.push({
        pathname: '/sell/visitComplete',
        query: {
          name: nameValue,
          mobile: `${selValue}${mobileValue}`,
          location: `${selectedLocation.label} ${selectedCity.label}`
        }
      });
    } else {
      showAlert('방문 신청이 실패했습니다.');
    }
    if (isLoading) setIsLoading(false);
  };
  // 신청서 접수 끝

  // 상단 닫기 버튼 확인 선택시 페이지 뒤로가기
  const handleBack = (e) => {
    e.preventDefault();
    Router.back();
  };
  // 상단 닫기 버튼 확인 선택시 페이지 뒤로가기 끝

  // 렌더링 영역 시작
  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-sec">
          <div className="chat-list-wrap">
            <div className="left">
              {qGreet && (
                <p>
                  안녕하세요! 오토벨입니다.
                  <br />
                  <span className="tx-blue80">오토벨 평가사</span>가 직접 찾아가는 <strong>방문평가로 내 차 팔기</strong>를 시작합니다.
                </p>
              )}
              {qName && (
                <p>
                  고객님의 <strong>이름</strong>을 알려주세요.
                </p>
              )}
            </div>
            {isName !== '' && (
              <div className="right">
                <p>
                  <span>{isName}</span>입니다.
                </p>
                <span className="edit" onClick={handleNameModify}>
                  수정
                </span>
              </div>
            )}
            {qMobile && (
              <div className="left">
                <p>
                  <strong>전화번호</strong>를 입력해주세요.
                </p>
              </div>
            )}
            {isMobile !== '' && (
              <div className="right">
                <p>
                  <span>{isMobile}</span>입니다.
                </p>
                <span className="edit" onClick={handleMobileModify}>
                  수정
                </span>
              </div>
            )}
            {qLocal && (
              <div className="left">
                <p>
                  <strong>방문지역</strong>을 선택해주세요.
                </p>
              </div>
            )}
            {isLocal !== '' && (
              <div className="right">
                <p>
                  <span>{isLocal}</span>입니다.
                </p>
                <span className="edit" onClick={handleLocalModify}>
                  수정
                </span>
              </div>
            )}
            {qCrNo && (
              <div className="left">
                <p>
                  <strong>차량번호</strong>를 알려주세요.
                </p>
              </div>
            )}
            {isCrNo !== '' && (
              <div className="right">
                <p>
                  <span>{isCrNo}</span>입니다.
                </p>
                <span className="edit" onClick={handleCrNoModify}>
                  수정
                </span>
              </div>
            )}
            {qTerms && (
              <div className="left">
                <p>
                  방문평가 판매를 위해서는 <strong>서비스 이용동의</strong>가 필요해요.
                </p>
              </div>
            )}

            {isTerms !== false && (
              <div className="right last-message">
                <p>방문평가 판매 이용에 동의합니다.</p>
                <span className="edit" onClick={handleTermsModify}>
                  수정
                </span>
              </div>
            )}
          </div>

          {/* 채팅창 로딩중 */}
          <MobBottomArea active={true} isSimple={true}>
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

          {/* step02 : 휴대폰번호 작성 */}
          <MobBottomArea active={applyMobile} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <MobSelectBox options={mobileOptions} uiType={2} width={74} height={32} onClick={handleClickMobileSel} />
                <label htmlFor="user-phone" className="hide">
                  번호
                </label>
                <Input type="number" placeHolder="번호" id="user-phone" uiType={2} width={114} height={32} value={mobileValue} onChange={handleMobileValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" color="blue80" title="전송" onClick={handleMobileApply} />
              </div>
            </div>
          </MobBottomArea>

          {/* step03 : 방문지역 선택 */}
          <MobBottomArea active={applyLocal} isSimple={true} mode="fade" className={moreActive ? '' : 'half'} isFixButton={true}>
            {/* <MobSelectLocal active={moreActive} onMore={handleLocalMore} num={isLocalNum} onChange={handleLocalValue} onClick={handleLocalApply} /> */}
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

          {/* step04 : 차량번호 */}
          <MobBottomArea active={applyCrNo} isSimple={true} mode="fade" className="min">
            <div className="inner bottom-write-area">
              <div className="float-wrap lh48">
                <label htmlFor="user-name" className="hide">
                  차량번호
                </label>
                <Input type="text" placeHolder="차량번호" id="user-name" uiType={2} width={160} height={32} value={userCarNumber} onChange={handleCrNoValue} />
                <em className="input-tx">입니다.</em>
                <Button className="fr" size="mid" color="blue80" title="전송" onClick={handleCrNoApply} />
              </div>
              <div className="n-car-number">
                <CheckBox title="차량번호 불명" size="noborder" id="none-car-number" checked={chkInputCrNo} isSelf={false} onChange={onChangeInputCarNumber} />
              </div>
            </div>
          </MobBottomArea>

          {/* step05 : 약관동의 */}
          <MobBottomArea active={applyTerms} isSimple={true} mode="fade">
            <MobSelectTerms onTermsClick={handleTermsPopup} onClick={handleTermsApply} termsData={termCheck} btnName="동의" />
          </MobBottomArea>

          {/* step06 : 신청팝업 */}
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
                    <th>방문지역</th>
                    <td>{`${selectedLocation.label} ${selectedCity.label}`}</td>
                  </tr>
                  <tr>
                    <th>차량정보</th>
                    <td>{userCarNumber || '차량정보 불명'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button size="full" background="blue80" title="확인" onClick={(e) => onSubmitHandler(e)} />
          </MobBottomArea>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {fpTerms1 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: terms.tmsCntn }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
          {fpTerms2 && (
            <div className="member-terms-wrap">
              <div className="view-wrap">
                <div className="content" dangerouslySetInnerHTML={{ __html: privacyTerms.tmsCntn }} />
                <Button className="fixed" size="full" background="blue80" title="확인" onClick={handleFpTermsClose} />
              </div>
            </div>
          )}
        </MobFullpagePopup>

        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={40} color={'#fff'} loading={true} />
          </div>
        )}

        <RodalPopup show={mpop} type={'fade'} closedHandler={closeDimmMpop} isButton={false} subPop={false} closeMaskOnClick={true}>
          <div className="con-wrap">
            <p className="tit1">정말 나가시겠습니까?</p>
            <p>신청 중인 내용은 임시저장되지 않습니다.</p>
            <Buttons align="right" marginTop={24}>
              <Button fontSize={14} title="취소" color="blue80" onClick={closeMpop} />
              <Button fontSize={14} title="나가기" color="blue80" marginLeft={16} fontWeight="bold" onClick={handleBack} />
            </Buttons>
          </div>
        </RodalPopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>PC 화면으로 이동합니다.</AppLayout>
    // <AppLayout>
    //   <div className="content-wrap visit-apply-wrap">
    //     <div className="visit-img-sec">
    //       <i className="ico-sell-01" />
    //     </div>
    //     <div className="visit-apply-sec">
    //       <div className="apply-tit">
    //         <h3>방문평가판매</h3>
    //         <p>간편 신청을 통해 전담 차량 평가사가 방문하여 차량 평가에서 매각까지 도와 드립니다.</p>
    //       </div>
    //       <form className="apply-form">
    //         <fieldset>
    //           <legend className="away">방문 신청</legend>
    //           <h4>방문 신청</h4>
    //           <ul className="register-tp1">
    //             <li>
    //               <label htmlFor="userName">이름</label>
    //               <Input type="text" placeHolder="" id="userName" />
    //               <p className="tx-exp-tp4">이름을 입력해주세요</p>
    //             </li>
    //             <li>
    //               <label htmlFor="user-phone">휴대 전화 번호</label>
    //               <span className="bridge">
    //                 <SelectBox id="user-phone" className="items-sbox" options={select1_list} width={157} height={48} />
    //               </span>
    //               <Input type="text" placeHolder="" id="user-phone-visit-apply2" width={373} />
    //             </li>
    //             <li>
    //               <label htmlFor="address">
    //                 거주 지역 <span className="select-option">(선택항목)</span>
    //               </label>
    //               <span className="bridge">
    //                 <SelectBox id="address" className="items-sbox" placeHolder="시/도 선택" options={select1_list} width={265} height={48} />
    //               </span>
    //               <SelectBox id="address2" className="items-sbox" placeHolder="시군구 선택" options={select1_list} width={265} height={48} />
    //             </li>
    //           </ul>
    //         </fieldset>
    //         <div className="register-agree mt40">
    //           <CheckBox id="chk-useGuide" title="방문평가 이용약관 (필수)" termPop={true} onChange={handleChangeAgree} termPopHandle={handleChangeTerm1} />

    //           {/* <CheckBox id='chk-collect' title='개인정보 수집 및 이용에 대한 동의' isSelf={false} checked={term1} onChange={handleChangeTerm1} />
    //           <CheckBox id='chk-provide' title='제 3자 정보 제공 동의' isSelf={false} checked={term2} onChange={handleChangeTerm2} />
    //           <CheckBox id='chk-marketing' title='마케팅 활동 동의' sub='(선택)' isSelf={false} checked={term3} onChange={handleChangeTerm3} /> */}
    //         </div>
    //       </form>
    //       <Buttons align="center" marginTop={30}>
    //         <Button size="big" background="blue80" title="신청하기" width={245} height={60} onClick={(e) => rodalPopupHandler4(e, 'fade')} />
    //       </Buttons>
    //     </div>
    //   </div>
    //   <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="방문평가 이용약관 (필수)" mode="normal" size="medium">
    //     <div className="con-wrap">약관내용</div>
    //   </RodalPopup>
    //   {/*
    //   <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="제 3자 정보 제공 동의(필수)" mode="normal" size="medium">
    //     <div className="con-wrap">

    //     </div>
    //   </RodalPopup>
    //   <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="마케팅 활동 동의(선택)" mode="normal" size="medium">
    //     <div className="con-wrap">

    //     </div>
    //   </RodalPopup> */}
    //   <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} mode="normal" size="xs">
    //     <div className="con-wrap">
    //       <p className="mb33">입력하신 내용으로 방문평가 판매를 신청하시겠습니까?</p>
    //       <table summary="방문평가 신청에 대한 내용" className="table-tp1">
    //         <caption className="away">방문평가</caption>
    //         <colgroup>
    //           <col width="40%" />
    //           <col width="60%" />
    //         </colgroup>
    //         <tbody>
    //           <tr>
    //             <th>이름</th>
    //             <td>김현대</td>
    //           </tr>
    //           <tr>
    //             <th>휴대전화번호</th>
    //             <td>010-2873-7263</td>
    //           </tr>
    //           <tr>
    //             <th>거주지역</th>
    //             <td>서울시 강남구</td>
    //           </tr>
    //         </tbody>
    //       </table>
    //       <Buttons align="center" marginTop={40}>
    //         <Button size="big" background="gray" title="취소" width={130} />
    //         <Button size="big" background="blue80" title="확인" width={130} />
    //       </Buttons>
    //     </div>
    //   </RodalPopup>
    // </AppLayout>
  );
};

export default VisitApply;
