/**
 * 설명 : 스마트옥션 탁송신청 입력
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction,autoAuctionComplete]
 * @author 박진하
 */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import Router, { withRouter } from 'next/router';
import moment from 'moment';
import Cookies from 'js-cookie';
import { ClipLoader } from 'react-spinners';

import Steps from '@lib/share/items/Steps';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import Textarea from '@lib/share/items/Textarea';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';

import AppLayout from '@src/components/layouts/AppLayout';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import FindAddress from '@src/components/common/popup/FindAddress';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost } from '@src/utils/HttpUtils';
import { getExhibitCarList, getMbInfo, getCommonCodeList, setInputInfo, consignYmdList } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import useDetectPageRefresh from '@src/components/custom/useDetectPageRefresh';
import { isLoginLiveCheck, gInfoLive } from '@src/utils/LoginUtils';
import { preventScroll } from '@src/utils/CommonUtil';

const globalThis = require('globalthis')();

/**
 * 설명 : 출품할 차량을 선택하여 탁송정보를 입력하고 출품완료 페이지를 호출한다.
 * @param {state.autoAuction.exhibitCarList} 출품 차량 목록
 * @returns {consignmentRequest} 차량정보 조회/선택 및 탁송정보 등록
 */

const ConsignmentRequest = () => {
  //console.log('*** consignmentRequest > isLoginLiveCheck', isLoginLiveCheck());
  const nf = new Intl.NumberFormat();
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { showAlert, initAlert } = useContext(SystemContext);

  useEffect(() => {
    if (!isLoginLiveCheck()) {
      showAlert('세션이 만료 되었습니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    if (gInfoLive().type !== 'member') {
      showAlert('스마트옥션 출품 서비스는<br/>회원만 이용 가능합니다.<br/>로그인 페이지로 이동합니다.', () => {
        // Router.push('/login').then(() => {
        //   window.scrollTo(0, 0);
        // });
        globalThis.window.location.href = '/login'
      });
    }
    dispatch({ type: SECTION_AUTO_AUCTION });

    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내 차 출품하기',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, []);

  useEffect(
    () => () => {
      initAlert();
    },
    []
  );

  const [rodalShow, setRodalShow, openSearchAddr, closeSearchAddr] = useRodal(false, true);
  const { inputInfo, exhibitCarList, mbInfo, consignCdRadio, hpPnCdList, mobHpPnCdList, auctionOngoing } = useSelector((state) => state.autoAuction);
  const [formData, setFormData] = useState(inputInfo);
  const [flag, setFlag] = useState(0);
  const [hourList, setHourList] = useState([]);
  const [minuteList, setMinuteList] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [dobleFlag, setDobleFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const numberCheck = /^[0-9\b]+$/;
  const korCheck = /[ㄱ-ㅎㅏ-ㅣ가-힣\b]+$/;

  const getByte = (str) => {
    let byte = 0;
    for (let i = 0; i < str.length; ++i) {
      str.charCodeAt(i) > 127 ? (byte += 3) : byte++;
    }
    return byte;
  };

  // 화면 Refresh 여부 감지 (진행상태, Refresh 이후 Redirect URL)
  useDetectPageRefresh(auctionOngoing, '/autoAuction/autoAuctionMain');

  const handleOnKeyUp = (e) => {
    e.preventDefault();
    for (const val of e.target.value) {
      if (korCheck.test(val)) {
        e.target.value = '';
      }
    }
  };

  const inNumber = (e) => {
    if (!numberCheck.test(e.key)) {
      e.preventDefault();
    }
  };

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    // 모바일의 휴대폰번호는 1개의 입력창으로부터 번호를 추출
    if (hasMobile && id === 'hpPnUnion') {
      const numRegexWhen5 = /^([0-9]*)([0-9]{4})$/;
      const tmpNum = value.replace(/-/gi, '');
      setFormData(
        produce((draft) => {
          const num2 = tmpNum.replace(numRegexWhen5, '$1');
          const num3 = tmpNum.replace(numRegexWhen5, '$2');
          if (num3.length < 4) {
            draft.hpPn2 = '';
            draft.hpPn3 = num3;
          } else {
            draft.hpPn2 = num2;
            draft.hpPn3 = num3;
          }
        })
      );
    } else {
      setFormData(
        produce((draft) => {
          draft[id] = value;
        })
      );
    }
  };

  const onChangeRadio = (e, target) => {
    const { value } = e.target;
    setFormData(
      produce((draft) => {
        draft[target] = value;
      })
    );
  };

  // const onChangeDate = (e) => {
  //   const date = moment(e).format('YYYY-MM-DD');
  //   setFormData(
  //     produce((draft) => {
  //       draft.consignYmd = date;
  //     })
  //   );
  // };

  const onChangeSelect = (e, target) => {
    const { value } = e;
    setFormData(
      produce((draft) => {
        draft[target] = value;
      })
    );
  };

  const onSearchAddr = (e) => {
    e.preventDefault();
    setRodalShow(true);
  };

  const addrEvent = (e) => {
    setFormData(
      produce((draft) => {
        draft.zipcode = e.postCode;
        draft.addr1 = e.addData;
        draft.addr2 = e.detailText;
        draft.locCd = e.locCd;
        draft.ctyCd = e.ctyCd;
      })
    );
    closeSearchAddr();
  };

  const onChangeCheckbox = (id, check) => {
    const idx = id.split('chk-car-')[1];
    if (check) {
      setFormData(
        produce((draft) => {
          draft.actuIdArr = [...formData.actuIdArr, exhibitCarList[idx].actuId];
          draft.consignCarNo = [...formData.consignCarNo, exhibitCarList[idx].crNo];
        })
      );
    } else {
      const arr1 = formData.actuIdArr.concat();
      const arr2 = formData.consignCarNo.concat();
      arr1.splice(arr1.indexOf(exhibitCarList[idx].actuId), 1);
      arr2.splice(arr2.indexOf(exhibitCarList[idx].crNo), 1);
      setFormData(
        produce((draft) => {
          draft.actuIdArr = arr1;
          draft.consignCarNo = arr2;
        })
      );
    }
    isChecked[idx] = !isChecked[idx];
    setIsChecked([...isChecked]);
  };

  const nextStep = (e, url) => {
    e.preventDefault();
    if (dobleFlag !== true) {
      setDobleFlag(true);
      return;
    }
    setFlag(1);
    if (formData.consignCd === '0010') {
      if (formData.consignYmd === '') {
        showAlert('탁송 희망일을 선택하세요.', 'error');
        return;
      } else if (formData.consignHh === '' || formData.consignMm === '') {
        showAlert('탁송 희망 시간을 선택하세요.', 'error');
        return;
      } else if (formData.zipcode === '' || formData.addr1 === '' || formData.addr2 === '') {
        showAlert('탁송지 주소를 입력하세요.', 'error');
        return;
      } else if (formData.consignChargeNm === '') {
        showAlert('인계자명을 입력하세요.', 'error');
        return;
      } else if (formData.hpPn1 === '' || formData.hpPn2 === '' || formData.hpPn3 === '') {
        showAlert('휴대폰 번호를 입력하세요.', 'error');
        return;
      }
    }
    setFlag(2);

    if (formData.actuIdArr.length < 1) {
      showAlert('선택된 차량이 없습니다.', 'error');
      return;
    }

    if (formData.memo.length > 0) {
      const bytes = getByte(formData?.memo);
      if (bytes > 200) return showAlert('메모는 영문 200자, 한글 50자 이내로 입력하세요.');
    }

    // if (formData.auctPrstlsNrmlMb === '' || formData.auctPrstlsNrmlMb === undefined || formData.auctPrstlsNrmlMb === null) {
    //   if (formData.auctPrstlsMb === '' || formData.auctPrstlsMb === undefined || formData.auctPrstlsMb === null) {
    //     showAlert('경매회원이 아닙니다.<br/>경매회원가입 후 진행해주세요.', 'error');
    //     return;
    //   }
    // }

    setIsLoading(true);
    axiosPost('/api/autoauction/insertConsignReqInfo.do', formData).then(({ data }) => {
      setIsLoading(false);
      if (data.statusinfo.returncd === '000') {
        setIsLoading(true);
        dispatch(setInputInfo(formData));
        Router.push(url).then(() => {
          window.scrollTo(0, 0);
          setIsLoading(false);
        });
      } else {
        console.log('errorCd >>', data.statusinfo.returncd);
        console.log('errorMsg >>', data.statusinfo.returnmsg);
        showAlert(data.statusinfo.returnmsg, 'error');
      }
    });
  };

  useEffect(() => {
    setFormData(
      produce((draft) => {
        draft.consignDt = formData.consignYmd + (formData.consignHh ? ' ' + formData.consignHh : '') + (formData.consignMm ? ':' + formData.consignMm : '');
        draft.hpPn1 = formData.hpPn1 === '' ? '010' : formData.hpPn1;
        draft.consignHpNo = formData.hpPn1 + formData.hpPn2 + formData.hpPn3;
        draft.consignBizNo = formData.consignCd === '0010' ? '9999' : '';
        draft.auctPrstlsNrmlMb = mbInfo?.auctPrstlsNrmlMb; // 경매 일반회원 ID
        draft.auctPrstlsMb = mbInfo?.auctPrstlsMb; // 경매 유료회원 ID
      })
    );
  }, [formData]);

  useEffect(() => {
    // 탁송희망일(시)
    if (isEmpty(hourList)) {
      const hrList = [];
      if (hasMobile) {
        let hrIndex = 1;
        hrList.push({ value: hrIndex++, codeValue: '', id: 'hour_select', label: '선택', checked: formData.consignHh === '' ? true : false });
        for (let hour = 1; hour < 25; hour++) {
          const hr = hour < 10 ? '0' + hour.toString() : hour.toString();
          hrList.push({ value: hrIndex++, codeValue: hr, id: `hour_${hr}`, label: hr, checked: formData.consignHh === hr ? true : false });
        }
      } else {
        hrList.push({ value: '', label: '선택' });
        for (let hour = 1; hour < 25; hour++) {
          const hr = hour < 10 ? '0' + hour.toString() : hour.toString();
          hrList.push({ value: hr, label: hr });
        }
      }
      setHourList(hrList);
    }

    // 탁송희망일(분)
    if (isEmpty(minuteList)) {
      const miList = [];
      if (hasMobile) {
        let miIndex = 1;
        miList.push({ value: miIndex++, codeValue: '', id: 'minute_select', label: '선택', checked: formData.consignMm === '' ? true : false });
        miList.push({ value: miIndex++, codeValue: '00', id: 'minute_00', label: '00', checked: formData.consignMm === '' ? true : false });
        for (let minute = 0; minute < 60; minute++) {
          if (minute % 10 === 0 && minute !== 0) {
            const mi = minute < 10 ? '0' + minute.toString() : minute.toString();
            miList.push({ value: miIndex++, codeValue: mi, id: `minute_${mi}`, label: mi, checked: formData.consignMm === mi ? true : false });
          }
        }
      } else {
        miList.push({ value: '', label: '선택' });
        miList.push({ value: '00', label: '00' });
        for (let minute = 0; minute < 60; minute++) {
          if (minute % 10 === 0 && minute !== 0) {
            const mi = minute < 10 ? '0' + minute.toString() : minute.toString();
            miList.push({ value: mi, label: mi });
          }
        }
      }
      setMinuteList(miList);
    }
  }, [hourList, minuteList]);

  if (hasMobile) {
    //const [calPop, setCalPop] = useState(false);
    //const [isDate, setIsDate] = useState(moment());
    const [mbConsignYmdList, setMbConsignYmdList] = useState([]); // 탁송 희망일
    const [mbHpPnCdList, setMbHpPnCdList] = useState(mobHpPnCdList); // 휴대폰번호 코드

    useEffect(() => {
      // 모바일용 탁송희망일 코드 생성&기입력값 설정
      setMbConsignYmdList(
        consignYmdList.map((el, i) => {
          const mobConsignYmd = {
            id: `consignYmd_${i + 1}`,
            value: i + 1,
            codeValue: el.value,
            label: el.label,
            checked: el.value === formData.consignYmd ? true : false
          };
          return mobConsignYmd;
        })
      );

      // 모바일용 휴대폰번호 코드
      setMbHpPnCdList(
        hpPnCdList.map((el, i) => {
          const mobHpPnCd = {
            id: `hpPnCd_${i + 1}`,
            value: i + 1,
            codeValue: el.value,
            label: el.label,
            checked: el.value === formData.hpPn1 ? true : false
          };
          return mobHpPnCd;
        })
      );
    }, []);

    const addressOpen = (e) => {
      handleFullpagePopup(e);
    };
    const [fpAddress, setFpAddress] = useState(false);
    const handleFullpagePopup = useCallback(
      (e) => {
        e.preventDefault();
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '우편번호',
            options: ['close']
          }
        });
        setFpAddress(true);
      },
      [dispatch]
    );
    const addressCallback = useCallback(
      (e, result) => {
        e.preventDefault();
        setFormData(
          produce((draft) => {
            draft.zipcode = result.postCode;
            draft.addr1 = result.addData;
            draft.locCd = result.locCd;
            draft.ctyCd = result.ctyCd;
          })
        );
        setFpAddress(false);
        dispatch({ type: MOBILE_FULLPAGE_POPUP_CLOSE });
      },
      [fpAddress]
    );

    return (
      <AppLayout>
        {isLoading && (
          <div className="page-loading">
            <span className="dim" />
            <ClipLoader size={80} color={'#fff'} loading={isLoading} />
          </div>
        )}
        <div className="step-wrap">
          <Steps type={1} contents={['경매약관 및 주의사항', '경매장 선택', '회원정보등록', '차량정보', '탁송신청']} active={5} mode="stick" />
        </div>
        <div className="content-wrap ">
          <div className="auction-tit">
            <h4 className="tit2">출품 차량 목록</h4>
          </div>
          <div className="auction-sec mt16">
            <ul className="chk-list-wrap">
              {exhibitCarList?.length > 0 ? (
                exhibitCarList.map((lists, index) => {
                  return (
                    <>
                      <CheckBoxItem
                        id={'chk-car-' + index}
                        checked={isChecked[index]}
                        onChange={(id, name, check) => {
                          onChangeCheckbox(id, check);
                        }}
                      >
                        <div className="info">
                          <span>{lists.crNo}</span>
                          <span>{lists.ownerNm}</span>
                        </div>
                        <p className="tit4 mt8">{lists.crNm}</p>
                        <div className="price-wrap mt16">
                          <div className="price-left fl">
                            <p className="price-tp1">시작가 {nf.format(lists.starPrice / 10000)}만원</p>
                          </div>
                          <div className="price-right fr">
                            <p className="price-tit">낙찰희망가</p>
                            <p className="price-tp2">
                              {nf.format(lists.hopePrice / 10000)}
                              <span className="won">만원</span>
                            </p>
                          </div>
                        </div>
                      </CheckBoxItem>
                    </>
                  );
                })
              ) : (
                <div className="search-none">
                  <p>출품중인 차량이 없습니다.</p>
                </div>
              )}
            </ul>
            <form className="auction-form step4">
              <fieldset>
                <legend className="away">회원정보 등록</legend>
                <table summary="개인 계약자정보에 대한 내용" className="table-tp2 th-none">
                  <caption className="away">개인 계약자정보 입력</caption>
                  <tbody>
                    <tr>
                      <td>
                        <p className={formData?.consignCd === '0010' ? 'tx-tit' : 'tx-tit set-size'}>탁송 신청</p>
                        <RadioGroup dataList={consignCdRadio} defaultValue={formData?.consignCd} onChange={(e) => onChangeRadio(e, 'consignCd')} />
                      </td>
                    </tr>
                    {formData?.consignCd === '0010' && (
                      <>
                        <tr>
                          <td>
                            <p className="tx-tit">탁송 희망일</p>
                            {/* <DatePicker width="42%" onChange={(e) => onChangeDate(e)} /> */}
                            {/*}<DatePicker width="42%" defaultValue={isDate} onClick={handleCalendarPop} />{*/}
                            <MobSelectBox
                              id="consignYmd"
                              options={mbConsignYmdList}
                              width="40%"
                              onClick={(e) => {
                                onChangeSelect({ value: mbConsignYmdList[Number(e) - 1].codeValue }, 'consignYmd');
                              }}
                            />
                            <span className="bridge">
                              <MobSelectBox
                                id="consignHh"
                                options={hourList}
                                width="20%"
                                onClick={(e) => {
                                  onChangeSelect({ value: hourList[Number(e) - 1].codeValue }, 'consignHh');
                                }}
                              />
                              <em>시</em>
                            </span>
                            <span className="bridge">
                              <MobSelectBox
                                id="consignMm"
                                options={minuteList}
                                width="20%"
                                onClick={(e) => {
                                  onChangeSelect({ value: minuteList[Number(e) - 1].codeValue }, 'consignMm');
                                }}
                              />
                              <em>분</em>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">주소</p>
                            <span className="bridge2">
                              <Input type="text" id="zipcode" height={40} placeHolder="우편번호" width="73%" value={formData?.zipcode} disabled={true} />
                              <Button size="mid" background="gray60" radius={true} title="우편번호" measure={'%'} width={24.5} onClick={addressOpen} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" id="addr1" height={40} placeHolder="주소" value={formData?.addr1} disabled={true} />
                            </span>
                            <span className="bridge2">
                              <Input type="text" id="addr2" height={40} placeHolder="상세주소" value={formData?.addr2} onChange={onChangeInput} />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">탁송 인계자명</p>
                            <Input type="text" id="consignChargeNm" value={formData?.consignChargeNm} onChange={onChangeInput} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">휴대폰번호</p>
                            <span className="bridge2">
                              <MobSelectBox
                                options={mbHpPnCdList}
                                width="35%"
                                onClick={(e) => {
                                  onChangeSelect({ value: mbHpPnCdList[Number(e) - 1].codeValue }, 'hpPn1');
                                }}
                              />
                              <Input
                                type="text"
                                id="hpPnUnion"
                                height={40}
                                placeHolder="- 제외입력"
                                width="62.5%"
                                onKeyPress={inNumber}
                                onKeyUp={handleOnKeyUp}
                                placeType={4}
                                onChange={onChangeInput}
                                maxLength={9}
                                value={formData.hpPn2.length > 0 && formData.hpPn3.length === 4 ? formData.hpPn2 + '-' + formData.hpPn3 : formData.hpPn3}
                              />
                              {/*}
                              <Input
                                type="text"
                                id="hpPn2"
                                value={isEmpty(formData.hpPn2) ? '' : formData.hpPn2}
                                onKeyPress={inNumber}
                                onKeyUp={handleOnKeyUp}
                                placeType={4}
                                onChange={onChangeInput}
                                maxLength={4}
                                height={40}
                                width="30%"
                              />
                              <Input
                                type="text"
                                id="hpPn3"
                                value={isEmpty(formData.hpPn3) ? '' : formData.hpPn3}
                                onKeyPress={inNumber}
                                onKeyUp={handleOnKeyUp}
                                placeType={4}
                                onChange={onChangeInput}
                                maxLength={4}
                                height={40}
                                width="30%"
                              />
                              {*/}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">탁송업체</p>
                            <Input type="text" placeHolder="코리포스트랜스포트(주)" disabled={true} />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="tx-tit">
                              남기실 말씀<em>(선택)</em>
                            </p>
                            <Textarea id="memo" type="tp1" height={96} countLimit={50} data={formData?.memo} onChange={onChangeInput} />
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </fieldset>
            </form>
          </div>
          <Button className="fixed" size="full" background="blue80" title="출품신청" onClick={(e) => nextStep(e, '/autoAuction/autoAuctionComplete')} />
        </div>
        {/*
          <>
            <div className={calPop ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
            <MobBottomArea active={calPop} isFixButton={true} zid={102}>
              <MobCalendar date={isDate} callback={calendarCallback} />
            </MobBottomArea>
          </>
        */}
        <MobFullpagePopup active={mFullpagePopup}>{fpAddress && <FindAddress AddressEvent={addressCallback} />}</MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      {isLoading && (
        <div className="page-loading">
          <span className="dim" />
          <ClipLoader size={80} color={'#fff'} loading={isLoading} />
        </div>
      )}
      <div className="auction-top-banner">
        <div className="content-wrap">
          <h3>내 차 출품하기</h3>
          <p>공개 경쟁 입찰의 스마트옥션으로 내 차를 최고가로 판매하세요.</p>
        </div>
      </div>
      <div className="content-wrap auction-step">
        <Steps type={1} contents={['경매약관 및 주의사항', '회원정보', '차량정보', '탁송신청']} active={4} />
      </div>
      <div className="content-sec auction-sec">
        <div className="auction-consign-wrap">
          <div className="content-wrap">
            <div className="auction-tit">
              <h4>탁송신청</h4>
              <h5>출품 차량 목록</h5>
            </div>
            <table summary="출품 차량 목록" className="table-tp1 th-c td-c mt32">
              <caption className="away">출품 차량 목록</caption>
              <colgroup>
                <col width="60px" />
                <col width="*" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
                <col width="172px" />
              </colgroup>
              <thead>
                <tr>
                  <th>선택</th>
                  <th>모델명</th>
                  <th>차량번호</th>
                  <th>차주명</th>
                  <th>시작가</th>
                  <th>낙찰 희망가</th>
                </tr>
              </thead>
              <tbody>
                {exhibitCarList.length > 0 ? (
                  exhibitCarList.map((lists, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <CheckBox
                            id={'chk-car-' + index}
                            checked={isChecked[index]}
                            className="single"
                            onChange={(e) => {
                              onChangeCheckbox(e.target.id, e.target.checked);
                            }}
                          />
                        </td>
                        <td className="tl">{lists.crNm}</td>
                        <td>{lists.crNo}</td>
                        <td>{lists.ownerNm}</td>
                        <td>{nf.format(lists.starPrice / 10000)}만원</td>
                        <td>{nf.format(lists.hopePrice / 10000)}만원</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">출품중인 차량이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="content-wrap">
          <div className="auction-tit">
            <h5>차량정보 등록</h5>
          </div>
          <form className="auction-form">
            <fieldset>
              <legend className="away">회원정보 등록</legend>
              <table summary="회원정보 등록에 대한 내용" className="table-tp2">
                <caption className="away">회원정보 등록</caption>
                <colgroup>
                  <col width="12.68%" />
                  <col width="37.77%" />
                  <col width="12.68%" />
                  <col width="37.77%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>탁송 방법</th>
                    <td colSpan={formData?.consignCd === '0010' ? null : 3}>
                      <RadioGroup dataList={consignCdRadio} defaultValue={formData?.consignCd ? formData?.consignCd : '0010'} onChange={(e) => onChangeRadio(e, 'consignCd')} />
                    </td>
                    {formData?.consignCd === '0010' && (
                      <>
                        <th>탁송 희망일</th>
                        <td>
                          <span className="bridge">
                            <SelectBox
                              id="consignYmd"
                              className="items-sbox"
                              options={consignYmdList}
                              width={172}
                              height={48}
                              value={formData?.consignYmd}
                              onChange={(e) => onChangeSelect(e, 'consignYmd')}
                            />
                          </span>
                          <span className="bridge">
                            <SelectBox id="consignHh" className="items-sbox" options={hourList} width={80} height={48} value={formData?.consignHh} onChange={(e) => onChangeSelect(e, 'consignHh')} />{' '}
                            시
                          </span>
                          <span className="bridge">
                            <SelectBox id="consignMm" className="items-sbox" options={minuteList} width={80} height={48} value={formData?.consignMm} onChange={(e) => onChangeSelect(e, 'consignMm')} />{' '}
                            분
                          </span>
                        </td>
                      </>
                    )}
                  </tr>
                  {formData?.consignCd === '0010' && (
                    <>
                      <tr>
                        <th>주소</th>
                        <td colSpan="3">
                          <span className="bridge2">
                            <span className="bridge">
                              <Input type="text" placeHolder="우편번호" disabled={true} id="zipcode" width={258} value={formData?.zipcode} onChange={onChangeInput} maxLength={5} />
                            </span>
                            <Button size="mid" background="gray" title="우편번호" width={124} height={48} onClick={onSearchAddr} />
                          </span>
                          <span className="bridge2">
                            <span className="bridge">
                              <Input type="text" placeHolder="주소" disabled={true} id="addr1" width={392} value={formData?.addr1} onChange={onChangeInput} />
                            </span>
                            <span className="bridge">
                              <Input type="text" placeHolder="상세 주소" id="addr2" width={560} value={formData?.addr2} onChange={onChangeInput} />
                            </span>
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>탁송 인계자명</th>
                        <td>
                          <Input type="text" id="consignChargeNm" width={392} value={formData?.consignChargeNm} onChange={onChangeInput} />
                        </td>
                        <th>휴대폰 번호</th>
                        <td>
                          <span className="bridge">
                            <SelectBox id="hpPn1" className="items-sbox" options={hpPnCdList} width={124} height={48} value={formData?.hpPn1} onChange={(e) => onChangeSelect(e, 'hpPn1')} />
                          </span>
                          <span className="bridge">
                            <Input type="text" id="hpPn2" maxLength={4} width={124} value={formData?.hpPn2} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} />
                          </span>
                          <span className="bridge">
                            <Input type="text" id="hpPn3" maxLength={4} width={124} value={formData?.hpPn3} onKeyPress={inNumber} onKeyUp={handleOnKeyUp} placeType={4} onChange={onChangeInput} />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th>탁송 업체</th>
                        <td colSpan="3">
                          <Input type="text" placeHolder="코리포스트랜스포트(주)" disabled={true} width={392} />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          남기실 말씀<em>(선택)</em>
                        </th>
                        <td colSpan="3">
                          <Textarea id="memo" type="tp1" height={140} data={formData?.memo} onChange={onChangeInput} countLimit={200} />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <Buttons align="center" marginTop={60} className="w-line">
                <Button size="big" background="blue80" title="출품 완료" width={240} height={72} onClick={(e) => nextStep(e, '/autoAuction/autoAuctionComplete')} />
              </Buttons>
            </fieldset>
          </form>
        </div>
        <RodalPopup show={rodalShow} type={'fade'} closedHandler={closeSearchAddr} title="주소 검색" mode="normal" size="large">
          <FindAddress AddressEvent={addrEvent} target={''} />
        </RodalPopup>
      </div>
    </AppLayout>
  );
};

ConsignmentRequest.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const userId = Cookies.get('id');
  // Is not defined 현상으로 주석처리
  /*if (userId === undefined || userId === '') {
    alert('로그인이 필요합니다.');
    Router.push('/login');
  }*/
  const auctId = reduxStore.getState().autoAuction.inputInfo.auctId;
  await reduxStore.dispatch(getMbInfo(userId)); // 회원정보
  await reduxStore.dispatch(getCommonCodeList('FM017')); // 탁송 방법
  await reduxStore.dispatch(getCommonCodeList('FM005')); // 휴대폰번호 앞자리 리스트
  await reduxStore.dispatch(getExhibitCarList(auctId)); // 출품대기 차량 목록

  return { query };
};

export default withRouter(ConsignmentRequest);
