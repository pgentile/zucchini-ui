import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import FilterCheckboxes from '../../ui/components/FilterCheckboxes';


const LABELS = {
  passed: 'Succès',
  failed: 'Échecs',
  pending: 'En attente',
  notRun: 'Non joués',
  reviewed: 'Analysés',
  notReviewed: 'Non analysés',
};


export default class ScenarioStateFilter extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

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

  onFilterChange(filters) {
    this.props.onFilterChange(filters);
  }

}

ScenarioStateFilter.propTypes = {
  filters: React.PropTypes.object.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
};
