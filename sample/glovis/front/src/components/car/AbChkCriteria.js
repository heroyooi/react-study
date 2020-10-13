import React from 'react';

/**
 * 오토벨상세진단서의 '진단기준 파트'
 * @author 김민철
 * @returns {AutobellCriteria}
 */
const AutobellCriteria = () => {
  return (
    <div className="pd15">
      <h3 className="h3-tit mb20">오토벨 라이브 스튜디오 진단 분류 기준</h3>
      <table summary="진단 기준 분류" className="table-tp1 mb20">
        <colgroup>
          <col width="33.3%" />
          <col width="33.4%" />
          <col width="33.3%" />
        </colgroup>
        <thead>
          <tr>
            <th>완전무사고</th>
            <th>무사고</th>
            <th>유사고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>사고이력 없음</td>
            <td>외부패널의 교체 및 수리</td>
            <td>골격의 교체 및 수리</td>
          </tr>
        </tbody>
      </table>
      <p className="tx-exp-tp2 mb10">완전무사고 : 교환, 판금, 도색, 사고이력이 없는 한 건의 수리도 받지 않은 정비 이력을 가진 차량</p>
      <p className="tx-exp-tp2 mb10">무사고 : 골격이나 성능에 문제가 없지만, 가벼운 사로고 차량 외관 일부분을 구리 및 교체한 차량</p>
      <p className="tx-exp-tp2 mb20">유사고 차량 : 자동차의 주요 프레임(골격)을 교체했거나 구리한 이력이 있는 차량</p>
      <table className="table-tp1">
        <colgroup>
          <col width="30%" />
          <col width="70%" />
        </colgroup>
        <tbody>
          <tr>
            <th>외부패널</th>
            <td>후드 / 프론트휀더 / 도어 / 드렁크리드 / 라디에이터 서포트 / 루프패널 / 퀴터 패널/ 사이드실패널</td>
          </tr>
          <tr>
            <th>주요골격</th>
            <td>프론트패널 / 크로스맴버 / 인사이드패널 / 사이드멤버 / 휠하우스 / 대쉬패널 / 플로어패널 / 필러패널 / 리어패널 / 트렁크플로어</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AutobellCriteria;
