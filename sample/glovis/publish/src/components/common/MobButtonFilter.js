import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';

const MobButtonFilter = ({ checkList, onClick, className }) => {
  const checkArray = [];
  for (const element of checkList) {
    checkArray.push(element.checked);
  }
  const [active, setActive] = useState(checkArray);
  const handleClick = useCallback(
    (id) => (e) => {
      e.preventDefault();
      const copyActive = [];
      for (let i = 0; i < checkList.length; i++) {
        copyActive.push(false);
      }
      copyActive[id] = true;
      setActive(copyActive);
      if (onClick) {
        onClick(e, checkList[id]);
      }
    },
    [checkList, onClick]
  );

  return (
    <span className={`btn-wrap ${className}`}>
      {checkList.map((value, index) => {
        return (
          <Button
            key={index}
            size="sml"
            background={active[index] ? 'blue20' : null}
            color={active[index] ? 'blue80' : 'gray'}
            line={active[index] ? null : 'gray'}
            radius={true}
            title={value.title}
            width={44}
            onClick={handleClick(index)}
          />
        );
      })}
    </span>
  );
};

MobButtonFilter.propTypes = {
  checkList: PropTypes.array,
  onClick: PropTypes.func
};

export default MobButtonFilter;
