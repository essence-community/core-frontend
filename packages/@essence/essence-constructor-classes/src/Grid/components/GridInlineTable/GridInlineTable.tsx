import * as React from "react";
import {IClassProps, IEssenceTheme, IBuilderMode} from "@essence-community/constructor-share/types";
import {Focusable} from "@essence-community/constructor-share/uicomponents";
import {Table, TableBody, useTheme} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {GridColgroup} from "../GridColgroup";
import {checkEditable} from "../../utils";
import {useStyles} from "./GridInlineTable.styles";

const WIDTH_MAP = {
    action: 30,
    detail: 30,
    icon: 30,
};

interface IGridInlineTable extends IClassProps {
    gridStore: IGridModel;
}

export const GridInlineTable: React.FC<IGridInlineTable> = ({gridStore, ...classProps}) => {
    const {bc} = classProps;
    const theme: IEssenceTheme = useTheme();
    const formCtx = React.useContext(FormContext);
    const classes = useStyles();

    // Duplicate data-qtip from visible column
    const getQtip = (idx: number) => {
        try {
            // @ts-ignore
            return gridStore.refs
                .get("body")
                .children[gridStore.recordsStore.selectedRecordIndex].children[idx].children[0].getAttribute(
                    "data-qtip",
                );
        } catch {
            return "";
        }
    };

    const isNew = bc.mode === "1" || bc.mode === "6";
    const top = isNew ? 0 : gridStore.recordsStore.selectedRecordIndex * theme.essence.sizing.gridRowHeight;

    return (
        <form style={{top}} className={isNew ? undefined : classes.inlineRoot} onSubmit={formCtx.onSubmit}>
            <button type="submit" name="save" className={classes.hidden} />
            <Focusable>
                <Table className={classes.inlineTable} data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-table`}>
                    <GridColgroup store={gridStore} />
                    <TableBody>
                        <tr className={classes.row} tabIndex={-1}>
                            {mapComponents(bc.childs, (ChildCmp, childBc, idx) => {
                                const isEditable = Boolean(checkEditable(bc.mode as IBuilderMode, childBc.editmode));
                                const fieldBc =
                                    childBc.datatype === "boolean" || childBc.datatype === "checkbox"
                                        ? {...childBc, [VAR_RECORD_DISPLAYED]: undefined}
                                        : childBc;

                                return (
                                    <td
                                        key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                        className={classes.tableCell}
                                        style={{width: WIDTH_MAP[childBc.datatype as keyof typeof WIDTH_MAP]}}
                                        data-page-object={`${childBc[VAR_RECORD_PAGE_OBJECT_ID]}-cell`}
                                        data-qtip={isEditable || isNew ? undefined : getQtip(idx)}
                                    >
                                        {isEditable && <ChildCmp {...classProps} bc={fieldBc} />}
                                    </td>
                                );
                            })}
                        </tr>
                    </TableBody>
                </Table>
            </Focusable>
        </form>
    );
};
