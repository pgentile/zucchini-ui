import React, { memo } from "react";
import { useParams } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";
import HistoryFilter from "../../filters/components/HistoryFilter";
import TestRunSelectorTable from "./TestRunSelectorTable";
import Page from "../../ui/components/Page";
import TestRunDiffBreadcrumbContainer from "./TestRunDiffBreadcrumbContainer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTestRunDiffSelectorPage } from "../redux";

function TestRunDiffSelectorPage() {
  const { testRunId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTestRunDiffSelectorPage({ testRunId }));
  }, [dispatch, testRunId]);

  const testRun = useSelector((state) => state.testRun.testRun);

  return (
    <Page
      title={`Comparaison contre le tir du ${toNiceDate(testRun.date)}`}
      breadcrumb={<TestRunDiffBreadcrumbContainer />}
    >
      <h2>Sélectionner un autre tir</h2>
      <HistoryFilter />
      <TestRunSelectorTable currentTestRunId={testRunId} />
    </Page>
  );
}

export default memo(TestRunDiffSelectorPage);
