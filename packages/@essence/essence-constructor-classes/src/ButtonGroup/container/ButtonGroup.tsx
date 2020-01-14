import {IBuilderConfig, IClassProps, mapComponents} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants/variables";
import {Grid} from "@material-ui/core";
import * as React from "react";

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
    "vbox-wrap": {
        direction: "column",
        wrap: "wrap",
    },
};

export const ButtonGroup: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const {contentview = "hbox"} = bc;
    const childs = React.useMemo(() => {
        const temp = (bc.childs || []).reduce((arr: IBuilderConfig[], row: IBuilderConfig) => {
            arr.push({
                ...row,
                onlyicon: bc.onlyicon || row.onlyicon,
            });
            // @ts-ignore
            arr.push({
                [VAR_RECORD_PAGE_OBJECT_ID]: `${row[VAR_RECORD_PAGE_OBJECT_ID]}_DELIMITER`,
                [VAR_RECORD_PARENT_ID]: row[VAR_RECORD_PAGE_OBJECT_ID],
                contentview,
                type: "BTN_GROUP_DELIMITER",
            });

            return arr;
        }, []);

        return temp.slice(0, temp.length - 1);
    }, [bc.childs, bc.onlyicon, contentview]);

    return (
        <Grid
            container
            spacing={1}
            justify="flex-start"
            alignItems="center"
            alignContent="center"
            {...((GRID_CONFIGS as any)[contentview] || GRID_CONFIGS.hbox)}
        >
            {mapComponents(childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                <Grid item xs={true} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                    <Child {...props} bc={childBc} />
                </Grid>
            ))}
        </Grid>
    );
};
