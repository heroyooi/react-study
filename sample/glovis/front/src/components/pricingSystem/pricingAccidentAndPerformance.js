import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import CarPerformanceCheck from '@src/components/common/popup/CarPerformanceCheck';
import CarAccidentHistory from '@src/components/common/popup/CarAccidentHistory';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { axiosGet, axiosPost } from '@src/utils/HttpUtils';

const PricingAccidentAndPerformance = memo(({ crNo, carInfo, goodNo, isPerf, onClose }) => {
  const [perfData, setPerfData] = useState(null);
  const [accidentData, setAccidentData] = useState(null);

  const handleClose = useCallback(
    (e) => {
      onClose(e);
    },
    [onClose]
  );

  useEffect(() => {
    setPerfData(null);
    setAccidentData(null);

    if (isPerf === true) {
      axiosGet(`/api/api/homeservice/selectPerfinsRecord.do?perfInspId=${carInfo.perfInspId}&goodNo=${goodNo}`, null).then((res) => {
        setPerfData(res.data.data);
      });
    } else {
      axiosPost(`/api/autobell/sitemanagement/carHistory/carHistoryView.do`, { crNo: crNo, goodNo: goodNo }).then((res) => {
        setAccidentData(res.data.data);
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carInfo]);

  if (isPerf === true && objIsEmpty(perfData)) {
    return (
      <div className="page-loading">
        <span className="dim" />
        <ClipLoader size={40} color={'#fff'} loading={true} />
      </div>
    );
  }

  if (isPerf === false && objIsEmpty(accidentData)) {
    return (
      <div className="page-loading">
        <span className="dim" />
        <ClipLoader size={40} color={'#fff'} loading={true} />
      </div>
    );
  }

  if (isPerf === true && !objIsEmpty(perfData)) {
    return <CarPerformanceCheck perfData={perfData} mode="viewer" onChange={handleClose} />;
  }

  if (isPerf === false && !objIsEmpty(accidentData)) {
    return <CarAccidentHistory accidData={accidentData} mode="viewer" onChange={handleClose} />;
  }

  return null;
});

PricingAccidentAndPerformance.propTypes = {
  crNo: PropTypes.string,
  carInfo: PropTypes.object,
  goodNo: PropTypes.string,
  isPerf: PropTypes.bool,
  onClose: PropTypes.func
};

PricingAccidentAndPerformance.displayName = 'PricingPerformance';

export default withRouter(PricingAccidentAndPerformance);
