import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import store, { history } from './store';

import RootPage from './ui/components/RootPage';

import NavSearchFormContainer from './search/components/NavSearchFormContainer';

import TestRunsPageContainer from './testRuns/components/TestRunsPageContainer';
import TestRunsBreadcrumbContainer from './testRuns/components/TestRunsBreadcrumbContainer';

import TestRunPageContainer from './testRun/components/TestRunPageContainer';
import TestRunBreadcrumbContainer from './testRun/components/TestRunBreadcrumbContainer';

import FeaturePageContainer from './feature/components/FeaturePageContainer';
import FeatureBreadcrumbContainer from './feature/components/FeatureBreadcrumbContainer';


export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={RootPage}>
          <IndexRoute components={{ main: TestRunsPageContainer, breadcrum: TestRunsBreadcrumbContainer }} />
        </Route>
        <Route path="/test-runs/:testRunId" component={RootPage}>
          <IndexRoute components={{ main: TestRunPageContainer, breadcrum: TestRunBreadcrumbContainer, search: NavSearchFormContainer }} />
        </Route>
        <Route path="/features/:featureId" component={RootPage}>
          <IndexRoute components={{ main: FeaturePageContainer, breadcrum: FeatureBreadcrumbContainer, search: NavSearchFormContainer }} />
        </Route>
      </Router>
    </Provider>
  );
}
