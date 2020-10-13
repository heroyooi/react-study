import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import PageNavigator from '@src/components/common/PageNavigator';
import Button from '@lib/share/items/Button';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import ImgCover from '@lib/share/items/ImgCover';
import { event_banner_list as eventBannerList, event_banner_list_m as eventBannerList_m, event_list as eventList } from '@src/dummy';
import { SECTION_EVENT, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

const EventList = ({router}) => {
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
        bottom: 24,
        color: '#ffffff'
      }
    });

    const dummyData = {
      id:'새로추가된 id',
      ingEvent:false,
      imgUrl:"/images/dummy/img-event-01.jpg",
      href:'/event/eventView',
      alt:'이벤트 배너 alt 값',
      startDate:'2019.08.01',
      endDate:'2019.10.30',
      title:'더보기 클릭시 새롭게 로드되는 이벤트 더보기 클릭시 새롭게 로드되는 이벤트 더보기 클릭시 새롭게 로드되는 이벤트'
    }

    const [listData, setListData] = useState(eventList);
    const handleMore = (e) => {
      e.preventDefault();
      setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData])
    }

    return (
      <AppLayout>
        <div className="event-contents">
          <TabMenu type="type2 big" mount={false} defaultTab={0} tabLink={[{index: 1, url: '/event/pointMall' }]}>
            <TabCont tabTitle="이벤트" id="tab1-1" index={0}></TabCont>
            <TabCont tabTitle="포인트제휴몰" id="tab1-2" index={1}></TabCont>
          </TabMenu>
          
          <p className="event-msg">오토벨이 준비한 다양한 이벤트를 통해<span>특별한 혜택을 만나보세요!</span></p>
          <SlideBanner car_list={eventBannerList_m} touch={true} dots={true} autoplay={true} slideType="banner-single">
            {
              //상단 이벤트 배너
              eventBannerList_m.map((v, i) => {
                return (
                  <div key={v.id} className="event-banner-item">
                    <Link href={v.href}><a target="_self"><ImgCover src={v.imgUrl} alt={v.alt} /></a></Link>
                  </div>
                )
              })
            }
          </SlideBanner>
          
          <div className="event-list pdside20 mt20">
            <ul>
              {
                //이벤트 리스트
                listData.map((v, i) => {
                  return (
                    <li key={v.id}>
                      <a href={v.href}>
                        <div className="img-area">
                          <ImgCover src={v.imgUrl} alt={v.alt} />
                          <span className={v.ingEvent?"bul-ing-event":"bul-end-event"}>
                            {v.ingEvent?"진행중":"종료"}
                          </span>
                        </div>
                        <p className={v.ingEvent ? "tit-area ing" : "tit-area end"}>{v.title}</p>  
                        <p className="date-area">{v.startDate} ~ {v.endDate}</p>
                      </a>
                    </li>
                  )
                })
              }
            </ul>
            <div className="mt16">
              <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} fontSize={14} onClick={handleMore} />
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="content-wrap event-contents">
        <h3>이벤트</h3>
       
        <TabMenu type="type1" callBack={tabClick} defaultTab={ingEvent?0:1} tabLink={[{index: 2, url: '/event/pointMall' }]}>
          <TabCont tabTitle="진행중 이벤트" id="tab1-1" index={0}></TabCont>
          <TabCont tabTitle="종료된 이벤트" id="tab1-2" index={1}></TabCont>
          <TabCont tabTitle="포인트 제휴몰" id="tab1-3" index={2}></TabCont>
        </TabMenu>
        {ingEvent &&
        <>
          <SlideBanner car_list={eventBannerList} touch={true} dots={true} autoplay={true} slideType="banner-single">
            {
              //상단 이벤트 배너
              eventBannerList.map((v, i) => {
                return (
                  <div key={v.id} className="event-banner-item">
                    <a href={v.href}><img src={v.imgUrl} alt={v.alt}/></a>
                  </div>
                )
              })
            }
          </SlideBanner>
          <p className="event-msg">오토벨이 준비한 다양한 이벤트를 통해 특별한 혜택을 만나보세요!</p>
        </>
        }
        
        <div className="event-list">
          <ul>
            {
              //이벤트 리스트
              eventList.map((v, i) => {
                return (
                  <li key={v.id}>
                    <a href={v.href}>
                      <div className="img-area">
                        <span className={v.ingEvent?"bul-ing-event":"bul-end-event"}>
                          {v.ingEvent?"진행중":"종료"}
                        </span>
                        <img src={v.imgUrl} alt={v.alt} />
                      </div>
                      <p className="date-area">{v.startDate} ~ {v.endDate}</p>
                      <p className="tit-area">{v.title}</p>
                    </a>
                  </li>
                )
              })
            }
            
          </ul>
        </div>
        <PageNavigator recordCount={50} className="mt32" />
      </div>
    </AppLayout>
  )
}

export default withRouter(EventList);