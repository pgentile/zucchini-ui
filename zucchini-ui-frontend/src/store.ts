import { configureStore } from "@reduxjs/toolkit";
import freezeMiddleware from "redux-freeze";

import reducer from "./reducer";
import featureFiltersStorage from "./filters/featureFiltersStorage";
import statsDashboardFiltersStorage from "./filters/statsDashboardFiltersStorage";
import historyFiltersStorage from "./filters/historyFiltersStorage";
import scenarioFiltersStorage from "./filters/scenarioFiltersStorage";
import stepFiltersStorage from "./filters/stepFiltersStorage";
import { default as createStorageMiddleware } from "./browserStorage/createMiddleware";
import { default as createWebSocketMiddleware } from "./websocket/createMiddleware";

declare const process: { env: { NODE_ENV?: string } };

const customMiddlewares = [
  createWebSocketMiddleware("PRESENCE"),
  createStorageMiddleware(featureFiltersStorage, (state) => state.featureFilters),
  createStorageMiddleware(statsDashboardFiltersStorage, (state) => state.statsDashboardFilters),
  createStorageMiddleware(historyFiltersStorage, (state) => state.historyFilters),
  createStorageMiddleware(scenarioFiltersStorage, (state) => state.scenarioFilters),
  createStorageMiddleware(stepFiltersStorage, (state) => state.stepFilters)
];

const useFreezeMiddleware = process.env.NODE_ENV !== "production";

if (useFreezeMiddleware) {
  // eslint-disable-next-line no-console
  console.info("%c ❄️ Using the freeze middleware. Bad mutable store updates will be detected!", "font-weight: bold");
}

const store = configureStore({
  reducer,
  preloadedState: {},
  devTools: useFreezeMiddleware,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).prepend(...customMiddlewares);

    return useFreezeMiddleware ? middleware.concat(freezeMiddleware) : middleware;
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
