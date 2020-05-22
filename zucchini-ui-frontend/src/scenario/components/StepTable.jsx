import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";

import "./StepTable.scss";

export default class StepTable extends React.PureComponent {
  static propTypes = {
    table: PropTypes.arrayOf(PropTypes.array).isRequired
  };

  render() {
    const { table } = this.props;

    const rows = table.map((row, rowIndex) => {
      const columns = row.map((column, columnIndex) => (
        <td key={columnIndex}>
          <code>{column}</code>
        </td>
      ));

      return <tr key={rowIndex}>{columns}</tr>;
    });

    return (
      <Table bordered size="sm" className="step-table">
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}
