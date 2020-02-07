import * as React from "react";
import {useObserver} from "mobx-react";
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {useModel} from "@essence-community/constructor-share/hooks";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {IModuleProps} from "@essence-community/constructor-share/types";
import {ApplicationContext} from "@essence-community/constructor-share/context";
import {ExampleModel} from "../store/ExampleModel";

export const ExampleContainer = (props: IModuleProps) => {
    const applicationStore = React.useContext(ApplicationContext);
    const [store] = useModel(
        (pr) => new ExampleModel({applicationStore: applicationStore, bc: pr.bc, pageStore: pr.pageStore}),
        props,
    );

    return useObserver(() => (
        <List>
            <Divider />
            {store.recordsStore.records.map((record: any) => (
                <React.Fragment key={record[VAR_RECORD_ID]}>
                    <ListItem>
                        <ListItemText primary={record[props.bc.column]} secondary={record[props.bc.displayfield]} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
            <Divider />
        </List>
    ));
};
