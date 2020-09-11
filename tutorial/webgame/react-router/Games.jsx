import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';

import GameMatcher from './GameMatcher';

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        {/* <Route path="/game/:name" component={GameMatcher} /> */}

        {/* props를 전달하는 방법 */}
        {/* <Route path="/game/:name" component={() => <GameMatcher props="12345" />} /> */}
        <Switch>
          <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Games;