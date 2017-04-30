import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Label from 'react-bootstrap/lib/Label';

import TagList from '../../../src/ui/components/TagList';


describe('TagList', () => {

  it('should contain labels with tags', () => {

    const tags = ['A', 'B', 'C'];

    const wrapper = shallow((
      <TagList tags={tags} />
    ));

    tags.forEach(tag => {
      expect(wrapper).to.contain((
        <Label bsStyle="info">@{tag}</Label>
      ));
    });

  });

});
