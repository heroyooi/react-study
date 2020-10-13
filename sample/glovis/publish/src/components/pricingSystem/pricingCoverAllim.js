import React from 'react';
import PropTypes from 'prop-types';

const PricingCoverAllim = ({ userName, onClose }) => {
  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();
      if (onClose) {
        onClose(e);
      }
    },
    [onClose]
  );

  return (
    <div className="search-cover">
      <a href="#" className="popup-close" onClick={handleClick} />
      <p>
        {userName}님,
        <span>
          현대 오토벨만의 특별한 진짜 시세를 확인해보세요.
          <br />
          1일 1회 무료조회가능하며, 이용권을 구매하시면 더 이용이 가능합니다.
        </span>
      </p>
    </div>
  );
};

PricingCoverAllim.propTypes = {
  userName: PropTypes.string,
  onClose: PropTypes.func
};

export default PricingCoverAllim;
