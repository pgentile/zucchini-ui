import React, { Fragment, useState, useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { faPlusCircle, faRecycle } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";
import TestRunsTable from "./TestRunsTable";
import TestRunTypeFilter from "./TestRunTypeFilter";
import Page from "../../ui/components/Page";
import TestRunsBreadcrumb from "./TestRunsBreadcrumb";
import LoadingIndicatorTrigger from "../../loadingIndicator/components/LoadingIndicatorTrigger";
import useQueryParams from "../../useQueryParams";
import { loadTestRunsPage } from "../redux";

const CreateTestRunDialog = lazy(() => import("./CreateTestRunDialog"));
const PurgeDialog = lazy(() => import("./PurgeDialog"));

export default function TestRunsPage() {
  const dispatch = useDispatch();
  const { type: selectedType } = useQueryParams();

  const [dialogsLoaded, setDialogsLoaded] = useState(false);
  const [showCreateTestRunDialog, setShowCreateTestRunDialog] = useState(false);
  const [showPurgeDialog, setShowPurgeDialog] = useState(false);

  useEffect(() => {
    dispatch(loadTestRunsPage());
  }, [dispatch]);

  const onCreateTestRunButtonClick = () => {
    setDialogsLoaded(true);
    setShowCreateTestRunDialog(true);
  };

  const onPurgeButtonClick = () => {
    setDialogsLoaded(true);
    setShowPurgeDialog(true);
  };

  const hideCreateTestRunDialog = () => {
    setShowCreateTestRunDialog(false);
  };

  const hidePurgeDialog = () => {
    setShowPurgeDialog(false);
  };

  return (
    <Page
      title={
        <Fragment>Derniers tirs {selectedType && <small className="text-muted">Type {selectedType}</small>}</Fragment>
      }
      breadcrumb={<TestRunsBreadcrumb />}
    >
      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button icon={faPlusCircle} onClick={onCreateTestRunButtonClick}>
            Créer un tir
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary" icon={faRecycle} onClick={onPurgeButtonClick}>
            Purger les anciens tirs
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <hr />
      <TestRunTypeFilter />

      <TestRunsTable selectedType={selectedType} />

      {dialogsLoaded && (
        <Suspense fallback={<LoadingIndicatorTrigger />}>
          <CreateTestRunDialog
            key={`create-dialog-${selectedType}`}
            show={showCreateTestRunDialog}
            currentSelectedType={selectedType}
            onClose={hideCreateTestRunDialog}
          />
          <PurgeDialog
            key={`purge-dialog-${selectedType}`}
            show={showPurgeDialog}
            currentSelectedType={selectedType}
            onClose={hidePurgeDialog}
          />
        </Suspense>
      )}
    </Page>
  );
}
