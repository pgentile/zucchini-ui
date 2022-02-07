import { Fragment as StrictMode, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
const ScenarioPage = lazy(() => import("./scenario/components/ScenarioPage"));
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
                <Routes>
                  <Route path="/" element={<TestRunsPage />} />
                  <Route path="/test-runs/:testRunId" element={<TestRunPage />} />
                  <Route path="/test-runs/:testRunId/search" element={<TestRunSearchPage />} />
                  <Route path="/test-runs/:testRunId/tags" element={<TagsPage />} />
                  <Route path="/test-runs/:testRunId/failures" element={<FailuresPage />} />
                  <Route path="/test-runs/:testRunId/reports" element={<ReportsPage />} />
                  <Route path="/test-runs/:testRunId/tag-details" element={<TagDetailsPage />} />
                  <Route path="/test-runs/:testRunId/diff" element={<TestRunDiffPage />} />
                  <Route path="/test-runs/:testRunId/stepDefinitions" element={<StepDefinitionsPage />} />
                  <Route path="/features/:featureId" element={<FeaturePage />} />
                  <Route path="/scenarios/:scenarioId" element={<ScenarioPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </RootPage>
          </BrowserRouter>
        </Provider>
      </StrictMode>
    </ErrorBarrier>
  );
}
