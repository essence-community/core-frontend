/* eslint-disable jsx-a11y/href-no-hash */
import createHistory from "history/createBrowserHistory";

const basename = process.env.REACT_APP_PUBLIC_URL || "";

export const history = createHistory({basename});
