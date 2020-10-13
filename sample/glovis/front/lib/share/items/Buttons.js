import PropTypes from 'prop-types'

const Buttons = ({children, align, marginTop, marginBottom, className}) => {
  let btnClass = align !== undefined ? `step-btn ${align}` : `step-btn`;
  btnClass = className !== undefined ? `${btnClass} ${className}` : btnClass;
  
  return (
    <div className={btnClass} style={{marginTop, marginBottom}}>{children}</div>
  )
}

Buttons.propTypes = {
  children: PropTypes.node,
  align: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  className: PropTypes.string,
}

export default Buttons