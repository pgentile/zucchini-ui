import { connect } from 'react-redux';

import CreateTestRunDialog from '../components/CreateTestRunDialog';
import { createTestRun } from '../redux';


const CreateTestRunDialogContainer = connect(
  undefined,
  {
    onCreateTestRun: createTestRun,
  },
)(CreateTestRunDialog);

export default CreateTestRunDialogContainer;
