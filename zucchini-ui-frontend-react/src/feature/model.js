import { default as featuresApi } from '../api/features';


export function getFeature({ featureId }) {
  return featuresApi.getFeature({ featureId });
}
