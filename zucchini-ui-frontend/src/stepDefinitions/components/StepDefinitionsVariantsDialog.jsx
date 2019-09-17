import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/lib/Modal";
import includes from "lodash/includes";
import StepDefinitionsHighlightedTerm from "./StepDefinitionsHighlightedTerm";

export default class StepDefinitionsVariantsDialog extends React.PureComponent {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    occurrences: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
  };

  onCloseClick = event => {
    if (event) {
      event.preventDefault();
    }
    this.props.onClose();
  };

  render() {
    const { show, occurrences, location } = this.props;
    return (
      <Modal bsSize="large" dialogClassName="details-modal-dialog" show={show} onHide={this.onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>
            Variantes Connues <span className="step-definition-location">{location}</span>
          </Modal.Title>
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
    return arg.offset;
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
      });
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
  return knownOffsets.reduce((prev, curr) =>
    Math.abs(curr - currentOffset) < Math.abs(prev - currentOffset) ? curr : prev
  );
}

function formatVariantsBlock(variants, variantStyle) {
  return variants.map(variant => {
    return <StepDefinitionsHighlightedTerm key={variant} text={variant} styleClass={variantStyle} />;
  });
}

function formatStepDefinitionVariants(occurrences) {
  const keywordStyle = "step-definition-keyword step-definition-variant";
  const argumentStyle = "step-definition-argument step-definition-variant";
  const definition = occurrences[0].info.name;

  const keywords = Array.from(
    new Set(
      occurrences.map(occurrence => {
        return occurrence.info.keyword;
      })
    )
  );
  const groupedArgs = groupDistinctArgumentsByOffset(occurrences);

  const formattedText = [];
  formattedText.push(
    <div className="step-definition-variant-details" key={definition}>
      {formatVariantsBlock(keywords, keywordStyle)}
    </div>
  );

  let startIdx = 0;
  for (const offset in groupedArgs) {
    const position = parseInt(offset);
    if (Object.prototype.hasOwnProperty.call(groupedArgs, position)) {
      const variants = groupedArgs[position];
      formattedText.push(
        <div className="step-definition-variant-details" key={startIdx}>
          {definition.substr(startIdx, position - startIdx)}
        </div>
      );
      formattedText.push(
        <div className="step-definition-variant-details" key={position}>
          {formatVariantsBlock(variants, argumentStyle)}
        </div>
      );
      startIdx = position + variants[0].length;
    }
  }
  formattedText.push(definition.substr(startIdx));
  return formattedText;
}
