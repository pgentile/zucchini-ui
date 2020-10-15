import PropTypes from "prop-types";
import { memo } from "react";
import Table from "react-bootstrap/Table";

import "./StepTable.scss";

function StepTable({ table }) {
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

StepTable.propTypes = {
  table: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default memo(StepTable);
