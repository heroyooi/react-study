import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import qs from 'qs';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import moment from 'moment';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import SwipeableInkTabBar from 'rc-tabs/lib/SwipeableInkTabBar';

import SelectBox from '@lib/share/items/SelectBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import RenderHelper from '@lib/share/render/helper';
import Input from '@lib/share/items/Input';
import RadioGroup from '@lib/share/items/RadioGroup';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobSelectBox from '@lib/share/items/MobSelectBox';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import { setComma } from '@src/utils/StringUtil';
import FilterTable from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/FilterTable';
import * as currentListAction from '@src/actions/mypage/dealer/auction/currentListAction';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { preventScroll } from '@src/utils/CommonUtil';
import { SystemContext } from '@src/provider/SystemProvider';
import { axiosPost, apiUrl } from '@src/utils/HttpUtils';

const pageEnum = {
  succBidList: 0,
  bidInfoList: 1,
  sellCarList: 2
  // 'claimInfo' : 2,
};

const succBidHouse = [
  { id: 'radio_succBidHouse_1', value: '', checked: true, disabled: false, label: '전체' },
  { id: 'radio_succBidHouse_2', value: '1100', checked: false, disabled: false, label: '분당' },
  { id: 'radio_succBidHouse_3', value: '2100', checked: false, disabled: false, label: '시화' },
  { id: 'radio_succBidHouse_4', value: '3100', checked: false, disabled: false, label: '양산' }
];

const bidInfoHouse = [
  { id: 'radio_bidInfoHouse_1', value: '', checked: true, disabled: false, label: '전체' },
  { id: 'radio_bidInfoHouse_2', value: '1100', checked: false, disabled: false, label: '분당' },
  { id: 'radio_bidInfoHouse_3', value: '2100', checked: false, disabled: false, label: '시화' },
  { id: 'radio_bidInfoHouse_4', value: '3100', checked: false, disabled: false, label: '양산' }
];

const sellCarHouse = [
  { id: 'radio_sellCarHouse_1', value: '', checked: true, disabled: false, label: '전체' },
  { id: 'radio_sellCarHouse_2', value: '1100', checked: false, disabled: false, label: '분당' },
  { id: 'radio_sellCarHouse_3', value: '2100', checked: false, disabled: false, label: '시화' },
  { id: 'radio_sellCarHouse_4', value: '3100', checked: false, disabled: false, label: '양산' }
];

const auctTypes = [
  { label: '전체', value: '00', index: 1 },
  { label: '경매', value: '01', index: 2 },
  { label: '후상담', value: '02', index: 3 },
  { label: '지정시간', value: '03', index: 4 }
];

const bidTypes = [
  { label: '전체', value: '00', index: 1 },
  { label: '경매', value: '01', index: 2 },
  { label: '후상담', value: '02', index: 3 },
  { label: '공매', value: '03', index: 4 }
];

const carAuctTypes = [
  { value: '', label: '전체', index: 0 },
  { value: '00', label: '경매진행', index: 1 },
  { value: '01', label: '미경매', index: 2 },
  { value: '02', label: '낙찰', index: 3 },
  { value: '03', label: '유찰', index: 4 },
  { value: '04', label: '상담접수', index: 5 },
  { value: '05', label: '상담체결', index: 6 },
  { value: '06', label: '낙찰취소', index: 7 },
  { value: '07', label: '상담취소', index: 8 }
];

