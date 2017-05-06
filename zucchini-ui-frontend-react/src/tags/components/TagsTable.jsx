import PropTypes from 'prop-types';
import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import Badge from 'react-bootstrap/lib/Badge';
import Label from 'react-bootstrap/lib/Label';

import Status from '../../ui/components/Status';


export default class TagsTable extends React.Component {

  render() {
    const { tags } = this.props;

    const rows = tags.map(tag => {
      return (
        <TagsTableRow key={tag.tag} tag={tag} />
      );
    });

    return (
      <Table bordered striped hover>
        <thead>
          <tr>
            <th className="col-md-5">Tag</th>
            <th className="col-md-1">Statut</th>
            <th className="col-md-1">Total</th>
            <th className="col-md-1">Succès</th>
            <th className="col-md-1">Échecs</th>
            <th className="col-md-1">En attente</th>
            <th className="col-md-1">Non joués</th>
            <th className="col-md-1">Analysés</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  }

}

TagsTable.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};


class TagsTableRow extends React.PureComponent {

  render() {
    const { tag } = this.props;

    return (
      <tr>
        <td>
          <Label bsStyle="info">@{tag.tag}</Label>
        </td>
        <td>
          <Status status={tag.status} />
        </td>
        <td><Badge>{tag.stats.all.count}</Badge></td>
        <td><Badge>{tag.stats.all.passed}</Badge></td>
        <td><Badge>{tag.stats.all.failed}</Badge></td>
        <td><Badge>{tag.stats.all.pending}</Badge></td>
        <td><Badge>{tag.stats.all.notRun}</Badge></td>
        <td><Badge>{tag.stats.reviewed.count}</Badge></td>
      </tr>
    );
  }

}

TagsTableRow.propTypes = {
  tag: PropTypes.object.isRequired,
};
