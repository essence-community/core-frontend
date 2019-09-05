// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import {toColumnStyleWidth, camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
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
    form?: Object,
    record?: Object,
|};

type StateType = {
    validation?: Function,
    BuilderField?: string,
    endAdornment?: React.Node,
};

const MAX_PANEL_WIDTH = 12;

class PrivateBuilderFieldSet extends React.Component<PropsType, StateType> {
    static contextTypes = {
        form: PropTypes.object,
    };

    static childContextTypes = {
        mode: PropTypes.string,
    };

    getChildContext() {
        return {
            mode: "1",
        };
    }

    fieldSetName: string;

    constructor(props: PropsType, context: any) {
        super(props, context);

        const {bc} = this.props;

        this.fieldSetName = camelCaseMemoized(bc.column);

        // В componentDidMount нельзя, т.к. нужно гарантировать последовательность добавления сверхну в низ
        if (bc.column && this.getForm()) {
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
                // TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                const field = form.select(parentKey.replace(/fieldSetObj_/gi, ""), null, false);

                if (field) {
                    field.fields.delete(this.fieldSetName);
                }
            }
        }
    }

    getForm = () => this.props.form || this.context.form;

    addField = (props: PropsType) => {
        const form = this.getForm();
        const {bc, parentKey} = props;

        if (!isEmpty(this.fieldSetName) && form) {
            let field = null;

            if (!isEmpty(parentKey)) {
                // TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                field = form.select(parentKey.replace(/fieldSetObj_/gi, ""), null, false);
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
            <Grid container spacing={16} direction={isRow ? "row" : "column"} wrap={isRow ? "nowrap" : "wrap"}>
                {mapComponents(bc.childs || [], (ChildComp, child, index) => {
                    const key = isEmpty(parentKey)
                        ? `fieldSetObj_${this.fieldSetName}`
                        : `${parentKey}.${this.fieldSetName}`;

                    return (
                        <Grid
                            item
                            key={child.ckPageObject ? child.ckPageObject : `child_${index}`}
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
        );
    }
}

const BuilderFieldSet = commonDecorator(PrivateBuilderFieldSet);

setComponent("FIELDSET", BuilderFieldSet);

export default BuilderFieldSet;
