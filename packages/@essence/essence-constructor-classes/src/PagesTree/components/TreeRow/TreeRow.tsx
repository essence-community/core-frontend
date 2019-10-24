import {Icon} from "@essence/essence-constructor-share";
import {Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./TreeRow.styles";
import {ITreeRowProps} from "./TreeRow.types";

const LEFT_PADDING = 30;

export const TreeRow: React.FC<ITreeRowProps> = (props) => {
    const classes = useStyles(props);
    const {pagesStore, routesStore, route, isOpen, level, treeModel} = props;
    const handleClick = () => {
        const {leaf, ckId} = route;

        if (leaf === "true") {
            pagesStore.setPageAction(ckId, true);
        } else {
            treeModel.openCloseExpansionAction(ckId);
        }
    };

    const handleToggleFavorit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {leaf, ckId} = route;

        event.stopPropagation();

        if (leaf === "true") {
            routesStore.setFavoritsAction(ckId);
        }
    };

    const renderIcon = () => {
        const {cvIconName} = route;

        return (
            <Grid item className={classes.iconRoot}>
                {cvIconName ? <Icon iconfont={cvIconName} size="lg" iconfontname="fa" /> : null}
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

        return (
            <div className={clsx(classes.root)} style={{paddingLeft: level * LEFT_PADDING}} onClick={handleClick}>
                <Grid container wrap="nowrap" spacing={1} alignItems="center" className={classes.rootGrid}>
                    {route.leaf === "true" ? renderIcon() : renderFolderIcon()}
                    <Grid item xs zeroMinWidth>
                        <Typography
                            variant="body2"
                            color="inherit"
                            noWrap
                            data-qtip={route.cvName}
                            className={classes.nameTypography}
                        >
                            {route.cvName}
                        </Typography>
                    </Grid>
                </Grid>
                {route.leaf === "true" ? (
                    <div
                        className={clsx(classes.favoriteRoot, {
                            [classes.favoriteSelected]: favorits.get(route.ckId),
                        })}
                        onClick={handleToggleFavorit}
                    >
                        <Icon iconfont={favorits.get(route.ckId) ? "star" : "star-o"} size="xs" />
                    </div>
                ) : null}
            </div>
        );
    });
};
