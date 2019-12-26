// @flow
import * as React from "react";
import memoise from "lodash/memoize";
import {Slider, preference} from "@essence/essence-constructor-components";
import {saveToStore, WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import {withStyles} from "@material-ui/core/styles";
import {Typography, Button, TextField, Paper, Grid, Switch} from "@material-ui/core";
import styles from "./PreferencePageStyles";

type PropsType = WithT & {
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
        // eslint-disable-next-line id-length
        const {classes, t} = this.props;
        const {form} = this.state;

        return (
            <Paper className={classes.root}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography variant="h3" component="h3" align="center">
                            {t("9c97fa4879f144a7b571c4905fa020cc")}
                        </Typography>
                    </Grid>
                    {this.renderPreference(
                        t("d39cbeb8128e4f68b201b25291889dd2"),
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
                        t("a43c94932e3a48c9867ac7b39bb22e60"),
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
                        t("a376942ff8af4ec58eeb18ea5a05e772"),
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
                        t("9a381df0ef4948ebaacb05852324d036"),
                        <Switch
                            checked={form.wysiwygCombineFields}
                            onChange={this.handleChange("wysiwygCombineFields")}
                            data-qtip={form.wysiwygCombineFields}
                        />,
                    )}
                    {this.renderPreference(
                        t("c038518f0652435ba9914848f8693454"),
                        <Switch
                            checked={form.redirectDebugWindow}
                            onChange={this.handleChange("redirectDebugWindow")}
                            data-qtip={form.redirectDebugWindow}
                        />,
                    )}
                    {this.renderPreference(
                        t("0852f8c548c741d39521833cd739a9f4"),
                        <Switch
                            checked={form.experimentalUI}
                            onChange={this.handleChange("experimentalUI")}
                            data-qtip={form.experimentalUI}
                        />,
                    )}
                    <TextField
                        label={t("ad56476c04ff4d6091d5e87f5d823a9b")}
                        value={form.modules}
                        name="modules"
                        onChange={this.handleChangeEvent}
                    />
                    <Grid item>
                        <Grid container justify="center">
                            <Grid item>
                                <Button variant="contained" onClick={this.handleSave}>
                                    {t("8a930c6b5dd440429c0f0e867ce98316")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withTranslation("meta")(withStyles(styles)(PreferencePage));