const currentState = ({ params }) => {
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const [selectedParams, setSelectedParams] = useState(params);
  const { list, totalCnt } = useSelector((store) => {
    console.log('store ::::::::::::::::::::::: ', store);
    return store.currentList;
  });
  console.log('currentState -> list', list);

  const goPageWithNewParam = async (payload) => {
    console.log('goPageWithNewParam -> payload', payload);
    const newParam = {
      ...params,
      ...payload
    };
    console.log('===> qs.stringify(newParam, { indices: false })', qs.stringify(newParam, { indices: false }));
    showLoader();
    await Router.push('/mypage/dealer/autoauction/currentState?' + qs.stringify(newParam, { indices: false }));
    hideLoader();
  };

  const selectEventHandler = (opt, e) => {
    console.log('===> opt', opt);
    console.log('===> e', e);
    const { value } = opt;
    const { name } = e;

    console.log('selectEventHandler -> name', name);
    console.log('selectEventHandler -> value', value);

    setSelectedParams({
      ...selectedParams,
      [name]: value
    });
  };

  const onChangeRadio = (e, target) => {
    e.preventDefault();
    const { value } = e.target;

    console.log('onChangeRadio >>>>>>>>>', target, value);

    setSelectedParams({
      ...selectedParams,
      [target]: value
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setSelectedParams({
      ...selectedParams,
      [name]: value
    });
  };

  // Submit 시점에 호출
  const historyHandler = ({ startDt, endDt, period }) => {
    //hitory만 바꿔 줄 경우, param에서 데이트 관련된 prop만 저장
    goPageWithNewParam({
      ...selectedParams,
      startDt,
      endDt,
      period
    });
  };

  const handleAdConfirm = (item) => {
    console.log('handleAdConfirm -> handleAdConfirm ::::: item', item);
    const { CRNO, AUCTDATE, SUCCPRIC } = item;
    if (CRNO) {
      Router.push(
        '/mypage/dealer/sellcar/registerCarSearch?' +
          qs.stringify({
            crNo: CRNO,
            auctSbidCrYn:'Y',
            sbidDt:AUCTDATE,
            sbidAmt:SUCCPRIC,
          })
      );
    }
  };

  const onLinkCarInfo = (e, data) => {
    e.preventDefault();
    let linkUrl = '/mypage/myCarSellView.do';
    //let linkUrl = '/memcompany/memAuctionView.do';
    if (apiUrl.includes('https')) {
      //오토옥션주소 (운영)
      linkUrl = 'https://www.glovisaa.com' + linkUrl;
    } else {
      //오토옥션주소 (개발)
      linkUrl = 'http://dev-www.glovisaa.com' + linkUrl;
    }
    linkUrl += `?gn=${encodeURIComponent(data.GOODNOENC)}`; // goodNo
    linkUrl += `&rc=${encodeURIComponent(data.AUCTROOMCDENC)}`; //경매장코드
    linkUrl += `&atn=${encodeURIComponent(data.AUCTNOENC)}`; // 경매회차
    document.cookie = 'crossCookie=bar; SameSite=None; Secure';
    window.open(linkUrl, '_blank', 'width=1250, height=950, toolbar=no, scrollbars=yes, location=no, menubar=no');
  };

  const openOpenPop = (e, data, target) => {
    e.preventDefault();
    console.log(data);

    const apiParam = {
      rc: data.AUCTROOMCD,
      gn: data.GOODNO,
      atn: data.AUCTNO,
      page: target
    };

    axiosPost('/api/mypage/dealer/callAutoAuctionPagePopup.do', apiParam).then((data) => {
      console.log(data.data);
      if (data.status === 200) {
        const resultData = data.data.data;
        let linkUrl = resultData.popUrl;
        const specs = resultData.specs;
        const rc = resultData.rc;
        const gn = resultData.gn;
        const atn = resultData.atn;
        linkUrl += `?gn=${encodeURIComponent(gn)}`; // goodNo
        linkUrl += `&rc=${encodeURIComponent(rc)}`; //경매장코드
        linkUrl += `&atn=${encodeURIComponent(atn)}`; // 경매회차
        window.open(linkUrl, '_blank', specs);
      } else showAlert('조회실패');
    });
  };

  useEffect(() => {
    setSelectedParams(params);
  }, [params]);

  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const inNumber = useCallback((e) => {
    if (!/^[0-9\b]+$/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  const onChangeInput = useCallback((e) => {
    const { id, value } = e.target;
    setSelectedParams(
      produce((draft) => {
        draft.auctNo = value;
      })
    );
  }, []);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '경매장 이용 현황',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 76,
          color: '#fff'
        }
      });
      dispatch({
        type: MOBILE_QUICK_EXIST,
        data: {
          exist: false
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

  if (hasMobile) {
    const { succBidList, bidInfoList, sellCarList } = useSelector((store) => {
      return store.currentList;
    });

    // 모바일 검색필터 버튼정보
    const mobButtonFilters = [
      { title: '오늘', checked: false, period: 'today', type: 'day', value: 0 },
      { title: '1주일', checked: true, period: '1week', type: 'week', value: 1 },
      { title: '15일', checked: false, period: '15days', type: 'day', value: 15 },
      { title: '1개월', checked: false, period: '1month', type: 'month', value: 1 },
      { title: '3개월', checked: false, period: '3month', type: 'month', value: 3 }
    ];

    // 모바일탭별 파라메터 설정
    const mobInitParams = {
      currentPage: 1,
      recordSize: 10,
      startDt: moment()
        .subtract(1, 'week')
        .format('YYYY-MM-DD'),
      endDt: moment().format('YYYY-MM-DD'),
      period: '1week'
    };
    // 탭 입력값 임시저장
    const [tabParams, setTabParams] = useState({
      succBidList: { ...mobInitParams, pageValue: 'succBidList', auctType: '00' },
      bidInfoList: { ...mobInitParams, pageValue: 'bidInfoList', bidCd: '00' },
      sellCarList: { ...mobInitParams, pageValue: 'sellCarList', auctProg: '', auctNo: null }
    });

    // 조회 버튼을 눌렀을 때 검색 조회기간을 조회결과 화면에 표시
    const [displayPeriod, setDisplayPeriod] = useState({
      startDt: selectedParams.startDt,
      endDt: selectedParams.endDt
    });

    // 기간검색
    const [calPop1, setCalPop1] = useState(false);
    const [calPop2, setCalPop2] = useState(false);
    const [isDate1, setIsDate1] = useState(moment().subtract(1, 'week'));
    const [isDate2, setIsDate2] = useState(moment());
    const [mobPeriod, setMobPeriod] = useState('1week');

    // 구분 (모바일용 MobSelectBox 코드표 생성)
    const [mobAuctTypes, setMobAuctTypes] = useState(
      auctTypes.map((el) => {
        return { id: 'm_auct_types_' + el.index, value: el.index, codeValue: el.value, label: el.label, checked: el.index === 1 ? true : false };
      })
    );
    const [mobBidTypes, setMobBidTypes] = useState(
      bidTypes.map((el) => {
        return { id: 'm_bid_types_' + el.index, value: el.index, codeValue: el.value, label: el.label, checked: el.index === 1 ? true : false };
      })
    );
    const [mobCarAuctTypes, setMobCarAuctTypes] = useState(
      carAuctTypes.map((el) => {
        return { id: 'm_car_auct_types_' + el.index, value: el.index, codeValue: el.value, label: el.label, checked: el.index === 1 ? true : false };
      })
    );

    // 기간선택 이벤트 처리
    const handleBtnFilterClick1 = useCallback((e, target) => {
      e.preventDefault();
      // Datepicker 라벨 설정
      setIsDate1(moment().subtract(target.value, target.type));
      setIsDate2(moment());

      // Datepicker 팝업 설정
      setMobPeriod(target.period);
      setSelectedParams(
        produce((draft) => {
          draft.period = target.period;
          draft.startDt = moment()
            .subtract(target.value, target.type)
            .format('YYYY-MM-DD');
          draft.endDt = moment().format('YYYY-MM-DD');
        })
      );
    }, []);

    const [tabKey, setTabKey] = useState(1);
    const onSearch = useCallback((tabName, tabParams) => {
      switch (tabName) {
        case 'succBidList':
          dispatch(currentListAction.getAuctionSuccBidList(tabParams ? tabParams : selectedParams));
          break;
        case 'bidInfoList':
          dispatch(currentListAction.getAuctionBidInfoList(tabParams ? tabParams : selectedParams));
          break;
        case 'sellCarList':
          dispatch(currentListAction.getAuctionSellCarList(tabParams ? tabParams : selectedParams));
          break;
      }

      // 조회결과의 시작일/종료일 표시
      setDisplayPeriod(
        produce((draft) => {
          draft.startDt = (tabParams ? tabParams : selectedParams).startDt;
          draft.endDt = (tabParams ? tabParams : selectedParams).endDt;
        })
      );
    });

    // 탭선택 콜백함수
    const tabCallback = useCallback(
      (key) => {
        // 기존탭의 입력값을 변수에 임시저장
        const newTabParams = { ...tabParams };
        newTabParams[selectedParams.pageValue] = { ...selectedParams };
        setTabParams(newTabParams);

        // 탭 선택에 따른 UI적용
        let activeTabName = '';
        if (+key < 2) {
          setTabKey('first');
          activeTabName = 'succBidList';
        } else if (+key >= 2 && +key < 3) {
          setTabKey(key);
          activeTabName = 'bidInfoList';
        } else {
          setTabKey('last');
          activeTabName = 'sellCarList';
        }
        // 이용현황 조회 (낙찰정보, 입찰정보, 내차팔기 현황)
        onSearch(activeTabName, newTabParams[activeTabName]);

        // 검색조건 날짜 팝업 설정
        setIsDate1(moment(newTabParams[activeTabName].startDt), 'YYYY-MM-DD');
        setIsDate2(moment(newTabParams[activeTabName].endDt), 'YYYY-MM-DD');
        setMobPeriod(newTabParams[activeTabName].period);

        // 조회용 검색파라메터 등록/변경
        setSelectedParams(
          produce(() => {
            return newTabParams[activeTabName];
          })
        );
      },
      [onSearch, selectedParams, tabParams]
    );

    // 구분선택 콜백함수
    const selectMobEventHandler = useCallback(
      (e, name) => {
        const mobPageTypes = {
          // 낙찰정보 구분
          auctType: {
            codeList: mobAuctTypes,
            setCodeList: setMobAuctTypes
          },
          // 입찰정보 구분
          bidType: {
            codeList: mobBidTypes,
            setCodeList: setMobBidTypes
          },
          // 내차 팔기현황 구분
          auctProg: {
            codeList: mobCarAuctTypes,
            setCodeList: setMobCarAuctTypes
          }
        };

        // 화면에서 선택한 구분값
        const selected = mobPageTypes[name].codeList.find((el) => {
          return el.value === Number(e.target.value);
        });

        // 선택한 내용을 반영한 구분코드 리스트 재생성
        const newMobCodeList = mobPageTypes[name].codeList.map((el) => {
          el.checked = el.value === Number(e.target.value);
          return el;
        });

        // 재생성한 구분코드 리스트를 화면에 반영 (State반영)
        mobPageTypes[name].setCodeList(newMobCodeList);

        // 선택한 구분코드를 Request 파라메터로 설정
        setSelectedParams({
          ...selectedParams,
          [name]: selected.codeValue
        });
      },
      [mobAuctTypes, mobBidTypes, mobCarAuctTypes, selectedParams]
    );

    const handleCalendarPop1 = useCallback((e) => {
      e.preventDefault();
      setCalPop1(true);
      preventScroll(true);
    }, []);

    const handleCalendarPop2 = useCallback((e) => {
      e.preventDefault();
      setCalPop2(true);
      preventScroll(true);
    }, []);

    const calendarCallbackStartDt = useCallback((e, date) => {
      e.preventDefault();
      setIsDate1(date);
      setCalPop1(false);
      preventScroll(false);
      setSelectedParams(
        produce((draft) => {
          draft.startDt = date.format('YYYY-MM-DD');
        })
      );
    }, []);

    const calendarCallbackEndDt = useCallback((e, date) => {
      e.preventDefault();
      setIsDate2(date);
      setCalPop2(false);
      preventScroll(false);
      setSelectedParams(
        produce((draft) => {
          draft.endDt = date.format('YYYY-MM-DD');
        })
      );
    }, []);

    const calendarClose = useCallback((e) => {
      setCalPop1(false);
      setCalPop2(false);
    }, []);

    // 최초 1회 낙찰정보 기본 조회
    useEffect(() => {
      if (isEmpty(list)) {
        onSearch('succBidList');
      }
    }, []);

    return (
      <AppLayout>
        <div className="auction-info-sec">
          <div className={`tabmenu-swipe active-${tabKey}`}>
            <Tabs renderTabBar={() => <SwipeableInkTabBar pageSize={3} />} renderTabContent={() => <TabContent />} defaultActiveKey="1" onChange={tabCallback}>
              <TabPane tab="낙찰정보 조회" data-extra="tabpane" key="1">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                      <li>&#8251; 클레임 신청 현황은 PC에서 확인가능합니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle>
                        <p className="tit2">낙찰내역</p>
                        <span>상세조회</span>
                      </MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매구분</p>
                          <MobSelectBox
                            placeHolder="전체"
                            onChange={(e) => {
                              selectMobEventHandler(e, 'auctType');
                            }}
                            options={mobAuctTypes}
                            width="70%"
                          />
                        </div>
                        <MobButtonFilter checkList={mobButtonFilters} onClick={handleBtnFilterClick1} />
                        <div className="mt8">
                          <DatePicker defaultValue={isDate1} name="isDate1" width="46%" onClick={handleCalendarPop1} />
                          <em className="from">~</em>
                          <DatePicker defaultValue={isDate2} name="isDate2" width="46%" onClick={handleCalendarPop2} />
                        </div>
                        <Button
                          size="full"
                          background="blue80"
                          radius={true}
                          title="조회"
                          height={40}
                          fontSize={14}
                          fontWeight={500}
                          marginTop={16}
                          onClick={(e) => {
                            e.preventDefault();
                            onSearch('succBidList');
                          }}
                        />
                      </MenuCont>
                    </MenuItem>
                    <li>
                      <div className="float-wrap">
                        <p>
                          {displayPeriod.startDt} ~ {displayPeriod.endDt}
                        </p>
                        <p>
                          총 <span className="tx-blue80">{succBidList?.length}</span>건
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="list-wrap content-wrap content-border">
                  <div className="goods-list admin-list tp6 mt8">
                    {succBidList?.length ? (
                      <ul>
                        {succBidList.map((item, i) => {
                          return (
                            <li key={i}>
                              <div className="summary">
                                <div className="float-wrap btn-xs">
                                  <Button
                                    size="sml"
                                    line="gray"
                                    color="gray"
                                    radius={true}
                                    title={auctTypes.find((type) => type.value === item.AUCTTYPE).label}
                                    width={35}
                                    height={24}
                                    fontSize={10}
                                    marginRight={8}
                                  />
                                  <p className="fl fs12 tx-gray">
                                    {item.AUCTNO}회({item.AUCTDATE}) {item.EXHINO}번
                                  </p>
                                </div>
                                <h5 className="subject tp2">{item.CRNM}</h5>
                                <div className="info-wrap mt8">
                                  <div className="info tx-black">
                                    <span>{setComma(item.SUCCPRIC)}원 낙찰 </span>
                                    <span>수수료 {setComma(item.EXTRAFEE)}원</span>
                                    <span>탁송료 {setComma(item.DELIFEE)}원</span>
                                  </div>
                                </div>
                                {/*}<p className="tit5 tx-n tx-gray mt5">탁송신청주소 : 경기도 수원시 권선구 평동</p>{*/}
                                <div className="price-wrap mt20">
                                  <div className="fl">
                                    <p className="price-tp9 fs12 mt5">
                                      {item.SETTNOYN === 'Y' ? '결제완료' : '결제대기'} | {item.CURSTEP}
                                    </p>
                                  </div>
                                  <div className="fr">
                                    <p className="price-tp9">
                                      {setComma(item.PAYPRIC)}
                                      <span className="won tx-black">원</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      /* 목록 내용 없을때 */
                      <div className="search-none pd0" style={{ height: '176px' }}>
                        <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>

              <TabPane tab="입찰정보 조회" data-extra="tabpane" key="2">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                      <li>&#8251; 클레임 신청 현황은 PC에서 확인가능합니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle>
                        <p className="tit2">입찰내역</p>
                        <span>상세조회</span>
                      </MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">입찰구분</p>
                          <MobSelectBox
                            placeHolder="전체"
                            onChange={(e) => {
                              selectMobEventHandler(e, 'bidType');
                            }}
                            options={mobBidTypes}
                            width="70%"
                          />
                        </div>
                        <MobButtonFilter checkList={mobButtonFilters} onClick={handleBtnFilterClick1} />
                        <div className="mt8">
                          <DatePicker defaultValue={isDate1} width="46%" onClick={handleCalendarPop1} />
                          <em className="from">~</em>
                          <DatePicker defaultValue={isDate2} width="46%" onClick={handleCalendarPop2} />
                        </div>
                        <Button
                          size="full"
                          background="blue80"
                          radius={true}
                          title="조회"
                          height={40}
                          fontSize={14}
                          fontWeight={500}
                          marginTop={16}
                          onClick={(e) => {
                            e.preventDefault();
                            onSearch('bidInfoList');
                          }}
                        />
                      </MenuCont>
                    </MenuItem>
                    <li>
                      <div className="float-wrap">
                        <p>
                          {displayPeriod.startDt} ~ {displayPeriod.endDt}
                        </p>
                        <p>
                          총 <span className="tx-blue80">{bidInfoList?.length}</span>건
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="list-wrap content-wrap content-border">
                  <div className="goods-list admin-list tp6 mt8">
                    {bidInfoList?.length ? (
                      <ul>
                        {bidInfoList.map((item, i) => {
                          return (
                            <li key={i}>
                              <div className="summary">
                                <div className="float-wrap btn-xs">
                                  <Button size="sml" line="gray" color="gray" radius={true} title={item.BIDNM} width={44} height={24} fontSize={10} marginRight={8} />
                                  <p className="fl fs12 tx-gray">출품번호 {item.EXHINO}</p>
                                </div>
                                <h5 className="subject tp2">{item.CRNM} </h5>
                                <div className="price-wrap mt16">
                                  <div className="fl">
                                    <p className="price-tp9 fs12 mt5 tx-gray">{item.AUCTDATE}</p>
                                  </div>
                                  <div className="fr">
                                    <p className="price-tp9">
                                      {setComma(item?.BIDPRIC)}
                                      <span className="won tx-black">원</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      /* 리스트 없을때 */
                      <div className="search-none pd0" style={{ height: '176px' }}>
                        <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>

              <TabPane tab="내 차 팔기 현황" data-extra="tabpane" key="3">
                <div className="content-wrap">
                  <div className="essential-point tp2 fs12 mt20 pd0">
                    <ul>
                      <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                      <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
                      <li>&#8251; 클레임 신청 현황은 PC에서 확인가능합니다.</li>
                    </ul>
                  </div>
                  <ul className="m-toggle-list search mt16 pd0">
                    <MenuItem>
                      <MenuTitle>
                        <p className="tit2">나의 출품내역</p>
                        <span>상세조회</span>
                      </MenuTitle>
                      <MenuCont>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매구분</p>
                          <MobSelectBox
                            placeHolder="전체"
                            onChange={(e) => {
                              selectMobEventHandler(e, 'auctProg');
                            }}
                            options={mobCarAuctTypes}
                            width="70%"
                          />
                        </div>
                        <div className="float-wrap mb12">
                          <p className="movie-link-wrap">경매회차</p>
                          <Input type="text" id="m-member-id2" width={'70%'} height={40} onKeyPress={inNumber} onChange={onChangeInput} />
                        </div>
                        <MobButtonFilter checkList={mobButtonFilters} onClick={handleBtnFilterClick1} />
                        <div className="mt8">
                          <DatePicker defaultValue={isDate1} width="46%" onClick={handleCalendarPop1} />
                          <em className="from">~</em>
                          <DatePicker defaultValue={isDate2} width="46%" onClick={handleCalendarPop2} />
                        </div>
                        <Button
                          size="full"
                          background="blue80"
                          radius={true}
                          title="조회"
                          height={40}
                          fontSize={14}
                          fontWeight={500}
                          marginTop={16}
                          onClick={(e) => {
                            e.preventDefault();
                            onSearch('sellCarList');
                          }}
                        />
                      </MenuCont>
                    </MenuItem>
                    <li>
                      <div className="float-wrap">
                        <p>
                          {displayPeriod.startDt} ~ {displayPeriod.endDt}
                        </p>
                        <p>
                          총 <span className="tx-blue80">{sellCarList?.length}</span>건
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="list-wrap content-wrap content-border">
                  <div className="goods-list admin-list tp6 mt8">
                    {sellCarList?.length ? (
                      <ul>
                        {sellCarList.map((item, i) => {
                          return (
                            <li key={i}>
                              <div className="summary">
                                <div className="float-wrap btn-xs">
                                  <p className="fl fs12 tx-gray">
                                    {item.AUCTNO}회({item.AUCTDATE}) {item.EXHINO}번 {item.EVALPOIN2}/{item.EVALPOIN}
                                  </p>
                                  <p className="fs12 tx-blue80">{item.AUCTPROG}</p>
                                </div>
                                <h5 className="subject tp2">{item.CRNM}</h5>
                                <div className="info-wrap mt16">
                                  <div className="info tx-b">
                                    <span>시작가: {setComma(item?.STARPRIC)}원</span>
                                    <span>희망가: {setComma(item?.HOPEPRIC)}원</span>
                                    <span>탁송상태: {item.CNSGSTAT}</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      /* 리스트 없을때 */
                      <div className="search-none pd0" style={{ height: '176px' }}>
                        <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        {
          <>
            <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose}></div>
            {/* 낙찰정보 조회 */}
            <MobBottomArea active={calPop1 && selectedParams.pageValue === 'succBidList'} isFixButton={true} zid={102}>
              {mobPeriod === 'today' && <MobCalendar date={moment().format('YYYY-MM-DD')} callback={calendarCallbackStartDt} />}
              {mobPeriod === '1week' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'week')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '15days' && (
                <MobCalendar
                  date={moment()
                    .subtract(15, 'day')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '1month' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '3month' && (
                <MobCalendar
                  date={moment()
                    .subtract(3, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
            </MobBottomArea>
            <MobBottomArea active={calPop2 && selectedParams.pageValue === 'succBidList'} isFixButton={true} zid={102}>
              <MobCalendar date={moment()} callback={calendarCallbackEndDt} />
            </MobBottomArea>

            {/* 입찰정보 조회 */}
            <MobBottomArea active={calPop1 && selectedParams.pageValue === 'bidInfoList'} isFixButton={true} zid={102}>
              {mobPeriod === 'today' && <MobCalendar date={moment().format('YYYY-MM-DD')} callback={calendarCallbackStartDt} />}
              {mobPeriod === '1week' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'week')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '15days' && (
                <MobCalendar
                  date={moment()
                    .subtract(15, 'day')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '1month' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '3month' && (
                <MobCalendar
                  date={moment()
                    .subtract(3, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
            </MobBottomArea>
            <MobBottomArea active={calPop2 && selectedParams.pageValue === 'bidInfoList'} isFixButton={true} zid={102}>
              <MobCalendar date={moment()} callback={calendarCallbackEndDt} />
            </MobBottomArea>

            {/* 내 차 팔기 현황 */}
            <MobBottomArea active={calPop1 && selectedParams.pageValue === 'sellCarList'} isFixButton={true} zid={102}>
              {mobPeriod === 'today' && <MobCalendar date={moment().format('YYYY-MM-DD')} callback={calendarCallbackStartDt} />}
              {mobPeriod === '1week' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'week')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '15days' && (
                <MobCalendar
                  date={moment()
                    .subtract(15, 'day')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '1month' && (
                <MobCalendar
                  date={moment()
                    .subtract(1, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
              {mobPeriod === '3month' && (
                <MobCalendar
                  date={moment()
                    .subtract(3, 'month')
                    .format('YYYY-MM-DD')}
                  callback={calendarCallbackStartDt}
                />
              )}
            </MobBottomArea>
            <MobBottomArea active={calPop2 && selectedParams.pageValue === 'sellCarList'} isFixButton={true} zid={102}>
              <MobCalendar date={moment()} callback={calendarCallbackEndDt} />
            </MobBottomArea>
          </>
        }
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap auction-info-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="tabmenu tp1">
            <ul className="ui-tab col-2">
              <li className="tabTitle1">
                <Link href="/mypage/dealer/autoauction/memberGuide">
                  <a>경매회원안내</a>
                </Link>
              </li>
              <li className="on tabTitle2">
                <Link href="/mypage/dealer/autoauction/currentState">
                  <a>경매장 이용 현황</a>
                </Link>
              </li>
            </ul>

            <TabMenu
              type="type6"
              className="mt64"
              defaultTab={pageEnum[params?.pageValue]}
              mount={false}
              tabLink={[
                { index: 0, url: '/mypage/dealer/autoauction/currentState?pageValue=succBidList' },
                { index: 1, url: '/mypage/dealer/autoauction/currentState?pageValue=bidInfoList' },
                { index: 2, url: '/mypage/dealer/autoauction/currentState?pageValue=sellCarList' }
                // { index: 3, url: '/mypage/dealer/autoauction/currentState?pageValue=claimInfo' },
              ]}
            >
              <TabCont tabTitle="낙찰정보 조회" id="tab6-1" index={0} className="">
                <FilterTable params={params} limitationYear={10} onSubmit={historyHandler}>
                  <tr>
                    <th>경매장</th>
                    <td>
                      <RadioGroup
                        className="items-sbox"
                        dataList={succBidHouse}
                        defaultValue={selectedParams?.succBidAuctId ? selectedParams?.succBidAuctId : ''}
                        onChange={(e) => onChangeRadio(e, 'succBidAuctId')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>구분</th>
                    <td>
                      <SelectBox
                        id="div-0"
                        className="items-sbox"
                        options={auctTypes}
                        width={188}
                        placeHolder="전체"
                        onChange={selectEventHandler}
                        name="auctType"
                        hasSelectedItemValue={true}
                        value={selectedParams?.auctType}
                        selectedItemValue={selectedParams?.auctType}
                      />
                    </td>
                  </tr>
                </FilterTable>

                <p className="tx-exp-tp5 mt40">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>

                <div className="admin-list tp7 auto mt10">
                  <table className="table-tp1 th-c td-c dashed" summary="스마트옥션 출품내역에 대한 내용">
                    <caption className="away">스마트옥션 출품내역</caption>
                    <colgroup>
                      <col width="12%" />
                      <col width="12%" />
                      <col width="*" />
                      <col width="18%" />
                      <col width="14%" />
                      <col width="8%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>경매일</th>
                        <th>출품번호</th>
                        <th>차량정보</th>
                        <th>입금금액</th>
                        <th>결제현황</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.length ? (
                        list.map((item, i) => (
                          <>
                            <tr key={i}>
                              <td rowSpan="2">
                                {item?.AUCTNO}회<br />
                                {item?.AUCTDATE}
                              </td>
                              <td>{item?.EXHINO}</td>
                              <td className="tx-l">
                                <span className="h5-tit">{item?.CRNM}</span>
                                <br />
                                <span className="tx-lg">
                                  {item?.FRMYYYY} | {item?.MISSNM} | {item?.FUEL} | {setComma(item?.DSPL)}cc | {item?.CRCLRNM}
                                </span>
                              </td>
                              <td>
                                <strong className="tx-blue80 h5-tit">{setComma(item?.PAYPRIC)}</strong>원
                              </td>
                              <td>{item?.SETTNOYN === 'Y' ? '결제완료' : '결제대기'}</td>
                              <td>
                                {
                                  <Button
                                    size="small"
                                    radius="true"
                                    background={
                                      item?.REGIAVAILYN === 'Y' ? "blue80" : "gray"
                                    }
                                    title={
                                      item?.REGIAVAILYN === 'Y' ? "광고등록" : '등록완료'
                                    }
                                    width={64}
                                    height={24}
                                    buttonMarkup={true}
                                    disabled={
                                      item?.SETTNOYN !== 'Y' || item?.OUTYN !== 'Y' || item?.REGIAVAILYN !== 'Y'
                                    }
                                    onClick={() => handleAdConfirm(item)}
                                  />
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>{auctTypes.find((type) => type?.value === item?.AUCTTYPE)?.label}</td>
                              <td colSpan="2" className="tx-l tx-disabled">
                                낙찰금액: <span className="tx-blue80">{setComma(item?.SUCCPRIC)}</span>원 ㅣ 수수료: <span className="tx-blue80">{setComma(item?.EXTRAFEE)}</span>원 ㅣ 탁송료:{' '}
                                <span className="tx-blue80">{setComma(item?.DELIFEE)}</span>원
                              </td>
                              <td>{item?.CURSTEP}</td>
                              <td>&nbsp;</td>
                            </tr>
                          </>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="tx-disabled">
                            조회된 낙찰정보가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabCont>
              <TabCont tabTitle="입찰정보 조회" id="tab6-2" index={1}>
                <FilterTable params={params} limitationYear={10} onSubmit={historyHandler}>
                  <tr>
                    <th>경매장</th>
                    <td>
                      <RadioGroup
                        className="items-sbox"
                        dataList={bidInfoHouse}
                        defaultValue={selectedParams?.bidInfoAuctId ? selectedParams?.bidInfoAuctId : ''}
                        onChange={(e) => onChangeRadio(e, 'bidInfoAuctId')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>구분</th>
                    <td>
                      <SelectBox
                        id="div-0"
                        className="items-sbox"
                        options={bidTypes}
                        width={188}
                        placeHolder="전체"
                        onChange={selectEventHandler}
                        name="bidCd"
                        hasSelectedItemValue={true}
                        value={selectedParams?.bidCd}
                        selectedItemValue={selectedParams?.bidCd}
                      />
                    </td>
                  </tr>
                </FilterTable>
                <p className="tx-exp-tp5 mt40">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>

                <div className="admin-list tp7 auto mt10">
                  <table className="table-tp1 th-c td-c" summary="오토옥션 출품내역에 대한 내용">
                    <caption className="away">오토옥션 출품내역</caption>
                    <colgroup>
                      <col width="10%" />
                      <col width="12%" />
                      <col width="*" />
                      <col width="16%" />
                      <col width="17%" />
                      <col width="10%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>경매일</th>
                        <th>출품번호</th>
                        <th>차량정보</th>
                        <th>신청인</th>
                        <th>신청금액</th>
                        <th>가격변경</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.length ? (
                        list.map((item, i) => (
                          <tr key={i}>
                            <td>
                              {item?.AUCTNO}회<br />
                              {item?.AUCTDATE}
                            </td>
                            <td>{item?.EXHINO}</td>
                            <td className="tx-l">
                              <span className="h5-tit">{item?.CRNM}</span>
                              <br />
                              <span className="tx-lg">
                                {item?.FRMYYYY} | {item?.MISSNM} | {item?.FUEL} | {setComma(item?.DSPL)}cc | {item?.CRCLRNM}
                              </span>
                            </td>
                            <td>
                              {item?.NM}
                              <br />
                              {item?.HPNO}
                            </td>
                            <td>
                              <strong className="tx-blue80 h5-tit">{setComma(item?.BIDPRIC)}</strong>원
                            </td>
                            <td>{item?.BIDYN1 === 'true' && item?.BIDYN2 === 'true' ? '가능' : '불가능'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="tx-disabled">
                            조회된 입찰정보가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabCont>
              <TabCont tabTitle="내 차 팔기 현황" id="tab6-3" index={2}>
                <FilterTable params={params} limitationYear={10} onSubmit={historyHandler} cols={['74px', '230px', '74px', '*']}>
                  <tr>
                    <th>경매장</th>
                    <td colSpan="3">
                      <RadioGroup
                        className="items-sbox"
                        dataList={sellCarHouse}
                        defaultValue={selectedParams?.sellCarAuctId ? selectedParams?.sellCarAuctId : ''}
                        onChange={(e) => onChangeRadio(e, 'sellCarAuctId')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>구분</th>
                    <td>
                      <SelectBox
                        id="div-0"
                        className="items-sbox"
                        options={carAuctTypes}
                        width={188}
                        placeHolder="전체"
                        onChange={selectEventHandler}
                        name="auctProg"
                        hasSelectedItemValue={true}
                        value={selectedParams?.auctProg}
                        selectedItemValue={selectedParams?.auctProg}
                      />
                    </td>
                    <th>회차</th>
                    <td>
                      <Input type="number" value={selectedParams?.auctNo} name="auctNo" placeHolder="회차" id="m-agency-name" height={40} onChange={handleChange} width={100} />
                    </td>
                  </tr>
                </FilterTable>
                <p className="tx-exp-tp5 mt40">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>
                <div className="admin-list tp7 auto mt10">
                  <table className="table-tp1 th-c td-c dashed" summary="오토옥션 출품내역에 대한 내용">
                    <caption className="away">오토옥션 출품내역</caption>
                    <colgroup>
                      <col width="13%" />
                      <col width="12%" />
                      <col width="*" />
                      <col width="13%" />
                      <col width="13%" />
                      <col width="13%" />
                      <col width="13%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>경매일</th>
                        <th>출품번호</th>
                        <th>차량정보</th>
                        <th>평가</th>
                        <th>진행상태</th>
                        <th>탁송</th>
                        <th>다운로드</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list?.length ? (
                        list.map((item, i) => (
                          <>
                            <tr key={i}>
                              <td rowSpan="2">
                                {item?.AUCTNO}회<br />
                                {item?.AUCTDATE}
                              </td>
                              <td>{item?.EXHINO}</td>
                              <td className="tx-l">
                                {item?.EXHINO ? (
                                  <div onClick={(e) => onLinkCarInfo(e, item)} style={{ cursor: 'pointer' }}>
                                    <span className="h5-tit">{item?.CRNM}</span>
                                    <br />
                                    <span className="tx-lg">
                                      {item?.FRMYYYY} | {item?.MISSNM} | {item?.FUEL} | {setComma(item?.DSPL)}cc | {item?.CRCLRNM}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <span className="h5-tit">{item?.CRNM}</span>
                                    <br />
                                    <span className="tx-lg">
                                      {item?.FRMYYYY} | {item?.MISSNM} | {item?.FUEL} | {setComma(item?.DSPL)}cc | {item?.CRCLRNM}
                                    </span>
                                  </>
                                )}
                              </td>
                              <td onClick={(e) => openOpenPop(e, item, 'performancePop')} style={{ cursor: 'pointer' }}>
                                {/* {item?.EVALPOIN2}/{item?.EVALPOIN} */}
                                {item?.EVALPOIN}
                              </td>
                              <td>{item?.AUCTPROG}</td>
                              <td>{item?.CNSGSTAT}</td>
                              <td>
                                {item?.AUCTPROGCD !== '02' ? (
                                  <Button size="sml" background="blue80" title="출품확인서" width={90} height={30} onClick={(e) => openOpenPop(e, item, 'entryPop')} />
                                ) : (
                                  <>
                                    <Button size="sml" background="blue80" title="출품확인서" width={90} height={30} onClick={(e) => openOpenPop(e, item, 'entryPop')} />
                                    <br />
                                    <br />
                                    <Button size="sml" background="blue80" title="낙찰확인서" width={90} height={30} onClick={(e) => openOpenPop(e, item, 'bidCfrmPop')} />
                                  </>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td>&nbsp;</td>
                              <td colSpan="5" className="tx-l tx-disabled">
                                시작가: <span className="tx-blue80">{setComma(item?.STARPRIC)}</span>원 ㅣ 희망가: <span className="tx-blue80">{setComma(item?.HOPEPRIC)}</span>원
                              </td>
                            </tr>
                          </>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="tx-disabled">
                            조회된 내 차 팔기 정보가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabCont>
              {/* <TabCont tabTitle="클레임 신청 현황" id="tab6-4" index={3}>
                Content4
              </TabCont> */}
            </TabMenu>
            <PageNavigator
              recordCount={totalCnt}
              recordSize={parseInt(params?.recordSize)}
              currentPage={parseInt(params?.currentPage)}
              className="mt32"
              changed={(e, currentPage) =>
                goPageWithNewParam({
                  currentPage
                })
              }
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

currentState.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query, isServer, reduxStore } = helper;
  console.log('currentState.getInitialProps -> helper', helper);
  console.log('currentState.getInitialProps -> query', query);
  const { hasMobile } = reduxStore.getState().common;

  const today = moment(new Date()).format('YYYY-MM-DD');
  const ago = moment()
    .subtract(1, 'month')
    .format('YYYY-MM-DD');

  // pageValue
  // -- succBidList -- 낙찰정보
  // -- bidInfoList -- 입찰정보
  // -- sellCarList -- 팔기현황

  let {
    pageValue = 'succBidList',
    currentPage = 1,
    recordSize = 10,
    auctType = '00',
    startDt = ago,
    endDt = today,
    period = '1month',
    bidCd = '00',
    auctProg = '',
    auctNo,
    succBidAuctId = '',
    bidInfoAuctId = '',
    sellCarAuctId = ''
  } = query;

  let usingQuery = {
    pageValue,
    currentPage,
    recordSize,
    startDt,
    endDt,
    period,
    succBidAuctId,
    bidInfoAuctId,
    sellCarAuctId
  };

  if (pageValue === 'succBidList') {
    console.log('낙찰정보 조회');
    usingQuery.auctType = auctType;
    usingQuery.succBidAuctId = succBidAuctId;
    await helper.dispatch(currentListAction.getAuctionSuccBidList(usingQuery));
  } else if (pageValue === 'bidInfoList') {
    console.log('입찰정보 조회');
    usingQuery.bidCd = bidCd;
    usingQuery.bidInfoAuctId = bidInfoAuctId;
    await helper.dispatch(currentListAction.getAuctionBidInfoList(usingQuery));
  } else if (pageValue === 'sellCarList') {
    console.log('내 차 팔기 현황');
    usingQuery.auctProg = auctProg;
    usingQuery.auctNo = auctNo;
    usingQuery.sellCarAuctId = sellCarAuctId;
    await helper.dispatch(currentListAction.getAuctionSellCarList(usingQuery));
  }
  // else if(pageValue === 'claimInfo'){
  //   console.log('클레임 신청 현황')
  // }

  return {
    params: usingQuery
  };
};

export default currentState;
