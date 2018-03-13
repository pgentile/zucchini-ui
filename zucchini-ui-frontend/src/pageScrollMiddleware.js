import { LOCATION_CHANGE } from 'react-router-redux';


export default function pageScrollMiddleware() {
  return store => next => action => { // eslint-disable-line no-unused-vars
    const output = next(action);

    if (action.type === LOCATION_CHANGE) {
      if (action.payload.action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    }

    return output;
  };
}
