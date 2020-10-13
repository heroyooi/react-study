import { useState, useRef, useCallback } from "react";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { numberFormat } from '@src/utils/CommonUtil';
import SlideAnimate from "./SlideAnimate";

const TreeItem = ({data, idx, children, checked=false, isSelf=true, type='default', depth, onClick}) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  
  const {label, description, count, defaultChecked} = data;
  const [isChecked, setIsChecked] = useState(
    defaultChecked === true ? true : false
  );
  const inputEl = useRef(null);

  let tc = ''
  if(type === 'default'){
    tc += 'chk-box chk-basic'
  }

  const span_style = classNames(
    tc,
    { "on": (isSelf === true) || (children.length !== 0) ? isChecked : checked }
  )

  const inputTrigger = useCallback(() => {
    inputEl.current.click();
  }, []);

  const handleChange = useCallback((e) => {
    if((isSelf === true) || (children.length !== 0)) setIsChecked(!isChecked);
    if(onClick) onClick(e, data, (isSelf === true) || (children.length !== 0), idx);
    
  }, [isChecked]);

  const makeDescription = useCallback((value) => { 
    let str = ""
    if(value !== "" && value !== undefined) {
      str = " (" + value + ")"
    }
    return str
  }, [])

  return (
    <li>
      <div className="desc" onClick={inputTrigger}>
        <span className={span_style}>
          { type === 'chk-color2' && <><i className="bg-l"></i><i className="bg-r"></i></> }
          <input type="checkbox" checked={((isSelf === true) || (children.length !== 0)) ? isChecked : checked} onChange={handleChange} ref={inputEl} name={label} />
          <label className={children.length !== 0 ? 'hasChild' : null}>{label}</label>
          <em>{makeDescription(description)}</em>
        </span>
        <span className="count">{numberFormat(count)}</span>
      </div>
      {
        children.length !== 0 &&
        <SlideAnimate toggle={isChecked}>
          <ul className="tree" className={!hasMobile ? `tree` : `tree depth-${depth+2}`}>{children}</ul>
        </SlideAnimate>
      }
    </li>
  )
}

TreeItem.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node
}

export default TreeItem