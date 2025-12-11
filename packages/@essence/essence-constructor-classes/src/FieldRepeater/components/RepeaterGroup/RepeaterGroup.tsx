import * as React from "react";
import {Grid} from "@mui/material";
import {mapComponents, IBuilderConfig, useSizeChild, cloneDeepElementary} from "@essence-community/constructor-share";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {IRepeaterGroupProps} from "./RepeaterGroup.types";

function recursiveFind(bc: IBuilderConfig, allId: Record<string, boolean>) {
    Object.entries(bc).forEach(([key, child]) => {
        if (key === VAR_RECORD_PAGE_OBJECT_ID) {
            allId[child as string] = true;
        }
        if (Array.isArray(child)) {
            child.forEach((childBc) => {
                if (typeof childBc === "object") {
                    recursiveFind(childBc, allId);
                }
            });
        }
    });
}

function recursiveChange(bc: IBuilderConfig, allId: Record<string, boolean>, idx: number, level: number = 0) {
    Object.entries(bc).forEach(([key, child]) => {
        if (key === VAR_RECORD_PAGE_OBJECT_ID) {
            bc[key] = `${child}_${idx}`;
        }
        if (key === VAR_RECORD_PARENT_ID && level > 0) {
            bc[key] = `${child}_${idx}`;
        }
        if (key === VAR_RECORD_MASTER_ID && allId[child]) {
            bc[key] = `${child}_${idx}`;
        }
        if (Array.isArray(child)) {
            child.forEach((childBc) => {
                recursiveChange(childBc, allId, idx, level + 1);
            });
        }
    });
}

export const RepeaterGroup: React.FC<IRepeaterGroupProps> = (props) => {
    const {bc, idx, isDisabledDel, isHiddenDel, storeName, deleteLabel, ...fieldProps} = props;
    const {contentview = "hbox", align} = bc;

    const deleteBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        (): IBuilderConfig => ({
            [VAR_RECORD_DISPLAYED]: deleteLabel,
            [VAR_RECORD_MASTER_ID]: storeName,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_delete`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            defaultvalue: String(idx),
            disabled: bc.maxvalue !== undefined,
            handler: "onDel",
            hiddenrules: bc.minvalue,
            iconfont: "close",
            onlyicon: true,
            type: "BTN",
        }),
        [bc, deleteLabel, idx, storeName],
    );

    const children = React.useMemo(() => {
        const allId: Record<string, boolean> = {};
        const children = cloneDeepElementary(bc.childs || []) as IBuilderConfig[];

        children.forEach((child) => {
            recursiveFind(child, allId);
        });
        children.forEach((child) => {
            recursiveChange(child, allId, idx);
        });

        return children;
    }, [bc, idx]);

    const [childs, sizeChild] = useSizeChild(children, fieldProps.pageStore);

    return (
        <Grid container spacing={1}>
            <Grid
                size="grow"
                container
                {...GRID_CONFIGS[contentview]}
                {...GRID_ALIGN_CONFIGS[`${align}-${contentview}`]}
                spacing={1}
            >
                {mapComponents(childs, (ChildCmp, bcChild) => (
                    <Grid
                        size="grow"
                        key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}
                        style={sizeChild[bcChild[VAR_RECORD_PAGE_OBJECT_ID]]}
                        sx={{
                            "&:empty": {
                                display: "none",
                            },
                        }}
                    >
                        <ChildCmp {...fieldProps} bc={bcChild} />
                    </Grid>
                ))}
            </Grid>
            <Grid>
                {mapComponents([deleteBtnConfig], (ChildCmp, bcChild) => (
                    <ChildCmp
                        key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}
                        {...props}
                        bc={bcChild}
                        disabled={isDisabledDel}
                        hidden={isHiddenDel}
                    />
                ))}
            </Grid>
        </Grid>
    );
};
