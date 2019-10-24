import {IClassProps, Scrollbars} from "@essence/essence-constructor-share";
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

    return useObserver(() => {
        const {routesStore, pagesStore} = applicationStore;
        const {favorits, recordsStore} = routesStore;

        return (
            <Scrollbars>
                <Grid container direction="column" className={classes.root} wrap="nowrap">
                    {recordsStore.records
                        .filter((rec: IRoute) => favorits.get(rec.ckId))
                        .map((record: IRoute) => (
                            <FavoritePage
                                route={record}
                                routesStore={routesStore}
                                key={record.ckId}
                                pagesStore={pagesStore}
                            />
                        ))}
                </Grid>
            </Scrollbars>
        );
    });
};
