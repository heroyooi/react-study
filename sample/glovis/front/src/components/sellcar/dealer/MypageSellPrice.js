import Input from '@lib/share/items/Input';
import FilterRange from '@lib/share/items/FilterRange';
import { useState, useCallback, useEffect } from 'react';
import Button from '@lib/share/items/Button';

const MypageSellPrice = ({ data, userData, onInput }) => {
  const onCarPriceChange = (e) => {
    onInput({ target: { value: e.target.value } }, 'carPrice');
  };

  return (
    <div className="register-sell-price">
      <h4 className="mb33">판매가격</h4>
      <div className="sell-price-wrap">
        <div className="sell-price">
          <Input type="text" id="register-sell-price" value={typeof userData === 'undefined' ? '' : userData.carPrice} onChange={onCarPriceChange} width={176} height={40} />
          <span className="won">만원</span>
          <Button size="sml" line="gray" color="gray" radius={true} title="해당차량 시세 확인" width={109} height={24} marginLeft={25} />
        </div>
        {/*<div className="price-grade-tp1">
          <div className="cur-price">
            <p className="veiw-point-tit">이 차량의 현재 시세<span> (단위:만원)</span></p>
            <div className="proper-price">
              <FilterRange rangeUnit="적정시세" initMin={data.minPrice} initMax={data.maxPrice} rangeMin={data.minRage} rangeMax={data.maxRage} disabled={true} />
            </div>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default MypageSellPrice;
