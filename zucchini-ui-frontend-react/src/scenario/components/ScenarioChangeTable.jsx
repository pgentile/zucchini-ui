import React from 'react';
import Table from 'react-bootstrap/lib/Table';

import Status from '../../ui/components/Status';
import toNiceDate from '../../ui/toNiceDate';


export default class ScenarioChangeTable extends React.PureComponent {

  render() {
    const { changes } = this.props;

    const rows = changes.map(change => {
      return (
        <ScenarioChangeTableRow key={change.id} change={change} />
      )
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-3">Date</th>
            <th className="col-md-3">Type</th>
            <th className="col-md-3">Ancienne&nbsp;valeur</th>
            <th className="col-md-3">Nouvelle&nbsp;valeur</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

ScenarioChangeTable.propTypes = {
  changes: React.PropTypes.arrayOf(React.PropTypes.object),
};



class ScenarioChangeTableRow extends React.PureComponent {

  render() {
    const { change } = this.props;

    const ValueComponent = this.getValueComponent();

    return (
      <tr>
        <td>{toNiceDate(change.date)}</td>
        <td>
          <b>{this.getChangeTypeName()}</b>
        </td>
        <td>
          <ValueComponent value={change.oldValue} />
        </td>
        <td>
          <ValueComponent value={change.newValue} />
        </td>
      </tr>
    );
  }

  getChangeTypeName() {
    const { change } = this.props;

    switch (change.type) {
    case 'REVIEWED_STATE':
      return 'Analysé ?';
    case 'STATUS':
      return 'Statut';
    default:
      return change.type;
    }
  }

  getValueComponent() {
    const { change } = this.props;

    switch (change.type) {
    case 'REVIEWED_STATE':
      return ReviewedStateContent;
    case 'STATUS':
      return StatusContent;
    default:
      return null;
    }
  }

}

ScenarioChangeTableRow.propTypes = {
  change: React.PropTypes.object.isRequired,
};


class StatusContent extends React.PureComponent {

  render() {
    const { value } = this.props;
    return (
      <Status status={value} />
    );
  }

}

StatusContent.propTypes = {
  value: React.PropTypes.any.isRequired,
};


class ReviewedStateContent extends React.PureComponent {

  render() {
    const { value } = this.props;
    return (
      <span>{value ? 'Oui' : 'Non'}</span>
    );
  }

}

ReviewedStateContent.propTypes = {
  value: React.PropTypes.any.isRequired,
};
