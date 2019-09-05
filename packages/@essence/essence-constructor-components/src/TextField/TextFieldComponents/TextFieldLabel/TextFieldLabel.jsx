// @flow
import * as React from "react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import styles from "./TextFieldLabelStyles";

type PropsType = {
    bc: {
        required?: "true" | "false",
        cvDisplayed?: string,
    },
    error?: boolean,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    info?: string,
    isRequired: boolean,
};

class TextFieldLabel extends React.PureComponent<PropsType> {
    render() {
        const {bc, classes, error, info, isRequired} = this.props;
        const label =
            bc.cvDisplayed && bc.cvDisplayed.indexOf("елеф") > 0
                ? (bc.cvDisplayed.match(/.{1,6}/g) || []).reduce((sum, str) => {
                      sum.push(str);
                      sum.push(
                          <span key={str} style={{display: "none"}}>
                              -
                          </span>,
                      );

                      return sum;
                  }, [])
                : bc.cvDisplayed;
        const required = isRequired ? (
            <span
                className={cn(classes.labelAsterisk, {
                    [classes.labelError]: error,
                })}
            >
                {"\u2009*"}
            </span>
        ) : null;

        if (info) {
            return (
                <React.Fragment>
                    <span className={classes.lableRoot}>{label}</span>
                    {required}
                    {"\u00A0"}
                    <span data-qtip={info} className={classes.lableCircle}>
                        <Icon iconfont="question-circle" />
                    </span>
                </React.Fragment>
            );
        }

        return (
            <span className={classes.lableRoot}>
                {label}
                {required}
            </span>
        );
    }
}

export default withStyles(styles)(TextFieldLabel);
