import {useState, useEffect, } from 'react'

import { tempEvidenceList, } from '@src/constant/payment';
import Radio from '@lib/share/items/Radio';

const EvidenceSelector = ({item = {}, onChange, }) => {
    return (
        <div className="method-wrap col2  mt40">
            <p>증빙 선택</p>
            <p className="ex">현금영수증/세금계산서 중 1개만 증빙자료로 신청이 가능합니다. </p>
            <div className="radio-group">
            {
                tempEvidenceList.map((tempEvidence,i) => 
                    <Radio
                        key={i}
                        id={`evidence-item-${tempEvidence?.id}`}
                        title={tempEvidence?.title}
                        checked={item?.id}
                        value={tempEvidence?.id}
                        name={tempEvidence?.name}
                        onChange={e => onChange(e, tempEvidence)}
                    />
                )
            }
            </div>
        </div>
    )
}

export default EvidenceSelector