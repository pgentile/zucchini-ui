// Basic requirements
import 'babel-polyfill';
import 'jquery';

import ReactDOM from 'react-dom';

import AppRouter from './AppRouter';


ReactDOM.render(
  AppRouter(),
  document.getElementById('content'),
);
