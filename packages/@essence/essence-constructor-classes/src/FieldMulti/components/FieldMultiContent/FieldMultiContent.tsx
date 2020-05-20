import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {Focusable} from "@essence-community/constructor-share/uicomponents";
import {Grid, CircularProgress, Button} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useTranslation, isEmpty} from "@essence-community/constructor-share/utils";
import {IField} from "@essence-community/constructor-share/Form";
import {FormContext, PopoverContext} from "@essence-community/constructor-share/context";
import {IFieldMultiModel} from "../../stores/FieldMultiModel";
import {useStyles} from "./FieldMultiContent.styles";

interface IFieldMultiContentProps extends IClassProps {
    store: IFieldMultiModel;
    field: IField;
}

export const FieldMultiContent: React.FC<IFieldMultiContentProps> = ({store, field, ...classProps}) => {
    const formContent = React.useContext(FormContext);
    const popoverCtx = React.useContext(PopoverContext);
    const fieldsBc = React.useMemo(() => store.getFieldsConfig(), [store]);
    const [trans] = useTranslation();
    const classes = useStyles();

    const handleAccept = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const {column} = fieldsBc[fieldsBc.length - 1];
        const lastField = column && formContent.select(column);

        if (lastField) {
            field.onChange(lastField.value);
            popoverCtx.onClose();
        }
    };

    const handleClear = () => {
        store.clearAction();

        fieldsBc.forEach((bc) => {
            const childField = bc.column && formContent.select(bc.column);

            if (childField) {
                childField.clear();
            }
        });
    };

    const handleCancel = () => {
        if (isEmpty(field.value)) {
            handleClear();
        }

        popoverCtx.onClose();
    };

    React.useEffect(() => {
        if (!isEmpty(field.value)) {
            store.fillActiveRecordAction(formContent, fieldsBc);
        }
    }, [field, fieldsBc, formContent, store]);

    return useObserver(() => (
        <Focusable>
            <Grid container direction="column" spacing={1} className={classes.wrapper} wrap="nowrap">
                {store.isLoading && (
                    <div className={classes.progressWrapper}>
                        <CircularProgress />
                    </div>
                )}
                {mapComponents(fieldsBc, (ChildCmp, childBc) => (
                    <Grid key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} item>
                        <ChildCmp {...classProps} bc={childBc} />
                    </Grid>
                ))}
                <Grid item>
                    <Grid container justify="flex-end" spacing={1}>
                        <Grid item>
                            <Button
                                data-page-object={`${classProps.bc[VAR_RECORD_PAGE_OBJECT_ID]}-accept`}
                                disabled={classProps.disabled}
                                data-qtip={trans("static:147bb56012624451971b35b1a4ef55e6")}
                                onClick={handleAccept}
                                color="primary"
                                variant="contained"
                            >
                                {trans("static:147bb56012624451971b35b1a4ef55e6")}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                data-page-object={`${classProps.bc[VAR_RECORD_PAGE_OBJECT_ID]}-cancel`}
                                disabled={classProps.disabled}
                                disableRipple
                                data-qtip={trans("static:3d27a32643ed4a7aa52b7e4b8a36806b")}
                                onClick={handleCancel}
                                color="secondary"
                                variant="contained"
                            >
                                {trans("static:3d27a32643ed4a7aa52b7e4b8a36806b")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Focusable>
    ));
};
