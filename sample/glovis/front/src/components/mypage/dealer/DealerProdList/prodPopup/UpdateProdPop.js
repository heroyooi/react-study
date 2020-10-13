import { useState, useEffect, useCallback, useContext } from 'react'
import { produce } from 'immer'

import CheckBox from '@lib/share/items/CheckBox';
import CheckBoxItem from '@lib/share/items/CheckBoxItem';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';

import { getCommonCodeAsync } from '@src/utils/DataUtils';
import { setComma, removeComma } from '@src/utils/StringUtil';
import { selectFreePassMgmtList } from '@src/api/mypage/dealer/dealerProdApi';
import { SystemContext } from '@src/provider/SystemProvider'

import { updateFreePassMgmt } from '@src/api/mypage/dealer/dealerAdverApi'

const findLi = (target) => {
    const {tagName} = target
    return tagName == 'LI' ? target : findLi(target.parentElement)
}

const UpdateProdPop = ({eventHandler, updatePass, onClose}) => {
    console.log("UpdateProdPop -> updatePass", updatePass)
    const { showAlert, showConfirm, showLoader, hideLoader, initAlert, initConfirm, } = useContext(SystemContext)

    const [ isAllApplyChecked, setAllApplyChecked ] = useState(false)
    const [ isAllUnApplyChecked, setAllUnApplyChecked ] = useState(false)

    const [ applyCarList, setApplyCarList ] = useState([])
    const [ unApplyCarList, setUnApplyCarList ] = useState([])

    const [ selectedApplyIdList, setSelectedApplyIdList ] = useState([])
    const [ selectedUnApplyIdList, setSelectedUnApplyIdList ] = useState([])

    const [ originApplyIdLIst, setOriginApplyIdLIst ] = useState([])
    const [ originUnApplyIdLIst, setOriginUnApplyIdLIst ] = useState([])

    const [fuelTypes, setFuelTypes] = useState([]);
    const [mssTypes, setMssTypes] = useState([]);
    console.log("UpdateProdPop -> fuelTypes", fuelTypes)
    console.log("UpdateProdPop -> mssTypes", mssTypes)

    const isApplyChecked = useCallback((applyCar)=>{
        return selectedApplyIdList.includes(applyCar?.dlrPrdId)
    }, [ selectedApplyIdList ])

    const isUnApplyChecked = useCallback((applyCar)=>{
        return selectedUnApplyIdList.includes(applyCar?.dlrPrdId)
    }, [ selectedUnApplyIdList ])

    const onSave = async () => {
        console.log('onSave')
        // [{"dlrPrdId" : "asd", "applyStt" : "Y"}]


        const newAppyCarList = applyCarList
            .filter(applyCar => !originApplyIdLIst.includes(applyCar.dlrPrdId))
            .map(({dlrPrdId}) => ({
                dlrPrdId,
                applyStt : "Y"
            }))
        
        const newUnAppyCarList = unApplyCarList
            .filter(unApplyCar => !originUnApplyIdLIst.includes(unApplyCar.dlrPrdId))
            .map(({dlrPrdId}) => ({
                dlrPrdId,
                applyStt : "N"
            }))

        const params = {
            updatePass,
            list : [
                ...newAppyCarList,
                ...newUnAppyCarList
            ]   
        }

        if(params.list.length){
            showLoader()
            const { data , statusinfo } = await updateFreePassMgmt(params).then(res => res?.data)
            hideLoader()
            if(statusinfo.returncd === '000'){
                onClose && onClose()
                showAlert('저장되었습니다')
            }
        } else {
            showAlert('변경사항이 없습니다')
        }



    }

    const liClick = (e) => {
        const { target, target:{tagName} } = e
        console.log("liClick -> tagName", tagName)
        if(tagName !== 'INPUT' && tagName !=='LABEL'){
            // e.preventDefault()
            const li = findLi(target)
            console.log("liClick -> li", li)
            li.querySelector('input[type=checkbox]').click()
        }
    }

    const onHandleChange = (e, item) => {
        const { name, checked } = e.target
        console.log('e : ', e)
        console.log('item : ', item)
        // selectedApplyIdList
        // selectedUnApplyIdList
        if(name === 'apply'){
            setSelectedApplyIdList(checked ? [...selectedApplyIdList, item.dlrPrdId] : selectedApplyIdList.filter(id => id !== item.dlrPrdId))
        } else {
            setSelectedUnApplyIdList(checked ? [...selectedUnApplyIdList, item.dlrPrdId] : selectedUnApplyIdList.filter(id => id !== item.dlrPrdId))
        }
    }

    const allCheck = (e) => {
        const { name, checked } = e?.target
        console.log("allCheck -> name", name)
        console.log("allCheck -> checked", checked)

        if(name === 'apply'){
            console.log('check all applyCarList')
            setSelectedApplyIdList(checked ? applyCarList.map(car => car?.dlrPrdId) : [])
        } else {
            console.log('check all unApplyCarList')
            setSelectedUnApplyIdList(checked ? unApplyCarList.map(car => car?.dlrPrdId) : [])
        }
    }

    const moveToUnApply = useCallback(()=>{
        console.log('moveToUnApply')
        console.log('======> 이동')

        console.log("moveToApply -> unApplyCarList", unApplyCarList)
        console.log("moveToApply -> selectedApplyIdList", selectedApplyIdList)

        setUnApplyCarList([
            ...applyCarList.filter(applyCar => selectedApplyIdList.includes(applyCar?.dlrPrdId)).map(item => ({...item})),
            ...unApplyCarList.map(item => ({...item}))
        ])
        setApplyCarList(applyCarList.filter(applyCar => !selectedApplyIdList.includes(applyCar?.dlrPrdId)).map(item => ({...item})))
        setSelectedApplyIdList([])
    }, [ applyCarList, selectedApplyIdList])

    const moveToApply = useCallback(() => {
        console.log('moveToApply updatePass?.crSlot : ', updatePass?.crSlot)
        console.log('moveToApply applyCarList.length : ', applyCarList.length)
        console.log('moveToApply selectedUnApplyIdList.length : ', selectedUnApplyIdList.length)
        if(parseInt(updatePass?.crSlot) < applyCarList.length + selectedUnApplyIdList.length){
            showAlert('등록가능 대수를 초과하였습니다')
        } else {
            console.log('<====== 이동')

            console.log("moveToApply -> unApplyCarList", unApplyCarList)
            console.log("moveToApply -> selectedUnApplyIdList", selectedUnApplyIdList)

            setApplyCarList([
                ...unApplyCarList.filter(unApplyCar => selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)).map(item => ({...item})),
                ...applyCarList.map(item => ({...item}))
            ])
            setUnApplyCarList(unApplyCarList.filter(unApplyCar => !selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)).map(item => ({...item})))
            // setSelectedApplyIdList(checked ? applyCarList.map(car => car?.dlrPrdId) : [])
            setSelectedUnApplyIdList([])
        }
    }, [updatePass, unApplyCarList, selectedUnApplyIdList ])


    useEffect(() => {
        if(selectedApplyIdList?.length){
            setAllApplyChecked(applyCarList.every(applyCar => !!selectedApplyIdList.includes(applyCar?.dlrPrdId)))
        } else {
            setAllApplyChecked(false)
        }
    }, [ selectedApplyIdList, applyCarList ])

    useEffect(() => {
        if(selectedUnApplyIdList?.length){
            setAllUnApplyChecked(unApplyCarList.every(unApplyCar => !!selectedUnApplyIdList.includes(unApplyCar?.dlrPrdId)))
        } else {
            setAllUnApplyChecked(false)
        }
    }, [ selectedUnApplyIdList, unApplyCarList ])

    const getMssNm = (mssDvcd) => mssTypes.find((carMss) => carMss.value == mssDvcd)?.label
    const getFuelNm = (fuelDvcd) => fuelTypes.find((carFuel) => carFuel.value == fuelDvcd)?.label

    useEffect(() => {
        showLoader()
        getCommonCodeAsync('FM047').then(setMssTypes);
        getCommonCodeAsync('FM048').then(setFuelTypes);
        selectFreePassMgmtList().then(res => {
            console.log("res : ", res)
            const { data = {}, statusinfo } = res?.data
            
            if(statusinfo?.returncd === '000'){
                const { updateapplylist=[], updateunapplylist=[] } = data
                setApplyCarList(updateapplylist)
                setUnApplyCarList(updateunapplylist)

                setOriginApplyIdLIst(updateapplylist.map(updateapply => updateapply?.dlrPrdId))
                setOriginUnApplyIdLIst(updateunapplylist.map(updateunapply => updateunapply?.dlrPrdId))
            }
        }).finally(() => hideLoader())
    }, [])

    return (
        <div className="con-wrap popup-update">
            <form className="register-form">
            {/* 차량 기본 정보 */}
                <fieldset>
                    <legend className="away">업데이트 자유권 권리</legend>
                    <div className="update-wrap">
                    <div className="update-left">
                        <ul className="check-all">
                            <li onClick={liClick} style={{cursor:'pointer'}}>
                                <CheckBox
                                    id="chk-update-all01" 
                                    onChange={allCheck}
                                    name="apply"
                                    checked={isAllApplyChecked}
                                />
                                <p>적용차량</p>
                            </li>
                        </ul>

                        <div className="check-list">
                            <ul>
                                {
                                    applyCarList.map((applyCar, i) =>
                                        <li key={i} onClick={liClick} style={{cursor:'pointer'}}>
                                            <CheckBox
                                                id={`chk-update01-${i}`}
                                                name="apply"
                                                onChange={e => onHandleChange(e, applyCar)}
                                                checked={isApplyChecked(applyCar)}
                                            />
                                            <p>
                                                {applyCar?.crNm}
                                                <span>{applyCar?.crNo} | {applyCar?.frmYyyy}년형 | {setComma(applyCar?.drvDist)}km | {getMssNm(applyCar?.mssDvcd)} | {getFuelNm(applyCar?.fuelDvcd)} | {setComma(applyCar?.slAmt/10000)}만원</span>
                                            </p>  
                                        </li>
                                    )
                                }
                            </ul>  
                        </div>
                    </div>

                    <div className="update-right">
                        <ul className="check-all">
                            <li onClick={liClick} style={{cursor:'pointer'}}>
                                <CheckBox
                                    id="chk-update-all02"
                                    onChange={allCheck}
                                    name="unApply"
                                    checked={isAllUnApplyChecked}
                                />
                                <p>미적용차량</p>
                            </li>
                        </ul>

                        <div className="check-list">
                            <ul className="chk_list">
                                {
                                    unApplyCarList.map((applyCar, i) =>
                                        <li key={i} onClick={liClick} style={{cursor:'pointer'}}>
                                            <CheckBox
                                                id={`chk-update02-${i}`}
                                                name="unApply"
                                                onChange={e => onHandleChange(e, applyCar)}
                                                checked={isUnApplyChecked(applyCar)}
                                            />
                                            <p>
                                                {applyCar?.crNm}
                                                <span>{applyCar?.crNo} | {applyCar?.frmYyyy}년형 | {setComma(applyCar?.drvDist)}km | {getMssNm(applyCar?.mssDvcd)} | {getFuelNm(applyCar?.fuelDvcd)} | {setComma(applyCar?.slAmt)}만원</span>
                                            </p>  
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                    <Buttons align="center" className="btn-move-wrap">
                        <Button size="mid" line="gray" color="darkgray" radius={true} title="" width={40} onClick={moveToUnApply} buttonMarkup={true} className={`btn-arr-right ${selectedApplyIdList.length ? 'on' : ''}`} disabled={!selectedApplyIdList.length} />
                        <Button size="mid" line="gray" color="darkgray" radius={true} title="" width={40} onClick={moveToApply} buttonMarkup={true} className={`btn-arr-left ${selectedUnApplyIdList.length ? 'on' : ''}`} disabled={!selectedUnApplyIdList.length} />
                    </Buttons>
                    </div>
                </fieldset>
            </form>

            <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} buttonMarkup={true} onClick={() => onClose(false)} />
                <Button size="big" background="blue80" title="확인" width={172} buttonMarkup={true} onClick={onSave} />
            </Buttons>
      </div>
    )
}

export default UpdateProdPop