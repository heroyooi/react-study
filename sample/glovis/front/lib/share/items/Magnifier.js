import {useState, useEffect, useMemo, useRef, useCallback} from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ImgCover from '@lib/share/items/ImgCover';

const Magnifier = ({imgUrl, alt, zoomRatio=2, mode="normal"}) =>{
  const [isActive, setIsActive] = useState(false);
  const [imgCoord, setImgCoord] = useState({});
  const [glassSize, setGlassSize] = useState();
  const [bgSize, setBgSize] = useState({});
  const [glassCoord, setGlassCoord] = useState({});
  const [clickCheck, setClickCheck] = useState(false);
  const handleEnter = useCallback((e) =>{
    if(!clickCheck){return false;}
    e.stopPropagation();
    var target = e.target;
    if(target.name === "origin-img"){
      var imgBoundInfo = target.getBoundingClientRect();
      setImgCoord(imgBoundInfo);
      setBgSize({x :target.clientWidth * zoomRatio, y:target.clientHeight * zoomRatio});
      setGlassSize(Math.floor(imgBoundInfo.width*0.2333));
    }
    setIsActive(true);
  },[clickCheck]);

  const handleMove = useCallback((e) =>{
    if(!clickCheck){return false;}
    e.stopPropagation();
    var ratioX = (e.clientX - imgCoord.left) / imgCoord.width;
    var ratioY = (e.clientY - imgCoord.top) / imgCoord.height;
    var l = "calc(" + ratioX * 100 + "% - " + glassSize / 2 + "px)";
    var t = "calc(" + ratioY * 100 + "% - " + glassSize / 2 + "px)";
    var bl = "calc(" + ratioX * 100 + "% + " + (glassSize / 2 - ratioX * glassSize) + "px)";
    var bt = "calc(" + ratioY * 100 + "% + " + (glassSize /2 - ratioY * glassSize) + "px)";
    setGlassCoord({left:l,top:t,bgLeft:bl,bgTop:bt});
  },[glassSize, imgCoord, clickCheck]);

  const handleLeave = useCallback((e) =>{
    setIsActive(false);
  },[]);

  const handleClick = useCallback((e) =>{
    e.preventDefault();
    setClickCheck(!clickCheck);
    if(!clickCheck){
      var target = e.target;
      if(target.name === "origin-img"){
        var imgBoundInfo = target.getBoundingClientRect();
        setImgCoord(imgBoundInfo);
        setBgSize({x :target.clientWidth * zoomRatio, y:target.clientHeight * zoomRatio});
        setGlassSize(Math.floor(imgBoundInfo.width*0.2333));
      }
      setIsActive(true);
    }
    else{
      setIsActive(false);
    }
  },[clickCheck, isActive])
  return (
    <>
      <div className="magnifier-wrap"  onMouseMove={handleMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={handleClick}>
        <div className="origin-img">
          {
            mode === "live-studio"
              ? <ImgCover src={imgUrl} name="origin-img" alt={alt} />
              : <img src={imgUrl} name="origin-img" alt={alt} />
          }
        </div>
        <CSSTransition 
          in={isActive}
          timeout={300}
          classNames={'fade'}
          unmountOnExit
        >
        <div className="glass" style={{width:glassSize + "px", height:glassSize + "px", top:glassCoord.top,left:glassCoord.left,backgroundImage:'url('+ imgUrl +')',backgroundSize:bgSize.x +"px "+ bgSize.y + "px",backgroundPosition:glassCoord.bgLeft + " " + glassCoord.bgTop}}></div>
        </CSSTransition>
        <p className="magnifier-msg">사진 클릭 시 돋보기가 활성화 됩니다.</p>
      </div>
    </>
  )
}

Magnifier.propTypes = {
  imgUrl: PropTypes.string,
  alt: PropTypes.string,
  zoomRatio: PropTypes.number,
  mode: PropTypes.string
}

export default Magnifier;