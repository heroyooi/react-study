import { useState, useContext } from 'react'
import CheckBox from '@lib/share/items/CheckBox';
import Input from '@lib/share/items/Input';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Radio from '@lib/share/items/Radio';

import { SystemContext } from '@src/provider/SystemProvider';

import { DeleteReasonList } from '@src/constant/dealer/dealerProd';

const DeleteProdPop = ({eventHandler, onClose}) => {
    const { showConfirm } = useContext(SystemContext);
    const [reasonCd, setReasonCd]  = useState('')
    const [reason, setReason]  = useState('')

    const onClick = (e) => {
        showConfirm('정말 삭제하시겠습니까?', () => {
            eventHandler({
                name: 'delete',
                slDelRsnCd:reasonCd,
                slDelRsn:reason,
            })
        })
    }

    const inputReason = (e) => {
        const { value } = e.target
        console.log("inputReason -> value", value)
        setReason(value)
    }

    const onCheck = (e) => {
        const { value, checked } = e.target
        console.log("onCheck -> value", value)
        console.log("onCheck -> checked", checked)
        setReasonCd(value)
    }

    return (
        <div className="con-wrap popup-delete-reason">
            <p className="delete-tit">판매삭제사유 입력</p>
            <div className="delete-wrap">
                <div className="radio-group">
                    <ul className="vertical" >
                        {
                            DeleteReasonList?.map((item,i) => 
                                <li>
                                    <Radio
                                        id={`chk-reason-${i}`}
                                        value={item?.value}
                                        name="slDelRsnCd"
                                        checked={reasonCd}
                                        title={item?.title}
                                        onChange={onCheck}
                                    />
                                </li>
                            )
                        }
                    </ul>
                </div>
                {/* <CheckBox id='chk-reason1' value="0010" name="slDelRsnCd" title="실차주 요청으로 인한 삭제" onChange={onCheck} />
                <CheckBox id='chk-reason2' value="0020" name="slDelRsnCd" title="차량 소속 변경" onChange={onCheck} />
                <CheckBox id='chk-reason3' value="0030" name="slDelRsnCd" title="오프라인 채널 통한 판매" onChange={onCheck} />
                <CheckBox id='chk-reason4' value="0040" name="slDelRsnCd" title="타 사이트를 통한 판매" onChange={onCheck} />
                <CheckBox id='chk-reason5' value="0050" name="slDelRsnCd" title="기타" onChange={onCheck} /> */}
                <Input
                    type="text"
                    value=""
                    id="car-reason6"
                    height={47}
                    name="slDelRsn"
                    value={reason}
                    onChange={inputReason}
                    disabled={reasonCd !== '0050'}
                    maxLength={12}
                />
                <div className="input-limit">{reason?.length || 0}/12</div>
            </div>
            <p className="careful">삭제 시 복구 및 환불이 안되오니 주의하시기 바랍니다.</p>
            <Buttons align="center" marginTop={48}>
                <Button size="big" background="gray" title="취소" width={172} height={60} buttonMarkup={true} onClick={(e) => onClose(false)} />
                <Button size="big" background="blue80" title="삭제하기" width={172} height={60} name="delete" buttonMarkup={true} onClick={onClick} />
            </Buttons>
        </div>
    )
}

export default DeleteProdPop