import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share/context";
import {ColumnIconLink} from "../components/ColumnIconLink";

export const ColumnIconContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const record = React.useContext(RecordContext);

    const iconBc: IBuilderConfig = React.useMemo(() => {
        const btnBc: IBuilderConfig = {
            ...bc,
            iconsize: "xs",
            onlyicon: "true",
            type: "BTN",
            uitype: "7",
        };

        if (bc.dynamicicon === "true" && record && bc.iconfontname) {
            btnBc.handler = "none";

            if (bc.iconfont) {
                btnBc.iconfont = record[bc.iconfont] as string;
            }

            if (bc.iconfontname) {
                btnBc.iconfontname = record[bc.iconfontname] as "fa" | "mdi";
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
