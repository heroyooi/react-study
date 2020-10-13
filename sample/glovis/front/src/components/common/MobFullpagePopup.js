import React, { useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import MobFullpageHeader from './MobFullpageHeader';

const MobFullpagePopup = memo(({ active = false, children, cPop = false, subPop = false, direction = 'right', paddingBottom, onClose, onReset, zid, className='' }) => {
  const [fpActive, setFpActive] = useState(active);

  useEffect(() => {
    setFpActive(active);
  }, [active]);

  const fullpageWrap = classNames('fp-wrap', direction, className, { active: fpActive });

  return (
    <div className={fullpageWrap} style={zid ? { zIndex: zid } : null}>
      <MobFullpageHeader cPop={cPop} subPop={subPop} onClose={onClose} onReset={onReset} />
      <div className="fp-content" style={{ paddingBottom: paddingBottom }}>
        {children}
      </div>
    </div>
  );
});

MobFullpagePopup.propTypes = {
  active: PropTypes.bool,
  cPop: PropTypes.bool,
  subPop: PropTypes.bool,
  direction: PropTypes.string,
  children: PropTypes.node,
  paddingBottom: PropTypes.number,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  zid: PropTypes.number
};

MobFullpagePopup.displayName = 'MobFullpagePopup';
export default MobFullpagePopup;
