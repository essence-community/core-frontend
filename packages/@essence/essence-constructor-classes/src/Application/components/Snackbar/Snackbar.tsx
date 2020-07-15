import * as React from "react";
import {ISnackbar} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react";
import {SnackbarContent} from "../SnackbarContent";
import {useStyles} from "./Snackbar.styles";

interface ISnackbarProps {
    snackbars: ISnackbar[];
    onClose: (snakebarId: ISnackbar["id"]) => void;
    onSetCloseble: (snakebarId: ISnackbar["id"]) => void;
}

export const Snackbar: React.FC<ISnackbarProps> = ({snackbars, onClose, onSetCloseble}) => {
    const classes = useStyles();

    return useObserver(() => (
        <div className={classes.root}>
            {snackbars.map((snackbar) => (
                <SnackbarContent
                    key={snackbar.id}
                    snackbar={snackbar}
                    onClose={onClose}
                    onSetCloseble={onSetCloseble}
                />
            ))}
        </div>
    ));
};
