import Header from './Header';
import Footer from './Footer';
import QuickMenu from './QuickMenu';
import PropTypes from 'prop-types';

const AppLayoutTemp = ({ children }) => {
  return (
    <div id="wrap">
      <Header />
      <section id="container">{children}</section>
      <QuickMenu />
      <Footer />
    </div>
  );
};

AppLayoutTemp.propTypes = {
  children: PropTypes.node
};

export default AppLayoutTemp;
