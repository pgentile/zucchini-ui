import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import store, { history } from './store';
import Hello from './Hello';
import BasePage from './ui/components/BasePage';


export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={BasePage}>
          <IndexRoute component={Hello} />
        </Route>
      </Router>
    </Provider>
  );
}
