import PropTypes from 'prop-types';

const RadioItem = ({children}) => {  
  return <>{children}</>
}

RadioItem.propTypes = {
  children: PropTypes.node
}

export default RadioItem