import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';


export default class HistoryFilter extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  render() {

    const { sameTestRunType } = this.props.filters;

    return (
      <div className="form" style={{ marginBottom: '10px' }}>
        <FormGroup>
          Filtrer :
          {' '}
          <label className="checkbox-inline">
            <input type="checkbox" checked={sameTestRunType} onChange={this.onFilterChange('sameTestRunType')} />
            Même type de tir
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

HistoryFilter.propTypes = {
  filters: React.PropTypes.object.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
};
