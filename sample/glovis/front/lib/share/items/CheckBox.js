/* eslint-disable react/no-danger */
import React, { useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '@lib/share/items/Button';
import { CheckContext } from './CheckContext';
/**
 * 200327 김상진 컴포넌트 통합 완료 CheckBox.js
 * hasMobile 추가 및 기존 버튼, 컬러 기능 재 추가 확인
 */
const CheckBox = ({
  id,
  className,
  title,
  sub,
  checked = false,
  disabled = false,
  onChange,
  type = 'default',
  size = 'large',
  isSelf = true,
  agreeType = false,
  agreeAll = false,
  agreeEssential = false,
  name,
  value,
  isColor = false,
  bgColor1,
  bgColor2,
  chkColor = 'blue',
  termPop = false,
  termPopHandle,
  dataContext
}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  let tc = '';
  if (type === 'default') {
    tc += 'chk-box chk-basic';
  } else if (type === 'chk-color2') {
    tc += 'chk-box chk-basic chk-color2';
  }
  if (className !== undefined) tc += ' ' + className;

  if (agreeType === false) {
    // 일반 체크
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleChange = (e) => {
      if (isSelf === true) setIsChecked(!isChecked);
      if (onChange) {
        onChange(e, dataContext);
      }
    };

    const spanStyle = classNames(
      tc,
      { on: isSelf === true ? isChecked : checked },
      { disabled: disabled },
      { sml: size === 'small' },
      { noborder: size === 'noborder' },
      { 'chk-color': isColor },
      { 'chk-black': chkColor === 'black' },
      { 'chk-white': chkColor === 'white' },
      { 'is-line': type === 'chk-color2' || bgColor1 === '#fff' || bgColor2 === '#fff' || bgColor1 === '#ffffff' || bgColor2 === '#ffffff' }
    );

    return (
      <span className={spanStyle}>
        {isColor &&
          (type === 'chk-color2' ? (
            <>
              <i className="bg-l" style={{ backgroundColor: bgColor1 }} />
              <i className="bg-r" style={{ backgroundColor: bgColor2 }} />
            </>
          ) : (
            <i className="bg-a" style={{ backgroundColor: bgColor1 }} />
          ))}
        {}
        <input type="checkbox" id={id} value={value} checked={isSelf === true ? isChecked : checked} disabled={disabled} onChange={handleChange} name={name} />
        <label htmlFor={id}>
          {hasMobile ? <span className="title" dangerouslySetInnerHTML={{ __html: title }} /> : title} <em dangerouslySetInnerHTML={{ __html: sub }} />
        </label>
        {termPop &&
          (!hasMobile ? (
            <Button size="sml" line="gray" radius={true} title="상세보기" width={60} marginLeft={10} onClick={termPopHandle} marginTop={-2} buttonMarkup={true} />
          ) : (
            <Button size="sml" title="자세히보기" buttonMarkup={true} onClick={termPopHandle} />
          ))}
      </span>
    );
  }

  // 모두 체크
  const { isAgreeChecked, allAgreeChecked, setIsAgreeChecked, setAllAgreeChecked, essentialChecked, setEssentialChecked, agree_list } = useContext(CheckContext);

  const isEssentialChecked = [];
  const isEssentialNum = [];
  const isEssentialCond = [];

  agree_list.forEach((item) => {
    isEssentialChecked.push(item.essential);
  });

  isEssentialChecked.map((v, i) => {
    if (v === true) isEssentialNum.push(i);
  });

  const handleChangeAgree = (e) => {
    let checkArray = [];
    if (agreeAll) {
      // 약관 전체 동의 클릭 시
      agree_list.map(() => checkArray.push(allAgreeChecked === false ? true : false));
    } else {
      // 그 밖의 체크박스 클릭 시
      checkArray = [...isAgreeChecked];
      if (agreeEssential) {
        // 필수 약관 동의 클릭 시
        isEssentialNum.map((v) => (checkArray[v] = essentialChecked ? false : true));
      } else {
        // 그밖의 동의
        const checkIndex = agree_list.findIndex((agree) => agree.id === e.target.id);
        checkArray[checkIndex] = !checkArray[checkIndex];
      }
    }
    const checkAll = checkArray.every((i) => i === true);
    setIsAgreeChecked(checkArray);
    setAllAgreeChecked(checkAll);
    if (agree_list.every((v) => v.essential !== undefined)) {
      isEssentialNum.map((v) => isEssentialCond.push(checkArray[v]));
      setEssentialChecked(!isEssentialCond.includes(false) || checkAll);
    }

    if (onChange) {
      //회원가입 쪽에서 문제가 있어서 변경함 만약 문제 발생시 회원쪽이랑 협의 필요합니다
      //if (!checked) onChange(e, checkArray);
      onChange(e, checkArray);
    }
  };

  const spanStyle = classNames(tc, { on: checked }, { disabled: disabled }, { sml: size === 'small' }, { noborder: size === 'noborder' });

  return (
    <span className={spanStyle}>
      {type === 'chk-color2' && (
        <>
          <i className="bg-l" />
          <i className="bg-r" />
        </>
      )}
      <input type="checkbox" id={id} value={value} checked={checked} disabled={disabled} onChange={handleChangeAgree} name={name} />
      <label htmlFor={id}>{title}</label>
      {termPop && <Button size="sml" line="gray" radius={true} title="상세보기" width={60} marginLeft={10} onClick={termPopHandle} buttonMarkup={true} />}
    </span>
  );
};

CheckBox.propTypes = {
  agreeType: PropTypes.bool,
  agreeAll: PropTypes.bool,
  agreeEssential: PropTypes.bool,
  bgColor1: PropTypes.string,
  bgColor2: PropTypes.string,
  className: PropTypes.string,
  chkColor: PropTypes.string,
  checked: PropTypes.bool,
  dataContext: PropTypes.object,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  isColor: PropTypes.bool,
  isSelf: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
  sub: PropTypes.string,
  value: PropTypes.any,
  size: PropTypes.string,
  type: PropTypes.string,
  termPop: PropTypes.bool,
  onChange: PropTypes.func,
  termPopHandle: PropTypes.func
};

export default React.memo(CheckBox);
