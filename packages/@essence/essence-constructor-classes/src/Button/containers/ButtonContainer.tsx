import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share";
import {useButtonClick} from "../hooks/useButtonClick";
import {FileInput} from "../components/FileInput";
import {FileInputModel} from "../store/FileInputModel";
import {ButtonConfirm} from "../components/ButtonConfirm/ButtonConfirm";

export const ButtonContainer: React.FC<IClassProps> = (props) => {
    const {bc, readOnly, disabled, pageStore} = props;
    const fileInputStore = React.useMemo(() => {
        return bc.mode === "8" ? new FileInputModel({applicationStore: null, bc, pageStore}) : undefined;
    }, [bc, pageStore]);
    const [onClick, isDisabled] = useButtonClick({
        bc,
        disabled,
        fileInputStore,
        pageStore,
    });

    return (
        <>
            <ButtonConfirm
                pageStore={pageStore}
                disabled={readOnly || isDisabled || disabled}
                bc={bc}
                onClick={onClick}
            />
            {fileInputStore ? <FileInput store={fileInputStore} mode={props.bc.filemode} /> : null}
        </>
    );
};
