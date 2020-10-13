import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getDepositWaitingListAction, getCancellationNRefundListAction } from '@src/actions/mypage/dealer/dealerAdverAction';
// import { getDealerProdCntAction } from '@src/actions/mypage/dealer/dealerProdListAction';

import TabDepositWaiting from './tabDepositWaiting/tabDepositWaiting';
import TabCancelAndRefund from './tabCancelAndRefund/tabCancelAndRefund';

const MobDealerAdManagement = ({ params, management, sub }) => {
  const dispatch = useDispatch();
  const dealerAdverStore = useSelector((rootStore) => rootStore.dealerAdver);

  const initParams = {
    ...params,
    viewPageCnt: 4,
    management: management,
    sub: sub
  };

  // useEffect(() => {
  //   console.warn('initParams >>>', initParams);
  // }, [initParams]);

  useState(() => {
    if (management === 'adver') {
      if (sub === '3') {
        dispatch(getDepositWaitingListAction(initParams));
      } else if (sub === '5') {
        dispatch(getCancellationNRefundListAction(initParams));
      }
    }
  }, [management, sub]);

  const handleGetDataList = (cb) => {
    if (cb?.type === 'append') {
      const appendParams = {
        ...initParams,
        currentPage: cb.mobPage
      };
      const isAppendList = true;
      if (cb.caller === 'waiting') {
        dispatch(getDepositWaitingListAction(appendParams, isAppendList));
      } else if (cb.caller === 'refund') {
        dispatch(getCancellationNRefundListAction(appendParams, isAppendList));
      }
    } else {
      const newParams = {
        ...initParams,
        startDt: cb.startDt,
        endDt: cb.endDt,
        currentPage: cb.mobPage
      };
      if (cb.caller === 'waiting') {
        // dispatch(getDepositWaitingListAction(newParams));
      } else if (cb.caller === 'refund') {
        dispatch(getCancellationNRefundListAction(newParams));
      } else if (cb.caller === 'waitingCancel') {
        dispatch(getDepositWaitingListAction(initParams));
      }
    }
  };

  if (management === 'adver') {
    if (sub === '3') {
      return (
        <div>
          <TabDepositWaiting params={initParams} eventHandler={handleGetDataList} advStore={dealerAdverStore} />
        </div>
      );
    } else if (sub === '5') {
      return (
        <div>
          <TabCancelAndRefund params={initParams} eventHandler={handleGetDataList} advStore={dealerAdverStore} />
        </div>
      );
    }
  }
};

MobDealerAdManagement.propTypes = {
  params: PropTypes.object,
  management: PropTypes.string,
  sub: PropTypes.string
};

export default memo(MobDealerAdManagement);
