import { Fragment as StrictMode, lazy } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store";
import RootPage from "./ui/components/RootPage";
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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          path: "",
          element: <TestRunsPage />
        },
        {
          path: "test-runs/:testRunId",
          children: [
            {
              path: "",
              element: <TestRunPage />
            },
            {
              path: "search",
              element: <TestRunSearchPage />
            },
            {
              path: "tags",
              element: <TagsPage />
            },
            {
              path: "failures",
              element: <FailuresPage />
            },
            {
              path: "reports",
              element: <ReportsPage />
            },
            {
              path: "tag-details",
              element: <TagDetailsPage />
            },
            {
              path: "diff",
              element: <TestRunDiffPage />
            },
            {
              path: "stepDefinitions",
              element: <StepDefinitionsPage />
            }
          ]
        },
        {
          path: "features/:featureId",
          element: <FeaturePage />
        },
        {
          path: "scenarios/:scenarioId",
          element: <ScenarioPage />
        },
        {
          path: "*",
          element: <NotFoundPage />
        }
      ]
    }
  ],
  {
    basename: "/ui/"
  }
);

export default function AppRouter() {
  return (
    <ErrorBarrier className="m-4" name="App router">
      <StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StrictMode>
    </ErrorBarrier>
  );
}
