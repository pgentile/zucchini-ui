import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";

export default class ScenarioChangeTable extends React.PureComponent {
  static propTypes = {
    changes: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const { changes } = this.props;

    const rows = changes.map((change) => {
      return <ScenarioChangeTableRow key={change.id} change={change} />;
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

class ScenarioChangeTableRow extends React.PureComponent {
  static propTypes = {
    change: PropTypes.object.isRequired
  };

  getChangeTypeName() {
    const { change } = this.props;

    switch (change.type) {
      case "REVIEWED_STATE":
        return "Analysé ?";
      case "STATUS":
        return "Statut";
      default:
        return change.type;
    }
  }

  getValueComponent() {
    const { change } = this.props;

    switch (change.type) {
      case "REVIEWED_STATE":
        return ReviewedStateContent;
      case "STATUS":
        return StatusContent;
      default:
        return null;
    }
  }

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
}

class StatusContent extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired
  };

  render() {
    const { value } = this.props;
    return <Status status={value} />;
  }
}

class ReviewedStateContent extends React.PureComponent {
  static propTypes = {
    value: PropTypes.any.isRequired
  };

  render() {
    const { value } = this.props;
    return <span>{value ? "Oui" : "Non"}</span>;
  }
}
