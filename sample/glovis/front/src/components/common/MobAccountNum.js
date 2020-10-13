import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { getLatestAccountList } from '@src/actions/autoAuction/autoAuctionAction';

const MobAccountNum = ({ mbId, onChange }) => {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.autoAuction.latestAccountList);

  const handleTrClick = (e, accountData) => {
    console.log('*** handleTrClick', accountData);
    e.preventDefault();
    if (onChange) onChange(e, accountData);
  };

  useEffect(() => {
    if (isEmpty(accountList)) {
      dispatch(getLatestAccountList(mbId));
    }
  }, []);

  return (
    <div className="content-wrap ">
      <table summary="최근 계좌번호 제목" className="table-tp1 th-c td-c mt20">
        <caption className="away">최근 계좌번호 제목</caption>
        <colgroup>
          <col width="25%" />
          <col width="25%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>예금주</th>
            <th>분당</th>
            <th>계좌번호</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(accountList) &&
            accountList.data.statusinfo.returncd === '000' &&
            accountList.data.data.map((account, index) => {
              return (
                <tr key={index} onClick={(e) => handleTrClick(e, account)}>
                  <td>{account.accountNm}</td>
                  <td>{account.bankNm}</td>
                  <td>{account.accountNo}</td>
                </tr>
              );
            })}
          {!isEmpty(accountList) && accountList.data.statusinfo.returncd !== '000' && (
            <tr>
              <td colSpan="3">최근 계좌번호가 없습니다.</td>
            </tr>
          )}
          {isEmpty(accountList) && (
            <tr>
              <td colSpan="3">최근 계좌번호가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MobAccountNum;
