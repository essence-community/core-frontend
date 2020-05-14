import * as React from "react";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useStyles} from "./GridWarning.styles";

export const GridWarning: React.FC = () => {
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    return <div className={classes.warning}>{trans("static:40dd53ff1c214bfab79ecd40612de8f5")}</div>;
};
