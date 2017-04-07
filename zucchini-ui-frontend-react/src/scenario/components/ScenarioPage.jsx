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
import ScenarioChangeTable from './ScenarioChangeTable';


export default class ScenarioPage extends React.Component {

  constructor(props) {
    super(props);

    this.onUpdateStateClick = this.onUpdateStateClick.bind(this);
    this.showUpdateStateDialog = this.showUpdateStateDialog.bind(this);
    this.hideUpdateStateDialog = this.hideUpdateStateDialog.bind(this);

    this.state = {
      showUpdateStateDialog: false,
    };
  }

  componentDidMount() {
    this.loadScenarioIfNeeded();
  }

  componentDidUpdate(prevProps) {
    this.loadScenarioIfNeeded(prevProps);
  }

  render() {
    const { scenario } = this.props;

    return (
      <div>
        <h1>
          <b>{scenario.info.keyword}</b> {scenario.info.name}
          {' '}
          {scenario.status && <small><Status status={scenario.status} /></small>}
        </h1>

        {scenario.allTags.length > 0 && <p><b>Tags :</b> <TagList tags={scenario.allTags} /></p>}

        <hr />

        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.onUpdateStateClick}>
              <Glyphicon glyph="flag" /> Modifier le statut&hellip;
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <DeleteScenarioButtonContainer />
          </ButtonGroup>
        </ButtonToolbar>

        <hr />

        <h2>Étapes du scénario</h2>
        <ScenarioDetailsContainer />

        <hr />

        <h2>Commentaires</h2>
        <CommentListContainer />

        <h4>Ajouter un nouveau commentaire</h4>
        <AddCommentFormContainer scenarioId={this.props.scenarioId} />

        <hr />

        <h2>Changements</h2>
        <ScenarioChangeTable changes={this.props.scenario.changes} />

        <hr />

        <h2>Scénarii de la même fonctionnalité</h2>
        <SameFeatureScenarioTableContainer scenarioId={this.props.scenarioId} />

        <hr />

        <h2>Historique</h2>
        <HistoryFilterContainer />
        <ScenarioHistoryTableContainer scenarioId={this.props.scenarioId} />

        <UpdateScenarioStateDialogContainer show={this.state.showUpdateStateDialog} onClose={this.hideUpdateStateDialog} />

      </div>
    );
  }

  loadScenarioIfNeeded(prevProps = {}) {
    const { scenarioId, onLoad } = this.props;
    if (scenarioId !== prevProps.scenarioId) {
      onLoad({ scenarioId });
    }
  }

  onUpdateStateClick() {
    this.showUpdateStateDialog();
  }

  showUpdateStateDialog() {
    this.setState({
      showUpdateStateDialog: true,
    });
  }

  hideUpdateStateDialog() {
    this.setState({
      showUpdateStateDialog: false,
    });
  }

}

ScenarioPage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  scenarioId: React.PropTypes.string.isRequired,
  scenario: React.PropTypes.object,
};
