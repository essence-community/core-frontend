import * as React from "react";
import {ISnackbar} from "@essence-community/constructor-share/types";
import {useObserver} from "mobx-react-lite";
import {SnackbarContent} from "../SnackbarContent";
import {useStyles} from "./Snackbar.styles";

interface ISnackbarProps {
    snackbars: ISnackbar[];
    onClose: (snakebarId: number | string) => void;
    onSetCloseble: (snakebarId: number | string) => void;
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
