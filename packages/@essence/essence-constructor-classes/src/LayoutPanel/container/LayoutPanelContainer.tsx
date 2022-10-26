/* eslint-disable sort-keys */
import * as React from "react";
import cn from "clsx";
import {toColumnStyleWidthBc} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import RGL, {WidthProvider} from "react-grid-layout";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useModel} from "@essence-community/constructor-share/hooks/useModel";
import {useObserver} from "mobx-react";
import {reaction} from "mobx";
import {IBuilderClassConfig} from "../types";
import "react-grid-layout/css/styles.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "react-resizable/css/styles.css";
import {Widget} from "../component/Widget/Widget";
import {LayoutPanelModel} from "../store/LayoutPanelModel";
import {useStyles} from "./LayoutPanelContainer.styles";

const ReactGridLayout = WidthProvider(RGL);

export const LayoutPanelContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc} = props;
    const classes = useStyles(props);
    const [store] = useModel((options) => new LayoutPanelModel(options), props);

    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            ...toColumnStyleWidthBc(bc),
        }),
        [bc],
    );

    React.useEffect(() => {
        if (bc.isstate) {
            return reaction(
                () => {
                    return {
                        hiddenLayout: store.hiddenLayout,
                        collapsedLayout: store.collapsedLayout,
                        activeFullScreen: store.activeFullScreen,
                        allLayout: store.allLayout,
                        activeWidget: store.activeWidget,
                        childs: store.childs.map((child) => child[VAR_RECORD_PAGE_OBJECT_ID]),
                    };
                },
                (state) => {
                    store.setState(state);
                },
            );
        }
    }, [bc, store]);

    const propsLayout = React.useMemo(
        () =>
            ({
                ...(bc.layoutpanelconfig || {}),
                ...(bc.layoutpanelconfig.extra ? JSON.parse(bc.layoutpanelconfig.extra) : {}),
                draggableHandle: `.${classes.draggableHandle}`,
                cols: bc.layoutpanelconfig?.cols || 12,
                compactType: bc.layoutpanelconfig?.compactType || "vertical",
                useCSSTransforms:
                    bc.layoutpanelconfig && typeof bc.layoutpanelconfig.useCSSTransforms === "undefined"
                        ? true
                        : bc.layoutpanelconfig
                        ? bc.layoutpanelconfig.useCSSTransforms
                        : true,
                onLayoutChange: (newLayout) => {
                    store.setLayout(newLayout);
                },
                onDragStop: (newLayout) => {
                    store.setLayout(newLayout);
                },
                onResizeStop: (newLayout) => {
                    store.setLayout(newLayout);
                },
                onDragStart: (newLayout, oldItem, newItem) => {
                    store.handleActive(newItem.i);
                },
                onResizeStart: (newLayout, oldItem, newItem) => {
                    store.handleActive(newItem.i);
                },
            } as any),
        [bc, store, classes],
    );

    return useObserver(() => (
        <ReactGridLayout {...propsLayout} layout={store.layout} style={contentStyle} className={classes.root}>
            {mapComponents(store.childs, (Child, childBc) => (
                <div
                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                    className={cn(classes.item, {
                        [classes.activeWidget]: store.activeWidget === childBc[VAR_RECORD_PAGE_OBJECT_ID],
                        [classes.fullScreen]:
                            store.activeFullScreen && store.activeFullScreen.i === childBc[VAR_RECORD_PAGE_OBJECT_ID],
                    })}
                >
                    <Widget
                        {...props}
                        bc={childBc}
                        bcParent={props.bc}
                        store={store}
                        draggableHandle={classes.draggableHandle}
                    >
                        <Child {...props} bc={childBc} />
                    </Widget>
                </div>
            ))}
        </ReactGridLayout>
    ));
};
