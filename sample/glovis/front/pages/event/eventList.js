/**
 * 설명 : 진행중/종료된 이벤트리스트를 보여준다.
 * @fileoverview 이벤트 > 진행중/종료된 이벤트
 * @requires [eventListAction]
 * @author 왕태식
 */

import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import Button from '@lib/share/items/Button';
import ImgCover from '@lib/share/items/ImgCover';
import { getEventLists, getEventListBanner, getEventEndLists, getEventListsClear } from '@src/actions/event/eventListAction';
import { SECTION_EVENT, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
export const baseImgUrl = process.env.IMGURL;
/**
 * 설명 : 이벤트 메뉴에서 진행중/종료된 이벤트리스트를 보여준다.
 * @param {eventList} 이벤트리스트
 * @returns {eventList} 이벤트리스트
 */

const EventList = memo(({ router }) => {
  const dispatch = useDispatch();
  const { eventType } = router.query;
  const index = Number(router.query.eventTp);
  
  const [ingEvent, setIngEvent] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [endpageNo, setEndPageNo] = useState(1);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { eventLists, eventEndLists, pagingInfo, endpagingInfo } = useSelector((state) => state.eventListReducer);
  const [mobEventListsData, setMobEventListsData] = useState([]);
  const mobCurrentPage = useRef(1);

  console.log('paginInfo => ', pagingInfo);
  console.log('endpagingInfo => ', endpagingInfo);

  const tabClick = (e, idx) => {
    console.log('test idx => ', idx);
    if (idx === 0) {
      setIngEvent(true);
      setDefaultIndex(idx);
    } else {
      setIngEvent(false);
      setDefaultIndex(idx);
    }
  };

  const handleBtnClick = useCallback((e, id, code, url) => {
    e.preventDefault();
    Router.push(url + '?evtNttId=' + id + '&eventTp=' + code);
  }, []);

  const clickPageNavi = (e, clickedPageNo) => {
    setPageNo(clickedPageNo);
  };
  const clickEndPageNavi = (e, clickedPageNo) => {
    setEndPageNo(clickedPageNo);
  };

  // 아래도 쌍으로 추가
  useEffect(() => {
    if (hasMobile) {
      dispatch(getEventLists(pageNo, '02'));
    } else {
      dispatch(getEventLists(pageNo, '02'));
      dispatch(getEventListBanner(pageNo, '02'));
      dispatch(getEventEndLists(endpageNo));
    }
  }, [pageNo, endpageNo]);

  useEffect(() => {
    return () => {
      dispatch(getEventListsClear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (eventType === 'end') {
      return setDefaultIndex(1);
    }
    if (index !== NaN) {
      if (index === 3) {
        setDefaultIndex(1);
      } else {
        setDefaultIndex(0);
      }
    }
  }, [index, eventType]);

  const handleMore = (e) => {
    e.preventDefault();
    mobCurrentPage.current++;
    setPageNo(mobCurrentPage.current++);
  };

  useEffect(() => {
    if (eventLists) {
      setMobEventListsData(mobEventListsData.concat(eventLists));
    }
    dispatch({ type: SECTION_EVENT });
    if(hasMobile){
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '이벤트',
          options: ['back', 'gnb']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 24,
          color: '#ffffff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: true
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventLists]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="event-contents">
          <TabMenu type="type2 big" mount={false} defaultTab={0} tabLink={[{ index: 1, url: '/event/pointMall' }]}>
            <TabCont tabTitle="이벤트" id="tab1-1" index={0} />
            <TabCont tabTitle="포인트제휴몰" id="tab1-2" index={1} />
          </TabMenu>

          <p className="event-msg">
            오토벨이 준비한 다양한 이벤트를 통해<span>특별한 혜택을 만나보세요!</span>
          </p>
          <SlideBanner car_list={eventLists} touch={true} dots={true} autoplay={true} slideType="banner-single">
            {//상단 이벤트 배너
            eventLists.map((v) => {
              return (
                <div key={v.evtNttId} className="event-banner-item">
                  <Link href="#">
                    <a href="#" onClick={(e) => handleBtnClick(e, v.evtNttId, v.progressCode, '/event/eventView')}>
                      <ImgCover src={`${baseImgUrl}${v.rollPhtUrl}`} />
                    </a>
                  </Link>
                </div>
              );
            })}
          </SlideBanner>

          <div className="event-list pdside20 mt20">
            <ul>
              {//이벤트 리스트
              eventLists.map((v) => {
                return (
                  <li key={v.evtNttId}>
                    <a href="#" onClick={(e) => handleBtnClick(e, v.evtNttId, v.progressCode, '/event/eventView')}>
                      <div className="img-area">
                        <ImgCover src={`${baseImgUrl}${v.cardPhtUrl}`} />
                        <span className={v.progressCode === '02' ? 'bul-ing-event' : 'bul-end-event'}>{v.progressCode === '02' ? '진행중' : '종료'}</span>
                      </div>
                      <p className={v.progressCode === '02' ? 'tit-area ing' : 'tit-area end'}>{v.nttTtl}</p>
                      <p className="date-area">
                        {v.evtStrtYmd} ~ {v.evtEndYmd}
                      </p>
                    </a>
                  </li>
                );
              })}
            </ul>
            {mobCurrentPage.current * pagingInfo.recordCountPerPage < pagingInfo.totalRecordCount && (
              <div className="mt16">
                <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} fontSize={14} onClick={handleMore} />
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap event-contents">
        <h3>이벤트</h3>
        <TabMenu
          type="type1"
          defaultTab={defaultIndex}
          callBack={tabClick}
          tabLink={[
            { index: 0, url: '/event/eventList' },
            { index: 1, url: '/event/eventList?eventType=end' },
            { index: 2, url: '/event/pointMall' }
          ]}
        >
          <TabCont tabTitle="진행중 이벤트" id="tab1-1" index={0}>
            {ingEvent && (
              <>
                <SlideBanner car_list={eventLists} touch={true} dots={true} autoplay={true} slideType="banner-single">
                  {//상단 이벤트 배너
                  eventLists.map((v, i) => {
                    return (
                      <div key={v.evtNttId} className="event-banner-item">
                        <a href="#" onClick={(e) => handleBtnClick(e, v.evtNttId, v.progressCode, '/event/eventView')}>
                          {/* <img src={`${baseImgUrl}${v.phtUrl}`} /> */}
                          <img src={`${baseImgUrl}${v.rollPhtUrl}`} />
                        </a>
                      </div>
                    );
                  })}
                </SlideBanner>
                <p className="event-msg">오토벨이 준비한 다양한 이벤트를 통해 특별한 혜택을 만나보세요!</p>
              </>
            )}
            <div className="event-list">
              <ul>
                {//이벤트 리스트
                eventLists.map((v, i) => {
                  return (
                    <li key={v.evtNttId}>
                      <a href="#" onClick={(e) => handleBtnClick(e, v.evtNttId, v.progressCode, '/event/eventView')}>
                        <div className="img-area">
                          <span className="bul-ing-event">진행중</span>
                          <img src={`${baseImgUrl}${v.cardPhtUrl}`} />
                        </div>
                        <p className="date-area">
                          {v.evtStrtYmd} ~ {v.evtEndYmd}
                        </p>
                        <p className="tit-area">{v.nttTtl}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="종료된 이벤트" id="tab1-2" index={1}>
            <div className="event-list">
              <ul>
                {//이벤트 리스트
                eventEndLists.map((v, i) => {
                  return (
                    <li key={v.evtNttId}>
                      <a href="#" onClick={(e) => handleBtnClick(e, v.evtNttId, v.progressCode, '/event/eventView')}>
                        <div className="img-area">
                          <span className="bul-end-event">종료</span>
                          <img src={`${baseImgUrl}${v.cardPhtUrl}`} />
                        </div>
                        <p className="date-area">
                          {v.evtStrtYmd} ~ {v.evtEndYmd}
                        </p>
                        <p className="tit-area">{v.nttTtl}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </TabCont>
          <TabCont tabTitle="포인트 제휴몰" id="tab1-3" index={2} />
        </TabMenu>
        {(function() {
          if (defaultIndex === 0)
            return <PageNavigator currentPage={pageNo} recordCount={pagingInfo.totalRecordCount} recordSize={pagingInfo.recordCountPerPage} changed={clickPageNavi} className="mt32" />;
          if (defaultIndex === 1)
            return <PageNavigator currentPage={endpageNo} recordCount={endpagingInfo.totalRecordCount} recordSize={endpagingInfo.recordCountPerPage} changed={clickEndPageNavi} className="mt32" />;
        })()}
      </div>
    </AppLayout>
  );
});

EventList.displayName = 'EventList';

export default withRouter(EventList);
