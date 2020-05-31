import React, { memo, Fragment, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { faFlag, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../ui/components/Button";
import TagList from "../../ui/components/TagList";
import Status from "../../ui/components/Status";
import HistoryFilter from "../../filters/components/HistoryFilter";
import ScenarioPresenceIndicator from "./ScenarioPresenceIndicator";
import ScenarioHistoryTable from "./ScenarioHistoryTable";
import SameFeatureScenarioTableContainer from "./SameFeatureScenarioTableContainer";
import UpdateScenarioStateDialog from "./UpdateScenarioStateDialog";
import CommentList from "./CommentList";
import ScenarioDetails from "./ScenarioDetails";
import AddCommentForm from "./AddCommentForm";
import DeleteScenarioButton from "./DeleteScenarioButton";
import UpdateScenarioReviewedStateDialog from "./UpdateScenarioReviewedStateDialog";
import SimilarFailureScenarioTableContainer from "./SimilarFailureScenarioTableContainer";
import ScenarioChangeTable from "./ScenarioChangeTable";
import Page from "../../ui/components/Page";
import ScenarioBreadcrumbContainer from "./ScenarioBreadcrumbContainer";
import { setNonReviewedStateThenReload, loadScenarioPage } from "../redux";

function ScenarioPage() {
  const [showUpdateStateDialog, setShowUpdateStateDialog] = useState(false);
  const [showSetReviewedStateDialog, setShowSetReviewedStateDialog] = useState(false);

  const scenario = useSelector((state) => state.scenario.scenario);
  const { reviewed } = scenario;

  const dispatch = useDispatch();

  const handleUpdateStateClick = () => {
    setShowUpdateStateDialog(true);
  };

  const handleCloseUpdateStateDialog = () => {
    setShowUpdateStateDialog(false);
  };

  const handleUpdateReviewedStateClick = () => {
    if (reviewed) {
      dispatch(setNonReviewedStateThenReload({ scenarioId }));
    } else {
      setShowSetReviewedStateDialog(true);
    }
  };

  const handleCloseSetReviewedStateDialog = () => {
    setShowSetReviewedStateDialog(false);
  };

  const { scenarioId } = useParams();

  useEffect(() => {
    dispatch(loadScenarioPage({ scenarioId }));
  }, [dispatch, scenarioId]);

  const handleCommentAdded = useCallback(({ newCommentId }) => {
    const newCommentElem = document.getElementById(`comment-${newCommentId}`);
    newCommentElem?.focus();
  }, []);

  return (
    <Page
      title={
        <Fragment>
          <b>{scenario.info.keyword}</b> {scenario.info.name} {scenario.status && <Status status={scenario.status} />}
        </Fragment>
      }
      breadcrumb={<ScenarioBreadcrumbContainer />}
    >
      {scenario.allTags.length > 0 && (
        <>
          <p>
            <b>Tags :</b> <TagList testRunId={scenario.testRunId} tags={scenario.allTags} />
          </p>
          <hr />
        </>
      )}

      <ButtonToolbar>
        <ButtonGroup className="mr-2">
          <Button icon={faFlag} onClick={handleUpdateStateClick}>
            Modifier le statut&hellip;
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2">
          <Button icon={reviewed ? faEyeSlash : faEye} onClick={handleUpdateReviewedStateClick}>
            {reviewed ? "Marquer comme non analysé" : "Marquer comme analysé"}
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <DeleteScenarioButton />
        </ButtonGroup>
      </ButtonToolbar>

      <hr />

      <ScenarioPresenceIndicator />

      <h2>Étapes du scénario</h2>
      <ScenarioDetails />

      <hr />

      <h2>Commentaires</h2>
      <CommentList />

      <h4>Ajouter un nouveau commentaire</h4>
      <AddCommentForm onCommentAdded={handleCommentAdded} />

      <hr />

      <Tabs defaultActiveKey="history" id="tabs">
        <Tab eventKey="history" title="Historique" className="mt-2">
          <HistoryFilter />
          <ScenarioHistoryTable />
        </Tab>
        <Tab eventKey="changes" title="Changements" className="mt-2">
          <ScenarioChangeTable />
        </Tab>
        <Tab eventKey="same-feature" title="Scénarios de la même fonctionnalité" className="mt-2">
          <SameFeatureScenarioTableContainer />
        </Tab>
        <Tab
          eventKey="similar-errors"
          title="Erreurs similaires"
          className="mt-2"
          disabled={scenario.status !== "FAILED"}
        >
          {scenario.status === "FAILED" && <SimilarFailureScenarioTableContainer />}
        </Tab>
      </Tabs>

      <UpdateScenarioStateDialog show={showUpdateStateDialog} onClose={handleCloseUpdateStateDialog} />

      <UpdateScenarioReviewedStateDialog
        show={showSetReviewedStateDialog}
        onClose={handleCloseSetReviewedStateDialog}
      />
    </Page>
  );
}

export default memo(ScenarioPage);
