// @flow
import * as React from "react";
import {observer} from "mobx-react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Icon} from "@essence/essence-constructor-share/Icon";

type PropsType = {|
    classes?: Object,
    route: {
        ckId: string | number,
        cvName: string,
        cvIconName: string,
    },
    routesStore: Object,
    pagesStore: any,
    favorits: any,
|};

class MenuFavoritsItem extends React.Component<PropsType> {
    handleRemoveFavorite = (event: SyntheticEvent<>) => {
        const {
            route: {ckId},
            routesStore,
        } = this.props;

        event.stopPropagation();

        routesStore.setFavoritsAction(ckId);
    };

    handleClickMenu = () => {
        const {
            route: {ckId},
        } = this.props;

        this.props.pagesStore.setPageAction(ckId);
    };

    render() {
        const {
            route: {cvIconName, cvName, ckId},
            favorits,
            classes = {},
        } = this.props;

        if (!favorits.get(ckId)) {
            return null;
        }

        return (
            <Grid item className={classes.menuRoot} onClick={this.handleClickMenu}>
                <Grid container spacing={8} wrap="nowrap" alignItems="center" className={classes.menuContainer}>
                    <Grid item className={classes.iconRoot}>
                        {cvIconName ? <Icon iconfont={cvIconName} size="lg" /> : null}
                    </Grid>
                    <Grid item className={classes.iconRemove} onClick={this.handleRemoveFavorite}>
                        <Icon iconfont="times" size="lg" />
                    </Grid>
                    <Grid item>
                        <Typography color="inherit" noWrap className={classes.nameTypography}>
                            {cvName}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default observer(MenuFavoritsItem);
