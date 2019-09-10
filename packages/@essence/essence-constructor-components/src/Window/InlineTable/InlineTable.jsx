// @flow
import * as React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table/Table";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/core/styles";
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
    static contextTypes = {
        form: PropTypes.object,
    };

    render() {
        const {pageStore, store, classes, theme = {}, gridStore} = this.props;
        const {form} = this.context;
        const isNew = store.config.mode === "1" || store.config.mode === "6";
        const top = isNew ? 0 : gridStore.recordsStore.selectedRecordIndex * theme.sizing.gridRowHeight;

        return (
            <form style={{top}} className={isNew ? undefined : classes.inlineRoot} onSubmit={form.onSubmit}>
                <button type="submit" name="save" className={classes.hidden} />
                <Focusable>
                    <Table className={classes.inlineTable} data-page-object={`${store.windowBc.ckPageObject}-table`}>
                        <GridColgroup store={gridStore} />
                        <TableBody>
                            <GridRow
                                bc={gridStore.bc}
                                index={0}
                                indexStripe={false}
                                store={gridStore}
                                pageStore={pageStore}
                                record={gridStore.recordsStore.selectedRecrodValues}
                                disableSelect
                            >
                                {store.childs.map((field) => (
                                    <td
                                        key={field.ckPageObject}
                                        className={classes.tableCell}
                                        style={{width: WIDTH_MAP[field.datatype]}}
                                        data-page-object={`${field.ckPageObject}-cell`}
                                    >
                                        {Boolean(checkEditable(store.config.mode, field.editmode)) && (
                                            <BuilderField
                                                bc={field}
                                                noLabel={field.datatype === "boolean" || field.datatype === "checkbox"}
                                                pageStore={pageStore}
                                                visible
                                            />
                                        )}
                                    </td>
                                ))}
                            </GridRow>
                        </TableBody>
                    </Table>
                </Focusable>
            </form>
        );
    }
}

export default withStyles(styles, {withTheme: true})(InlineTable);
