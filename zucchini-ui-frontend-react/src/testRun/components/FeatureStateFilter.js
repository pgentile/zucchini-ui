import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import FilterCheckboxes from '../../ui/components/FilterCheckboxes';


const LABELS = {
  passed: 'Succès',
  failed: 'Échecs',
  partial: 'Partielles',
  notRun: 'Non jouées',
  reviewed: 'Analysées',
  notReviewed: 'Non analysées',
};


export default class FeatureStateFilter extends React.PureComponent {
  render() {
    const { filters } = this.props;

    return (
      <div className="form" style={{ marginBottom: '10px' }}>
        <FormGroup>
          Filtrer les scénarios :
          {' '}
          <FilterCheckboxes labels={LABELS} filters={filters} onFilterChange={this.onFilterChange} />
        </FormGroup>
      </div>
    );
  }

  onFilterChange = (filters) => {
    this.props.onFilterChange(filters);
  };

}

FeatureStateFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
