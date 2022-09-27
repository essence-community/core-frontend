import * as React from "react";
import {Grid, useTheme} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {IClassProps, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_NAME} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useStyles} from "./PanelWrapper.styles";

export const PanelWrapper: React.FC<IClassProps> = (props) => {
    const {children, bc} = props;
    const {topbtn = [], hideactions} = bc;
    const form = React.useContext(FormContext);
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const isDarkTheme = React.useMemo(() => theme.essence.layoutTheme === 2, [theme]);
    const actions = React.useMemo(
        () =>
            topbtn
                .reverse()
                .filter((btnBc) => !btnBc[VAR_RECORD_NAME] || btnBc[VAR_RECORD_NAME]?.indexOf("Override") !== 0)
                .map((btnBc) => {
                    const contentview =
                        btnBc.contentview?.startsWith("hbox") && isDarkTheme
                            ? btnBc.contentview.replace("hbox", "vbox")
                            : btnBc.contentview;

                    return {
                        ...btnBc,
                        contentview,
                    };
                }),
        [topbtn],
    );

    const actionsBar = React.useMemo(() => {
        if (hideactions) {
            return null;
        }

        return (
            <Grid
                container
                className={classes.actionsContent}
                alignItems="center"
                direction={isDarkTheme ? "column-reverse" : "row"}
                spacing={1}
            >
                {mapComponents(actions, (ChildComp, childBc) => {
                    const isAddButton = childBc.mode === "1";
                    const newChildBc: IBuilderConfig = isAddButton
                        ? {...childBc, uitype: "4"}
                        : {...childBc, uitype: childBc.uitype === "1" ? "11" : childBc.uitype};

                    return (
                        <Grid item key={newChildBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildComp {...props} bc={newChildBc} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    }, [actions, classes.actionsContent, hideactions, isDarkTheme, props]);

    return useObserver(() => (
        <Grid
            container
            spacing={0}
            direction={isDarkTheme ? "row" : "column"}
            wrap="nowrap"
            className={cn({
                [classes.panelEditing]:
                    form.placement !== "application" && form.placement !== "pager" ? form.editing : false,
            })}
            data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
        >
            {hideactions || topbtn.length === 0 ? null : (
                <Grid item className={classes.actionsBar}>
                    {actionsBar}
                </Grid>
            )}
            <Grid item xs zeroMinWidth>
                {children}
            </Grid>
        </Grid>
    ));
};
