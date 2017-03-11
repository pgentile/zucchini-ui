import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

import toNiceDate from '../../ui/toNiceDate';


export default class TestRunBreadcrum extends React.PureComponent {

  render() {
    const { testRun } = this.props;

    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          Type {testRun.type}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Tir du {toNiceDate(testRun.date)}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

}

TestRunBreadcrum.propTypes = {
  testRun: React.PropTypes.object.isRequired,
};
