import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";
import StepDefinitionsTable from "./StepDefinitionsTable";
import Page from "../../ui/components/Page";
import StepDefinitionsBreadcrumbContainer from "./StepDefinitionsBreadcrumbContainer";
import { loadTestRunStepDefinitionsPage } from "../redux";

export default function StepDefinitionsPage() {
  const dispatch = useDispatch();
  const { testRunId } = useRouteMatch().params;
  const testRun = useSelector((state) => state.testRun.testRun);

  useEffect(() => {
    dispatch(loadTestRunStepDefinitionsPage({ testRunId }));
  }, [dispatch, testRunId]);

  return (
    <Page
      title={
        <Fragment>
          Glues <small className="text-muted">{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </Fragment>
      }
      breadcrumb={<StepDefinitionsBreadcrumbContainer />}
    >
      <StepDefinitionsTable />
    </Page>
  );
}
