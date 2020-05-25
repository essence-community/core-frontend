import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {
    useModel,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {isEmpty} from "@essence-community/constructor-share/utils";
import {useField} from "@essence-community/constructor-share/Form";
import {reaction} from "mobx";
import {Popover, UIForm} from "@essence-community/constructor-share/uicomponents";
import {FieldMultiAddrModel} from "../stores/FieldMultiAddrModel";
import {FieldMultiModel} from "../stores/FieldMultiModel";
import {FieldMultiMoModel} from "../stores/FieldMultiMoModel";
import {FieldMultiInput} from "../components/FieldMultiInput";
import {FieldMultiContent} from "../components/FieldMultiContent";
import {useStyles} from "./FieldMultiContainer.styles";

const MODELS: Record<string, typeof FieldMultiModel> = {
    addr: FieldMultiAddrModel,
    mo: FieldMultiMoModel,
};

export const FieldMultiContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const [store] = useModel((options) => new MODELS[options.bc.datatype || ""](options), props);
    const field = useField({bc, disabled, hidden, pageStore});
    const classes = useStyles();
    const contentRef = React.useRef<HTMLDivElement>(null);

    useFieldGetGlobal({bc, field, pageStore, store});
    useFieldSetGlobal({bc, field, pageStore, store});
    useDefaultValueQuery({bc, field, pageStore});

    React.useEffect(() => {
        return reaction(
            () => field.value,
            (value) => {
                if (isEmpty(value)) {
                    store.clearAction();
                } else {
                    store.searchRecordAction(String(value));
                }
            },
            {
                fireImmediately: true,
            },
        );
    }, [field, store]);

    const handleSubmit = React.useCallback(() => {
        // TODO: Делать проверку на disabled: false
        requestAnimationFrame(() => {
            const {current: contentEl} = contentRef;

            if (contentEl) {
                const elements = Array.from(contentEl.querySelectorAll("input, button:not([tabindex='-1'])"));
                const nextSelectedIndex = elements.findIndex((el) => el === document.activeElement) + 1;
                const nextElement = elements[nextSelectedIndex];

                if (nextElement instanceof HTMLElement) {
                    nextElement.focus();
                }
            }
        });
    }, []);

    return (
        <Popover
            popoverContent={
                <UIForm pageStore={pageStore} onSubmit={handleSubmit} submitOnChange>
                    <div ref={contentRef} className={classes.content}>
                        <FieldMultiContent {...props} store={store} field={field} />
                    </div>
                </UIForm>
            }
            paperClassName={classes.paper}
            container={pageStore.pageEl}
            restoreFocusedElement
            pageStore={pageStore}
            hideOnScroll
        >
            <FieldMultiInput bc={bc} disabled={disabled} readOnly={readOnly} field={field} store={store} />
        </Popover>
    );
};
