import {Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {IWithModelProps, withModel} from "@essence/essence-constructor-share/decorators";
import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {observer} from "mobx-react";
import * as React from "react";
import {ExampleModel} from "./ExampleModel";

export const Example = ({store}: IWithModelProps<ExampleModel>) => (
    <List>
        <Divider />
        {store.recordsStore.records.map((record: any) => (
            <React.Fragment key={record[VAR_RECORD_ID]}>
                <ListItem>
                    <ListItemText primary={record[store.column]} secondary={record[store.displayField]} />
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
        <Divider />
    </List>
);

export default withModel(({bc, pageStore}): ExampleModel => new ExampleModel({bc, pageStore}), "store")(
    observer(Example),
);
