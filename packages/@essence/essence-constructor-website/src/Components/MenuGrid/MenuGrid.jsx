// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Scrollbars} from "@essence-community/constructor-components";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import MenuGridRows from "./MenuGridRows";
import styles from "./MenuGridStyles";

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

const MenuGrid = ({applicationStore: {routesStore, pagesStore}, classes = {}}: PropsType) => (
    <Scrollbars withRequestAnimationFrame>
        <MenuGridRows
            className={classes.menuGridRows}
            parentId={null}
            routesStore={routesStore}
            pagesStore={pagesStore}
            level={0}
        />
    </Scrollbars>
);

export default compose(inject(mapStoresToProps), withStyles(styles), observer)(MenuGrid);
