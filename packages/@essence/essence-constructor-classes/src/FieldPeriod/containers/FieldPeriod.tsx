import * as React from "react";
import {useTranslation, toTranslateText, isEmpty} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants/variables";
import {IClassProps} from "@essence-community/constructor-share/types/Class";
import {Grid} from "@material-ui/core";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {loggerRoot} from "@essence-community/constructor-share/constants";

const logger = loggerRoot.extend("FieldPeriodContainer");

export const FieldPeriodContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const [trans] = useTranslation("meta");

    const [bcStart, bcEnd] = React.useMemo(() => {
        const {
            columnstart,
            columnend,
            childs,
            [VAR_RECORD_DISPLAYED]: displayed,
            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
            ...childBc
        } = bc;

        if (childs && childs.length === 2) {
            const columnStart = childs[0].column || columnstart;
            const columnEnd = childs[1].column || columnend;

            return [
                {
                    column: columnStart,
                    disabledstartdate: columnEnd,
                    rules: `before_not_required:${columnEnd}`,
                    validaterelated: `${columnEnd}`,
                    ...childs[0],
                },
                {
                    column: columnEnd,
                    disabledenddate: columnStart,
                    rules: `after_not_required:${columnStart}`,
                    validaterelated: `${columnStart}`,
                    ...childs[1],
                },
            ];
        }

        if (isEmpty(columnstart)) {
            logger(`Required param "columnstart" empty ck_page_object: ${ckPageObject}`);
        }
        if (isEmpty(columnend)) {
            logger(`Required param "columnend" empty ck_page_object: ${ckPageObject}`);
        }

        const transCvDisplayed = toTranslateText(trans, displayed);

        return [
            {
                [VAR_RECORD_DISPLAYED]: `${transCvDisplayed} ${trans("static:d7d40d765f0840beb7f0db2b9298ac0c")}`,
                [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                column: columnstart,
                disabledstartdate: columnend,
                rules: `before_not_required:${columnend}`,
                validaterelated: `${columnend}`,
                ...childBc,
                type: "IFIELD",
            },
            {
                [VAR_RECORD_DISPLAYED]: `${transCvDisplayed} ${trans("static:acc7f22ccbc6407bb253f8c47a684c45")}`,
                [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                column: columnend,
                disabledenddate: columnstart,
                rules: `after_not_required:${columnstart}`,
                validaterelated: `${columnstart}`,
                ...childBc,
                type: "IFIELD",
            },
        ];
    }, [bc, trans]);

    return (
        <Grid container wrap="nowrap" spacing={1} alignItems="center">
            <Grid item xs zeroMinWidth>
                {mapComponentOne(bcStart, (Comp, childBc) => (
                    <Comp {...props} bc={childBc} />
                ))}
            </Grid>
            <Grid item>-</Grid>
            <Grid item xs zeroMinWidth>
                {mapComponentOne(bcEnd, (Comp, childBc) => (
                    <Comp {...props} bc={childBc} />
                ))}
            </Grid>
        </Grid>
    );
};
