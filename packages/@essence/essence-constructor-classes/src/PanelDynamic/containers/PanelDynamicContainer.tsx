import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react-lite";
import {GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share/constants/ui";
import {useModel} from "@essence-community/constructor-share/hooks";
import {PanelDynamicModel} from "../store/PanelDynamicModel";

interface IWithEditing extends IClassProps {
    editing?: boolean;
}

export const PanelDynamicContainer: React.FC<IWithEditing> = (props) => {
    const {bc} = props;
    const {contentview, align} = bc;
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel((options) => new PanelDynamicModel({...options, applicationStore}), props);
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            ...toColumnStyleWidth(bc.width),
        }),
        [bc.height, bc.maxheight, bc.minheight, bc.width],
    );

    return useObserver(() => (
        <Grid
            container
            spacing={0}
            style={contentStyle}
            {...((contentview && GRID_CONFIGS[contentview]) || GRID_CONFIGS.vbox)}
            {...((contentview && align && GRID_ALIGN_CONFIGS[`${align}-${contentview}`]) ||
                GRID_ALIGN_CONFIGS["left-hbox"])}
        >
            {mapComponents(store.children, (Child, childBc, idx) => (
                <Child key={childBc.ck_page_object || idx} {...props} bc={childBc} />
            ))}
        </Grid>
    ));
};
