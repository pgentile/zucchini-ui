import React from 'react';
import { Link } from 'react-router';
import queryString from 'query-string';

import BasePage from '../../ui/components/BasePage';
import TestRunsTableContainer from './TestRunsTableContainer';


export default class TestRunsPage extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const testRunTypeLinks = this.props.testRunTypes.map(type => {

      const linkTarget = {
        pathname: '/',
        search: '?' + queryString.stringify({ type }),
      };

      return (
        <span key={type}>
          <Link to={linkTarget}>{type}</Link>
          {' '}
        </span>
      );
    });

    return (
      <BasePage title="Derniers tirs">
        <p>
          Filter par type :
          {' '}
          <Link to="/"><i>Tous</i></Link>
          {' '}
          {testRunTypeLinks}
        </p>
        <TestRunsTableContainer />
      </BasePage>
    );
  }

}

TestRunsPage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  testRunTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
