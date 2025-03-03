import * as React from "react";
import cn from "clsx";
import {toTranslateText} from "../../utils/transform";
import {useTranslation} from "../../utils/I18n";
import {VAR_RECORD_DISPLAYED} from "../../constants/variables";
import {Icon} from "../../Icon";
import {useStyles} from "./TextFieldLabel.styles";
import {ITextFieldLabelProps} from "./TextFieldLabel.types";

export const TextFieldLabel: React.FC<ITextFieldLabelProps> = (props) => {
    const [trans] = useTranslation("meta");
    const classes = useStyles(props);

    const {bc, error, info, isRequired, paddingRight} = props;
    const transLabel = toTranslateText(trans, bc[VAR_RECORD_DISPLAYED]);
    const label =
        typeof transLabel === "string" && transLabel.indexOf("елеф") > 0
            // @ts-ignore
            ? (transLabel.match(/.{1,6}/gu) || []).reduce((sum: any[], str: string) => {
                  sum.push(str);
                  sum.push(
                      <span key={str} style={{display: "none"}}>
                          -
                      </span>,
                  );

                  return sum;
              }, [] as any[])
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
                <span className={classes.labelRoot}>{label}</span>
                {required}
                {"\u00A0"}
                <span data-qtip={toTranslateText(trans, info)} className={classes.labelCircle}>
                    <Icon iconfont="question-circle" />
                </span>
            </React.Fragment>
        );
    }

    return (
        <span className={classes.labelRoot} style={{paddingRight}}>
            {label}
            {required}
        </span>
    );
};
