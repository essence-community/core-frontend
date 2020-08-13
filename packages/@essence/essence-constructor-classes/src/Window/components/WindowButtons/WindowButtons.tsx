import * as React from "react";
import {DialogActions} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {FormContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";

interface IWindowButtonsProps extends IClassProps {
    className?: string;
    checkboxAddMode: React.ReactNode;
}

export const WindowButtons: React.FC<IWindowButtonsProps> = ({checkboxAddMode, className, ...classProps}) => {
    const {bc} = classProps;
    const form = React.useContext(FormContext);

    const btns = React.useMemo(
        () =>
            bc.bottombtn &&
            bc.bottombtn.map(
                (btnBc): IBuilderConfig => ({
                    confirmquestion:
                        btnBc.handler === "onCloseWindow" ? "static:9b475e25ae8a40b0b158543b84ba8c08" : undefined,
                    confirmquestionposition: "top",
                    position: "window",
                    ...btnBc,
                    uitype: btnBc.datatype === "save" || btnBc.handler === "onSimpleSaveWindow" ? "5" : btnBc.uitype,
                }),
            ),
        [bc.bottombtn],
    );

    return useObserver(() => (
        <DialogActions className={className}>
            {checkboxAddMode}
            {mapComponents(btns, (BtnComponent, btn) => (
                <BtnComponent
                    key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                    {...classProps}
                    bc={btn}
                    disabled={btn.handler === "onCloseWindow" ? false : form.submitting}
                />
            ))}
        </DialogActions>
    ));
};
