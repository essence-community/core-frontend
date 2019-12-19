// @flow
import * as React from "react";
import moment from "moment";
import {reaction} from "mobx";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_CV_VALUE} from "@essence/essence-constructor-share/constants";
import {isEmpty} from "../utils/base";
import {type BuilderModeType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";
import {DefaultRecordsModel, type DefaultRecordsModelType} from "../stores/DefaultRecordsModel";
import withModelDecorator from "../decorators/withModelDecorator";
import {type BuilderFieldType} from "./BuilderFieldType";
import {getFieldDate} from "./Fields/FieldDateRC/fieldDateHelpers";

type OwnType = {|
    bc: BuilderFieldType,
    mode: BuilderModeType,
    editing?: boolean,
    field: Object,
    pageStore: PageModelType,
    hidden?: boolean,
    disabled?: boolean,
|};

type PropsStoreType = {
    store: DefaultRecordsModelType,
};

type PropsType = PropsStoreType & OwnType;

type GetDateValueType = {|
    bc: BuilderFieldType,
    rec: Object,
|};

const getDateValue = ({bc, rec}: GetDateValueType) => {
    const dateConfig = getFieldDate(bc.format);
    const value = rec.ctDate;

    if (isEmpty(value)) {
        return "";
    }

    return bc.disabledenddate ? dateConfig.serverFormatEnd(value) : moment(value).format(dateConfig.serverFormat);
};

class TFDefaultValueQuery extends React.Component<PropsType> {
    disposers: Array<Function> = [];

    componentDidMount() {
        const {field, editing, mode, store} = this.props;

        if (editing && mode === "1" && !this.isRedirectWithMaster()) {
            this.loadDefaultValueQuery();
        }

        field.set("default", "defaultvaluequery");

        this.disposers.push(
            reaction(() => this.props.field.value, this.handleChangeFieldValue),
            reaction(() => store.recordsStore.records, this.handleChangeRecords),
        );
    }

    componentWillUnmount() {
        this.disposers.forEach((dispose) => dispose());
        this.disposers = [];
    }

    handleChangeFieldValue = (fieldValue: string) => {
        const {editing, field} = this.props;

        if (fieldValue === "defaultvaluequery" && !this.isRedirectWithMaster()) {
            if (editing) {
                this.loadDefaultValueQuery();
            } else {
                field.set("");
            }
        }
    };

    loadDefaultValueQuery = async () => {
        const {store} = this.props;

        if (!store.recordsStore.isLoading) {
            await store.recordsStore.loadRecordsAction();
        }
    };

    handleChangeRecords = (records: Array<Object>) => {
        const {field, bc} = this.props;
        const [rec] = records;

        if (rec) {
            if (bc.datatype === "date") {
                field.set(getDateValue({bc, rec}));
            } else {
                field.set(rec[VAR_RECORD_CV_VALUE]);
            }
        }
    };

    isRedirectWithMaster = () => this.props.pageStore.isActiveRedirect && this.props.bc[VAR_RECORD_MASTER_ID];

    render() {
        return null;
    }
}

export default withModelDecorator(
    (bc: BuilderFieldType, {pageStore}: PropsType): DefaultRecordsModelType => new DefaultRecordsModel({bc, pageStore}),
)(TFDefaultValueQuery);
