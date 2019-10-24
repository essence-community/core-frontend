import {IClassProps, Scrollbars} from "@essence/essence-constructor-share";
import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {ApplicationContext} from "@essence/essence-constructor-share/context";
import * as React from "react";
import {useObserver} from "mobx-react-lite";
import {Grid} from "@material-ui/core";
import {FavoritePage} from "../components/FavoritePage";
import {IRoute} from "../components/FavoritePage.types";
import {useStyles} from "./FavoritePages.styles";

export const FavoritePages: React.FC<IClassProps> = (props) => {
    const applicationStore = React.useContext(ApplicationContext);
    const classes = useStyles(props);

    if (!applicationStore) {
        throw new Error("Not found applicationStore");
    }
    const {routesStore, pagesStore} = applicationStore;
    const {favorits, recordsStore} = routesStore;

    return useObserver(() => (
        <Scrollbars>
            <Grid container direction="column" className={classes.root} wrap="nowrap">
                {recordsStore.records
                    .filter((rec: IRoute) => favorits.get(rec[VAR_RECORD_ID]))
                    .map((record: IRoute) => (
                        <FavoritePage
                            route={record}
                            routesStore={routesStore}
                            key={record[VAR_RECORD_ID]}
                            pagesStore={pagesStore}
                        />
                    ))}
            </Grid>
        </Scrollbars>
    ));
};
