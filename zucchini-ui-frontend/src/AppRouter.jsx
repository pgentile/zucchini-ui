import React, { Fragment as StrictMode, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import store from "./store";

import PageLoadingPlaceholder from "./loadingIndicator/components/PageLoadingPlaceholder";
import RootPage from "./ui/components/RootPage";
import ScrollToTop from "./ui/components/ScrollToTop";
import NotFoundPage from "./notFound/components/NotFoundPage";
import ErrorBarrier from "./ui/components/ErrorBarrier";

const TestRunsPage = lazy(() => import("./testRuns/components/TestRunsPage"));
const TestRunPage = lazy(() => import("./testRun/components/TestRunPage"));
const FeaturePage = lazy(() => import("./feature/components/FeaturePage"));
const TestRunSearchPage = lazy(() => import("./search/components/TestRunSearchPage"));
const ScenarioPageContainer = lazy(() => import("./scenario/components/ScenarioPageContainer"));
const TagsPage = lazy(() => import("./tags/components/TagsPage"));
const TagDetailsPage = lazy(() => import("./tagDetails/components/TagDetailsPage"));
const TestRunDiffPage = lazy(() => import("./testRunDiff/components/TestRunDiffPage"));
const FailuresPage = lazy(() => import("./failures/components/FailuresPage"));
const ReportsPage = lazy(() => import("./reports/components/ReportsPage"));
const StepDefinitionsPage = lazy(() => import("./stepDefinitions/components/StepDefinitionsPage"));

export default function AppRouter() {
  return (
    <ErrorBarrier className="m-4" name="App router">
      <StrictMode>
        <Provider store={store}>
          <BrowserRouter basename="/ui">
            <RootPage>
              <ScrollToTop />
              <Suspense fallback={<PageLoadingPlaceholder />}>
                <Switch>
                  <Route exact path="/" component={TestRunsPage} />
                  <Route exact path="/test-runs/:testRunId" component={TestRunPage} />
                  <Route exact path="/test-runs/:testRunId/search" component={TestRunSearchPage} />
                  <Route exact path="/test-runs/:testRunId/tags" component={TagsPage} />
                  <Route exact path="/test-runs/:testRunId/failures" component={FailuresPage} />
                  <Route exact path="/test-runs/:testRunId/reports" component={ReportsPage} />
                  <Route exact path="/test-runs/:testRunId/tag-details" component={TagDetailsPage} />
                  <Route exact path="/test-runs/:testRunId/diff" component={TestRunDiffPage} />
                  <Route exact path="/test-runs/:testRunId/stepDefinitions" component={StepDefinitionsPage} />
                  <Route exact path="/features/:featureId" component={FeaturePage} />
                  <Route exact path="/scenarios/:scenarioId" component={ScenarioPageContainer} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Suspense>
            </RootPage>
          </BrowserRouter>
        </Provider>
      </StrictMode>
    </ErrorBarrier>
  );
}
