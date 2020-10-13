import React from 'react';
import PropTypes from 'prop-types';

export default function CarBadge({ carInfo }) {
  const { ewYn = 'N', impMallYn = 'N', hsvcYn = 'N', frnchsYn = 'N', capMallYn = 'N' } = carInfo;
  return (
    <div className="tag-wrap">
      {ewYn === 'Y' && <em className="tag-tp1 tx-blue60">EW</em>}
      {impMallYn === 'Y' && <em className="tag-tp1 tx-sky">수입/금융사인증</em>}
      {hsvcYn === 'Y' && <em className="tag-tp1 tx-purple">홈서비스</em>}
      {frnchsYn === 'Y' && <em className="tag-tp1 tx-gold">프랜차이즈</em>}
      {capMallYn === 'Y' && <em className="tag-tp1 tx-green">금융인증</em>}
    </div>
  );
}

CarBadge.propTypes = {
  carInfo: PropTypes.object
};
