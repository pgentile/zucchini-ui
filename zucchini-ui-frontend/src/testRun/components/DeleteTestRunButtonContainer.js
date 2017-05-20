import { connect } from 'react-redux';

import DeleteTestRunButton from './DeleteTestRunButton';
import { deleteTestRunThenRedirect } from '../redux';


const DeleteTestRunButtonContainer = connect(
  undefined,
  {
    onDelete: deleteTestRunThenRedirect,
  }
)(DeleteTestRunButton);

export default DeleteTestRunButtonContainer;
