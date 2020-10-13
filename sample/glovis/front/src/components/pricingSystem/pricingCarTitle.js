import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { setToggleCarSelectionPopUp } from '@src/actions/pricing/pricingSystemActions';

const PricingCarTitle = ({ carInfo, hasCarInfo, hasPricing, isPrint, withoutGrade, onReportPrint }) => {
  const dispatch = useDispatch();

  const handlePrint = useCallback(
    (e) => {
      if (onReportPrint) {
        onReportPrint(e, carInfo);
      }
    },
    [carInfo, onReportPrint]
  );

  const handleNameEdit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setToggleCarSelectionPopUp());
    },
    [dispatch]
  );

  if (objIsEmpty(carInfo) || objIsEmpty(carInfo) || hasCarInfo === false) {
    return null;
  }

  return (
    <ul className="tit-wrap" data-url={carInfo.markerImg || ''}>
      {carInfo.markerImg ? (
        <li className="img-wrap">
          <img src={carInfo.markerImg} alt="제조사 썸네일 이미지" data-makerno={carInfo.modelInfo ? carInfo.modelInfo.crMnfcCd || '' : ''} />
        </li>
      ) : null}
      <li className="tit">
        <h4>
          {(carInfo && carInfo.crNm) || ''}
          {objIsEmpty(carInfo.grades) && withoutGrade === false ? <i className="ico-pencil" onClick={handleNameEdit} /> : null}
        </h4>
      </li>
      {carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '1' && isPrint === true && hasPricing === true && (
        <li>
          <Button size="mid" line="black" color="black" title="시세리포트 출력" width={146} onClick={handlePrint} />
        </li>
      )}
    </ul>
  );
};

PricingCarTitle.propTypes = {
  carInfo: PropTypes.object,
  hasCarInfo: PropTypes.bool,
  hasPricing: PropTypes.bool,
  isPrint: PropTypes.bool,

  withoutGrade: PropTypes.bool,
  onReportPrint: PropTypes.func
};

PricingCarTitle.defaultProps = {
  hasCarInfo: false,
  hasPricing: false,
  isPrint: true,
  withoutGrade: false
};

export default PricingCarTitle;
