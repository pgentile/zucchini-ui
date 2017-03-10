// Basic requirements
import 'babel-polyfill';
import 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';


function Hello() {
  return (
    <div>Hello!</div>
  );
}


ReactDOM.render(
  Hello(),
  document.getElementById('content'),
);
