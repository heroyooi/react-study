import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import CheckBox from '@lib/share/items/CheckBox';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { CheckContext } from '@lib/share/items/CheckContext';

const AuctionCheckBoxGroup = ({ title, id, agree_list, agree_term, links }) => {
  let checkArray = [];
  for (let i = 0; i < agree_list.length; i++) {
    checkArray.push(agree_list[i].checked)
  }
  let allState = checkArray.every(i => i === true);

  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isAgreeChecked, setIsAgreeChecked] = useState(checkArray);
  const [allAgreeChecked, setAllAgreeChecked] = useState(allState);

  const value = useMemo(() => ({ isAgreeChecked, allAgreeChecked, setIsAgreeChecked, setAllAgreeChecked, agree_list }), [isAgreeChecked, allAgreeChecked])
  if (hasMobile) {
    return (
      <div className="inner check-list-wrap">
        <CheckContext.Provider value={value}>
          <ul className="check-select-list">
            {agree_list.map((v, i) => {
              return (
                <li key={i} onClick={() => Router.push(links[i])}>
                  <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true}  size="noborder" />                     
                </li>
              )
            })}
          </ul>
          <div className="terms-agree-all">
            <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} />
          </div>
        </CheckContext.Provider>
      </div>
    )
  }
  return (
    <div className="terms-agree-wrap">
      <CheckContext.Provider value={value}>
        <CheckBox id={id} title={title} checked={allAgreeChecked} agreeType={true} agreeAll={true} />
        <ul className="terms-content-list">
          {agree_list.map((v, i) => {
            return (
              <li key={i}>
                <CheckBox id={v.id} title={v.title} checked={isAgreeChecked[i]} agreeType={true} />
                <div className="terms-box">
                  <ColoredScrollbars autoHeightMax={160}>
                    <div className="frminbox">{agree_term[i]}</div>
                  </ColoredScrollbars>
                </div>
              </li>
              )
          })}
        </ul>
      </CheckContext.Provider>
    </div>
  )
}

AuctionCheckBoxGroup.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  agree_list: PropTypes.array,
  agree_term: PropTypes.array,
}


export default AuctionCheckBoxGroup;