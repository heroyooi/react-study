import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import PricingCarOptions from '@src/components/pricingSystem/pricingCarOptions';

const pricingMobFilterOption = memo(({ options, callback }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const handlePricingChange = useCallback(
    (e, deps) => {
      setSelectedOptions(deps.carOptions);
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
        <PricingCarOptions hasMobile={true} title="기본옵션" defaultOptions={selectedOptions} onChange={handlePricingChange} />
        <Button className="fixed" size="full" background="blue80" title="선택" onClick={handleClick} />
      </div>
    </div>
  );
});

pricingMobFilterOption.propTypes = {
  options: PropTypes.array,
  callback: PropTypes.func
};

pricingMobFilterOption.displayName = 'pricingMobFilterOption';

export default pricingMobFilterOption;
