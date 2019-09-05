import {IModuleProps} from "@essence/essence-constructor-share/types";
import {TextField} from "@material-ui/core";
import * as React from "react";
import Example from "./Example"
import "./index.css";

const App = (props: IModuleProps) => <div className="box">
    <div><TextField label="Test Field" /></div>
    <div><Example {...props} /></div>
</div>;

export default App;
