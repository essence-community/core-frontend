import {useLocation} from "react-router-dom";
import {createBrowserHistory, History} from "history";

export const appHistory: History = createBrowserHistory();

/**
 * History из пакета `history` + подписка на навигацию (аналог useHistory из react-router v5).
 */
export function useAppHistory(): History {
    useLocation();

    return appHistory;
}
