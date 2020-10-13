/**
 * 회원 마이페이지 내차팔기 신청 현황
 * @fileOverview 회원 마이페이지 내차팔기 신청 현황
 * @requires sellCarAction
 * @author 김민철
 */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter, useRouter } from 'next/router';
import { isEmpty } from 'lodash';
import { produce } from 'immer';
import moment, { isDate } from 'moment';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import Login from '@src/components/common/popup/LoginPop';
import MobButtonFilter from '@src/components/common/MobButtonFilter';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import MobCalendar from '@lib/share/items/MobCalendar';
import RenderHelper from '@lib/share/render/helper';

import { transformText, preventScroll } from '@src/utils/CommonUtil';
import { isLogin, gInfoLive, UserType } from '@src/utils/LoginUtils';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { SystemContext } from '@src/provider/SystemProvider';
import SearchDatePickers from '@src/components/common/SearchDatePickers';
// import { selectSellcarListAction } from '@src/actions/sellcar/allSellcarSearchAction';
import { selectSellcarListAction, setLoadingImageMobile } from '@src/actions/sellcar/allSellcarSearchAction';
import { setComma } from '@src/utils/StringUtil';
import { axiosPost, imgUrl } from '@src/utils/HttpUtils';

import * as saleCarUtil from '@src/utils/sellcar/SaleCarUtil';
import { selfStt, REQ_STT_BIDDG, REQ_STT_PCNCL } from '@src/constant/mbSlReqStt';

/**
 * 회원 마이페이지 내차팔기 신청 현황
 * @returns {SellCar}
 */

const FETCH_STT = {
  LOADING: 'loading',
  HAVE_INFO: 'haveInfo',
  NO_INFO: 'noInfo'
};

const checkedbtnArray = [
  {
    clicked: true,
    line: 'gray',
    color: 'black',
    title: '1개월',
    type: '1m',
    unit: 'months',
    value: 1
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '3개월',
    type: '3m',
    unit: 'months',
    value: 3
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '6개월',
    type: '6m',
    unit: 'months',
    value: 6
  },
  {
    clicked: false,
    line: 'gray',
    color: 'black',
    title: '12개월',
    type: '1y',
    unit: 'years',
    value: 1
  }
];

const getDate = (dateTime) => {
  if (dateTime !== undefined) {
    return dateTime.split(' ')[0];
  }
  return '';
};

const getEstm = (req) => {
  if (req?.scdrEstmAmt) return setComma(req?.scdrEstmAmt) + '만원';
  else if (req?.prmrEstmAmt) return setComma(req?.prmrEstmAmt) + '만원';
  return '미정';
};

const MODE = {
  MEMBER: 'MEMBER',
  NONMEMBER: 'NONMEMBER'
};

const NAVMODE = {
  MEMBER: undefined,
  NONMEMBER: 'guest'
};

console.log('gInfoLive :::::::::::::: ', gInfoLive());
const getStt = (sellcar) => {
  let result = {};
  const { reqTpcd, reqSttTpcd, hh24AuctSttDvcd, auctSttDtlDvcd } = sellcar;
  if (reqTpcd === '00001') {
    // 방문평가
    result.sttNm = '';
  } else if (reqTpcd === '00002') {
    // 비교견적
    result = saleCarUtil.getState2(reqSttTpcd, hh24AuctSttDvcd, auctSttDtlDvcd);
  } else if (reqTpcd === '00003') {
    // 무평가
    result.sttNm = '';
  }
  return result;
};

