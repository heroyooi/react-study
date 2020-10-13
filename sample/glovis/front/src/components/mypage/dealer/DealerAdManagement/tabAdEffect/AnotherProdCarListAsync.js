import { useState, useEffect } from 'react'

import PageNavigator from '@src/components/common/PageNavigator';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Radio from '@lib/share/items/Radio'

import { selectMyOtherAdverProdLoad } from '@src/api/mypage/dealer/dealerProdApi'
import { setComma } from '@src/utils/StringUtil';

const AnotherProdCarListAsync = ({saveCallback}) => {
    const [recordCount, setRecordCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProd, setSelectedProd] = useState(null)
    const [anotherProdCarList, setAherProdCarList] = useState([])

    const selectProd = (item) => {
        console.log('selectProd item : ', item)
        setSelectedProd(item)
    }

    useEffect(()=>{
        selectMyOtherAdverProdLoad({currentPage}).then(res => res?.data?.data).then(res => {
            console.log('res : ', res)
            setAherProdCarList(res)
            setSelectedProd(null)
            setRecordCount(res?.[0]?.totalcnt || 0)
        })
    }, [ currentPage ])

    return (
        <div className="con-wrap popup-adeffect">
            <table className="table-tp1" summary="다른 차량 불러오기에 대한 내용">
                <caption className="away">다른 차량 불러오기</caption>
                <colgroup>
                <col width="85%" />
                <col width="15%" />
                </colgroup>
                <tbody>
                    {
                        anotherProdCarList?.length ?
                            anotherProdCarList.map((anotherProdCar,i) =>
                                <tr key={i} onClick={(e) => selectProd(anotherProdCar)} style={{cursor:'pointer'}} >
                                    <td>
                                        <div className="summary">
                                            <h4 className="subject">
                                                <Radio size="small" value={anotherProdCar?.dlrPrdId} checked={selectedProd?.dlrPrdId} readOnly={true} />
                                                {anotherProdCar?.crNm}
                                            </h4>
                                            <ul className="info">
                                                <li>{anotherProdCar?.crNo}</li>
                                                <li>{anotherProdCar?.frmYyyyy}년형</li>
                                                <li>{setComma(anotherProdCar?.drvDist)}km</li>
                                                <li>{anotherProdCar?.mssNm}</li>
                                                <li>{anotherProdCar?.fuelNm}</li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="price">{setComma(anotherProdCar?.slAmt)}원</p>
                                    </td>
                                </tr>
                            )
                        :
                            <tr>
                                <td colSpan="2" style={{textAlign:'center'}}>
                                    등록된 차량이 없습니다
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
            <PageNavigator
                recordCount={recordCount}
                className="mt32"
                currentPage={currentPage}
                changed={(e,no) => setCurrentPage(no)}
            />
            <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" buttonMarkup={true} width={130} onClick={() => saveCallback(null)} />
                <Button size="big" background="blue80" title="확인" buttonMarkup={true} width={130} onClick={() => saveCallback(selectedProd)} />
            </Buttons>
        </div>
    )
}

export default AnotherProdCarListAsync