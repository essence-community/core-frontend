import {IClassProps} from "@essence/essence-constructor-share";
import {Divider} from "@material-ui/core";
import * as React from "react";
import {useStyles} from "./ButtonGroupDelimiter.styles";

export const ButtonGroupDelimiter = (props: IClassProps) => {
    const classes = useStyles(props);
    const {
        bc: {contentview},
    } = props;

    return <Divider className={contentview === "hbox" ? classes.hbox : classes.vbox} />;
};
