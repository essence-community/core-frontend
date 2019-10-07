import {IBuilderConfig, IClassProps, mapComponents} from "@essence/essence-constructor-share";
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
    const childs = React.useMemo(
        () => {
            const temp = (bc.childs || [])
                .map((child) => ({
                    ...child,
                    onlyicon: bc.onlyicon || child.onlyicon,
                }))
                .reduce((arr, row) => {
                    arr.push(row);
                    arr.push({
                        contentview: bc.contentview || GRID_CONFIGS.hbox,
                        type: "BTN_GROUP_DELIMITER",
                    });

                    return arr;
                }, []);

            return temp.slice(0, temp.length - 1);
        },
        [bc.childs, bc.onlyicon, bc.contentview],
    );

    return (
        <Grid
            container
            spacing={0}
            justify="flex-start"
            alignItems="center"
            alignContent="center"
            {...GRID_CONFIGS[bc.contentview] || GRID_CONFIGS.hbox}
        >
            {mapComponents(childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                <Child {...props} bc={childBc} />
            ))}
        </Grid>
    );
};
