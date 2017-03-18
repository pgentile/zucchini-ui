import React from 'react';
import { Link } from 'react-router';

import ListWithSeparator from '../../ui/components/ListWithSeparator';


export default class TestRunTypeFilter extends React.PureComponent {

  render() {
    const { testRunTypes } = this.props;

    const testRunTypeLinks = testRunTypes.map(type => {
      return (
        <Link key={type} to={{ pathname: '/', query: { type } }}>{type}</Link>
      );
    });

    return (
      <p>
        Filter par type :
        {' '}
        <ListWithSeparator separator=", ">
          <Link to="/"><i>Tous</i></Link>
          {testRunTypeLinks}
        </ListWithSeparator>
      </p>
    );
  }

}

TestRunTypeFilter.propTypes = {
  testRunTypes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
