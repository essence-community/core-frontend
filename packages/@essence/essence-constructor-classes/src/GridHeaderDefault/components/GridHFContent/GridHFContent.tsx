import * as React from "react";
import {Grid} from "@mui/material";
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
                <Grid>
                    <Icon iconfont="search" className={classes.contentSearch} />
                </Grid>
                <Grid size="grow">
                    <Component {...props} />
                </Grid>
            </Grid>
        );
    }

    return null;
};
