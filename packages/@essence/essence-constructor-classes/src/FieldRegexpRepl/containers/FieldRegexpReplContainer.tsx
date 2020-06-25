import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {TextField, IconButton} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useStyles} from "./FieldRegexpReplContainer.styles";

interface IParsedValue {
    isG: boolean;
    isI: boolean;
    isM: boolean;
    text: string;
    re: RegExp;
}

const EMPTY_RE = /^$/;
const EMPTY_VALUE: IParsedValue = {
    isG: false,
    isI: false,
    isM: false,
    re: EMPTY_RE,
    text: "",
};

function parseRegexp(value: string): IParsedValue {
    const res = value.match(/^(\^)(?<text>.*)(\$)(?<mod>[g|i|m]{1,3})?$/);
    const text = res?.groups?.text || "";
    const mod = res?.groups?.mod || "";
    let re: RegExp = EMPTY_RE;

    try {
        re = new RegExp(`^${text}$`, mod);
    } catch (err) {}

    return {
        isG: mod.indexOf("g") !== -1,
        isI: mod.indexOf("i") !== -1,
        isM: mod.indexOf("m") !== -1,
        re,
        text,
    };
}

const prepareValue = (parsedValue: IParsedValue): string => {
    return `^${parsedValue.text}$${parsedValue.isG ? "g" : ""}${parsedValue.isI ? "i" : ""}${
        parsedValue.isM ? "m" : ""
    }`;
};

export const FieldRegexpReplContainer: React.FC<IClassProps> = React.memo(function FieldRegexpReplContainerMemo(props) {
    const {bc, disabled, readOnly} = props;
    const field = useField(props);
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});
    const classes = useStyles();
    const [example, setExample] = React.useState("");
    const [trans] = useTranslation("static");
    const parsedValue = typeof field.value === "string" ? parseRegexp(field.value) : EMPTY_VALUE;
    const textFieldProps = useTextFieldProps({
        bc,
        disabled,
        field,
        readOnly,
        tips: [
            <IconButton
                key="G"
                data-qtip={trans("780583907b4045b8923bcbcc21ccca6d")}
                size="small"
                tabIndex={-1}
                className={cn(classes.iconRoot, classes.iconLeft, {[classes.iconRootSelected]: parsedValue.isG})}
                color="secondary"
                disabled={isDisabled}
                onClick={() => field.onChange(prepareValue({...parsedValue, isG: !parsedValue.isG}))}
            >
                G
            </IconButton>,
            <IconButton
                key="I"
                data-qtip={trans("45ec892b75734c0e9e70913f3e161539")}
                size="small"
                tabIndex={-1}
                className={cn(classes.iconRoot, {[classes.iconRootSelected]: parsedValue.isI})}
                color="secondary"
                disabled={isDisabled}
                onClick={() => field.onChange(prepareValue({...parsedValue, isI: !parsedValue.isI}))}
            >
                I
            </IconButton>,
            <IconButton
                key="M"
                data-qtip={trans("78d8c0e18d234fda8eb1fc6b56b6790c")}
                size="small"
                tabIndex={-1}
                className={cn(classes.iconRoot, {[classes.iconRootSelected]: parsedValue.isM})}
                color="secondary"
                disabled={isDisabled}
                onClick={() => field.onChange(prepareValue({...parsedValue, isM: !parsedValue.isM}))}
            >
                M
            </IconButton>,
        ],
    });

    return (
        <div className={classes.root}>
            <TextField
                {...textFieldProps}
                value={parsedValue.text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    field.onChange(prepareValue({...parsedValue, text: event.currentTarget.value}))
                }
            />
            <div className={classes.example}>
                <TextField
                    className={`${textFieldProps.className} ${classes.exampleValue}`}
                    InputLabelProps={textFieldProps.InputLabelProps}
                    fullWidth
                    label={trans("9c859c9dcb3245daab68a97592be3f22")}
                    value={example}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setExample(event.currentTarget.value)}
                />
                <div
                    className={cn(classes.exampleCheck, {
                        [classes.exampleCheckSuccess]: parsedValue.re.test(example),
                    })}
                >
                    <Icon size="2x" iconfont="check" />
                </div>
            </div>
        </div>
    );
});
