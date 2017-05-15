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

import TestRunSearchPageContainer from './search/components/TestRunSearchPageContainer';
import TestRunSearchBreadcrumbContainer from './search/components/TestRunSearchBreadcrumbContainer';

import ScenarioPageContainer from './scenario/components/ScenarioPageContainer';
import ScenarioBreadcrumbContainer from './scenario/components/ScenarioBreadcrumbContainer';

import TagsPageContainer from './tags/components/TagsPageContainer';
import TagsBreadcrumbContainer from './tags/components/TagsBreadcrumbContainer';

import TagDetailsPageContainer from './tagDetails/components/TagDetailsPageContainer';
import TagDetailsBreadcrumbContainer from './tagDetails/components/TagDetailsBreadcrumbContainer';

import TestRunDiffSelectorPageContainer from './testRunDiff/components/TestRunDiffSelectorPageContainer';
import TestRunDiffSelectorBreadcrumbContainer from './testRunDiff/components/TestRunDiffSelectorBreadcrumbContainer';


export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={RootPage}>
          <IndexRoute components={{ main: TestRunsPageContainer, breadcrum: TestRunsBreadcrumbContainer }} />
          <Route path="test-runs/:testRunId">
            <IndexRoute components={{ main: TestRunPageContainer, breadcrum: TestRunBreadcrumbContainer, search: NavSearchFormContainer }} />
            <Route path="search" components={{ main: TestRunSearchPageContainer, breadcrum: TestRunSearchBreadcrumbContainer }} />
            <Route path="tags" components={{ main: TagsPageContainer, breadcrum: TagsBreadcrumbContainer, search: NavSearchFormContainer }} />
            <Route path="tag-details" components={{ main: TagDetailsPageContainer, breadcrum: TagDetailsBreadcrumbContainer, search: NavSearchFormContainer }} />
            <Route path="diff" components={{ main: TestRunDiffSelectorPageContainer, breadcrum: TestRunDiffSelectorBreadcrumbContainer, search: NavSearchFormContainer }} />
          </Route>
          <Route path="features/:featureId">
            <IndexRoute components={{ main: FeaturePageContainer, breadcrum: FeatureBreadcrumbContainer, search: NavSearchFormContainer }} />
          </Route>
          <Route path="scenarios/:scenarioId">
            <IndexRoute components={{ main: ScenarioPageContainer, breadcrum: ScenarioBreadcrumbContainer, search: NavSearchFormContainer }} />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}
