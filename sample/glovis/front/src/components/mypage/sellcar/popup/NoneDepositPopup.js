/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

/**
 * 내차팔기 무평가 '입금정보' 처리 팝업
 * @fileoverview 내차팔기 무평가 '입금' 처리 팝업
 * @author 김민철
 */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import { setComma } from '@src/utils/StringUtil';
/**
 * 내차팔기 무평가 '입금정보' 처리 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {object} reqInfo 신청서 정보
 * @requires {NoneDepositPopup}
 */
const NoneDepositPopup = ({ reqInfo, closedHandler }) => {
  const dispatch = useDispatch();

  // 확인 처리 버튼 핸들러
  const okHandler = (e) => {
    e.preventDefault();
    closedHandler(false);
  };

  return (
    <>
      <div className="con-wrap popup-deposit">
          <div className="inner">
            {/* <p className="tx-gray mb16">입금 처리가 완료되었습니다.</p>
            <table summary="입금 내역에 대한 내용" className="table-tp1">
              <caption className="away">입금 내역</caption>
              <colgroup>
                <col width="40%" />
                <col width="60%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>은행명</th>
                  <td>KEB 하나은행</td>
                </tr>
                <tr>
                  <th>계좌번호</th>
                  <td>123123123123123123</td>
                </tr>
                <tr>
                  <th>차량 판매 금액</th>
                  <td>123,123,123,123원</td>
                </tr>
            </tbody>
          </table> */}
        </div>
        <p>현재 입금정보가 확인되지 않습니다.</p>
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="확인" width={130} height={48} onClick={okHandler} />
        </Buttons>
      </div>
    </>
  );
};

NoneDepositPopup.propTypes = {
  reqInfo: PropTypes.object
};

export default NoneDepositPopup;
