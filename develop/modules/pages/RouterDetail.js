import React from 'react';
import { useParams } from 'react-router-dom';

const RouterDetail = () => {

  const { id } = useParams();

  return (
    <div>
      <h1>Router Detail Page {id}</h1>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam accusantium hic, veritatis optio non ut repudiandae quam natus? Dolore hic beatae maiores inventore sit iste neque tempore porro alias doloribus?</p>
    </div>
  )
}

export default RouterDetail;