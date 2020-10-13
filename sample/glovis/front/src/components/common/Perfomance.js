import React from 'react';
import PropTypes from 'prop-types';

const Perfomance = ({ performData, dtailData }) => {
  return (
    <div className="con-wrap popup-performance">
      <ul className="tx-wrap">
        <li>본 차량의 성능기록부는 판매자가 직접 입력한 내용으로 모든 책임은 판매자에게 있습니다.</li>
        <li>성능점검기록부를 교부 받은 차량은 인수일 기준 30일 또는 2천km 이내 하자 발생 시 무상수리 및 보상이 가능합니다.</li>
        <li>유효기간은 점검일로부터 120일 이내이며, 유효기간이 지난 경우 재점검 후 교부를 요청하셔야 합니다.</li>
        <li>계약 시 보증수리 주체가 판매자(고지자)인지 점검자인지 확실하지 않다면 매매계약서 약관에 보증수리 주체를 표기한 뒤 유효한 날인을 받으셔야 합니다.</li>
      </ul>
      <table summary="성능점검기록부에 대한 내용" className="table-tp1">
        <caption>제 {performData.insp_id}호</caption>
        <colgroup>
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
          <col width="25%" />
        </colgroup>
        <tbody>
          <tr>
            <td>차명</td>
            <td className="pd8-12">{performData.cr_nm}</td>
            <td>차량등록번호</td>
            <td>{performData.vin}</td>
          </tr>
          <tr>
            <td>연식</td>
            <td>{performData.year}년</td>
            <td>주행거리/계기상태</td>
            <td>{performData.distance}</td>
          </tr>
          <tr>
            <td>검사유효기간</td>
            <td>{performData.period}</td>
            <td>최초등록일</td>
            <td>{performData.first_reg}</td>
          </tr>
          <tr>
            <td>원동기형식</td>
            <td>{performData.wonformat}</td>
            <td>변속기종류</td>
            <td>{performData.mission}</td>
          </tr>
          <tr>
            <td>차대번호</td>
            <td>{performData.car_nm}</td>
            <td>보증유형</td>
            <td>{performData.insuretype}</td>
          </tr>
          <tr>
            <td>동일성확인(차대번호 표기)</td>
            <td>{performData.sameconfirm}</td>
            <td>불법구조 변경</td>
            <td>{performData.violation}</td>
          </tr>
          <tr>
            <td>사고유무(단순수리 제외)</td>
            <td>{performData.isaccident}</td>
            <td>침수 유무</td>
            <td>{performData.isflooding}</td>
          </tr>
          <tr>
            <td>배출가스</td>
            <td>
              · {performData.discharge_gas1}
              <br />· {performData.discharge_gas2}
            </td>
            <td>배출가스</td>
            <td className="pd8-12">
              · {performData.discharge_gas3} 
              <br />· {performData.discharge_gas4}
              <br />· {performData.discharge_gas5}
            </td>
          </tr>
        </tbody>
      </table>
      <table summary="성능점검기록부에 대한 내용" className="table-tp1 th-c td-c mt64">
        <caption className="away">성능점검기록부에 대한 내용</caption>
        <colgroup>
          <col width="25%" />
          <col width="30%" />
          <col width="30%" />
          <col width="105%" />
        </colgroup>
        <thead>
          <tr>
            <th>주요장치</th>
            <th>항목</th>
            <th>해당 부품</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan="10">원동기</td>
            <td>작동상태</td>
            <td />
            <td>{dtailData.motor}</td>
          </tr>
          <tr>
            <td />
            <td>실린더헤드</td>
            <td>{dtailData.cylinderHead}</td>
          </tr>
          <tr>
            <td>오일누유</td>
            <td>실린더블럭</td>
            <td>{dtailData.cylinderBlockOil}}</td>
          </tr>
          <tr>
            <td>오일유량 및 오염</td>
            <td />
            <td>{dtailData.oil}</td>
          </tr>
          <tr>
            <td rowSpan="5">냉각수 누수</td>
            <td>실린더블럭</td>
            <td>{dtailData.coolingWater}</td>
          </tr>
          <tr>
            <td>실린더헤드/가스켓</td>
            <td>{dtailData.gasket}</td>
          </tr>
          <tr>
            <td>워터펌프</td>
            <td>{dtailData.waterPump}</td>
          </tr>
          <tr>
            <td>냉각쿨러(라디에이터)</td>
            <td>{dtailData.radiator}</td>
          </tr>
          <tr>
            <td>냉각수량 및 오염</td>
            <td>{dtailData.waterPollution}</td>
          </tr>
          <tr>
            <td>고압펌프(커먼레일)</td>
            <td />
            <td>{dtailData.highdroPump}</td>
          </tr>
          <tr>
            <td rowSpan="3">변속기</td>
            <td rowSpan="3">자동변속기 (A/T0)</td>
            <td>오일누유</td>
            <td>{dtailData.missionOil}</td>
          </tr>
          <tr>
            <td>오일유량 및 상태</td>
            <td>{dtailData.missionOilStatus}</td>
          </tr>
          <tr>
            <td>작동상태 (공회전)</td>
            <td>{dtailData.idling}</td>
          </tr>
          <tr>
            <td rowSpan="3">동력전달</td>
            <td>클러치 어셈블리</td>
            <td />
            <td>{dtailData.cluch}</td>
          </tr>
          <tr>
            <td>등속조인트</td>
            <td />
            <td>{dtailData.joint}</td>
          </tr>
          <tr>
            <td>추진축 및 베어링</td>
            <td />
            <td>{dtailData.bearing}</td>
          </tr>
          <tr>
            <td rowSpan="4">조향</td>
            <td>동력조항 작동 오일 누유</td>
            <td />
            <td>{dtailData.cluch}</td>
          </tr>
          <tr>
            <td rowSpan="3">작동상태</td>
            <td>스티어링 기어</td>
            <td>{dtailData.stearingGear}</td>
          </tr>
          <tr>
            <td>스티어링 펌프</td>
            <td>{dtailData.stearingPump}</td>
          </tr>
          <tr>
            <td>타이어로드엔드 및 볼조인트</td>
            <td>{dtailData.ballJoint}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Perfomance.propTypes = {
  performData: PropTypes.object,
  dtailData: PropTypes.object
};

export default Perfomance;
