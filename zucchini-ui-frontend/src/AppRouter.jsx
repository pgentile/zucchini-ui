import React, { Fragment as StrictMode, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";

import RootPage from "./ui/components/RootPage";
import NotFoundPage from "./notFound/components/NotFoundPage";
import ScrollToTop from "./ui/components/ScrollToTop";

const TestRunsPageContainer = lazy(() => import("./testRuns/components/TestRunsPageContainer"));
const TestRunPageContainer = lazy(() => import("./testRun/components/TestRunPageContainer"));
const FeaturePageContainer = lazy(() => import("./feature/components/FeaturePageContainer"));
const TestRunSearchPageContainer = lazy(() => import("./search/components/TestRunSearchPageContainer"));
const ScenarioPageContainer = lazy(() => import("./scenario/components/ScenarioPageContainer"));
const TagsPageContainer = lazy(() => import("./tags/components/TagsPageContainer"));
const TagDetailsPageContainer = lazy(() => import("./tagDetails/components/TagDetailsPageContainer"));
const TestRunDiffPageContainer = lazy(() => import("./testRunDiff/components/TestRunDiffPageContainer"));
const FailuresPageContainer = lazy(() => import("./failures/components/FailuresPageContainer"));
const ReportsPageContainer = lazy(() => import("./reports/components/ReportsPageContainer"));
const StepDefinitionsPageContainer = lazy(() => import("./stepDefinitions/components/StepDefinitionsPageContainer"));

export default function AppRouter() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/ui">
          <RootPage>
            <ScrollToTop />
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
          </RootPage>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
