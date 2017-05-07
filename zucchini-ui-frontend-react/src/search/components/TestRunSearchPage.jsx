import PropTypes from 'prop-types';
import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import toNiceDate from '../../ui/toNiceDate';
import FoundScenarioTableContainer from './FoundScenarioTableContainer';


export default class TestRunSearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: props.search,
    };
  }

  componentDidMount() {
    this.loadTestRunIfPossible();
    this.searchOnLoad();
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

        <hr />

        <h2>Résultats</h2>
        <FoundScenarioTableContainer />

      </div>
    );
  }

  loadTestRunIfPossible(prevProps = {}) {
    const { testRunId } = this.props;

    if (testRunId !== prevProps.testRunId) {
      this.props.onLoad({ testRunId: this.props.testRunId });
    }
  }

  searchOnLoad() {
    const { testRunId, search } = this.props;

    if (search && testRunId) {
      this.props.onSearch({ testRunId, search });
    }
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

}

TestRunSearchPage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  testRunId: PropTypes.string.isRequired,
  testRun: PropTypes.object.isRequired,
};
