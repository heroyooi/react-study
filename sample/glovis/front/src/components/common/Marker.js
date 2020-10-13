import {useState, useCallback, memo} from 'react'
import Draggable from 'react-draggable'
import classNames from "classnames/bind"
import { SET_CALLBACK, SET_LYOPEN } from "@src/actions/timePickerAction";

const Marker = memo(({ratioX, time, markerNum, lastMod, lyOpen, dispatch}) => {
  const [activeDrags, setActiveDrags] = useState(0);
  const [clickState, setClickState] = useState(true);
  const [hoverCheck, setHoverCheck] = useState(false);
  
  const timeCalc = useCallback((tempTime) =>{
    let tempHour = 0,
        tempMinute = 0;
    
    tempHour = Math.floor(tempTime/60);
    tempMinute = tempTime - tempHour * 60;
    if(tempHour < 10){
      tempHour = "0"+tempHour;
    }
    if(tempMinute < 10){
      tempMinute = "0"+ tempMinute;
    }
    return tempHour + ":" + tempMinute;
  },[])

  let controlledPosition = {x : time * ratioX, y : 0};

  const timeSetter = (tempTime) =>{
    dispatch({ type: SET_CALLBACK, markerNum: markerNum, callbackTime: tempTime });
  }
  
  const handleStart = useCallback((e,position) => {
    if(e.target.tagName === "BUTTON" || e.target.tagName === "SPAN"){
      return false;
    }
    setActiveDrags(activeDrags+1);
  },[activeDrags]);

  const handleDrag = useCallback((e,position) => {
    const {x} = position;
    timeSetter(Math.floor(x / ratioX));
    setClickState(false)
  },[controlledPosition]);

  const handleStop = useCallback((e,position) => {
    if(clickState){
      dispatch({ type: SET_LYOPEN, markerNum: markerNum});
    }
    const {x} = position;
    timeSetter(Math.floor(x / ratioX));
    setClickState(true)
    setActiveDrags(activeDrags-1);
  },[activeDrags, clickState, controlledPosition]);

  const timeBack = useCallback(() =>{
    if(time === 0){return false}
    timeSetter(time -1)
  },[controlledPosition])

  const timeFoword = useCallback(() =>{
    if(time === 1440){return false}
    timeSetter(time +1)
  },[controlledPosition])

  const handleMouseEnter = useCallback(() =>{
    setHoverCheck(true);
  },[])

  const handleMouseLeave = useCallback(() =>{
    setHoverCheck(false);
  },[])

  const markerStyle = classNames(
    't-marker',
    {'lastMod' : lastMod},
    {'on' : hoverCheck},
    {'active' : lyOpen}
  )

  return (
    <Draggable bounds="parent" axis="x" position={controlledPosition} onStart={handleStart} onDrag={handleDrag} onStop={handleStop} >
      <div className={markerStyle}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {lyOpen &&
          <div className="t-marker-layer">
            <button type="button" className="time-back" onClick={timeBack}><span className="arrow">이전 분 이동</span></button>
            <span className="time-value">{timeCalc(time)}</span>
            <button type="button" className="time-foword" onClick={timeFoword}><span className="arrow">다음 분 이동</span></button>
          </div>
        }
      </div>
    </Draggable>
  )
})

export default Marker;