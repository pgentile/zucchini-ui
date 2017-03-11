import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import store, { history } from './store';

import RootPage from './ui/components/RootPage';

import TestRunsPageContainer from './testRuns/components/TestRunsPageContainer';
import TestRunsBreadcrumContainer from './testRuns/components/TestRunsBreadcrumContainer';

import TestRunPageContainer from './testRun/components/TestRunPageContainer';


export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={RootPage}>
          <IndexRoute components={{ main: TestRunsPageContainer, breadcrum: TestRunsBreadcrumContainer }} />
        </Route>
        <Route path="/test-runs/:testRunId" component={RootPage}>
          <IndexRoute components={{ main: TestRunPageContainer, breadcrum: null }} />
        </Route>
      </Router>
    </Provider>
  );
}
