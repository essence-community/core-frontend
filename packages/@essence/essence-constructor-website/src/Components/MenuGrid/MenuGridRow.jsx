// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {
    VAR_RECORD_ID,
    VAR_RECORD_LEAF,
    VAR_RECORD_NAME,
    VAR_RECORD_ICON_NAME,
} from "@essence/essence-constructor-share/constants";
import styles from "./MenuGridRowStyles";

type PropsType = WithT & {|
    route: {
        ck_id: string | number,
        cv_name: string,
        cv_icon_name?: string,
        leaf: "true" | "false",
    },
    pagesStore: {
        activePage?: {
            pageId: string,
        },
        setPageAction: (ckId: string | number) => void,
    },
    routesStore: any,
    level: number,
    isOpen: boolean,
    classes?: Object,
|};

const LEFT_PADDING = 30;

class MenuGridRow extends React.Component<PropsType> {
    handleClick = () => {
        const {route} = this.props;

        if (route[VAR_RECORD_LEAF] === "true") {
            this.props.pagesStore.setPageAction(route[VAR_RECORD_ID]);
        } else {
            this.props.routesStore.openCloseExpansionAction(route[VAR_RECORD_ID]);
        }
    };

    handleToggleFavorit = (event: SyntheticEvent<>) => {
        const {route} = this.props;

        event.stopPropagation();

        if (route[VAR_RECORD_LEAF] === "true") {
            this.props.routesStore.setFavoritsAction(route[VAR_RECORD_ID]);
        }
    };

    renderIcon() {
        const {route, classes = {}} = this.props;

        return (
            <Grid item className={classes.iconRoot}>
                <Icon iconfont={route[VAR_RECORD_ICON_NAME]} size="lg" iconfontname="fa" />
            </Grid>
        );
    }

    renderFolderIcon() {
        const {isOpen, classes = {}} = this.props;

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
    }

    render() {
        // eslint-disable-next-line id-length
        const {route, level, classes = {}, routesStore, t} = this.props;
        const {favorits} = routesStore;
        const translatedName = t(route[VAR_RECORD_NAME]);

        return (
            <div className={cn(classes.root)} style={{paddingLeft: level * LEFT_PADDING}} onClick={this.handleClick}>
                <Grid container wrap="nowrap" spacing={1} alignItems="center" className={classes.rootGrid}>
                    {route[VAR_RECORD_LEAF] === "true" ? this.renderIcon() : this.renderFolderIcon()}
                    <Grid item xs zeroMinWidth>
                        <Typography
                            variant="body2"
                            color="inherit"
                            noWrap
                            data-qtip={translatedName}
                            className={classes.nameTypography}
                        >
                            {translatedName}
                        </Typography>
                    </Grid>
                </Grid>
                {route[VAR_RECORD_LEAF] === "true" ? (
                    <div
                        className={cn(classes.favoriteRoot, {
                            [classes.favoriteSelected]: favorits.get(route[VAR_RECORD_ID]),
                        })}
                        onClick={this.handleToggleFavorit}
                    >
                        <Icon iconfont={favorits.get(route[VAR_RECORD_ID]) ? "star" : "star-o"} size="xs" />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default compose(withStyles(styles), withTranslation("meta"), observer)(MenuGridRow);
