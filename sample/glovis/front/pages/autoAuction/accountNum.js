import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import AppLayout from '@src/components/layouts/AppLayout';
import { getLatestAccountList } from '@src/actions/autoAuction/autoAuctionAction';
import { SECTION_AUTO_AUCTION, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE } from '@src/actions/types';


const AccountNum = ({ onChange }) => {
  const dispatch = useDispatch();
  
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const accountList = useSelector((state) => state.autoAuction.latestAccountList);

  const handleTrClick = (e, accountData) => {
    e.preventDefault();
    if (onChange) onChange(e, accountData);
  };

  useEffect(() =>{
    dispatch({ type: SECTION_AUTO_AUCTION });

    if(hasMobile){
      dispatch({
        type: MOBILE_HEADER_TYPE_SUB,
        data: {
          title: '최근계좌번호',
          options: ['close']
        }
      });
      dispatch({
        type: MOBILE_CONTENT_STYLE,
        data: {
          bottom: 80,
          color: '#fff'
        }
      });
    }
  },[dispatch])
  
  if (hasMobile) {
    return (
      <AppLayout>
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
          </table>
          <table summary="최근 계좌번호 내용 목록" className="table-tp1 th-c td-c">
            <caption className="away">최근 계좌번호 내용 목록</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="50%" />
            </colgroup>
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
      </AppLayout>
    );
  }
  return <AppLayout>모바일 페이지만 존재합니다.</AppLayout>;
};

AccountNum.getInitialProps = async (http) => {
  const { req, reduxStore } = http;
  const query = req?.query || http?.query || '';
  console.log('loginId >>>>>>>>>>>>>>>>', req.cookies['id']);
  let userId = req.cookies['id'];
  if (userId === '' || userId === undefined) {
    userId = 'D191379';
  }
  await reduxStore.dispatch(getLatestAccountList(userId));

  return { query };
};

export default AccountNum;
