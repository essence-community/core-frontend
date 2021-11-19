import * as React from "react";
import {Grid, useTheme} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import cn from "clsx";
import {useObserver} from "mobx-react";
import {IClassProps, IStoreBaseModel, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {HistoryPanelButtons} from "../HistoryPanelButtons/HistoryPanelButtons";
import {PanelEditingButtons} from "../PanelEditingButtons/PanelEditingButtons";
import {useStyles} from "./HistoryPanelWrapper.styles";

export const HistoryPanelWrapper: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const {hideactions} = bc;
    const form = React.useContext(FormContext);
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const isDarkTheme = theme.essence.layoutTheme === 2;
    const [store, setStore] = React.useState<IStoreBaseModel | undefined>(undefined);
    const boxBc = React.useMemo<IBuilderConfig>(() => ({...bc, type: "PANEL.BOX"}), [bc]);

    React.useEffect(() => {
        setStore(pageStore.stores.get(bc[VAR_RECORD_PAGE_OBJECT_ID]));

        return reaction(
            () => pageStore.stores.get(bc[VAR_RECORD_PAGE_OBJECT_ID]),
            (val) => setStore(val),
        );
    }, [pageStore, bc]);

    return useObserver(() => (
        <Grid
            container
            spacing={0}
            direction={isDarkTheme ? "row" : "column"}
            wrap="nowrap"
            className={cn({[classes.panelEditing]: form.editing})}
            data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
        >
            <Grid item className={classes.actionsBar}>
                {store && store.editing ? <PanelEditingButtons {...props} /> : null}
                {store && !hideactions ? <HistoryPanelButtons {...props} store={store} /> : null}
            </Grid>
            <Grid item xs zeroMinWidth className={classes.contentForm}>
                {mapComponentOne(boxBc, (Child, childBc) => (
                    <Child key={childBc.ck_page_object} {...props} bc={childBc} />
                ))}
            </Grid>
        </Grid>
    ));
};
