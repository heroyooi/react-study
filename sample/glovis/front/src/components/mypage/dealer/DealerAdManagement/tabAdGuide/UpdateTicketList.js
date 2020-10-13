import React, { useState, useMemo, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Radio from '@lib/share/items/Radio';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';

import { setComma } from '@src/utils/StringUtil';
import { m_ticket } from '@src/dummy';

const monthList = [
  { text: '1개월', month: 1 },
  { text: '3개월<br />(10%)', month: 3 },
  { text: '6개월<br />(15%)', month: 6 },
  { text: '9개월<br />(20%)', month: 9 }
];
const MobList = [
  { text: '5대', count: 5 },
  { text: '10대', count: 10 },
  { text: '15대', count: 15 },
  { text: '20대', count: 20 },
  { text: '30대', count: 30 },
  { text: '50대', count: 50 },
  { text: '70대', count: 70 },
  { text: '100대', count: 100 }
];
const carCountList = [1, 5, 10, 15, 20, 30, 50, 70, 100];
const MobCarCountList = [5, 10, 15, 20, 30, 50, 70, 100];

//FreeTicketList 컴포넌트와 완전 동일한 컴포넌트지만 추후 어떻게 될지 모르기에 둘로 나눠둠
const UpdateTicketList = ({ items, onChange, checkedValue, checkableProps, selectable = false, usingTicketList, subscribe }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const ticketList = useMemo(
    () =>
      monthList.reduce((list, { month }) => {
        //1,3,6,12 개월 순으로 담는다. //prdAdNot
        const sameMonthList = items.filter((item) => item.regMm == month);
        const newArr = [];
        carCountList.forEach((carCount) => {
          newArr.push(sameMonthList.find((sameMonth) => sameMonth.crSlot == carCount));
        });
        list.push(newArr);
        return list;
      }, []),
    [items]
  );

  // 모바일용 조건.
  const MobTicketList = useMemo(() => {
    return MobList.reduce((list, { count }) => {
      console.log('free list : ', list);
      const sameCarCountList = items.filter((item) => item.crSlot === count);
      const newArr = [];
      monthList.forEach(({ month }) => {
        newArr.push(sameCarCountList.find((sameMonth) => sameMonth.regMm === month));
      });
      list.push(newArr);
      return list;
    }, []);
  }, [items]);

  // 모바일용 구독 조건
  const subsMobTicketList = useMemo(() => {
    return MobList.reduce((list, { count }) => {
      console.log('free list : ', list);
      const sameCarCountList = items.filter((item) => item.crSlot === count);
      const newArr = [sameCarCountList.find((sameMonth) => sameMonth.regMm === 1)];
      list.push(newArr);
      return list;
    }, []);
  }, [items]);

  const checkable = useCallback(
    (ticket) => {
      // console.log('checkable -> checkableProps', checkableProps);
      const props = Object.keys(checkableProps).filter((key) => !!checkableProps[key]);

      if (props?.length) {
        return props.length ? props.some((key) => checkableProps[key] != ticket[key]) : false;
      } else if (usingTicketList && typeof usingTicketList === 'object') {
        const { prdDvcd, crSlot, retentionperiod } = usingTicketList;
        // console.log('checkable -> usingTicketList', usingTicketList);
        const { prdDvcd: ticketPrdDvcd, crSlot: ticketCrSlot } = ticket;
        if ((prdDvcd && crSlot && retentionperiod && retentionperiod > 14) || prdDvcd !== ticketPrdDvcd || crSlot !== ticketCrSlot) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    [checkableProps, items]
  );
  const ticketChange = useCallback((e) =>{
    if(e.target.value !== undefined){
      return false;
    }
  },[])
  // 모바일 컴포넌트
  if (hasMobile) {
    if (!subscribe){
      return (
        <table className="table-tp1 th-c td-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
          <caption className="away">업데이트 이용권 상품 상세 내역</caption>
          <colgroup>
            <col width="20%" />
            {monthList.map((carCount, i) => (
              <col width="20%" key={i} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th>
                구분
                <br />
                (할인율)
              </th>
              {monthList.map((carCount, i) => (
                <th dangerouslySetInnerHTML={{ __html: monthList[i].text }} key={i} ></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* pc랑 조건이 반대 tr기준이 차량 대수로 이동함 */}
            {MobTicketList?.map((ticketListByCount, i) => (
              <tr key={i}>
                <th dangerouslySetInnerHTML={{ __html: MobList[i].text }}></th>
                {/* tr내부의 컴포넌트는 개월 기준으로 정렬 */}
                {ticketListByCount.map((ticketByCarMonth, k) => (
                  <td key={k}>
                    {ticketByCarMonth?.prdSlAmt ? (
                      selectable ? (
                        <Radio
                          className="txt"
                          id={`update-${k}-${i}`}
                          title={ticketByCarMonth?.prdSlAmt ? setComma(ticketByCarMonth?.prdSlAmt) : '-'}
                          value={ticketByCarMonth?.prdDtlSno}
                          checked={checkedValue?.prdDtlSno}
                          onChange={onChange}
                          name="updateTicket"
                          disabled={checkable(ticketByCarMonth)}
                        />
                      ) : (
                        setComma(ticketByCarMonth?.prdSlAmt)
                      )
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (subscribe) {
      return (
        <>
          <table className="table-tp1 th-c td-c" summary="업데이트 자유 이용권 상품 상세 내역에 대한 내용">
            <caption className="away">업데이트 이용권 상품 상세 내역</caption>
            <colgroup>
              <col width="20%" />
              <col width="40%" />
              <col width="40%" />
            </colgroup>
            <thead>
              <tr>
                <th>
                  구분
                  <br />
                  (할인율)
                </th>
                <th>1개월</th>
                <th>다음달 월구독(5%)</th>
              </tr>
            </thead>
            <tbody>
              {subsMobTicketList?.map((ticketListByCount, i) => (
                <tr key={i}>
                  <th dangerouslySetInnerHTML={{ __html: MobList[i].text }}></th>
                  {ticketListByCount.map((ticketByCarMonth, k) => (
                    <td key={k}>
                      {ticketByCarMonth?.prdSlAmt ? (
                        selectable ? (
                          <Radio
                            className="txt"
                            id={`update-${k}-${i}`}
                            title={ticketByCarMonth?.prdSlAmt ? setComma(ticketByCarMonth?.prdSlAmt) : '-'}
                            value={ticketByCarMonth?.prdDtlSno}
                            checked={checkedValue?.prdDtlSno}
                            onChange={onChange}
                            name="updateTicket"
                            disabled={checkable(ticketByCarMonth)}
                          />
                        ) : (
                          setComma(ticketByCarMonth?.prdSlAmt)
                        )
                      ) : null}
                    </td>
                  ))}
                  {ticketListByCount.map((ticketByCarMonth, k) => (
                    <td key={k}>
                      {ticketByCarMonth?.prdSlAmt ? (
                        selectable ? (
                          <Radio
                            className="txt"
                            id={`update-${k}-${i}`}
                            title={ticketByCarMonth?.prdSlAmt ? setComma(ticketByCarMonth?.prdSlAmt * 0.95) : '-'}
                            value={ticketByCarMonth?.prdDtlSno}
                            checked={checkedValue?.prdDtlSno}
                            onChange={onChange}
                            name="updateTicket"
                            disabled={checkable(ticketByCarMonth)}
                          />
                        ) : (
                          setComma(ticketByCarMonth?.prdSlAmt)
                        )
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
         
        
          {/* <RadioGroup
            dataList={[
              { id: 'ticket1', value: 1, checked: true, disabled: false, label: '업데이트 자유권' }
            ]}
            mode="vertical"
            className="m-radio-list tp2"
            onChange={ticketChange}
          >
            <RadioItem>
              <span className="date">D-15</span>
              <p className="state"><span>5대</span> 이용 중(5/10)</p>
            </RadioItem>
          </RadioGroup>

          <div className="content-border pd20 mt24">
            <p className="tit4">업데이트 자유권 1개월 10대</p>
            <ul className="info">
              <li>
                <span className="tit">자동결제일</span>
                <span>매월 20일</span>
              </li>
              <li>
                <span className="tit">결제예정금액</span>
                <span className="price">330,000원</span>
                <span className="discout">300,000</span>원
              </li>
            </ul>
          </div> */}
          
        </>
      );
    }
  }

  return (
    <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
      <caption className="away">자유 이용권 상품 상세 내역</caption>
      <colgroup>
        <col width="10%" />
        {carCountList.map((carCount, i) => (
          <col width="10%" key={i} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th>할인율</th>
          {carCountList.map((carCount, i) => (
            <th key={i}>{carCount}대</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ticketList?.map((ticketListByMonth, i) => (
          <tr key={i}>
            <th dangerouslySetInnerHTML={{ __html: monthList[i].text }}></th>
            {ticketListByMonth.map((ticketByCarCount, k) => (
              <td key={k}>
                {ticketByCarCount?.prdSlAmt ? (
                  selectable ? (
                    <Radio
                      className="txt"
                      id={`update-${i}-${k}`}
                      title={ticketByCarCount?.prdSlAmt ? setComma(ticketByCarCount?.prdSlAmt) : '-'}
                      value={ticketByCarCount?.prdDtlSno || ''}
                      checked={checkedValue?.prdDtlSno}
                      onChange={onChange}
                      name="updateTicket"
                      disabled={checkable(ticketByCarCount)}
                    />
                  ) : (
                    setComma(ticketByCarCount?.prdSlAmt)
                  )
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(UpdateTicketList)