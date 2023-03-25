import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_QUERY_ID} from "@essence-community/constructor-share/constants/variables";
import {ColumnIconLink} from "../components/ColumnIconLink";

export const ColumnIconContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const record = React.useContext(RecordContext);

    const iconBc: IBuilderConfig = React.useMemo(() => {
        const first = bc.childs?.[0] || (({} as any) as IBuilderConfig);
        const btnBc: IBuilderConfig = {
            contentview: "menu",
            ...bc,
            hidden: false,
            hiddenrules: undefined,
            ...first,
            iconsize: "xs",
            onlyicon: true,
            type:
                bc[VAR_RECORD_QUERY_ID] ||
                first[VAR_RECORD_QUERY_ID] ||
                bc.records ||
                bc.recordsrule ||
                first.records ||
                first.recordsrule
                    ? "BTN_DYNAMIC"
                    : "BTN",
            uitype: "7",
        };

        if (bc.dynamicicon && record && bc.iconfontname) {
            if (bc.iconfont) {
                btnBc.iconfont = record[bc.iconfont] as string;
            }

            if (bc.iconfontname) {
                btnBc.iconfontname = (record[bc.iconfontname] || bc.iconfontname || "fa") as "fa" | "mdi";
            }
        }

        return btnBc;
    }, [bc, record]);

    if (bc.handler === "showMenu") {
        return <ColumnIconLink {...props} bc={iconBc} />;
    }

    return (
        <>
            {mapComponentOne(iconBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </>
    );
};
