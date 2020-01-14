// @flow
import * as React from "react";
import {compose} from "recompose";
import {ButtonBase, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_FILENAME,
    VAR_RECORD_CV_DD_NAME,
    VAR_RECORD_CV_NUMBER,
    VAR_RECORD_CD_DATE,
} from "@essence/essence-constructor-share/constants";
import moment from "moment";
import {downloadFile} from "@essence/essence-constructor-share/utils/download";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {type PageModelType} from "../../stores/PageModel";
import {type FilePanelBcType, type FilePanelModelType} from "../../stores/FilePanelModel";
import styles from "./FileRecordStyles";

type PropsType = {
    store: FilePanelModelType,
    pageStore: PageModelType,
    bc: FilePanelBcType,
    record: {
        ck_id: string,
        cv_file_name: string,
        cv_dd_name?: string,
        cv_number?: string,
        cd_date?: string,
    },
    classes?: Object,
    disabled?: boolean,
    readOnly?: boolean,
};

export class FileRecordBase extends React.PureComponent<PropsType & WithT> {
    handleDownloadFile = () => {
        const {record, store} = this.props;
        const queryParams = store.getDownloadQueryParams(record[VAR_RECORD_ID]);

        downloadFile(record[VAR_RECORD_CV_FILENAME], queryParams);
    };

    handlePerformData = () => ({
        values: this.props.record,
    });

    handleClickClearButton = (event: SyntheticEvent<>) => {
        event.stopPropagation();
    };

    getLabelInfo = () => {
        // eslint-disable-next-line id-length
        const {classes = {}, record, t} = this.props;
        let labelString = " ";

        if (record[VAR_RECORD_CV_DD_NAME]) {
            labelString = record[VAR_RECORD_CV_DD_NAME];
        }
        if (record[VAR_RECORD_CV_NUMBER]) {
            labelString += ` №${record[VAR_RECORD_CV_NUMBER]}`;
        }
        if (record[VAR_RECORD_CD_DATE]) {
            labelString += ` ${t("static:1f560294a2a446c4a23fb3f9d7f94dc6")} ${moment(
                record[VAR_RECORD_CD_DATE],
            ).format("DD.MM.YYYY")}`;
        }

        return <span className={classes.lableRoot}>{t(labelString)}</span>;
    };

    render() {
        // eslint-disable-next-line id-length
        const {record, classes = {}, store, bc, readOnly, disabled, pageStore, t} = this.props;
        const startAdornment = (
            <ButtonBase className={classes.adornment} disabled disableRipple>
                <Icon iconfont="file" iconfontname="fa" size="lg" />
            </ButtonBase>
        );

        return (
            <TextField
                label={this.getLabelInfo()}
                value={record[VAR_RECORD_CV_FILENAME]}
                disabled
                fullWidth
                data-qtip={record[VAR_RECORD_CV_FILENAME]}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-record-${record[VAR_RECORD_ID]}`}
                className={classes.inputRoot}
                InputProps={{
                    endAdornment: (
                        <div onClick={this.handleClickClearButton}>
                            <BuilderMobxButton
                                className={classes.clearButton}
                                pageStore={pageStore}
                                bc={{
                                    confirmquestion: `${t("static:b711be91555b46bab25971b7da959653")} "${
                                        record[VAR_RECORD_CV_FILENAME]
                                    }"?`,
                                    ...store.btnsConfig.overrides["Override Delete Button"],
                                }}
                                disabled={readOnly || disabled}
                                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-remove-${record[VAR_RECORD_ID]}`}
                                visible
                                performData={this.handlePerformData}
                            />
                        </div>
                    ),
                    startAdornment,
                }}
                InputLabelProps={{
                    className: classes.formLabelRoot,
                    classes: {
                        shrink: classes.srinkedDocLabel,
                    },
                }}
                onClick={this.handleDownloadFile}
            />
        );
    }
}

export default compose(withTranslation("meta"), withStyles(styles))(FileRecordBase);
