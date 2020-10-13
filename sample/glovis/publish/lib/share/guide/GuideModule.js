import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import PropTypes from "prop-types"
import animateScrollTo from 'animated-scroll-to'
import { GuideContext } from '../../../src/dummy/guide'

const GuideModule = ({children, title, id}) => {
  const [codeType, setCodeType] = useState(false)
  const codeOffets = useRef([])
  let codeId;
  const handleCodeType = (e) => {
    setCodeType(!codeType)
    codeId = e.target.dataset.id;
    if(!codeType) {
      setTimeout(() => animateScrollTo(codeOffets.current[codeId]), 100);
    }
  }

  useEffect(() => {
    let codeList = Array.from(document.getElementsByClassName('guide-tit'))
    codeList.map((code, index) => {
      codeOffets.current[index] = code.offsetTop - 65
    })
  }, [codeType, handleCodeType])

  
  
  const value = useMemo(() => ({codeType}), [codeType])
  return (
    <>
      <h2 className="guide-tit">{title} <span className={codeType ? 'btn-base prism-btn active' : 'btn-base prism-btn'} onClick={handleCodeType} data-id={id}></span></h2>
      <GuideContext.Provider value={value}>
        {children}
      </GuideContext.Provider>
    </>
  )
}

export default GuideModule