import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { isEmpty } from 'lodash';

class FetchingData extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('ddd');
    console.log(this.props.shows);
  }

  render() {
    if (isEmpty(this.props.shows)) {
      return null;
    }

    return (
      <ul>
        {this.props.shows.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    );
  }
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
