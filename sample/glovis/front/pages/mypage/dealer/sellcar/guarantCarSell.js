import React, { memo, useState, useCallback, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { PulseLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
import DynamicTag from '@lib/share/items/DynamicTag';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import { SystemContext } from '@src/provider/SystemProvider';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

import PageNavigator from '@src/components/common/PageNavigator';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Button from '@lib/share/items/Button';
import { getGuarantCarList } from '@src/actions/mypage/dealer/guarantCarAction';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';

const GuarantCarSell = memo(({ query = {}}) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [mobGuarantCarList, setMobGuarantCarList] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const mobCurrentPage = useRef(1);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '보증차량 판매현황',
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBtnFilterClick1 = useCallback((e, deps) => {
    setStartDt(moment().add(deps.value * -1, deps.unit));
    setEndDt(moment());
  }, []);

  const { pageNo = 1 } = query;
  const nf = Intl.NumberFormat();
  const { guarantCarList, recordSize, recordCount } = useSelector((state) => state.guarantCar);
  const { Alert, initAlert, initConfirm } = useContext(SystemContext);
  const [dateReset] = useState(true);
  const [startDt, setStartDt] = useState(moment().subtract(hasMobile ? 1 : 3, 'Months'));
  const [endDt, setEndDt] = useState(moment());
  const [sellType] = useState('sell-type1');
  const [isFromCalPopOpen, setIsFromCalPopOpen] = useState(false);
  const [isToCalPopOpen, setIsToCalPopOpen] = useState(false);

  const checkedbtnArray = [
    { clicked: true, line: 'blue80', color: 'blue80', title: '3개월', type: '3m', unit: 'months', value: 3 },
    { clicked: false, line: 'gray', color: 'black', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '15일', type: '15d', unit: 'days', value: 15 },
    { clicked: false, line: 'gray', color: 'black', title: '1주일', type: '1w', unit: 'weeks', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '오늘', type: 'today', unit: 'days', value: 0 }
  ];

  const onClickBtnClick = (e) => {
    setStartDt(e.fromDate);
    setEndDt(e.endDate);
  };

  const onSearch = (e) => {
    e.preventDefault();
    const searchData = {
      startDt: moment(startDt).format('YYYY-MM-DD'),
      endDt: moment(endDt).format('YYYY-MM-DD'),
      recordSize: recordSize,
      pageNo: 1
    };
    console.log('onSearch Data =>> ', searchData);
    dispatch(getGuarantCarList(searchData));
  };

  const clickPageNavi = (clickedPageNo) => {
    const searchInfo = {
      startDt: moment(startDt).format('YYYY-MM-DD'),
      endDt: moment(endDt).format('YYYY-MM-DD'),
      sellType: sellType,
      recordSize: recordSize,
      pageNo: clickedPageNo
    };
    dispatch(getGuarantCarList(searchInfo));
  };

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

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((mobCurrentPage.current - 1) * recordSize > mobGuarantCarList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지\
      setIsLoadingImage(true); // 로딩이미지 on
      mobCurrentPage.current++;
      clickPageNavi(mobCurrentPage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag, mobGuarantCarList, dispatch, mobCurrentPage]);

  useEffect(() => {
    dispatch(getGuarantCarList({ pageNo, recordSize, startDt: startDt.format('YYYY-MM-DD'), endDt: endDt.format('YYYY-MM-DD') }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo, recordSize]);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (Alert.state !== 'show' && Alert.callback === 'guarant_remove') {
      window.location.reload();
      window.scrollTo(0, 0);
    }
    if (Alert.state !== 'show' && Alert.callback === 'upload') {
      window.location.reload();
      window.scrollTo(0, 0);
    }
  }, [Alert]);

  useEffect(() => {
    setLoadingFlag(true);
    if (guarantCarList) {
      setMobGuarantCarList(mobGuarantCarList.concat(guarantCarList));
    }
    setIsLoadingImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guarantCarList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMobile, onScroll, mobGuarantCarList]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="dealer-assure-sec pt0">
          <div className="content-wrap">
            <ul className={objIsEmpty(guarantCarList) ? 'm-toggle-list search mb0 none' : 'm-toggle-list search mb0'}>
              <MenuItem>
                <MenuTitle>
                  <p className="tit2">보증차량 판매현황</p>
                  <span>상세조회</span>
                </MenuTitle>
                <MenuCont>
                  {/* 
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">판매유형</p>
                    <MobSelectList
                      placeHolder="전체"
                      displayMemberPath={'label'}
                      selectedItem={sellTypes.find((x) => x.id === sellType)}
                      selectedValuePath={'value'}
                      itemsSource={sellTypes}
                      width="70%"
                      onClick={handleSellTypeChanged}
                    />
                  </div> 
                  */}
                  <MobButtonFilter
                    checkList={[
                      { title: '15일', checked: false, value: 15, unit: 'days' },
                      { title: '1개월', checked: true, value: 1, unit: 'M' },
                      { title: '3개월', checked: false, value: 3, unit: 'M' },
                      { title: '6개월', checked: false, value: 6, unit: 'M' }
                    ]}
                    onClick={handleBtnFilterClick1}
                  />
                  <div className="mt8">
                    <DatePicker defaultValue={startDt} width="46%" onClick={handleCalendarFromToggle} />
                    <em className="from">~</em>
                    <DatePicker defaultValue={endDt} width="46%" onClick={handleCalendarToToggle} />
                  </div>
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} onClick={onSearch} />
                </MenuCont>
              </MenuItem>
              {objIsEmpty(mobGuarantCarList) ? (
                <></>
              ) : (
                <li>
                  <div className="float-wrap">
                    <p>
                      {startDt.format('YYYY.MM.DD')} ~ {endDt.format('YYYY.MM.DD')}
                    </p>
                    <p>
                      총 <span className="tx-blue80">{(mobGuarantCarList || []).length}</span>건
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="list-wrap content-border">
            {objIsEmpty(mobGuarantCarList) ? (
              <div className="list-none-wrap">
                <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="goods-list admin-list tp5 pd20 bg-white">
                <ul>
                  {(mobGuarantCarList || []).map((val, i) => {
                    return (
                      <DynamicTag id={`li-${i}`} key={i} tagName={'li'} dataContext={val}>
                        <div className="img-cover">
                          <div className="img-wrap">
                            <img src={val.phtUrl} alt="차량 이미지" />
                          </div>
                          {/* <span className="state">예약완료</span> */}
                        </div>
                        <div className="summary">
                          <ul className="date">
                            <li>판매일자 : {val.slDt}</li>
                          </ul>
                          <h5 className="subject">{val.crNm}</h5>
                          <div className="info-wrap">
                            <div className="info">
                              <span>{val.crNo}</span>
                              <span>{val.wrntPrdNm}</span>
                            </div>
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">
                                  {nf.format(val.prdAmt)}
                                  <span className="won">만원</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DynamicTag>
                    );
                  })}
                </ul>
                {isLoadingImage === true ? (
                  <div className="more-loading">
                    <PulseLoader size={15} color={'#ddd'} loading={true} />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className={isFromCalPopOpen || isToCalPopOpen ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={handleCalendarClose} />
        <MobBottomArea active={isFromCalPopOpen} isFixButton={true} zid={102}>
          <MobCalendar date={startDt} callback={handleCalendarFromToggle} />
        </MobBottomArea>
        <MobBottomArea active={isToCalPopOpen} isFixButton={true} zid={102}>
          <MobCalendar date={endDt} callback={handleCalendarToToggle} />
        </MobBottomArea>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec dealer-assure-sec">
          <div className="mypage-admin-title">
            <h3>보증차량 판매현황</h3>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역" style={{ marginBottom: '20px' }}>
              <caption className="away">조회 영역</caption>
              <colgroup>
                <col width="8.8%" />
                <col width="91.2%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>판매일자</th>
                  <td>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} resetSignal={!dateReset} onChange={onClickBtnClick} inputHeight={40} inputWidth={160} StartDate={3} limitDate={6} />
                  </td>
                  <td>
                    <Button size="mid" background="blue80" title="조회" width={112} height={40} marginLeft={16} buttonMarkup={true} onClick={onSearch} />
                  </td>
                </tr>
                <tr>
                  <th />
                  <td>
                    <p className="tx-exp-tp6">(* 최대 [6개월]까지 조회 가능합니다.)</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="tx-list">
              <table className="table-tp1 th-c td-c" summary="보증차량 판매현황에 대한 내용">
                <caption className="away">조회 영역</caption>
                <colgroup>
                  <col width="10%" />
                  <col width="18%" />
                  <col width="14%" />
                  <col width="21%" />
                  <col width="11%" />
                  <col width="13%" />
                  <col width="13%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>판매일자</th>
                    <th>차량번호</th>
                    <th>차량명</th>
                    <th>고객명</th>
                    <th>보증상품명</th>
                    <th>상품금액</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(guarantCarList) &&
                    guarantCarList.map((val, i) => {
                      return (
                        <tr key={i}>
                          <td>{val.rnum}</td>
                          <td>{val.slDt}</td>
                          <td>{val.crNo}</td>
                          <td>{val.crNm}</td>
                          <td>{val.mbNm}</td>
                          <td>{val.wrntPrdNm}</td>
                          <td>{nf.format(val.prdAmt)}</td>
                        </tr>
                      );
                    })}
                  {isEmpty(guarantCarList) && (
                    <>
                      <tr>
                        <td colSpan="7">검색결과가 없습니다.</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <PageNavigator recordCount={recordCount} currentPage={pageNo} recordSize={recordSize} className="mt32" changed={clickPageNavi} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
});

GuarantCarSell.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

GuarantCarSell.propTypes = {
  query: PropTypes.object
};

GuarantCarSell.displayName = 'GuarantCarSell';

export default withRouter(GuarantCarSell);
