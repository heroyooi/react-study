/**
 * 설명 : 진행중/종료된 이벤트 상세페이지를 보여준다.
 * @fileoverview 진행중/종료된 이벤트 상세
 * @requires [eventDetailAction]
 * @author 왕태식
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router, { withRouter } from 'next/router';

import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { getEventDetail } from '@src/actions/event/eventDetailAction';
import { SECTION_EVENT, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FOOTER_EXIST } from '@src/actions/types';
export const baseImgUrl = process.env.IMGURL;
/**
 * 설명 : 이벤트 메뉴에서 진행중/종료된 이벤트 상세페이지를 보여준다.
 * @param {eventDetail} 이벤트 상세페이지
 * @returns {eventDetail} 이벤트 상세페이지
 */
const EventView = ({ query, router }) => {
  const { evtNttId, eventTp } = query;
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const { eventType } = router.query;
  const [id, setId] = useState(evtNttId);
  const [code, setCode] = useState(eventTp);
  const { eventDetail } = useSelector((state) => state.eventDetailReducer);
  const [defaultIndex, setDefaultIndex] = useState(eventDetail.progressCode === '02' ? 0 : 1);

  const [ingEvent, setIngEvent] = useState(false);
  const tabClick = (e, idx) => {
    if (idx === 0) {
      setIngEvent(true);
    } else {
      setIngEvent(false);
    }
  };

  const tabLink = [
    { index: 0, url: '/event/eventList?index=0' },
    { index: 1, url: '/event/eventList?index=1' },
    { index: 2, url: '/event/eventList?index=2' }
  ];

  const onCancel = (e, id, code) => {
    if (id === null) {
      return;
    } else {
      setId(id);
      setCode(code);
    }
  };

  const onClickHomeHandler = (e, target) => {
    Router.push(`/event/eventList?eventTp=${target}`);
  };

  useEffect(() => {
    dispatch(getEventDetail(id, code));
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
          bottom: 60,
          color: '#ffffff'
        }
      });
      dispatch({
        type: MOBILE_FOOTER_EXIST,
        data: {
          exist: false
        }
      });
    }
  }, [id, code]);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="event-contents">
          <div className="event-view-tit">
            
            <h4 className="tit-area">{eventDetail.nttTtl}</h4>
            <span className="date-area">
              <span className={eventDetail.progressCode === '02' ? 'bul-ing-event' : 'bul-end-event'}>{eventDetail.progressCode === '02' ? '진행중' : '종료'}</span>
              {eventDetail.evtStrtYmd} ~ {eventDetail.evtEndYmd}
            </span>
          </div>

          <div className="event-view-cont">
            <div className="img-area">
              <img src={`${baseImgUrl}${eventDetail.phtUrl}`} />
            </div>
            <div className="txt-area">{eventDetail.nttCntn}</div>
          </div>

          <Button className="fixed" size="full" background="blue80" title="목록" onClick={(e) => onClickHomeHandler(e, code)} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="content-wrap event-contents">
        <h3>이벤트</h3>

        <TabMenu type="type1" defaultTab={eventDetail.progressCode === '02' ? 0 : 1} callBack={tabClick} tabLink={tabLink}>
          <TabCont tabTitle="진행중 이벤트" id="tab1-1" index={0} />
          <TabCont tabTitle="종료된 이벤트" id="tab1-2" index={1} />
          <TabCont tabTitle="포인트 제휴몰" id="tab1-3" index={2} />
        </TabMenu>
        <div className="event-view-tit">
          <span className={eventDetail.progressCode === '02' ? 'bul-ing-event' : 'bul-end-event'}>{eventDetail.progressCode === '02' ? '진행중' : '종료'}</span>
          <h4 className="tit-area">{eventDetail.nttTtl}</h4>
          <span className="date-area">
            {eventDetail.evtStrtYmd} ~ {eventDetail.evtEndYmd}
          </span>
        </div>

        <div className="event-view-cont">
          <div className="img-area">
            <img src={`${baseImgUrl}${eventDetail.phtUrl}`} />
          </div>
          <div className="txt-area">
            {eventDetail.nttCntn
              ? eventDetail.nttCntn.split('\n').map((item, index) => {
                return (
                  <span key={index} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all' }}>
                    {item}
                    <br />
                   </span>
                );
              }) : '' }
          </div>
        </div>

        <Buttons marginTop={60}>
          <span className="step-btn-l">
            <Button size="big" background="gray" title="이전" width={120} height={48} onClick={(e) => onCancel(e, eventDetail.prevEvtNttId, eventDetail.progressCode)} buttonMarkup={true} />
          </span>
          <span className="step-btn-r">
            <Button size="big" background="blue80" title="목록" width={120} height={48} onClick={(e) => onClickHomeHandler(e, code)} buttonMarkup={true} />
          </span>
        </Buttons>
      </div>
    </AppLayout>
  );
};
EventView.getInitialProps = async (http) => {
  const { req } = http;
  const query = req?.query || http?.query || '';
  return {
    query
  };
};
export default withRouter(EventView);
