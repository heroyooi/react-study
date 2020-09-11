import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATH } from '../../constants/router';

const Header = () => {
  const { Home, RouterLink, Users, Axios, Slide, Tooltip, Popup, FramerMotion } = ROUTER_PATH;
  return (
    <div className="header">
      <nav className="gnb">
        <ul>
          <li>
            <Link to={Home}>Home</Link>
          </li>
          <li>
            <Link to={RouterLink}>Router</Link>
          </li>
          <li>
            <Link to={Users}>Users</Link>
          </li>
          <li>
            <Link to={Axios}>Axios</Link>
          </li>
          <li>
            <Link to={Slide}>slide</Link>
          </li>
          <li>
            <Link to={Tooltip}>tooltip</Link>
          </li>
          <li>
            <Link to={Popup}>popup</Link>
          </li>
          <li>
            <Link to={FramerMotion}>framer-motion</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Header;