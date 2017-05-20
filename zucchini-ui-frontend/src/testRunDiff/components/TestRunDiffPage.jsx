import PropTypes from 'prop-types';
import React from 'react';

import TestRunDiffSelectorPageContainer from './TestRunDiffSelectorPageContainer';
import TestRunDiffResultPageContainer from './TestRunDiffResultPageContainer';


export default class TestRunDiffPage extends React.Component {

  static propTypes = {
    testRunId: PropTypes.string.isRequired,
    otherTestRunId: PropTypes.string,
  };

  render() {
    const { testRunId, otherTestRunId } = this.props;

    if (otherTestRunId) {
      return (
        <TestRunDiffResultPageContainer testRunId={testRunId} otherTestRunId={otherTestRunId} />
      );
    }
    else {
      return (
        <TestRunDiffSelectorPageContainer testRunId={testRunId} />
      );
    }
  }
}
