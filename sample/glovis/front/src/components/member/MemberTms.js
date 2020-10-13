/**
 * 설명 : 회원 약관 정보
 * @fileoverview 기본 약관
 * @requires
 * @author D191364
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import CheckBox from '@lib/share/items/CheckBox';
import { SECTION_MYPAGE } from '@src/actions/types';

/**
 * 회원 약관
 * @param {object} 회원 약관
 * @return {MemberTms}
 */
const MemberTms = ({ memberInfoPwd, memberTmsInfo, onChange, handleFullpage }) => {
  console.log('::: MemberTms -> memberTmsInfo', memberTmsInfo);

  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const onHandleChange = (e, val) => {
    onChange(e, val);
  };

  const onHandleViewClick = (e, cont) => {
    handleFullpage(e, cont);
  };

  useEffect(() => {
    dispatch({ type: SECTION_MYPAGE });
  }, []);

  if (hasMobile) {
    return (
      <>
        <table className="table-tp2 th-none" summary="회원정보 수정 내용 약관">
          <caption className="away">회원정보 수정 내용 약관</caption>
          <tbody>
            <tr>
              <td>
                <ul className="check-select-list">
                  {!isEmpty(memberTmsInfo) &&
                    memberTmsInfo.map((lists, index) => {
                      return (
                        <li key={index}>
                          <CheckBox
                            id="chk-agree"
                            title={lists.indYn === 'Y' ? lists.cdNm + ' (필수)' : lists.cdNm + ' (선택)'}
                            onChange={(e) => onHandleChange(e, lists.tmsTp)}
                            checked={memberInfoPwd.cnsnYn === 'Y' ? true : false}
                          />
                          <span className="term-view" onClick={(e) => onHandleViewClick(e, lists.tmsCntn)} />
                        </li>
                      );
                    })}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <table className="table-tp1 input" summary="회원정보 수정 내용 약관">
        <caption className="away">회원정보 수정 내용 약관</caption>
        <colgroup>
          <col width="33%" />
          <col width="67%" />
        </colgroup>
        <tbody>
          {!isEmpty(memberTmsInfo) &&
            memberTmsInfo.map((lists, index) => {
              return (
                <tr key={index}>
                  <th>{lists.cdNm}</th>
                  <td>
                    <CheckBox
                      id="chk-agree"
                      title={lists.indYn === 'Y' ? lists.cdNm + ' (필수)' : lists.cdNm + ' (선택)'}
                      onChange={(e) => onHandleChange(e, lists.tmsTp)}
                      checked={memberInfoPwd.cnsnYn === 'Y' ? true : false}
                    />
                    <div className="terms-wrap">{lists.tmsCntn}</div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

MemberTms.propTypes = {
  memberInfoPwd: PropTypes.object,
  memberTmsInfo: PropTypes.any,
  onChange: PropTypes.func,
  handleFullpage: PropTypes.func
};

export default MemberTms;
