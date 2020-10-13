import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { numberFormat, objIsEmpty } from '@src/utils/CommonUtil';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';

const PricingCarGradeSpec = ({ pricingCarGradeSpec, mode, onClose }) => {
  if (objIsEmpty(pricingCarGradeSpec)) {
    return null;
  }

  const handleClose = useCallback(
    (e, deps) => {
      e.preventDefault();
      if (onClose) {
        onClose(e);
      }
    },
    [onClose]
  );

  if (mode === 'self') {
    return (
      <div className="con-wrap popup-grade">
        <p className="fl">{pricingCarGradeSpec.seriesNm}</p>
        <p className="fr">
          <span>{numberFormat(pricingCarGradeSpec.seriesPrice)}</span>원
        </p>
        <ColoredScrollbars autoHeightMax={253}>
          <ul className="contents">
            {pricingCarGradeSpec.list.map((item, i) => {
              return <li key={i}>&#183; {item.text}</li>;
            })}
          </ul>
        </ColoredScrollbars>
        <Buttons align="center" marginTop={40}>
          <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleClose} />
        </Buttons>
      </div>
    );
  }

  return (
    <div className="popup-grade">
      <ul className="float-wrap">
        <li className="tit">{pricingCarGradeSpec.seriesNm}</li>
        <li className="price">{numberFormat(pricingCarGradeSpec.seriesPrice)}원</li>
      </ul>
      <div className="grade">
        <ColoredScrollbars autoHeightMax={287}>
          <ul className="con">
            {pricingCarGradeSpec.list.map((item, i) => {
              return <li key={i}>&#183; {item.text}</li>;
            })}
          </ul>
        </ColoredScrollbars>
      </div>
    </div>
  );
};

PricingCarGradeSpec.propTypes = {
  mode: PropTypes.string,
  pricingCarGradeSpec: PropTypes.object
};

PricingCarGradeSpec.defaultProps = {
  mode: ''
};

export default PricingCarGradeSpec;
