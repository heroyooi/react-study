import {useState, useMemo, useCallback, memo} from 'react'
import Draggable from 'react-draggable'
import classNames from "classnames/bind"

const Marker = memo(({ratioX, item, markerNum, lastMod, onChange}) => {
  const [clickX, setClickX ] = useState(0);
  const [hoverCheck, setHoverCheck] = useState(false);
  const [isOpenlayer, setIsOpenLayer] = useState(false);

  const pos = useMemo(() =>
    ({x : ratioX * item.time, y:0})
  , [ item, ratioX ])

  const parsedTime = useMemo(()=>{
    const { time } = item
    console.log("parsedTime -> time", time)

    return `${`${Math.floor(time/60)}`.padStart(2,'0')}:${`${(time%60)}`.padStart(2,'0')}`
  },[item])

  const handleDrag = (e,position) => {
    const { x } = position;
    console.log("handleDrag -> x ", x )
    onChange(e, markerNum, {
      ...item,
      time : Math.floor(x / ratioX)
    })
  }

  const onMouseDown = (e) => {
    setClickX(e.clientX)
  }

  const handleStop = (e,position) => {
    const { clientX, target } = e
    
    if(clientX - clickX === 0 && target.classList.contains('t-marker')){
      setIsOpenLayer(!isOpenlayer)
    } else {
      setClickX(0)
    }
    const { x } = position;
    onChange(e, markerNum, {
      ...item,
      time : Math.floor(x / ratioX)
    })
  };

  const timeBack = (e) => {
    let { time } = item
    if(time > 0){
      onChange(e, markerNum,  {
        ...item,
        time : time - 1
      })
    }
  }

  const timeFoword = (e) => {
    let { time } = item
    if(time < 1439){
      onChange(e, markerNum,  {
        ...item,
        time : time + 1
      })
    }
  }

  return (
    <Draggable
      bounds="parent"
      axis="x"
      position={pos}
      onDrag={handleDrag}
      onStop={handleStop}
      onMouseDown={onMouseDown}
    >
      <div className={classNames('t-marker', {
        'lastMod' : lastMod,
        'on' : hoverCheck,
        'active' : isOpenlayer
      })}  onMouseEnter={e =>setHoverCheck(true)} onMouseLeave={e =>setHoverCheck(false)}
      >
        {isOpenlayer &&
          <div className="t-marker-layer">
            <button type="button" className="time-back" onClick={timeBack}><span className="arrow">이전 분 이동</span></button>
            <span className="time-value">{parsedTime}</span>
            <button type="button" className="time-foword" onClick={timeFoword}><span className="arrow">다음 분 이동</span></button>
          </div>
        }
      </div>
    </Draggable>
  )
})

export default Marker;