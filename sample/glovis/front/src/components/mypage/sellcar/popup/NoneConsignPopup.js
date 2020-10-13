/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

/**
 * 내차팔기 무평가 '탁송정보' 처리 팝업
 * @fileoverview 내차팔기 무평가 '판매진행' 처리 팝업
 * @author 김민철
 */

import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
/**
 * 내차팔기 무평가 '탁송정보' 처리 팝업
 * @param {bool} popupOpen 팝업 온/오프 플래그
 * @param {Object} consign 탁송 정보
 * @returns {NoneConsignPopup}
 */
const NoneConsignPopup = ({ consign, closedHandler }) => {
  return (
    <>
      <div className="con-wrap">
        {!isEmpty(consign) && (
          <table summary="탁송정보에 대한 내용" className="table-tp1 td-c">
            <caption className="away">탁송정보</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tbody>
              <tr>
                <td className="td8-12">
                  시간
                  <br />
                  (탁송일시)
                </td>
                <td>지역</td>
                <td>탁송기사</td>
                <td>연락처</td>
              </tr>
              <tr>
                <td className="td8-12">
                  2019-08-14
                  <br />
                  16:42
                </td>
                <td>서울권</td>
                <td>김현대</td>
                <td>010-1234-5678</td>
              </tr>
            </tbody>
          </table>
        )}
        {isEmpty(consign) && <h2>현재 탁송 진행상태가 아닙니다.</h2>}
        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={closedHandler(false)} />
        </Buttons>
      </div>
    </>
  );
};

NoneConsignPopup.propTypes = {
  consign: PropTypes.object
};

export default NoneConsignPopup;
