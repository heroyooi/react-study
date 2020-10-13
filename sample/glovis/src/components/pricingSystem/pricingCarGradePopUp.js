import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useRodal from '@lib/share/custom/useRodal';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { getPricingCarGradeSpecification } from '@src/actions/pricing/pricingSystemActions';
import PricingCarGradeList from './pricingCarGradeList';
import PricingCarGradeSpec from './pricingCarGradeSpec';

const PricingCarGradePopUp = ({ dataContext, isPopUpMode, modelNo, onGradeSelect }) => {
  const dispatch = useDispatch();
  const [detailPopupShow, setDetailPopupShow, openDetailPopup, closeDetailPopup] = useRodal(false, true);
  const [detailMarginTop, setDetailMarginTop] = useState(170); // 상세사양보기 팝업의 위치를 설정

  const pricingCarGradeSpec = useSelector((state) => state.pricing.pricingCarGradeSpec);

  const handleDetailPopup = useCallback(
    (e, deps) => {
      e.preventDefault();
      dispatch(getPricingCarGradeSpecification(modelNo, deps, null));
      const index = dataContext.findIndex((x) => x.seriesNo === deps.seriesNo);
      setDetailMarginTop(170 + index * 73);
      setDetailPopupShow(true);
    },
    [dataContext, dispatch, modelNo, setDetailPopupShow]
  );

  const handleDetailPopUpClose = useCallback(
    (e) => {
      dispatch(getPricingCarGradeSpecification(null, null, null));
      closeDetailPopup(e);
    },
    [closeDetailPopup, dispatch]
  );

  const handleSelectGrade = useCallback(
    (e, deps) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (onGradeSelect) {
        onGradeSelect(e, deps);
      }
    },
    [onGradeSelect]
  );

  if (isPopUpMode === false) {
    return (
      <>
        <PricingCarGradeList dataList={dataContext} onClick={handleDetailPopup} onGradeSelect={handleSelectGrade} />;
        <RodalPopup show={detailPopupShow} type={'fade'} closedHandler={handleDetailPopUpClose} mode="normal" width={440} marginLeft={-140} marginTop={detailMarginTop}>
          <PricingCarGradeSpec pricingCarGradeSpec={pricingCarGradeSpec} />
        </RodalPopup>
      </>
    )
  }

  return (
    <React.Fragment>
      <div className="popup-grade">
        <div className="grade mt28">
          <ColoredScrollbars autoHeightMax={287}>
            <PricingCarGradeList dataList={dataContext} onClick={handleDetailPopup} onGradeSelect={handleSelectGrade} />
          </ColoredScrollbars>
        </div>
      </div>
      <RodalPopup show={detailPopupShow} type={'fade'} closedHandler={handleDetailPopUpClose} mode="normal" width={440} marginLeft={-140} marginTop={detailMarginTop}>
        <PricingCarGradeSpec pricingCarGradeSpec={pricingCarGradeSpec} />
      </RodalPopup>
    </React.Fragment>
  );
};

PricingCarGradePopUp.propTypes = {
  dataContext: PropTypes.array,
  isPopUpMode: PropTypes.bool,
  modelNo: PropTypes.string,
  onGradeSelect: PropTypes.func
};

PricingCarGradePopUp.defaultProps = {
  isPopUpMode: true
};

export default PricingCarGradePopUp;
