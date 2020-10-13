import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'next/router';
import { isEmpty } from 'lodash';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';

import AppLayout from '@src/components/layouts/AppLayout';
import { getAuctionHouseList, setInputInfo } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';

import KakaoMap from '@src/components/common/KakaoMap';

const ViewMap = ({ query }) => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_AUTO_AUCTION });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const { seq } = query;
  const { auctionHouseList } = useSelector((state) => state.autoAuction);

  useEffect(() => {
    if (seq !== undefined) window.scrollTo(0, 0);
  }, []);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '경매장 위치 안내',
        options: ['close']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 24,
        color: '#fff'
      }
    });
    return (
      <AppLayout>
        {!isEmpty(auctionHouseList) && (
          <TabMenu type="type2" mount={true} defaultTab={seq !== undefined ? Number(seq) - 1 : 0}>
            {auctionHouseList.map((house, index) => {
              console.log(house)
              return (
                <TabCont tabTitle={house.auctNm} id={'tab1-' + (index + 1)} index={index} key={index}>
                  <div className="content-wrap pt24 fs0">
                    <table summary="경매장 위치에 대한 내용" className="table-tp1 mb16">
                      <caption className="away">경매장 위치 안내</caption>
                      <colgroup>
                        <col width="25%" />
                        <col width="65%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th>구분</th>
                          <td>{house.auctNm}</td>
                        </tr>
                        <tr>
                          <th>전화번호</th>
                          <td>{house.auctTelNo}</td>
                        </tr>
                        <tr>
                          <th>팩스</th>
                          <td>{house.auctFaxNo}</td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td>{house.auctAddr}</td>
                        </tr>
                      </tbody>
                    </table>
                    <KakaoMap style={{ width: '100%', height: '400px', frameBorder: '0' }} addr={house.auctAddr} />
                  </div>
                </TabCont>
              );
            })}
          </TabMenu>
        )}
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

ViewMap.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  await reduxStore.dispatch(getAuctionHouseList());

  return {
    query
  };
};

export default withRouter(ViewMap);
