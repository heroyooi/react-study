import { useState, useContext } from 'react'
import classNames from "classnames/bind"
import PropTypes from 'prop-types'
import { CheckContext } from './CheckContext'
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';

const CheckBox = ({id, className, title, sub, checked=false, disabled=false, onChange, type='default', size="large", isSelf=true, agreeType=false, agreeAll=false, agreeEssential=false, name, isColor=false, bgColor1, bgColor2, chkColor="blue", termPop=false, termPopHandle}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  let tc = '';
  if (type === 'default') {
    tc += 'chk-box chk-basic';
  } else if (type === 'chk-color2') {
    tc += 'chk-box chk-basic chk-color2';
  }
  if(className !== undefined) tc += ' ' + className;
  
  if (agreeType === false) {
    // 일반 체크
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = (e) => {
      if(isSelf === true) setIsChecked(!isChecked);
      if(onChange) onChange(e);
    };

    const span_style = classNames(
      tc,
      { "on": isSelf === true ? isChecked : checked },
      { "disabled": disabled },
      { "sml": size === "small" },
      { "noborder": size === "noborder" },
      { "chk-color": isColor },
      { "chk-black": chkColor === "black" },
      { "chk-white": chkColor === "white" },
      { "is-line": type==="chk-color2" || bgColor1==="#fff" || bgColor2==="#fff" || bgColor1==="#ffffff" || bgColor2==="#ffffff" }
    )

    return (
      <span className={span_style}>
        {
          isColor && (
            type === 'chk-color2'
              ? <>
                  <i className="bg-l" style={{backgroundColor: bgColor1}}></i>
                  <i className="bg-r" style={{backgroundColor: bgColor2}}></i>
                </>
              : <i className="bg-a" style={{backgroundColor: bgColor1}}></i>
          )
        }
        {  }
        <input type="checkbox" id={id} checked={isSelf === true ? isChecked : checked} disabled={disabled} onChange={handleChange} name={name} />
        <label htmlFor={id}>{hasMobile ? <span className="title">{title}</span>: title} <em>{sub}</em></label>
        {
          termPop && (
            !hasMobile ? 
              <Button size="sml" line="gray" radius={true} title="상세보기" width={60} marginLeft={10} onClick={termPopHandle} marginTop={-2}/>
            :
              <Button size="sml" title="자세히보기" />
          )
        }        
      </span>
    )
  } else {
    // 모두 체크
    const {
      isAgreeChecked, allAgreeChecked, 
      setIsAgreeChecked, setAllAgreeChecked, 
      essentialChecked, setEssentialChecked, 
      agree_list
    } = useContext(CheckContext);

    let isEssentialChecked = [], isEssentialNum = [], isEssentialCond = [];
    for (let i = 0; i < agree_list.length; i++) {
      isEssentialChecked.push(agree_list[i].essential);
    }
    isEssentialChecked.map((v,i) => {
      if (v === true) isEssentialNum.push(i);
    });

    const handleChangeAgree = (e) => {
      let checkArray = [];
      if (agreeAll) { // 약관 전체 동의 클릭 시
        agree_list.map(v => checkArray.push(allAgreeChecked === false ? true : false));
      } else { // 그 밖의 체크박스 클릭 시
        checkArray = [...isAgreeChecked]
        if (agreeEssential) { // 필수 약관 동의 클릭 시
          isEssentialNum.map(v => checkArray[v] = essentialChecked ? false : true);
        } else { 
          // 그밖의 동의
          let checkIndex = agree_list.findIndex(agree => agree.id === e.target.id);          
          checkArray[checkIndex] = !checkArray[checkIndex];
        }
      }
      let checkAll = checkArray.every(i => i === true);
      setIsAgreeChecked(checkArray);
      setAllAgreeChecked(checkAll);
      if(agree_list.every(v => v.essential !== undefined)){
        isEssentialNum.map(v => isEssentialCond.push(checkArray[v]));
        setEssentialChecked(!isEssentialCond.includes(false) || checkAll);
      }
      
      if (onChange) {
        if (!checked) onChange(e);
      }
    };

    const span_style = classNames(
      tc,
      { "on": checked },
      { "disabled": disabled },
      { "sml": size === "small" },
      { "noborder": size === "noborder" }
    )

    return (
      <span className={span_style}>
        { type === 'chk-color2' && <><i className="bg-l"></i><i className="bg-r"></i></> }
        <input type="checkbox" id={id} checked={checked} disabled={disabled} onChange={handleChangeAgree} />
        <label htmlFor={id}>{title}</label>
        {termPop && <Button size="sml" line="gray" radius={true} title="상세보기" width={60} marginLeft={10} onClick={termPopHandle} />}
      </span>
    )
  }
}

CheckBox.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  sub: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  isSelf: PropTypes.bool,
  agreeType: PropTypes.bool,
  agreeAll: PropTypes.bool,
  agreeEssential: PropTypes.bool,
  isColor: PropTypes.bool,
  bgColor1: PropTypes.string,
  bgColor2: PropTypes.string,
  termPop : PropTypes.bool,
  termPopHandle : PropTypes.func
}

export default React.memo(CheckBox)