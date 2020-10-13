import { useSelector } from 'react-redux';
import TopWrapper from './TopWrapper';
import Footer from './Footer';
import QuickMenu from './QuickMenu';
import PropTypes from 'prop-types';

const FrameLayout = ({children}) => {
  const hasMobile = useSelector(state => state.common.hasMobile);
  if(hasMobile){
    return (
      <div id="wrap">
        <TopWrapper />
        <section id="container">{children}</section>
        <div className="modal-bg"></div>
      </div> 
    )
  }
  return (
    <section id="container" className="frame-container">
      {children}
    </section>
  )
}

FrameLayout.propTypes = {
  children: PropTypes.node
}

export default FrameLayout