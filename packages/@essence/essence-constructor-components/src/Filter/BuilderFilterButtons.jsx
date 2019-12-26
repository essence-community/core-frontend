// @flow
import * as React from "react";
import memoize from "lodash/memoize";
import noop from "lodash/noop";
import {observer} from "mobx-react";
import {EditorContex} from "@essence/essence-constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants";
import BuilderButtonCollector from "../Button/BuilderButtonCollector/BuilderButtonCollector";
import BuilderMobxButton from "../Button/BuilderMobxButton";
import {type FilterModelType} from "../stores/FilterModel";
import {type PageModelType} from "../stores/PageModel";
import {styleTheme} from "../constants";
import {type BuilderBaseType} from "../BuilderType";
import {type BuilderFilterType} from "./BuilderFilterType";

type PropsType = {|
    bc: BuilderFilterType,
    parentBc?: BuilderBaseType,
    disabled?: boolean,
    open: boolean,
    store: FilterModelType,
    pageStore: PageModelType,
    visible: boolean,
    onChangeCollapse?: () => void,
|};

type ButtonPropsType = {|
    componentProps?: Object,
|};
type RenderFilterButtonsType = {
    buttonProps?: ButtonPropsType,
};

const getSubmitComponentProps = memoize((componentProps?: Object = {}) => ({
    ...componentProps,
    name: "search",
    type: "submit",
}));

class BuilderFilterButtons extends React.Component<PropsType> {
    static contextType = EditorContex;

    btnsFilter: Object;

    constructor(props: PropsType) {
        super(props);

        const {bc} = props;

        this.btnsFilter = {
            buttonChevronConfigClose: {
                [VAR_RECORD_DISPLAYED]: "76dd4f170842474d9776fe712e48d8e6",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                iconfont: "chevron-down",
                onlyicon: "true",
                readonly: "false",
            },
            buttonChevronConfigOpen: {
                [VAR_RECORD_DISPLAYED]: "72b93dbe37884153a95363420b9ceb59",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                iconfont: "chevron-up",
                onlyicon: "true",
                readonly: "false",
            },
            buttonResetConfig: {
                [VAR_RECORD_DISPLAYED]: "cda88d85fb7e4a88932dc232d7604bfb",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-reset`,
                iconfont: styleTheme === "light" ? "broom" : "eraser",
                iconfontname: "mdi",
                onlyicon: "true",
                readonly: "false",
            },
            buttonSearchConfig: {
                [VAR_RECORD_DISPLAYED]: "704af666dbd3465781149e4282df5dcf",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-search`,
                iconfont: "search",
                onlyicon: "true",
                readonly: "false",
            },
        };
    }

    handleReset = () => {
        const {store, parentBc} = this.props;

        store.resetValues();
        store.setSearchedAction(false, parentBc);
    };

    handleFormReset = (event: SyntheticEvent<>) => {
        const {form} = this.context;

        form.onReset(event);

        this.handleReset();
    };

    // TODO: Нужно удалить, не используется без topbtn
    /* istanbul ignore next */
    handleFormSubmit = (event: SyntheticEvent<>) => {
        const {form} = this.context;

        if (!form.submitting) {
            form.onSubmit(event);
        }
    };

    renderFilterButtons = ({buttonProps = {}}: RenderFilterButtonsType): React.Node => {
        const {
            disabled,
            onChangeCollapse,
            open,
            bc: {topbtn},
            pageStore,
            visible,
            store,
        } = this.props;

        return (
            <React.Fragment>
                <BuilderMobxButton
                    color="inherit"
                    disabled={disabled}
                    handleClick={onChangeCollapse}
                    bc={open ? this.btnsFilter.buttonChevronConfigOpen : this.btnsFilter.buttonChevronConfigClose}
                    pageStore={pageStore}
                    visible={visible}
                    preventFocus={false}
                    {...buttonProps}
                />

                <BuilderMobxButton
                    color="inherit"
                    disabled={disabled}
                    handleClick={topbtn ? this.handleFormSubmit : noop}
                    bc={this.btnsFilter.buttonSearchConfig}
                    pageStore={pageStore}
                    visible={visible}
                    tabIndex={styleTheme === "dark" && open === false ? "-1" : undefined}
                    {...buttonProps}
                    componentProps={getSubmitComponentProps(buttonProps.componentProps)}
                    highlight={store.isFormDirty}
                />

                <BuilderMobxButton
                    disabled={disabled}
                    handleClick={this.handleFormReset}
                    bc={this.btnsFilter.buttonResetConfig}
                    pageStore={pageStore}
                    visible={visible}
                    tabIndex={styleTheme === "dark" && open === false ? "-1" : undefined}
                    {...buttonProps}
                />
            </React.Fragment>
        );
    };

    render() {
        const {disabled, bc, pageStore, visible, open} = this.props;
        const {topbtn} = bc;

        if (!topbtn) {
            return this.renderFilterButtons({open});
        }

        // TODO: Нужно удалить, не используется без topbtn
        /* istanbul ignore next */
        return topbtn.map((btn) => (
            <BuilderButtonCollector
                key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                onlyicon
                bc={btn}
                disabled={disabled}
                color="inherit"
                renderGridButtons={this.renderFilterButtons}
                pageStore={pageStore}
                visible={visible}
            />
        ));
    }
}

export default observer(BuilderFilterButtons);
