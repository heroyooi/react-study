import React from 'react';
import useReactRouter from 'use-react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Detail = () => {
  const { match } = useReactRouter();

  return (
    <Card>
      <CardContent>
        {match.params.textID}
      </CardContent>
    </Card>
  )
};

export default Detail;