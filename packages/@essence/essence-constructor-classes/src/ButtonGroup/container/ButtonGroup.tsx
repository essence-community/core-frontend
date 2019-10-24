import {IBuilderConfig, IClassProps, mapComponents} from "@essence/essence-constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants/variables";
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
    const childs = React.useMemo(() => {
        const temp = (bc.childs || []).reduce((arr, row) => {
            arr.push({
                ...row,
                onlyicon: bc.onlyicon || row.onlyicon,
            });
            arr.push({
                contentview: bc.contentview || GRID_CONFIGS.hbox,
                type: "BTN_GROUP_DELIMITER",
            });

            return arr;
        }, []);

        return temp.slice(0, temp.length - 1);
    }, [bc.childs, bc.onlyicon, bc.contentview]);

    return (
        <Grid
            container
            spacing={1}
            justify="flex-start"
            alignItems="center"
            alignContent="center"
            {...(GRID_CONFIGS[bc.contentview] || GRID_CONFIGS.hbox)}
        >
            {mapComponents(childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                <Grid item xs={true} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                    <Child {...props} bc={childBc} />
                </Grid>
            ))}
        </Grid>
    );
};
