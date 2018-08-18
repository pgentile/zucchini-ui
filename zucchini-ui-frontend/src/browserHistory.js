import createBrowserHistory from "history/lib/createBrowserHistory";
import { useRouterHistory } from "react-router";

const createHistory = useRouterHistory(createBrowserHistory);

const browserHistory = createHistory({
  basename: configuration.basename
});

export default browserHistory;
