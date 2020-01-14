import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
} from "@essence-community/constructor-share/constants/variables";
import {IFavoritePageProps} from "./FavoritePage.types";
import {useStyles} from "./FavoritePage.styles";

export const FavoritePage: React.FC<IFavoritePageProps> = (props) => {
    const classes = useStyles(props);
    const {route, routesStore, pagesStore} = props;
    const ckId = route[VAR_RECORD_ID];
    const routeIconName = route[VAR_RECORD_ICON_NAME];
    const routerName = route[VAR_RECORD_ROUTE_NAME];
    const handleRemoveFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        routesStore.setFavoritsAction(ckId);
    };

    const [trans] = useTranslation("meta");

    const handleClickMenu = () => {
        pagesStore.setPageAction(ckId, true);
    };

    return (
        <Grid item className={classes.menuRoot} data-qtip={trans(routerName)} onClick={handleClickMenu}>
            <Grid container spacing={1} wrap="nowrap" alignItems="center" className={classes.menuContainer}>
                <Grid item className={classes.iconRoot}>
                    {routeIconName ? <Icon iconfont={routeIconName} size="lg" /> : null}
                </Grid>
                <Grid item className={classes.iconRemove} onClick={handleRemoveFavorite}>
                    <Icon iconfont="times" size="lg" />
                </Grid>
                <Grid item>
                    <Typography variant="body2" color="inherit" noWrap className={classes.nameTypography}>
                        {trans(routerName)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
