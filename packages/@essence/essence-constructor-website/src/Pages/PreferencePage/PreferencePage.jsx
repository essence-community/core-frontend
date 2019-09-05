// @flow
import * as React from "react";
import memoise from "lodash/memoize";
import {Slider, preference} from "@essence/essence-constructor-components";
import {saveToStore} from "@essence/essence-constructor-share/utils";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import styles from "./PreferencePageStyles";

type PropsType = {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
};
type StateType = {
    form: Object,
};

class PreferencePage extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            form: preference,
        };
    }

    handleChange = memoise((name: string) => (event: SyntheticEvent<>, value: number) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    });

    handleChangeEvent = (event: SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;

        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    handleSave = () => {
        saveToStore("preference", this.state.form);
        window.location.reload();
    };

    renderPreference = (title: string, setting: React.Node) => (
        <Grid item xs>
            <Grid container>
                <Grid item xs={3}>
                    {title}
                </Grid>
                <Grid item xs>
                    {setting}
                </Grid>
            </Grid>
        </Grid>
    );

    render() {
        const {classes} = this.props;
        const {form} = this.state;

        return (
            <Paper className={classes.root}>
                <Grid container direction="column" spacing={16}>
                    <Grid item>
                        <Typography variant="headline" component="h3" align="center">
                            Настройки системы
                        </Typography>
                    </Grid>
                    {this.renderPreference(
                        "Задержка Tooltip перед показом (delayTooltipShow)",
                        <Slider
                            value={form.delayTooltipShow}
                            min={100}
                            max={6000}
                            step={100}
                            onChange={this.handleChange("delayTooltipShow")}
                            data-qtip={form.delayTooltipShow}
                        />,
                    )}
                    {this.renderPreference(
                        "Отступ Tooltip по диагонали (offsetTooltip)",
                        <Slider
                            value={form.offsetTooltip}
                            min={0}
                            max={50}
                            step={1}
                            onChange={this.handleChange("offsetTooltip")}
                            data-qtip={form.offsetTooltip}
                        />,
                    )}
                    {this.renderPreference(
                        "Задержка Tooltip при движении (debounceTooltipTime)",
                        <Slider
                            value={form.debounceTooltipTime}
                            min={8}
                            max={400}
                            step={2}
                            onChange={this.handleChange("debounceTooltipTime")}
                            data-qtip={form.debounceTooltipTime}
                        />,
                    )}
                    {this.renderPreference(
                        "Включить режим объединения ячеек таблиц в wysiwyg (wysiwygCombineFields)",
                        <Switch
                            checked={form.wysiwygCombineFields}
                            onChange={this.handleChange("wysiwygCombineFields")}
                            data-qtip={form.wysiwygCombineFields}
                        />,
                    )}
                    {this.renderPreference(
                        "Включить режим отображения отладочного окна при передае" +
                            " параметров извне (redirectDebugWindow)",
                        <Switch
                            checked={form.redirectDebugWindow}
                            onChange={this.handleChange("redirectDebugWindow")}
                            data-qtip={form.redirectDebugWindow}
                        />,
                    )}
                    <TextField
                        label="Список модулей (modules)"
                        value={form.modules}
                        name="modules"
                        onChange={this.handleChangeEvent}
                    />
                    <Grid item>
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="contained" onClick={this.handleSave}>
                                    Сохранить
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(PreferencePage);
