import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';


const FILTERS = {
  comments: 'Les commentaires',
  context: 'Le contexte',
  beforeAndAfterActions: 'Les actions avant / après',
  errorDetails: 'Le détail des erreurs',
  logs: 'Les logs',
  attachments: 'Les pièces jointes',
};


export default class StepFilters extends React.PureComponent {

  onFilterChange(name) {
    return event => {
      this.props.onFilterChange({
        [name]: event.target.checked,
      });
    };
  }

  render() {
    const { filters } = this.props;

    const checkboxes = Object.keys(FILTERS).map(name => {
      const label = FILTERS[name];
      return (
        <FormGroup key={name}>
          <Checkbox checked={filters[name]} onChange={this.onFilterChange(name)}>
            {label}
          </Checkbox>
        </FormGroup>
      );
    });

    return (
      <div id="step-filters" title="Configurer les options d'affichage">
        {checkboxes}
      </div>
    );
  }

}

StepFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
