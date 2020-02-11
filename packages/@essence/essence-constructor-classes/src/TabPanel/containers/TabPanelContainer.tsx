import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react-lite";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Paper} from "@material-ui/core";
import {TabPanelModel} from "../store/TabPanelModel";
import {Tabs} from "../components/Tabs";
import {TabPanelPosition} from "../TabPanel.types";
import {useStyles} from "./TabPanelContainer.styles";

export const TabPanelContainer: React.FC<IClassProps> = (props) => {
    const {pageStore, elevation, visible, bc} = props;
    const {align = "center", contentview = "hbox"} = bc;
    const applicationStore = React.useContext(ApplicationContext);
    const classes = useStyles();
    const [store] = useModel((options) => new TabPanelModel({...options, applicationStore}), props);
    const positonName = `${align}-${contentview}` as TabPanelPosition;

    return useObserver(() => (
        <div className={cn(classes.rootDefault, classes.root, classes[positonName])}>
            <Tabs {...props} store={store} />
            {mapComponents(store.childs, (Child, childBc) => {
                const isVisible = childBc[VAR_RECORD_PAGE_OBJECT_ID] === store.tabValue;
                const isPanel = childBc.type === "TABPANEL" && elevation;

                if (!isVisible && !store.openedTabs.get(childBc[VAR_RECORD_PAGE_OBJECT_ID])) {
                    return null;
                }

                const content = (
                    <div
                        className={cn(classes.content, {
                            [classes.contentHidden]: !isVisible,
                            [classes.elevation]: elevation,
                            [classes.nestedTab]: childBc.type === "TABPANEL",
                        })}
                    >
                        <Child
                            {...props}
                            bc={childBc}
                            visible={isVisible ? visible : false}
                            elevation={childBc.type === "TABPANEL" ? undefined : elevation}
                            pageStore={pageStore}
                        />
                    </div>
                );

                if (isPanel) {
                    return <Paper elevation={elevation}>{content}</Paper>;
                }

                return content;
            })}
        </div>
    ));
};
