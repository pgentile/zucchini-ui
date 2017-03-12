import { push } from 'react-router-redux';


export function search({ search, testRunId }) {
  return push({
    pathname: `/test-runs/${testRunId}/search`,
    query: {
      search,
    },
  });
}
