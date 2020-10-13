import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import Button from '@lib/share/items/Button';
import { CheckContext } from '@lib/share/items/CheckContext';
import { signup_check_list } from '@src/dummy';
import { auction_check_term } from '@src/dummy/terms';
import { MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';

const SignUpCheckBoxGroup = ({ title, id, sub_title, sub_id, agree_list, agree_term, events, links, onChange }) => {
  let checkArray = [];
  let isEssentialChecked = [];
  for (let i = 0; i < agree_list.length; i++) {
    checkArray.push(agree_list[i].checked);
    isEssentialChecked.push(agree_list[i].essential);
  }
  let allState = checkArray.every(i => i === true);

  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);
  const [essentialChecked, setEssentialChecked] = useState(JSON.stringify(checkArray) === JSON.stringify(isEssentialChecked) || allState);

  useEffect(() => {
    setIsAgreeChecked(checkArray);
    setEssentialChecked(JSON.stringify(checkArray) === JSON.stringify(isEssentialChecked) || allState);
    setAllAgreeChecked(allState);
    console.log('agree_list ===> ', agree_list);
  }, [agree_list]);

  const value = useMemo(() => ({
    isAgreeChecked, allAgreeChecked,
    setIsAgreeChecked, setAllAgreeChecked,
    essentialChecked, setEssentialChecked,
    agree_list
  }), [isAgreeChecked, allAgreeChecked, essentialChecked]);

  const onHandleChange = useCallback((e, val) => {
    if (onChange) onChange(e, val);
  }, [onChange]);

  return (
    <fieldset>
      <legend className="away">이용약관 및 개인정보수집 및 이용에 관한 동의</legend>
      {
        !hasMobile ? (
          <div className="terms-agree-wrap">
            <CheckContext.Provider value={value}>
              <ul className="terms-content-list">
                {agree_list.map((v, i) => {
                  return (
                    <li key={i}>
                      <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} onChange={(e, val) => onHandleChange(e, val)} />
                      <div className="terms-box">
                        <ColoredScrollbars autoHeightMax={160}>
                          <div className="frminbox">{agree_term[i]}</div>
                        </ColoredScrollbars>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="terms-agree-all">
                <CheckBox id={sub_id} title={sub_title} checked={essentialChecked} agreeType={true} agreeEssential={true} />
                <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} />
              </div>
            </CheckContext.Provider>
          </div>
        ) : (
          <>
            <div className="inner check-list-wrap">
              <CheckContext.Provider value={value}>
                <ul className="check-select-list">
                  {agree_list.map((v, i) => {
                    return (
                      <li key={i}>
                        <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true}  size="noborder" onChange={(e, val) => onHandleChange(e, val)} />                     
                        {/* <span className="term-view" onClick={() => Router.push(links[i])}></span> */}
                        <span className="term-view" onClick={events[i]}></span>
                      </li>
                    )
                  })}
                </ul>
                <div className="terms-agree-all">
                  <CheckBox id={sub_id} title={sub_title} checked={essentialChecked} agreeType={true} agreeEssential={true} onChange={onHandleChange} />
                  <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} onChange={onHandleChange} />
                </div>
              </CheckContext.Provider>
            </div>
          </>
        )
      }
    </fieldset>
  )
}

SignUpCheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  sub_title: PropTypes.string,
  sub_id: PropTypes.string,
  agree_list: PropTypes.array,
  agree_term: PropTypes.array,
  onChange: PropTypes.func
}

export default SignUpCheckBoxGroup;