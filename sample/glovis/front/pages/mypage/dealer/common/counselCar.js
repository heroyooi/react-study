/* eslint-disable no-unused-vars */
/**
 * 설명 : 쪽지 상담 내역
 * @fileoverview 딜러마이페이지>쪽지상담 내역
 * @requires [counselCarAction,notePopup]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy, isEqual } from 'lodash';
import moment from 'moment';
import { PulseLoader } from 'react-spinners';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
import { getCounselCarList, setLoadingImageMobile } from '@src/actions/mypage/dealer/common/counselCarAction';

// mobile
import MobCounsel from '@src/components/common/MobCounsel';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { imgUrl } from '@src/utils/HttpUtils';
import NotePopup from './notePopup';

/**
 * 설명 : 쪽지상담 내역을 조회 쪽지내용 팝업을 호출한다.
 * @param {state.counselCar.counselCarList} 쪽지 상담내역
 * @returns {CounselCar} 쪽지 상담내역
 */
const CounselCar = () => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const counselCarList = useSelector((state) => orderBy(state?.counselCar?.counselCarList));
  const isLoadingImage = useSelector((state) => state.counselCar.isLoadingImage); // 모바일용 로딩이미지
  const currentPage = useSelector((state) => state?.counselCar?.counselPageNo);
  const totalPage = useSelector((state) => state?.counselCar?.counselTotalPageNo);
  const totalRecord = useSelector((state) => state?.counselCar?.counselTotalRecordCount);
  const [popupShow, setPopupShow, popupOpenHandler, popupCloseHandler] = useRodal(false, true);
  const [counselId, setCounselId] = useState({});
  const [fpCounsel, setFpCounsel] = useState(false);
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [currentPageM, setCurrentPageM] = useState(1); // 모바일용 현재페이지
  const prevCurrentPage = usePrevious(currentPageM);

  const notePopupOpen = useCallback(
    (e, counselId) => {
      e.preventDefault();
      if (hasMobile) {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '상담내역 조회',
            options: ['close']
          }
        });
        setFpCounsel(true);
      }
      setCounselId(counselId);
      setPopupShow(!popupShow);
    },
    [dispatch, hasMobile, popupShow, setPopupShow]
  );

  const closeNotePop = () => {
    setPopupShow(!popupShow);
    if (hasMobile) setFpCounsel(false);
  };

  const pageChangeHandler = (e, page) => {
    dispatch(getCounselCarList(page));
  };

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if (totalRecord <= (counselCarList?.length || 0)) return;
      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      setCurrentPageM(currentPageM + 1);
    }
  }, [loadingFlag, totalRecord, counselCarList, dispatch, currentPageM]);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '쪽지 상담 내역',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 0,
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

  useEffect(() => {
    dispatch(getCounselCarList());
  }, []);

  useEffect(() => {
    if (hasMobile) {
      if (currentPageM > 1 && !isEqual(prevCurrentPage, currentPageM)) {
        dispatch(getCounselCarList(currentPageM, true));
      }
    }
  }, [dispatch, hasMobile, prevCurrentPage, currentPageM]);

  useEffect(() => {
    if (hasMobile) setLoadingFlag(true);
  }, [counselCarList, hasMobile]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, counselCarList]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="content-wrap pt20">
          <div className="mypage-admin-title">
            <p className="tx-exp-tp5">&#8251; 최근 1개월 이내 쪽지 상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1개월까지 조회하실 수 있으며, 1개월이 지나면 삭제됩니다.</p>
          </div>
          {!isEmpty(counselCarList) ? (
            <ul className="admin-list-wrap mt8">
              {counselCarList.map((counsel, index) => {
                return (
                  <li key={index} onClick={(e) => notePopupOpen(e, { dlrPrdId: counsel.dlrPrdId, mbId: counsel.mbId })}>
                    <div className="mb8">
                      <ul className="date">
                        <li>{moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('YYYY.MM.DD')}</li>
                        <li className="sec">{counsel.answerYn === 'Y' ? '답변완료' : '답변대기'}</li>
                      </ul>
                    </div>
                    <div className="goods-list admin-list tp4 note">
                      <ul>
                        <li>
                          <span>
                            <div className="img-cover">
                              <img src={`${imgUrl}${counsel.cnslPrgrCrImg}`} alt="차량 이미지" />
                            </div>
                            <div className="summary">
                              <h5 className="subject">{counsel.crNm}</h5>
                            </div>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="list-none-wrap">
              <div className="list-none">
                <p>최근 조회하신 차량이 없습니다.</p>
                <Buttons align="center" marginTop={16}>
                  <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={84} height={40} href="/buycar/buyCarList" nextLink={true} />
                </Buttons>
              </div>
            </div>
          )}
          {isLoadingImage && (
            <div className="more-loading">
              <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
            </div>
          )}
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={100} className="bg-gray">
          {fpCounsel && <NotePopup show={popupShow} onChange={closeNotePop} value={counselId} isChange={fpCounsel} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        <div className="mypage-state-sec dealer-sec">
          <div className="mypage-admin-title">
            <h3>쪽지상담 내역</h3>
            <p className="tx-exp-tp5">&#8251; 최근 1달 이내 쪽지상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1달까지 조회하실 수 있으며, 1달이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            <div className="admin-list tp7 note">
              <div className="content-top">
                <table className="table-tp1 th-c td-c" summary="쪽지상담에 대한 내용">
                  <caption className="away">상담내역</caption>
                  <colgroup>
                    <col width="14%" />
                    <col width="30%" />
                    <col width="42%" />
                    <col width="14%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>최종상담일자</th>
                      <th>상담진행차량</th>
                      <th>최초상담내용</th>
                      <th>답변여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isEmpty(counselCarList) &&
                      counselCarList.map((counsel, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ padding: '0px 20px 0px 20px' }}>
                              {moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('YYYY.MM.DD')}
                              <br />
                              {moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('hh:mm')}
                            </td>
                            <td>
                              <ImgCover src={`${imgUrl}${counsel.cnslPrgrCrImg}`} alt="차량이미지" />
                              <div className="summary">
                                <h4 className="subject">{counsel.crNm}</h4>
                              </div>
                            </td>
                            <td>{counsel.noteCntn}</td>
                            <td>
                              {counsel.answerYn === 'Y' ? '답변완료' : '답변대기'}
                              <br />
                              <Button
                                size="mid"
                                line="gray"
                                color="black"
                                radius={true}
                                title="내용보기"
                                width={100}
                                height={32}
                                marginTop={8}
                                onClick={(e) => notePopupOpen(e, { dlrPrdId: counsel.dlrPrdId, mbId: counsel.mbId })}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    {isEmpty(counselCarList) && (
                      <tr className="list-none">
                        <td colSpan="4">최근 쪽지상담 하신 내역이 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!isEmpty(counselCarList) && <PageNavigator className="mt40" blockSize={10} currentPage={currentPage} recordCount={totalRecord} recordSize={10} changed={pageChangeHandler} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotePopup show={popupShow} onChange={closeNotePop} value={counselId} />
    </AppLayout>
  );
};

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default CounselCar;
