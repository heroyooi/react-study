import { memo } from 'react'

import { setComma } from '@src/utils/StringUtil';

const ProdCarSummary = ({item={}, slAmt, mss, fuel, heading, children}) => {
    return (
        <div className="summary">
            {heading}
            <h4 className="subject">{item?.crNm ?? `${item?.crMnfcCdNm || ''} ${item?.crMdlCdNm || ''} ${item?.crClsCdNm || ''}`}</h4>
            <ul className="info">
                <li>{item?.crNo}</li>
                <li>{item?.frmYyyy}년형</li>
                <li>{setComma(item?.drvDist)}km</li>
                {
                    mss && <li>{mss}</li>
                }
                {
                    fuel && <li>{fuel}</li>
                }
            </ul>
            {
                slAmt ?
                    <p className="price-tp6">
                        {setComma(slAmt)}
                        <span className="won">만원</span>
                    </p>
                : null
            }
            {children} {/* 추가내용 */}
        </div>
    )
}

export default memo(ProdCarSummary)