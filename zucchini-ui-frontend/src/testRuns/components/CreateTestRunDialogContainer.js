import { connect } from 'react-redux';

import CreateTestRunDialog from './CreateTestRunDialog';
import { createTestRunThenRedirect } from '../redux';


export default connect(
  undefined,
  {
    onCreateTestRun: createTestRunThenRedirect,
  },
)(CreateTestRunDialog);
