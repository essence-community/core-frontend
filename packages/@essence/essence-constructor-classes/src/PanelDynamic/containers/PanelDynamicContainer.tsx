import * as React from "react";
import {Grid} from "@material-ui/core";
import {loadComponentsFromModules, mapComponents} from "@essence-community/constructor-share/components";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react";
import {GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share/constants/ui";
import {useModel} from "@essence-community/constructor-share/hooks";
import {reaction} from "mobx";
import {findClassNames} from "@essence-community/constructor-share/utils/findClassNames";
import {PanelDynamicModel} from "../store/PanelDynamicModel";

interface IWithEditing extends IClassProps {
    editing?: boolean;
}

export const PanelDynamicContainer: React.FC<IWithEditing> = (props) => {
    const {bc} = props;
    const {contentview, align} = bc;
    const [isLoadedModule, setIsLoadedModule] = React.useState(true);
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

    React.useEffect(() => {
        return reaction(
            () => store.children,
            async (bcs) => {
                setIsLoadedModule(false);
                const classNames = findClassNames(bcs);

                await loadComponentsFromModules(classNames);
                setIsLoadedModule(true);
            },
        );
    }, [store]);

    return useObserver(() => (
        <Grid
            container
            spacing={0}
            style={contentStyle}
            {...((contentview && GRID_CONFIGS[contentview]) || GRID_CONFIGS.vbox)}
            {...((contentview && align && GRID_ALIGN_CONFIGS[`${align}-${contentview}`]) ||
                GRID_ALIGN_CONFIGS["left-vbox"])}
        >
            {isLoadedModule
                ? mapComponents(store.children, (Child, childBc, idx) => (
                      <Child key={childBc.ck_page_object || idx} {...props} bc={childBc} />
                  ))
                : null}
        </Grid>
    ));
};
