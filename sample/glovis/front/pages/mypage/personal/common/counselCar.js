/* eslint-disable no-unused-vars */
/**
 * 설명 : 쪽지 상담 내역
 * @fileoverview 딜러마이페이지>쪽지상담 내역
 * @requires [counselCarAction,notePopup]
 * @author 박진하
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, orderBy } from 'lodash';
import moment from 'moment';
import Router from 'next/router';
import { PulseLoader } from 'react-spinners';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import useRodal from '@lib/share/custom/useRodal';
import ImgCover from '@lib/share/items/ImgCover';
import RenderHelper from '@lib/share/render/helper';

import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import PageNavigator from '@src/components/common/PageNavigator';
// import { getCounselCarList, getCounselCarListMember } from '@src/actions/mypage/dealer/common/_counselCarAction';
import { getCounselCarList, getCounselCarListMember, ITEMS_PER_PAGE, setLoadingImageMobile } from '@src/actions/mypage/dealer/common/counselCarAction';

import NotePopup from './notePopup';

// mobile
import MobCounsel from '@src/components/common/MobCounsel';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';
import { imgUrl } from '@src/utils/HttpUtils';

/**
 * 설명 : 쪽지상담 내역을 조회 쪽지내용 팝업을 호출한다.
 * @param {state.counselCar.counselCarList} 쪽지 상담내역
 * @returns {CounselCar} 쪽지 상담내역
 */
