import {default as scenariosApi} from '../api/scenarios';


export function getTestRunFailures({testRunId}) {
  return scenariosApi.getFailures({testRunId});
}
