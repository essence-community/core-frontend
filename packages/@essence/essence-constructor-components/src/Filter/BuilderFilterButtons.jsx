// @flow
import * as React from "react";
import PropTypes from "prop-types";
import memoize from "lodash/memoize";
import noop from "lodash/noop";
import {observer} from "mobx-react";
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
type ContextType = {
    form: Object,
};

const getSubmitComponentProps = memoize((componentProps?: Object = {}) => ({
    ...componentProps,
    name: "search",
    type: "submit",
}));

class BuilderFilterButtons extends React.Component<PropsType> {
    static contextTypes = {
        form: PropTypes.object,
    };

    btnsFilter: Object;

    context: ContextType;

    constructor(props: PropsType) {
        super(props);

        const {bc} = props;

        this.btnsFilter = {
            buttonChevronConfigClose: {
                ckPageObject: `${bc.ckPageObject}-chevron`,
                cvDisplayed: "Развернуть фильтры",
                iconfont: "chevron-down",
                onlyicon: "true",
                readonly: "false",
            },
            buttonChevronConfigOpen: {
                ckPageObject: `${bc.ckPageObject}-chevron`,
                cvDisplayed: "Скрыть фильтры",
                iconfont: "chevron-up",
                onlyicon: "true",
                readonly: "false",
            },
            buttonResetConfig: {
                ckPageObject: `${bc.ckPageObject}-reset`,
                cvDisplayed: "Очистить",
                iconfont: styleTheme === "light" ? "broom" : "eraser",
                iconfontname: "mdi",
                onlyicon: "true",
                readonly: "false",
            },
            buttonSearchConfig: {
                ckPageObject: `${bc.ckPageObject}-search`,
                cvDisplayed: "Поиск",
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
                key={btn.ckPageObject}
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
