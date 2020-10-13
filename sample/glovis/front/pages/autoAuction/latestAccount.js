/**
 * 설명 : 스마트옥션 최근 계좌 목록
 * @fileoverview 스마트옥션 > 내 차 출품하기
 * @requires [autoAuctionAction]
 * @author 박진하
 */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

import { getLatestAccountList } from '@src/actions/autoAuction/autoAuctionAction';
import { preventScroll } from '@src/utils/CommonUtil';

/**
 * 설명 : 스마트옥션 출품 회원정보를 입력시 최근 계좌 목록을 호출한다.
 * @param {state.autoAuction.latestAccountList} 최근 계좌 목록
 * @returns {LatestAccount} 최근 계좌 목록
 */
const LatestAccount = ({ mbId, show = false, onChange }) => {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.autoAuction.latestAccountList);
  const [accountPopup, setAccountPopup] = useRodal(show);

  useEffect(() => {
    setAccountPopup(show);
  }, [setAccountPopup, show]);

  useEffect(() => {
    if (show === true) {
      if (isEmpty(accountList)) {
        dispatch(getLatestAccountList(mbId));
      }
    }
  }, [accountList, dispatch, mbId, show]);

  const modalClose = useCallback(
    (e, accountData) => {
      if (onChange) onChange(e, accountData);
    },
    [onChange]
  );

  const handleTrClick = useCallback(
    (e, accountData) => {
      preventScroll(false);
      modalClose(e, accountData);
    },
    [modalClose]
  );

  return (
    <RodalPopup show={accountPopup} type={'fade'} closedHandler={modalClose} title="최근 계좌번호" mode="normal" size="large" className="account">
      <div className="con-wrap">
        <table summary="최근 계좌번호 제목" className="table-tp1 th-c td-c has-event">
          <caption className="away">최근 계좌번호 제목</caption>
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="40%" />
          </colgroup>
          <thead>
            <tr>
              <th>예금주</th>
              <th>분당</th>
              <th>계좌번호</th>
            </tr>
          </thead>
        </table>
        <ColoredScrollbars autoHeightMax={241}>
          <table summary="최근 계좌번호 내용 목록" className="table-tp1 th-c td-c">
            <caption className="away">최근 계좌번호 내용 목록</caption>
            <colgroup>
              <col width="30%" />
              <col width="30%" />
              <col width="40%" />
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
        </ColoredScrollbars>
      </div>
    </RodalPopup>
  );
};

LatestAccount.propTypes = {
  show: PropTypes.bool,
  onChange: PropTypes.func,
  mbId: PropTypes.string
};

export default LatestAccount;
