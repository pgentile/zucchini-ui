import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';


export default class FeatureStateFilter extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {
    const { passed, failed, partial, notRun, reviewed, notReviewed } = this.props.filters;

    return (
      <div className="form" style={{ marginBottom: '10px' }}>
        <FormGroup>
          Filtrer les fonctionnalités :
          {' '}
          <label className="checkbox-inline">
            <input type="checkbox" checked={passed} onChange={this.onFilterChange('passed')} />
            Succès
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" checked={failed} onChange={this.onFilterChange('failed')} />
            Échecs
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" checked={partial} onChange={this.onFilterChange('partial')} />
            Partielles
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" checked={notRun} onChange={this.onFilterChange('notRun')} />
            Non jouées
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" checked={reviewed} onChange={this.onFilterChange('reviewed')} />
            Analysées
          </label>
          <label className="checkbox-inline">
            <input type="checkbox" checked={notReviewed} onChange={this.onFilterChange('notReviewed')} />
            Non analysées
          </label>
        </FormGroup>
      </div>
    );
  }

  onFilterChange(name) {
    return event => {
      this.props.onFilterChange({
        [name]: event.target.checked,
      });
    };
  }

}

FeatureStateFilter.propTypes = {
  filters: React.PropTypes.object.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
};
