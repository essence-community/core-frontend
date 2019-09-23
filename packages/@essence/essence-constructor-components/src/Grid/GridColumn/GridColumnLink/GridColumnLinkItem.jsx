// @flow
import * as React from "react";
import forEach from "lodash/forEach";
import isUndefined from "lodash/isUndefined";
import {ListItem} from "@material-ui/core";
import {findSetKey} from "../../../utils/findKey";
import {type PageModelType} from "../../../stores/PageModel";
import commonDecorator from "../../../decorators/commonDecorator";
import {type GridColumnLinkType} from "../GridColumnTypes";

type PropsType = {|
    bc: GridColumnLinkType,
    classes: {
        listItemRoot: string,
    },
    onClosePopover: (event: SyntheticEvent<>) => void,
    pageStore: PageModelType,
    record?: Object,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
|};

class GridColumnLinkItem extends React.Component<PropsType> {
    static defaultProps = {
        record: {},
    };

    handleClickMenu = (event: SyntheticEvent<>) => {
        const {
            bc: {columnsfilter, redirecturl},
            pageStore: {globalValues, applicationStore},
            record = {},
            onClosePopover,
        } = this.props;

        const values = {};

        onClosePopover(event);

        if (columnsfilter) {
            const keys = findSetKey(columnsfilter);

            forEach(keys, (fieldName: string, globaleKey: string) => {
                const value = record[fieldName] || globalValues.get(fieldName);

                if (!isUndefined(value)) {
                    values[globaleKey] = value;
                }
            });
        }

        applicationStore.redirectToAction(redirecturl, values);
    };

    render() {
        const {bc, classes, hidden, disabled} = this.props;

        if (hidden) {
            return null;
        }

        return (
            <ListItem
                divider
                button
                className={classes.listItemRoot}
                onClick={this.handleClickMenu}
                data-page-object={bc.ckPageObject}
                disabled={disabled}
            >
                {bc.cvDisplayed}
            </ListItem>
        );
    }
}

export default commonDecorator(GridColumnLinkItem);
