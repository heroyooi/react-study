import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import DynamicTag from '@lib/share/items/DynamicTag';
import { objIsEmpty } from '@src/utils/CommonUtil';

const PricingCarOptions = memo(({ className, defaultOptions, hasMobile, title, onChange }) => {
  const [selectedDefaultOptions, setSelectedDefaultOptions] = useState([]);

  useEffect(() => {
    setSelectedDefaultOptions(defaultOptions);
  }, [defaultOptions]);

  const handleChckBoxItemClick = useCallback(
    (e, deps) => {
      const newDefaultOptons = selectedDefaultOptions.map((item) => {
        let nextYn = item.yn;

        if (item.id === deps.id) {
          nextYn = item.yn === 'Y' ? 'N' : 'Y';
        }

        return Object.assign({ ...item }, { yn: nextYn });
      });

      setSelectedDefaultOptions(newDefaultOptons);
      if (onChange) {
        onChange(e, {
          carOptions: newDefaultOptons
        });
      }
    },
    [onChange, selectedDefaultOptions]
  );

  if (hasMobile === true) {
    return (
      <div className={`option-cate ${className || ''}`}>
        <h3 className="tit2 mb16">{title}</h3>
        <ul className="cate-ico">
          {!objIsEmpty(selectedDefaultOptions) &&
            selectedDefaultOptions
              .filter((x) => x.displayYn === 'Y')
              .map((option, idx) => {
                return (
                  <CheckBoxItem
                    checked={option.yn === 'Y'}
                    key={idx}
                    id={`chk-${option.id}`}
                    isSelf={false}
                    name={`chk-car-option`}
                    size="small"
                    targetId={option.id}
                    dataContext={option}
                    onSelect={handleChckBoxItemClick}
                  >
                    <i className={option.icon} />
                    <span className="ico-exp" dangerouslySetInnerHTML={{ __html: option.displayName || option.label }} />
                  </CheckBoxItem>
                );
              })}
        </ul>
      </div>
    );
  }

  return (
    <div className={`option-cate ${className || ''}`}>
      {title !== undefined && <h4 className="mb33">{title}</h4>}
      <div className={'car-option-tp2 chk'}>
        <ul className="cate-ico">
          {!objIsEmpty(selectedDefaultOptions) &&
            selectedDefaultOptions
              .filter((x) => x.displayYn === 'Y')
              .map((option, idx) => (
                <DynamicTag key={idx} id={`tag-${option.id}`} tagName={'li'} dataContext={option} onClick={handleChckBoxItemClick}>
                  <CheckBox dataContext={option} id={'chk-' + option.id} checked={option.yn === 'Y'} isSelf={false} size={'small'} />
                  <i className={option.icon} />
                  <span className="ico-exp" dangerouslySetInnerHTML={{ __html: option.displayName || option.label }} />
                </DynamicTag>
              ))}
        </ul>
        <p className="tx-exp-tp1 mb16">* 옵션 정보가 실제와 다르다면 아이콘 ON/OFF를 해주세요</p>
      </div>
    </div>
  );
});

PricingCarOptions.prototype = {
  className: PropTypes.string,
  defaultOptions: PropTypes.array,
  hasMobile: PropTypes.bool,
  title: PropTypes.string,
  onChange: PropTypes.func
};

PricingCarOptions.defaultProps = {
  hasMobile: false
};

PricingCarOptions.displayName = 'PricingCarOptions';
export default PricingCarOptions;
