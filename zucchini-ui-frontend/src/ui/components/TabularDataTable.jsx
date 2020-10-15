import { Children, memo } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

export default function TabularDataTable({ columnNames, emptyDescription, children, ...otherProps }) {
  const hasChildren = Children.count(children) > 0;
  return (
    <Table bordered striped hover responsive {...otherProps}>
      <TableHead columnNames={columnNames} />
      {hasChildren && <tbody>{children}</tbody>}
      {!hasChildren && emptyDescription && (
        <TableFoot emptyDescription={emptyDescription} colSpan={columnNames.length} />
      )}
    </Table>
  );
}

TabularDataTable.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.node).isRequired,
  emptyDescription: PropTypes.node,
  children: PropTypes.node
};

const TabularDataRow = memo(function TabularDataRow({ children, highlight = false }) {
  return <tr className={highlight ? "table-primary" : undefined}>{children}</tr>;
});

TabularDataRow.propTypes = {
  children: PropTypes.node.isRequired,
  highlight: PropTypes.bool
};

export { TabularDataRow };

const TableHead = memo(function TableHead({ columnNames }) {
  return (
    <thead>
      <tr>
        {columnNames.map((name, index) => (
          <th key={index}>{name}</th>
        ))}
      </tr>
    </thead>
  );
});

TableHead.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.node).isRequired
};

const TableFoot = memo(function TableFoot({ emptyDescription, colSpan }) {
  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan} className="text-center">
          <i className="text-muted">{emptyDescription}</i>
        </td>
      </tr>
    </tfoot>
  );
});

TableFoot.propTypes = {
  emptyDescription: PropTypes.node.isRequired,
  colSpan: PropTypes.number.isRequired
};
