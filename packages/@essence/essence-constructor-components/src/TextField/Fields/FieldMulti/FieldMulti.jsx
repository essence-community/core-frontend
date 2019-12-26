// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {compose} from "recompose";
import last from "lodash/last";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Button} from "@material-ui/core";
import validatorjs from "validatorjs";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CK_AREA,
    VAR_RECORD_CK_STREET,
    VAR_RECORD_CK_HOUSE,
} from "@essence/essence-constructor-share/constants";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import BuilderMobxForm from "../../../Components/MobxForm/BuilderMobxForm";
import withModelDecorator from "../../../decorators/withModelDecorator";
import {AddrMultiField} from "../../../stores/AddrMultiField";
import {MoMultiField} from "../../../stores/MoMultiField";
import {type TextFieldChildProps, type BuilderFieldType} from "../../BuilderFieldType";
import BuilderField from "../../BuilderField";
import {isEmpty} from "../../../utils/base";
import Popover from "../../../Popover/Popover";
import {type PopoverChildrenParamsType} from "../../../Popover/PopoverTypes";
import SearchTextField from "../Helpers/SearchTextField/SearchTextField";
import {type FieldMultuStoreType} from "./FieldMultiTypes";
import FieldMultiLoader from "./FieldMultiLoader";
import styles from "./FieldMultiStyles";

type OwnPropsType = TextFieldChildProps & {
    bc: BuilderFieldType,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};
type PropsStoreType = {
    store: FieldMultuStoreType,
};
type PropsType = PropsStoreType & OwnPropsType & WithT;

const datatypeClass = {
    addr: AddrMultiField,
    mo: MoMultiField,
};

export class FieldMultiBase extends React.Component<PropsType> {
    popoverRef = React.createRef();

    form = new BuilderMobxForm(
        {
            values: {
                [VAR_RECORD_CK_AREA]: null,
                [VAR_RECORD_CK_HOUSE]: null,
                [VAR_RECORD_CK_STREET]: null,
            },
        },
        {
            plugins: {
                dvr: validatorjs,
            },
        },
    );

    componentDidMount() {
        const {store, value, onInitGlobal} = this.props;

        if (value) {
            store.searchRecordAction(String(value));
        }

        onInitGlobal(store);
        this.props.store.addListeners(this.form);
    }

    componentDidUpdate(prevProps: PropsType) {
        const {value, store} = this.props;

        if (value !== prevProps.value && !isEmpty(value)) {
            this.props.store.searchRecordAction(String(value));
        }

        if (isEmpty(value) && store.displayText) {
            this.handleClear();
        }
    }

    componentWillUnmount() {
        this.props.store.removeListeners();
    }

    handlePopoverOpen = async () => {
        const {current: popoverEl} = this.popoverRef;
        const firstInput = popoverEl && popoverEl.querySelector("input");

        if (firstInput) {
            firstInput.focus();
        }

        if (!isEmpty(this.props.value)) {
            await this.props.store.fillActiveRecordAction(this.form);
        }
    };

    handleClearEvent = (event: SyntheticEvent<any>) => {
        event.stopPropagation();

        this.props.onClear(event);
        this.handleClear();
    };

    handleClear = () => {
        this.props.store.clearAction();

        this.props.store.builderConfigs.forEach((bc) => {
            if (this.form.has(bc.column)) {
                this.form.$(bc.column).clear();
            }
        });
    };

    handleAccept = () => {
        const {store} = this.props;
        const {column} = last(store.builderConfigs);
        const value = this.form.has(column) ? this.form.$(column).value : "";

        this.props.onChange(null, value);
    };

    handleCancel = () => {
        const {value} = this.props;

        if (isEmpty(value)) {
            this.handleClear();
        }
    };

    handleChange = () => {
        // TODO: Делать проверку на disabled: false
        requestAnimationFrame(() => {
            const {current: popoverEl} = this.popoverRef;

            if (popoverEl) {
                const elements = [...popoverEl.querySelectorAll("input, button:not([tabindex='-1'])")];

                const nextSelectedIndex = elements.findIndex((el) => el === document.activeElement) + 1;
                const nextElement = elements[nextSelectedIndex];

                if (nextElement) {
                    nextElement.focus();
                }
            }
        });
    };

    handleCloseOutside = () => {
        this.handleCancel();
    };

    handleChangeOpen = (open: boolean) => {
        if (open) {
            this.handlePopoverOpen();
        }
    };

    renderTextField = ({onOpen}: PopoverChildrenParamsType) => {
        // eslint-disable-next-line id-length
        const {store, field, disabled, bc, tabIndex, error, errorText, style, t} = this.props;

        return (
            <SearchTextField
                errorText={errorText}
                store={store}
                fullWidth
                label={t(field.label)}
                disabled={disabled}
                error={error}
                onClick={onOpen}
                handleClear={this.handleClearEvent}
                dataPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                bc={bc}
                field={field}
                tabIndex={tabIndex}
                style={style}
            />
        );
    };

    // eslint-disable-next-line max-lines-per-function
    renderPopup = ({onClose}: PopoverChildrenParamsType) => {
        // eslint-disable-next-line id-length
        const {classes, store, pageStore, disabled, bc, visible, readOnly, t} = this.props;
        const handleAccept = (event) => {
            this.handleAccept();
            onClose(event);
        };
        const handleCancel = (event) => {
            this.handleCancel();
            onClose(event);
        };

        return (
            <div ref={this.popoverRef}>
                <Grid container direction="column" spacing={1} className={classes.wrapper} wrap="nowrap">
                    <FieldMultiLoader store={store} className={classes.progressWrapper} />
                    {this.props.store.builderConfigs.map((config) => (
                        <Grid key={config[VAR_RECORD_PAGE_OBJECT_ID]} item>
                            <BuilderField
                                bc={config}
                                form={this.form}
                                pageStore={pageStore}
                                readOnly={readOnly}
                                visible={visible}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    ))}
                    <Grid item>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Button
                                    data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-accept`}
                                    disabled={disabled}
                                    disableRipple
                                    data-qtip={t("static:147bb56012624451971b35b1a4ef55e6")}
                                    onClick={handleAccept}
                                    color="primary"
                                    variant="contained"
                                >
                                    {t("static:147bb56012624451971b35b1a4ef55e6")}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`}
                                    disabled={disabled}
                                    disableRipple
                                    data-qtip={t("static:3d27a32643ed4a7aa52b7e4b8a36806b")}
                                    onClick={handleCancel}
                                    color="secondary"
                                    variant="contained"
                                >
                                    {t("static:3d27a32643ed4a7aa52b7e4b8a36806b")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    };

    render() {
        const {classes, pageStore, hidden} = this.props;

        if (hidden) {
            return null;
        }

        return (
            <Popover
                popoverContent={this.renderPopup}
                paperClassName={classes.paper}
                container={pageStore.pageEl}
                onClickOutside={this.handleCloseOutside}
                onChangeOpen={this.handleChangeOpen}
                restoreFocusedElement
                pageStore={pageStore}
                hideOnScroll
            >
                {this.renderTextField}
            </Popover>
        );
    }
}

export default compose(
    withStyles(styles),
    withModelDecorator(
        (bc, {pageStore}: OwnPropsType): FieldMultuStoreType => new datatypeClass[bc.datatype]({bc, pageStore}),
    ),
    withTranslation("meta"),
    observer,
)(FieldMultiBase);
