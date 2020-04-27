// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import forOwn from "lodash/forOwn";
import isArray from "lodash/isArray";
import {toColumnStyleWidth, getFromStore} from "@essence-community/constructor-share/utils";
import {setComponent, mapComponents} from "@essence-community/constructor-share/components";
import {BuilderTypeContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Grid, Collapse, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Field} from "mobx-react-form";
import withModelDecorator from "../decorators/withModelDecorator";
import {styleTheme, wrapperPanelDirection} from "../constants";
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
    isHideActions?: boolean,
    absolute?: Boolean,
    addRefAction?: (name: string, node: ?React.ElementRef<*>) => void,
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
        const {classes, bc, title, disabled, store, open, parentBc, pageStore, visible} = this.props;
        const buttons = (
            <BuilderFilterButtons
                disabled={disabled}
                bc={bc}
                parentBc={parentBc}
                store={store}
                open={open}
                pageStore={pageStore}
                visible={visible}
            />
        );

        return (
            <Grid
                item
                xs={styleTheme === "light" ? GRID_FULL_WIDTH : false}
                className={cn(classes.filterButtons, {
                    [classes.filterButtonsCollect]: bc.topbtn,
                    [classes.filterButtonsAbsolute]: this.props.absolute,
                })}
            >
                {pageStore.styleTheme === "dark" ? (
                    <Collapse in={open} collapsedHeight="42px" className={classes.filterButtonsContainer}>
                        {buttons}
                    </Collapse>
                ) : (
                    <div className={classes.filterButtonsContainer}>{buttons}</div>
                )}

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

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {bc, disabled, classes, title, store, pageStore, visible, open, parentBc, isHideActions} = this.props;

        return (
            <BuilderTypeContext.Provider value="filter">
                <Collapse in={open} collapsedHeight={title || pageStore.styleTheme === "light" ? "42px" : "1px"}>
                    <BuilderForm
                        onSubmit={this.handleSearch}
                        onSetValues={this.handleSetValues}
                        injectType="filter"
                        submitOnChange={bc.dynamicfilter === "true"}
                        onSetFormStatus={store.handleFormStatus}
                        dataPageObject={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-form`}
                        mode="1"
                        onSetForm={store.onSetForm}
                        initialValues={this.state.searchValues}
                        pageStore={pageStore}
                        hasMaster={
                            parentBc &&
                            Boolean(parentBc[VAR_RECORD_MASTER_ID]) &&
                            parentBc[VAR_RECORD_MASTER_ID] !== bc[VAR_RECORD_PAGE_OBJECT_ID]
                        }
                    >
                        <button tabIndex="-1" type="submit" name="search" className={classes.hidden} />
                        <Grid
                            spacing={0}
                            container
                            direction={wrapperPanelDirection}
                            wrap="nowrap"
                            data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                        >
                            {bc.dynamicfilter === "true" || isHideActions ? null : this.renderButton()}
                            {bc.dynamicfilter === "true" && styleTheme !== "light" ? (
                                <Grid
                                    item
                                    className={cn(classes.filterButtons, {
                                        [classes.filterButtonsAbsolute]: this.props.absolute,
                                    })}
                                >
                                    &nbsp;
                                </Grid>
                            ) : null}
                            <Grid item className={classes.maxWidth}>
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
                                                key={child[VAR_RECORD_PAGE_OBJECT_ID]}
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
