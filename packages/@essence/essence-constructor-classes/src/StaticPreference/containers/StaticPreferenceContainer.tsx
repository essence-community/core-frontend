import * as React from "react";
import {Paper, Grid, Typography, Slider, Switch, Button, TextField} from "@material-ui/core";
import {IClassProps} from "@essence-community/constructor-share/types";
import {preference} from "@essence-community/constructor-share/constants";
import {saveToStore} from "@essence-community/constructor-share/utils";
import {useTranslation} from "@essence-community/constructor-share";
import {useStyles} from "./StaticPreferenceContainer.styles";

export const StaticPreferenceContainer: React.FC<IClassProps> = () => {
    const classes = useStyles();
    const [trans] = useTranslation();
    const [form, setForm] = React.useState(preference);
    const renderPreference = (title: string, setting: React.ReactNode) => (
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
    const handleSave = () => {
        saveToStore("preference", form);
        window.location.reload();
    };

    return (
        <Paper className={classes.root}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h3" component="h3" align="center">
                        {trans("static:9c97fa4879f144a7b571c4905fa020cc")}
                    </Typography>
                </Grid>
                {renderPreference(
                    trans("static:d39cbeb8128e4f68b201b25291889dd2"),
                    <Slider
                        value={form.delayTooltipShow}
                        min={100}
                        max={6000}
                        step={100}
                        onChange={(event: React.ChangeEvent, value: number) =>
                            setForm((prevForm) => ({...prevForm, delayTooltipShow: value}))
                        }
                        data-qtip={form.delayTooltipShow}
                    />,
                )}
                {renderPreference(
                    trans("static:a43c94932e3a48c9867ac7b39bb22e60"),
                    <Slider
                        value={form.offsetTooltip}
                        min={0}
                        max={50}
                        step={1}
                        onChange={(event: React.ChangeEvent, value: number) =>
                            setForm((prevForm) => ({...prevForm, offsetTooltip: value}))
                        }
                        data-qtip={form.offsetTooltip}
                    />,
                )}
                {renderPreference(
                    trans("static:a376942ff8af4ec58eeb18ea5a05e772"),
                    <Slider
                        value={form.debounceTooltipTime}
                        min={8}
                        max={400}
                        step={2}
                        onChange={(event: React.ChangeEvent, value: number) =>
                            setForm((prevForm) => ({...prevForm, debounceTooltipTime: value}))
                        }
                        data-qtip={form.debounceTooltipTime}
                    />,
                )}
                {renderPreference(
                    trans("static:9a381df0ef4948ebaacb05852324d036"),
                    <Switch
                        checked={form.wysiwygCombineFields}
                        onChange={(event: React.ChangeEvent, value: boolean) =>
                            setForm((prevForm) => ({...prevForm, wysiwygCombineFields: value}))
                        }
                        data-qtip={form.wysiwygCombineFields}
                    />,
                )}
                {renderPreference(
                    trans("static:c038518f0652435ba9914848f8693454"),
                    <Switch
                        checked={form.redirectDebugWindow}
                        onChange={(event: React.ChangeEvent, value: boolean) =>
                            setForm((prevForm) => ({...prevForm, redirectDebugWindow: value}))
                        }
                        data-qtip={form.redirectDebugWindow}
                    />,
                )}
                {renderPreference(
                    trans("static:0852f8c548c741d39521833cd739a9f4"),
                    <Switch
                        checked={form.experimentalUI}
                        onChange={(event: React.ChangeEvent, value: boolean) =>
                            setForm((prevForm) => ({...prevForm, experimentalUI: value}))
                        }
                        data-qtip={form.experimentalUI}
                    />,
                )}
                <TextField
                    label={trans("static:ad56476c04ff4d6091d5e87f5d823a9b")}
                    value={form.modules}
                    name="modules"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setForm((prevForm) => ({...prevForm, modules: event.target.value}))
                    }
                />
                <Grid item>
                    <Grid container justify="center">
                        <Grid item>
                            <Button variant="contained" onClick={handleSave}>
                                {trans("static:8a930c6b5dd440429c0f0e867ce98316")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
