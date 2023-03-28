import * as React from "react";
import cn from "clsx";
import {Grid, DialogTitle, Checkbox, FormControlLabel, Modal, Paper, Backdrop} from "@material-ui/core";
import {toColumnStyleWidthBc, useTranslation, noop} from "@essence-community/constructor-share/utils";
import {mapComponentOne, mapComponents} from "@essence-community/constructor-share/components";
import {Icon} from "@essence-community/constructor-share/Icon";
import {UIForm, Focusable, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {IClassProps, IBuilderMode, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useObserver} from "mobx-react";
import {WindowContext} from "@essence-community/constructor-share/context";
import {getModeTitle} from "../utils";
import {WindowModel} from "../stores/WindowModel";
import {WindowButtons} from "../components/WindowButtons";
import {WindowCancel} from "../components/WindowCancel";
import {useStyles} from "./WindowContainer.styles";

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

// eslint-disable-next-line max-lines-per-function
export const WindowContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const [trans] = useTranslation("meta");
    const classes = useStyles();
    const [store] = useModel((options) => new WindowModel(options), props);
    const boxBc = React.useMemo(
        () => ({align: "left-stretch", contentview: "vbox", ...bc, type: "BOX.NOCOMMONDECORATOR"} as IBuilderConfig),
        [bc],
    );
    const {
        [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
        checkaddmore,
        stepnamenext,
        wintype = "base",
        align,
        [VAR_RECORD_DISPLAYED]: displayed,
    } = bc;
    const isFulllScreen = wintype === "fullscreen";
    const displayedTrans = displayed && trans(displayed, displayed);
    const windowTitle = displayedTrans || `${trans(getModeTitle(bc.mode as IBuilderMode))} ${displayedTrans || ""}`;
    const autoHeightMax = isFulllScreen ? "100%" : `calc(90vh - ${WINDOW_HEADER_HEIGHT + WINDOW_BOTTOM_HEIGHT}px)`;
    const checkboxAddMode = useObserver(() =>
        bc.mode === "1" && checkaddmore && !stepnamenext ? (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={store.addMore}
                        onChange={store.changeAddMoreAction}
                        icon={<Icon iconfont="square" size="xs" className={classes.iconColor} />}
                        checkedIcon={<Icon iconfont="check-square" size="xs" className={classes.iconColor} />}
                        disableRipple
                    />
                }
                label={trans("static:ba416597affb4e3a91b1be3f8e0c8960")}
                classes={{label: classes.addMoreLabelColor}}
                data-page-object={`${ckPageObject}-add-more`}
            />
        ) : null,
    );

    const handleCloseDialog = () => {
        if (!pageStore.hiddenPage) {
            store.setCancelAction();
        }
    };

    const handleBackdropClick = (event: React.SyntheticEvent) => {
        /*
         * Ignore the events not coming from the "backdrop"
         * We don't want to close the dialog when clicking the dialog content.
         */
        if (event.target !== event.currentTarget) {
            return undefined;
        }

        handleCloseDialog();

        return undefined;
    };

    const handleCloseAction = React.useCallback(() => {
        store.closeAction("1", bc, {});
    }, [bc, store]);

    return useObserver(() => (
        <WindowContext.Provider
            value={{
                onClose: () => store.closeAction("1", bc, {}),
                onQuestionClose: handleCloseDialog,
            }}
        >
            <Modal
                open
                container={pageStore.pageEl}
                style={{position: "absolute"}}
                onClose={handleCloseDialog}
                data-page-object={ckPageObject}
                BackdropComponent={Backdrop}
            >
                <React.Suspense fallback={null}>
                    <div className={classes.container} onClick={handleBackdropClick}>
                        <Paper
                            className={cn(classes.paper, {
                                [classes[`align-${align}` as keyof typeof classes]]: align,
                                [classes[`winsize-${wintype}` as keyof typeof classes]]: wintype,
                                [classes.paperFullScreen]: isFulllScreen,
                            })}
                        >
                            <UIForm
                                bc={bc}
                                onSubmit={noop}
                                initialValues={store.initialValues}
                                mode={bc.mode as IBuilderMode}
                                pageStore={pageStore}
                                className={classes.form}
                            >
                                <Focusable className={classes.focusable}>
                                    <DialogTitle disableTypography>{windowTitle}</DialogTitle>
                                    <Scrollbars
                                        autoHeight
                                        autoHeightMax={autoHeightMax}
                                        hideTracksWhenNotNeeded
                                        renderView={renderScrollView}
                                        className={classes.contentScrollableParent}
                                        withRequestAnimationFrame
                                        pageStore={pageStore}
                                        contentProps={{
                                            style: {
                                                height: "100%",
                                            },
                                        }}
                                    >
                                        {mapComponentOne(boxBc, (ChildBox, childBoxBc) => (
                                            <ChildBox {...props} bc={childBoxBc}>
                                                {mapComponents(store.childs, (ChildCmp, childBc) => {
                                                    return (
                                                        <Grid
                                                            key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                                            item
                                                            style={{
                                                                height: childBc.height,
                                                                maxHeight: childBc.maxheight ?? "100%",
                                                                minHeight: childBc.minheight,
                                                                ...toColumnStyleWidthBc(childBc),
                                                            }}
                                                        >
                                                            <ChildCmp {...props} bc={childBc} />
                                                        </Grid>
                                                    );
                                                })}
                                            </ChildBox>
                                        ))}
                                    </Scrollbars>
                                    <WindowButtons
                                        {...props}
                                        checkboxAddMode={checkboxAddMode}
                                        className={classes.dialogButtonActions}
                                    />
                                    <WindowCancel
                                        pageStore={pageStore}
                                        bc={bc}
                                        isOpen={store.cancel}
                                        onAccept={handleCloseAction}
                                        onDecline={store.resetCancelAction}
                                    />
                                </Focusable>
                            </UIForm>
                        </Paper>
                    </div>
                </React.Suspense>
            </Modal>
        </WindowContext.Provider>
    ));
};
