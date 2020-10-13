import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const CustomPop = ({ customerInfo = {}, closedHandler }) => {
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);

  if (hasMobile) {
    return (
      <>
        <div className="inner popup-tender">
          <h3 className="tit1 mb24">고객연락처 확인</h3> 
          <table summary="고객연락처 확인" className="table-tp1">
            <caption className="away">고객연락처 확인</caption>
            <colgroup>
              <col width="35%" />
              <col width="65%" />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td>{customerInfo.nmbNm}</td>
              </tr>
              <tr>
                <th>휴대전화번호</th>
                <td>{customerInfo.hpPn}</td>
              </tr>
              <tr>
                <th>거주지역</th>
                <td>
                  {customerInfo.rgstRsdcAddrCdNm} {customerInfo.rgstRsdcDtlAddrCdNm}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="tx-tp2 mt8">※ 고객님께 연락하시고 방문일자를 입력해주세요.</p>
        </div>
        <Button className="fixed" size="full" background="blue80" title="확인" fontWeight="500" onClick={closedHandler} />
      </>
    )
  }
  return (
    <div className="con-wrap popup-tender">
      <div className="register-form">
        <table summary="고객연락처 확인" className="table-tp2" style={{marginTop : '0px'}}>
          <caption className="away">고객연락처 확인</caption>
          <colgroup>
            <col width="35%" />
            <col width="65%" />
          </colgroup>
          <tbody>
            <tr>
              <th>이름</th>
              <td>{customerInfo.nmbNm}</td>
            </tr>
            <tr>
              <th>휴대전화번호</th>
              <td>{customerInfo.hpPn}</td>
            </tr>
            <tr>
              <th>거주지역</th>
              <td>
                {customerInfo.rgstRsdcAddrCdNm} {customerInfo.rgstRsdcDtlAddrCdNm}
              </td>
            </tr>
          </tbody>
        </table>
        <span className="sub">※ 고객님께 연락하시고 방문일자를 입력해주세요.</span>
        <Buttons align="center" marginTop={48}>
          <Button
            size="big"
            background="blue80"
            title="확인"
            width={245}
            onClick={(e) => {
              e.preventDefault();
              closedHandler(false);
            }}
          />
        </Buttons>
      </div>
    </div>
  );
};

export default CustomPop;
