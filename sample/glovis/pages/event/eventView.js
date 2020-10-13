import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import {event_detail} from '@src/dummy';
import { SECTION_EVENT, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const EventView = ({router}) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_EVENT });
  
  const { eventType } = router.query;
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [ingEvent, setIngEvent] = useState(eventType === "end" ?  false : true);
  const tabClick = (e,idx) => {
    if(idx === 0){
      setIngEvent(true);
    }
    else{
      setIngEvent(false);
    }
  }
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
    
    return (
      <AppLayout>
        <div className="event-contents">          
          <div className="event-view-tit">
            <span className={event_detail.ingEvent?"bul-ing-event":"bul-end-event"}>
              {event_detail.ingEvent?"진행중":"종료"}
            </span>
            <h4 className="tit-area">{event_detail.title}</h4>
            <span className="date-area">{event_detail.startDate} ~ {event_detail.endDate}</span>
          </div>
          
          <div className="event-view-cont">
            <div className="img-area"><img src={event_detail.imgUrl} alt={event_detail.alt} /></div>
            <div className="txt-area">
            {
              event_detail.detailCopy.split('\n').map((line,i) => {
                return (<p key={i}>{line}</p>)
              })
            }
            </div>
          </div>  
          
          <Button className="fixed" size="full" background="blue80" title="목록" href="/event/eventList" nextLink={true} />
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap event-contents">
        <h3>이벤트</h3>
       
        <TabMenu type="type1" callBack={tabClick} defaultTab={ingEvent?0:1} tabLink={[{ index: 0, url: '/event/eventList' },{ index: 1, url: '/event/eventList?eventType=end' },{ index: 2, url: '/event/pointMall' }]}>
          <TabCont tabTitle="진행중 이벤트" id="tab1-1" index={0}></TabCont>
          <TabCont tabTitle="종료된 이벤트" id="tab1-2" index={1}></TabCont>
          <TabCont tabTitle="포인트 제휴몰" id="tab1-3" index={2}></TabCont>
        </TabMenu>
        <div className="event-view-tit">
          <span className={event_detail.ingEvent?"bul-ing-event":"bul-end-event"}>
            {event_detail.ingEvent?"진행중":"종료"}
          </span>
          <h4 className="tit-area">{event_detail.title}</h4>
          <span className="date-area">{event_detail.startDate} ~ {event_detail.endDate}</span>
        </div>
        
        <div className="event-view-cont">
          <div className="img-area"><img src={event_detail.imgUrl} alt={event_detail.alt} /></div>
          <div className="txt-area">
          {
            event_detail.detailCopy.split('\n').map((line,i) => {
              return (<p key={i}>{line}</p>)
            })
          }
          </div>
        </div>  
        
        <Buttons marginTop={60}>
          <span className="step-btn-l">
            <Button size="big" background="gray" title="이전" width={120} height={48} />
          </span>
          <span className="step-btn-r">
            <Button size="big" background="blue80" title="목록" width={120} height={48} href="/event/eventList" nextLink={true} />
          </span>
        </Buttons>
      </div>
    </AppLayout>
  )
}

export default withRouter(EventView);