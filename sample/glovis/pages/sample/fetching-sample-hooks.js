import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';

const FetchingData = ({shows}) => {
  useEffect(() => {
    console.log('ddd');
    console.log(shows);
  }, []);

  if (isEmpty(shows)) {
    return null;
  }

  return (
    <ul>
      {shows.map((item, index) => {
        return <li key={index}>{item.name}</li>;
      })}
    </ul>
  )
}

FetchingData.getInitialProps = async function() {
  const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman');

  console.info(res.data);

  return {
    shows: res.data.map((entry) => {
      return entry.show;
    })
  };
};

FetchingData.propTypes = {
  shows: PropTypes.array
};

export default FetchingData;
