import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share/context";
import {
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants/variables";
import {useGetValue} from "@essence-community/constructor-share/hooks/useCommon/useGetValue";
import {reaction} from "mobx";
import {parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {ColumnIconLink} from "../components/ColumnIconLink";

export const ColumnIconContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const record = React.useContext(RecordContext);
    const getValue = useGetValue({pageStore});
    const [first, setFirst] = React.useState<IBuilderConfig>(({} as any) as IBuilderConfig);

    React.useEffect(
        () =>
            reaction(
                () =>
                    bc.childs?.find(
                        (bcChild) => bcChild.activerules && parseMemoize(bcChild.activerules).runer({get: getValue}),
                    ) ||
                    bc.childs?.[0] ||
                    (({} as any) as IBuilderConfig),
                setFirst,
                {fireImmediately: true},
            ),
        [bc.childs, getValue],
    );
    const iconBc: IBuilderConfig = React.useMemo(() => {
        const btnBc: IBuilderConfig = {
            contentview: "menu",
            ...bc,
            childs: Object.keys(first).length ? undefined : bc.childs,
            hidden: false,
            hiddenrules: undefined,
            ...first,
            [VAR_RECORD_MASTER_ID]: bc[VAR_RECORD_MASTER_ID],
            [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
            iconsize: "xs",
            onlyicon: true,
            type:
                first.type ||
                (bc[VAR_RECORD_QUERY_ID] ||
                first[VAR_RECORD_QUERY_ID] ||
                bc.records ||
                bc.recordsrule ||
                first.records ||
                first.recordsrule
                    ? "BTN_DYNAMIC"
                    : "BTN"),
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
    }, [bc, first, record]);

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
