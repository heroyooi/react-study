import React, { memo, useState, useEffect, useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import moment from 'moment';
import { produce } from 'immer';
import { PulseLoader } from 'react-spinners';
import Button from '@lib/share/items/Button';
import DynamicTag from '@lib/share/items/DynamicTag';
import Tooltip from '@lib/share/items/Tooltip';
import TooltipItem from '@lib/share/items/TooltipItem';
import TooltipCont from '@lib/share/items/TooltipCont';
import CheckBox from '@lib/share/items/CheckBox';

import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import MobSelectList from '@lib/share/items/MobSelectList';
import DatePicker from '@src/components/common/calendar/DatePicker';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
import HistoryFilter from '@src/components/mypage/dealer/DealerAdManagement/tabPurchaseHistory/HistoryFilter';
import { getMyHomeServiceList } from '@src/actions/mypage/dealer/homeServiceAction';
import { SystemContext } from '@src/provider/SystemProvider';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { AUCTION_TYPE, COMMON_TYPE, LIVESTD_TYPE } from '@src/constant/buyCarConstant';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
export const baseImgUrl = process.env.IMGURL;

/**
 * 설명 : 홈서비스 예약/판매 현황을 조회 한다
 * @param {state.myHomeService.homeServiceList} 홈서비스 현황 목록
 * @returns {homeService} 홈서비스 예약/판매 현황
 */
const HomeServiceStatus = memo(({ query }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const nf = new Intl.NumberFormat();

  const { homeServiceList, currentPage, recordSize, recordCount } = useSelector((state) => state.myHomeService);
  const { initAlert, initConfirm } = useContext(SystemContext);
  const [loadingFlag, setLoadingFlag] = useState(true);
  const [mobHomeServiceList, setMobHomeServiceList] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const mobCurrentPage = useRef(1);

  const [selectedProcessState, setSelectedProcessState] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [dateReset] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [startDt, setStartDt] = useState(moment().subtract(3, 'Months'));
  const [endDt, setEndDt] = useState(moment());
  // const [dateParams, setDateParams] = useState(() => {
  //   const startDt = moment(new Date())
  //     .subtract(3, 'Months')
  //     .format('YYYY-MM-DD');
  //   const endDt = moment(new Date()).format('YYYY-MM-DD');
  //   const period = '3month';

  //   return {
  //     startDt,
  //     endDt,
  //     period
  //   };
  // });
  const [isFromCalPopOpen, setIsFromCalPopOpen] = useState(false);
  const [isToCalPopOpen, setIsToCalPopOpen] = useState(false);
  const [ckOptions, setCkOptions] = useState([
    { value: '0020', checked: false },
    { value: '0030', checked: false },
    { value: '0040', checked: false },
    { value: '0050', checked: false },
    { value: '0060', checked: false },
    { value: '0070', checked: false }
  ]);

  const checkedbtnArray = [
    { clicked: true, line: 'blue80', color: 'blue80', title: '3개월', type: '3m', unit: 'months', value: 3 },
    { clicked: false, line: 'gray', color: 'black', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '15일', type: '15d', unit: 'days', value: 15 },
    { clicked: false, line: 'gray', color: 'black', title: '1주일', type: '1w', unit: 'weeks', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '오늘', type: 'today', unit: 'days', value: 0 }
  ];

  const processState = [
    { value: '0020', title: '예약완료' },
    { value: '0030', title: '결제완료' },
    { value: '0040', title: '탁송중' },
    { value: '0050', title: '탁송완료' },
    { value: '0060', title: '구매확정' },
    { value: '0070', title: '취소' }
  ];

  const handleBtnFilterClick1 = (e, deps) => {
    setStartDt(moment().add(deps.value * -1, deps.unit));
    setEndDt(moment());
  };

  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);

  const handleOpenPop = useCallback((e, deps) => {
    e.preventDefault();
    setActive(true);
    setDimm(true);
    setSelectedItem(deps);
    preventScroll(true);
  }, []);

  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    setSelectedItem(null);
    preventScroll(false);
  }, []);

  const onChangeAllCheck = (e) => {
    const checked = e.target.checked;
    console.log('전체체크박스 =>> ', checked);

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

    if (isCnt === 6) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  };

  const onClickBtnClick = (e) => {
    setStartDt(e.fromDate);
    setEndDt(e.endDate);
  };

  const onChangeDate = (newDateParams) => {
    setDateParams(newDateParams);
  };

  const clickPageNavi = (e, clickedPageNo) => {
    setPageNo(clickedPageNo);
    const pageData = {
      pageNo: clickedPageNo,
      recordSize: recordSize,
      startDt: moment(startDt).format('YYYY-MM-DD'),
      endDt: moment(endDt).format('YYYY-MM-DD')
    };
    dispatch(getMyHomeServiceList(pageData));
  };

  const goCarListClick = (e, data) => {
    let detailType = '';

    switch ('Y') {
      case data.lvshotCrYn:
        detailType = LIVESTD_TYPE;
        break;
      case data.auctSbidCrYn:
        detailType = AUCTION_TYPE;
        break;
      default:
        detailType = COMMON_TYPE;
        break;
    }

    Router.push(`/buycar/buyCarDetailType?dlrPrdId=${data.dlrPrdId}&detailType=${detailType}`);
  };

  const handleProcessStateChanged = useCallback((e, deps) => {
    setCkOptions([Object.assign({ ...deps }, { checked: true })]);
    setSelectedProcessState(deps);
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

  const onClickSearchBtn = useCallback(
    (e) => {
      e.preventDefault();
      const checkVal = [];
      ckOptions.map((obj) => {
        if (obj.checked) {
          checkVal.push(obj.value);
        }
      });

      let searchData = {
        pageNo: pageNo,
        recordSize: recordSize,
        startDt: moment(startDt).format('YYYY-MM-DD'),
        endDt: moment(endDt).format('YYYY-MM-DD')
      };

      // if (!hasMobile) {
      //   searchData = {
      //     ...searchData,
      //     ...dateParams
      //   };
      // }

      if (checkVal !== null && checkVal.length > 0) {
        searchData.sttDvcd = checkVal.join(',');
      }
      console.log('searchData => ', searchData);
      dispatch(getMyHomeServiceList(searchData));
    },
    [ckOptions, dispatch, endDt, pageNo, recordSize, startDt]
  );

  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((mobCurrentPage.current - 1) * recordSize > mobHomeServiceList.length) return;

      setLoadingFlag(false);
      setIsLoadingImage(true);
      mobCurrentPage.current++;
      clickPageNavi(mobCurrentPage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag, mobHomeServiceList, dispatch, mobCurrentPage]);

  useEffect(() => {
    setLoadingFlag(true);
    if (homeServiceList) {
      setMobHomeServiceList(mobHomeServiceList.concat(homeServiceList));
    }
    setIsLoadingImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeServiceList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMobile, onScroll, mobHomeServiceList]);

  useEffect(() => {
    dispatch(
      getMyHomeServiceList({
        pageNo: pageNo,
        recordSize: recordSize,
        startDt: moment(startDt).format('YYYY-MM-DD'),
        endDt: moment(endDt).format('YYYY-MM-DD')
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '홈서비스 예약/판매 현황',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="dealer-service-sec pt0">
          <div className="content-wrap">
            <div className="essential-point tp2 fs12 mt20">
              <ul>
                <li>
                  &#8251; 구매자가 구매확정 시 차량대금이 정산 및 입금됩니다.
                  <br />
                  (구매확정일로부터 3영업일 이내)
                </li>
                <li>
                  &#8251; 홈서비스 구매신청이 접수된 경우 판매자분께 유선으로 홈서비스 진행여부를 확인한 뒤, 홈서비스 고객 상담이 진행됩니다.
                  <br />
                  홈서비스 담당자의 전화를 꼭 받아주세요.
                </li>
              </ul>
            </div>
            <ul className="m-toggle-list search">
              <MenuItem>
                <MenuTitle>
                  <p className="tit2">홈서비스 현황</p>
                  <span>상세조회</span>
                </MenuTitle>
                <MenuCont>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">진행상태</p>
                    <MobSelectList
                      displayMemberPath={'title'}
                      itemsSource={processState}
                      placeHolder="전체"
                      selectedItem={selectedProcessState}
                      selectedValuePath={'value'}
                      width="70%"
                      onClick={handleProcessStateChanged}
                    />
                  </div>
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
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} onClick={onClickSearchBtn} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>
                    {startDt.format('YYYY.MM.DD')} ~ {endDt.format('YYYY.MM.DD')}
                  </p>
                  <p>
                    총 <span className="tx-blue80">{(homeServiceList || []).length}</span>건
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border">
            {objIsEmpty(homeServiceList) ? (
              <div className="search-none pd0" style={{ height: '176px' }}>
                <p className="tx-black tx-n mt0 tx">조회조건에 해당하는 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="goods-list admin-list tp5 pd20 bg-white">
                <ul>
                  {(mobHomeServiceList || []).map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="img-cover">
                          <div className="img-wrap">
                            <img src={`${baseImgUrl}${item.phtUrl}`} alt="차량 이미지" />
                          </div>
                          <span className="state">{item.cdNm}</span>
                        </div>
                        <div className="summary">
                          <ul className="date">
                            <li>등록일 : {item.updDt}</li>
                          </ul>
                          <h5 className="subject">{item.crNm}</h5>
                          <div className="info-wrap">
                            <div className="info">
                              <span>{item.crNo}</span>
                              <span>{item.prdNm}</span>
                            </div>
                            <div className="price-wrap">
                              <div className="price-left">
                                <p className="price-tp2">
                                  {nf.format(Math.ceil(item.crAmt / 10000))}
                                  <span className="won">만원</span>
                                </p>
                              </div>
                            </div>
                            <DynamicTag className="t-underline tx-blue80 fs12 mt8" id={`li-${index}`} tagName={'p'} dataContext={item} onClick={handleOpenPop}>
                              상세보기
                            </DynamicTag>
                          </div>
                        </div>
                      </li>
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

            <div className={dimm ? 'modal-bg v-2 active' : 'modal-bg v-2'} onClick={handleCloseDimm} />
            <MobBottomArea active={active} zid={101} isFixButton={true}>
              <div className="inner search-cover">
                <h3 className="tit1 mb0">신청 내역 상세</h3>
                <form className="auction-form step4">
                  <fieldset>
                    <legend className="away">신청 내역 상세</legend>
                    <table className="table-tp1 mt24" summary="계약자 정보에 대한 내용">
                      <caption className="fs14 tx-n">계약자 정보</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>계약자</th>
                          <td>{selectedItem?.nom}</td>
                        </tr>
                        <tr>
                          <th>휴대폰 번호</th>
                          <td>{selectedItem?.hpNoEnc}</td>
                        </tr>
                        <tr>
                          <th className="ver-t">배송주소</th>
                          <td>
                            ({selectedItem?.zcd}){selectedItem?.addr1} {selectedItem?.addr2}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table-tp1 mt24" summary="결제내역에 대한 내용">
                      <caption className="fs14 tx-n">결제내역</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>차량가격</th>
                          <td>{nf.format(selectedItem?.crAmt)}원</td>
                        </tr>
                        <tr>
                          <th>이전관리비</th>
                          <td>{nf.format(selectedItem?.rdpmMgmtAmt)}원</td>
                        </tr>
                        <tr>
                          <th>현대 오토벨 보증비</th>
                          <td>{nf.format(selectedItem?.atbWrntAmt)}원</td>
                        </tr>
                        <tr>
                          <th>홈서비스 이용료</th>
                          <td>{nf.format(selectedItem?.hsvcUseAmt)}원</td>
                        </tr>
                        <tr>
                          <th>탁송비</th>
                          <td>{nf.format(selectedItem?.deliAmt)}원</td>
                        </tr>
                        <tr>
                          <th className="tx-b tx-black">총 결제 금액</th>
                          <td className="tx-b tx-black">
                            {nf.format(selectedItem?.crAmt + selectedItem?.rdpmMgmtAmt + selectedItem?.atbWrntAmt + selectedItem?.hsvcUseAmt + selectedItem?.deliAmt)}원
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <table className="table-tp1 mt8" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="40%" />
                        <col width="60%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>결제방식</th>
                          <td>{selectedItem?.athMthdDvcd === '001' ? '할부' : selectedItem?.athMthdDvcd === '002' ? '계좌이체' : '할부 + 계좌이체'}</td>
                        </tr>
                        <tr>
                          <th>이체금액</th>
                          <td>1,000원</td>
                        </tr>
                      </tbody>
                    </table>
                  </fieldset>
                </form>
              </div>
              <Button className="fixed" size="full" background="blue80" title="확인" height={56} onClick={handleCloseDimm} />
            </MobBottomArea>
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

        <div className="mypage-state-sec dealer-service-sec">
          <div className="mypage-admin-title">
            <h3>홈서비스 예약/판매 현황</h3>
          </div>
          <div className="list-wrap">
            <table className="table-tp1 input search" summary="조회 영역">
              <caption className="away">조회 영역</caption>
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
                  <th>판매완료일</th>
                  <td>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} resetSignal={!dateReset} onChange={onClickBtnClick} inputHeight={40} inputWidth={160} StartDate={3} limitDate={6} />
                    {/* <HistoryFilter limitationYear={0.5} onChangeDate={onChangeDate} params={dateParams} maxLimitationYear={0} /> */}
                    {/* limitationYear => 0.5년은 6개월 */}
                    {/* maxLimitationYear => 0은 오늘까지. 1은 1년뒤까지 가능*/}
                  </td>
                  <td>
                    <Button size="mid" background="blue80" title="조회" width={110} height={40} marginLeft={0} onClick={onClickSearchBtn} />
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

            <p className="inquire-num mb16">차량 수 : 총 {recordCount}대</p>

            {!isEmpty(homeServiceList) &&
              homeServiceList.map((item, index) => {
                return (
                  <table className="table-tp1" summary="차량정보에 대한 내용" key={index}>
                    <caption className="away">차량정보</caption>
                    <colgroup>
                      <col width="31.5%" />
                      <col width="12.5%" />
                      <col width="16%" />
                      <col width="20%" />
                      <col width="20%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td rowSpan="6" className="img-cover">
                          <div className="img-wrap">
                            <img src={`${baseImgUrl}${item.phtUrl}`} alt="차량 이미지" />
                          </div>
                          {/* <span className="state">{item.cdNm}</span> */}
                          {/* <Button size="full" line="blue80" color="blue80" title={item.cdNm} height={48} marginTop={12} disabled={true} buttonMarkup={true} /> */}
                          <span className="btn-base tx-blue80 line-blue80 full fake-btn">{item.cdNm}</span>
                        </td>
                        <th>차량정보</th>
                        <td colSpan="3" className="car-info">
                          {item.crNm}
                          <Button color="blue80" title="바로가기" width={100} key={item.dlrPrdId} buttonMarkup={true} onClick={(e) => goCarListClick(e, item)} />
                        </td>
                      </tr>
                      <tr>
                        <th>차량번호</th>
                        <td colSpan="3">{item.crNo}</td>
                      </tr>
                      <tr>
                        <th>계약자</th>
                        <td>{item.nom}</td>
                        <th>등록일</th>
                        <td>{item.updDt}</td>
                      </tr>
                      <tr>
                        <th>휴대폰 번호</th>
                        <td>{item.hpNoEnc}</td>
                        <th>EW상품</th>
                        <td>{item.prdNm}</td>
                      </tr>
                      <tr>
                        <th>배송주소</th>
                        <td colSpan="3">
                          ({item.zcd}){item.addr1} {item.addr2}
                        </td>
                      </tr>
                      <tr>
                        <th>차량금액</th>
                        <td>{nf.format(item.crAmt)}원</td>
                        <th>
                          총 결제금액
                          <Tooltip placement="bottom" width={450} simple={true}>
                            <TooltipItem>
                              <i className="ico-question" />
                            </TooltipItem>
                            <TooltipCont>
                              <table className="table-tp1 total-pay" summary="총 결제금액에 대한 내용">
                                <caption className="away">총 결제금액</caption>
                                <colgroup>
                                  <col width="50%" />
                                  <col width="50%" />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th>차량가격</th>
                                    <td>{nf.format(item.crAmt)}원</td>
                                  </tr>
                                  <tr>
                                    <th>이전 관리비</th>
                                    <td>{nf.format(item.rdpmMgmtAmt)}원</td>
                                  </tr>
                                  <tr>
                                    <th>현대 글로비스 오토벨 보증비</th>
                                    <td>{nf.format(item.atbWrntAmt)}원</td>
                                  </tr>
                                  <tr>
                                    <th>탁송비</th>
                                    <td>{nf.format(item.deliAmt)}원</td>
                                  </tr>
                                  <tr>
                                    <th>총 결제금액</th>
                                    <td>{nf.format(item.crAmt + item.rdpmMgmtAmt + item.atbWrntAmt + item.deliAmt)}원</td>
                                  </tr>
                                  <tr>
                                    <th>결제방식</th>
                                    <td>{item.athMthdDvcd === '001' ? '할부' : item.athMthdDvcd === '002' ? '계좌이체' : '할부 + 계좌이체'}</td>
                                  </tr>
                                  <tr>
                                    <th>이체금액</th>
                                    <td>1,000원</td>
                                  </tr>
                                </tbody>
                              </table>
                            </TooltipCont>
                          </Tooltip>
                        </th>
                        <td>{nf.format(item.crAmt + item.rdpmMgmtAmt + item.atbWrntAmt + item.deliAmt)}원</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            {isEmpty(homeServiceList) && (
              <div className="list-none">
                <p>
                  <i className="ico-notify-big" />
                  예약이 없습니다.
                </p>
              </div>
            )}
            <PageNavigator className={'mt32'} currentPage={pageNo} recordCount={recordCount} recordSize={recordSize} changed={clickPageNavi} />
            <div className="essential-point">
              <ul>
                <li>
                  <i className="ico-dot mid" />
                  구매자가 구매확정 시 차량대금이 정산 및 입금됩니다. (구매확정일로부터 3영업일 이내)
                </li>
                <li>
                  <i className="ico-dot mid" />
                  홈서비스 구매신청이 접수된 경우 판매자분께 유선으로 홈서비스 진행여부를 확인한 뒤, 홈서비스 고객 상담이 진행됩니다.
                  <br />
                </li>
                <li>
                  <i className="ico-dot mid" />
                  홈서비스 담당자의 전화를 꼭 받아주세요.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
});

HomeServiceStatus.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

HomeServiceStatus.propTypes = {
  query: PropTypes.object,
  router: PropTypes.object
};
HomeServiceStatus.displayName = 'HomeServiceStatus';

export default withRouter(HomeServiceStatus);
