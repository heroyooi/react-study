import CheckBox from '@lib/share/items/CheckBox'
import Input from '@lib/share/items/Input'

const MypageAddOption = () =>{
    return(
        <div className="option-add mt80">
            <h4 className="mb33">추가 옵션</h4>
            <div className="car-option-add">
                <ul>
                <li>
                    <CheckBox id='chk-snow-pearl' title='스노우 화이트 펄' />
                </li>
                <li>
                    <CheckBox id='chk-style' title='스타일' />
                </li>
                <li>
                    <CheckBox id='chk-navigation' title='네비게이션(7인치)' />
                </li>
                <li>
                    <CheckBox id='chk-auto-mirror' title='전자식 룸미러' />
                </li>
                <li>
                    <CheckBox id='chk-comfort' title='컴포트' />
                </li>
                <li>
                    <CheckBox id='chk-high-tech' title='하이테크' />
                </li>
                </ul>
                <label htmlFor="direct-input" className="hide">추가 옵션</label>
                <Input type="text" placeHolder="표시되지 않은 추가 옵션, 패키지 옵션은 직접 입력해주세요." id="direct-input" width={689} height={48} />
            </div>
        </div>
    )
}

export default MypageAddOption;

