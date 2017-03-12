import React from 'react';
import { Link } from 'react-router';


export default class FeatureGroupFilter extends React.PureComponent {

  render() {

    const { testRunId, featureGroups } = this.props;

    const featureGroupLinks = featureGroups.map(featureGroup => {

      const linkTarget = {
        pathname: `/test-runs/${testRunId}`,
        query: {
          featureGroup,
        },
      };

      return (
        <span key={featureGroup}>
          <Link to={linkTarget}>{featureGroup}</Link>
          {' '}
        </span>
      );
    });

    return (
      <p>
        Filter par groupe :
        {' '}
        <Link to={`/test-runs/${testRunId}`}><i>Tous</i></Link>
        {' '}
        {featureGroupLinks}
      </p>
    );
  }

}

FeatureGroupFilter.propTypes = {
  testRunId: React.PropTypes.string.isRequired,
  featureGroups: React.PropTypes.array.isRequired,
};
