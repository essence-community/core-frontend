import * as React from "react";
import moment from "moment";
import {IClassProps, RecordContext} from "@essence-community/constructor-share";
import {deepFind} from "@essence-community/constructor-share/utils";
import {useStyles} from "./ColumnDateContainer.styles";

const dateMap: Record<string, string> = {
    1: "YYYY",
    2: "MMM YYYY",
    3: "DD.MM.YYYY",
    4: "DD.MM.YYYY HH:00",
    5: "DD.MM.YYYY HH:mm",
    6: "DD.MM.YYYY HH:mm:ss",
    default: "DD.MM.YYYY",
};

export const ColumnDateContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const record = React.useContext(RecordContext);
    const [isExist, val] = deepFind(record, props.bc.column);
    const value = isExist ? val : undefined;
    const classes = useStyles();

    const formattedValue = React.useMemo(() => {
        const dateFormat: string = (bc.format && dateMap[bc.format]) || dateMap.default;

        const momentValue = typeof value === "string" ? moment(value) : undefined;

        if (momentValue && momentValue.isValid() && dateFormat) {
            const formatedDate = momentValue.format(dateFormat);

            return formatedDate;
        }

        return null;
    }, [bc.format, value]);

    return (
        <div data-qtip={formattedValue} className={classes.root}>
            {formattedValue}
        </div>
    );
};
