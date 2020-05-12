// @flow
import * as React from "react";
import {Dialog, DialogTitle, Grid, DialogContent, Switch, DialogActions, Button} from "@material-ui/core";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {disposeOnUnmount, observer} from "mobx-react";
import {reaction} from "mobx";
import {type PageModelType} from "../../../stores/PageModel";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";

type PropsType = WithT & {
    pageStore: PageModelType,
    buttonProps: Object,
    disabled?: boolean,
};

type StateType = {
    visibility: {
        [$Keys: string]: boolean,
    },
};

class GridSettings extends React.Component<PropsType, StateType> {
    state = {
        visibility: {},
    };

    bc = {
        ...this.props.bc,
        [VAR_RECORD_DISPLAYED]: "static:102972d8258947b7b3cf2b70b258278a",
        [VAR_RECORD_MASTER_ID]: this.props.bc[VAR_RECORD_PARENT_ID],
        [VAR_RECORD_PAGE_OBJECT_ID]: "gridsettings",
        handler: "onOpenSettings",
        iconfont: "fa-sliders",
        onlyicon: "true",
        type: "BTN",
        uitype: "11",
    };

    componentDidMount() {
        const gridStore = this.getGridStore();

        disposeOnUnmount(this, [
            reaction(
                () => gridStore.isOpenSettings,
                (isOpenSettings) => {
                    if (isOpenSettings) {
                        const visibility = {};

                        gridStore.gridColumns.forEach((column) => {
                            visibility[column[VAR_RECORD_PAGE_OBJECT_ID]] = true;
                        });

                        this.setState({visibility});
                    }
                },
            ),
        ]);
    }

    handleClose = () => {
        const gridStore = this.getGridStore();

        gridStore.handlers.onCloseSettings();
    };

    handleChangeVisibility = (event: SyntheticEvent<HTMLInputElement>) => {
        const {name, checked} = event.currentTarget;

        this.setState((prevState) => ({
            visibility: {
                ...prevState.visibility,
                [name]: checked,
            },
        }));
    };

    handleSave = () => {
        const gridStore = this.getGridStore();
        const {visibility} = this.state;

        gridStore.setGridColumns(
            gridStore.gridColumnsInitial.filter((column) => visibility[column[VAR_RECORD_PAGE_OBJECT_ID]]),
        );

        this.handleClose();
    };

    getGridStore = () => {
        return this.props.pageStore.stores.get(this.props.bc[VAR_RECORD_PARENT_ID]);
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {pageStore, t, disabled} = this.props;
        const gridStore = this.getGridStore();
        const {visibility} = this.state;

        return (
            <React.Fragment>
                {mapComponentOne(this.bc, (ChildCmp, childBc) => (
                    <ChildCmp bc={childBc} visible pageStore={pageStore} disabled={disabled} readOnly={false} />
                ))}
                <Dialog
                    open={gridStore.isOpenSettings}
                    maxWidth="sm"
                    fullWidth
                    container={pageStore.pageEl}
                    style={{position: "absolute"}}
                >
                    <DialogTitle disableTypography>{t("static:017af47503474ec58542b9db53bdeeff")}</DialogTitle>
                    <DialogContent>
                        <Scrollbars autoHeight autoHeightMax={300} autoHeightMin={38}>
                            <Grid container direction="column" spacing={0} style={{width: "100%"}}>
                                {gridStore.gridColumnsInitial.map((column) => {
                                    const {visible, hiddenrules} = column;

                                    if (visible === "false" || hiddenrules === "true") {
                                        return null;
                                    }

                                    return (
                                        <Grid item key={column[VAR_RECORD_PAGE_OBJECT_ID]}>
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    {t(column[VAR_RECORD_DISPLAYED]) ||
                                                        `${t("static:223dbd23bba54e4c91f59ef4cdea8ffa")}  ${
                                                            column.datatype
                                                        }`}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Switch
                                                        name={column[VAR_RECORD_PAGE_OBJECT_ID]}
                                                        checked={visibility[column[VAR_RECORD_PAGE_OBJECT_ID]]}
                                                        disableRipple
                                                        onChange={this.handleChangeVisibility}
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
                        <Button onClick={this.handleSave} color="primary" disableRipple variant="contained">
                            {t("static:8a930c6b5dd440429c0f0e867ce98316")}
                        </Button>
                        <Button onClick={this.handleClose} color="secondary" disableRipple variant="contained">
                            {t("static:64aacc431c4c4640b5f2c45def57cae9")}
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default withTranslation("meta")(observer(GridSettings));
