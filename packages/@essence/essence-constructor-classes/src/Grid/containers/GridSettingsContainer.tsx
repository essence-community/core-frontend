/* eslint-disable max-lines-per-function */
import * as React from "react";
import {Dialog, DialogTitle, Grid, DialogContent, Switch, DialogActions, Button} from "@material-ui/core";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {useTranslation, saveToStore, removeFromStore} from "@essence-community/constructor-share/utils";
import {useObserver} from "mobx-react";
import {IGridModel} from "../stores/GridModel/GridModel.types";
import {useStyles} from "./GridSettingsContainer.styles";

export const GridSettingsContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles(props);
    const parentStore = useObserver(() => pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]) as IGridModel | undefined);
    const [trans] = useTranslation("meta");
    const [visibility, setVisibility] = React.useState<Record<string, boolean>>({});
    const [isOpen, setIsOpen] = React.useState(false);
    const [isReset, setReset] = React.useState(false);

    const btnBc = React.useMemo(
        () => ({
            ...bc,
            [VAR_RECORD_DISPLAYED]: "static:102972d8258947b7b3cf2b70b258278a",
            [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_PARENT_ID],
            [VAR_RECORD_PAGE_OBJECT_ID]: "gridsettings",
            handler: "onOpenSettings",
            iconfont: "fa-sliders",
            type: "BTN",
        }),
        [bc],
    );

    const handleClose = () => {
        const onCloseSettings = parentStore?.handlers?.onCloseSettings;

        if (onCloseSettings) {
            onCloseSettings("1", bc, {});
        }
    };

    const handleChangeVisibility = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, checked} = event.currentTarget;

        setReset(false);

        setVisibility((prevVisibility) => ({
            ...prevVisibility,
            [name]: checked,
        }));
    };

    const handleSave = () => {
        if (parentStore) {
            if (!pageStore.isMulti && !isReset) {
                saveToStore(`${parentStore.bc[VAR_RECORD_PAGE_OBJECT_ID]}_visibility`, visibility);
            }

            if (!pageStore.isMulti && isReset) {
                removeFromStore(`${parentStore.bc[VAR_RECORD_PAGE_OBJECT_ID]}_visibility`);
            }

            Object.entries(visibility).forEach(([ckID, visible]) => {
                if (isReset) {
                    parentStore.setVisibleStoreColumn(ckID);
                } else {
                    parentStore.setVisibleStoreColumn(ckID, visible);
                }
            });
        }

        handleClose();
    };

    const handleReset = () => {
        if (parentStore) {
            const newVisibility: Record<string, boolean> = {};

            parentStore.gridColumnsInitial.forEach((column) => {
                if (column.visibleable) {
                    const obj = parentStore.visibleAndHidden.get(column[VAR_RECORD_PAGE_OBJECT_ID]);

                    if (!obj.hidden) {
                        newVisibility[column[VAR_RECORD_PAGE_OBJECT_ID]] = obj.visible;
                    }
                }
            });

            setVisibility(newVisibility);
            setReset(true);
        }
    };

    React.useEffect(() => {
        if (parentStore) {
            return reaction(
                () => parentStore.isOpenSettings,
                (isOpenSettings) => {
                    if (isOpenSettings) {
                        const newVisibility: Record<string, boolean> = {};

                        parentStore.gridColumnsInitial.forEach((column) => {
                            if (column.visibleable) {
                                const obj = parentStore.visibleAndHidden.get(column[VAR_RECORD_PAGE_OBJECT_ID]);

                                if (!obj.hidden) {
                                    newVisibility[column[VAR_RECORD_PAGE_OBJECT_ID]] =
                                        typeof obj.visibleStore === "boolean" ? obj.visibleStore : obj.visible;
                                }
                            }
                        });

                        setVisibility(newVisibility);
                    }
                    setIsOpen(isOpenSettings);
                },
            );
        }

        return undefined;
    }, [parentStore, setVisibility]);

    if (!parentStore) {
        return null;
    }

    return (
        <React.Fragment>
            {mapComponentOne(btnBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
            <Dialog open={isOpen} maxWidth="sm" fullWidth container={pageStore.pageEl} style={{position: "absolute"}}>
                <DialogTitle disableTypography>
                    <Grid container direction="row" wrap="nowrap" spacing={0} style={{width: "100%"}}>
                        <Grid item xs>
                            {trans("static:017af47503474ec58542b9db53bdeeff")}
                        </Grid>
                        <Grid
                            container
                            item
                            onClick={handleReset}
                            className={classes.btnReset}
                            justify="center"
                            alignItems="center"
                            data-qtip={trans("static:4a37974505a94f0cbfccfe99ff23ac1b")}
                        >
                            <Grid item>{trans("static:108e06f7f86d4f588fc773cce968365a")}</Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Scrollbars autoHeight autoHeightMax={300} autoHeightMin={38}>
                        <Grid container direction="column" spacing={0} style={{width: "100%"}}>
                            {parentStore.gridColumnsInitial.map((column) => {
                                const {visibleable} = column;
                                const displayed = column[VAR_RECORD_DISPLAYED];
                                const obj = parentStore.visibleAndHidden.get(column[VAR_RECORD_PAGE_OBJECT_ID]);

                                if (!visibleable || obj.hidden) {
                                    return null;
                                }

                                return (
                                    <Grid item key={column[VAR_RECORD_PAGE_OBJECT_ID]}>
                                        <Grid container>
                                            <Grid item xs={10}>
                                                {(displayed && trans(displayed)) ||
                                                    `${trans("static:223dbd23bba54e4c91f59ef4cdea8ffa")}  ${
                                                        column.datatype
                                                    }`}
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Switch
                                                    name={column[VAR_RECORD_PAGE_OBJECT_ID]}
                                                    checked={visibility[column[VAR_RECORD_PAGE_OBJECT_ID]]}
                                                    disableRipple
                                                    onChange={handleChangeVisibility}
                                                    value={column[VAR_RECORD_PAGE_OBJECT_ID]}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Scrollbars>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} color="primary" disableRipple variant="contained">
                        {trans("static:8a930c6b5dd440429c0f0e867ce98316")}
                    </Button>
                    <Button onClick={handleClose} color="secondary" disableRipple variant="contained">
                        {trans("static:64aacc431c4c4640b5f2c45def57cae9")}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
