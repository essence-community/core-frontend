import * as React from "react";
import {Grid} from "@material-ui/core";
import {IClassProps} from "@essence-community/constructor-share/types";
import {getComponent} from "@essence-community/constructor-share/components";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useStyles} from "./GridHFContent.styles";

export const GridHFContent: React.FC<IClassProps> = (props) => {
    const classes = useStyles();
    const {bc} = props;
    const Component = React.useMemo(
        () => getComponent(`${bc.type}.${bc.datatype?.toUpperCase()}`) || getComponent(`${bc.type}.DEFAULT`),
        [bc],
    );

    if (Component) {
        return (
            <Grid container className={classes.content} wrap="nowrap">
                <Grid item>
                    <Icon iconfont="search" className={classes.contentSearch} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Component {...props} />
                </Grid>
            </Grid>
        );
    }

    return null;
};
