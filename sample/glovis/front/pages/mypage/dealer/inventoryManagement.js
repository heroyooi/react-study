import React, { memo, useState, useEffect, useContext, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import Router, { withRouter } from 'next/router';
import { PulseLoader } from 'react-spinners';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import CheckBox from '@lib/share/items/CheckBox';
import PageNavigator from '@src/components/common/PageNavigator';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { SystemContext } from '@src/provider/SystemProvider';
import { getInventoryList } from '@src/actions/mypage/dealer/inventory/inventoryAction';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import { axiosPost } from '@src/utils/HttpUtils';
import { objIsEmpty, preventScroll } from '@src/utils/CommonUtil';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const InventoryManagement = memo(({ query }) => {
  const { pageNo = 1 } = query;
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '재고관리',
          options: ['back']
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

  const nf = Intl.NumberFormat();
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { inventoryList, recordSize, recordCount } = useSelector((state) => state.inventory);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [isCheckedAllTable, setIsCheckedAllTable] = useState(false);
  const [isCheckedTable, setIsCheckedTable] = useState([]);
  const [selInvenNoArray, setSelInvenNoArray] = useState([]);
  const [dateReset] = useState(true);
  const [startDt, setStartDt] = useState(moment().subtract(3, 'Months'));
  const [endDt, setEndDt] = useState(moment());
  const [excelFile, setExcelFile] = useState('');
  const [detailRodalShow, setDetailRodalShow] = useState(false); //팝업 show hide
  const [rodalType, setRodalType] = useState('fade'); //팝업 type
  const [isFromCalPopOpen, setIsFromCalPopOpen] = useState(false);
  const [isToCalPopOpen, setIsToCalPopOpen] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [mobInventoryList, setMobInventoryList] = useState([]);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const mobCurrentPage = useRef(1);

  const [ckOptions, setCkOptions] = useState([
    { value: '0010', checked: false },
    { value: '0020', checked: false },
    { value: '0030', checked: false }
  ]);

  const processState = [
    { value: '0010', title: '광고대기' },
    { value: '0020', title: '광고중' },
    { value: '0030', title: '판매완료' }
  ];

  const checkedbtnArray = [
    { clicked: true, line: 'blue80', color: 'blue80', title: '3개월', type: '3m', unit: 'months', value: 3 },
    { clicked: false, line: 'gray', color: 'black', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '15일', type: '15d', unit: 'days', value: 15 },
    { clicked: false, line: 'gray', color: 'black', title: '1주일', type: '1w', unit: 'weeks', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '오늘', type: 'today', unit: 'days', value: 0 }
  ];

  const handleBtnFilterClick1 = (e, deps) => {
    setStartDt(moment().add(deps.value * -1, deps.unit));
    setEndDt(moment());
  };

  const onClickBtnClick = (e) => {
    setStartDt(e.fromDate);
    setEndDt(e.endDate);
  };

  // 재고관리 선택삭제
  const onClickExcelDel = () => {
    console.log('삭제 리스트 =>> ', selInvenNoArray);
    const urlParam = '/api/deleteInventoryManagementList.do';
    const returnMessage = '삭제되었습니다.';

    axiosPost(urlParam, { CmntIDList: selInvenNoArray })
      .then(({ data }) => {
        console.log(data);
        if (data.result.returncd === '000') {
          showAlert(returnMessage, 'inventory_remove');
          setIsCheckedAll(false);
          setIsChecked([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 재고관리 엑셀양식 다운로드
  const onClickExcelSample = (e) => {
    e.preventDefault();
    axiosPost(`/api/getIvtrMgmtExcelDownload.do`, null).then((res) => {
      if (res.data.statusinfo.returnmsg === '성공') {
        const fileName = res.data.data;
        console.log(fileName);
        document.location.href = `/api/cmm/file/excelDownload.do?fileName=${fileName}`;
      }
    });
  };

  // 재고관리 엑셀등록
  const onClickExcelEdit = (e) => {
    e.preventDefault();
    console.log('엑살파일 excelFile ==>> ', excelFile);
    if (excelFile === '' || excelFile === undefined) {
      showAlert('엑셀파일을 선택하세요.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('excelFile', excelFile);

    axiosPost('/api/insertIvtrMgmtExcel.do', formData)
      .then(({ data }) => {
        if (data.statusinfo.returncd === '000') {
          console.log(data.data);
          showAlert('등록 되었습니다.', 'upload');
        }
      })
      .catch((error) => {
        document.getElementById('excelFile').value = '';
        showAlert('등록 에러!!' + error, 'error');
      });
  };

  //업로드 팝업 열기
  const inventoryRodalOpenHandler = (type) => {
    setDetailRodalShow(true);
    setRodalType(type);
    preventScroll(true);
  };

  //업로드 팝업 닫기
  const inventoryRodalCloseHandler = () => {
    setDetailRodalShow(false);
    setExcelFile('');
    document.getElementById('excelFile').value = '';
    preventScroll(false);
  };

  //엑셀파일 선택
  const onChangeExcel = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const ext = file.name.split('.')[1].toUpperCase();
    console.log(file, ext);
    if (ext !== 'XSL' && ext !== 'XLSX') {
      document.getElementById('excelFile').value = '';
      showAlert('엑셀파일만 업로드가 가능합니다.', 'error');
      return;
    }
    setExcelFile(file);
  };

  const onChangeCheckboxAllTable = (e) => {
    if (e.target.checked) {
      setSelInvenNoArray(
        inventoryList.map((comment) => {
          return comment.seqNo;
        })
      );
    } else {
      setSelInvenNoArray([]);
    }
    inventoryList.map((val, index) => {
      isCheckedTable[index] = e.target.checked;
    });
    setIsCheckedTable([...isCheckedTable]);
    setIsCheckedAllTable(!isCheckedAllTable);
  };

  const onChangeCheckboxTable = (e) => {
    console.log('e.target.id => ', e.target.id);
    const idx = e.target.id.split('chk-my-ex')[1];
    console.log('idx => ', idx);
    console.log('inventoryList[idx] => ', inventoryList[idx]);
    if (e.target.checked) {
      setSelInvenNoArray([...selInvenNoArray, inventoryList[idx].seqNo]);
    } else {
      selInvenNoArray.splice(selInvenNoArray.indexOf(inventoryList[idx].seqNo), 1);
      setSelInvenNoArray([...selInvenNoArray]);
    }
    isCheckedTable[idx] = !isCheckedTable[idx];
    setIsCheckedTable([...isCheckedTable]);
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

      dispatch(getInventoryList(searchData));
    },
    [ckOptions, dispatch, endDt, pageNo, recordSize, startDt]
  );

  const clickPageNavi = (clickedPageNo) => {
    Router.push(`/mypage/dealer/inventoryManagement?pageNo=${clickedPageNo}`);
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

  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((mobCurrentPage.current - 1) * recordSize > mobInventoryList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지\
      setIsLoadingImage(true); // 로딩이미지 on
      mobCurrentPage.current++;
      clickPageNavi(mobCurrentPage.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag, mobInventoryList, dispatch, mobCurrentPage]);

  useEffect(() => {
    if (Confirm.state === 'success') {
      if (Confirm.callback === 'remove') {
        onClickExcelDel();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Confirm]);

  useEffect(() => {
    if (Alert.state !== 'show' && Alert.callback === 'inventory_remove') {
      window.location.reload();
      window.scrollTo(0, 0);
    }
    if (Alert.state !== 'show' && Alert.callback === 'upload') {
      window.location.reload();
      window.scrollTo(0, 0);
    }
  }, [Alert]);

  useEffect(() => {
    dispatch(
      getInventoryList({
        pageNo,
        recordSize,
        startDt: moment(startDt).format('YYYY-MM-DD'),
        endDt: moment(endDt).format('YYYY-MM-DD'),
        slSttCd: null
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
    setLoadingFlag(true);
    if (inventoryList) {
      setMobInventoryList(mobInventoryList.concat(inventoryList));
    }
    setIsLoadingImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, mobInventoryList]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="inventory-sec">
          <div className="content-wrap pt20">
            <p className="tx-exp-tp5 tx-gray">&#8251; 차량 등록은 [PC]마이페이지&gt;내차 팔기&gt;재고관리에서 등록하실 수 있습니다.</p>
            <ul className={objIsEmpty(mobInventoryList) ? 'm-toggle-list search mb0 none' : 'm-toggle-list search mb0'}>
              <MenuItem>
                <MenuTitle>
                  <p className="tit2">재고관리</p>
                  <span>상세조회</span>
                </MenuTitle>
                <MenuCont>
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
              {objIsEmpty(mobInventoryList) ? (
                <></>
              ) : (
                <li>
                  <div className="float-wrap">
                    <p>
                      {startDt.format('YYYY.MM.DD')} ~ {endDt.format('YYYY.MM.DD')}
                    </p>
                    <p>
                      총 <span className="tx-blue80">{(mobInventoryList || []).length}</span>건
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className="list-wrap content-border">
            {objIsEmpty(mobInventoryList) ? (
              <div className="list-none-wrap">
                <p className="list-none">조회조건에 해당하는 내역이 없습니다.</p>
              </div>
            ) : (
              <table summary="딜러정보 관리" className="table-tp1 th-c td-c">
                <caption className="away">딜러정보 관리</caption>
                <colgroup>
                  <col width="30%" />
                  <col width="22%" />
                  <col width="20%" />
                  <col width="28%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>등록일</th>
                    <th>차량번호</th>
                    <th>판매여부</th>
                    <th>매입가</th>
                  </tr>
                  <tr>
                    <th>판매일</th>
                    <th colSpan="2">차량명</th>
                    <th>판매가</th>
                  </tr>
                </thead>
                <tbody>
                  {(mobInventoryList || []).map((v, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr>
                          <td>{v.stckRegDt}</td>
                          <td>{v.crNo}</td>
                          <td>{v.slYn}</td>
                          <td>{nf.format(Math.ceil(parseInt(v.prchAmt) / 10000))}만</td>
                        </tr>
                        <tr>
                          <td>{v.slDt}</td>
                          <td colSpan="2">{v.crNm}</td>
                          <td>{nf.format(Math.ceil(parseInt(v.slAmt) / 10000))}만</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  {isLoadingImage === true ? (
                    <div className="more-loading">
                      <PulseLoader size={15} color={'#ddd'} loading={true} />
                    </div>
                  ) : null}
                </tbody>
              </table>
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

        <div className="mypage-state-sec inventory-sec">
          <div className="mypage-admin-title">
            <h3>재고관리</h3>
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
                  <th>등록일자</th>
                  <td>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} resetSignal={!dateReset} onChange={onClickBtnClick} inputHeight={40} inputWidth={160} StartDate={3} />
                  </td>
                  <td>
                    <Button size="mid" background="blue80" title="조회" width={114} height={40} marginLeft={16} onClick={(e) => onClickSearchBtn(e)} buttonMarkup={true} />
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

            <div className="tx-list" style={{ marginTop: '0px' }}>
              <ul className="float-wrap">
                <li>
                  <Button size="mid" background="blue80" title="선택삭제" width={100} height={32} buttonMarkup={true} onClick={() => showConfirm('삭제 하시겠습니까?', 'remove')} />
                </li>
                <li>
                  <Button size="mid" background="blue80" title="양식다운" width={100} height={32} onClick={onClickExcelSample} buttonMarkup={true} />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="mid" background="blue80" title="엑셀등록" width={100} height={32} onClick={(e) => inventoryRodalOpenHandler('slideUp')} buttonMarkup={true} />
                </li>
              </ul>
              <table summary="재고 관리" className="table-tp1 th-c td-c">
                <caption className="away">재고 관리</caption>
                <colgroup>
                  <col width="6%" />
                  <col width="7%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="11%" />
                  <col width="13%" />
                  <col width="13%" />
                  <col width="12%" />
                </colgroup>
                <thead>
                  <tr>
                    <th>
                      <CheckBox id="chk-my-ex-all" checked={isCheckedAllTable} onChange={onChangeCheckboxAllTable} />
                    </th>
                    <th />
                    <th>등록일자</th>
                    <th>차량번호</th>
                    <th>차량명</th>
                    <th>판매여부</th>
                    <th>매입가</th>
                    <th>판매가</th>
                    <th>판매일자</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(inventoryList) &&
                    inventoryList.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <CheckBox id={'chk-my-ex' + i} checked={isCheckedTable[i]} onChange={onChangeCheckboxTable} />
                          </td>
                          <td>{v.rnum}</td>
                          <td>{v.stckRegDt}</td>
                          <td>{v.crNo}</td>
                          <td>{v.crNm}</td>
                          <td>{v.slYn}</td>
                          <td>{nf.format(v.prchAmt)}</td>
                          <td>{nf.format(v.slAmt)}</td>
                          <td>{v.slDt}</td>
                        </tr>
                      );
                    })}
                  {isEmpty(inventoryList) && (
                    <>
                      <tr>
                        <td colSpan="9">검색결과가 없습니다.</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              {/* <Buttons align="right" marginTop={33}>
                <Button size="big" background="blue80" title="재고차량 등록" width={150} height={48} onClick={(e) => rodalPopupHandler(e, 'fade')} />
              </Buttons> */}
              <div style={{ marginTop: '20px' }}>
                <PageNavigator currentPage={pageNo} recordCount={recordCount} recordSize={recordSize} changed={clickPageNavi} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RodalPopup show={detailRodalShow} type={rodalType} closedHandler={inventoryRodalCloseHandler} mode="normal" width={600}>
        <div className="popup-inventory">
          <div style={{ marginBottom: '20px' }}>
            <h3>엑셀등록</h3>
          </div>
          <table summary="재고 관리" className="table-tp1 th-c td-c">
            <caption className="away">재고 관리</caption>
            <colgroup>
              <col width="30%" />
              <col width="*%" />
            </colgroup>
            <tbody>
              <tr style={{ border: 'unset' }}>
                <th style={{ border: 'unset' }}>엑셀 선택</th>
                <td style={{ border: 'unset' }}>
                  <input type="file" id="excelFile" name="excelFile" onChange={onChangeExcel} />
                </td>
              </tr>
            </tbody>
          </table>
          <Buttons align="center" marginTop={32}>
            <Button size="big" background="gray" title="취소" width={130} height={48} buttonMarkup={true} onClick={inventoryRodalCloseHandler} />
            <Button size="big" background="blue80" title="등록" width={130} height={48} buttonMarkup={true} onClick={onClickExcelEdit} />
          </Buttons>
        </div>
      </RodalPopup>
    </AppLayout>
  );
});

InventoryManagement.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};

InventoryManagement.propTypes = {
  query: PropTypes.object
};

InventoryManagement.displayName = 'InventoryManagement';

export default withRouter(InventoryManagement);
