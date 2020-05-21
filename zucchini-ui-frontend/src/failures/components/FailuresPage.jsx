import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";
import FailuresTable from "./FailuresTable";
import StatsProgressBar from "../../stats/components/StatsProgressBar";
import Page from "../../ui/components/Page";
import FailuresBreadcrumbContainer from "./FailuresBreadcrumbContainer";
import { loadTestRunFailuresPage } from "../redux";

export default function FailuresPage() {
  const dispatch = useDispatch();
  const { testRunId } = useRouteMatch().params;
  const testRun = useSelector((state) => state.testRun.testRun);
  const stats = useSelector((state) => state.testRun.stats.all);

  useEffect(() => {
    dispatch(loadTestRunFailuresPage({ testRunId }));
  }, [dispatch, testRunId]);

  return (
    <Page
      title={
        <Fragment>
          Échecs <small className="text-muted">{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </Fragment>
      }
      breadcrumb={<FailuresBreadcrumbContainer />}
    >
      <StatsProgressBar stats={stats} />
      <hr />
      <FailuresTable />
    </Page>
  );
}
