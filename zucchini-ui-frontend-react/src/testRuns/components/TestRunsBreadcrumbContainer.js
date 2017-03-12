import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import Breadcrumb from '../../ui/components/Breadcrumb';


const selectBreadcumbItems = createSelector(
  (state, ownProps) => ownProps.location.query.type || null,
  selectedType => {
    const items = [
      {
        value: 'Derniers tirs',
        link: '/',
      }
    ];

    if (selectedType) {
      items.push({
        value: `Type ${selectedType}`,
        link: { pathname: '/', query: { type: selectedType } }
      });
    }

    return items;
  },
);

const selectProps = createStructuredSelector({
  items: selectBreadcumbItems,
});


const TestRunsBreadcrumbContainer = connect(
  selectProps,
)(Breadcrumb);

export default TestRunsBreadcrumbContainer;
