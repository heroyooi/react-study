import { useMemo, memo } from 'react';
import InputPic from '@lib/share/items/InputPic';

const CarPictureApplyPc = ({ onChange, className, name, disabled, options = [], items = [] }) => {
  const applyImg = (sortNo) => items.find((item) => item.sortNo == sortNo);
  console.log('options ===> ', options);

  return (
    <ul className={className}>
      {applyImg &&
        options &&
        options.map((item, i) => (
          <li key={i} className={`item-${item.sortNo}`}>
            <InputPic item={item} title={item.title} applyImg={applyImg(item.sortNo)} onChange={onChange} name={name} disabled={disabled} />
          </li>
        ))}
    </ul>
  );
};

export default memo(CarPictureApplyPc);
