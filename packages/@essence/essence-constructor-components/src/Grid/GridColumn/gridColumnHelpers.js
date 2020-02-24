// @flow
import moment from "moment";
import {getFieldDate} from "../../TextField/Fields/FieldDateRC/fieldDateHelpers";

type ForamtedColumnType = {
    format?: string,
    value?: any,
};

const formatedColumnBoolean = ({value}: ForamtedColumnType) =>
    value ? "static:dacf7ab025c344cb81b700cfcc50e403" : "static:f0e9877df106481eb257c2c04f8eb039";

const formatedColumnDate = (props: ForamtedColumnType) => {
    const dateConfig: Object = getFieldDate(props.format);
    const momentValue = moment(props.value);

    if (momentValue.isValid() && dateConfig) {
        const formatedDate = momentValue.format(dateConfig.format);

        return formatedDate;
    }

    return null;
};
const formatColumnCheckbox = () => "";

const tipsMap = {
    boolean: formatedColumnBoolean,
    checkbox: formatColumnCheckbox,
    date: formatedColumnDate,
};

export const renderTip = (type: string, value: any, format?: string) =>
    tipsMap[type] ? tipsMap[type]({format, value}) : value;
