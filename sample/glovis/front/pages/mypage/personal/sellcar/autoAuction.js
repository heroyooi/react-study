/**
 * 설명 : 스마트옥션 출품내역
 * @fileoverview 마이페이지(일반)>내차팔기>스마트옥션 출품내역
 * @requires [autoAuction] 스마트옥션 안내 페이지
 * @author 박진하
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';
import { isEmpty, orderBy } from 'lodash';
import moment from 'moment';
import { produce } from 'immer';
import { ClipLoader } from 'react-spinners';

import Button from '@lib/share/items/Button';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import MobSelectList from '@lib/share/items/MobSelectList';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import RadioGroup from '@lib/share/items/RadioGroup';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
import PageNavigator from '@src/components/common/PageNavigator';
import { getMemberExhibitList, setLoadingImageMobile, getCommonCodeList } from '@src/actions/mypage/personal/sellcar/autoAuctionAction';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { preventScroll } from '@src/utils/CommonUtil';
import { axiosPost, apiUrl } from '@src/utils/HttpUtils';
import { isLogin, gInfoLive } from '@src/utils/LoginUtils';

/**
 * 설명 : 스마트옥션 출품내역을 조회하고 스마트옥션안내 페이지를 호출한다.
 * @param {state.personalAuction.exhibitCarList} 출품내역
 * @returns {AutoAuction} 스마트옥션 출품내역
 */

// 5/7 오토옥션 안되는 부분
// 검색조건데이터
// 토탈검색수

