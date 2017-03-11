import React from 'react';

import BasePage from '../../ui/components/BasePage';
import toNiceDate from '../../ui/toNiceDate';


export default class TestRunPage extends React.Component {

  componentDidMount() {
    this.props.onLoad({ testRunId: this.props.testRunId });
  }

  render() {
    const { testRunId, testRun } = this.props;

    return (
      <BasePage title={`Tir du ${toNiceDate(testRun.date)}`}>
        <p><b>Identifiant du tir :</b> <code>{testRunId}</code></p>
        <hr />
      </BasePage>
    );
  }

}

TestRunPage.propTypes = {
  testRunId: React.PropTypes.string.isRequired,
  testRun: React.PropTypes.object,
  onLoad: React.PropTypes.func.isRequired,
};
