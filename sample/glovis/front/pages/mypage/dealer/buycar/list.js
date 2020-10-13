import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import { isEqual } from 'lodash';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import BiddCompList from '@src/components/mypage/dealer/buycar/biddCompList';
import SuccBiddList from '@src/components/mypage/dealer/buycar/succBiddList';
import SearchForm from '@src/components/mypage/dealer/buycar/SearchForm';
import SelfList from '@src/components/mypage/dealer/buycar/selfList';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_QUICK_EXIST, MOBILE_FOOTER_EXIST } from '@src/actions/types';

const List = memo(({ router }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
    if (hasMobile) {
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '24시간 실시간 비교견적',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hasMobile) {
    return (
      <AppLayout>
        <div className="admin-tender-sec">
          <TabMenu type="type2" mount={false}>
            <TabCont tabTitle="셀프평가 차량" id="tab2-1" index={0}>
              <SelfList />
            </TabCont>
            <TabCont tabTitle="낙찰 및 입찰차량 관리" id="tab2-2" index={1}>
              <div className="admin-tender-tab">
                <TabMenu type="type1" defaultTab={0} mount={false}>
                  <TabCont tabTitle="낙찰차량 구매관리" id="tab1-1" index={0}>
                    <SearchForm succBidd={true} title="낙찰차량" />
                    <div className="content-border">
                      <SuccBiddList />
                    </div>
                  </TabCont>
                  <TabCont tabTitle="입찰완료 내역" id="tab1-2" index={1}>
                    <SearchForm compBidd={true} title="입찰내역" />
                    <div className="content-border">
                      <BiddCompList router={router} />
                    </div>
                  </TabCont>
                </TabMenu>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />
        <div className="mypage-state-sec">
          <TabMenu type="type1" mount={false} defaultTab={0}>
            <TabCont tabTitle="셀프평가 차량" id="tab1-1" index={0}>
              <div className="admin-tender-sec">
                <SelfList />
              </div>
            </TabCont>
            <TabCont tabTitle="낙찰 및 입찰차량 관리" id="tab1-2" index={1}>
              <div className="admin-tender-tab">
                <TabMenu type="type6" defaultTab={0} mount={false}>
                  <TabCont tabTitle="낙찰차량 구매관리" id="tab6-1" index={0}>
                    <div className="admin-tender-sec">
                      <SearchForm succBidd={true} />
                      <div className="admin-list tp6">
                        <div className="content-top">
                          <SuccBiddList />
                        </div>
                      </div>
                    </div>
                  </TabCont>
                  <TabCont tabTitle="입찰완료 내역" id="tab6-2" index={1}>
                    <div className="admin-tender-sec co-sec">
                      <SearchForm compBidd={true} />
                      <div className="admin-list tp6">
                        <div className="content-top">
                          <BiddCompList router={router} />
                        </div>
                      </div>
                    </div>
                  </TabCont>
                </TabMenu>
              </div>
            </TabCont>
          </TabMenu>
        </div>
      </div>
    </AppLayout>
  );
});

List.propTypes = {
  router: PropTypes.object
};
List.displayName = 'List';
export default withRouter(List);
