// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import cn from "classnames";
import {Grid, Dialog, DialogTitle, Checkbox, FormControlLabel} from "@material-ui/core";
import {toSize, toColumnStyleWidth, withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {getComponent, Icon} from "@essence-community/constructor-share";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_CV_DESCRIPTION,
} from "@essence-community/constructor-share/constants";
import Scrollbars from "../Components/Scrollbars/Scrollbars";
import BuilderField from "../TextField/BuilderField";
import BuilderForm from "../Form/BuilderForm";
import {getModeTitle} from "../utils/string";
import {checkEditable} from "../utils/access";
import WindowMessageCancel from "../WindowMessage/WindowMessageCancel";
import Focusable from "../Components/Focusable/Focusable";
import {type BuilderWindowPropsType} from "./BuilderWindowType";
import BuilderWindowButtonDefault from "./BuilderWindowButtons/BuilderWindowButtonDefault";
import BuilderWindowButtonCustom from "./BuilderWindowButtons/BuilderWindowButtonCustom";
import styles from "./BuilderWindowStyles";

const WINDOW_HEADER_HEIGHT = 43;
const WINDOW_BOTTOM_HEIGHT = 58;

const renderScrollView = ({style, ...props}: any) => (
    <div
        {...props}
        style={{
            ...style,
            flexGrow: 1,
            padding: 8,
        }}
    />
);

class BuilderWindow extends React.Component<BuilderWindowPropsType & WithT> {
    contentStyle: Object;

    constructor(props: BuilderWindowPropsType) {
        super(props);

        const {windowBc: bc} = props.store;

        this.contentStyle = {
            height: toSize(bc.height),
            maxHeight: toSize(bc.maxheight),
            minHeight: toSize(bc.minheight),
        };
    }

    componentDidMount() {
        const {pageStore, store} = this.props;

        pageStore.addStore(store, store.windowBc[VAR_RECORD_PAGE_OBJECT_ID]);
    }

    componentWillUnmount() {
        const {pageStore, store} = this.props;

        pageStore.removeStore(store.windowBc[VAR_RECORD_PAGE_OBJECT_ID], store);
    }

    handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    handleCloseDialog = () => {
        const {pageStore, store} = this.props;

        if (!pageStore.hiddenPage) {
            store.setCancelAction();
        }
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {store, pageStore, classes, theme = {}, visible, t} = this.props;
        const {
            autobuild,
            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
            checkaddmore,
            stepnamenext,
            wintype = "base",
            align,
            bottombtn,
            [VAR_RECORD_CV_DESCRIPTION]: description,
            title,
            [VAR_RECORD_DISPLAYED]: displayed,
        } = store.windowBc;
        const isFulllScreen = wintype === "fullscreen";
        const windowTitle =
            t(title) || t(displayed) || `${getModeTitle(store.config.mode)} ${t(description, description) || ""}`;
        const autoHeightMax = isFulllScreen
            ? "100%"
            : `calc(90vh - ${theme.sizing.appbarHeight + WINDOW_HEADER_HEIGHT + WINDOW_BOTTOM_HEIGHT}px)`;
        const checkboxAddMode =
            store.config.mode === "1" && checkaddmore === "true" && !stepnamenext ? (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={store.addMore}
                            onChange={store.setAddMoreAction}
                            icon={<Icon iconfont="square" size="xs" className={classes.iconColor} />}
                            checkedIcon={<Icon iconfont="check-square" size="xs" className={classes.iconColor} />}
                            disableRipple
                        />
                    }
                    label={t("static:ba416597affb4e3a91b1be3f8e0c8960")}
                    classes={{label: classes.addMoreLabelColor}}
                    data-page-object={`${ckPageObject}-add-more`}
                />
            ) : null;

        return (
            <Dialog
                classes={{
                    container: classes[`dialod-align-${align}`],
                    paper: cn(classes[`winsize-${wintype}`], classes[`paper-align-${align}`]),
                }}
                open
                container={pageStore.pageEl}
                style={{position: "absolute"}}
                onClose={this.handleCloseDialog}
                fullWidth
                data-page-object={ckPageObject}
                PaperProps={{
                    autoComplete: "off",
                    component: Focusable,
                    "data-page-object": `${ckPageObject}-form`,
                    focusableComponent: "form",
                    onSubmit: this.handleFormSubmit,
                }}
                fullScreen={isFulllScreen}
            >
                <BuilderForm noForm initialValues={store.initialValues} mode={store.config.mode} pageStore={pageStore}>
                    <DialogTitle disableTypography>{windowTitle}</DialogTitle>
                    <Scrollbars
                        autoHeight
                        autoHeightMax={autoHeightMax}
                        hideTracksWhenNotNeeded
                        renderView={renderScrollView}
                        className={classes.contentScrollableParent}
                        withRequestAnimationFrame
                        pageStore={pageStore}
                    >
                        <Grid
                            container
                            direction="column"
                            spacing={1}
                            className={classes.content}
                            wrap="nowrap"
                            style={this.contentStyle}
                        >
                            {store.childs.map((field) => {
                                let fieldBc = field;
                                const isDisabled = !checkEditable(store.config.mode, fieldBc.editmode);

                                if (isDisabled && field.visibleinwindow === "false") {
                                    return null;
                                }

                                if (isDisabled) {
                                    fieldBc = {
                                        ...fieldBc,
                                        disabled: "true",
                                    };
                                }

                                const Component = getComponent(fieldBc.type, fieldBc.customid) || BuilderField;

                                return (
                                    <Grid
                                        key={field[VAR_RECORD_PAGE_OBJECT_ID]}
                                        item
                                        style={toColumnStyleWidth(field.width)}
                                    >
                                        <Component bc={fieldBc} editing pageStore={pageStore} visible={visible} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Scrollbars>
                    {autobuild === "true" && store.gridStore ? (
                        <BuilderWindowButtonDefault
                            store={store}
                            ckPageObject={ckPageObject}
                            checkboxAddMode={checkboxAddMode}
                            pageStore={pageStore}
                            visible={visible}
                            gridStore={store.gridStore}
                            className={classes.dialogButtonActions}
                        />
                    ) : (
                        <BuilderWindowButtonCustom
                            btns={bottombtn}
                            checkboxAddMode={checkboxAddMode}
                            pageStore={pageStore}
                            visible={visible}
                            className={classes.dialogButtonActions}
                        />
                    )}
                    <WindowMessageCancel
                        store={store}
                        bc={store.windowBc}
                        pageStore={pageStore}
                        disableEscapeKeyDown
                        disableOutsideClose
                    />
                </BuilderForm>
            </Dialog>
        );
    }
}

export default compose(
    withStyles(styles, {name: "BuilderWindow", withTheme: true}),
    withTranslation("meta"),
    observer,
)(BuilderWindow);
