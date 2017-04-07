import { connect } from 'react-redux';

import DeleteScenarioButton from './DeleteScenarioButton';
import { deleteScenarioThenRedirect } from '../redux';


const DeleteScenarioButtonContainer = connect(
  undefined,
  {
    onDelete: deleteScenarioThenRedirect,
  }
)(DeleteScenarioButton);

export default DeleteScenarioButtonContainer;
