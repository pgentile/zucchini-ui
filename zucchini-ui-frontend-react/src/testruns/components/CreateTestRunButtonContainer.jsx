import { connect } from 'react-redux';

import CreateTestRunButton from '../components/CreateTestRunButton';
import { createTestRun } from '../redux';


const CreateTestRunButtonContainer = connect(
  undefined,
  {
    onCreateTestRun: createTestRun,
  }
)(CreateTestRunButton);

export default CreateTestRunButtonContainer;
