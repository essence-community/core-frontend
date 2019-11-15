// @flow
import * as React from "react";
import {compose} from "recompose";
import {ButtonBase, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
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

export class FileRecordBase extends React.PureComponent<PropsType & WithT> {
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
        // eslint-disable-next-line id-length
        const {classes = {}, record, t} = this.props;
        let labelString = " ";

        if (record.cvDdName) {
            labelString = record.cvDdName;
        }
        if (record.cvNumber) {
            labelString += ` №${record.cvNumber}`;
        }
        if (record.cdDate) {
            labelString += ` ${t("1f560294a2a446c4a23fb3f9d7f94dc6")} ${moment(record.cdDate).format("DD.MM.YYYY")}`;
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
                                    confirmquestion: `${t("b711be91555b46bab25971b7da959653")} "${record.cvFileName}"?`,
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

export default compose(
    withTranslation("meta"),
    withStyles(styles),
)(FileRecordBase);
