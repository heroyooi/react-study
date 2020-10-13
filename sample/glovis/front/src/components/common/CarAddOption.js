import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox'
import Input from '@lib/share/items/Input'

/*
html 변경이력
03.09 : 모바일 버전, 옵션 선택 버튼 클릭 처리를 위한 props, onClick 추가, #a1 부분 참고
*/
const CarAddOption = ({ disabled = false, onClick }) => { // #a1
  const hasMobile = useSelector((state) => state.common.hasMobile);
  if (hasMobile) {
    const handleOptionClick = (e) => {
      e.preventDefault();
      if (onClick) onClick();
    }
    return (
      <div className="option-add">
        <h3 className="tit2">선택옵션</h3>
        <ul className="cate-list-detail">
          <li>
            <CheckBox id="chk-high-tech" title="하이테크" />
          </li>
          <li>
            <CheckBox id="chk-comfort" title="컴포트" />
          </li>
          <li>
            <CheckBox id="chk-snow-pearl" title="스노우 화이트 펄" />
          </li>
          <li>
            <CheckBox id="chk-style" title="스타일" />
          </li>
          <li>
            <CheckBox id="chk-led-2" title="실내 LED등 장착" />
          </li>
          <li>
            <CheckBox id="chk-auto-mirror" title="전자식룸미러" />
          </li>
        </ul>
        <Input type="text" placeHolder="표시되지 않은 선택옵션은 직접 입력해주세요." id="direct-input" height={38} />
      </div>
    )
  }
  return (
    <fieldset>
      <legend className="away">차량 기본 정보</legend>
      <div className="option-add">
        <h4 className="mb33">선택 옵션</h4>
        <div className="car-option-add">
          <ul>
            <li>
              <CheckBox id='chk-snow-pearl' title='스노우 화이트 펄' disabled={disabled} />
            </li>
            <li>
              <CheckBox id='chk-sunroof-add' title='선루프' disabled={disabled} />
            </li>
            <li>
              <CheckBox id='chk-navigation-add' title='네비게이션(7인치)' disabled={disabled} />
            </li>
            <li>
              <CheckBox id='chk-auto-mirror' title='전자식 룸미러' disabled={disabled} />
            </li>
            <li>
              <CheckBox id='chk-comfort' title='컴포트' disabled={disabled} />
            </li>
            <li>
              <CheckBox id='chk-high-tech' title='하이테크' disabled={disabled} />
            </li>
          </ul>
          <label htmlFor="direct-input">직접입력</label>
          <Input type="text" placeHolder="표시되지 않은 추가 옵션, 패키지 옵션은 직접 입력해주세요." id="direct-input" width="100%" height={48} disabled={disabled} />
        </div>
      </div>
    </fieldset>
  )
}

export default CarAddOption;