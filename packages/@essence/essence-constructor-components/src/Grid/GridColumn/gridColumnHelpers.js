// @flow
import moment from "moment";
import {getFieldDate} from "../../TextField/Fields/FieldDateRC/fieldDateHelpers";

type ForamtedColumnType = {
    format?: string,
    value?: any,
};

const formatedColumnBoolean = ({value}: ForamtedColumnType) => (value ? "Да" : "Нет");

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
