import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import NumberBaseball from './NumberBaseballClass';

const Hot = hot(NumberBaseball);

ReactDOM.render(<Hot />, document.querySelector('#root'));