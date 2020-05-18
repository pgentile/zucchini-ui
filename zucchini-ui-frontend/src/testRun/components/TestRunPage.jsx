import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector } from "react-redux";
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
import FeatureStateFilterContainer from "../../filters/components/FeatureStateFilterContainer";
import TestRunHistoryTableContainer from "./TestRunHistoryTableContainer";
import TestRunFeatureTableContainer from "./TestRunFeatureTableContainer";
import FeatureGroupFilterContainer from "./FeatureGroupFilterContainer";
import DeleteTestRunButton from "./DeleteTestRunButton";
import ImportCucumberResultsDialogContainer from "./ImportCucumberResultsDialogContainer";
import EditTestRunDialogContainer from "./EditTestRunDialogContainer";
import TestRunTrendChartContainer from "./TestRunTrendChartContainer";
import Page from "../../ui/components/Page";
import TestRunBreadcrumbContainer from "./TestRunBreadcrumbContainer";
import ScenarioStats from "../../stats/components/ScenarioStats";

export default function TestRunPage({ testRunId, testRun, selectedFeatureGroup, onLoad }) {
  useEffect(() => {
    onLoad({ testRunId });
  }, [onLoad, testRunId]);

  const [showImportCucumberResultDialog, setShowImportCucumberResultDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const onEditButtonClick = () => {
    setShowEditDialog(true);
  };

  const onImportCucumberResultButtonClick = () => {
    setShowImportCucumberResultDialog(true);
  };

  const hideEditDialog = () => {
    setShowEditDialog(false);
  };

  const hideImportCucumberResultDialog = () => {
    setShowImportCucumberResultDialog(false);
  };

  const labels = testRun.labels.map((label) => {
    let value = label.value;
    if (label.url) {
      value = <a href={label.url}>{label.value}</a>;
    }

    return (
      <p key={label.name}>
        <b>{label.name} :</b> {value}
      </p>
    );
  });

  const stats = useSelector((state) => state.testRun.stats);

  return (
    <Page title={`Tir du ${toNiceDate(testRun.date)}`} breadcrumb={<TestRunBreadcrumbContainer />}>
      {labels}

      <ButtonToolbar className="mb-n2">
        <ButtonGroup className="mr-2 mb-2">
          <Button icon={faFileUpload} onClick={onImportCucumberResultButtonClick}>
            Importer un résultat de tests Cucumber
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2 mb-2">
          <Button variant="secondary" icon={faEdit} onClick={onEditButtonClick}>
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
      <ScenarioStats stats={stats} />

      <h2>Fonctionnalités</h2>
      <FeatureGroupFilterContainer testRunId={testRunId} />
      <FeatureStateFilterContainer />
      <TestRunFeatureTableContainer testRunId={testRunId} selectedFeatureGroup={selectedFeatureGroup} />

      <h2>Tendance</h2>
      <TestRunTrendChartContainer />

      <h2>Historique</h2>
      <TestRunHistoryTableContainer testRunId={testRunId} />

      <ImportCucumberResultsDialogContainer
        testRunId={testRunId}
        show={showImportCucumberResultDialog}
        onClose={hideImportCucumberResultDialog}
      />

      <EditTestRunDialogContainer testRun={testRun} show={showEditDialog} onClose={hideEditDialog} />
    </Page>
  );
}

TestRunPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  selectedFeatureGroup: PropTypes.string,
  testRun: PropTypes.object,
  onLoad: PropTypes.func.isRequired
};
