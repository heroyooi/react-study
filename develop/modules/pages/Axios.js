import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './Axios.scss';

const Axios = () => {
  const [number, setNumber] = useState(0);
  const [id, setId] = useState('');
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  useEffect(() => {
    if (Number(id) !== 0) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      setPost({});
    }
  }, [id]);

  const handleChange = (e) => {
    setNumber(e.target.value);
  }
  const handleClick = (e) => {
    setId(number);
  }

  return (
    <div className="axios-wrap">
      <div className="search-area">
        <p>No: <input type="number" value={number} onChange={handleChange} />
        <button onClick={handleClick}>검색</button></p>
        {!_.isEmpty(post) && (<p className="result">POST: {post.title}</p>)}
      </div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Axios;