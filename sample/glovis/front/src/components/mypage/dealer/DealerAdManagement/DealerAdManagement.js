import { useState, useCallback, useContext, useEffect, createElement } from 'react';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';

import tabAdGuide from './tabAdGuide/tabAdGuide';
import tabPurchaseTicket from './tabPurchaseTicket/tabPurchaseTicket';
import tabPurchaseHistory from './tabPurchaseHistory/tabPurchaseHistory';
import tabDepositWaiting from './tabDepositWaiting/tabDepositWaiting';
import tabAdEffect from './tabAdEffect/tabAdEffect';
import tabCancelAndRefund from './tabCancelAndRefund/tabCancelAndRefund';

const tabList = [
  { title: '광고효과 분석', component: tabAdEffect },
  { title: '광고이용권 안내', component: tabAdGuide },
  { title: '이용권 구매', component: tabPurchaseTicket },
  { title: '결제내역', component: tabPurchaseHistory },
  { title: '입금대기 내역', component: tabDepositWaiting },
  { title: '취소 및 환불안내', component: tabCancelAndRefund }
];

const DealerAdManagement = ({ params, eventHandler, advStore, prodStore, memberInfo}) => {
  const { sub = 0 } = params;

  return (
    <div>
      <TabMenu
        type="type5"
        defaultTab={parseInt(sub)}
        mount={false}
        tabLink={[
          { index: 0, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=0' },
          { index: 1, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=1' },
          { index: 2, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=2' },
          { index: 3, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=3' },
          { index: 4, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=4' },
          { index: 5, url: '/mypage/dealer/sellcar/carManagement?management=adver&sub=5' }
        ]}
      >
        {tabList?.map((tab, i) => (
          <TabCont key={i} tabTitle={tab.title} id={`tab-${i}`} index={i}>
            {parseInt(sub) == i && createElement(tab.component, { params, eventHandler, advStore, prodStore, memberInfo })}
          </TabCont>
        ))}
      </TabMenu>
    </div>
  );
};
export default DealerAdManagement;
