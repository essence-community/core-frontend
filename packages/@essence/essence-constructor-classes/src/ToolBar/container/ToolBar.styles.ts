import {IClassProps} from "@essence-community/constructor-share/types";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        dense: (props: IClassProps) => ({
            "&.MuiToolbar-dense": {
                height: props.bc.height,
                maxHeight: props.bc.maxheight ?? "100%",
                minHeight: `${props.bc.minheight} !important`,
                ...toColumnStyleWidth(props.bc.width),
            },
        }),
    }),
    {
        name: "EssenceToolBar",
    },
);
