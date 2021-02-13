import * as React from "react";
import {IconButton, TextField} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useTextFieldProps} from "@essence-community/constructor-share/hooks";
import {useCallback} from "react";
import {FileInputModel} from "../store/FileInputModel";
import {useStyles} from "./FieldFileContainer.styles";

export const FieldFileContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const classes = useStyles();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const field = useField({bc, clearValue: [], disabled, hidden, isFile: true, pageStore});
    const fileInputStore = React.useMemo(() => new FileInputModel({applicationStore: null, bc, field, pageStore}), []);
    const handleChangeFileChoose = useCallback(
        (event: any) => {
            const {current} = inputRef;

            if (current) {
                current.click();
            }
            event.stopPropagation();
            event.preventDefault();
        },
        [inputRef],
    );

    const handleFilter = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const {target} = event;

            if (target) {
                const names = target.value.split(";");
                const files = field.value
                    ? (field.value as File[]).filter((file) => names.indexOf(file.name) > -1)
                    : [];

                fileInputStore.fileChooseAwait(files);
            }
        },
        [field, fileInputStore],
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files ? Array.from(event.target.files) : [];
            const {current} = inputRef;

            if (files.length > 0) {
                fileInputStore.fileChooseAwait(files);

                if (current) {
                    current.value = "";
                }
            }
        },
        [inputRef, fileInputStore],
    );
    const [drag, setDrag] = React.useState(false);
    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        if (event.dataTransfer.files) {
            setDrag(true);
        }
    }, []);

    const handleDragLeave = useCallback(() => {
        setDrag(false);
    }, []);

    const handleDropFile = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            const files = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
            const {current} = inputRef;

            if (files.length > 0) {
                fileInputStore.fileChooseAwait(files as any);

                if (current) {
                    current.value = "";
                }
            }
            setDrag(false);
            event.stopPropagation();
            event.preventDefault();
        },
        [inputRef, fileInputStore],
    );

    const textFieldProps = useTextFieldProps({
        bc,
        disabled,
        field,
        readOnly,
        tips: [
            <IconButton
                color="secondary"
                key="download"
                className={classes.eyeButton}
                onClick={handleChangeFileChoose}
                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-eye`}
                tabIndex={-1}
            >
                <Icon iconfont="download" size="xs" />
            </IconButton>,
        ],
    });

    return (
        <div
            onDrop={handleDropFile}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragExit={handleDragLeave}
            className={drag ? classes.dragTrue : null}
        >
            <TextField
                {...textFieldProps}
                inputProps={{
                    ...textFieldProps.inputProps,
                    value: field.value ? (field.value as File[]).map((file) => file.name).join(";") : "",
                }}
                onChange={handleFilter}
                onClick={handleChangeFileChoose}
            />
            <input
                type="file"
                onChange={handleChange}
                ref={inputRef}
                accept={fileInputStore.fileTypes.indexOf(".all") > -1 ? null : fileInputStore.fileTypes.join(",")}
                style={{display: "none"}}
                multiple={bc.filemode === "multi"}
            />
        </div>
    );
};
