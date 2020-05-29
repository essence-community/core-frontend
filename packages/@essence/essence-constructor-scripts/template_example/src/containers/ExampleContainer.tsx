import * as React from "react";
import {useObserver} from "mobx-react";
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {useModel} from "@essence-community/constructor-share/hooks";
import {IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {ExampleModel} from "../store/ExampleModel";

export const ExampleContainer: React.FC<IClassProps> = (props) => {
    const [store] = useModel((options) => new ExampleModel(options), props);

    return useObserver(() => (
        <List>
            <Divider />
            {store.recordsStore.records.map((record: IRecord) => (
                <React.Fragment key={record[store.recordsStore.recordId] as string}>
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
