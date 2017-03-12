import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


export default class NavSearchForm extends React.PureComponent {

  constructor(props) {
    super(props);

    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      search: '',
    };
  }

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
                <Button type="submit">
                  <Glyphicon glyph="search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </Navbar.Form>
    );
  }

  onSearchChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  onSearchFormSubmit(event) {
    event.preventDefault();
    this.props.onSearch({
      search: this.state.search,
      testRunId: this.props.testRunId,
    });
  }

}

NavSearchForm.propTypes = {
  testRunId: React.PropTypes.string,
  onSearch: React.PropTypes.func.isRequired,
};
