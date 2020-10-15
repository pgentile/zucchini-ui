import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { faPlusCircle, faRecycle } from "@fortawesome/free-solid-svg-icons";

import Button from "../../ui/components/Button";
import TestRunsTable from "./TestRunsTable";
import TestRunTypeFilter from "./TestRunTypeFilter";
import CreateTestRunDialog from "./CreateTestRunDialog";
import PurgeDialog from "./PurgeDialog";
import Page from "../../ui/components/Page";
import TestRunsBreadcrumb from "./TestRunsBreadcrumb";
import useQueryParams from "../../useQueryParams";
import { loadTestRunsPage } from "../redux";

export default function TestRunsPage() {
  const dispatch = useDispatch();
  const { type: selectedType } = useQueryParams();

  const [showCreateTestRunDialog, setShowCreateTestRunDialog] = useState(false);
  const [showPurgeDialog, setShowPurgeDialog] = useState(false);

  useEffect(() => {
    dispatch(loadTestRunsPage());
  }, [dispatch]);

  const onCreateTestRunButtonClick = (event) => {
    event.preventDefault();
    setShowCreateTestRunDialog(true);
  };

  const onPurgeButtonClick = () => {
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
    </Page>
  );
}
