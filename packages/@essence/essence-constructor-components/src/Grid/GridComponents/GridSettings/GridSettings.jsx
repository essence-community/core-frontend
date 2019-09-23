// @flow
import * as React from "react";
import {Dialog, DialogTitle, Grid, DialogContent, Switch, DialogActions, Button} from "@material-ui/core";
import noop from "lodash/noop";
import BuilderMobxButton from "../../../Button/BuilderMobxButton";
import {type PageModelType} from "../../../stores/PageModel";
import {type GridModelType} from "../../../stores/GridModel";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";

type PropsType = {
    pageStore: PageModelType,
    gridStore: GridModelType,
    buttonProps: Object,
    onClose: () => void,
};

type StateType = {
    open: boolean,
    visibility: {
        [$Keys: string]: boolean,
    },
};

class GridSettings extends React.Component<PropsType, StateType> {
    static defaultProps = {
        onClose: noop,
    };

    state = {
        open: false,
        visibility: {},
    };

    bc = {
        ckPageObject: "gridsettings",
        cvDisplayed: "Настройки пользователя",
        iconfont: "fa-sliders",
        onlyicon: "true",
        type: "BTN",
    };

    handleOpen = () => {
        const {gridStore} = this.props;
        const visibility = {};

        gridStore.gridColumns.forEach((column) => {
            visibility[column.ckPageObject] = true;
        });

        this.setState({open: true, visibility});
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
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
        const {gridStore} = this.props;
        const {visibility} = this.state;

        gridStore.setGridColumns(gridStore.gridColumnsInitial.filter((column) => visibility[column.ckPageObject]));
        this.handleClose();
    };

    render() {
        const {pageStore, buttonProps, gridStore} = this.props;
        const {visibility} = this.state;

        return (
            <React.Fragment>
                <BuilderMobxButton
                    bc={this.bc}
                    handleClick={this.handleOpen}
                    pageStore={pageStore}
                    color="inherit"
                    visible
                    {...buttonProps}
                    readOnly={false}
                />
                <Dialog open={this.state.open} maxWidth="sm" fullWidth container={pageStore.pageEl}>
                    <DialogTitle disableTypography>Показать/скрыть колонки</DialogTitle>
                    <DialogContent>
                        <Scrollbars autoHeight autoHeightMax={300} autoHeightMin={60}>
                            <Grid container direction="column" spacing={1} style={{width: "100%"}}>
                                {gridStore.gridColumnsInitial.map((column) => {
                                    const {visible, hiddenrules} = column;

                                    if (visible === "false" || hiddenrules === "true") {
                                        return null;
                                    }

                                    return (
                                        <Grid item key={column.ckPageObject}>
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    {column.cvDisplayed || `Колонка с типом  ${column.datatype}`}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Switch
                                                        name={column.ckPageObject}
                                                        checked={visibility[column.ckPageObject]}
                                                        onChange={this.handleChangeVisibility}
                                                        value={column.ckPageObject}
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
                            Сохранить
                        </Button>
                        <Button onClick={this.handleClose} color="secondary" disableRipple variant="contained">
                            Отменить
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default GridSettings;
