// @flow

import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Collapse, Grid, Typography} from "@material-ui/core";
import keycode from "keycode";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import Content from "../Components/Content/Content";
import {styleTheme} from "../constants";
import {type PanelAdditionalPropsType} from "./BuilderPanelType";
import BasePanelCollapsibleStyles from "./BasePanelCollapsibleStyles";

type PropsType = {
    title?: string,
    classes: {
        [$Keys<$Call<typeof BasePanelCollapsibleStyles>>]: string,
    },
    editing?: boolean,
    bc: Object,
    renderBasePanel: (props: PanelAdditionalPropsType) => React.Node,
};

type StateType = {
    in: boolean,
};

export class BasePanelCollapsibleBase extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            in: props.bc.collapsed !== "true",
        };
    }

    handleChangeCollapse = () => {
        this.setState((prevState) => ({
            in: !prevState.in,
        }));
    };

    handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
        if (keycode(event) === "enter") {
            this.handleChangeCollapse();
        }
    };

    handleExpand = () => {
        this.setState((prevState) => {
            if (prevState.in !== true) {
                return {in: true};
            }

            return null;
        });
    };

    render() {
        const {classes, editing, bc, renderBasePanel} = this.props;

        return (
            <Collapse
                in={this.state.in}
                collapsedHeight="35px"
                classes={{container: editing ? classes.editCollapseContainer : classes.collapseContainer}}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-collapsible`}
            >
                <Grid container direction="column" spacing={styleTheme === "light" ? 0 : 1}>
                    <Grid
                        item
                        onClick={this.handleChangeCollapse}
                        tabIndex="0"
                        onKeyDown={this.handleKeyDown}
                        className={`${classes.baseLabelGrid} ${
                            !this.state.in && styleTheme === "light" ? classes.closedLabelGrid : classes.labelGrid
                        }`}
                    >
                        <Typography variant="body2" className={classes.labelTypography}>
                            <Icon
                                iconfont={this.state.in ? "angle-up" : "angle-down"}
                                className={classes.chevronIcon}
                            />
                            {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div className={classes.collapseContent}>
                            <Content horizontalSize="16">
                                {renderBasePanel({
                                    onExpand: this.handleExpand,
                                    tabIndex: this.state.in ? undefined : "-1",
                                })}
                            </Content>
                        </div>
                    </Grid>
                </Grid>
            </Collapse>
        );
    }
}

export default withStyles(BasePanelCollapsibleStyles)(BasePanelCollapsibleBase);
