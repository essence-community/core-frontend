// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import forOwn from "lodash/forOwn";
import isArray from "lodash/isArray";
import {toColumnStyleWidth, getFromStore} from "@essence/essence-constructor-share/utils";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import {Grid, Collapse, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Field} from "mobx-react-form";
import withModelDecorator from "../decorators/withModelDecorator";
import {styleTheme, wrapperPanelDirection} from "../constants";
import {BuilderTypeContext} from "../Contexts";
import BuilderForm from "../Form/BuilderForm";
import {FilterModel, type FilterModelType} from "../stores/FilterModel";
import {type PageModelType} from "../stores/PageModel";
import Content from "../Components/Content/Content";
import {type BuilderBaseType, type FormOptionsType} from "../BuilderType";
import BuilderFilterButtons from "./BuilderFilterButtons";
import {type BuilderFilterType} from "./BuilderFilterType";
import styles from "./BuilderFilterStyles";

type PropsType = {
    bc: BuilderFilterType,
    parentBc?: BuilderBaseType,
    store: FilterModelType,
    pageStore: PageModelType,
    onSearch?: (values: Object, options?: FormOptionsType) => Promise<void | Object> | void,
    disabled?: boolean,
    hidden?: boolean,
    classes: Object,
    open: boolean,
    title?: string,
    visible: boolean,
    addRefAction?: (name: string, node: ?React.ElementRef<*>) => void,
    onChangeCollapse?: () => void,
    handleGlobals?: (values: Object) => void,
};

const GRID_FULL_WIDTH = 12;

export class BuilderFilterBase extends React.PureComponent<PropsType, {hidden: boolean, searchValues: Object}> {
    static defaultProps = {
        classes: {},
        open: true,
    };

    state = {
        hidden: false,
        searchValues: {},
    };

    componentDidMount() {
        const {store, pageStore} = this.props;

        if (store.valuesStorageKey && !pageStore.isActiveRedirect) {
            const searchValues = getFromStore(store.valuesStorageKey, {});

            forOwn(searchValues, (value, key) => {
                if (isArray(value)) {
                    delete searchValues[key];
                }
            });

            if (Object.keys(searchValues).length) {
                this.setState({searchValues});
            }

            this.props.store.setValues(searchValues);
        }
    }

    handleRefContent = (node: ?HTMLDivElement) => {
        const {addRefAction} = this.props;

        if (addRefAction) {
            addRefAction("filter-content", node);
        }
    };

    // eslint-disable-next-line max-statements
    handleSearch = async (_values: Object, options: FormOptionsType) => {
        const {form, noClean, reset} = options;

        if (!noClean && form) {
            form.each(this.handleField);
        }

        const values = form ? form.values() : {};

        this.props.store.handleGlobals(values);

        if (this.props.onSearch) {
            await this.props.onSearch(values, options);
        }

        if (reset) {
            this.props.store.resetValues();
        } else {
            await this.props.store.setValues(values);
        }

        this.props.store.setSearchedAction(!reset, this.props.parentBc, true);
    };

    handleSetValues = async (values: Object, options?: FormOptionsType) => {
        if (this.props.onSearch) {
            await this.props.onSearch(values, {...options, noLoad: true});
        }
        await this.props.store.setValues(values);
        await this.props.store.setSearchedAction(true, this.props.parentBc, false);
    };

    handleField(field: Field) {
        const {hidden} = field.get("options") || {};

        if (hidden !== false) {
            field.reset();
            field.resetValidation();
        }
    }

    renderButton = () => {
        const {classes, bc, title, disabled, store, onChangeCollapse, open, parentBc, pageStore, visible} = this.props;

        return (
            <Grid
                item
                xs={styleTheme === "light" ? GRID_FULL_WIDTH : false}
                className={cn(classes.filterButtons, {[classes.filterButtonsCollect]: bc.topbtn})}
            >
                <div className={classes.filterButtonsContainer}>
                    <BuilderFilterButtons
                        disabled={disabled}
                        bc={bc}
                        parentBc={parentBc}
                        store={store}
                        onChangeCollapse={onChangeCollapse}
                        open={open}
                        pageStore={pageStore}
                        visible={visible}
                    />
                </div>

                {styleTheme === "light" ? (
                    <Grid item xs={12} className={classes.titleContainer}>
                        <Typography variant="body2" className={classes.titleTypography} data-qtip={title}>
                            {title}
                            &nbsp;
                        </Typography>
                    </Grid>
                ) : null}
            </Grid>
        );
    };

    render() {
        const {bc, disabled, classes, title, store, pageStore, visible, open, parentBc} = this.props;

        return (
            <BuilderTypeContext.Provider value="filter">
                <Collapse in={open} collapsedHeight="42px">
                    <BuilderForm
                        onSubmit={this.handleSearch}
                        onSetValues={this.handleSetValues}
                        injectType="filter"
                        submitOnChange={bc.dynamicfilter === "true"}
                        onSetFormStatus={store.handleFormStatus}
                        dataPageObject={`${bc.ckPageObject}-form`}
                        mode="1"
                        onSetForm={store.onSetForm}
                        initialValues={this.state.searchValues}
                        pageStore={pageStore}
                        hasMaster={parentBc && Boolean(parentBc.ckMaster) && parentBc.ckMaster !== bc.ckPageObject}
                    >
                        <button tabIndex="-1" type="submit" name="search" className={classes.hidden} />
                        <Grid
                            spacing={0}
                            container
                            direction={wrapperPanelDirection}
                            wrap="nowrap"
                            data-page-object={bc.ckPageObject}
                        >
                            {bc.dynamicfilter === "true" ? null : this.renderButton()}
                            {bc.dynamicfilter === "true" && styleTheme !== "light" ? (
                                <Grid item className={classes.filterButtons}>
                                    &nbsp;
                                </Grid>
                            ) : null}
                            <Grid item xs zeroMinWidth>
                                {!title || (styleTheme === "light" && bc.dynamicfilter !== "true") ? null : (
                                    <Content horizontalSize="16" className={classes.dynamicTitle}>
                                        <Typography
                                            variant="body2"
                                            noWrap
                                            className={classes.titleTypography}
                                            data-qtip={title}
                                        >
                                            {title}
                                        </Typography>
                                    </Content>
                                )}
                                <Content
                                    verticalSize="16"
                                    horizontalSize="16"
                                    className={classes.filterFields}
                                    setRef={this.handleRefContent}
                                >
                                    <Grid container spacing={1} alignItems="center">
                                        {mapComponents(bc.childs, (ChildComp, child) => (
                                            <Grid
                                                item
                                                key={child.ckPageObject}
                                                xs={12}
                                                style={toColumnStyleWidth(child.width)}
                                            >
                                                <ChildComp
                                                    bc={child}
                                                    editing
                                                    disabled={disabled}
                                                    pageStore={pageStore}
                                                    visible={visible}
                                                    tabIndex={open ? undefined : "-1"}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Content>
                            </Grid>
                        </Grid>
                    </BuilderForm>
                </Collapse>
            </BuilderTypeContext.Provider>
        );
    }
}

const BuilderFilter = compose(
    withModelDecorator((bc, {pageStore}): FilterModelType => new FilterModel({bc, pageStore})),
    withStyles(styles),
)(BuilderFilterBase);

setComponent("FILTERPANEL", BuilderFilter);

export default BuilderFilter;
