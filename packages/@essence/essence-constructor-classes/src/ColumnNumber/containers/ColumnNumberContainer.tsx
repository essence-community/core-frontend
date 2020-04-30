import * as React from "react";
import {getBigNumberInstance} from "@essence-community/constructor-share/utils";
import {IClassProps} from "@essence-community/constructor-share/types";
import {RecordContext} from "@essence-community/constructor-share/context";
import {useStyles} from "./ColumnNumberContainer.styles";

export const ColumnNumberContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const classes = useStyles();
    const record = React.useContext(RecordContext);
    const value = record && bc.column ? record[bc.column] : undefined;
    const {BigNumber, decimalPrecision} = React.useMemo(() => getBigNumberInstance(bc), [bc]);

    if (typeof value === "string" || typeof value === "number") {
        const bigValue = new BigNumber(value);
        const formattedValue = decimalPrecision === -1 ? bigValue.toFormat() : bigValue.toFormat(decimalPrecision);

        return (
            <div className={classes.root} data-qtip={formattedValue}>
                {formattedValue}
            </div>
        );
    }

    return null;
};
