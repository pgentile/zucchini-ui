import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';


export default class TestRunsBreadcrum extends React.PureComponent {

  render() {
    const { selectedType } = this.props;

    let selectedTypeItem = null;
    if (selectedType) {
      selectedTypeItem = (
        <Breadcrumb.Item active>
          Type {selectedType}
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb>
        <Breadcrumb.Item active={selectedType === null}>
          Derniers tirs
        </Breadcrumb.Item>
        {selectedTypeItem}
      </Breadcrumb>
    );
  }

}

TestRunsBreadcrum.propTypes = {
  selectedType: React.PropTypes.string,
};
