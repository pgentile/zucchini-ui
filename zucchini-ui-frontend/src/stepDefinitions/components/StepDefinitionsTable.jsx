import PropTypes from 'prop-types';
import React from 'react';
import Badge from 'react-bootstrap/lib/Badge';
import Table from 'react-bootstrap/lib/Table';
import Modal from 'react-bootstrap/lib/Modal';
import truncate from 'lodash/truncate';
import sortBy from 'lodash/sortBy';
import includes from 'lodash/includes';


export default class StepDefinitionsTable extends React.Component {

  static propTypes = {
    stepDefinitions: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { stepDefinitions } = this.props;

    const sortedOccurrences = stepDefinitions.map(definition => {
      definition.occurrences = sortBy(definition.occurrences, ['info.keyword', 'info.name']);
      return definition
    });
    const sortedDefinitions = sortBy(sortedOccurrences, ['occurrences[0].info.keyword', 'occurrences[0].info.name']);
    const rows = sortedDefinitions.map((stepDefinition, index) => {
      return <StepDefinitionsRow key={index} stepDefinition={stepDefinition} />
    });

    return (
      <Table bordered striped hover style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th className='col-md-10'>Définition</th>
            <th className='col-md-1' style={{ textAlign: 'center' }}>Occurrence</th>
            <th className='col-md-1' style={{ textAlign: 'center' }}>Réussite</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

class StepDefinitionsRow extends React.Component {

  static propTypes = {
    stepDefinition: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showVariants: false,
    };
  }

  onShowVariants = () => {
    this.setState({
      showVariants: true,
    });
  };

  onHideVariants = () => {
    this.setState({
      showVariants: false,
    });
  };

  render() {

    const { stepDefinition } = this.props;
    const stepLocation = `${stepDefinition.stepDefinitionLocation.filename}:${stepDefinition.stepDefinitionLocation.line}`;

    const nbSuccesses = stepDefinition.occurrences.filter((step) => {
      return step.status === 'PASSED'
    }).length;
    const successRate = Math.floor((nbSuccesses / stepDefinition.occurrences.length) * 100);

    let successBadge;
    if (successRate >= 90) {
      successBadge = 'badge-success';
    } else if (successRate >= 50 && successRate >= 90) {
      successBadge = 'badge-warning';
    } else if (successRate < 50) {
      successBadge = 'badge-error';
    }

    return (
      <tr key={stepDefinition}>
        <td style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <a onClick={this.onShowVariants}>
            <StepDefinitionsCell occurrence={stepDefinition.occurrences[0]} />
          </a>
          <StepDefinitionsVariantsDialog occurrences={stepDefinition.occurrences} location={stepLocation} show={this.state.showVariants} onClose={this.onHideVariants} />
        </td>
        <td style={{ textAlign: 'center' }}>
          <b>{stepDefinition.occurrences.length}</b>
        </td>
        <td style={{ textAlign: 'center' }}>
          <Badge bsClass={successBadge}>{successRate} %</Badge>
        </td>
      </tr>
    );
  }
}

class StepDefinitionsCell extends React.Component {

  static propTypes = {
    occurrence: PropTypes.object.isRequired
  };

  render() {
    const { occurrence } = this.props;
    const highlightedText = formatStepDefinition(occurrence);
    return (
      <span>{highlightedText.map((text, idx) => <span key={idx}>{text}</span>)}</span>
    );
  }
}

class StepDefinitionsTableHighlightedTerm extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    styleClass: PropTypes.string.isRequired,
  };

  render() {
    const { text, styleClass } = this.props;
    return (
      <span className={styleClass}>{text}</span>
    );
  }
}

class StepDefinitionsVariantsDialog extends React.PureComponent {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    occurrences: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
  };

  onCloseClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  render() {
    const { show, occurrences, location } = this.props;
    return (
      <Modal bsSize='large' dialogClassName='modal-dialog' show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>{'Variantes Connues'} <span className='step-definition-location'>{location}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{formatStepDefinitionVariants(occurrences)}</pre>
        </Modal.Body>
      </Modal>
    );
  }
}

function groupDistinctArgumentsByOffset(occurrences) {
  const groupedArgs = {};
  const knownOffsets = occurrences[0].info.arguments.map(arg => {
    return arg.offset
  });

  if (knownOffsets.length > 0) {
    occurrences.forEach(occurrence => {
      occurrence.info.arguments.map(argument => {
        const key = getClosestOffset(knownOffsets, argument.offset);
        const value = argument.value;
        if (groupedArgs[key] === undefined) {
          groupedArgs[key] = [value];
        } else {
          // No value duplicates
          if (!includes(groupedArgs[key], value)) {
            groupedArgs[key].push(value);
          }
        }
      })
    });
  }
  return groupedArgs;
}

function getClosestOffset(knownOffsets, currentOffset) {
  // Sometimes the offset returned by cucumber is slightly shifted due to non-capturing groups in regexes
  // Ex: " this is a glue with non capturing groups?" -> The "s" in "groups" will shift ethe offset by one
  if (includes(knownOffsets[currentOffset])) {
    return currentOffset;
  }
  return knownOffsets.reduce((prev, curr) => Math.abs(curr - currentOffset) < Math.abs(prev - currentOffset) ? curr : prev);
}

function formatVariantsBlock(variants, variantStyle) {
  return variants.map(variant => {
    return <StepDefinitionsTableHighlightedTerm key={variant} text={variant} styleClass={variantStyle} />
  });
}

function formatStepDefinition(stepDefinition) {

  const keyword = stepDefinition.info.keyword;
  const definition = truncate(stepDefinition.info.name, { 'length': 300 });
  const args = stepDefinition.info.arguments;

  const formattedText = [];
  formattedText.push(<span key={Math.random()}><StepDefinitionsTableHighlightedTerm text={keyword} styleClass='step-definition-keyword' />&nbsp;</span>);

  let startIdx = 0;
  if (args !== undefined) {
    args.forEach((arg, index) => {
      formattedText.push(definition.substr(startIdx, arg.offset - startIdx));
      formattedText.push(<StepDefinitionsTableHighlightedTerm key={index} text={arg.value} styleClass='step-definition-argument' />);
      startIdx = arg.offset + arg.value.length;
    });
    formattedText.push(definition.substr(startIdx));
  } else {
    formattedText.push(definition)
  }
  return formattedText;
}

function formatStepDefinitionVariants(occurrences) {

  const blockStyle = { float: 'left' };
  const keywordStyle = 'step-definition-keyword step-definition-variant';
  const argumentStyle = 'step-definition-argument step-definition-variant';
  const definition = occurrences[0].info.name;
  const keywords = [...new Set(occurrences.map(occurrence => { return occurrence.info.keyword }))];
  const groupedArgs = groupDistinctArgumentsByOffset(occurrences);

  const formattedText = [];
  formattedText.push(<div style={blockStyle} key={Math.random()}>{formatVariantsBlock(keywords, keywordStyle)}</div>);

  let startIdx = 0;
  for (const offset in groupedArgs) {
    const position = parseInt(offset);
    if (groupedArgs.hasOwnProperty(position)) {
      const variants = groupedArgs[position];
      formattedText.push(<div style={blockStyle} key={Math.random()}>{definition.substr(startIdx, position - startIdx)}</div>);
      formattedText.push(<div style={blockStyle} key={position}>{formatVariantsBlock(variants, argumentStyle)}</div>);
      startIdx = position + variants[0].length;
    }
  }
  formattedText.push(definition.substr(startIdx));
  return formattedText;
}
