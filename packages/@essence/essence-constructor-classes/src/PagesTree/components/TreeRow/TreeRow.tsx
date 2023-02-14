/* eslint-disable max-lines-per-function */
import {Icon, settingsStore} from "@essence-community/constructor-share";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_LEAF,
    VAR_RECORD_APP_URL,
    VAR_RECORD_ICON_FONT,
    VAR_SETTING_BASE_PATH,
    VAR_RECORD_ROUTE_VISIBLE_MENU,
    VAR_RECORD_PAGE_REDIRECT,
} from "@essence-community/constructor-share/constants/variables";
import {deepFind, makeRedirect, parseMemoize, useTranslation} from "@essence-community/constructor-share/utils";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react";
import * as React from "react";
import {reaction} from "mobx";
import {useStyles} from "./TreeRow.styles";
import {ITreeRowProps} from "./TreeRow.types";

const LEFT_PADDING = 30;

export const TreeRow: React.FC<ITreeRowProps> = (props) => {
    const classes = useStyles(props);
    const {pageStore, pagesStore, routesStore, route, isOpen, level, treeModel} = props;
    const leaf = route[VAR_RECORD_LEAF];
    const id = route[VAR_RECORD_ID];
    const [trans] = useTranslation("meta");
    const name = trans(route[VAR_RECORD_ROUTE_NAME]);
    const icon = React.useMemo(
        () => ({font: route[VAR_RECORD_ICON_FONT] || "fa", name: route[VAR_RECORD_ICON_NAME] || "file-text"}),
        [route],
    );

    React.useEffect(() => {
        const dispatcher = [];

        if (route.activerules || (typeof leaf === "boolean" ? !leaf : leaf !== "true")) {
            const getValue = (name: string) => {
                if (name.charAt(0) === "g") {
                    return pageStore.globalValues.get(name);
                }

                if (route) {
                    const [isExistRecord, recValue] = deepFind(route, name);

                    if (isExistRecord) {
                        return recValue;
                    }
                }

                return undefined;
            };

            dispatcher.push(
                reaction(
                    () => {
                        let result = false;

                        if (route.activerules) {
                            result = !(parseMemoize(route.activerules).runer({get: getValue}) as boolean);
                        }
                        if (!result && typeof leaf === "boolean" ? !leaf : leaf !== "true") {
                            result =
                                routesStore.recordsStore.records.filter(
                                    (record) =>
                                        record[routesStore.recordsStore.recordParentId] === id &&
                                        !treeModel.hiddenRecords.get(record[VAR_RECORD_ID] as any) &&
                                        record[VAR_RECORD_ROUTE_VISIBLE_MENU],
                                ).length === 0;
                        }

                        return result;
                    },
                    (isHidden) => treeModel.setHiddenAction(id, isHidden),
                    {
                        fireImmediately: true,
                    },
                ),
            );
        }

        return dispatcher.forEach((fn) => fn());
    }, [id, leaf, pageStore, route, routesStore, treeModel]);

    const handleClick = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (typeof leaf === "boolean" ? leaf : leaf === "true") {
            if (route[VAR_RECORD_PAGE_REDIRECT] || route.redirecturl) {
                makeRedirect(
                    {...route, redirecturl: route[VAR_RECORD_PAGE_REDIRECT] || route.redirecturl} as any,
                    pageStore,
                    route,
                );

                return;
            }
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

        if (typeof leaf === "boolean" ? leaf : leaf === "true") {
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

        if (treeModel.hiddenRecords.get(id)) {
            return null;
        }

        return (
            <div style={{paddingLeft: level * LEFT_PADDING}} className={classes.root} onClick={handleClick}>
                <a
                    href={`${settingsStore.settings[VAR_SETTING_BASE_PATH]}${route[VAR_RECORD_APP_URL]}/${id}`}
                    className={classes.link}
                    onClick={handleClick}
                >
                    <Grid container wrap="nowrap" spacing={1} alignItems="center" className={classes.rootGrid}>
                        {typeof leaf === "boolean" ? leaf : leaf === "true" ? renderIcon() : renderFolderIcon()}
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
                {typeof leaf === "boolean" ? (
                    leaf
                ) : leaf === "true" ? (
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
