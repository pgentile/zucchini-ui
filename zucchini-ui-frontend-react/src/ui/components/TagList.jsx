import React from 'react';
import Label from 'react-bootstrap/lib/Label';

import ListWithSeparator from './ListWithSeparator';


export default class TagList extends React.PureComponent {

  render() {
    const { tags } = this.props;

    const tagElements = tags.map(tag => (
      <Label key={tag} bsStyle="info">@{tag}</Label>
    ));

    return (
      <ListWithSeparator separator=" ">{tagElements}</ListWithSeparator>
    );
  }

}

TagList.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};
