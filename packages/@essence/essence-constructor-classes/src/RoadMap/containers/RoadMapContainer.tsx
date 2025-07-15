 
 
import * as React from "react";
import {Grid} from "@mui/material";
import {mapComponents} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useModel} from "@essence-community/constructor-share/hooks";
import {useObserver} from "mobx-react";
import {RoadMapModel} from "../store/RoadMapModel";
import {RoadMapTabs} from "../companents/RoadMapTabs/RoadMapTabs";
import {useStyles} from "./RoadMapContainer.styles";

export const RoadMapContainer: React.FC<IClassProps> = (props) => {
    const {bc, disabled, readOnly, elevation, hidden, pageStore, visible} = props;
    const {align, childs} = bc;
    const [store] = useModel((options) => new RoadMapModel(options), props);
    const classes = useStyles();
    const orientation = React.useMemo(() => (align === "center" || align === "top" ? "horizontal" : "vertical"), [
        align,
    ]);
    const direction = React.useMemo(() => (align === "left" ? "row" : "row-reverse"), [align]);

    return useObserver(() => {
        if (!childs || !childs.length) {
            return null;
        }
        if (orientation === "horizontal") {
            return (
                <Grid
                    container
                    spacing={1}
                    className={classes.horizontal}
                    direction="column"
                    data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                >
                    <RoadMapTabs
                        bc={bc}
                        disabled={disabled}
                        visible={visible}
                        orientation={orientation}
                        store={store}
                        pageStore={pageStore}
                    />
                    {mapComponents(store.childs, (Cmp, child: IBuilderConfig) => {
                        const isVisible = child[VAR_RECORD_PAGE_OBJECT_ID] === store.tabValue;

                        return (
                            <Grid
                                size={12}
                                key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                style={{display: isVisible ? "block" : "none"}}
                            >
                                <Cmp
                                    bc={child}
                                    disabled={disabled}
                                    hidden={hidden}
                                    visible={isVisible ? visible : false}
                                    readOnly={readOnly}
                                    elevation={elevation}
                                    pageStore={pageStore}
                                />
                            </Grid>
                        );
                    })}
                    <Grid container spacing={1} justifyContent={"flex-end"} className={classes.bottomBar} direction="row">
                        {mapComponents(store.tabStatus.get(store.tabValue)?.btns, (BtnComponent, btn) => (
                            <Grid>
                                <BtnComponent
                                    key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                                    bc={btn}
                                    disabled={disabled}
                                    pageStore={pageStore}
                                    visible={visible}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={1} direction={direction}>
                <Grid size={2}>
                    <RoadMapTabs
                        bc={bc}
                        disabled={disabled}
                        visible={visible}
                        orientation={orientation}
                        store={store}
                        pageStore={pageStore}
                    />
                </Grid>
                <Grid size={10}>
                    <Grid container spacing={0} direction="column" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
                        {mapComponents(store.childs, (Cmp, child: IBuilderConfig) => {
                            const isVisible = child[VAR_RECORD_PAGE_OBJECT_ID] === store.tabValue;

                            return (
                                <Grid
                                    size={12}
                                    key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                                    style={{display: isVisible ? "block" : "none"}}
                                >
                                    <Cmp
                                        bc={child}
                                        disabled={disabled}
                                        hidden={hidden}
                                        visible={isVisible ? visible : false}
                                        readOnly={readOnly}
                                        elevation={elevation}
                                        pageStore={pageStore}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
                <Grid container
                    size={12}
                    spacing={1}
                    justifyContent={"flex-end"}
                    className={classes.bottomBar}
                    direction="row"
                >
                    {mapComponents(store.tabStatus.get(store.tabValue)!.btns, (BtnComponent, btn) => (
                        <Grid>
                            <BtnComponent
                                key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                                bc={btn}
                                disabled={disabled}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    });
};
