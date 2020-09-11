import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { ROUTER_PATH } from './constants/router';

// Pages(Code Splitting)
const Loading = () => (<div>Loading...</div>);
const HomePage = loadable(() => import('./pages/Home'), { fallback: <Loading /> });
const RouterPage = loadable(() => import('./pages/Router'), { fallback: <Loading /> });
const RouterDetailPage = loadable(() => import('./pages/RouterDetail'), { fallback: <Loading /> });
const UsersPage = loadable(() => import('./pages/Users'), { fallback: <Loading /> });

// Pages
// import HomePage from './pages/Home';
// import RouterPage from './pages/Router';
// import UsersPage from './pages/Users';
import AxiosPage from './pages/Axios';
import SlidePage from './pages/Slide';
import ToolTipPage from './pages/ToolTip';
import ModalPage from './pages/Modal';
import FramerMotionPage from './pages/FramerMotion';

// Components
import Header from './components/layouts/Header';

import './App.scss';

const App = () => {
  // BrowserRouter를 사용할 경우 새로고침 시 해당 내용이 사라지지 않도록 서버단에서 history 세팅이 필요하다.
  const { Home, RouterLink, RouterDetail, Users, Axios, Slide, Tooltip, Popup, FramerMotion } = ROUTER_PATH;
  return (
    <Router>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={Home} component={HomePage} />
          <Route exact path={RouterLink}>
            <RouterPage fallback={<Loading />} />
          </Route>
          <Route exact path={RouterDetail}>
            <RouterDetailPage />
          </Route>
          <Route exact path={Users} component={UsersPage} />
          <Route exact path={Axios} component={AxiosPage} />
          <Route exact path={Slide} component={SlidePage} />
          <Route exact path={Tooltip} component={ToolTipPage} />
          <Route exact path={Popup} component={ModalPage} />
          <Route exact path={FramerMotion} component={FramerMotionPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;