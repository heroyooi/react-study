import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from "next/router";
import AppLayout from '@src/components/layouts/AppLayout';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';


const viewMap = ({ router }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const { seq } = router.query;
  useEffect(() => {
    if (seq !== undefined) window.scrollTo(0, 0);
  }, [])

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경마장 위치 안내',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        <TabMenu type="type2" mount={false} defaultTab={seq !== undefined ? Number(seq)-1 : 0}>
          <TabCont tabTitle="분당 경매장" id="tab1-1" index={0}>
            <div className="content-wrap pt24">
              <table summary="경매장 위치에 대한 내용" className="table-tp1 mb16">
                <caption className="away">경매장 위치 안내</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="65%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <td>오토벨분당센터</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>031-760-5309</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>031-768-4671</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>(12773)경기도 광주시 능평로167</td>
                  </tr>
                </tbody>
              </table>
              <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="181" frameBorder="0" allowFullScreen></iframe>
            </div>
          </TabCont>
          <TabCont tabTitle="양산 경매장" id="tab1-2" index={1}>
            <div className="content-wrap pt24">
              <table summary="경매장 위치에 대한 내용" className="table-tp1 mb16">
                <caption className="away">경매장 위치 안내</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="65%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <td>오토벨양산센터</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>055-370-2803</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>055-367-5775</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>(50567) 경남 양산시 산막공단북9길 33</td>
                  </tr>
                </tbody>
              </table>
              <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="181" frameBorder="0" allowFullScreen></iframe>
            </div>
          </TabCont>
          <TabCont tabTitle="시화 경매장" id="tab1-3" index={2}>
            <div className="content-wrap pt24">
              <table summary="경매장 위치에 대한 내용" className="table-tp1 mb16">
                <caption className="away">경매장 위치 안내</caption>
                <colgroup>
                  <col width="25%" />
                  <col width="65%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>구분</th>
                    <td>오토벨시화센터</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>031-496-5007</td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>031-434-8601</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td>(15073) 경기도 시흥시 정왕천로 271</td>
                  </tr>
                </tbody>
              </table>
              <iframe  id="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.8997624344956!2d127.01552801565039!3d37.51028223510467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3de09019397%3A0xcc5f8d201cd1f459!2z7ISc7Jq47Yq567OE7IucIOyEnOy0iOq1rCDsnqDsm5Drj5kg7Iug67CY7Y-s66GcIDMxMQ!5e0!3m2!1sko!2skr!4v1571620018249!5m2!1sko!2skr" width="100%" height="181" frameBorder="0" allowFullScreen></iframe>
            </div>
          </TabCont>
        </TabMenu>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      모바일 페이지만 존재합니다.
    </AppLayout>
  )
}

export default withRouter(viewMap);