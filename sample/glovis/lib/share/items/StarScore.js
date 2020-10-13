
import PropTypes from 'prop-types';

const StarScore = ({grade = 0, idx=0, type,  gradeChange}) => {
  const array = ["star1","star2","star3","star4","star5"];
  const clickHandle = (e, value) =>{
    if(gradeChange) gradeChange(e, idx, value);
  }
  return (
    <>
      {type === "click" ?
        <>
          {array.map((item, i) =>{
            return (
              <span key={item} className={"border-star " + ((parseInt(grade) - i) > 0 ? "full":"")} style={{cursor:'pointer'}} onClick={(e) => clickHandle(e, i+1)}>
                <span className="fill-star"></span>
              </span>
            )})
          }
          <em>{grade}.0/5.0</em>
        </>
        :
        <>
          {array.map((item, i) =>{
            return (
              <span key={item} className={"border-star " + ((parseInt(grade) - i) > 0 ? "full" : (parseInt(grade) - i === 0) && ((grade % 1) >= 0.5)?"half":"")}>
                <span className="fill-star"></span>
              </span>
            )})
          }
        </>
      }
    </>
  )
}

StarScore.propTypes = {
  grade: PropTypes.number,
  idx : PropTypes.number,
  type : PropTypes.string,
  gradeChange : PropTypes.func
}

export default React.memo(StarScore);