import PropTypes from "prop-types";
import React from "react";
import FormGroup from "react-bootstrap/FormGroup";
import FormCheck from "react-bootstrap/FormCheck";

const FILTERS = {
  comments: "Les commentaires",
  context: "Le contexte",
  beforeAndAfterActions: "Les actions avant / après",
  errorDetails: "Le détail des erreurs",
  logs: "Les logs",
  attachments: "Les pièces jointes"
};

export default class StepFilters extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    onFilterChange: PropTypes.func.isRequired
  };

  onFilterChange(name) {
    return (event) => {
      this.props.onFilterChange({
        [name]: event.target.checked
      });
    };
  }

  render() {
    const { filters } = this.props;

    const checkboxes = Object.keys(FILTERS).map((name) => {
      const label = FILTERS[name];
      return (
        <FormGroup key={name}>
          <FormCheck type="checkbox" checked={filters[name]} onChange={this.onFilterChange(name)} label={label} />
        </FormGroup>
      );
    });

    return <div>{checkboxes}</div>;
  }
}
