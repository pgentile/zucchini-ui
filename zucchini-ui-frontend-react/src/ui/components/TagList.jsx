import PropTypes from 'prop-types';
import React from 'react';
import Label from 'react-bootstrap/lib/Label';

import ListWithSeparator from './ListWithSeparator';


export default class TagList extends React.PureComponent {

  render() {
    let { tags } = this.props;

    // Sort tag list before display
    tags = [...tags];
    tags.sort();

    const tagElements = tags.map(tag => (
      <Label key={tag} bsStyle="info">@{tag}</Label>
    ));

    return (
      <ListWithSeparator separator=" ">{tagElements}</ListWithSeparator>
    );
  }

}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};
