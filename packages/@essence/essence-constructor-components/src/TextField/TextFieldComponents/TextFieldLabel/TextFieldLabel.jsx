// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants";
import styles from "./TextFieldLabelStyles";

type PropsType = {
    bc: {
        required?: "true" | "false",
        cv_displayed?: string,
    },
    error?: boolean,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    info?: string,
    isRequired: boolean,
    paddingRight?: number,
};

class TextFieldLabel extends React.PureComponent<PropsType & WithT> {
    render() {
        // eslint-disable-next-line id-length
        const {bc, classes, error, info, isRequired, paddingRight, t} = this.props;
        const transLabel = t(bc[VAR_RECORD_DISPLAYED]);
        const label =
            transLabel && transLabel.indexOf("елеф") > 0
                ? (transLabel.match(/.{1,6}/gu) || []).reduce((sum, str) => {
                      sum.push(str);
                      sum.push(
                          <span key={str} style={{display: "none"}}>
                              -
                          </span>,
                      );

                      return sum;
                  }, [])
                : transLabel;
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
                    <span data-qtip={t(info)} className={classes.lableCircle}>
                        <Icon iconfont="question-circle" />
                    </span>
                </React.Fragment>
            );
        }

        return (
            <span className={classes.lableRoot} style={{paddingRight}}>
                {label}
                {required}
            </span>
        );
    }
}

export default compose(withTranslation("meta"), withStyles(styles))(TextFieldLabel);
