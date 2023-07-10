/* eslint-disable max-lines-per-function */
import * as React from "react";
import cn from "clsx";
import {reaction} from "mobx";
import {Grid} from "@material-ui/core";
import {isEmpty, useTranslation} from "@essence-community/constructor-share/utils";
import {mapComponents} from "@essence-community/constructor-share/components";
import {Icon} from "@essence-community/constructor-share/Icon";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {FormContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react";
import {useSizeChild} from "@essence-community/constructor-share/hooks";
import {getColumns, isIncorrect, getTip} from "../utils";
import {useStyles} from "./FieldGroupContainer.styles";

const renderSuccess = (bc: IBuilderConfig) => {
    return bc.reqcount || bc.reqcountrules ? <Icon iconfont="check" /> : null;
};
const MAX_PANEL_WIDTH = 12;

export const FieldGroupContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const classes = useStyles();
    const [reqCount, setReqCount] = React.useState(0);
    const columns = React.useMemo(() => getColumns(bc.childs), [bc.childs]);
    const form = React.useContext(FormContext);
    const field = useField({bc, disabled, hidden, pageStore});
    const [trans] = useTranslation("meta");
    const inFilter = form.placement === "filter";
    const isRow = bc.contentview === "hbox";
    const displayed = bc[VAR_RECORD_DISPLAYED];

    /**
     * @returns {number} fieldStatus - признак заполнения полей.
     * Если меньше 0 - количество полей с ошибками.
     * Если больше 0 - количество пустых полей.
     */
    const handleGetValues = React.useCallback((): number => {
        let emptyFieldsCount = 0;
        let invalidFieldsCount = 0;

        columns.forEach((column) => {
            const columnField = form.select(column);

            if (columnField) {
                if (isEmpty(columnField.value)) {
                    emptyFieldsCount += 1;
                }

                if (!columnField.isValid) {
                    invalidFieldsCount -= 1;
                }
            }
        });

        return invalidFieldsCount || emptyFieldsCount;
    }, [columns, form]);

    const handleChangeReqCount = React.useCallback(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        (reqcount: number = 0) => {
            field.setExtraRules([`reqcount:${reqcount},${columns.length}`]);
            field.validate();

            setReqCount(reqcount);
        },
        [columns.length, field],
    );

    const handleChangeValue = React.useCallback(
        (status: number) => {
            field.onChange(status);
            field.setDefaultValue(status);
            field.validate();
        },
        [field],
    );

    const handleRegCountRules = React.useCallback((): number => {
        if (bc.reqcountrules) {
            return parseMemoize(bc.reqcountrules).runer(pageStore.globalValues) as number;
        }

        return 0;
    }, [bc.reqcountrules, pageStore]);

    React.useEffect(() => {
        const newValue = handleGetValues();

        field.onChange(newValue);
        field.setDefaultValue(newValue);

        handleChangeReqCount(bc.reqcount);
    }, [bc.reqcount, field, handleChangeReqCount, handleGetValues]);

    React.useEffect(() => reaction(handleGetValues, handleChangeValue), [handleChangeValue, handleGetValues]);
    React.useEffect(() => {
        if (bc.reqcountrules) {
            return reaction(handleRegCountRules, handleChangeReqCount, {fireImmediately: true});
        }

        return undefined;
    }, [bc.reqcountrules, handleChangeReqCount, handleRegCountRules]);
    const [childs, sizeChild] = useSizeChild(bc.childs);

    return useObserver(() => {
        const status =
            !field.isValid || isIncorrect(bc, field, reqCount) ? `${getTip(bc, field, reqCount)} *` : renderSuccess(bc);

        return (
            <Grid
                container
                spacing={1}
                className={cn(classes.root, {
                    [classes.rootError]: !field.isValid,
                    [classes.filterRoot]: inFilter,
                    [classes.panelRoot]: !inFilter,
                })}
                {...((bc.contentview && GRID_CONFIGS[bc.contentview]) || GRID_CONFIGS.hbox)}
                {...((bc.contentview && bc.align && GRID_ALIGN_CONFIGS[`${bc.align}-${bc.contentview}`]) ||
                    GRID_ALIGN_CONFIGS["left-hbox"])}
                data-qtip={field.isValid ? "" : trans("static:a5a5d7213d1f4f77861ed40549ee9c57")}
            >
                <Grid container className={classes.label} wrap="nowrap" justify="space-between">
                    <Grid item className={classes.labelTextStartAngle}>
                        &nbsp;
                    </Grid>
                    {displayed ? (
                        <Grid item className={`${classes.labelDisplay}`} data-qtip={trans(displayed)}>
                            {trans(displayed)}
                        </Grid>
                    ) : null}
                    <Grid item xs className={classes.labelTextLine}>
                        &nbsp;
                    </Grid>
                    {Boolean(status) && (
                        <Grid item className={`${classes.labelStatus}`}>
                            {status}
                        </Grid>
                    )}
                    <Grid item className={classes.labelTextEndAngle}>
                        &nbsp;
                    </Grid>
                </Grid>
                {mapComponents(childs, (ChildCmp, child) => (
                    <Grid
                        item
                        xs={isRow ? true : MAX_PANEL_WIDTH}
                        key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                        className={classes.child}
                        style={sizeChild[child[VAR_RECORD_PAGE_OBJECT_ID]]}
                    >
                        <ChildCmp {...props} bc={child} />
                    </Grid>
                ))}
            </Grid>
        );
    });
};
