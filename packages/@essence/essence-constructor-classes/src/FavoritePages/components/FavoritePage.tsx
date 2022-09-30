import * as React from "react";
import {Grid, Typography} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_APP_URL,
    VAR_RECORD_ICON_FONT,
    VAR_SETTING_BASE_PATH,
} from "@essence-community/constructor-share/constants/variables";
import {settingsStore} from "@essence-community/constructor-share/models";
import {IFavoritePageProps} from "./FavoritePage.types";
import {useStyles} from "./FavoritePage.styles";

export const FavoritePage: React.FC<IFavoritePageProps> = (props) => {
    const classes = useStyles(props);
    const {route, routesStore, pagesStore} = props;
    const ckId = route[VAR_RECORD_ID];
    const routeIconName = route[VAR_RECORD_ICON_NAME];
    const routeIconFont = (route[VAR_RECORD_ICON_FONT] as "fa" | "mdi") || "fa";
    const routerName = route[VAR_RECORD_ROUTE_NAME];
    const handleRemoveFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        routesStore.setFavoritsAction(ckId);
    };

    const [trans] = useTranslation("meta");

    const handleClickMenu = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (route[VAR_RECORD_APP_URL] !== pagesStore.applicationStore.url) {
            pagesStore.applicationStore.history.push(`/${route[VAR_RECORD_APP_URL]}/${ckId}`);
        } else {
            pagesStore.setPageAction(ckId, false);
        }
    };

    const name = trans(routerName);

    return (
        <a
            href={`${settingsStore.settings[VAR_SETTING_BASE_PATH]}${route[VAR_RECORD_APP_URL]}/${ckId}`}
            className={classes.linkMenu}
            onClick={handleClickMenu}
        >
            <Grid item className={classes.menuRoot} data-qtip={name}>
                <Grid container spacing={1} wrap="nowrap" alignItems="center" className={classes.menuContainer}>
                    <Grid item className={classes.iconRoot}>
                        {routeIconName ? (
                            <Icon iconfont={routeIconName} iconfontname={routeIconFont} size="lg" />
                        ) : null}
                    </Grid>
                    <Grid item className={classes.iconRemove} onClick={handleRemoveFavorite}>
                        <Icon iconfont="times" size="lg" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="inherit" noWrap className={classes.nameTypography}>
                            {name}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </a>
    );
};
