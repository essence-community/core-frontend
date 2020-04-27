import * as React from "react";
import {useDisposable} from "mobx-react-lite";
import {reaction} from "mobx";
import {FileInputModel} from "../../store/FileInputModel";

interface IFileInputProps {
    store: FileInputModel;
    mode?: "multi" | string;
}

export const FileInput: React.FC<IFileInputProps> = (props) => {
    const {store, mode} = props;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleChangeFileChoose = (fileChooseAwait: () => void | null) => {
        const {current} = inputRef;

        if (fileChooseAwait && current) {
            current.click();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        const {current} = inputRef;

        if (store.fileChooseAwait && files.length > 0) {
            store.fileChooseAwait(files);

            if (current) {
                current.value = "";
            }
        }
    };

    useDisposable(() => reaction(() => store.fileChooseAwait, handleChangeFileChoose), []);

    return (
        <input
            type="file"
            onChange={handleChange}
            ref={inputRef}
            accept={store.fileTypes.join(",")}
            style={{display: "none"}}
            multiple={mode === "multi"}
        />
    );
};
