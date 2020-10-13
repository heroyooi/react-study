import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import MobFullpageHeader from './MobFullpageHeader';

const MobFullpagePopup = ({children, active=false, direction="right", paddingBottom}) => {
  const [fpActive, setFpActive] = useState(active);
  
  useEffect(() => {
    setFpActive(active);
  }, [active]);

  const fullpageWrap = classNames(
    "fp-wrap",
    direction,
    { "active": fpActive }
  )
  
  return (
    <div className={fullpageWrap}>
      <MobFullpageHeader />
      <div className="fp-content" style={{paddingBottom: paddingBottom}}>{children}</div>
    </div>
  )
}

MobFullpagePopup.propTypes = {
  children: PropTypes.node,
}

export default MobFullpagePopup;