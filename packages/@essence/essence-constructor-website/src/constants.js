/* eslint-disable jsx-a11y/href-no-hash */
import {getFromStore} from "@essence/essence-constructor-share/utils";

export const styleTheme = getFromStore("theme", "light");
export const commitId = process.env.REACT_APP_COMMIT_ID || "";
export const branchName = process.env.REACT_APP_BRANCH_NAME || "";
export const branchDateTime = process.env.REACT_APP_BRANCH_DATE_TIME || "";

export const colors = [
    "#FF6900",
    "#FCB900",
    "#7BDCB5",
    "#00D084",
    "#8ED1FC",
    "#0693E3",
    "#ABB8C3",
    "#EB144C",
    "#F78DA7",
    "#9900EF",
    "#000000",
    "#ff0000",
    "#0000ff",
    "#00ff00",
];
