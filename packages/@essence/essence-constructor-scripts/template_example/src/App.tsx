import * as React from "react";
import {IModuleProps} from "@essence-community/constructor-share/types";
import {TextField} from "@material-ui/core";
import {ExampleContainer} from "./containers/ExampleContainer";
import {ExampleBox} from "./components/ExampleBox";

const App = (props: IModuleProps) => (
    <ExampleBox color="primary">
        <div>
            <TextField label="Test Field" />
        </div>
        <div>
            <ExampleContainer {...props} />
        </div>
    </ExampleBox>
);

export default App;
