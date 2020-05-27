import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import toNiceDate from "../../ui/toNiceDate";
import ScenarioTable from "../../ui/components/ScenarioTable";
import Page from "../../ui/components/Page";
import TestRunSearchBreadcrumbContainer from "./TestRunSearchBreadcrumbContainer";
import SearchForm from "./SearchForm";
import useQueryParams from "../../useQueryParams";
import { loadTestRunSearchPage, search as doSearch } from "../redux";

export default function TestRunSearchPage() {
  const dispatch = useDispatch();

  const testRunId = useParams().testRunId;
  const testRun = useSelector((state) => state.testRun.testRun);

  const { search } = useQueryParams();
  const scenarios = useSelector((state) => state.searchResults.foundScenarios);

  useEffect(() => {
    dispatch(loadTestRunSearchPage({ testRunId }));
  }, [dispatch, testRunId]);

  useEffect(() => {
    if (search) {
      dispatch(doSearch({ search, testRunId }));
    }
  }, [dispatch, search, testRunId]);

  return (
    <Page
      title={"Rechercher dans le tir du " + toNiceDate(testRun.date)}
      breadcrumb={<TestRunSearchBreadcrumbContainer />}
    >
      <SearchForm />

      {search && (
        <>
          <h2>Résultats</h2>
          <ScenarioTable scenarios={scenarios} />
        </>
      )}
    </Page>
  );
}
