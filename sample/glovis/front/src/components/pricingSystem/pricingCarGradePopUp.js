import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useRodal from '@lib/share/custom/useRodal';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import RadioGroupList from '@lib/share/items/RadioGroupList';
import RodalPopup from '@lib/share/popup/RodalPopup';
import { getPringCarGradeSpecifation } from '@src/components/pricingSystem/pricingUtil';
import PricingCarGradeList from './pricingCarGradeList';
import PricingCarGradeSpec from './pricingCarGradeSpec';

const PricingCarGradePopUp = ({ dataContext, hasMobile, isPopUpMode, modelNo, onGradeSelect }) => {
  const [detailPopupShow, setDetailPopupShow] = useRodal(false, true);
  const [detailMarginTop, setDetailMarginTop] = useState(170);
  const [pricingCarGradeSpec, setPricingCarGradeSpec] = useState(null);

  const handleDetailPopup = useCallback(
    (e, deps) => {
      e.preventDefault();
      if (modelNo && deps) {
        const payload = {
          seriesNm: deps.seriesNm,
          seriesPrice: deps.seriesPrice,
          list: []
        };

        getPringCarGradeSpecifation(modelNo, deps.seriesNo).then((list) => {
          payload.list = list || [];
          setPricingCarGradeSpec(payload);
        });
      }

      const index = dataContext.findIndex((x) => x.seriesNo === deps.seriesNo);
      setDetailMarginTop(170 + index * 73);
      setDetailPopupShow(true);
    },
    [dataContext, modelNo, setDetailPopupShow]
  );

  const handleDetailPopUpClose = useCallback(() => {
    setPricingCarGradeSpec(null);
    setDetailPopupShow(false);
  }, [setDetailPopupShow]);

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

  if (hasMobile === true) {
    return <RadioGroupList itemsSource={dataContext || []} mode="vertical" selectedValuePath={'seriesNo'} displayMemberPath={'seriesNm'} onChange={handleSelectGrade} />;
  }

  if (isPopUpMode === false) {
    return (
      <>
        <PricingCarGradeList dataList={dataContext} onClick={handleDetailPopup} onGradeSelect={handleSelectGrade} />
        <RodalPopup show={detailPopupShow} type={'fade'} closedHandler={handleDetailPopUpClose} mode="normal" size="small" marginLeft={-140} marginTop={detailMarginTop} title="상세 사양보기">
          <PricingCarGradeSpec pricingCarGradeSpec={pricingCarGradeSpec} />
        </RodalPopup>
      </>
    );
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
      <RodalPopup show={detailPopupShow} type={'fade'} closedHandler={handleDetailPopUpClose} mode="normal" size="small" marginLeft={-140} marginTop={detailMarginTop} title="상세 사양보기">
        <PricingCarGradeSpec pricingCarGradeSpec={pricingCarGradeSpec} />
      </RodalPopup>
    </React.Fragment>
  );
};

PricingCarGradePopUp.propTypes = {
  dataContext: PropTypes.array,
  hasMobile: PropTypes.bool,
  isPopUpMode: PropTypes.bool,
  modelNo: PropTypes.string,
  onGradeSelect: PropTypes.func
};

PricingCarGradePopUp.defaultProps = {
  isPopUpMode: true
};

export default PricingCarGradePopUp;
