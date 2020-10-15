import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import TagFilterForm from "./TagFilterForm";
import TagsTable from "./TagsTable";
import toNiceDate from "../../ui/toNiceDate";
import Page from "../../ui/components/Page";
import TagsBreadcrumbContainer from "./TagsBreadcrumbContainer";
import { loadTestRunTagsPage } from "../redux";

export default function TagsPage() {
  const { testRunId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTestRunTagsPage({ testRunId }));
  }, [dispatch, testRunId]);

  const testRun = useSelector((state) => state.testRun.testRun);

  return (
    <Page
      title={
        <>
          Tous les tags <small className="text-muted">{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </>
      }
      breadcrumb={<TagsBreadcrumbContainer />}
    >
      <TagFilterForm />
      <TagsTable />
    </Page>
  );
}
