// @flow
import * as React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import moment from "moment";
import {downloadFile} from "@essence/essence-constructor-share/utils/download";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {type PageModelType} from "../../stores/PageModel";
import {type FilePanelBcType, type FilePanelModelType} from "../../stores/FilePanelModel";
import styles from "./FileRecordStyles";

type PropsType = {
    store: FilePanelModelType,
    pageStore: PageModelType,
    bc: FilePanelBcType,
    record: {
        ckId: string,
        cvFileName: string,
        cvDdName?: string,
        cvNumber?: string,
        cdDate?: string,
    },
    classes?: Object,
    disabled?: boolean,
    readOnly?: boolean,
};

export class FileRecordBase extends React.PureComponent<PropsType> {
    handleDownloadFile = () => {
        const {record, store} = this.props;
        const queryParams = store.getDownloadQueryParams(record.ckId);

        downloadFile(record.cvFileName, queryParams);
    };

    handlePerformData = () => ({
        values: this.props.record,
    });

    handleClickClearButton = (event: SyntheticEvent<>) => {
        event.stopPropagation();
    };

    getLabelInfo = () => {
        const {classes = {}, record} = this.props;
        let labelString = " ";

        if (record.cvDdName) {
            labelString = record.cvDdName;
        }
        if (record.cvNumber) {
            labelString += ` №${record.cvNumber}`;
        }
        if (record.cdDate) {
            labelString += ` от ${moment(record.cdDate).format("DD.MM.YYYY")}`;
        }

        return <span className={classes.lableRoot}>{labelString}</span>;
    };

    render() {
        const {record, classes = {}, store, bc, readOnly, disabled, pageStore} = this.props;
        const startAdornment = (
            <ButtonBase className={classes.adornment} disabled disableRipple>
                <Icon iconfont="file" iconfontname="fa" size="lg" />
            </ButtonBase>
        );

        return (
            <TextField
                label={this.getLabelInfo()}
                value={record.cvFileName}
                disabled
                fullWidth
                data-qtip={record.cvFileName}
                data-page-object={`${bc.ckPageObject}-record-${record.ckId}`}
                className={classes.inputRoot}
                InputProps={{
                    endAdornment: (
                        <div onClick={this.handleClickClearButton}>
                            <BuilderMobxButton
                                className={classes.clearButton}
                                pageStore={pageStore}
                                bc={{
                                    confirmquestion: `Удалить файл "${record.cvFileName}"?`,
                                    ...store.btnsConfig.overrides["Override Delete Button"],
                                }}
                                disabled={readOnly || disabled}
                                data-page-object={`${bc.ckPageObject}-remove-${record.ckId}`}
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

export default withStyles(styles)(FileRecordBase);
