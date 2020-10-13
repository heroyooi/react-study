import React, { useMemo, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Radio from '@lib/share/items/Radio';

import { setComma } from '@src/utils/StringUtil';

const countList = [1, 3, 5, 10, 22, 55, 100, 330, 550, 1100];

const PricingTicketList = ({ items, onChange, checkedValue, checkableProps, selectable = false, view }) => {
  console.log('PricingTicketList items : ', items);
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const pricingTicketList = useMemo(() => countList.map((count) => items.find((item) => item.prdUseCnt === count)), [items]);

  if (hasMobile) {
    if (!view) {
      return (
        <table className="table-tp1 th-c td-c" summary="프라이싱 조회권 상세 내역에 대한 내용">
          <caption className="away">프라이싱 조회권 상세 내역</caption>
          <colgroup>
            <col width="50%" />
            <col width="50%" />
          </colgroup>
          <thead>
            <tr>
              <th>횟수</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {pricingTicketList.map((pricingTicket, i) => (
              <tr key={i}>
                <td>{setComma(pricingTicket?.prdUseCnt)}회</td>
                <td>
                  {pricingTicket?.prdSlAmt ? (
                    selectable ? (
                      <Radio
                        className="txt"
                        id={`pricing-${i}`}
                        title={pricingTicket?.prdSlAmt ? setComma(pricingTicket?.prdSlAmt) : '-'}
                        value={pricingTicket?.prdDtlSno || ''}
                        checked={checkedValue?.prdDtlSno}
                        onChange={onChange}
                        name="pricingTicket"
                        disabled={Object.keys(checkableProps).filter((key) => !!checkableProps[key]).length ? true : false}
                      />
                    ) : (
                      setComma(pricingTicket?.prdSlAmt)
                    )
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (view) {
      return (
        <table className="table-tp1 th-c td-c" summary="프라이싱 조회권 상세 내역에 대한 내용">
          <caption className="away">프라이싱 조회권 상세 내역</caption>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              {countList.slice(0, 5).map((count, i) => (
                <th key={i}>{setComma(count)}회</th>
              ))}
            </tr>
            <tr>
              {pricingTicketList.slice(0, 5).map((pricingTicket, i) => (
                <td key={i}>
                  {pricingTicket?.prdSlAmt ? (
                    selectable ? (
                      <Radio
                        className="txt"
                        id={`pricing-${i}`}
                        title={pricingTicket?.prdSlAmt ? setComma(pricingTicket?.prdSlAmt) : '-'}
                        value={pricingTicket?.prdDtlSno || ''}
                        checked={checkedValue?.prdDtlSno}
                        onChange={onChange}
                        name="pricingTicket"
                        disabled={Object.keys(checkableProps).filter((key) => !!checkableProps[key]).length ? true : false}
                      />
                    ) : (
                      setComma(pricingTicket?.prdSlAmt)
                    )
                  ) : null}
                </td>
              ))}
            </tr>
            <tr>
              {countList.slice(5, 10).map((count, i) => (
                <th key={i}>{setComma(count)}회</th>
              ))}
            </tr>
            <tr>
              {pricingTicketList.slice(5, 10).map((pricingTicket, i) => (
                <td key={i}>
                  {pricingTicket?.prdSlAmt ? (
                    selectable ? (
                      <Radio
                        className="txt"
                        id={`pricing-${i}`}
                        title={pricingTicket?.prdSlAmt ? setComma(pricingTicket?.prdSlAmt) : '-'}
                        value={pricingTicket?.prdDtlSno || ''}
                        checked={checkedValue?.prdDtlSno}
                        onChange={onChange}
                        name="pricingTicket"
                        disabled={Object.keys(checkableProps).filter((key) => !!checkableProps[key]).length ? true : false}
                      />
                    ) : (
                      setComma(pricingTicket?.prdSlAmt)
                    )
                  ) : null}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    }
  }
  return (
    <table className="table-tp1 th-c" summary="자유 이용권 상품 상세 내역에 대한 내용">
      <caption className="away">자유 이용권 상품 상세 내역</caption>
      <colgroup>
        <col width="9.09%" />
        {countList.map((count, i) => (
          <col width="9.09%" key={i} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th></th>
          {countList.map((count, i) => (
            <th key={i}>{setComma(count)}회</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>금액</th>
          {pricingTicketList.map((pricingTicket, i) => (
            <td key={i}>
              {pricingTicket?.prdSlAmt ? (
                selectable ? (
                  <Radio
                    className="txt"
                    id={`pricing-${i}`}
                    title={pricingTicket?.prdSlAmt ? setComma(pricingTicket?.prdSlAmt) : '-'}
                    value={pricingTicket?.prdDtlSno || ''}
                    checked={checkedValue?.prdDtlSno}
                    onChange={onChange}
                    name="pricingTicket"
                    disabled={Object.keys(checkableProps).filter((key) => !!checkableProps[key]).length ? true : false}
                  />
                ) : (
                  setComma(pricingTicket?.prdSlAmt)
                )
              ) : null}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default memo(PricingTicketList)