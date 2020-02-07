// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Grid, Typography} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_ID, VAR_RECORD_NAME, VAR_RECORD_ICON_NAME} from "@essence-community/constructor-share/constants";

type PropsType = {|
    classes?: Object,
    route: {
        [VAR_RECORD_ID]: string | number,
        [VAR_RECORD_NAME]: string,
        [VAR_RECORD_ICON_NAME]: string,
    },
    routesStore: Object,
    pagesStore: any,
    favorits: any,
|} & WithT;

class MenuFavoritsItem extends React.Component<PropsType> {
    handleRemoveFavorite = (event: SyntheticEvent<>) => {
        const {route, routesStore} = this.props;

        event.stopPropagation();

        routesStore.setFavoritsAction(route[VAR_RECORD_ID]);
    };

    handleClickMenu = () => {
        const {route} = this.props;

        this.props.pagesStore.setPageAction(route[VAR_RECORD_ID]);
    };

    render() {
        const {route, favorits, classes = {}} = this.props;

        if (!favorits.get(route[VAR_RECORD_ID])) {
            return null;
        }

        const name = this.props.t(route[VAR_RECORD_NAME]);

        return (
            <Grid item className={classes.menuRoot} onClick={this.handleClickMenu} data-qtip={name}>
                <Grid container spacing={1} wrap="nowrap" alignItems="center" className={classes.menuContainer}>
                    <Grid item className={classes.iconRoot}>
                        {route[VAR_RECORD_ICON_NAME] ? <Icon iconfont={route[VAR_RECORD_ICON_NAME]} size="lg" /> : null}
                    </Grid>
                    <Grid item className={classes.iconRemove} onClick={this.handleRemoveFavorite}>
                        <Icon iconfont="times" size="lg" />
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="inherit" noWrap className={classes.nameTypography}>
                            {name}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withTranslation("meta")(observer(MenuFavoritsItem));
