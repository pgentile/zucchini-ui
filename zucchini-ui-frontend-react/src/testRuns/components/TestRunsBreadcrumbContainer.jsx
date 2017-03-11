import { connect } from 'react-redux';
import { createSelector } from 'reselect';

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


const TestRunsBreadcrumbContainer = connect(
  (state, ownProps) => ({
    items: selectBreadcumbItems(state, ownProps),
  }),
)(Breadcrumb);

export default TestRunsBreadcrumbContainer;
