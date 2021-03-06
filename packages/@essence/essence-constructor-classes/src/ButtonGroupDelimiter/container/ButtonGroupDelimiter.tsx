import {IClassProps} from "@essence-community/constructor-share";
import {Divider} from "@material-ui/core";
import * as React from "react";
import {useStyles} from "./ButtonGroupDelimiter.styles";

export const ButtonGroupDelimiter: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const {
        bc: {contentview},
    } = props;

    return <Divider className={contentview === "hbox" ? classes.hbox : classes.vbox} />;
};
