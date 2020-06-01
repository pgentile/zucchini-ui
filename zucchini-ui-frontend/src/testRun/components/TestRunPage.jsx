import React, { useEffect, useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  faFileUpload,
  faEdit,
  faSearch,
  faTags,
  faExclamationCircle,
  faBook,
  faListAlt,
  faNotEqual
} from "@fortawesome/free-solid-svg-icons";

import toNiceDate from "../../ui/toNiceDate";
import Button from "../../ui/components/Button";
import ButtonLink from "../../ui/components/ButtonLink";
import FeatureStateFilter from "../../filters/components/FeatureStateFilter";
import TestRunHistoryTable from "./TestRunHistoryTable";
import TestRunFeatureTableContainer from "./TestRunFeatureTableContainer";
import FeatureGroupFilter from "./FeatureGroupFilter";
import DeleteTestRunButton from "./DeleteTestRunButton";
import ImportCucumberResultsDialog from "./ImportCucumberResultsDialog";
import EditTestRunDialog from "./EditTestRunDialog";
import TestRunTrendChartContainer from "./TestRunTrendChartContainer";
import Page from "../../ui/components/Page";
import TestRunBreadcrumbContainer from "./TestRunBreadcrumbContainer";
import { loadTestRunPage } from "../redux";
import TestRunStats from "./TestRunStats";

export default function TestRunPage() {
  const { testRunId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTestRunPage({ testRunId }));
  }, [dispatch, testRunId]);

  const testRun = useSelector((state) => state.testRun.testRun);

  const [showImportCucumberResultDialog, setShowImportCucumberResultDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditButtonClick = () => {
    setShowEditDialog(true);
  };

  const handleImportCucumberResultButtonClick = () => {
    setShowImportCucumberResultDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
  };

  const handleCloseImportCucumberResultDialog = () => {
    setShowImportCucumberResultDialog(false);
  };

  const labelItems = testRun.labels.map((label, index) => {
    let value = label.value;
    if (label.url) {
      value = <a href={label.url}>{label.value}</a>;
    }

    return (
      <li key={index} className="list-inline-item">
        <b>{label.name} :</b> {value}
      </li>
    );
  });

  const labels = labelItems.length > 0 && (
    <ul className="list-inline" data-testid="labels">
      {labelItems}
    </ul>
  );

  return (
    <Page title={`Tir du ${toNiceDate(testRun.date)}`} breadcrumb={<TestRunBreadcrumbContainer />} mainline={labels}>
      <ButtonToolbar className="mb-n2">
        <ButtonGroup className="mr-2 mb-2">
          <Button icon={faFileUpload} onClick={handleImportCucumberResultButtonClick}>
            Importer un résultat de tests Cucumber
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <Button variant="secondary" icon={faEdit} onClick={handleEditButtonClick}>
            Modifier
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faSearch} to={`/test-runs/${testRunId}/search`}>
            Rechercher
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faTags} to={`/test-runs/${testRunId}/tags`}>
            Tags
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faExclamationCircle} to={`/test-runs/${testRunId}/failures`}>
            Échecs
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faBook} to={`/test-runs/${testRunId}/stepDefinitions`}>
            Glues
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faListAlt} to={`/test-runs/${testRunId}/reports`}>
            Bilan
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <ButtonLink variant="secondary" icon={faNotEqual} to={`/test-runs/${testRunId}/diff`}>
            Comparer avec un autre tir
          </ButtonLink>
        </ButtonGroup>
        <ButtonGroup className="mb-2">
          <DeleteTestRunButton testRunId={testRunId} />
        </ButtonGroup>
      </ButtonToolbar>

      <hr />

      <h2>Statistiques</h2>
      <TestRunStats />

      <h2>Fonctionnalités</h2>
      <FeatureGroupFilter />
      <FeatureStateFilter />
      <TestRunFeatureTableContainer />

      <h2>Tendance</h2>
      <TestRunTrendChartContainer />

      <h2>Historique</h2>
      <TestRunHistoryTable />

      <ImportCucumberResultsDialog
        show={showImportCucumberResultDialog}
        onClose={handleCloseImportCucumberResultDialog}
      />

      <EditTestRunDialog show={showEditDialog} onClose={handleCloseEditDialog} />
    </Page>
  );
}
