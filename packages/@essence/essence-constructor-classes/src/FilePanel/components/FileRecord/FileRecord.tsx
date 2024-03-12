import {IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {ButtonBase, TextField} from "@material-ui/core";
import {useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_CV_FILENAME,
    VAR_RECORD_CV_DD_NAME,
    VAR_RECORD_CD_DATE,
    VAR_RECORD_CV_NUMBER,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import moment from "moment";
import React from "react";
import {RecordContext} from "@essence-community/constructor-share/context";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {Icon} from "@essence-community/constructor-share/Icon";
import {FilePanelModel} from "../../store/FilePanelModel";
import {useStyles} from "./FileRecord.styles";

export interface IFileRecordProps extends IClassProps {
    record: IRecord;
    store: FilePanelModel;
}
export const FileRecord: React.FC<IFileRecordProps> = (props) => {
    const {record, store, bc, readOnly, disabled, pageStore} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    const initDownBc = store.btnsConfig["Override Download Button"];
    const handleDownloadFile = React.useCallback(() => {
        store.recordsStore.downloadAction(
            record,
            (initDownBc.modeaction ||
                initDownBc.mode) as any,
            {
                actionBc: initDownBc,
                query: initDownBc.updatequery,
            },
        );
    }, [record, store]);

    const handleClickClearButton = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const getLabelInfo = React.useCallback(() => {
        let labelString = " ";

        if (record[VAR_RECORD_CV_DD_NAME]) {
            labelString = record[VAR_RECORD_CV_DD_NAME] as string;
        }
        if (record[VAR_RECORD_CV_NUMBER]) {
            labelString += ` №${record[VAR_RECORD_CV_NUMBER]}`;
        }
        if (record[VAR_RECORD_CD_DATE]) {
            labelString += ` ${toTranslateText(trans, "static:1f560294a2a446c4a23fb3f9d7f94dc6")} ${moment(
                record[VAR_RECORD_CD_DATE] as string,
            ).format("DD.MM.YYYY")}`;
        }

        return <span>{toTranslateText(trans, labelString)}</span>;
    }, [record, trans]);

    const displayed = initDownBc[VAR_RECORD_DISPLAYED];
    const qtip = initDownBc.tipmsg || displayed;

    const startAdornment = (
        <ButtonBase className={classes.adornment} onClick={handleDownloadFile} data-qtip={qtip ? trans(qtip) : ""}>
            <Icon iconfont={initDownBc.iconfont} iconfontname={initDownBc.iconfontname as "fa" | "mdi"} size={initDownBc.iconsize} />
        </ButtonBase>
    );

    const initalDelBc = store.btnsConfig["Override Delete Button"];
    const delBc = {
        confirmquestion: `${toTranslateText(trans, "static:b711be91555b46bab25971b7da959653")} "${
            record[VAR_RECORD_CV_FILENAME]
        }"?`,
        ...initalDelBc,
        // eslint-disable-next-line sort-keys
        [VAR_RECORD_PAGE_OBJECT_ID]: `${initalDelBc[VAR_RECORD_PAGE_OBJECT_ID]}-${record[VAR_RECORD_ID]}`,
    };

    return (
        <TextField
            label={getLabelInfo()}
            value={record[VAR_RECORD_CV_FILENAME]}
            disabled
            fullWidth
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-record-${record[VAR_RECORD_ID]}`}
            className={classes.inputRoot}
            InputProps={{
                endAdornment: (
                    <RecordContext.Provider value={record}>
                        <div onClick={handleClickClearButton} className={classes.clearButton}>
                            {mapComponentOne(delBc, (ChildCmp, childBc) => (
                                <ChildCmp
                                    key="del"
                                    bc={childBc}
                                    pageStore={pageStore}
                                    disabled={readOnly || disabled}
                                    visible
                                />
                            ))}
                        </div>
                    </RecordContext.Provider>
                ),
                startAdornment,
            }}
            InputLabelProps={{
                className: classes.formLabelRoot,
                classes: {
                    shrink: classes.srinkedDocLabel,
                },
            }}
        />
    );
};
