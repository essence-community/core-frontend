// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {compose} from "recompose";
import {toColumnStyleWidth} from "@essence/essence-constructor-share/utils";
import {getComponent} from "@essence/essence-constructor-share";
import {type BuilderPanelType} from "../BuilderPanelType";
import {type PageModelType} from "../../stores/PageModel";
import HorizontalResizer from "../../Resizer/HorizontalResizer";
import withModelDecorator from "../../decorators/withModelDecorator";
import {PanelModel, type PanelModelType, type ItemType} from "../../stores/PanelModel";
import {styles} from "./PanelStyles/PanelStyles";

type PropsType = {|
    bc: BuilderPanelType,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    editing?: boolean,
    readOnly?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    visible?: boolean,
    elevation?: number,
    pageStore: PageModelType,
    tabIndex?: string,
    record?: Object,
    onExpand?: () => void,
    store: PanelModelType,
|};

const MAX_PANEL_WIDTH = 12;
const DEFAULT_SPACING = 1;
const GRID_CONFIGS = {
    hbox: {
        direction: "row",
        wrap: "nowrap",
    },
    "hbox-wrap": {
        direction: "row",
        wrap: "wrap",
    },
    vbox: {
        direction: "column",
        wrap: "nowrap",
    },
};

export class Panel extends React.Component<PropsType> {
    handleChangeChildWidth = (id: string, newWidth: number) => {
        const {store} = this.props;

        store.changeChildWidth(id, newWidth);
    };

    render() {
        const {
            bc,
            classes,
            editing,
            disabled,
            hidden,
            readOnly,
            elevation,
            pageStore,
            visible,
            onExpand,
            tabIndex,
            record,
            store,
        } = this.props;
        const {childs = [], contentview = "vbox", spacing, resizable} = bc;
        const isRow = contentview === "hbox" || contentview === "hbox-wrap";
        const gridSpacing = spacing || DEFAULT_SPACING;
        const {childsWidths = {}} = store;
        const isResizeEnable = resizable === "true" && contentview === "hbox";

        return (
            <Grid
                container
                className={classes[`rootSpacing${gridSpacing}`]}
                spacing={gridSpacing}
                data-page-object={bc.ckPageObject}
                {...GRID_CONFIGS[contentview] || GRID_CONFIGS.vbox}
            >
                {childs.map((child, index) => {
                    const ChildComp = getComponent(child.type, child.customid);
                    const isLast = index === childs.length - 1;
                    const childWidthData: ItemType | Object = isResizeEnable ? childsWidths[child.ckPageObject] : {};
                    const style = isResizeEnable
                        ? {
                              flexBasis: "auto",
                              maxWidth: `${childWidthData.width}%`,
                          }
                        : toColumnStyleWidth(child.width);

                    if (!ChildComp) {
                        return null;
                    }

                    return (
                        <HorizontalResizer
                            key={child.ckPageObject}
                            xs={isRow ? true : MAX_PANEL_WIDTH}
                            className={isRow ? classes.panelItemFlexBasis : undefined}
                            style={style}
                            isAddResizer={isResizeEnable && !isLast}
                            item={childWidthData}
                            itemsNumber={childs.length}
                            onChange={this.handleChangeChildWidth}
                        >
                            <ChildComp
                                bc={child}
                                editing={editing}
                                disabled={disabled}
                                hidden={hidden}
                                readOnly={readOnly}
                                elevation={elevation}
                                pageStore={pageStore}
                                visible={visible}
                                onExpand={onExpand}
                                tabIndex={tabIndex}
                                record={record}
                            />
                        </HorizontalResizer>
                    );
                })}
            </Grid>
        );
    }
}

export default compose(
    withModelDecorator(
        (bc: BuilderPanelType, props): PanelModelType =>
            new PanelModel({bc: {...bc, ckPageObject: `${bc.ckPageObject}_panel`}, pageStore: props.pageStore}),
    ),
    withStyles(styles),
    observer,
)(Panel);