const SellCar = ({ router }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [noneMemberInfo, setNoneMemberInfo] = useState({});

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내차 팔기 현황 조회',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 8,
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

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const { result, tabNo = 0 } = router.query;

  //라우터를 통해서 들어온 query값이 없으면 withoutList 값 할당
  const [withoutList, setWithoutList] = useState(result === 'no' ? true : false);

  useEffect(() => {
    const { id, type } = gInfoLive() || {};
    console.log('useEffect SellCar -> id', id);
    console.log('useEffect SellCar -> type', type);

    if (type === 'nonmember' && id) {
      // axiosPost('/sellcar/selectSellcarForExists.do', {mbStrPn:id}).then(res => {
      //   console.log("SellCar -> res", res)
      //   const { data, statusinfo } = res?.data
      //   console.log("SellCar -> statusinfo", statusinfo)
      //   console.log("SellCar -> data", data)

      // })
      axiosPost('/sellcar/selectSellcar.do', { mbStrPn: id }).then((res) => {
        console.log('SellCar -> res', res);
        const { data, statusinfo } = res?.data;
        console.log('SellCar -> statusinfo', statusinfo);
        console.log('SellCar -> data', data);
      });
    }
  }, []);

  if (hasMobile) {
    useEffect(() => {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '내차 팔기 현황 조회',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 8,
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
    }, [dispatch]);

    const { reqList } = useSelector((state) => state.sellCarStore, []);
    const totalCount = reqList[0]?.totalRecordCount;
    // const totalCount = useSelector((state) => state.sellCarStore.totalCount);
    //임시 회원처리
    // const mode = 'member';
    // const mode = gInfoLive().type;
    // const navMode = NAVMODE[mode];

    const [reqInfoFetchStt, setReqInfoFetchStt] = useState(FETCH_STT.LOADING);
    const [searchParams, setSearchParams] = useState({
      pageNo: 1,
      pageQtt: 10
    });
    const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
    const [currentPage, setCurrentPage] = useState(1); // 현재페이지

    // //달력 팝업
    // const [calPop1, setCalPop1] = useState(false);
    // const [calPop2, setCalPop2] = useState(false);
    // //달력 시작점 넣기(현재 날짜에서 1달 subtract해서 기본값 지정)
    // const [isDate1, setIsDate1] = useState(
    //   moment()
    //     .subtract(1, 'month')
    //     .format('YYYY-MM-DD')
    // );
    // //달력 끝점 넣기
    // const [isDate2, setIsDate2] = useState(moment().format('YYYY-MM-DD'));

    // //검색했을때 현재 검색한 날짜가 출력되서 고정되도록
    // const [isDate3, setIsDate3] = useState(
    //   moment()
    //     .subtract(1, 'month')
    //     .format('YYYY-MM-DD')
    // );
    // const [isDate4, setIsDate4] = useState(moment().format('YYYY-MM-DD'));

    // // 달력에서 검색 기간 선택(1달, 3달, 6달, 12달)
    // const handleBtnFilterClick1 = (label, e) => {
    //   console.log(label);
    //   // 각 기간마다 value값 부여해서 그 value값을 현재 날짜에서 subtract해서 넣기
    //   const newdate = moment().subtract(e.value, 'month');
    //   setIsDate1(newdate.format('YYYY-MM-DD'));
    //   setSearchParams(
    //     produce((draft) => {
    //       draft.fromDate = newdate.format('YYYY-MM-DD');
    //     })
    //   );
    // };

    // //달력기간 시작점 달력 오픈 팝업
    // const handleCalendarPop1 = (e) => {
    //   e.preventDefault();
    //   setCalPop1(true);
    //   preventScroll(true);
    // };

    // //달력기간 끝점 달력 오픈 팝업
    // const handleCalendarPop2 = (e) => {
    //   e.preventDefault();
    //   setCalPop2(true);
    //   preventScroll(true);
    // };

    // //달력 날짜 시작점 변경시 발생이벤트
    // const calendarCallback1 = (e, date) => {
    //   e.preventDefault();
    //   setIsDate1(date.format('YYYY-MM-DD'));
    //   setSearchParams(
    //     produce((draft) => {
    //       draft.fromDate = date.format('YYYY-MM-DD');
    //     })
    //   );
    //   setCalPop1(false);
    //   preventScroll(false);
    // };

    // //달력 기간 끝점 변경시 발생 이벤트
    // const calendarCallback2 = (e, date) => {
    //   e.preventDefault();
    //   setIsDate2(date.format('YYYY-MM-DD'));
    //   // onChange({
    //   //   endDate: date.format('YYYY-MM-DD')
    //   // });
    //   setSearchParams(
    //     produce((draft) => {
    //       draft.endDate = date.format('YYYY-MM-DD');
    //     })
    //   );
    //   setCalPop2(false);
    //   preventScroll(false);
    // };

    // //달력 팝업 종료
    // const calendarClose = (e) => {
    //   e.preventDefault();
    //   setCalPop1(false);
    //   setCalPop2(false);
    //   preventScroll(false);
    // };

    useEffect(() => {
      setReqInfoFetchStt(!isEmpty(reqList) ? FETCH_STT.HAVE_INFO : FETCH_STT.NO_INFO);
    }, [reqList]);

    //로그인 감지부분 => 감지후 초기 판매현황 리스트 출력
    useEffect(() => {
      console.log('sellcar::', isLogin());
      console.log('gInfo type : ', gInfoLive().type, 'ginfo membertype : ', gInfoLive().membertype);
      if (!isLogin()) {
        location.href = '/login';
      }
      // if( gInfoLive().membertype === UserType.NONMEMBER ){
      if (gInfoLive().type === 'nonmember') {
        const slReqId = gInfoLive().id;
        dispatch(selectSellcarListAction({ slReqId }));
      }
      // else if( gInfoLive().membertype === UserType.MEMBER){
      else if (gInfoLive().type === 'member') {
        const endDate = moment().format('YYYY-MM-DD');
        const fromDate = moment()
          .subtract(1, 'year')
          .format('YYYY-MM-DD');
        // const pageNo = currentPage;
        const pageQtt = 10 * currentPage;
        const crNm = crNm;
        let reqTpcd = '00002';
        if (Number(tabNo) === 0) reqTpcd = '00002';
        else if (Number(tabNo) === 1) reqTpcd = '00001';
        else if (Number(tabNo) === 2) reqTpcd = '00003';
        dispatch(selectSellcarListAction({ fromDate, endDate, pageQtt, crNm, reqTpcd }));
      }
    }, [dispatch, currentPage]);

    // //차량검색하는 부분의 onBlur이벤트 실행
    // const searchInputHandler = (e) => {
    //   console.log('searchInput  : ', e.target.name, e.target.value);
    //   if (e === null) return false;
    //   setSearchParams(
    //     produce((draft) => {
    //       draft[e.target.name] = e.target.value;
    //     })
    //   );
    // };

    // //처음 페이지 로딩될때 fromdate, enddate삽입
    // useEffect(() => {
    //   setSearchParams(
    //     produce((draft) => {
    //       draft.fromDate = isDate1;
    //       draft.endDate = isDate2;
    //     })
    //   );
    // }, [isDate1, isDate2]);

    // Mobile, 더보기
    const onScroll = useCallback(() => {
      const target = document.querySelector('#wrap');
      if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
        // if ((currentPage.current - 1) * ITEMS_PER_PAGE > totalCount) return;
        if (totalCount <= (reqList?.length || 0)) return;
        setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
        dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
        setCurrentPage(currentPage + 1);
        // console.log('mob onScroll : ', window.scrollY, searchParams, currentPage);
      }
    }, [loadingFlag, totalCount, reqList, dispatch, currentPage, searchParams]);

    useEffect(() => {
      setLoadingFlag(true);
    }, [reqList]);

    useEffect(() => {
      if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
      return () => {
        if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
      };
    }, [hasMobile, onScroll, reqList]);

    // //차량 검색 핸들러
    // const searchHandler = (e) => {
    //   e.preventDefault();
    //   //검색할때 현재 조건 걸려있는 날짜를 출력
    //   setIsDate3(isDate1);
    //   setIsDate4(isDate2);
    //   //검색할때 현재 페이지를 1로 초기화
    //   setCurrentPage(1);
    //   console.log('searchParams : ', searchParams);
    //   dispatch(selectSellcarListAction(searchParams));
    // };

    // //현재 검색 데이터와 토탈값 출력해보기
    // useEffect(() => {
    //   console.log('totalSearchCnt : ', totalCnt);
    //   console.log('reqlist', reqList);
    //   console.log('totalCount : ', totalCount);
    // }, [reqList, totalCnt, totalCount]);

    //변수로 불러온 신청서 번호와 타입번호를 이용해 url주소를 바꿔주는식
    const listClick = (slReqId, reqTpcd, wgoodsNo) => {
      console.log('SellCar Move - slReqId : %o, reqTpcd: %o, wgoodsNo: %o ', slReqId, reqTpcd, wgoodsNo);
      let url = '/mypage/personal/sellcar';
      if (reqTpcd === '00001') {
        url += '/visitSellCarView?slReqId=' + slReqId + '&wgoodsno=' + wgoodsNo + '&reqTpcd=' + reqTpcd;
      } else if (reqTpcd === '00002') {
        url += '/selfSellCarView?slReqId=' + slReqId + '&reqTpcd=' + reqTpcd;
      } else if (reqTpcd === '00003') {
        url += '/nonevalSellCarView?slReqId=' + slReqId + '&reqTpcd=' + reqTpcd;
      }
      console.log('push', url);
      // onClickRouter.push(url);
      location.href = url;
    };

    // 추가
    const [sellcarMode, setSellCarMode] = useState(0); // 비교견전(0), 방문평가(1), 무평가(2)
    const onChangeSellcarMode = (e, index) => {
      setSellCarMode(index);
      let reqTpcd = '00002';
      if (index === 0) {
        console.log('비교견적, index : %o', index);
        reqTpcd = '00002';
      } else if (index === 1) {
        console.log('방문평가, index : %o', index);
        reqTpcd = '00001';
      } else if (index === 2) {
        console.log('무평가, index : %o', index);
        reqTpcd = '00003';
      }
      setSearchParams(
        produce((draft) => {
          draft.reqTpcd = reqTpcd;
        })
      );
      const _searchParams = { ...searchParams, pageNo: 1, pageQtt: 10, reqTpcd };
      dispatch(selectSellcarListAction(_searchParams));
    };

    // 현재 신청상태 값 출력용 handler (방문평가)
    const sttTitle = (req) => {
      if (req.proc !== '40') {
        return '신청완료';
      } else if (req.proc === '40' && req.evalproc === '01') {
        return '평가사 배정';
      } else if (req.evalproc !== '01' && (req.deciproc === '01' || req.deciproc === '02')) {
        return '평가완료';
      } else if (req.deciproc === '06') {
        return '매입취소';
      }
      return '매입진행';
    };

    return (
      <AppLayout>
        <div className="general-sell-sec">
          {UserType.MEMBER === gInfoLive().membertype && (
            <>
              <div className="mypage-admin-title">
                <p className="tx-exp-tp5">&#8251; 내 차 팔기의 판매 현황 및 관리가 가능합니다.</p>
                <p className="tx-exp-tp5">&#8251; 현황 조회는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
              </div>

              {/* 삭제 */}
              {/* <ul className="m-toggle-list search">
                <MenuItem>
                  <MenuTitle>
                    내차팔기 현황<span>상세조회&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  </MenuTitle>
                  <MenuCont>
                    <MobButtonFilter
                      checkList={[
                        { title: '1개월', checked: true, value: '1' },
                        { title: '3개월', checked: false, value: '3' },
                        { title: '6개월', checked: false, value: '6' },
                        { title: '1년', checked: false, value: '12' }
                      ]}
                      onClick={handleBtnFilterClick1}
                    />
                    <div className="mt8">
                      <DatePicker defaultValue={isDate1} width="46%" onClick={handleCalendarPop1} />
                      <em className="from">~</em>
                      <DatePicker defaultValue={isDate2} width="46%" onClick={handleCalendarPop2} />
                    </div>
                    <Input type="text" height={40} placeHolder="차량명을 검색하세요." marginTop={8} name="crNm" id="crNm" onBlur={searchInputHandler} />
                    <Button size="full" background="blue80" radius={true} title="조회" height={40} fontSize={14} fontWeight={500} marginTop={17} onClick={searchHandler} />
                  </MenuCont>
                </MenuItem>
                <li>
                  <div className="float-wrap">
                    <p>
                      {isDate3} ~ {isDate4}
                    </p>
                    <p>
                      총 <span className="tx-blue80">{totalCount !== undefined ? totalCount : 0}</span>건
                    </p>
                  </div>
                </li>
              </ul> */}

              {/* 추가 */}
              <div className="m-sub-title">내차팔기 현황</div>
              <TabMenu type="type1" mount={false} defaultTab={Number(tabNo)} callBack={onChangeSellcarMode}>
                <TabCont tabTitle="비교견적" id="tab2" index={1} />
                <TabCont tabTitle="방문평가" id="tab1" index={0} />
                <TabCont tabTitle="무평가" id="tab3" index={2} />
              </TabMenu>

              {withoutList === true ? (
                <div className="list-none-wrap">
                  <div className="list-none">
                    <p>판매 차량정보가 없습니다.</p>
                    <Buttons align="center" marginTop={16}>
                      <Button size="mid" background="blue80" radius={true} title="내차팔기" fontWeight={500} width={100} height={40} href={'/sellcar/sellCar'} />
                    </Buttons>
                  </div>
                </div>
              ) : (
                <div className="list-wrap content-border">
                  <ul className="admin-list-wrap m-sell-status">
                    {reqInfoFetchStt === FETCH_STT.HAVE_INFO &&
                      reqList.map((req, idx) => {
                        return (
                          <li key={`tr${idx}`} onClick={() => listClick(req.slReqId, req.reqTpcd, req?.wgoodsNo)}>
                            <div className="float-wrap btn-xs mb8">
                              <ul className="date" style={{ float: 'none' }}>
                                <li>{req.regDt ? getDate(req.regDt) : ''}</li>
                                {/* <li className="sec tx-black">{req.reqTpcdNm}</li> */}
                                <li className="tx-blue80" style={{ marginLeft: 10 }}>
                                  <u>신청번호 : {req?.slReqId}</u>
                                </li>
                              </ul>
                            </div>
                            {sellcarMode !== 1 ? (
                              <>
                                {getStt(req)?.name !== '' && getStt(req)?.name !== undefined && (
                                  <Button
                                    size="sml"
                                    background="blue20"
                                    color="blue80"
                                    radius={true}
                                    title={req.reqTpcd === '00003' ? req.detailcdNm2 : getStt(req)?.name}
                                    width={53}
                                    height={24}
                                    fontSize={10}
                                    fontWeight={500}
                                    disabled={true}
                                    buttonMarkup={true}
                                  />
                                )}
                                {!isEmpty(req.crId) ? (
                                  <div className="goods-list admin-list tp4 no-thumb-list">
                                    <ul>
                                      <li>
                                        <span>
                                          {/* <div className="img-cover">{!isEmpty(req.phtUrl) && <img src={`${imgUrl}${req.phtUrl}`} alt="차량 이미지" />}</div> */}
                                          <div className="summary">
                                            <h5 className="subject">
                                              {/* 제조사       /      차종     /  차량 연료정보  /   차량 버전   */}
                                              {req.crMnfcCdNm} {req.crMdlCdNm} {req.crClsCdNm} {req.crDtlClsCdNm}
                                            </h5>
                                            <div className="info-wrap">
                                              <div className="info">
                                                <span>{req.crNo}</span>
                                                <span>{req.frmYyyy}</span>
                                                <span>{req.drvDist}km</span>
                                              </div>
                                              {/* <div className="price-wrap">
                                                <div className="price-left">
                                                  <p className="price-tp2">{req?.estm === undefined || req.estm === 0 ? '미정' : setComma(req.estm) + ' 원'}</p>
                                                </div>
                                              </div> */}
                                            </div>
                                          </div>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                ) : (
                                  <p className="tx-disabled tp2">차량확인 후 표시됩니다.</p>
                                )}
                              </>
                            ) : (
                              <>
                                {sttTitle(req) !== '' && (
                                  <Button
                                    size="sml"
                                    background="blue20"
                                    color="blue80"
                                    radius={true}
                                    title={sttTitle(req)}
                                    width={53}
                                    height={24}
                                    fontSize={10}
                                    fontWeight={500}
                                    disabled={true}
                                    buttonMarkup={true}
                                  />
                                )}
                                {!isEmpty(req.carcd) ? (
                                  <div className="goods-list admin-list tp4 no-thumb-list">
                                    <ul>
                                      <li>
                                        <span>
                                          {/* <div className="img-cover">{!isEmpty(req.phtUrl) && <img src={`${imgUrl}${req.phtUrl}`} alt="차량 이미지" />}</div> */}
                                          <div className="summary">
                                            <h5 className="subject">{req.carnm}</h5>
                                            <div className="info-wrap">
                                              <div className="info">
                                                <span>{req.carno}</span>
                                                <span>{req.year}</span>
                                                <span>{setComma(req.travdist)}km</span>
                                              </div>
                                              {/* <div className="price-wrap">
                                                <div className="price-left">
                                                  <p className="price-tp2">{req?.estm === undefined || req.estm === 0 ? '미정' : setComma(req.estm) + ' 원'}</p>
                                                </div>
                                              </div> */}
                                            </div>
                                          </div>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                ) : (
                                  <p className="tx-disabled tp2">차량확인 후 표시됩니다.</p>
                                )}
                              </>
                            )}
                          </li>
                        );
                      })}
                    {reqInfoFetchStt === FETCH_STT.NO_INFO && (
                      <div className="list-none-wrap">
                        <div className="list-none">
                          <p>판매 차량정보가 없습니다.</p>
                          <Buttons align="center" marginTop={16}>
                            <Button size="mid" background="blue80" radius={true} title="내차팔기" fontWeight={500} width={100} height={40} href={'/sellcar/sellCar'} />
                          </Buttons>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              )}
            </>
          )}
          {/* 비회원 조회 */}
          {gInfoLive().type === 'nonmember' && (
            <>
              <div className="mypage-signup-banner">
                <p className="tit">회원가입하기</p>
                <p className="con">중고차의 모든 것! 현대 오토벨에서 내차 사고 팔기 편리하게 이용하세요!</p>
                <Link href="/member/choiceMemberType">
                  <a>바로가기</a>
                </Link>
              </div>
              {/* <div className="mypage-admin-title">
                <p className="tx-exp-tp5">&#8251; 내 차 팔기의 판매 현황 및 관리가 가능합니다.</p>
              </div> */}
              <div className="mypage-admin-title blue-area">
                <p>
                  {gInfoLive().name} 님께서 <br />
                  {/* (010-****-5678) */}
                  신청하신 내차팔기 현황 조회입니다.
                </p>
              </div>

              <div className="list-wrap content-border">
                <ul className="admin-list-wrap">
                  {reqList.map((req, idx) => {
                    return (
                      <li key={`tr${idx}`} onClick={() => listClick(req.slReqId, req.reqTpcd)}>
                        <div className="float-wrap btn-xs mb8">
                          <ul className="date">
                            <li>{getDate(req.regDt)}</li>
                            <li className="sec tx-black">{req.reqTpcdNm}</li>
                            <li className="tx-blue80">
                              <u>신청번호 : {req?.slReqId}</u>
                            </li>
                          </ul>
                          {req.reqSttTpcdNm.length < 5 ? (
                            <Button size="sml" background="blue20" color="blue80" radius={true} title={req.reqSttTpcdNm} width={53} height={24} fontSize={10} fontWeight={500} disabled={true} />
                          ) : (
                            <Button size="sml" background="blue20" color="blue80" radius={true} title={req.reqSttTpcdNm} width={103} height={24} fontSize={10} fontWeight={500} disabled={true} />
                          )}
                        </div>
                        {!isEmpty(req.crId) ? (
                          <>
                            <div className="goods-list admin-list tp4">
                              <ul>
                                <li>
                                  <span>
                                    <div className="img-cover">{!isEmpty(req.phtUrl) && <img src={`${imgUrl}${req.phtUrl}`} alt="차량 이미지" />}</div>
                                    <div className="summary">
                                      <h5 className="subject">
                                        {/* 제조사       /      차종     /  차량 연료정보  /   차량 버전   */}
                                        {req.crMnfcCdNm} {req.crMdlCdNm} {req.crClsCdNm} {req.crDtlClsCdNm}
                                      </h5>
                                      <div className="info-wrap">
                                        <div className="info">
                                          <span>{req.crNo}</span>
                                          <span>{req.frmYyyy}</span>
                                          <span>{setComma(req.drvDist)}km</span>
                                        </div>
                                        <div className="price-wrap">
                                          <div className="price-left">
                                            <p className="price-tp2">{req?.estm === undefined || req.estm === 0 ? '미정' : setComma(req.estm) + ' 원'}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </>
                        ) : (
                          <p className="tx-disabled">차량확인 후 표시됩니다.</p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mypage-admin-title">
                <p className="tx-exp-tp5">&#8251; 신청내역이 다르면 신청번호가 다릅니다. 다른 신청내역을 조회하시려면, 해당 신청번호로 다시 현황조회를 해주세요.</p>
                <p className="tx-exp-tp5">&#8251; 현대 글로비스 오토벨 회원가입을 하시면 더 다양한 서비스를 이용하실 수 있습니다.</p>
                <p className="tx-exp-tp5">&#8251; 문의사항이 있을 경우, 고객센터 전화번호 또는 1:1 문의를 이용해주세요.</p>
              </div>
              <ul className="sell-ico-wrap border">
                <li>
                  <Link href="/sell/visitApply">
                    <a>
                      <i className="sell-service-img-01" />
                      <div className="tx-wrap">
                        <p className="tit">방문평가 판매</p>
                        <p className="exp">
                          클릭 한 번이면 끝!
                          <br />
                          견적부터 판매까지 내 집 앞에서 편하게
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sell/selfHome">
                    <a>
                      <i className="sell-service-img-02" />
                      <div className="tx-wrap">
                        <p className="tit">셀프등록 판매</p>
                        <p className="exp">
                          딜러와의 불편한 흥정은 이제 그만!
                          <br />
                          직접 등록하고 쉽게 견적 받으세요!
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/sell/freeHome">
                    <a>
                      <i className="sell-service-img-03" />
                      <div className="tx-wrap">
                        <p className="tit">무평가 판매</p>
                        <p className="exp">
                          신청완료와 동시에 차량 대금 먼저 지급! <br />
                          이제 대금 먼저 받고 차량 판매하세요!
                        </p>
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        {/* {
          <>
            <div className={calPop1 || calPop2 ? `modal-bg v-2 active` : `modal-bg v-2`} onClick={calendarClose} />
            <MobBottomArea active={calPop1} isFixButton={true} zid={102}>
              <MobCalendar date={isDate1} callback={calendarCallback1} />
            </MobBottomArea>
            <MobBottomArea active={calPop2} isFixButton={true} zid={102}>
              <MobCalendar date={isDate2} callback={calendarCallback2} />
            </MobBottomArea>
          </>
        } */}
      </AppLayout>
    );
  }
  // ===========================================모바일버전 끝==============================================

  const { reqList } = useSelector((state) => state.sellCarStore, []);
  // const mode = 'member';
  const pageQtt = 5;
  const [pageNo, setPageNo] = useState(1);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [searchParams, setSearchParams] = useState({});
  const [reqInfoFetchStt, setReqInfoFetchStt] = useState(FETCH_STT.LOADING);
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false, true);
  const { showAlert, showConfirm } = useContext(SystemContext);

  const searchDateChangeHandler = (payload) => {
    setSearchParams(
      produce((draft) => {
        draft.fromDate = payload.fromDate;
        draft.endDate = payload.endDate;
      })
    );
  };

  const searchInputHandler = (e) => {
    setSearchParams(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setPageNo(1);
    setShowMoreBtn(true);
    const _searchParams = { ...searchParams, pageNo: 1, pageQtt: pageQtt };
    dispatch(selectSellcarListAction(_searchParams));
  };

  // 더보기
  const handleListPcMore = (e) => {
    e.preventDefault();
    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    const _searchParams = { ...searchParams, pageNo: nextPage, pageQtt: pageQtt };
    dispatch(selectSellcarListAction(_searchParams, true));
  };

  useEffect(() => {
    if (!isEmpty(reqList)) {
      const totalRecordCount = reqList[0].totalRecordCount;
      if (totalRecordCount < pageQtt * pageNo) {
        setShowMoreBtn(false);
      }
    }
    setReqInfoFetchStt(!isEmpty(reqList) ? FETCH_STT.HAVE_INFO : FETCH_STT.NO_INFO);
  }, [reqList]);

  useEffect(() => {
    console.log('sellcar::', isLogin());
    if (!isLogin()) {
      location.href = '/login';
    }
    // if( gInfoLive().membertype === UserType.NONMEMBER ){
    if (gInfoLive().type === 'nonmember') {
      const slReqId = gInfoLive().id;
      dispatch(selectSellcarListAction({ slReqId }));
    }
    // else if( gInfoLive().membertype === UserType.MEMBER){
    else if (gInfoLive().type === 'member') {
      const endDate = moment().format('YYYY-MM-DD');
      const fromDate = moment()
        .subtract(1, 'year')
        .format('YYYY-MM-DD');
      setShowMoreBtn(true);
      let reqTpcd = '00002';
      if (Number(tabNo) === 0) reqTpcd = '00002';
      else if (Number(tabNo) === 1) reqTpcd = '00001';
      else if (Number(tabNo) === 2) reqTpcd = '00003';
      dispatch(selectSellcarListAction({ fromDate, endDate, pageNo: 1, pageQtt: pageQtt, reqTpcd: reqTpcd }));
    }
  }, [dispatch]);

  // 추가
  const [sellcarMode, setSellCarMode] = useState(Number(tabNo)); // 비교견전(0), 방문평가(1), 무평가(2)
  const onChangeSellcarMode = (e, index) => {
    setSellCarMode(index);
    let reqTpcd = '00002';
    if (index === 0) {
      reqTpcd = '00002';
    } else if (index === 1) {
      reqTpcd = '00001';
    } else if (index === 2) {
      reqTpcd = '00003';
    }
    setSearchParams(
      produce((draft) => {
        draft.reqTpcd = reqTpcd;
      })
    );
    const _searchParams = { ...searchParams, pageNo: 1, pageQtt: pageQtt, reqTpcd };
    dispatch(selectSellcarListAction(_searchParams));
  };
  console.log('reqList >>>>', reqList);

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode={gInfoLive().type === 'member' ? undefined : 'guest'} />
        {/* <MypageNavi mode={undefined} /> */}
        {UserType.MEMBER === gInfoLive().membertype && (
          <>
            <div className="mypage-state-sec general-sell-sec">
              <div className="mypage-admin-title">
                <h3>내차 팔기 현황 조회</h3>
                <p className="tx-exp-tp5">&#8251; 내 차 팔기의 판매 현황 및 관리가 가능합니다.</p>
                <p className="tx-exp-tp5">&#8251; 현황 조회는 1년까지 조회하실 수 있으며, 1년이 지나면 삭제됩니다.</p>
              </div>
              <div className="list-wrap">
                <div className="list-tit">
                  <Button className="fr" size="big" background="blue80" title="내 차 팔기 바로가기" width={181} height={48} marginBottom={23} href="/sellcar/sellCar" />
                </div>

                {/* 추가 */}
                <TabMenu type="type9" mount={true} defaultTab={Number(tabNo)} className="mb16" callBack={onChangeSellcarMode}>
                  <TabCont tabTitle="비교견적" id="tab1" index={0} />
                  <TabCont tabTitle="방문평가" id="tab2" index={1} />
                  <TabCont tabTitle="무평가" id="tab3" index={2} />
                </TabMenu>

                {/* <table className="table-tp1 input search th-c" summary="조회 영역">
                  <caption className="away">조회 영역</caption>
                  <tbody>
                    <SearchDatePickers checkedbtnArray={checkedbtnArray} tableStyle={true} onChange={searchDateChangeHandler} />
                    <tr>
                      <td>
                        <Input type="text" placeHolder="차량명을 검색해주세요." width={352} height={40} name="carNm" onBlur={searchInputHandler} />
                        <Button size="mid" background="blue80" title="조회하기" width={130} height={40} marginLeft={16} onClick={searchHandler} />
                      </td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
              <div className="list-wrap mb20">
                <div className="admin-list tp7">
                  <div className="content-top">
                    <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="11%" />
                        <col width="*" />
                        {/*
                        <col width="8%" />
                        <col width="13%" />
                        <col width="8%" />
                        */}
                        <col width="14%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>신청차량</th>
                          {/*
                          <th>견적금액</th>
                          <th>담당</th>
                          <th>판매방식</th>
                          */}
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reqInfoFetchStt === FETCH_STT.HAVE_INFO &&
                          reqList.map((req, idx) => {
                            return (
                              <tr key={`tr${idx}`}>
                                <td>
                                  {req.regDt ? getDate(req.regDt) : ''}
                                  <br />
                                  <Button
                                    size="mid"
                                    line="gray"
                                    color="black"
                                    radius={true}
                                    title="상세보기"
                                    width={100}
                                    height={32}
                                    marginTop={8}
                                    nextLink={true}
                                    href={
                                      req.reqTpcd !== '00001'
                                        ? `sellCarView?slReqId=${req.slReqId}&type=${req.reqTpcd}`
                                        : `sellCarView?slReqId=${req.slReqId}&wgoodsno=${req.wgoodsNo}&type=${req.reqTpcd}`
                                    }
                                  />
                                </td>
                                {sellcarMode !== 1 ? (
                                  <>
                                    {!isEmpty(req.crId) ? (
                                      <td>
                                        <div className="img-cover">{!isEmpty(`${req.phtUrl}`) && <img src={`${imgUrl}${req.phtUrl}`} alt="차량 이미지" />}</div>
                                        <div className="summary">
                                          <h4 className="subject">
                                            {req.crMnfcCdNm} {req.crMdlCdNm} {req.crClsCdNm} {req.crDtlClsCdNm}
                                          </h4>
                                          <ul className="info">
                                            <li>{req.crNo}</li>
                                            <li>{req.frmYyyy}</li>
                                          </ul>
                                          <ul className="info">
                                            <li>{setComma(req.drvDist)}km</li>
                                            <li>{req.mssNm}</li>
                                            <li>{req.fuel}</li>
                                          </ul>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="tx-disabled">차량 확인 후 표시됩니다.</td>
                                    )}
                                    <td className="tx-blue80">{req.reqTpcd === '00003' ? req.detailcdNm2 : getStt(req)?.name}</td>
                                  </>
                                ) : (
                                  <>
                                    {!isEmpty(req.carcd) ? (
                                      <td>
                                        <div className="img-cover" />
                                        <div className="summary">
                                          <h4 className="subject">{req.carnm}</h4>
                                          <ul className="info">
                                            <li>{req.carno}</li>
                                            <li>{req.year}</li>
                                          </ul>
                                          <ul className="info">
                                            <li>{setComma(req.travdist)}km</li>
                                            <li>{req.misscd}</li>
                                            <li>{req.fuelcd}</li>
                                          </ul>
                                        </div>
                                      </td>
                                    ) : (
                                      <td className="tx-disabled">차량 확인 후 표시됩니다.</td>
                                    )}
                                    <td className="tx-blue80">
                                      {req.deciproc === '06'
                                        ? '매입취소'
                                        : req.proc !== '40'
                                        ? '신청완료'
                                        : req.proc === '40' && req.evalproc === '01'
                                        ? '평가사 배정'
                                        : req.evalproc !== '01' && (req.deciproc === '01' || req.deciproc === '02')
                                        ? '평가완료'
                                        : '매입진행'}
                                    </td>
                                  </>
                                )}
                              </tr>
                            );
                          })}

                        {reqInfoFetchStt === FETCH_STT.NO_INFO && (
                          <tr className="list-none">
                            <td colSpan="3">
                              판매 차량정보가 없습니다.
                              <br />
                              <Button size="big" background="blue80" title="내차팔기 바로가기" width={245} height={60} marginTop={16} href="/sellcar/sellCar" />
                            </td>
                          </tr>
                        )}
                        {reqInfoFetchStt === FETCH_STT.HAVE_INFO && (
                          <tr className="more">
                            <td colSpan="3" className="more">
                              <div className="cate-list-btn2">{showMoreBtn && <button onClick={handleListPcMore}>더보기</button>}</div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {gInfoLive().type === 'nonmember' && (
          <>
            <div className="mypage-state-sec guest-sec">
              <div className="mypage-admin-title">
                <h3 className="border-none">내차 팔기 현황 조회</h3>
                <div className="sub-tit-wrap">
                  <p>{gInfoLive().name} 님께서 신청하신 내차팔기 현황 조회입니다.</p>
                </div>
              </div>
              <div className="list-wrap border">
                <div className="list-tit">
                  <h3>
                    내차팔기<span>신청번호: {gInfoLive().id}</span>
                  </h3>
                  <Button size="mid" line="gray" color="black" radius={true} title="더 보기" width={100} height={32} href="/mypage/personal/sellcar/sellCarView" />
                </div>
                <div className="admin-list tp7">
                  <div className="content-top">
                    <table className="table-tp1 th-c td-c" summary="결제내역에 대한 내용">
                      <caption className="away">결제내역</caption>
                      <colgroup>
                        <col width="11%" />
                        <col width="*" />
                        <col width="9%" />
                        <col width="9%" />
                        <col width="9%" />
                        <col width="16%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>신청일자</th>
                          <th>신청차량</th>
                          <th>견적금액</th>
                          <th>담당</th>
                          <th>판매방식</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reqList.map((req, idx) => {
                          return (
                            <tr key={`tr${idx}`}>
                              <td>
                                {getDate(req.regDt)}
                                <br />
                                <Button
                                  size="mid"
                                  line="gray"
                                  color="black"
                                  radius={true}
                                  title="상세보기"
                                  width={100}
                                  height={32}
                                  marginTop={8}
                                  nextLink={true}
                                  href={`sellCarView?slReqId=${req.slReqId}&type=${req.reqTpcd}`}
                                />
                              </td>
                              {!isEmpty(req.crId) ? (
                                <td>
                                  <div className="img-cover">{!isEmpty(req.phtUrl) && <img src={`${imgUrl}${req.phtUrl}`} alt="차량 이미지" />}</div>
                                  <div className="summary">
                                    <h4 className="subject">
                                      {req.crMnfcCdNm} {req.crMdlCdNm} {req.crClsCdNm} {req.crDtlClsCdNm}
                                    </h4>
                                    <ul className="info">
                                      <li>{req.crNo}</li>
                                      <li>{req.frmYyyy}</li>
                                    </ul>
                                    <ul className="info">
                                      <li>{req.drvDist}km</li>
                                      <li>{req.mssDvcdNm}</li>
                                      <li>{req.fuelDvcdNm}</li>
                                    </ul>
                                  </div>
                                </td>
                              ) : (
                                <td className="tx-disabled">차량 확인 후 표시됩니다.</td>
                              )}
                              <td className="tx-blue80">{getEstm(req)}</td>
                              <td className="seller">
                                {req?.vltrNm !== undefined || req?.vltrNm !== '' ? (
                                  <>
                                    {req.vltrNm}
                                    <br />
                                    {req.vltrPhnNo}
                                  </>
                                ) : (
                                  <>-</>
                                )}
                              </td>
                              <td>{req.reqTpcdNm}</td>
                              <td className="tx-blue80">{req.reqSttTpcdNm}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="essential-point">
                <ul>
                  <li>[안내]</li>
                  <li>
                    <i className="ico-dot sml" /> 신청내역이 다르면 신청번호가 다릅니다. 다른 신청내역을 조회하시려면, 해당 신청번호로 다시 현황조회를 해주세요.
                  </li>
                  <li>
                    <i className="ico-dot sml" /> 현대 글로비스 오토벨 회원가입을 하시면 더 다양한 서비스를 이용하실 수 있습니다.
                    <Button size="mid" line="gray" color="black" radius={true} title="회원가입" width={100} height={32} marginLeft={10} href="/member/choiceMemberType" />
                  </li>
                  <li>
                    <i className="ico-dot sml" /> 회원가입 이후 비회원 신청내역 조회를 원하시는 경우 비회원 로그인을 통해 조회하실 수 있습니다.
                  </li>
                  <li>
                    <i className="ico-dot sml" /> 문의사항이 있을 경우, 고객센터 전화번호 또는 1:1 문의를 이용해주세요.
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
      <RodalPopup show={rodalShow1} type={'slideUp'} closedHandler={modalCloseHandler1} mode="normal" size="small" title="로그인">
        <Login url={'/mypage/personal/sellcar/sellCar'} />
      </RodalPopup>
    </AppLayout>
  );
};

SellCar.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  console.log('SellCar.getInitialProps -> gInfoLive()', gInfoLive());
  return {};
};

export default withRouter(SellCar);