const CounselCar = ({ query }) => {
  const dispatch = useDispatch();

  const counselCarList = useSelector((state) => state?.counselCar?.counselCarListMember);
  const currentPage = useSelector((state) => state?.counselCar?.counselPageNo);
  const mobCurrentPage = useRef(1);
  const totalPage = useSelector((state) => state?.counselCar?.counselTotalPageNoMember);
  const [popupShow, setPopupShow, popupOpenHandler, popupCloseHandler] = useRodal(false, true);
  const [counselId, setCounselId] = useState({});
  const isLoadingImage = useSelector((state) => state?.counselCar?.isLoadingImage); // 모바일용 로딩이미지
  const [loadingFlag, setLoadingFlag] = useState(true); // 모바일용 스크롤 호출 중복방지
  const [mobCounselCarList, setMobCounselCarList] = useState([]);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '쪽지상담 내역',
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
          exist: true
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
  const [popupShow1, setPopupShow1, popupOpenHandler1, popupCloseHandler1] = useRodal(false, true);

  const notePopupOpen = useCallback(
    (e, counselId) => {
      e && e.preventDefault();
      setCounselId(counselId);
      setPopupShow(!popupShow);
    },
    [popupShow, setPopupShow]
  );

  const closeNotePop = () => {
    setPopupShow(!popupShow);
    popupCloseHandler();
  };

  // useEffect(() => {
  //   console.log('useEffect');
  //   if (isEmpty(counselCarList)) dispatch(getCounselCarListMember());
  // }, []);

  useEffect(() => {
    const { dlrPrdId, mbId } = query;
    if (dlrPrdId && mbId) {
      notePopupOpen(null, { dlrPrdId, mbId });
    }
  }, [query]);

  const pageChangeHandler = (e, page) => {
    dispatch(getCounselCarListMember(page));
  };

  const handlerOnchange = (as) => {
    console.log(as);
  };

  const handleCounselDetail = (e, counselData) => {
    e.preventDefault();
  };

  const [fpCounsel, setFpCounsel] = useState(false);

  const handleFullpagePopup = useCallback(
    (e, data) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '상담내역 조회',
          options: ['close']
        }
      });
      setCounselId(data);
      setFpCounsel(true);
    },
    [dispatch]
  );

  // Mobile, 더보기
  const onScroll = useCallback(() => {
    const target = document.querySelector('#wrap');
    if (target.scrollTop + target.clientHeight > target.scrollHeight - 100 && loadingFlag) {
      if ((mobCurrentPage.current - 1) * ITEMS_PER_PAGE > mobCounselCarList.length) return;

      setLoadingFlag(false); // 스크롤 중에 호출 중복 방지
      dispatch(setLoadingImageMobile(true)); // 로딩이미지 on
      mobCurrentPage.current++;
      dispatch(getCounselCarListMember(mobCurrentPage.current));
    }
  }, [loadingFlag, mobCounselCarList, dispatch, counselCarList]);

  useEffect(() => {
    setLoadingFlag(true);
    setMobCounselCarList(mobCounselCarList.concat(counselCarList));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counselCarList]);

  useEffect(() => {
    if (hasMobile) document.querySelector('#wrap').addEventListener('scroll', onScroll);
    return () => {
      if (hasMobile) document.querySelector('#wrap').removeEventListener('scroll', onScroll);
    };
  }, [hasMobile, onScroll, mobCounselCarList]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="general-buy-sec">
          <div className="mypage-admin-title pd20">
            <p className="tx-exp-tp5">&#8251; 최근 1개월 이내 쪽지상담하신 내역입니다.</p>
            <p className="tx-exp-tp5">&#8251; 쪽지 상담을 하신 정보는 1개월까지 조회하실 수 있으며, 1개월이 지나면 삭제됩니다.</p>
          </div>
          <div className="list-wrap">
            {isEmpty(mobCounselCarList) && (
              <div className="list-none-wrap tp2">
                <div className="list-none">
                  <p>최근 쪽지상담 하신 내역이 없습니다.</p>
                  <Buttons align="center" marginTop={16}>
                    <Button size="mid" background="blue80" radius={true} title="차량검색" fontWeight={500} width={100} height={40} href="/buycar/buyCarList" nextLink={true} />
                  </Buttons>
                </div>
              </div>
            )}
            {!isEmpty(mobCounselCarList) && (
              <div className="content-wrap">
                <div className="goods-list admin-list tp3">
                  <ul>
                    {mobCounselCarList.map((counsel, index) => {
                      return (
                        <li onClick={(e) => handleFullpagePopup(e, { dlrPrdId: counsel.dlrPrdId, mbId: counsel.mbId })} key={index}>
                          <div className="img-cover">
                            <img src={`${imgUrl}${counsel.cnslPrgrCrImg}`} alt="차량 이미지" />
                          </div>
                          <div className="summary">
                            <ul className="date">
                              <li>{moment(counsel.lastCnsIdt, 'yyyymmddHHmmss').format('YYYY.MM.DD')}</li>
                            </ul>
                            <h5 className="subject">{counsel.crNm}</h5>
                            <div className="info-wrap">
                              <p className="name">장현대 (현대오토오토)</p>
                              <Button
                                size="sml"
                                background="blue20"
                                color="blue80"
                                radius={true}
                                title={counsel.answerYn === 'Y' ? '답변완료' : '답변대기'}
                                width={53}
                                height={24}
                                fontSize={10}
                                fontWeight={500}
                                marginTop={8}
                              />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {isLoadingImage && (
                    <div className="more-loading">
                      <PulseLoader size={15} color={'#ddd'} loading={isLoadingImage} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={100}>
          {fpCounsel && <MobCounsel value={counselId} />}
        </MobFullpagePopup>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="normal" />

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
                      <th>최종상담일시</th>
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
                              {moment(counsel.lastCnsIdt, 'YYYYMMDDHHmmss').format('HH:mm')}
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
                                onClick={(e) => notePopupOpen(e, { dlrPrdId: counsel.dlrPrdId, mbId: counsel.mbId, rgstId: counsel.rgstId })}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    {isEmpty(counselCarList) && (
                      <tr className="list-none">
                        <td colSpan="4">
                          최근 쪽지상담 하신 내역이 없습니다.
                          <br />
                          <Button size="big" background="blue80" title="차량검색 하러 가기" width={245} height={60} marginTop={16} href="/buycar/buyCarList" nextLink={true} />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {!isEmpty(counselCarList) && <PageNavigator className="mt20" blockSize={10} currentPage={currentPage} recordCount={totalPage} recordSize={10} changed={pageChangeHandler} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotePopup show={popupShow} onChange={closeNotePop} value={counselId} />
    </AppLayout>
  );
};

CounselCar.getInitialProps = async (http) => {
  const helper = new RenderHelper(http);
  const { query } = helper;

  await helper.dispatch(getCounselCarListMember());

  return {
    query
  };
};

export default CounselCar;
