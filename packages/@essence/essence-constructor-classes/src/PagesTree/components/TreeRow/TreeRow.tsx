import {Icon} from "@essence/essence-constructor-share";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_LEAF,
} from "@essence/essence-constructor-share/constants/variables";
import {useTranslation} from "@essence/essence-constructor-share/utils";
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
    const leaf = route[VAR_RECORD_LEAF];
    const id = route[VAR_RECORD_ID];
    const [trans] = useTranslation("meta");
    const name = trans(route[VAR_RECORD_ROUTE_NAME]);
    const iconName = route[VAR_RECORD_ICON_NAME];
    const handleClick = () => {
        if (leaf === "true") {
            pagesStore.setPageAction(id, true);
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
                {iconName ? <Icon iconfont={iconName} size="lg" iconfontname="fa" /> : null}
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
            <div className={classes.root} style={{paddingLeft: level * LEFT_PADDING}} onClick={handleClick}>
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
