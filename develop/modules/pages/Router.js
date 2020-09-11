import React, { useState } from 'react';
import { useHistory, useLocation, useParams, Link } from "react-router-dom";

const Router = () => {
  const [info, setInfo] = useState(null);

  const history = useHistory();
  const location = useLocation();

  const goHome = () => {
    history.push('/');
  }
  
  const getLocation = () => {
    setInfo(location);
  }

  return (
    <div>
      <h1>Router Sample Page</h1>

      <h2>useHistory</h2>
      <button className="btn" onClick={goHome}>home</button>

      <h2>useLocation</h2>
      <div>
        <button className="btn" onClick={getLocation}>GET LOCATION</button>
        {info && (
          <ul>
            <li>pathname: {info.pathname}</li>
            <li>search: {info.search}</li>
            <li>hash: {info.hash}</li>
            <li>state: {info.state}</li>
          </ul>
        )}
      </div>

      <h2>useParams</h2>
      <Link to='/router/1'><button className="btn">상세 페이지</button></Link>

      <h2>useRouteMatch</h2>
    </div>
  )
}

export default Router;