import * as React from "react";
import {IExampleBoxProps, ExampleBoxColors} from "./ExampleBox.types";
import {useStyles} from "./ExampleBox.styles";

export const ExampleBox: React.FC<IExampleBoxProps> = (props) => {
    const classes = useStyles(props);

    return <div className={classes[ExampleBoxColors[props.color]]}>{props.children}</div>;
};
