import React, { Fragment as StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";

import RootPage from "./ui/components/RootPage";
import NotFoundPage from "./notFound/components/NotFoundPage";
import ScrollToTop from "./ui/components/ScrollToTop";

import TestRunsPageContainer from "./testRuns/components/TestRunsPageContainer";
import TestRunPageContainer from "./testRun/components/TestRunPageContainer";
import FeaturePageContainer from "./feature/components/FeaturePageContainer";
import TestRunSearchPageContainer from "./search/components/TestRunSearchPageContainer";
import ScenarioPageContainer from "./scenario/components/ScenarioPageContainer";
import TagsPageContainer from "./tags/components/TagsPageContainer";
import TagDetailsPageContainer from "./tagDetails/components/TagDetailsPageContainer";
import TestRunDiffPageContainer from "./testRunDiff/components/TestRunDiffPageContainer";
import FailuresPageContainer from "./failures/components/FailuresPageContainer";
import ReportsPageContainer from "./reports/components/ReportsPageContainer";
import StepDefinitionsPageContainer from "./stepDefinitions/components/StepDefinitionsPageContainer";

export default function AppRouter() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={configuration.basename}>
          <RootPage>
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={TestRunsPageContainer} />
              <Route exact path="/test-runs/:testRunId" component={TestRunPageContainer} />
              <Route exact path="/test-runs/:testRunId/search" component={TestRunSearchPageContainer} />
              <Route exact path="/test-runs/:testRunId/tags" component={TagsPageContainer} />
              <Route exact path="/test-runs/:testRunId/failures" component={FailuresPageContainer} />
              <Route exact path="/test-runs/:testRunId/reports" component={ReportsPageContainer} />
              <Route exact path="/test-runs/:testRunId/tag-details" component={TagDetailsPageContainer} />
              <Route exact path="/test-runs/:testRunId/diff" component={TestRunDiffPageContainer} />
              <Route exact path="/test-runs/:testRunId/stepDefinitions" component={StepDefinitionsPageContainer} />
              <Route exact path="/features/:featureId" component={FeaturePageContainer} />
              <Route exact path="/scenarios/:scenarioId" component={ScenarioPageContainer} />
              <Route component={NotFoundPage} />
            </Switch>
          </RootPage>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
