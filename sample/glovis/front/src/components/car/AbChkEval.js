/**
 * 오토벨상세진단서의 '진단평가 결과 파트'
 * @author 김민철
 */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * 오토벨상세진단서의 '진단평가 결과 파트'
 * @param {Object} evalData 평가정보
 * @param {Object} evalData.outPannel 외부패널 정보
 * @param {Object} evalData.mainFrame 주요골격 정보
 * @returns {AbChkEval}
 */
const AbChkEval = ({ evalData = { outPannel: {}, mainFrame: {} } }) => {
  return (
    <div>
      <div className="mb20 pd15" style={{ display: 'flex' }}>
        <div style={{ flexGrow: '1' }}>외부 패널 이미지</div>
        <div style={{ flexGrow: '1' }}>주요 골격 이미지</div>
      </div>
      <div className="pd15">
        <table summary="상태부호표시" className="table-tp1 mb20">
          <colgroup>
            <col width="50%" />
            <col width="50%" />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2}>상태표시 부호</th>
            </tr>
            <tr>
              <th>판금/용접</th>
              <th>교환</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>판금용접 아이콘</td>
              <td>교환 아이콘</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: '1' }} className="pd15">
          <table summary="상태부호표시" className="table-tp1" style={{ width: '100%' }}>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>후드</th>
                <td>{evalData.outPannel.hood}</td>
              </tr>
              <tr>
                <th>프론트 휀더</th>
                <td>{evalData.outPannel.frontFender}</td>
              </tr>
              <tr>
                <th>도어</th>
                <td>{evalData.outPannel.door}</td>
              </tr>
              <tr>
                <th>트렁크리드</th>
                <td>{evalData.outPannel.trunkLeed}</td>
              </tr>
              <tr>
                <th>
                  라디에이터 서포트
                  <br />
                  (볼트체결부품)
                </th>
                <td>{evalData.outPannel.radiatorSupport}</td>
              </tr>
              <tr>
                <th>루프패널</th>
                <td>{evalData.outPannel.roofPannel}</td>
              </tr>
              <tr>
                <th>퀴터패널</th>
                <td>{evalData.outPannel.quiterPannel}</td>
              </tr>
              <tr>
                <th>사이드실패널</th>
                <td>{evalData.outPannel.sidePannel}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ flexGrow: '1' }} className="pd15">
          <table summary="상태부호표시" className="table-tp1">
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>프론트 패널</th>
                <td>{evalData.mainFrame.frontPannel}</td>
              </tr>
              <tr>
                <th>크로스 맴버</th>
                <td>{evalData.mainFrame.crossMember}</td>
              </tr>
              <tr>
                <th>인사이드 패널</th>
                <td>{evalData.mainFrame.insidePannel}</td>
              </tr>
              <tr>
                <th>사이드멤버</th>
                <td>{evalData.mainFrame.sideMember}</td>
              </tr>
              <tr>
                <th>휠하우스</th>
                <td>{evalData.mainFrame.wheelHouse}</td>
              </tr>
              <tr>
                <th>대쉬패널</th>
                <td>{evalData.mainFrame.dashPannel}</td>
              </tr>
              <tr>
                <th>플로어패널</th>
                <td>{evalData.mainFrame.floorPannel}</td>
              </tr>
              <tr>
                <th>필러패널</th>
                <td>{evalData.mainFrame.fillerPannel}</td>
              </tr>
              <tr>
                <th>리어패널</th>
                <td>{evalData.mainFrame.rearPannel}</td>
              </tr>
              <tr>
                <th>트렁크 플로어</th>
                <td>{evalData.mainFrame.trunkFloor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

AbChkEval.propTypes = {
  evalData: PropTypes.object
};

export default AbChkEval;