const AutoAuction = ({ query }) => {
  const { result } = query;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // 로딩 여부. 로딩중일시 true 완료시 false로 설정.
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const nf = new Intl.NumberFormat();
  //날짜 출력 폼
  const getDate = (dateTime) => {
    if (dateTime !== undefined) {
      return dateTime.split(' ')[0];
    }
    return '';
  };

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '스마트옥션 출품내역',
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

  const exhibitList = useSelector((state) => orderBy(state.personalAuction.exhibitCarList, ['actuId'], ['desc']));
  const totalRecordCount = useSelector((state) => state.personalAuction.totalRecordCount);
  const [searchForm, setSearchForm] = useState({
    mbId: gInfoLive().id,
    auctId: '',
    searchType: '',
    searchRound: '',
    fromDate: moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    pageNo: 1,
    pageQtt: 10
  });

  const searchAuctionHouse = [
    { id: 'radio_house_1', value: '', checked: true, disabled: false, label: '전체' },
    { id: 'radio_house_2', value: '1100', checked: false, disabled: false, label: '분당' },
    { id: 'radio_house_3', value: '2100', checked: false, disabled: false, label: '시화' },
    { id: 'radio_house_4', value: '3100', checked: false, disabled: false, label: '양산' }
  ];

  const searchTypeList = [
    { value: '', label: '전체' },
    { value: '01', label: '경매대기' },
    { value: '00', label: '경매진행' },
    { value: '02', label: '낙찰' },
    { value: '03', label: '유찰' },
    { value: '04', label: '상담접수' },
    { value: '05', label: '상담체결' },
    { value: '06', label: '낙찰취소' },
    { value: '07', label: '상담취소' },
    { value: '08', label: '출품취소' }
  ];

  const checkedbtnArray = [
    { clicked: false, line: 'gray', color: 'black', title: '1주일', type: '1w', unit: 'weeks', value: 1 },
    { clicked: true, line: 'blue80', color: 'blue80', title: '1개월', type: '1m', unit: 'months', value: 1 },
    { clicked: false, line: 'gray', color: 'black', title: '3개월', type: '3m', unit: 'months', value: 3 }
  ];

  const onChangeRadio = (e) => {
    const { value } = e.target;
    setSearchForm(
      produce((draft) => {
        draft.auctId = value;
      })
    );
  };

  const onChangeSelect = (e) => {
    setSearchForm(
      produce((draft) => {
        draft.searchType = e.value;
      })
    );
  };

  const onClickBtnClick = (e) => {
    setSearchForm(
      produce((draft) => {
        draft.fromDate = e.fromDate;
        draft.endDate = e.endDate;
      })
    );
  };

  const onChangeInput = (e) => {
    if (e.target.id === 'searchRound') {
      setSearchForm(
        produce((draft) => {
          draft.searchRound = e.target.value;
        })
      );
    }
  };

  const onClickSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(getMemberExhibitList({ ...searchForm, pageNo: 1 })).then(() => {
      setIsLoading(false);
    });
  };

  const onLinkCarInfo = (e, data) => {
    e.preventDefault();
    console.log(data);
    console.log(data.goodNo, data.goodNoEnc);
    console.log(data.auctId, data.auctIdEnc);
    console.log(data.auctNo, data.auctNoEnc);
    let linkUrl = '/mypage/myCarSellView.do';
    //let linkUrl = '/memcompany/memAuctionView.do';
    if (apiUrl.includes('https')) {
      //오토옥션주소 (운영)
      linkUrl = 'https://www.glovisaa.com' + linkUrl;
    } else {
      //오토옥션주소 (개발)
      linkUrl = 'http://dev-www.glovisaa.com' + linkUrl;
    }
    linkUrl += `?gn=${encodeURIComponent(data.goodNoEnc)}`; // goodNo
    linkUrl += `&rc=${encodeURIComponent(data.auctIdEnc)}`; //경매장코드
    linkUrl += `&atn=${encodeURIComponent(data.auctNoEnc)}`; // 경매회차
    window.open(linkUrl, '_blank', 'width=1250, height=950, toolbar=no, scrollbars=yes, location=no, menubar=no');
  };

  console.log('searchForm >>>>>>>>>>>>>>>>>>>>', searchForm);

  const openOpenPop = (e, data, target) => {
    e.preventDefault();
    console.log(data);

    const apiParam = {
      rc: data.auctId,
      gn: data.goodNo,
      atn: data.auctNo,
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
      }
    });
  };

  const clickPageNavi = (e, clickedPageNavi) => {
    setSearchForm(
      produce((draft) => {
        draft.pageNo = clickedPageNavi;
      })
    );
    setIsLoading(true);
    dispatch(getMemberExhibitList({ ...searchForm, pageNo: clickedPageNavi })).then(() => {
      setIsLoading(false);
    });
  };

  if (hasMobile) {
    const exhibitList = useSelector((state) => orderBy(state.personalAuction.exhibitCarList, []));
    // const { exhibitList, autoAuctionSearchType } = useSelector((state) => state.personalAuction, []);
    const autoAuctionSearchType = useSelector((state) => state.personalAuction.autoAuctionSearchType, []);

    //검색조건 Default Value를 1로 지정
    const [startDt, setStartDt] = useState(
      moment()
        .subtract(1, 'month')
        .format('YYYY-MM-DD')
    );
    const [endDt, setEndDt] = useState(moment().format('YYYY-MM-DD'));

    //페이지 실행될때 검색조건 데이터 가져옴.
    useEffect(() => {
      dispatch(getCommonCodeList('AM057')); // 검색조건
    }, [dispatch]);

    // 검색조건 더미데이터
    const searchSttDvcd = [
      { id: 'radio_auction_1', value: 1, checked: true, disabled: false, label: '전체' },
      { id: 'radio_auction_2', value: 2, checked: false, disabled: false, label: '경매대기' },
      { id: 'radio_auction_3', value: 3, checked: false, disabled: false, label: '경매진행' },
      { id: 'radio_auction_4', value: 4, checked: false, disabled: false, label: '낙찰' },
      { id: 'radio_auction_5', value: 5, checked: false, disabled: false, label: '유찰' },
      { id: 'radio_auction_6', value: 6, checked: false, disabled: false, label: '출품취소' }
    ];

    //검색 조건 저장 테이블
    //신청상태
    const [sttDvcd, setSttDvcd] = useState();
    //회차번호
    const [auctNo, setAuctNo] = useState();
    //검색시작날짜
    const [fromDate, setFromDate] = useState(
      moment()
        .subtract(1, 'month')
        .format('YYYY-MM-DD')
    );
    //검색 끝 날짜
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

    //토탈 검색수(수정예정)
    // const totalCnt = exhibitList === null ? '0' : exhibitList.length;
    //총 데이터 갯수
    const totalCount = exhibitList === null ? '0' : exhibitList[0]?.totalRecordCount;

    //달력 팝업
    const [calPop1, setCalPop1] = useState(false);
    const [calPop2, setCalPop2] = useState(false);

    //페이징
    const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
    const [currentPage, setCurrentPage] = useState(1); // 현재페이지

    //달력기간 시작점 달력 오픈 팝업
    const handleCalendarPop1 = (e) => {
      e.preventDefault();
      setCalPop1(true);
      preventScroll(true);
    };

    //달력기간 끝점 달력 오픈 팝업
    const handleCalendarPop2 = (e) => {
      e.preventDefault();
      setCalPop2(true);
      preventScroll(true);
    };

    // 달력 기간별 선택버튼
    const handleBtnFilterClick1 = (label, e) => {
      console.log(label);
      const newdate = moment().subtract(e.value, 'month');
      console.log('달력기간선택 newdate : ', newdate.format('YYYY-MM-DD'));
      setFromDate(newdate.format('YYYY-MM-DD'));
    };

    //달력 날짜 시작점 변경시 발생이벤트
    const calendarCallback1 = (e, date) => {
      e.preventDefault();
      setFromDate(date.format('YYYY-MM-DD'));
      setCalPop1(false);
      preventScroll(false);
    };

    //달력 기간 끝점 변경시 발생 이벤트
    const calendarCallback2 = (e, date) => {
      e.preventDefault();
      setEndDate(date.format('YYYY-MM-DD'));
      setCalPop2(false);
      preventScroll(false);
    };

    //달력 팝업 종료
    const calendarClose = (e) => {
      e.preventDefault();
      setCalPop1(false);
      setCalPop2(false);
      preventScroll(false);
    };

    //검색폼 저장
    const searchForm = {
      mbId: gInfoLive().id,
      auctId: '', //경매장코드
      searchType: '', //경매구분
      searchRound: '', //경매회차
      fromDate: '', //검색시작일
      endDate: '', //검색마감일
      pageQtt: 10
    };

    const [selectedSttDvcd, setSelectedSttDvcd] = useState(null);

    //검색 타입 지정
    const onClickSearchType = (value, e) => {
      if (e.value === 1) {
        setSttDvcd(undefined);
      } else {
        setSttDvcd(e.codeValue);
      }
      setSelectedSttDvcd(e);
      console.log('searchType : ', e, e.value, e.label);
    };

    //회차검색
    const onChangeMobInput = (e) => {
      if (e.target.value !== '') {
        setAuctNo(e.target.value);
      } else {
        setAuctNo(undefined);
      }
      console.log('auctNo : ', e.target.value);
    };

    //처음 렌더링 이후 스마트옥션 데이터 검색
    // useEffect(() => {
    //   if (isEmpty(exhibitList)) {
    //     dispatch(getMemberExhibitList(searchForm));
    //   }
    // }, [dispatch, exhibitList, searchForm]);

    // Mobile, 더보기
    const onScroll = () => {
      const target = document.querySelector('#wrap');
      if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
        // 현재 띄워진 데이터의 갯수와 총 데이터의 갯수를 비교해서 페이징 할지 안할지
        // if ((currentPage.current - 1) * ITEMS_PER_PAGE > exhibitList.length) return;
        if (totalCount <= (exhibitList?.length || 0)) return;

        setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
        dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
        setCurrentPage(currentPage + 1);
        // console.log('mob onScroll : ', window.scrollY, searchForm, currentPage);
      }
    };

    useEffect(() => {
      setLoadingFlag(true);
    }, [exhibitList]);

    useEffect(() => {
      if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
      return () => {
        if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
      };
    }, [hasMobile, onScroll, exhibitList]);

    //검색
    const onClickSearch = (e) => {
      e.preventDefault();
      searchForm.mbId = gInfoLive().id;
      searchForm.searchType = sttDvcd;
      searchForm.searchround = auctNo;
      searchForm.fromDate = fromDate;
      searchForm.endDate = endDate;
      console.log('searchForm : ', searchForm);
      // 검색하면 다시 페이지 1페이지로 초기화
      setCurrentPage(1);
      // 현재 검색조건 출력부 띄우기용 데이터 저장
      setStartDt(fromDate);
      setEndDt(endDate);
      dispatch(getMemberExhibitList(searchForm));
    };

    //로그인 감지부분
    useEffect(() => {
      console.log('sellcar::', isLogin());
      console.log('gInfo type : ', gInfoLive().type, 'ginfo membertype : ', gInfoLive().membertype);
      if (!isLogin()) {
        location.href = '/login';
      }
      // else if( gInfoLive().membertype === UserType.MEMBER){
      else if (gInfoLive().type === 'member') {
        const mbId = gInfoLive().id;
        // const pageNo = currentPage;
        const pageQtt = 10 * currentPage;
        dispatch(getMemberExhibitList(searchForm));
      }
    }, [currentPage]);

    return (
      <AppLayout>
        <div className="mypage-state-sec general-sell-sec">
          <div className="content-wrap">
            <div className="essential-point tp2 fs12 mt20 pd0">
              <ul>
                <li>&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</li>
                <li>&#8251; 출품하신 차량에 출품취소(접수취소) 및 반출신청을 원하시면 경매장 출품담당자에게 문의하여 주시기 바랍니다.</li>
                <li>&#8251; 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</li>
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
                    {/* 이부분 경매구분 검색하는 조건 데이터 리스트? */}
                    {/* <MobSelectBox options={searchSttDvcd} width="70%" value={sttDvcd} onChange={onClickSearchType} /> */}
                    <MobSelectList
                      width="70%"
                      itemsSource={autoAuctionSearchType}
                      selectedItem={selectedSttDvcd}
                      displayMemberPath={'label'}
                      selectedValuePath={'value'}
                      placeHolder="전체"
                      onClick={onClickSearchType}
                    />
                  </div>
                  <div className="float-wrap mb16">
                    <p className="movie-link-wrap">경매회차</p>
                    <Input type="text" height={40} id="searchRound" placeHolder="" value={auctNo} width="70%" onBlur={onChangeMobInput} />
                  </div>
                  <MobButtonFilter
                    checkList={[
                      { title: '1개월', checked: true, value: '1' },
                      { title: '3개월', checked: false, value: '3' },
                      { title: '6개월', checked: false, value: '6' },
                      { title: '1년', checked: false, value: '12' }
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
                    <DatePicker defaultValue={fromDate} width="46%" onClick={handleCalendarPop1} />
                    <em className="from">~</em>
                    <DatePicker defaultValue={endDate} width="46%" onClick={handleCalendarPop2} />
                  </div>
                  {/* <Input type="text" height={40} placeHolder="차량명을 검색하세요" marginTop={8} /> */}
                  <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={16} onClick={(e) => onClickSearch(e)} />
                </MenuCont>
              </MenuItem>
              <li>
                <div className="float-wrap">
                  <p>
                    {startDt} ~ {endDt}
                  </p>
                  <p>
                    총 <span className="tx-blue80">{totalCount}</span>건
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="list-wrap content-border">
            {!isEmpty(exhibitList) ? (
              <div className="goods-list admin-list tp6 mt8">
                <ul>
                  {exhibitList.map((lists, index) => {
                    return (
                      <li key={index} onClick={(e) => onLinkCarInfo(e, lists)}>
                        <div className="summary">
                          <div className="info-wrap mt0">
                            <div className="info">
                              <span>
                                {/* 회차(일자) */}
                                {lists.auctNo}회 ({getDate(lists.auctDt)})
                              </span>
                              {/* 출품번호 */}
                              <span>{lists.exhibitNo}번</span>
                              {/* 평가 */}
                              <span>{lists.eval}</span>
                            </div>
                            {/* 진행상태 구분 => 승인, 진행부분 텍스트 파란색, 나머지 회색 */}
                            {lists.sttDvcd === '02' || lists.sttDvcd === '03' ? <p className="fr tit5 tx-blue80">{lists.sttNm}</p> : <p className="fr tit5 tx-gray">{lists.sttNm}</p>}
                          </div>
                          {/* 차량명 */}
                          <h5 className="subject">{lists.crNm}</h5>
                          <div className="info-wrap mt16">
                            <div className="info tx-b">
                              {/* 시작가, 희망가, 탁송상태 */}
                              <span>시작가: {nf.format(lists.starPrice)}</span>
                              <span>희망가: {nf.format(lists.hopePrice)}</span>
                              <span>탁송상태: {lists.consignNm}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="search-none pd0" style={{ height: '176px' }}>
                <p className="tx-black tx-n mt0 tx">조회하신 내용이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
        {
          <>
            <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
              <MobCalendar date={startDt} callback={calendarCallback1} />
            </MobBottomArea>
            <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
              <MobCalendar date={endDt} callback={calendarCallback2} />
            </MobBottomArea>
          </>
        }
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
      <div className="content-wrap">
        <MypageNavi />

        <div className="mypage-state-sec general-sell-sec">
          <div className="mypage-admin-title" style={{ marginBottom: '90px' }}>
            <h3>스마트옥션 출품내역</h3>
            <span style={{ float: 'left' }}>
              <p className="tx-exp-tp5">&#8251; 경매 출품한 차량의 진행상황을 확인할 수 있습니다.</p>
              <p className="tx-exp-tp5">&#8251; 현황 조회만 가능하며, 상세 정보 확인 및 업무처리는 경매프로그램을 통해 진행하실 수 있습니다.</p>
            </span>
            <span style={{ float: 'right' }}>
              <Button className="fr" size="big" background="blue80" title="경매프로그램 안내" width={181} height={48} href="/autoAuction/auctionInfo?seq=1" />
            </span>
          </div>

          <div className="list-wrap">
            <table className="table-tp1 input search th-c" summary="조회 영역" style={{ marginBottom: '-5%' }}>
              <caption className="away">조회 영역</caption>
              <tbody>
                <tr>
                  <td>
                    <span className="title">경매장</span>
                    <RadioGroup className="items-sbox" dataList={searchAuctionHouse} defaultValue={searchForm.auctId} onChange={(e) => onChangeRadio(e)} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="title">구분</span>
                    <SelectBox id="searchType" className="items-sbox" options={searchTypeList} value={searchForm.searchType} width={120} height={40} onChange={onChangeSelect} />
                    <span className="title">회차</span>
                    <Input type="number" id="searchRound" placeHolder="" width={110} height={40} value={searchForm.searchRound} onChange={onChangeInput} />
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="title">기간</span>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} onChange={onClickBtnClick} inputHeight={40} inputWidth={180} limitDate={120} />
                    <Button size="mid" background="blue80" title="조회" width={100} height={40} marginLeft={130} onClick={(e) => onClickSearch(e)} />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="admin-list tp7">
              <table className="table-tp1 th-c td-c" summary="스마트옥션 출품내역에 대한 내용">
                <caption className="away">스마트옥션 출품내역</caption>
                <colgroup>
                  <col width="10%" />
                  <col width="10%" />
                  <col width="40%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
                  <col width="10%" />
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
                  {!isEmpty(exhibitList) &&
                    exhibitList.map((lists, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td rowSpan="2">
                              {lists.auctNo > 0 ? `${lists.auctNo}회` : '-'}
                              <br />
                              {lists.auctDt}
                            </td>
                            <td rowSpan="2">{lists.exhibitNo > 0 ? lists.exhibitNo : '-'}</td>
                            <td className="tx-l">
                              {lists.exhibitNo > 0 ? (
                                <div onClick={(e) => onLinkCarInfo(e, lists)} style={{ cursor: 'pointer' }}>
                                  {lists.crNm}
                                  <br />
                                  {lists.frmYyyy} | {lists.mssNm} | {lists.fuelNm} | {nf.format(lists.dspl)}cc | {lists.crClrNm}
                                </div>
                              ) : (
                                <>
                                  {lists.crNm}
                                  <br />
                                  {lists.frmYyyy} | {lists.mssNm} | {lists.fuelNm} | {nf.format(lists.dspl)}cc | {lists.crClrNm}
                                </>
                              )}
                            </td>
                            <td onClick={(e) => openOpenPop(e, lists, 'performancePop')} style={{ cursor: 'pointer' }}>
                              {lists.eval}
                            </td>
                            <td>{lists.sttNm ? lists.sttNm : '출품신청'}</td>
                            <td>{lists.consignNm}</td>
                            <td>
                              {lists?.sttDvcd !== '02' ? (
                                <Button size="sml" background="blue80" title="출품확인서" width={90} height={30} onClick={(e) => openOpenPop(e, lists, 'entryPop')} />
                              ) : (
                                <>
                                  <Button size="sml" background="blue80" title="출품확인서" width={90} height={30} onClick={(e) => openOpenPop(e, lists, 'entryPop')} />
                                  <br />
                                  <br />
                                  <Button size="sml" background="blue80" title="낙찰확인서" width={90} height={30} onClick={(e) => openOpenPop(e, lists, 'bidCfrmPop')} />
                                </>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="5" className="tx-l">
                              시작가 : <span className="tx-blue80">{nf.format(lists.starPrice / 10000)}</span> 만원 / 희망가 : <span className="tx-blue80">{nf.format(lists.hopePrice / 10000)}</span>{' '}
                              만원
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  {isEmpty(exhibitList) && (
                    <tr>
                      <td colSpan="7">조회된 출품 차량 정보가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <PageNavigator className="mt32" currentPage={searchForm.pageNo} recordCount={totalRecordCount ? totalRecordCount : 0} recordSize={10} changed={clickPageNavi} />
        </div>
      </div>
    </AppLayout>
  );
};

AutoAuction.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  const { pageNo = 1 } = query;

  await reduxStore.dispatch(
    getMemberExhibitList({
      mbId: gInfoLive().id,
      auctId: '',
      searchType: '',
      searchRound: '',
      fromDate: moment()
        .subtract(1, 'month')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      pageNo: pageNo,
      pageQtt: 10
    })
  );

  return { query };
};

export default withRouter(AutoAuction);
