import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
} from "@essence/essence-constructor-share/constants/variables";
import {IFavoritePageProps} from "./FavoritePage.types";
import {useStyles} from "./FavoritePage.styles";

export const FavoritePage: React.FC<IFavoritePageProps> = (props) => {
    const classes = useStyles(props);
    const {route, routesStore, pagesStore} = props;
    const ckId = route[VAR_RECORD_ID];
    const cvIconName = route[VAR_RECORD_ICON_NAME];
    const cvName = route[VAR_RECORD_ROUTE_NAME];
    const handleRemoveFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        routesStore.setFavoritsAction(ckId);
    };

    const handleClickMenu = () => {
        pagesStore.setPageAction(ckId, true);
    };

    return (
        <Grid item className={classes.menuRoot} onClick={handleClickMenu}>
            <Grid container spacing={1} wrap="nowrap" alignItems="center" className={classes.menuContainer}>
                <Grid item className={classes.iconRoot}>
                    {cvIconName ? <Icon iconfont={cvIconName} size="lg" /> : null}
                </Grid>
                <Grid item className={classes.iconRemove} onClick={handleRemoveFavorite}>
                    <Icon iconfont="times" size="lg" />
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="inherit" noWrap className={classes.nameTypography}>
                        {cvName}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
