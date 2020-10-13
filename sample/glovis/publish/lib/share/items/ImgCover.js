import React from 'react'
import { useSelector } from 'react-redux';

const ImgCover = ({src, alt, name='', children}) => {
  const isIE = useSelector(state => state.common.isIE);
  return (
    <div className="img-cover-wrap">
      {
        isIE
          ? <div className="img-cover" style={{"backgroundImage": "url("+src+")"}}><img src={src} alt={alt} style={{display: 'none'}} name={name} /></div>
          : <div className="img-cover"><img src={src} alt={alt} name={name} /></div>
      }
      {children && children}
    </div>
  )
}

export default React.memo(ImgCover);