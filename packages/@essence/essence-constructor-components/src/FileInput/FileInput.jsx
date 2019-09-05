// @flow
import * as React from "react";
import {reaction} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import {type FileInputModel, type FileInputChooseAwaitType} from "../stores/FileInputModel";

type PropsType = {
    store: FileInputModel,
    mode?: "single" | "multi",
};

export class FileInput extends React.Component<PropsType> {
    static defaultProps = {
        mode: "single",
    };

    inputRef = React.createRef();

    componentDidMount() {
        disposeOnUnmount(this, [reaction(() => this.props.store.fileChooseAwait, this.handleChangeFileChoose)]);
    }

    handleChangeFileChoose = (fileChooseAwait: ?FileInputChooseAwaitType) => {
        const {current} = this.inputRef;

        if (fileChooseAwait && current) {
            current.click();
        }
    };

    handleChange = async (event: SyntheticInputEvent<>) => {
        const {store} = this.props;
        const files = Array.from(event.target.files);
        const {current} = this.inputRef;

        if (store.fileChooseAwait && files.length > 0) {
            await store.fileChooseAwait(files);

            if (current) {
                current.value = "";
            }
        }
    };

    render() {
        const {mode} = this.props;

        return (
            <input
                type="file"
                onChange={this.handleChange}
                ref={this.inputRef}
                accept={this.props.store.fileTypes.join(",")}
                style={{display: "none"}}
                multiple={mode === "multi"}
            />
        );
    }
}

export default observer(FileInput);
