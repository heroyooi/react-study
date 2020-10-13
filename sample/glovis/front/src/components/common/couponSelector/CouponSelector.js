import {useState, useEffect, } from 'react'

import Radio from '@lib/share/items/Radio'
import CheckBox from '@lib/share/items/CheckBox';

import { selectCouponList } from '@src/api/mypage/dealer/dealerAdverApi'

const CouponSelector = ({children, onChange, item}) => {
    const [couponList, setCouponList] = useState([])
    const [usingCoupon, setUsingCoupon] = useState(false)
    // const [selectedCoupon, selectCoupon] = useState(null)

    const checkUsingCoupon = (e) =>{
        const { checked } = e.target
        if(!checked){
        //   selectCoupon(null)
            onChange(null)
        }
        setUsingCoupon(checked)
    }

    const checkCoupon = (e) => {
        const { checked, value } = e.target
    
        if(checked){
        //   selectCoupon(couponList.find(tempCoupon => tempCoupon.id == value))
          onChange(couponList.find(tempCoupon => tempCoupon.id == value))
        }
    }

    useEffect(()=>{
        // selectCouponList()
        //   .then(res => res?.data?.data)
        //   .then(({coupon}) => setCouponList(coupon))
    
    },[])

    return (
        <div className="coupon-wrap">
            <div className="coupon">
                <CheckBox
                    id="coupon-chk3"
                    title="쿠폰 적용"
                    checked={usingCoupon}
                    onChange={checkUsingCoupon}
                />
                <p>
                    적용 가능한 보유쿠폰<span>{couponList?.length ?? 0}</span>장
                </p>
            </div>
            {
                usingCoupon &&
                <div className="radio-group">
                    <ul className="vertical">
                    {
                        couponList?.map((tempCoupon,i) =>
                        <li key={i}>
                            <Radio
                                id={`coupon-${tempCoupon?.id}`}
                                title={tempCoupon?.title}
                                checked={item?.id}
                                value={tempCoupon?.id}
                                name="coupon"
                                size="small"
                                onChange={checkCoupon}
                            />
                        </li>
                        )
                    }
                    </ul>
                </div>
            }
            {children}
        </div>
    )
}

export default CouponSelector