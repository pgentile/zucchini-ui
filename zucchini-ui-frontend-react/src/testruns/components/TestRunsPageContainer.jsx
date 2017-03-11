import { connect } from 'react-redux';

import TestRunsPage from '../components/TestRunsPage';
import { getLatestTestRuns } from '../redux';


const TestRunsPageContainer = connect(
  undefined,
  {
    onLoad: getLatestTestRuns,
  }
)(TestRunsPage);

export default TestRunsPageContainer;
