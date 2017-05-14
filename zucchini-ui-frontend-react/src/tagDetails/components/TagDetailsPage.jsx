import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import toNiceDate from '../../ui/toNiceDate';
import Button from '../../ui/components/Button';
import FeatureStateFilterContainer from '../../filters/components/FeatureStateFilterContainer';
import ScenarioStateFilterContainer from '../../filters/components/ScenarioStateFilterContainer';
import TagDetailsStatsContainer from './TagDetailsStatsContainer';
import TagDetailsFeatureTableContainer from './TagDetailsFeatureTableContainer';
import TagDetailsScenarioTableContainer from './TagDetailsScenarioTableContainer';


export default class TagDetailsPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.computeStateFromProps(props);
  }

  componentDidMount() {
    this.loadPageIfPossible();
  }

  componentWillReceiveProps(nextProps) {
    const { tags, excludedTags } = this.props;
    if (tags !== nextProps.tags || excludedTags !== nextProps.excludedTags) {
      this.setState(this.computeStateFromProps(nextProps));
    }
  }

  componentDidUpdate(prevProps) {
    this.loadPageIfPossible(prevProps);
  }

  loadPageIfPossible(prevProps = {}) {
    const { testRunId, tags, excludedTags } = this.props;

    if (testRunId !== prevProps.testRunId || tags !== prevProps.tags || excludedTags !== prevProps.excludedTags) {
      this.props.onLoad({ testRunId, tags, excludedTags });
    }
  }

  onTagsChange = event => {
    this.setState({
      tagsStr: event.target.value,
    });
  };

  onExcludedTagsChange = event => {
    this.setState({
      excludedTagsStr: event.target.value,
    });
  };

  onUpdateTags = event => {
    event.preventDefault();

    const splitTagStr = str => {
      if (str.length) {
        return str.split(' ');
      }
      return [];
    };

    this.props.onUpdate({
      testRunId: this.props.testRunId,
      tags: splitTagStr(this.state.tagsStr),
      excludedTags: splitTagStr(this.state.excludedTagsStr),
    });
  };

  computeStateFromProps(props) {
    return {
      tagsStr: props.tags.join(' '),
      excludedTagsStr: props.excludedTags.join(' '),
    };
  }

  render() {
    const { testRun, tags, excludedTags } = this.props;

    const includedTagsStr = tags
      .map(tag => `@${tag}`)
      .join(' ');

    const excludedTagsStr = excludedTags
      .map(tag => `~@${tag}`)
      .join(' ');

    return (
      <div>
        <h1>
          Tags {includedTagsStr} {excludedTagsStr}
          {' '}
          <small>{`Tir du ${toNiceDate(testRun.date)}`}</small>
        </h1>

        <hr />

        <form onSubmit={this.onUpdateTags}>
          <Row>
            <Col md={5}>
              <FormGroup controlId="tags">
                <InputGroup>
                  <ControlLabel className="input-group-addon">Tags inclus</ControlLabel>
                  <FormControl value={this.state.tagsStr} onChange={this.onTagsChange} />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup controlId="excludedTags">
                <InputGroup>
                  <ControlLabel className="input-group-addon">Tags exclus</ControlLabel>
                  <FormControl value={this.state.excludedTagsStr} onChange={this.onExcludedTagsChange} />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={2}>
              <Button glyph="refresh" type="submit" block>Actualiser</Button>
            </Col>
          </Row>
        </form>

        <hr />

        <h2>Statistiques</h2>
        <TagDetailsStatsContainer />

        <hr />

        <h2>Fonctionnalités</h2>
        <FeatureStateFilterContainer />
        <TagDetailsFeatureTableContainer />

        <hr />

        <h2>Scénarios</h2>
        <ScenarioStateFilterContainer />
        <TagDetailsScenarioTableContainer />

      </div>
    );
  }
}

TagDetailsPage.propTypes = {
  testRunId: PropTypes.string.isRequired,
  testRun: PropTypes.object,
  tags: PropTypes.array.isRequired,
  excludedTags: PropTypes.array.isRequired,
  onLoad: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
