import React, { memo, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import toNiceDate from "../../ui/toNiceDate";
import { useParams } from "react-router-dom";
import ReportsTableContainer from "./ReportsTableContainer";
import Page from "../../ui/components/Page";
import ReportsBreadcrumbContainer from "./ReportsBreadcrumbContainer";
import { loadTestRunReportsPage } from "../redux";

function ReportsPage() {
  const { testRunId } = useParams();
  const testRun = useSelector((state) => state.testRun.testRun);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTestRunReportsPage({ testRunId }));
  }, [dispatch, testRunId]);

  return (
    <Page
      title={
        <Fragment>
          Bilan <small className="text-muted">{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </Fragment>
      }
      breadcrumb={<ReportsBreadcrumbContainer />}
    >
      <ReportsTableContainer />
    </Page>
  );
}

export default memo(ReportsPage);
