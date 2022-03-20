import {Icon, settingsStore} from "@essence-community/constructor-share";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_LEAF,
    VAR_RECORD_APP_URL,
    VAR_RECORD_ICON_FONT,
    VAR_SETTING_BASE_PATH,
} from "@essence-community/constructor-share/constants/variables";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react";
import * as React from "react";
import {useStyles} from "./TreeRow.styles";
import {ITreeRowProps} from "./TreeRow.types";

const LEFT_PADDING = 30;

export const TreeRow: React.FC<ITreeRowProps> = (props) => {
    const classes = useStyles(props);
    const {pagesStore, routesStore, route, isOpen, level, treeModel} = props;
    const leaf = route[VAR_RECORD_LEAF];
    const id = route[VAR_RECORD_ID];
    const [trans] = useTranslation("meta");
    const name = trans(route[VAR_RECORD_ROUTE_NAME]);
    const icon = React.useMemo(
        () => ({font: route[VAR_RECORD_ICON_FONT] || "fa", name: route[VAR_RECORD_ICON_NAME] || "file-text"}),
        [route],
    );
    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (leaf === "true") {
            if (route[VAR_RECORD_APP_URL] !== pagesStore.applicationStore.url) {
                pagesStore.applicationStore.history.push(`/${route[VAR_RECORD_APP_URL]}/${id}`);
            } else {
                pagesStore.setPageAction(id, false);
            }
        } else {
            treeModel.openCloseExpansionAction(id);
        }
    };

    const handleToggleFavorite = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        if (leaf === "true") {
            routesStore.setFavoritsAction(id);
        }
    };

    const renderIcon = () => {
        return (
            <Grid item className={classes.iconRoot}>
                <Icon iconfont={icon.name} size="lg" iconfontname={icon.font as "fa" | "mdi"} />
            </Grid>
        );
    };

    const renderFolderIcon = () => {
        return (
            <React.Fragment>
                <Grid item className={classes.chevronRoot}>
                    <Icon iconfont={isOpen ? "caret-down" : "caret-right"} size="lg" />
                </Grid>
                <Grid item className={classes.folrderRoot}>
                    <Icon iconfont={isOpen ? "folder-open-o" : "folder-o"} size="lg" />
                </Grid>
            </React.Fragment>
        );
    };

    return useObserver(() => {
        const {favorits} = routesStore;
        const isFavorite = favorits.get(id);

        return (
            <div style={{paddingLeft: level * LEFT_PADDING}} className={classes.root} onClick={handleClick}>
                <a
                    href={`${settingsStore.settings[VAR_SETTING_BASE_PATH]}${route[VAR_RECORD_APP_URL]}/${id}`}
                    className={classes.link}
                    onClick={handleClick}
                >
                    <Grid container wrap="nowrap" spacing={1} alignItems="center" className={classes.rootGrid}>
                        {leaf === "true" ? renderIcon() : renderFolderIcon()}
                        <Grid item xs zeroMinWidth>
                            <Typography
                                variant="body2"
                                color="inherit"
                                noWrap
                                data-qtip={name}
                                className={classes.nameTypography}
                            >
                                {name}
                            </Typography>
                        </Grid>
                    </Grid>
                </a>
                {leaf === "true" ? (
                    <div
                        className={clsx(classes.favoriteRoot, {
                            [classes.favoriteSelected]: isFavorite,
                        })}
                        onClick={handleToggleFavorite}
                    >
                        <Icon iconfont={isFavorite ? "star" : "star-o"} size="xs" />
                    </div>
                ) : null}
            </div>
        );
    });
};
