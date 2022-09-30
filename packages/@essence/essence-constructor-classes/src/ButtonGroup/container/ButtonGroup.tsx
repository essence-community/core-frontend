import {IBuilderConfig, IClassProps, mapComponents} from "@essence-community/constructor-share";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants/variables";
import {Grid} from "@material-ui/core";
import * as React from "react";
import {GRID_CONFIGS} from "@essence-community/constructor-share/constants/ui";

export const ButtonGroup: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const {contentview = "hbox"} = bc;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );
    const childs = React.useMemo(() => {
        const temp = (bc.childs || []).reduce((arr: IBuilderConfig[], row: IBuilderConfig) => {
            arr.push({
                ...row,
                onlyicon: bc.onlyicon || row.onlyicon,
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
            style={contentStyle}
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
