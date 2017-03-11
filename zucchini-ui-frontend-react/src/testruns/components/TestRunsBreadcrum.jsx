import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';


export default class TestRunsBreadcrum extends React.PureComponent {

  render() {
    const { selectedType } = this.props;

    const isTypeSelected = (selectedType !== null && selectedType !== undefined && selectedType !== '');

    let selectedTypeItem = null;
    if (isTypeSelected) {
      selectedTypeItem = (
        <Breadcrumb.Item active>
          Type {selectedType}
        </Breadcrumb.Item>
      );
    }

    return (
      <Breadcrumb>
        <Breadcrumb.Item active={!isTypeSelected}>
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
