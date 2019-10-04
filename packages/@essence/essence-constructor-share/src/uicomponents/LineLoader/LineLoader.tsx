import * as React from "react";
import {CircularProgress} from "@material-ui/core";
import {IconBflLine} from "../Icons/IconBflLine";
import {useStyles} from "./LineLoader.styles";

interface ILineLoaderProps {
    loaderType: "default" | "bfl-loader";
    size: number;
}

export const LineLoader: React.FC<ILineLoaderProps> = React.memo(({loaderType, size}) => {
    const classes = useStyles({});

    return (
        <div className={classes.root} data-page-object="line-loader">
            {loaderType === "bfl-loader" ? (
                <IconBflLine
                    className={classes.rootIcon}
                    firstPathClassName={classes.firstPath}
                    secondPathClassName={classes.secondPath}
                    style={{height: size, width: size}}
                />
            ) : (
                <CircularProgress size={size} />
            )}
        </div>
    );
});

LineLoader.defaultProps = {
    size: 70,
};
