export default function createMiddleware(browserStorage, stateSelector) {
  return store => next => action => {
    const beforeState = stateSelector(store.getState());
    const output = next(action);
    const afterState = stateSelector(store.getState());
    if (beforeState !== afterState) {
      browserStorage.write(afterState);
    }
    return output;
  };
}
