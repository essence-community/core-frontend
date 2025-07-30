import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {TextField} from '@mui/material';
import {ExampleContainer} from "./containers/ExampleContainer";
import {ExampleBox} from "./components/ExampleBox";

const App = (props: IClassProps) => (
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
