import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import moment from 'moment';
import { produce } from 'immer';
import { isEmpty } from 'lodash';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import useRodal from '@lib/share/custom/useRodal';
import PageNavigator from '@src/components/common/PageNavigator';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import LiveAssignView from '@src/components/mypage/sellcar/popup/LiveAssignView';
import { getLiveStudioList, getTodayCnt, getWeekCnt } from '@src/actions/mypage/dealer/liveStudioAssignAction';
import { MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST, MOBILE_FULLPAGE_POPUP, MOBILE_HEADER_TYPE_SUB, MOBILE_QUICK_EXIST, SECTION_MYPAGE } from '@src/actions/types';
import { isNumber, preventScroll } from '@src/utils/CommonUtil';

const LiveAssignList = memo(({ query, router }) => {
  const dispatch = useDispatch();
  const { pageNo = 1 } = query;
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const { liveAssignList, recordSize, recordCount, todayCnt, weekCnt } = useSelector((state) => state.liveAssign);

  const [withoutList, setWithoutList] = useState(true);
  const [seq, setSeq] = useState(0);
  const [livePopupShow, setLivePopupShow, openLivePopup, closeLivePopup] = useRodal(false, true);
  const [dateReset, setDateReset] = useState(true);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [startDt, setStartDt] = useState(moment().subtract(3, 'Months'));
  const [endDt, setEndDt] = useState(moment());
  const [isVisitInfoOpen, setIsVisitInfoOpen] = useState(false);
  const [isFromCalPopOpen, setIsFromCalPopOpen] = useState(false);
  const [isToCalPopOpen, setIsToCalPopOpen] = useState(false);
  const [liveInfo, setLiveInfo] = useState({
    LiveAddr: ''
  });
  const [ckOptions, setCkOptions] = useState([
    { value: '1', checked: false },
    { value: '2', checked: false },
    { value: '3', checked: false }
  ]);
  const processState = [
    { value: '1', title: '등록완료' },
    { value: '2', title: '등록대기' },
    { value: '3', title: '미등록' }
  ];
  const checkedbtnArray = [
    { clicked: true, line: 'blue80', color: 'blue80', title: '3개월', type: '3m', unit: 'months', value: 3 },
    { clicked: false, line: 'gray', color: 'black', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '1주일', type: '1w', unit: 'weeks', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '오늘', type: 'today', unit: 'days', value: 0 }
  ];

  const onClickBtnClick = (e) => {
    setStartDt(e.fromDate);
    setEndDt(e.endDate);
  };
  const onChangeAllCheck = (e) => {
    const checked = e.target.checked;

    setIsChecked(
      produce((draft) => {
        processState.map((val, index) => {
          draft[index] = checked;
        });
      })
    );

    setCkOptions(
      produce((draft) => {
        draft.map((val) => {
          val.checked = checked;
        });
      })
    );

    setIsCheckedAll(!isCheckedAll);
  };

  const onChangeCheckbox = (e, index) => {
    const checked = e.target.checked;

    setCkOptions(
      produce((draft) => {
        draft.map((val, i) => {
          if (i === index) {
            val.checked = checked;
          }
        });
      })
    );

    let isCnt = 0;

    for (const i in isChecked) {
      if (isChecked[i] === true) {
        isCnt++;
      }
    }

    setIsChecked(
      produce((draft) => {
        draft[index] = checked;
      })
    );

    if (checked === true) {
      isCnt++;
    } else {
      isCnt--;
    }

    if (isCnt === 3) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  const onClickSearchBtn = useCallback(
    (e) => {
      e.preventDefault();
      const checkVal = [];

      ckOptions.forEach((obj) => {
        if (obj.checked) {
          checkVal.push(obj.value);
        }
      });

      const searchData = {
        pageNo: pageNo,
        recordSize: recordSize,
        startDt: moment(startDt).format('YYYY-MM-DD'),
        endDt: moment(endDt).format('YYYY-MM-DD')
      };

      if (checkVal !== null && checkVal.length > 0) {
        searchData.lvShotSttCd = checkVal.join(',');
      }
      console.log('searchData => ', searchData);

      dispatch(getLiveStudioList(searchData));
    },
    [ckOptions, dispatch, endDt, pageNo, recordSize, startDt]
  );

  const clickPageNavi = (e, clickedPageNo) => {
    const searchData = {
      pageNo: clickedPageNo,
      recordSize: recordSize,
      startDt: moment(startDt).format('YYYY-MM-DD'),
      endDt: moment(endDt).format('YYYY-MM-DD')
    };
    dispatch(getLiveStudioList(searchData));
  };

  const handleIsVisitInfoToggle = useCallback(
    (e, deps) => {
      e.preventDefault();
      const selectLiveInfo = {
        reqId: deps?.reqId,
        dlrPrdId: deps?.dlrPrdId,
        LiveAddr: deps?.reqLoc
      };

      if (hasMobile === true) {
        const nextValue = !isVisitInfoOpen;
        if (nextValue) {
          setLiveInfo(selectLiveInfo);
          dispatch({
            type: MOBILE_FULLPAGE_POPUP,
            data: {
              isPopup: true,
              title: '방문정보',
              options: ['close']
            }
          });
        } else {
          setLiveInfo(null);
        }
        setIsVisitInfoOpen(nextValue);
        preventScroll(nextValue);
      } else {
        setLiveInfo(selectLiveInfo);
        openLivePopup(e, 'fade');
      }
    },
    [dispatch, hasMobile, isVisitInfoOpen, openLivePopup]
  );

  const handlePeriodBtnClick = useCallback((e, deps) => {
    setStartDt(moment().add(deps.value * -1, 'M'));
    setEndDt(moment());
  }, []);

  const handleCalendarFromToggle = useCallback(
    (e, date) => {
      e.preventDefault();
      const nextIsOpen = !isFromCalPopOpen;
      setIsFromCalPopOpen(nextIsOpen);
      if (date) {
        setStartDt(date);
      }
      preventScroll(nextIsOpen);
    },
    [isFromCalPopOpen]
  );

  const handleCalendarToToggle = useCallback(
    (e, date) => {
      e.preventDefault();
      const nextIsOpen = !isToCalPopOpen;
      setIsToCalPopOpen(nextIsOpen);
      if (date) {
        setEndDt(date);
      }
      preventScroll(nextIsOpen);
    },
    [isToCalPopOpen]
  );

  const handleCalendarClose = useCallback(() => {
    setIsFromCalPopOpen(false);
    setIsToCalPopOpen(false);
  }, []);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    const pageData = {
      pageNo: pageNo,
      recordSize: hasMobile === true ? recordSize : recordSize,
      startDt: null, //"2020-01-15"
      endDt: null //"2020-04-15"
      // lvShotSttCd: '1,2,3'
    };
    dispatch(getLiveStudioList(pageData));
    dispatch(getTodayCnt());
    dispatch(getWeekCnt());
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: 'Live shot 배정리스트',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
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

      const { result, seq } = router.query;

      setWithoutList(result === 'no' ? true : false);
      setSeq(seq);

      if (seq !== undefined) {
        window.scrollTo(0, 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="live-shot-sec">
          <TabMenu type="type2" mount={false} defaultTab={isNumber(seq) ? Number(seq) - 1 : 0}>
            <TabCont tabTitle="신청 내역" id="tab2-1" index={0}>
              <div className="live-shot">
                <div className="float-wrap">
                  <p>방문신청 현황</p>
                  <ul>
                    <li>
                      진행 중 <span>{todayCnt}</span>건
                    </li>
                    <li>
                      이번 주 <span>{weekCnt}</span>건
                    </li>
                  </ul>
                </div>
                <ul className="goods-list">
                  {(liveAssignList || [])
                    .filter((x) => x.lvshotStt !== '1')
                    .map((item, idx) => {
                      return (
                        <li key={idx}>
                          <div className="date float-wrap btn-s">
                            <ul>
                              <li>{item.regDt}</li>
                              <li className="state tx-red80">{item.lvshotStt === '2' ? '등록대기' : '미등록'}</li>
                            </ul>
                            <ul>
                              <Button
                                size="sml"
                                line="gray"
                                color="gray"
                                radius={true}
                                title="방문정보"
                                width={61}
                                height={30}
                                fontSize={12}
                                fontWeight={500}
                                dataContext={item}
                                onClick={handleIsVisitInfoToggle}
                              />
                              <Button
                                size="sml"
                                background="blue80"
                                radius={true}
                                title="등록"
                                width={39}
                                height={30}
                                fontSize={12}
                                fontWeight={500}
                                marginLeft={6}
                                href={`/mypage/dealer/sellcar/liveShotRegister01?crId=${item.crId}&crNo=${item.crNo}&crType=${item.crTypeCd}&reqId=${item.reqId}`}
                              />
                            </ul>
                          </div>
                          <h4 className="subject">
                            <span>{item.crNo}</span>
                            {item.crNm}
                          </h4>
                          <div className="info">
                            <span>
                              {item.mbNm} / {item.reqLoc}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </TabCont>
            <TabCont tabTitle="완료 내역" id="tab2-2" index={1}>
              <div className="live-shot">
                <ul className="m-toggle-list search">
                  <MenuItem>
                    <MenuTitle>
                      촬영 완료내역<span>상세조회</span>
                    </MenuTitle>
                    <MenuCont>
                      <MobButtonFilter
                        checkList={[
                          { title: '1개월', checked: true, value: 1 },
                          { title: '3개월', checked: false, value: 3 },
                          { title: '6개월', checked: false, value: 6 },
                          { title: '1년', checked: false, value: 12 }
                        ]}
                        onClick={handlePeriodBtnClick}
                      />
                      <div className="mt8">
                        <DatePicker defaultValue={startDt} width="46%" onClick={handleCalendarFromToggle} />
                        <em className="from">~</em>
                        <DatePicker defaultValue={endDt} width="46%" onClick={handleCalendarToToggle} />
                      </div>
                      <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} onClick={onClickSearchBtn} />
                    </MenuCont>
                  </MenuItem>
                  <li>
                    <div className="float-wrap">
                      <p>
                        {startDt.format('YYYY.MM.DD')} ~ {endDt.format('YYYY.MM.DD')}
                      </p>
                      <p>
                        총 <span className="tx-blue80">{(liveAssignList || []).filter((x) => x.lvshotStt === '1').length}</span>건
                      </p>
                    </div>
                  </li>
                </ul>
                {isEmpty((liveAssignList || []).filter((x) => x.lvshotStt === '1')) ? (
                  <div className="list-none-wrap">
                    <div className="list-none">
                      <p>조회조건에 해당하는 내역이 없습니다.</p>
                    </div>
                  </div>
                ) : (
                  <ul className="goods-list content-border">
                    {(liveAssignList || [])
                      .filter((x) => x.lvshotStt === '1')
                      .map((item, idx) => {
                        return (
                          <li key={idx}>
                            <div className="date float-wrap btn-s">
                              <ul>
                                <li>{item.regDt}</li>
                                <li className="state">등록완료</li>
                              </ul>
                              <ul>
                                <Button size="sml" line="gray" color="gray" radius={true} title="방문정보" width={61} height={30} fontSize={12} fontWeight={500} onClick={handleIsVisitInfoToggle} />
                                <Button
                                  size="sml"
                                  background="blue80"
                                  radius={true}
                                  title="수정"
                                  width={39}
                                  height={30}
                                  fontSize={12}
                                  fontWeight={500}
                                  marginLeft={6}
                                  href="/mypage/dealer/sellcar/liveShotRegister01"
                                />
                              </ul>
                            </div>
                            <h4 className="subject">
                              <span>{item.crNo}</span>
                              {item.crNm}
                            </h4>
                            <div className="info">
                              <span>
                                {item.mbNm} / {item.reqLoc}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            </TabCont>
          </TabMenu>
        </div>
        {
          <>
            <div className={isFromCalPopOpen || isToCalPopOpen ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCalendarClose} />
            <MobBottomArea active={isFromCalPopOpen} isFixButton={true} zid={102}>
              <MobCalendar date={startDt} callback={handleCalendarFromToggle} />
            </MobBottomArea>
            <MobBottomArea active={isToCalPopOpen} isFixButton={true} zid={102}>
              <MobCalendar date={endDt} callback={handleCalendarToToggle} />
            </MobBottomArea>
          </>
        }
        <MobFullpagePopup active={mFullpagePopup} onClose={handleIsVisitInfoToggle}>
          {isVisitInfoOpen && <LiveAssignView liveInfo={liveInfo} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap live-shot-sec">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <div className="mypage-admin-title">
            <h3>Live shot 배정 리스트</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="8.8%" />
                <col width="91.2%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>진행상태</th>
                  <td>
                    <CheckBox id="chk-all" title="전체" checked={isCheckedAll} onChange={onChangeAllCheck} />
                    {processState.map((state, index) => {
                      return (
                        <span key={index}>
                          <CheckBox id={'chk-' + state.value} title={state.title} checked={isChecked[index]} onChange={(e) => onChangeCheckbox(e, index, state.value)} />
                        </span>
                      );
                    })}
                  </td>
                </tr>
                <tr>
                  <th>등록일자</th>
                  <td>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} resetSignal={!dateReset} onChange={onClickBtnClick} inputHeight={40} inputWidth={160} StartDate={3} limitData={6} />
                  </td>
                  <td>
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} onClick={onClickSearchBtn} buttonMarkup={true} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <p className="tx-exp-tp6">(* 최대 [6개월] 까지 조회 가능합니다.)</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="tx-list">
              <p className="inquire-num">
                방문신청현황 : 오늘 {todayCnt}건 / 이번주 {weekCnt}건
              </p>
              <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
                <caption className="away">딜러정보 관리</caption>
                <colgroup>
                  <col width="9%" />
                  <col width="13%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>등록일자</th>
                    <th>차량번호</th>
                    <th>차량명</th>
                    <th>신청인이름</th>
                    <th>신청지역</th>
                    <th>진행상태</th>
                    <th>방문정보</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(liveAssignList) &&
                    liveAssignList.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.rnum}</td>
                          <td>{item.regDt}</td>
                          <td>{item.crNo}</td>
                          <td>{item.crNm}</td>
                          <td>{item.mbNm}</td>
                          <td>{item.reqLoc}</td>
                          <td>{item.lvshotStt}</td>
                          <td>
                            <Button size="sml" line="gray" title="보기" width={56} height={32} radius={true} dataContext={item} onClick={handleIsVisitInfoToggle} />
                          </td>
                        </tr>
                      );
                    })}
                  {isEmpty(liveAssignList) && (
                    <tr>
                      <th colSpan="8">
                        <p>
                          <i className="ico-notify-big" />
                          검색결과가 없습니다.
                        </p>
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
              <PageNavigator className={'mt32'} currentPage={pageNo} recordCount={recordCount} recordSize={recordSize} changed={clickPageNavi} />
            </div>
          </div>
        </div>
      </div>
      <LiveAssignView livePopupShow={livePopupShow} setLivePopupShow={setLivePopupShow} closeLivePopup={closeLivePopup} liveInfo={liveInfo} />
    </AppLayout>
  );
});

LiveAssignList.propTypes = {
  query: PropTypes.object,
  router: PropTypes.object
};

LiveAssignList.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

LiveAssignList.displayName = 'LiveAssignList';

export default withRouter(LiveAssignList);
