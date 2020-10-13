import { useEffect, useCallback } from 'react'
import moment from 'moment'
import Router from 'next/router';
import qs from 'qs';

import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';
import { setComma } from '@src/utils/StringUtil';

const EtcTicketListItems = ({isEditing=false, onChange, disabled = true, checkedValue, items=[], name='우량업체'}) => {
    const goPurchagePage = (tag) => {
        Router.push(
          `/mypage/dealer/sellcar/carManagement` +
            '?' +
            qs.stringify({
              ...params,
              sub: 2
            }) + tag
        );
    }

    return (
        items?.map((item,i) =>
            <li key={i} id={item?.prdDvcd}>
                <h5>
                    {item?.prdNm}
                    {
                        !isEditing && 
                        <Button
                            size="sml"
                            background="blue80"
                            radius={true}
                            title="구입하기"
                            width={64}
                            marginLeft={16}
                            buttonMarkup={true}
                            onClick={() => {
                                goPurchagePage(item?.prdDvcd)
                            }}
                        />
                    }
                </h5>
                <p>
                오토벨과 제휴된 {name}가 차량광고&프라이싱 시스템을 각각 {item?.crSlot}대, {item?.prdUseCnt}회 이용할 수 있는 상품권)
                </p>
                <span className="period">
                    <Radio
                        id={`comp-${item?.prdDvcd}-${i}`}
                        title={'구매하기 선택'}
                        value={item?.prdDvcd}
                        checked={checkedValue?.prdDvcd}
                        onChange={(e) => onChange(e, item)}
                        name="companyTicket"
                        disabled={disabled}
                        width={85}
                    />
                </span>
                <span className="price">{setComma(item?.prdSlAmt)}원</span>
            </li>
        )
    )
}
export default EtcTicketListItems