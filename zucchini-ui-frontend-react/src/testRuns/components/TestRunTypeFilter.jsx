import React from 'react';
import { Link } from 'react-router';
import queryString from 'query-string';


export default class TestRunTypeFilter extends React.PureComponent {

  render() {
    const { testRunTypes } = this.props;

    const testRunTypeLinks = testRunTypes.map(type => {

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
      <p>
        Filter par type :
        {' '}
        <Link to="/"><i>Tous</i></Link>
        {' '}
        {testRunTypeLinks}
      </p>
    );
  }

}

TestRunTypeFilter.propTypes = {
  testRunTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
