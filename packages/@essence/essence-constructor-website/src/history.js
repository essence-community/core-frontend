import {createBrowserHistory} from "history";

const basename = process.env.REACT_APP_PUBLIC_URL || "";

export const history = createBrowserHistory({basename});
