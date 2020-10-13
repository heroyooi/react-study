import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Radio from '@lib/share/items/Radio';

const CarRadioGroups = memo(({ options, className, onChange, name, vertical = true, selectedValue = 0, disabled, size = 'large' }) => {
  return (
    <div className={`radio-group ${className || ''}`}>
      {vertical ? (
        <ul className="vertical">
          {options &&
            options.map((value, i) => (
              <li key={i}>
                <Radio
                  key={i}
                  id={`${name}-${value.value}-${i}`}
                  title={value.label}
                  checked={selectedValue}
                  value={value.value}
                  size={size}
                  onChange={(e) => onChange(e, value)}
                  name={name}
                  disabled={disabled}
                />
              </li>
            ))}
        </ul>
      ) : (
        options &&
        options.map((value, i) => (
          <Radio
            key={i}
            id={`${name}-${value.value}-${i}`}
            title={value.label}
            checked={selectedValue}
            value={value.value}
            size={size}
            onChange={(e) => onChange(e, value)}
            name={name}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
});

CarRadioGroups.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  name: PropTypes.string,
  selectedValue: PropTypes.any,
  size: PropTypes.string,
  vertical: PropTypes.bool,
  onChange: PropTypes.func
};
CarRadioGroups.displayName = 'CarRadioGroups';
export default CarRadioGroups;
