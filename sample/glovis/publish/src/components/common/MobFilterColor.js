import React from 'react';
import PropTypes from 'prop-types';
import CheckColors from '@src/components/common/CheckColors';

const MobFilterColor = ({ callback }) => {
  const checkColorCallback = (e, selectcolor) => {
    if (callback) {
      callback(e, { label: selectcolor });
    }
  };
  return (
    <div className="filter-list-wrap">
      <div className="content-wrap">
        <CheckColors mode="radio" onClick={checkColorCallback} />
      </div>
    </div>
  );
};

MobFilterColor.propTypes = {
  callback: PropTypes.func
};

export default MobFilterColor;
