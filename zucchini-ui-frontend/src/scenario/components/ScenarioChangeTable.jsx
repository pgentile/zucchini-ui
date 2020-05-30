import PropTypes from "prop-types";
import React from "react";

import Status from "../../ui/components/Status";
import toNiceDate from "../../ui/toNiceDate";
import TabularDataTable, { TabularDataRow } from "../../ui/components/TabularDataTable";

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
      <TabularDataTable
        columnNames={["Date", "Type", "Ancienne valeur", "Nouvelle valeur"]}
        emptyDescription="Pas de changement"
      >
        {rows}
      </TabularDataTable>
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
      <TabularDataRow>
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
      </TabularDataRow>
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
