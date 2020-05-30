import PropTypes from "prop-types";
import React, { Fragment } from "react";
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
import UpdateScenarioStateDialogContainer from "./UpdateScenarioStateDialogContainer";
import CommentList from "./CommentList";
import ScenarioDetailsContainer from "./ScenarioDetailsContainer";
import AddCommentForm from "./AddCommentForm";
import DeleteScenarioButton from "./DeleteScenarioButton";
import UpdateScenarioReviewedStateDialogContainer from "./UpdateScenarioReviewedStateDialogContainer";
import SimilarFailureScenarioTableContainer from "./SimilarFailureScenarioTableContainer";
import ScenarioChangeTable from "./ScenarioChangeTable";
import Page from "../../ui/components/Page";
import ScenarioBreadcrumbContainer from "./ScenarioBreadcrumbContainer";

export default class ScenarioPage extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    onSetNonReviewedState: PropTypes.func.isRequired,
    scenarioId: PropTypes.string.isRequired,
    scenario: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      showUpdateStateDialog: false,
      showSetReviewedStateDialog: false
    };
  }

  componentDidMount() {
    this.loadScenarioIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadScenarioIfNeeded(prevProps);
  }

  onUpdateReviewedStateClick = () => {
    const { scenarioId, scenario, onSetNonReviewedState } = this.props;
    const { reviewed } = scenario;

    if (reviewed) {
      onSetNonReviewedState({ scenarioId });
    } else {
      this.setState({
        showSetReviewedStateDialog: true
      });
    }
  };

  onUpdateStateClick = () => {
    this.showUpdateStateDialog();
  };

  hideSetReviewedStateDialog = () => {
    this.setState({
      showSetReviewedStateDialog: false
    });
  };

  hideUpdateStateDialog = () => {
    this.setState({
      showUpdateStateDialog: false
    });
  };

  loadScenarioIfNeeded(prevProps = {}) {
    const { scenarioId, onLoad } = this.props;
    if (scenarioId !== prevProps.scenarioId) {
      onLoad({ scenarioId });
    }
  }

  showUpdateStateDialog = () => {
    this.setState({
      showUpdateStateDialog: true
    });
  };

  render() {
    const { scenario, scenarioId } = this.props;
    const { featureId, reviewed } = scenario;

    let similarFailureSection = null;
    if (scenario.status === "FAILED") {
      similarFailureSection = <SimilarFailureScenarioTableContainer />;
    }

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
            <Button icon={faFlag} onClick={this.onUpdateStateClick}>
              Modifier le statut&hellip;
            </Button>
          </ButtonGroup>
          <ButtonGroup className="mr-2">
            <Button icon={reviewed ? faEyeSlash : faEye} onClick={this.onUpdateReviewedStateClick}>
              {reviewed ? "Marquer comme non analysé" : "Marquer comme analysé"}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DeleteScenarioButton featureId={featureId} scenarioId={scenarioId} />
          </ButtonGroup>
        </ButtonToolbar>

        <hr />

        <ScenarioPresenceIndicator scenarioId={scenarioId} />

        <h2>Étapes du scénario</h2>
        <ScenarioDetailsContainer />

        <hr />

        <h2>Commentaires</h2>
        <CommentList />

        <h4>Ajouter un nouveau commentaire</h4>
        <AddCommentForm scenarioId={scenarioId} key={scenarioId} />

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
            <SameFeatureScenarioTableContainer scenarioId={scenarioId} />
          </Tab>
          <Tab
            eventKey="similar-errors"
            title="Erreurs similaires"
            className="mt-2"
            disabled={similarFailureSection === null}
          >
            {similarFailureSection}
          </Tab>
        </Tabs>

        <UpdateScenarioStateDialogContainer
          show={this.state.showUpdateStateDialog}
          onClose={this.hideUpdateStateDialog}
        />

        <UpdateScenarioReviewedStateDialogContainer
          scenarioId={scenarioId}
          show={this.state.showSetReviewedStateDialog}
          onClose={this.hideSetReviewedStateDialog}
        />
      </Page>
    );
  }
}
