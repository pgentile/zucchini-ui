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
        <ListWithSeparator>
          <Link to={`/test-runs/${testRunId}`}><i>Tous</i></Link>
          {featureGroupLinks}
        </ListWithSeparator>
      </p>
    );
  }

}

FeatureGroupFilter.propTypes = {
  testRunId: React.PropTypes.string.isRequired,
  featureGroups: React.PropTypes.array.isRequired,
};
