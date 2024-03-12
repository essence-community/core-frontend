import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents, IBuilderConfig, useSizeChild} from "@essence-community/constructor-share";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {IRepeaterGroupProps} from "./RepeaterGroup.types";

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

    const [childs, sizeChild] = useSizeChild(bc.childs);

    return (
        <Grid container spacing={1}>
            <Grid
                item
                xs
                container
                {...GRID_CONFIGS[contentview]}
                {...GRID_ALIGN_CONFIGS[`${align}-${contentview}`]}
                spacing={1}
            >
                {mapComponents(childs, (ChildCmp, bcChild) => (
                    <Grid
                        item
                        key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}
                        xs
                        style={sizeChild[bcChild[VAR_RECORD_PAGE_OBJECT_ID]]}
                    >
                        <ChildCmp {...fieldProps} bc={bcChild} />
                    </Grid>
                ))}
            </Grid>
            <Grid item>
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
