import { memo } from 'react';
import classNames from "classnames/bind";
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

const MobBottomArea = memo(({active, isFix=false, isSimple=false, children, mode="normal", className, zid, isFixButton=false}) => {
  const areaStyle = classNames(
    "bottom-slide-area",
    {"active": active},
    {"fixed": isFix},
    {"simple": isSimple},
    {"fade": mode==="fade"},
    {"is-fix-button": isFixButton}
  )
  let bottomAreaStyle = {};
  zid !== undefined ? bottomAreaStyle.zIndex = zid : null;

  return (
    <div className={className ? `${areaStyle} ${className}` : areaStyle} style={bottomAreaStyle}>
      <div className="bottom-slide-inner">{children}</div>
    </div>
  )
});

export default MobBottomArea;