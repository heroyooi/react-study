import React, { useState, useMemo, createContext, useEffect } from 'react';
import CheckBox from './CheckBox';
import RodalPopup from '../popup/RodalPopup';
import PropTypes from 'prop-types';
import { CheckContext } from './CheckContext';
/**
 * 200327 김상진 컴포넌트 통합 완료 CheckBoxGroup.js
 * 그외 컴포넌트 이름변경완료
 */
/* 약관 내용 출력을 위한 agree_term(약관 내용 리스트) 추가 */
const CheckBoxGroup = ({ title, id, agree_list, agree_term, type = 'normal', onChange }) => {
  const checkArray = [];
  for (const element of agree_list) {
    checkArray.push(element.checked);
  }
  const allState = checkArray.every((i) => i === true);

  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);

  const value = useMemo(() => ({ isAgreeChecked, allAgreeChecked, setIsAgreeChecked, setAllAgreeChecked, agree_list }), [isAgreeChecked, allAgreeChecked]);

  const [rodalShow1, setRodalShow1] = useState(false);
  const [rodalShow2, setRodalShow2] = useState(false);
  const [rodalShow3, setRodalShow3] = useState(false);
  // const [rodalShow4, setRodalShow4] = useState(false)
  // const [rodalShow5, setRodalShow5] = useState(false)
  const [rodalType, setRodalType] = useState('zoom');
  const modalCloseHandler1 = (flag) => setRodalShow1(flag);
  const modalCloseHandler2 = (flag) => setRodalShow2(flag);
  const modalCloseHandler3 = (flag) => setRodalShow3(flag);
  // const modalCloseHandler4 = (flag) => setRodalShow4(flag)
  // const modalCloseHandler5 = (flag) => setRodalShow5(flag)

  const handleRodalPopup = (e, id) => {
    console.log(id);
    e.preventDefault();
    if (id === 'chk-agree-1') {
      setRodalShow1(true);
    } else if (id === 'chk-agree-2') {
      setRodalShow2(true);
    } else if (id === 'chk-agree-3') {
      setRodalShow3(true);
    }
    // } else if (id === 'chk-agree-4') {
    //   setRodalShow4(true)
    // } else if (id === 'chk-agree-5') {
    //   setRodalShow5(true)
    // }
    setRodalType('fade');
  };

  const onHandleChange = (e, val) => {
    if (onChange) onChange(e, val);
  };

  useEffect(() => {
    setIsAgreeChecked(checkArray);
    setAllAgreeChecked(allState);
  }, [agree_list]);

  return (
    <CheckContext.Provider value={value}>
      <div className="chk-agree-wrap">
        <p className="chk-agree-all">
          <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
        </p>
        <ul className="chk-agree-list">
          {agree_list.map((v, i) => {
            return (
              <li key={i}>
                <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} termPop={true} termPopHandle={(e) => handleRodalPopup(e, v.id)} onChange={onHandleChange} />
              </li>
            );
          })}
        </ul>
      </div>
      {type === 'terms' &&
        agree_list.map((agree, i) => {
          const idx = Number(agree.id.split('chk-agree-')[1]);
          return (
            <div key={i}>
              <RodalPopup
                show={idx === 1 ? rodalShow1 : idx === 2 ? rodalShow2 : rodalShow3}
                type={'fade'}
                closedHandler={idx === 1 ? modalCloseHandler1 : idx === 2 ? modalCloseHandler2 : modalCloseHandler3}
                title={agree.title}
                mode="normal"
                size="medium"
              >
                <div className="con-wrap">{agree_term[i]}</div>
              </RodalPopup>
            </div>
          );
        })
      /* <>
          <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="홈서비스 이용약관 (필수)" mode="normal" size="medium">
            <div className="con-wrap"></div>
          </RodalPopup>
          <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="홈서비스 환불규정 (필수)" mode="normal" size="medium">
            <div className="con-wrap"></div>
          </RodalPopup>
          <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="고유식별정보 수집/이용 동의 (필수)" mode="normal" size="medium">
            <div className="con-wrap"></div>
          </RodalPopup>
        </> 
      /* <RodalPopup show={rodalShow1} type={'fade'} closedHandler={modalCloseHandler1} title="개인정보 수집/이용 동의" mode="normal" size="medium">
            <div className="con-wrap">

            </div>
          </RodalPopup>
          <RodalPopup show={rodalShow2} type={'fade'} closedHandler={modalCloseHandler2} title="고유식별정보 수집/이용 동의(필수)" mode="normal" size="medium">
            <div className="con-wrap">

            </div>
          </RodalPopup>
          <RodalPopup show={rodalShow3} type={'fade'} closedHandler={modalCloseHandler3} title="개인정보처리의 위탁에 관한 사항(필수)" mode="normal" size="medium">
            <div className="con-wrap">

            </div>
          </RodalPopup>
          <RodalPopup show={rodalShow4} type={'fade'} closedHandler={modalCloseHandler4} title="마케팅 활용동의(선택)" mode="normal" size="medium">
            <div className="con-wrap">

            </div>
          </RodalPopup>
          <RodalPopup show={rodalShow5} type={'fade'} closedHandler={modalCloseHandler5} title="개인정보 제3자 제공에 관한 사항(선택)" mode="normal" size="medium">
            <div className="con-wrap">

            </div>
          </RodalPopup> */
      }
    </CheckContext.Provider>
  );
};

CheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  agree_list: PropTypes.array,
  agree_term: PropTypes.array,
  type: PropTypes.string
};

export default CheckBoxGroup;
