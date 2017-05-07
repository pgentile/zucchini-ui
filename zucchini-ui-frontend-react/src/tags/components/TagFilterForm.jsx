import PropTypes from 'prop-types';
import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class TagFilterForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormGroup controlId="filter">
          <InputGroup>
            <FormControl type="text" placeholder="Filtrer par tag" value={this.state.filter} onChange={this.onFilterChange} />
            <InputGroup.Button>
              <Button onClick={this.onClearFilter}>
                <Glyphicon glyph="remove-circle" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }

  onSubmit = (event) => {
    event.preventDefault();
  };

  onFilterChange = (event) => {
    const filter = event.target.value;
    this.setState({ filter });
    this.props.onFilterChange({ filter });
  };

  onClearFilter = () => {
    const filter = '';
    this.setState({ filter });
    this.props.onFilterChange({ filter });
  };

}

TagFilterForm.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
