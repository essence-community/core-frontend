import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles(
    () => ({
        color: {
            borderRadius: 5,
            display: "flex",
            height: 20,
            width: 20,
        },
        colorPicker: {
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            width: "100%",
        },
        colorPickerContainer: {
            alignItems: "center",
            display: "flex",
            height: 30,
            justifyContent: "center",
            width: 30,
        },
    }),
    {name: "EssenceFieldColorPicker"},
);
