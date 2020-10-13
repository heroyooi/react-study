import {useState, useEffect, } from 'react'

import CheckBox from '@lib/share/items/CheckBox';

import { selectMyPoint } from '@src/api/mypage/dealer/dealerAdverApi'
import { setComma, removeComma } from '@src/utils/StringUtil';

const PointSelector = ({children, onChange, point}) => {
    const [usingPoint, setUsingPoint] = useState(false)
    const [myPoint, setMyPoint] = useState(null)

    const checkUsingPoint = (e) =>{
        const { checked } = e.target
        if(!checked){
            onChange(null)
        }
        setUsingPoint(checked)
    }

    const inputPoint = (e) => {
        const valStr = e.target.value
        let value = removeComma(valStr)
        if(value >= myPoint) {
            value = myPoint
        }
        onChange(value)
    }

    const allPoint = (e) => {
        const { checked } = e.target
        if(checked){
            onChange(myPoint)
        }
    }

    useEffect(()=>{
        setMyPoint(selectMyPoint())
    },[])

    return (
        <div className="point-wrap">
            <div className="point">
                <CheckBox id='point-chk1' title='포인트 적용' name="point" onChange={checkUsingPoint} />
                <p>보유포인트<span>{setComma(myPoint)}</span>원</p>
            </div>
            <span className="input-base type-1">
                <input
                    type="text"
                    placeholder="사용할 포인트를 입력하세요"
                    disabled={!usingPoint}
                    onChange={inputPoint}
                    value={setComma(point)}
                    style={{width: "318px", height: "48px"}}
                />
            </span>

            <CheckBox id='chk2' title='포인트 모두 사용' size="small" onChange={allPoint} disabled={!usingPoint} />
        </div>
    )
}

export default PointSelector