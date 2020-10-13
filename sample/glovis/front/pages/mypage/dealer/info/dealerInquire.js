/**
 * 설명 : 나의 문의내역
 * @fileoverview 마이페이지(일반)>회원정보 관리>나의 문의내역
 * @requires [inquireAction,inquireView]
 * @author 박진하
 * @author D191364
 */
import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { produce } from 'immer';

import moment from 'moment'
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import { getInquireList } from '@src/actions/mypage/personal/info/inquireAction';

//mobile
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Buttons from '@lib/share/items/Buttons';

import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * 설명 : 나의 문의내역을 조회하고 고객센터/문의내역 상세 페이지를 호출한다.
 * @param {state.personalInquire.inquireList} 나의 문의내역
 * @returns {Inquire} 나의 문의내역
 */
const DealerInquire = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '나의 문의내역',
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

  const { inquireList, totalCnt } = useSelector((state) => ({
    inquireList: state.personalInquire.inquireList,
    totalCnt: state.personalInquire.totalCnt
  }));

  const checkedbtnArray = [
    { clicked: false, line: 'gray', color: 'black', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '3개월', type: '3m', unit: 'months', value: 3 },
    { clicked: false, line: 'gray', color: 'black', title: '6개월', type: '6m', unit: 'months', value: 6 },
    { clicked: false, line: 'gray', color: 'black', title: '1년', type: '12m', unit: 'months', value: 12 }
  ];

  const [inputs, setInputs] = useState({
    searchText: '',
    fromDate: moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    pageUnit: 30,
    pageNo: 1
  });
  const { searchText, fromDate, endDate, pageUnit, pageNo } = inputs;

  const [clickedBtnIdx, setClickedBtnIdx] = useState(1);
  const [checkedBtns, setCheckedBtns] = useState(checkedbtnArray);

  const clickDateRangeBtnHandler = (e, val, idx) => {
    e.preventDefault();
    setCheckedBtns(
      produce((draft) => {
        draft[clickedBtnIdx].clicked = false;
        draft[clickedBtnIdx].line = 'gray';
        draft[clickedBtnIdx].color = 'gray';
        draft[idx].clicked = true;
        draft[idx].line = 'blue80';
        draft[idx].color = 'blue80';
        setClickedBtnIdx(idx);
      })
    );
    changeDatePickersValue(checkedBtns[idx]);
  };

  const changeDatePickersValue = (value) => {
    onChangeDate(moment().subtract(value.value, 'month'), 'fromDate');
    onChangeDate(moment(), 'endDate');
  };

  //datepicker
  const onChangeDate = (e, target) => {
    onChange({ [target]: e.format('YYYY-MM-DD') });
  };

  const onChange = (e) => {
    if (e.target) {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setInputs(
        produce((draft) => {
          draft[name] = value;
        })
      );
    } else {
      for (const [key, value] of Object.entries(e)) {
        setInputs(
          produce((draft) => {
            draft[key] = value;
          })
        );
      }
    }
  };

  //paging
  const onHandlePageChange = useCallback((e, type) => {
    const schObj = {
      ...inputs,
      pageNo: type
    };
    dispatch(getInquireList(schObj));
  });

  //검색
  const onClickSearch = () => {
    dispatch(getInquireList(inputs));
  };

  //상세
  const onClickHandler = useCallback((e, url, seqNo) => {
    e.preventDefault();
    Router.push(url + '?seqNo=' + seqNo, url);
  }, []);

  /*
  useEffect(() => {
    if (isEmpty(inquireList)) {
      //getList()
      console.log("fromDate:", fromDate)
      dispatch(getInquireList({fromDate:fromDate,endDate:endDate }));
    }
  }, []);
*/
  useEffect(() => {
    dispatch(
      getInquireList({
        ...inputs,
        fromDate: moment()
          .subtract(1, 'month')
          .format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      })
    );
    setCheckedBtns(
      produce((draft) => {
        draft[0].clicked = true;
        draft[0].line = 'blue80';
        draft[0].color = 'blue80';
        setClickedBtnIdx(0);
      })
    );
  }, []);

  //mobile
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '나의 문의내역',
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
    }, []);

    // 모바일 조회기간(개월) 선택에 따른 이벤트 처리
    const [mobDatePickerFlag, setMobDatePickerFlag] = useState(1);
    const handleBtnFilterClick1 = useCallback((e, target) => {
      setMobDatePickerFlag(target.value);
      changeDatePickersValue(target);
    }, []);

    // 차량 기본정보 - 달력
    const [calPop1, setCalPop1] = useState(false);
    const [calPop2, setCalPop2] = useState(false);
    //const [isDate1, setIsDate1] = useState(moment().subtract(1, 'month'));
    //const [isDate2, setIsDate2] = useState(moment());

    const handleCalendarPop1 = (e) => {
      e.preventDefault();
      setCalPop1(true);
      preventScroll(true);
    };
    const handleCalendarPop2 = (e) => {
      e.preventDefault();
      setCalPop2(true);
      preventScroll(true);
    };
    const calendarCallback1 = (e, date) => {
      e.preventDefault();
      //setIsDate1(date);
      onChange({
        fromDate: date.format('YYYY-MM-DD')
      });
      setCalPop1(false);
      preventScroll(false);
    };
    const calendarCallback2 = (e, date) => {
      e.preventDefault();
      //setIsDate2(date);
      onChange({
        endDate: date.format('YYYY-MM-DD')
      });
      setCalPop2(false);
      preventScroll(false);
    };
    const calendarClose = (e) => {
      e.preventDefault();
      setCalPop1(false);
      setCalPop2(false);
      preventScroll(false);
    };

    return (
      <AppLayout>
        <div className="mypage-state-sec general-inquire-sec">
          <div className="content-wrap">
            <div className="mypage-admin-title mt20">
              <p className="tx-exp-tp5 tx-gray mt0">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
            </div>
            <ul className="m-toggle-list search mt16">
              <MenuItem>
                <MenuTitle>
                  <p className="tit2">나의 문의내역</p>
                  <span>상세조회</span>
                </MenuTitle>
                <MenuCont>
                  <MobButtonFilter
                    checkList={[
                      { title: '1개월', checked: true, value: 1 },
                      { title: '3개월', checked: false, value: 3 },
                      { title: '6개월', checked: false, value: 6 },
                      { title: '1년', checked: false, value: 12 }
                    ]}
                    onClick={handleBtnFilterClick1}
                  />
                  {/* 2개 이상인 경우 - 사용시 주석 삭제 요망 */}
                  {/* <MobButtonFilter checkList={[
                    {title: "11", checked: true}, 
                    {title: "222", checked: false}, 
                    {title: "333", checked: false},
                    {title: "444", checked: false}
                  ]} onClick={handleBtnFilterClick2} /> */}
                  <div className="mt8">
                    <DatePicker defaultValue={fromDate} width='46%' onClick={handleCalendarPop1} />
                    <em className="from">~</em>
                    <DatePicker defaultValue={endDate} width='46%' onClick={handleCalendarPop2} />
                  </div>
                  <Input type="text" height={40} placeHolder="제목 또는 내용을 검색하세요" marginTop={8} name="searchText" id="searchText" onChange={onChange} value={searchText} />
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16}  onClick={onClickSearch} buttonMarkup={true} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>
                    {fromDate} ~ {endDate}
                  </p>
                  <p>
                    총 <span className="tx-blue80">{totalCnt}</span>건
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border pdside20">
            <Buttons align="right" marginTop={16}>
              <Button size="sml" line="gray" color="gray" radius={true} className="" title="1:1 문의하기" width={72} href="/cscenter/directConsult" />
              <Button size="sml" line="gray" color="gray" radius={true} title="고객센터 바로가기" width={102} marginLeft={8} href="/cscenter/noticeList" />
            </Buttons>
            {!isEmpty(inquireList) && (
              <div className="qna-wrap">
                <ul className="m-toggle-list qna">
                  {inquireList.map((lists, index) => {
                    return (
                      <MenuItem key={index}>
                        <MenuTitle toggle={true}>
                          {/*
                        <MenuTitle toggle={lists.answSttDvcd === '0020' ? true : false}></MenuTitle>*/}
                          <div className="float-wrap mt0">
                            <ul className="fl">
                              <li>
                                {lists.quesDt} {lists.cnslTpcdNm}
                              </li>
                              <li className={lists.answSttDvcd === '0020' ? 'sec tx-blue80' : 'sec tx-gray'}>{lists.answSttDvcdNm}</li>
                            </ul>
                          </div>
                          <p className="subject mt8">{lists.quesTtlNm}</p>
                          <span className="cont mt8">
                            {lists?.quesCntn.split('\n').map((item, index) => {
                              return (
                                <span key={index}>
                                  {item}
                                  <br />
                                </span>
                              );
                            })}
                          </span>
                        </MenuTitle>
                        {lists.answSttDvcd === '0020' && (
                          <MenuCont>
                            <div className="answer-box">
                              <p>
                                {lists?.answCntn.split('\n').map((item, index) => {
                                  return (
                                    <span key={index}>
                                      {item}
                                      <br />
                                    </span>
                                  );
                                })}
                              </p>
                              <p className="fs12 mt8">{lists.answDt}</p>
                            </div>
                          </MenuCont>
                        )}
                      </MenuItem>
                    );
                  })}
                </ul>
              </div>
            )}
            {isEmpty(inquireList) && (
              <div className="search-none pd0" style={{ height: '176px' }}>
                <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </div>

        {
          <>
            <div
              className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`}
              onClick={calendarClose}
            ></div>
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
                {/*} rc-calendar 의 default값은 고정불변이므로 조회기간별(1,3,6,12 개월) fromDate를 현재일기준으로 미리 생성{*/}
                {mobDatePickerFlag === 1 && (
                  <MobCalendar
                    date={moment()
                      .subtract(1, 'month')
                      .format('YYYY-MM-DD')}
                    callback={calendarCallback1}
                  />
                )}
                {mobDatePickerFlag === 3 && (
                  <MobCalendar
                    date={moment()
                      .subtract(3, 'month')
                      .format('YYYY-MM-DD')}
                    callback={calendarCallback1}
                  />
                )}
                {mobDatePickerFlag === 6 && (
                  <MobCalendar
                    date={moment()
                      .subtract(6, 'month')
                      .format('YYYY-MM-DD')}
                    callback={calendarCallback1}
                  />
                )}
                {mobDatePickerFlag === 12 && (
                  <MobCalendar
                    date={moment()
                      .subtract(12, 'month')
                      .format('YYYY-MM-DD')}
                    callback={calendarCallback1}
                  />
                )}
            </MobBottomArea>
            <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
              <MobCalendar date={endDate} callback={calendarCallback2} />
            </MobBottomArea>
          </>
        }
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-inquire-sec">
          <div className="mypage-admin-title" style={{ marginBottom: '70px' }}>
            <h3>나의 문의내역</h3>
            <span style={{ float: 'left' }}>
              <p className="tx-exp-tp5">&#8251; 1:1 문의하신 내역을 확인하실 수 있습니다.</p>
            </span>
            <span className="fr" style={{ float: 'right' }}>
              <Button size="normal" background="blue80" title="1:1 문의하기" width={151} height={28} href="/cscenter/directConsult" />
              <Button size="normal" background="blue80" title="고객센터 바로가기" width={151} height={28} marginLeft={23} href="/cscenter/noticeList" />
            </span>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search th-c" summary="조회 영역" style={{ marginBottom: '-5%' }}>
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <th rowSpan="3">조회기간</th>
                  <td>
                    <DatePicker defaultValue={fromDate} name="fromDate" onChange={(e) => onChangeDate(e, 'fromDate')} inputHeight={40} />
                    <em className="mg8">-</em>
                    <DatePicker defaultValue={endDate} name="endDate" onChange={(e) => onChangeDate(e, 'endDate')} inputHeight={40} />
                    <em className="mg8" />
                    {checkedBtns.map((v, idx) => (
                      <span key={idx}>
                        <Button size="mid" line={v.line} color={v.color} title={v.title} width={50} height={40} onClick={(e) => clickDateRangeBtnHandler(e, v.value, idx)} />
                        &nbsp;
                      </span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Input type="text" name="searchText" id="searchText" placeHolder="제목 또는 내용을 검색하세요." width={352} height={40} value={searchText} onChange={onChange} />
                    <Button size="mid" background="blue80" title="조회하기" width={130} height={40} marginLeft={16} onClick={onClickSearch} buttonMarkup={true} />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="admin-list tp7 mt64">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                  <caption className="away">결제내역</caption>
                  <colgroup>
                    <col width="15%" />
                    <col width="15%" />
                    <col width="50%" />
                    <col width="20%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>문의일자</th>
                      <th>상담유형</th>
                      <th>제목</th>
                      <th>답변상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(inquireList) &&
                      inquireList.map((lists, index) => {
                        return (
                          <tr key={index}>
                            <td>{lists.quesDt}</td>
                            <td>{lists.cnslTpcdNm}</td>
                            <td className="tx-l" onClick={(e) => onClickHandler(e, '/mypage/dealer/info/dealerInquireView', lists.seqNo)}>
                              {lists.quesTtlNm}
                            </td>
                            <td className={lists.answSttDvcd === '0020' ? 'tx-blue80' : ''}>{lists.answSttDvcdNm}</td>
                          </tr>
                        );
                      })}
                    {isEmpty(inquireList) && (
                      <tr className="list-none">
                        <td colSpan="4">조회하신 내용이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <PageNavigator className={'mt32'} currentPage={pageNo} recordCount={totalCnt} recordSize={pageUnit} changed={onHandlePageChange} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DealerInquire;
