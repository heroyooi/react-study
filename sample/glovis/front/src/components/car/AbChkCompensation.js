/**
 * 오토벨상세진단서의 '보상범위'
 * @author 김민철
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * 오토벨상세진단서의 '보상범위'
 * @param {Object} comp 보상범위 정보
 * @returns {AutobellCompensation}
 */
const AutobellCompensation = ({ comp = {} }) => {
  return (
    <div className="pd15">
      <h3 className="h3-tit mb20">보상범위에 대한 한도 고지</h3>
      <p className="mb20">
        라이브 슈튜디오에서 차량 명, 옵션, 사고유무에 대하여 점검오류 및 누락이 발생하였을 경우 이로 인해 발생한 고객의 피해는
        <br />
        오토벨 진단 보상프로그램에 의거하여 진단 서비스의 경우 진단 후 3개월 / 5천 km이내 진단비의 최대 20배까지 보상해 드립니다.
      </p>
      <table summary="보상범위에 대한 한도 고지" className="table-tp1 mb20">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>사고여부</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>진단비의 20배 이내</td>
            <td>보상범위 내에서 사고 감가표 적용</td>
          </tr>
        </tbody>
      </table>
      <h4 className="h4-hit mb10">사고 감가표</h4>
      <table summary="사고감가표" className="table-tp1">
        <colgroup>
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <thead>
          <tr>
            <th>평가항목</th>
            <th>감가율</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>앞펜더(부위별)</td>
            <td>{comp.frontFender}</td>
          </tr>
          <tr>
            <td>본넷교체</td>
            <td>{comp.bonnet}</td>
          </tr>
          <tr>
            <td>플라스틱 라디에이터 서포트</td>
            <td>{comp.radiatorSupport}</td>
          </tr>
          <tr>
            <td>프론트패널</td>
            <td>{comp.frontPannel}</td>
          </tr>
          <tr>
            <td>A필러(부위별)</td>
            <td>{comp.AFiller}</td>
          </tr>
          <tr>
            <td>B필러(부위별)</td>
            <td>{comp.BFiller}</td>
          </tr>
          <tr>
            <td>사이드실(부위별)</td>
            <td>{comp.sideSill}</td>
          </tr>
          <tr>
            <td>인사이드패널(부위별)</td>
            <td>{comp.insidePannel}</td>
          </tr>
          <tr>
            <td>휠하우스(부위별)</td>
            <td>{comp.wheelHouse}</td>
          </tr>
          <tr>
            <td>뒤힐하우스(부위별)</td>
            <td>{comp.backWheelHouse}</td>
          </tr>
          <tr>
            <td>트렁크플로어패널</td>
            <td>{comp.trunkFloorPannel}</td>
          </tr>
          <tr>
            <td>도어(부위별)</td>
            <td>{comp.door}</td>
          </tr>
          <tr>
            <td>루프패널</td>
            <td>{comp.roofPannel}</td>
          </tr>
          <tr>
            <td>우물정자프레임</td>
            <td>{comp.sharfShapeFrame}</td>
          </tr>
          <tr>
            <td>리어패널</td>
            <td>{comp.rearPannel}</td>
          </tr>
          <tr>
            <td>퀴터패널(부위별)</td>
            <td>{comp.quiterPannel}</td>
          </tr>
          <tr>
            <td>침수차량</td>
            <td>{comp.flooding}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

AutobellCompensation.propTypes = {
  comp: PropTypes.object
};

export default AutobellCompensation;
