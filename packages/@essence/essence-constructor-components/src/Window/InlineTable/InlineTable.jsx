// @flow
import * as React from "react";
import {Table, TableBody} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {FormContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type WindowModelType} from "../../stores/WindowModel";
import {type PageModelType} from "../../stores/PageModel";
import {GridModel} from "../../stores/GridModel";
import {checkEditable} from "../../utils/access";
import Focusable from "../../Components/Focusable/Focusable";
import GridRow from "../../Grid/Row/GridRow";
import GridColgroup from "../../Grid/GridComponents/GridColgroup";
import BuilderField from "../../TextField/BuilderField";
import styles from "./InlineTableStyles";

type PropsType = {
    pageStore: PageModelType,
    store: WindowModelType,
    gridStore: GridModel,
    theme?: Object,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};

export const WIDTH_MAP = {
    action: 30,
    detail: 30,
    icon: 30,
};

class InlineTable extends React.PureComponent<PropsType> {
    static contextType = FormContext;

    // Duplicate data-qtip from visible column
    getQtip = (idx) => {
        const {gridStore} = this.props;

        try {
            return gridStore.refs
                .get("body")
                .children[gridStore.recordsStore.selectedRecordIndex].children[idx]?.children[0]?.getAttribute?.(
                    "data-qtip",
                );
        } catch {
            return "";
        }
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {pageStore, store, classes, theme = {}, gridStore} = this.props;
        const isNew = store.config.mode === "1" || store.config.mode === "6";
        const top = isNew ? 0 : gridStore.recordsStore.selectedRecordIndex * theme.sizing.gridRowHeight;

        return (
            <form style={{top}} className={isNew ? undefined : classes.inlineRoot} onSubmit={this.context.onSubmit}>
                <button type="submit" name="save" className={classes.hidden} />
                <Focusable>
                    <Table
                        className={classes.inlineTable}
                        data-page-object={`${store.windowBc[VAR_RECORD_PAGE_OBJECT_ID]}-table`}
                    >
                        <GridColgroup store={gridStore} />
                        <TableBody>
                            <GridRow
                                bc={gridStore.bc}
                                index={0}
                                indexStripe={false}
                                store={gridStore}
                                pageStore={pageStore}
                                record={gridStore.recordsStore.selectedRecordValues}
                                disableSelect
                            >
                                {store.childs.map((field, idx) => {
                                    const isEditable = Boolean(checkEditable(store.config.mode, field.editmode));

                                    return (
                                        <td
                                            key={field[VAR_RECORD_PAGE_OBJECT_ID]}
                                            className={classes.tableCell}
                                            style={{width: WIDTH_MAP[field.datatype]}}
                                            data-page-object={`${field[VAR_RECORD_PAGE_OBJECT_ID]}-cell`}
                                            data-qtip={isEditable || isNew ? undefined : this.getQtip(idx)}
                                        >
                                            {isEditable && (
                                                <BuilderField
                                                    bc={field}
                                                    noLabel={
                                                        field.datatype === "boolean" || field.datatype === "checkbox"
                                                    }
                                                    pageStore={pageStore}
                                                    visible
                                                />
                                            )}
                                        </td>
                                    );
                                })}
                            </GridRow>
                        </TableBody>
                    </Table>
                </Focusable>
            </form>
        );
    }
}

export default withStyles(styles, {withTheme: true})(InlineTable);
