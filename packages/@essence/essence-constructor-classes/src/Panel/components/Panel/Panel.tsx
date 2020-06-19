/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import cn from "clsx";
import {mapComponentOne, mapComponents} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {HorizontalResizer} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react-lite";
import {Grid} from "@material-ui/core";
import {PanelWidthContext} from "@essence-community/constructor-share/context";
import {PanelModel, IItemType} from "../../store/PanelModel";
import {useStyles} from "./Panel.styles";

const MAX_PANEL_WIDTH = 12;

interface IPanelProps extends IClassProps {
    isFormPanel?: boolean;
}

export const Panel: React.FC<IPanelProps> = (props) => {
    const {bc} = props;
    const classes = useStyles();
    const {resizable, contentview, childs = []} = bc;
    const [store] = useModel((options) => new PanelModel(options), {
        ...props,
        bc: {
            ...bc,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-panel`,
        },
    });
    const context = React.useContext(PanelWidthContext);
    const boxBc = React.useMemo(() => ({...bc, type: "BOX.NOCOMMONDECORATOR"} as IBuilderConfig), [bc]);
    const isResizeEnable = resizable === true && contentview === "hbox";
    const isRow = contentview === "hbox" || contentview === "hbox-wrap";
    const handleChangeChildWidth = React.useCallback(
        (id: string, newWidth: number, side?: "right" | "left") => {
            store.changeChildWidth(id, newWidth, side);
        },
        [store],
    );

    return useObserver(() => {
        const {childsWidths = {}} = store;

        return (
            <div className={cn(classes.contentRoot, {[classes.contentForm]: props.isFormPanel})}>
                {mapComponentOne(boxBc, (Child, childBc) => (
                    <Child key={childBc.ck_page_object} {...props} bc={childBc}>
                        {mapComponents(childs, (ChildComp, child, index) => {
                            const isLast = index === childs.length - 1;
                            const childWidthData: IItemType = isResizeEnable
                                ? childsWidths[child[VAR_RECORD_PAGE_OBJECT_ID]]
                                : ({} as IItemType);
                            const isAddResizer = isResizeEnable && !isLast;
                            const style = isResizeEnable
                                ? {
                                      flexBasis: "auto",
                                      maxWidth: `${childWidthData.width}%`,
                                  }
                                : toColumnStyleWidth(child.width);

                            const childComponnt = <ChildComp {...props} bc={child} />;

                            if (!isResizeEnable) {
                                return (
                                    <Grid
                                        item
                                        key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                        xs={isRow ? true : MAX_PANEL_WIDTH}
                                        className={isRow ? classes.panelItemFlexBasis : undefined}
                                        style={style}
                                        zeroMinWidth
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
                                    onChange={handleChangeChildWidth}
                                >
                                    <PanelWidthContext.Provider
                                        value={context ? context + childWidthData.width : childWidthData.width}
                                    >
                                        {childComponnt}
                                    </PanelWidthContext.Provider>
                                </HorizontalResizer>
                            );
                        })}
                    </Child>
                ))}
            </div>
        );
    });
};
