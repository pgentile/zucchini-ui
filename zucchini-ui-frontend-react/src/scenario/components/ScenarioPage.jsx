import PropTypes from 'prop-types';
import React from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import TagList from '../../ui/components/TagList';
import Status from '../../ui/components/Status';
import HistoryFilterContainer from '../../filters/components/HistoryFilterContainer';
import ScenarioHistoryTableContainer from './ScenarioHistoryTableContainer';
import SameFeatureScenarioTableContainer from './SameFeatureScenarioTableContainer';
import UpdateScenarioStateDialogContainer from './UpdateScenarioStateDialogContainer';
import CommentListContainer from './CommentListContainer';
import ScenarioDetailsContainer from './ScenarioDetailsContainer';
import AddCommentFormContainer from './AddCommentFormContainer';
import DeleteScenarioButtonContainer from './DeleteScenarioButtonContainer';
import UpdateScenarioReviewedStateDialogContainer from './UpdateScenarioReviewedStateDialogContainer';
import ScenarioChangeTable from './ScenarioChangeTable';


export default class ScenarioPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUpdateStateDialog: false,
      showSetReviewedStateDialog: false,
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
        showSetReviewedStateDialog: true,
      });
    }
  };

  onUpdateStateClick = () => {
    this.showUpdateStateDialog();
  };

  hideSetReviewedStateDialog = () => {
    this.setState({
      showSetReviewedStateDialog: false,
    });
  };

  hideUpdateStateDialog = () => {
    this.setState({
      showUpdateStateDialog: false,
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
      showUpdateStateDialog: true,
    });
  };

  render() {
    const { scenario, scenarioId } = this.props;
    const { reviewed } = scenario;

    return (
      <div>
        <h1>
          <b>{scenario.info.keyword}</b> {scenario.info.name}
          {' '}
          {scenario.status && <small><Status status={scenario.status} /></small>}
        </h1>

        {scenario.allTags.length > 0 && <p><b>Tags :</b> <TagList testRunId={scenario.testRunId} tags={scenario.allTags} /></p>}

        <hr />

        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.onUpdateStateClick}>
              <Glyphicon glyph="flag" /> Modifier le statut&hellip;
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={this.onUpdateReviewedStateClick}>
              <Glyphicon glyph={reviewed ? 'eye-close' : 'eye-open'} />
              {' '}
              {reviewed ? 'Marquer comme non analysé' : 'Marquer comme analysé'}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DeleteScenarioButtonContainer scenarioId={scenarioId} />
          </ButtonGroup>
        </ButtonToolbar>

        <hr />

        <h2>Étapes du scénario</h2>
        <ScenarioDetailsContainer />

        <hr />

        <h2>Commentaires</h2>
        <CommentListContainer />

        <h4>Ajouter un nouveau commentaire</h4>
        <AddCommentFormContainer scenarioId={scenarioId} />

        <hr />

        <h2>Changements</h2>
        <ScenarioChangeTable changes={scenario.changes} />

        <hr />

        <h2>Scénarii de la même fonctionnalité</h2>
        <SameFeatureScenarioTableContainer scenarioId={scenarioId} />

        <hr />

        <h2>Historique</h2>
        <HistoryFilterContainer />
        <ScenarioHistoryTableContainer scenarioId={scenarioId} />

        <UpdateScenarioStateDialogContainer
          show={this.state.showUpdateStateDialog}
          onClose={this.hideUpdateStateDialog} />

        <UpdateScenarioReviewedStateDialogContainer
          scenarioId={scenarioId}
          show={this.state.showSetReviewedStateDialog}
          onClose={this.hideSetReviewedStateDialog} />

      </div>
    );
  }
}

ScenarioPage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onSetNonReviewedState: PropTypes.func.isRequired,
  scenarioId: PropTypes.string.isRequired,
  scenario: PropTypes.object,
};
