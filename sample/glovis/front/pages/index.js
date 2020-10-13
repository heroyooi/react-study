import React, { useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
const Index = () => {
  useEffect(() => {
    Router.push('/main');
  }, []);
  return <p>Hello, Glovis</p>;
}
Index.getInitialProps = async (http) => {
  const { res, query } = http;
  if (res) {
    res.redirect('/main');
  }

  return { query };
};
export default Index;
