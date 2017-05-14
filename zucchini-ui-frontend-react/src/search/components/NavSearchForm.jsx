import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';

import Button from '../../ui/components/Button';


export default class NavSearchForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  onSearchChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  onSearchFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch({
      search: this.state.search,
      testRunId: this.props.testRunId,
    });
  };

  render() {
    if (this.props.testRunId === null) {
      return null;
    }

    return (
      <Navbar.Form pullRight>
        <form onSubmit={this.onSearchFormSubmit}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" placeholder="Rechercher..." value={this.state.search} onChange={this.onSearchChange} />
              <InputGroup.Button>
                <Button glyph="search" type="submit" />
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </Navbar.Form>
    );
  }

}

NavSearchForm.propTypes = {
  testRunId: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};
