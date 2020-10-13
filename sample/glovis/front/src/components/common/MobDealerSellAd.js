import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Radio from '@lib/share/items/Radio';
import FreeTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/FreeTicketList';
import UpdateTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/UpdateTicketList';
import PricingTicketList from '@src/components/mypage/dealer/DealerAdManagement/tabAdGuide/PricingTicketList';

const MobDealerSellAd = ({ mode = 'radio' }) => {
  const [isMode, setIsMode] = useState(mode); // radio, viewer

  const dealerAdverStore = useSelector((rootStore) => rootStore.dealerAdver);
  const { usingTicketList, free = [], update = [], pricing = [] } = dealerAdverStore;

  // 버튼식 라디오
  const [isValue1, setIsValue1] = useState(0);
  const handleChange1 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    },
    [isValue1]
  );

  const [isValue2, setIsValue2] = useState(0);
  const handleChange2 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue2(Number(e.target.value));
    },
    [isValue2]
  );

  const [isValue3, setIsValue3] = useState(0);
  const handleChange3 = useCallback(
    (e) => {
      e.preventDefault();
      setIsValue3(Number(e.target.value));
    },
    [isValue3]
  );

  return (
    <div className="usage-wrap content-wrap ">
      <h5>자유 이용권</h5>
      <div className="float-wrap mb16">
        <p>모든 차량 이용가능</p>
        <span>단위 : 원 (VAT포함)</span>
      </div>
      <FreeTicketList
        items={free}
        selectable={false}
        // onChange={selectItem}
        // checkedValue={checkedFreeTicket}
        // checkableProps={{ prdDvcd, crSlot }}
        usingTicketList={usingTicketList?.freepassinfo}
      />
      

      <div className="float-wrap mt32 mb16">
        <h5 className="tit2">업데이트 자유권</h5>
        <span>단위 : 원 (VAT포함)</span>
      </div>
      <UpdateTicketList
        items={update}
        selectable={false}
        // onChange={selectItem}
        // checkedValue={checkedUpdateTicket}
        // checkableProps={{ prdDvcd, crSlot }}
        usingTicketList={usingTicketList?.updatefreepassinfo}
      />
      

      <h5>프라이싱 조회권</h5>
      <div className="float-wrap mb16">
        <p>조회권의 유효기간은 5년입니다.</p>
        <span>단위 : 원 (VAT포함)</span>
      </div>
      <PricingTicketList
        items={pricing}
        selectable={false}
        // onChange={selectItem}
        // checkedValue={checkedPricingTicket}
        // checkableProps={{ prdDvcd, crSlot }}
        view={true}
      />
      
    </div>
  );
};

export default MobDealerSellAd;
