import * as React from "react";
import {
    useTranslation,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    IClassProps,
} from "@essence-community/constructor-share";
import {TabPopoverItem} from "../TabPopoverItem";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useStyles} from "./TabPopoverContent.styles";

interface ITabPopoverContentProps extends IClassProps {
    store: TabPanelModel;
}

export const TabPopoverContent: React.FC<ITabPopoverContentProps> = (props) => {
    const {store} = props;
    const classes = useStyles(props);
    const [trans] = useTranslation();

    return (
        <div className={classes.listTabs}>
            {store.hiddenTabsIndex
                ? store.tabs.slice(-store.hiddenTabsIndex).map((tabBc) => {
                      const labelKey = tabBc[VAR_RECORD_DISPLAYED];

                      return (
                          <TabPopoverItem
                              key={tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                              {...props}
                              bc={tabBc}
                              label={labelKey ? trans(labelKey) : ""}
                              isActive={store.tabValue === tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                              value={tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                          />
                      );
                  })
                : null}
        </div>
    );
};
