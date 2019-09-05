/* eslint-disable import/order */
// @flow
import * as React from "react";
import TextField from "../../TextField";
import type {TextFieldChildProps} from "../../BuilderFieldType";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";

class FieldTextarea extends React.Component<TextFieldChildProps> {
    render() {
        const {value} = this.props;

        return (
            <Scrollbars autoHeight autoHeightMax={190} autoHeightMin={30}>
                <TextField
                    {...this.props}
                    noQtip
                    style={{
                        height: "100%",
                    }}
                    value={value}
                    multiline
                />
            </Scrollbars>
        );
    }
}
export default FieldTextarea;
