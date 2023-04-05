import * as React from "react";
import {Grid, TextField, Typography} from "@material-ui/core";
import {i18next, useTranslation} from "@essence-community/constructor-share/utils";
import {parse, IParseReturnType} from "@essence-community/constructor-share/utils/parser";
import {FieldValue, IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {reaction} from "mobx";
import {useStyles} from "./FieldComputedContainer.styles";

function makeParser(): IParseReturnType {
    return {
        hasError: false,
        runer: (values?: Record<string, FieldValue>) =>
            `${i18next.t("static:e077e7f97f954e85905a8e754511e441")} ${JSON.stringify(values)} `,
        variables: [],
    };
}

export const FieldComputedContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const [trans] = useTranslation("meta");
    const classes = useStyles();
    const [parser, setParser] = React.useState(makeParser);
    const [values, setValues] = React.useState<Record<string, FieldValue>>({});
    const result = parser.runer({get: (name) => values[name]});
    const field = useField({bc, disabled, hidden, pageStore});

    const handleChangeSource = React.useCallback(
        (event: React.SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const {value: newValue} = event.currentTarget;

            field.onChange(newValue);
        },
        [field],
    );

    const handleChangeField = React.useCallback(
        (event: React.SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const {value: varValue, name} = event.currentTarget;
            let parsedValue: FieldValue = null;

            switch (true) {
                case /^g?_?[c][nk]_/u.test(name) && /^[\d.]+$/u.test(varValue):
                    parsedValue = parseFloat(varValue);
                    break;
                case varValue === "null":
                    parsedValue = null;
                    break;
                case varValue === "undefined":
                    parsedValue = undefined;
                    break;
                default:
                    parsedValue = varValue;
            }

            setValues((prevState) => ({
                ...prevState,
                [name]: parsedValue,
            }));
        },
        [],
    );

    React.useEffect(() => {
        return reaction(
            () => field.value,
            (value?: string) => {
                if (value) {
                    const tParser = parse(String(value), true);

                    setValues({});
                    setParser(tParser);
                } else {
                    setParser(makeParser());
                    setValues({});
                }
            },
            {fireImmediately: true},
        );
    }, [field.value]);

    return (
        <Grid container spacing={1} direction="column">
            <Grid item>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Typography variant="body2">
                                    {trans("static:9207ff3b431a4dc58f16a28d2aae0ea8")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField
                                    InputProps={{
                                        classes: {
                                            input: classes.textarea,
                                            root: classes.textareaRoot,
                                        },
                                    }}
                                    style={{height: "100%"}}
                                    label={trans("static:6029c25920ff4f79b9b52d664322b3d9")}
                                    value={String(field.value || "")}
                                    onChange={handleChangeSource}
                                    multiline
                                    autoComplete="off"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Grid container spacing={1} direction="column">
                            <Grid item>
                                <Typography variant="body2">
                                    {trans("static:a363461339754846881b1f84b6706851")}
                                </Typography>
                            </Grid>
                            {parser.variables.map((variable, index) => (
                                <Grid item key={index}>
                                    <TextField
                                        name={variable}
                                        value={values[variable]}
                                        label={`${trans("static:a326c00cf6b54d7ebdc358e283383ccb")} ${variable}`}
                                        onChange={handleChangeField}
                                        autoComplete="off"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <TextField
                    value={result === undefined ? "" : JSON.stringify(result)}
                    label={trans("static:b4458be782404651a4cfcad47d2ae17a")}
                    disabled
                    autoComplete="off"
                />
            </Grid>
            <Grid item>
                <Typography variant="body2">
                    {trans("static:c816bc224d6e4ae5b60d9c7dd2e6b612")}: {typeof result}
                </Typography>
            </Grid>
        </Grid>
    );
};
