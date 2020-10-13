import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import CarOptions from '@src/components/common/CarOptions';
import Button from '@lib/share/items/Button';

const MobFilterOption = ({ options, callback }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  React.useEffect(() => {
    setSelectedOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handleChange = useCallback(
    (e, deps) => {
      setSelectedOptions(deps.selectedOption);
    },
    [setSelectedOptions]
  );

  const handleClick = useCallback(
    (e) => {
      if (callback) {
        callback(e, selectedOptions);
      }
    },
    [callback, selectedOptions]
  );

  return (
    <div className="filter-list-wrap">
      <div className="content-wrap pt20">
        <CarOptions title="기본옵션" type={1} mode="check" pricingDefaultOptions={selectedOptions} onChange={handleChange} />
        <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
      </div>
    </div>
  );
};

MobFilterOption.propTypes = {
  options: PropTypes.array,
  callback: PropTypes.func
};

export default MobFilterOption;
