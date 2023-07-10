import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {parseMemoize} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {useStyles} from "./ColumnContainer.styles";

const WIDTH_MAP: Record<string, number> = {
    action: 30,
    checkbox: 30,
    detail: 30,
    icon: 30,
};

export const ColumnContainer: React.FC<IClassProps> = (props) => {
    const record = React.useContext(RecordContext);
    const {bc} = props;
    const classes = useStyles();
    const isAction = bc.datatype === "icon" || bc.datatype === "detail";
    const childBc = React.useMemo(
        () => ({
            ...bc,
            type: `${bc.type}.${bc.datatype ? bc.datatype.toUpperCase() : ""}`,
        }),
        [bc],
    );
    const style = React.useMemo(() => {
        const width = bc.datatype && WIDTH_MAP[bc.datatype];

        if (bc.stylerules) {
            return {
                width,
                ...(parseMemoize(bc.stylerules).runer(record) as React.CSSProperties),
            };
        }

        return {width};
    }, [bc.datatype, bc.stylerules, record]);

    return (
        <td
            style={style}
            className={cn(classes.root, {
                [classes.button]: isAction,
                [classes[`align-${bc.align}` as keyof typeof classes]]: bc.align,
            })}
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-column-datatype-${bc.datatype}`}
        >
            {mapComponentOne(childBc, (ChildCmp) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </td>
    );
};
