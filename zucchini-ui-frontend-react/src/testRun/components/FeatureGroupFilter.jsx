import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import ListWithSeparator from '../../ui/components/ListWithSeparator';


export default class FeatureGroupFilter extends React.PureComponent {

  render() {
    const { testRunId, featureGroups } = this.props;

    const featureGroupLinks = featureGroups.map(featureGroup => {
      return (
        <span key={featureGroup}>
          <Link to={{ pathname: `/test-runs/${testRunId}`, query: { featureGroup } }}>{featureGroup}</Link>
        </span>
      );
    });

    return (
      <p>
        Filter par groupe :
        {' '}
        <ListWithSeparator separator=", ">
          <Link to={`/test-runs/${testRunId}`}><i>Tous</i></Link>
          {featureGroupLinks}
        </ListWithSeparator>
      </p>
    );
  }

}

FeatureGroupFilter.propTypes = {
  testRunId: PropTypes.string.isRequired,
  featureGroups: PropTypes.array.isRequired,
};
