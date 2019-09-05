// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {parse} from "@essence/essence-constructor-share/utils/parser";
import {type TextFieldChildProps} from "../../BuilderFieldType";

type StateType = {
    parser: {
        runer: (values?: Object) => mixed,
        variables: Array<string>,
    },
    source: string,
    values: Object,
};

class FieldComputed extends React.Component<TextFieldChildProps, StateType> {
    state = {
        parser: {
            runer: (values?: Object) => `Инициазилация с ${JSON.stringify(values)} `,
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
            case /^g?_?[c][nk]_/.test(name) && /^[\d.]+$/.test(value):
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
                [camelCaseMemoized(name)]: parsedValue,
            },
        }));
    };

    render() {
        const {source, values, parser} = this.state;
        const result = parser.runer(values);

        return (
            <Grid container spacing={8} direction="column">
                <Grid item>
                    <Grid container spacing={8}>
                        <Grid item xs={6}>
                            <Grid container spacing={8} direction="column">
                                <Grid item>
                                    <Typography>Выполнение</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField
                                        style={{height: "100%"}}
                                        label="Исходный код"
                                        value={source}
                                        onChange={this.handleChangeSource}
                                        multiline
                                        autoComplete="off"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={6}>
                            <Grid container spacing={8} direction="column">
                                <Grid item>
                                    <Typography>Переменные</Typography>
                                </Grid>
                                {this.state.parser.variables.map((variable) => (
                                    <Grid item key={variable}>
                                        <TextField
                                            name={variable}
                                            value={this.state.values[variable]}
                                            label={`Значение для ${variable}`}
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
                        label="Результат"
                        disabled
                        autoComplete="off"
                    />
                </Grid>
                <Grid item>
                    <Typography>Тип данных в результате: {typeof result}</Typography>
                </Grid>
            </Grid>
        );
    }
}

export default FieldComputed;
