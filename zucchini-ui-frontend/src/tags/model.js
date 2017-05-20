import { default as tagsApi } from '../api/tags';


export function getTags({ testRunId }) {
  return tagsApi.getTags({ testRunId });
}
