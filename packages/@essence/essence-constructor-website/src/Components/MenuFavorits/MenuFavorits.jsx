// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Scrollbars} from "@essence/essence-constructor-components";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import MenuFavoritsItem from "./MenuFavoritsItem";
import styles from "./MenuFavoritsStyles";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type OwnPropsType = {
    classes?: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

const MenuFavorits = ({applicationStore: {routesStore, pagesStore}, classes = {}}: PropsType) => {
    const {favorits, recordsStore} = routesStore;

    return (
        <Scrollbars>
            <Grid container direction="column" className={classes.root} wrap="nowrap">
                {recordsStore.records.map((record) => (
                    <MenuFavoritsItem
                        favorits={favorits}
                        classes={classes}
                        route={record}
                        routesStore={routesStore}
                        key={record.ckId}
                        pagesStore={pagesStore}
                    />
                ))}
            </Grid>
        </Scrollbars>
    );
};

export default compose(
    inject(mapStoresToProps),
    withStyles(styles),
)(MenuFavorits);
