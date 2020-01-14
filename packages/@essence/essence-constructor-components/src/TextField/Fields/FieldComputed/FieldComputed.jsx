// @flow
import * as React from "react";
import {Grid, TextField, Typography} from "@material-ui/core";
import {withTranslation, WithT, i18next} from "@essence-community/constructor-share/utils";
import {parse} from "@essence-community/constructor-share/utils/parser";
import {type TextFieldChildProps} from "../../BuilderFieldType";

type StateType = {
    parser: {
        runer: (values?: Object) => mixed,
        variables: Array<string>,
    },
    source: string,
    values: Object,
};

class FieldComputed extends React.Component<TextFieldChildProps & WithT, StateType> {
    state = {
        parser: {
            runer: (values?: Object) => `${i18next.t("static:e077e7f97f954e85905a8e754511e441")} ${JSON.stringify(values)} `,
            variables: [],
        },
        source: "",
        values: {},
    };

    componentDidMount() {
        const {value} = this.props;

        if (value) {
            this.setState({
                parser: parse(String(value), true),
            });
        }

        this.setState({
            source: String(value),
        });
    }

    handleChangeSource = (event: SyntheticEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;

        this.props.onChange(event);

        this.setState({
            parser: parse(value, true),
            source: value,
        });
    };

    handleChangeField = (event: SyntheticEvent<HTMLInputElement>) => {
        const {value, name} = event.currentTarget;
        let parsedValue = null;

        switch (true) {
            case /^g?_?[c][nk]_/u.test(name) && /^[\d.]+$/u.test(value):
                parsedValue = parseFloat(value);
                break;
            case value === "null":
                parsedValue = null;
                break;
            case value === "undefined":
                parsedValue = undefined;
                break;
            default:
                parsedValue = value;
        }

        this.setState((prevState) => ({
            values: {
                ...prevState.values,
                [name]: parsedValue,
            },
        }));
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {t} = this.props;
        const {source, values, parser} = this.state;
        const result = parser.runer(values);

        return (
            <Grid container spacing={1} direction="column">
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                    <Typography variant="body2">{t("static:9207ff3b431a4dc58f16a28d2aae0ea8")}</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        style={{height: "100%"}}
                                        label={t("static:6029c25920ff4f79b9b52d664322b3d9")}
                                        value={source}
                                        onChange={this.handleChangeSource}
                                        multiline
                                        autoComplete="off"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container spacing={1} direction="column">
                                <Grid item>
                                    <Typography variant="body2">{t("static:a363461339754846881b1f84b6706851")}</Typography>
                                </Grid>
                                {this.state.parser.variables.map((variable) => (
                                    <Grid item key={variable}>
                                        <TextField
                                            name={variable}
                                            value={this.state.values[variable]}
                                            label={`${t("static:a326c00cf6b54d7ebdc358e283383ccb")} ${variable}`}
                                            onChange={this.handleChangeField}
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
                        label={t("static:b4458be782404651a4cfcad47d2ae17a")}
                        disabled
                        autoComplete="off"
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        {t("static:c816bc224d6e4ae5b60d9c7dd2e6b612")}: {typeof result}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default withTranslation("meta")(FieldComputed);
