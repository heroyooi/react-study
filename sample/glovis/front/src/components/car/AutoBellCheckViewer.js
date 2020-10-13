/**
 * 오토벨상세진단서 뷰어
 * @requires AbChkEval
 * @requires AbChkCriteria
 * @requires AbChkDiagnosis
 * @requires AbChkCompensation
 * @author 김민철
 */
import React from 'react';
import PropTypes from 'prop-types';

import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import AbChkEval from './AbChkEval';
import AbChkCriteria from './AbChkCriteria';
import AbChkDiagnosis from './AbChkDiagnosis';
import AbChkCompensation from './AbChkCompensation';

/**
 * 오토벨상세진단서 뷰어
 * @param {Object} evalData 진단평가 결과
 * @param {Object} diag 점검 결과
 * @param {Object} comp 보상범위 정보
 */
const AutoBellCheckViewer = ({ evalData, diag, comp }) => {
  return (
    <TabMenu type="type7" defaultTab={0} mount={false}>
      <TabCont tabTitle="진단평가 결과" id="tab7-1" index={0}>
        <br />
        <AbChkEval evalData={evalData} />
      </TabCont>
      <TabCont tabTitle="진단기준" id="tab7-2" index={1}>
        <br />
        <AbChkCriteria />
      </TabCont>
      <TabCont tabTitle="점검 결과" id="tab7-3" index={2}>
        <br />
        <AbChkDiagnosis data={diag} />
      </TabCont>
      <TabCont tabTitle="보상 범위" id="tab7-4" index={3}>
        <br />
        <AbChkCompensation comp={comp} />
      </TabCont>
    </TabMenu>
  );
};

AutoBellCheckViewer.propTypes = {
  evalData: PropTypes.object,
  diag: PropTypes.object,
  comp: PropTypes.object
};

export default AutoBellCheckViewer;
