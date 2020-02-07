/* eslint-disable max-lines-per-function */
// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import {compose} from "recompose";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {mapComponents, PanelWidthContext, GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
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

export class Panel extends React.Component<PropsType> {
    static contextType = PanelWidthContext;

    handleChangeChildWidth = (id: string, newWidth: number, side?: "right" | "left") => {
        const {store} = this.props;

        store.changeChildWidth(id, newWidth, side);
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
        const {align = "stretch", childs = [], contentview = "vbox", spacing, resizable} = bc;
        const isRow = contentview === "hbox" || contentview === "hbox-wrap";
        const gridSpacing = spacing || DEFAULT_SPACING;
        const {childsWidths = {}} = store;
        const isResizeEnable = resizable === "true" && contentview === "hbox";

        return (
            <Grid
                container
                className={classes[`rootSpacing${gridSpacing}`]}
                spacing={gridSpacing}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                {...GRID_CONFIGS[contentview]}
                {...GRID_ALIGN_CONFIGS[`${align}-${contentview}`]}
            >
                {mapComponents(childs, (ChildComp, child, index) => {
                    const isLast = index === childs.length - 1;
                    const childWidthData: ItemType | Object = isResizeEnable
                        ? childsWidths[child[VAR_RECORD_PAGE_OBJECT_ID]]
                        : {};
                    const isAddResizer = isResizeEnable && !isLast;
                    const style = isResizeEnable
                        ? {
                              flexBasis: "auto",
                              maxWidth: `${childWidthData.width}%`,
                          }
                        : toColumnStyleWidth(child.width);

                    const childComponnt = (
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
                    );

                    if (!isResizeEnable) {
                        return (
                            <Grid
                                item
                                key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                xs={isRow ? true : MAX_PANEL_WIDTH}
                                className={isRow ? classes.panelItemFlexBasis : undefined}
                                style={style}
                            >
                                {childComponnt}
                            </Grid>
                        );
                    }

                    return (
                        <HorizontalResizer
                            key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                            xs={isRow ? true : MAX_PANEL_WIDTH}
                            className={isRow ? classes.panelItemFlexBasis : undefined}
                            style={style}
                            isAddResizer={isAddResizer}
                            nextItem={childsWidths[(childs[index + 1] || {})[VAR_RECORD_PAGE_OBJECT_ID]]}
                            item={childWidthData}
                            itemsNumber={childs.length}
                            onChange={this.handleChangeChildWidth}
                        >
                            <PanelWidthContext.Provider
                                value={this.context ? `${this.context}:${childWidthData.width}` : childWidthData.width}
                            >
                                {childComponnt}
                            </PanelWidthContext.Provider>
                        </HorizontalResizer>
                    );
                })}
            </Grid>
        );
    }
}
/* eslint-enable max-lines-per-function */
export default compose(
    withModelDecorator(
        (bc: BuilderPanelType, props): PanelModelType =>
            new PanelModel({
                bc: {...bc, [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_panel`},
                pageStore: props.pageStore,
            }),
    ),
    withStyles(styles),
    observer,
)(Panel);
