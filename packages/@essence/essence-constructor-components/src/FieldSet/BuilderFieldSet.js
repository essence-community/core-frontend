// @flow
import * as React from "react";
import {Grid} from "@material-ui/core";
import isEmpty from "lodash/isEmpty";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {setComponent, mapComponents, FormContext} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type BuilderModeType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";
import commonDecorator from "../decorators/commonDecorator";
import {type BuilderFieldSetType} from "./BuilderFieldSetType";

type PropsType = {|
    bc: BuilderFieldSetType,
    parentKey?: string,
    editing?: boolean,
    pageStore: PageModelType,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
    form?: IForm,
    record?: Object,
|};

type StateEditorTypes = {
    form?: IForm,
    mode: BuilderModeType,
};

type StateType = {
    validation?: Function,
    BuilderField?: string,
    endAdornment?: React.Node,
    editor: StateEditorTypes,
};

const MAX_PANEL_WIDTH = 12;

class PrivateBuilderFieldSet extends React.Component<PropsType, StateType> {
    static contextType = FormContext;

    fieldSetName: string;

    constructor(...args: Array<*>) {
        super(...args);

        const {bc} = this.props;
        const form = this.getForm();

        this.fieldSetName = bc.column;

        // В componentDidMount нельзя, т.к. нужно гарантировать последовательность добавления сверхну в низ
        if (bc.column && form) {
            this.addField(this.props);
        }
    }

    // TODO: Не используется, нужно проверить, т.к. функционал может быть поломан
    componentDidUpdate() {
        const {parentKey, hidden} = this.props;
        const form = this.getForm();

        if (!isEmpty(this.fieldSetName) && !isEmpty(form)) {
            if (hidden && isEmpty(parentKey)) {
                form.fields.delete(this.fieldSetName);
            } else if (isEmpty(parentKey)) {
                this.addField(this.props);
            }
        }
    }

    componentWillUnmount() {
        const form = this.getForm();
        const {parentKey} = this.props;

        if (!isEmpty(this.fieldSetName) && !isEmpty(form)) {
            if (isEmpty(parentKey)) {
                form.fields.delete(this.fieldSetName);
            } else if (!isEmpty(parentKey)) {
                const field = form.select(parentKey.replace(/fieldSetObj_/giu, ""), null, false);

                if (field) {
                    field.fields.delete(this.fieldSetName);
                }
            }
        }
    }

    getForm = () => this.props.form || this.context;

    addField = (props: PropsType) => {
        const form = this.getForm();
        const {bc, parentKey} = props;

        if (!isEmpty(this.fieldSetName) && form) {
            let field = null;

            if (!isEmpty(parentKey)) {
                field = form.select(parentKey.replace(/fieldSetObj_/giu, ""), null, false);
            } else if (isEmpty(parentKey) && !form.has(this.fieldSetName)) {
                form.add({
                    key: this.fieldSetName,
                    options: {bc},
                });
            }

            if (field && !field.has(this.fieldSetName)) {
                field.add({
                    key: this.fieldSetName,
                    options: {bc, fieldSet: true},
                });
            }
        }
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const form = this.getForm();
        const {bc, parentKey, disabled, hidden, editing, readOnly, pageStore, visible} = this.props;
        const {contentview} = bc;

        const isRow = contentview === "hbox" || contentview === "column";

        if (!this.fieldSetName || !form) {
            return null;
        }

        if (hidden) {
            return null;
        }

        return (
            <FormContext.Provider value={form}>
                <Grid container spacing={2} direction={isRow ? "row" : "column"} wrap={isRow ? "nowrap" : "wrap"}>
                    {mapComponents(bc.childs || [], (ChildComp, child, index) => {
                        const key = isEmpty(parentKey)
                            ? `fieldSetObj_${this.fieldSetName}`
                            : `${parentKey}.${this.fieldSetName}`;

                        return (
                            <Grid
                                item
                                key={
                                    child[VAR_RECORD_PAGE_OBJECT_ID]
                                        ? child[VAR_RECORD_PAGE_OBJECT_ID]
                                        : `child_${index}`
                                }
                                xs={isRow ? true : MAX_PANEL_WIDTH}
                                style={contentview === "column" ? toColumnStyleWidth(child.width) : undefined}
                            >
                                <ChildComp
                                    bc={child}
                                    form={form}
                                    parentKey={key}
                                    editing={editing}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </FormContext.Provider>
        );
    }
}

const BuilderFieldSet = commonDecorator(PrivateBuilderFieldSet);

setComponent("FIELDSET", BuilderFieldSet);

export default BuilderFieldSet;
