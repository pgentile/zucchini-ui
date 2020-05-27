import React, { memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import Page from "../../ui/components/Page";
import TestRunDiffBreadcrumbContainer from "./TestRunDiffBreadcrumbContainer";
import Button from "../../ui/components/Button";
import useQueryParams from "../../useQueryParams";
import { loadTestRunDiffResultPage } from "../redux";
import UnknownScenarioTable from "./UnknownScenarioTable";
import DifferentScenarioTable from "./DifferentScenarioTable";

function TestRunDiffResultPage() {
  const { testRunId } = useParams();
  const { otherTestRunId } = useQueryParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadTestRunDiffResultPage({
        testRunId,
        otherTestRunId
      })
    );
  }, [dispatch, testRunId, otherTestRunId]);

  const testRun = useSelector((state) => state.testRun.testRun);
  const otherTestRun = useSelector((state) => state.testRunDiff.otherTestRun);
  const { newScenarii, deletedScenarii, differentScenarii } = useSelector((state) => state.testRunDiff.diff);

  return (
    <Page
      title={`Comparaison contre le tir du ${toNiceDate(testRun.date)}`}
      breadcrumb={<TestRunDiffBreadcrumbContainer />}
      mainline={
        <p>
          Comparaison entre les tirs du <Link to={`/test-runs/${testRun.id}`}>{toNiceDate(testRun.date)}</Link> et du{" "}
          <Link to={`/test-runs/${otherTestRun.id}`}>{toNiceDate(otherTestRun.date)}</Link>
          <Button
            icon={faExchangeAlt}
            variant="outline-secondary"
            size="sm"
            className="ml-3"
            as={Link}
            to={{
              pathname: `/test-runs/${otherTestRun.id}/diff`,
              search: queryString.stringify({
                otherTestRunId: testRun.id
              })
            }}
            replace
          >
            Inverser
          </Button>
        </p>
      }
    >
      <h2>Différences constatées</h2>

      <h3>Scénarios ajoutés</h3>
      <UnknownScenarioTable scenarios={newScenarii} />

      <h3>Scénarios supprimés</h3>
      <UnknownScenarioTable scenarios={deletedScenarii} />

      <h3>Scénarios dont le statut a changé</h3>
      <DifferentScenarioTable differentScenarios={differentScenarii} />
    </Page>
  );
}

export default memo(TestRunDiffResultPage);
