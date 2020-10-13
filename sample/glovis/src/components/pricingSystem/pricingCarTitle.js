import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@lib/share/items/Button';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { setToggleCarSelectionPopUp } from '@src/actions/pricing/pricingSystemActions';

const PricingCarTitle = ({ carInfo, withoutGrade = false, isPrint = false, onReportPrint }) => {
  const dispatch = useDispatch();

  const handlePrint = useCallback(
    (e) => {
      if (onReportPrint) {
        onReportPrint(e, carInfo);
      }
    },
    [carInfo, onReportPrint]
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleNameEdit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setToggleCarSelectionPopUp());
    },
    [dispatch]
  );

  if (objIsEmpty(carInfo) || objIsEmpty(carInfo)) {
    return null;
  }

  return (
    <ul className="tit-wrap">
      {isPrint === false && (
        <li className="img-wrap">
          <img src="/images/dummy/market-thum-img.png" alt="차량 썸네일 이미지" />
        </li>
      )}
      <li className="tit">
        <h4>
          {(carInfo && carInfo.crNm) || ''}
          {withoutGrade === false && <i className="ico-pencil" onClick={handleNameEdit} />}
        </h4>
      </li>
      {carInfo && carInfo.resStatus && carInfo.resStatus.rstCode === '1' && isPrint === true && (
        <li>
          <Button size="mid" line="black" color="black" title="시세리포트 출력" width={146} onClick={handlePrint} />
        </li>
      )}
    </ul>
  );
};

PricingCarTitle.propTypes = {
  carInfo: PropTypes.object,
  isPrint: PropTypes.bool,
  withoutGrade: PropTypes.bool,
  onReportPrint: PropTypes.func
};

PricingCarTitle.defaultProps = {
  isPrint: false
};

export default PricingCarTitle;
