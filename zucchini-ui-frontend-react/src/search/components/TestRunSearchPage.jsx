import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import toNiceDate from '../../ui/toNiceDate';


export default class TestRunSearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.onSearchFormSubmit = this.onSearchFormSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

    this.state = {
      search: props.search,
    };
  }

  componentDidMount() {
    this.loadTestRunIfPossible();
  }

  componentDidUpdate(prevProps) {
    this.loadTestRunIfPossible(prevProps);
  }

  render() {
    const { testRun } = this.props;

    return (
      <div>
        <h1>Rechercher dans le tir du {toNiceDate(testRun.date)}</h1>

        <form onSubmit={this.onSearchFormSubmit}>
          <FormGroup controlId="search">
            <InputGroup bsSize="large">
              <FormControl type="text" value={this.state.search} onChange={this.onSearchChange} placeholder="Rechercher..." />
              <InputGroup.Button>
                <Button type="submit">
                  <Glyphicon glyph="search" />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>

        <Alert bsStyle="warning">
          La recherche n'est pas encore disponible.
        </Alert>

      </div>
    );
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId: this.props.testRunId });
    }
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

TestRunSearchPage.propTypes = {
  onLoad: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  search: React.PropTypes.string,
  testRunId: React.PropTypes.string,
  testRun: React.PropTypes.object.isRequired,
};
