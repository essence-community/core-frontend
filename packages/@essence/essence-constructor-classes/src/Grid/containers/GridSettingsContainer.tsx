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
import {useTranslation, saveToStore, entriesMapSort} from "@essence-community/constructor-share/utils";
import {useObserver} from "mobx-react";
import {IGridModel} from "../stores/GridModel/GridModel.types";

export const GridSettingsContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const parentStore = useObserver(() => pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]) as IGridModel | undefined);
    const [trans] = useTranslation("meta");
    const [visibility, setVisibility] = React.useState<Record<string, boolean>>({});
    const [isOpen, setIsOpen] = React.useState(false);

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

        setVisibility((prevVisibility) => ({
            ...prevVisibility,
            [name]: checked,
        }));
    };

    const handleSave = () => {
        if (parentStore) {
            if (!pageStore.isMulti) {
                saveToStore(`${parentStore.bc[VAR_RECORD_PAGE_OBJECT_ID]}_visibility`, visibility);
            }

            Object.entries(visibility).forEach(([ckID, visible]) => {
                parentStore.setVisibleStoreColumn(ckID, visible);
            });
        }

        handleClose();
    };

    React.useEffect(() => {
        if (parentStore) {
            return reaction(
                () => parentStore.isOpenSettings,
                (isOpenSettings) => {
                    if (isOpenSettings) {
                        const newVisibility: Record<string, boolean> = {};

                        entriesMapSort(parentStore.visibleAndHidden).forEach(([ckId, obj]) => {
                            if (
                                !obj.hidden &&
                                (typeof obj.visibleStore === "boolean" ? obj.visibleStore : obj.visible)
                            ) {
                                newVisibility[ckId] = true;
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
                <DialogTitle disableTypography>{trans("static:017af47503474ec58542b9db53bdeeff")}</DialogTitle>
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
