import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {RecordContext} from "@essence-community/constructor-share/context";

export const ColumnBooleanContainer: React.FC<IClassProps> = (props) => {
    const [trans] = useTranslation("meta");
    const record = React.useContext(RecordContext);
    const value = props.bc.column && record ? record[props.bc.column] : "";
    const translatedValue = value
        ? trans("static:dacf7ab025c344cb81b700cfcc50e403")
        : trans("static:f0e9877df106481eb257c2c04f8eb039");

    return <div data-qtip={translatedValue}>{translatedValue}</div>;
};
