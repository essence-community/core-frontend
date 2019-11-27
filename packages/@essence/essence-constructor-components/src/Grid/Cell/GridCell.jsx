// @flow
import * as React from "react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {Translation} from "@essence/essence-constructor-share/utils";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {type GridBuilderType, type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import {WIDTH_MAP, PADDING_MAP} from "../BaseGridTableHeader";
import {columnsMap, BaseGridColumn} from "../GridColumn";
import {renderTip} from "../GridColumn/gridColumnHelpers";
import styles from "./GridCellStyles";

type PropsType = {
    bc: GridBuilderType,
    column: Object,
    classes: Object,
    disabled?: boolean,
    readOnly?: boolean,
    record: Object,
    pageStore: PageModelType,
    store: GridModelType,
    visible: boolean,
    nesting?: number,
};

class GridCell extends React.PureComponent<PropsType> {
    getClassName = () => {
        const {classes, column} = this.props;
        const {datatype, align} = column;
        const padding = PADDING_MAP[datatype] || "checkbox";
        const isAction = datatype === "icon" || datatype === "detail";

        return cn(classes.root, classes.body, {
            [classes.button]: isAction,
            [classes[`align-${align}`]]: align,
            [classes[`padding-${padding}`]]: padding,
        });
    };

    // eslint-disable-next-line max-statements
    render() {
        const {bc, column, classes, disabled, readOnly, record, pageStore, store, visible, nesting} = this.props;
        const {datatype, format} = column;
        const Cmp = columnsMap[datatype] || BaseGridColumn;
        const value = record[column.columnCamelCase];
        const qtip = renderTip(datatype, value, format);
        let style = {width: WIDTH_MAP[datatype]};

        if (column.stylerules) {
            style = {...style, ...parseMemoize(column.stylerules).runer(record)};
        }

        if (column.localization) {
            return (
                <Translation ns={column.localization} useSuspense={false}>
                    {(trans) => (
                        <td
                            style={style}
                            className={this.getClassName()}
                            data-qtip={trans(qtip)}
                            data-page-object={`${bc.ckPageObject}-column-datatype-${datatype}`}
                        >
                            <Cmp
                                bc={column}
                                value={value}
                                store={store}
                                gridBc={bc}
                                record={record}
                                pageStore={pageStore}
                                disabled={disabled}
                                readOnly={readOnly}
                                qtip={trans(qtip)}
                                visible={visible}
                                nesting={nesting}
                                className={classes.child}
                                trans={trans}
                            />
                        </td>
                    )}
                </Translation>
            );
        }

        return (
            <td
                style={style}
                className={this.getClassName()}
                data-qtip={qtip}
                data-page-object={`${bc.ckPageObject}-column-datatype-${datatype}`}
            >
                <Cmp
                    bc={column}
                    value={value}
                    store={store}
                    gridBc={bc}
                    record={record}
                    pageStore={pageStore}
                    disabled={disabled}
                    readOnly={readOnly}
                    qtip={qtip}
                    visible={visible}
                    nesting={nesting}
                    className={classes.child}
                />
            </td>
        );
    }
}

export default withStyles(styles)(GridCell);
