import { useState, useEffect } from 'react'
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';

import ProdListItemA from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemA';
import ProdListItemB from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemB';
import ProdListItemC from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemC';

import { ProdItemType } from '@src/constant/dealer/dealerProd'
const { itemTypeA, itemTypeB, itemTypeC } =  ProdItemType

const prodListM = ({ sttDvcd, checkAll, checkItem, handleOpenPop, items = [], selectedItems = [], idx = 0 }) => {
    const isCheckedAll = () => !!items.length && (items.length == selectedItems.length)
    const [ checkedAll, setCheckedAll ] = useState(isCheckedAll)

    const handleChkCarAll = (e) => {
        checkAll(e, items, idx)
    }
    const checkItemOne = (e, item) => {
        checkItem(e, item, idx)
    }

    useEffect(()=>{
        console.log('useEffect sele')
        setCheckedAll(isCheckedAll)
    }, [ items, selectedItems])
    
    return (
        <div className="register-admin-sec">
            <div className="float-wrap btn-s">
                <h3 className="tit2">판매차량 목록</h3>
                <Button
                    size="sml"
                    buttonMarkup={true}
                    background="blue20"
                    color="blue80"
                    radius={true}
                    title="상세조회"
                    width={61}
                    onClick={handleOpenPop}
                    name="sttDvcd"
                    value={sttDvcd}
                />
                </div>

                <ul className="admin-list-wrap">
                <li>
                    <div className="float-wrap btn-xs mb20">
                        <CheckBox id='sell-all-chk1' title='전체선택' isSelf={false} checked={checkedAll} onChange={handleChkCarAll} />
                        <div className="btn-wrap">
                            <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 삭제" width={74} height={24} fontSize={10} fontWeight={500} />
                            <Button size="sml" line="gray" color="gray" radius={true} title="대기차량 이동" width={74} height={24} fontSize={10} fontWeight={500} marginLeft={8} />
                        </div>
                        </div>
                        <div className="goods-list admin-list tp4">
                        <ul>
                            {
                                itemTypeA.includes(sttDvcd) ? 
                                    items?.map((item,i) => 
                                        <li key={i}>
                                            <ProdListItemA
                                                item={item}
                                                idx={i}
                                                checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                                                checkItem={checkItemOne}
                                            />
                                        </li>
                                    )
                                :
                                itemTypeB.includes(sttDvcd) ?
                                    items?.map((item,i) => 
                                        <li key={i}>
                                            <ProdListItemB
                                                idx={i}
                                                item={item}
                                                checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                                                checkItem={checkItem}
                                            />
                                        </li>
                                    )
                                    :
                                    items?.map((item,i) =>
                                        <li key={i}>
                                            <ProdListItemC
                                                item={item}
                                                idx={i}
                                                checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                                                checkItem={checkItem}
                                            />
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default prodListM