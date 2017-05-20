import { connect } from 'react-redux';

import DeleteFeatureButton from './DeleteFeatureButton';
import { deleteFeatureThenRedirect } from '../redux';


const DeleteFeatureButtonContainer = connect(
  undefined,
  {
    onDelete: deleteFeatureThenRedirect,
  }
)(DeleteFeatureButton);

export default DeleteFeatureButtonContainer;
