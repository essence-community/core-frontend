import moment from "moment";
import * as React from "react";
import {FormContext} from "@essence-community/constructor-share/context";
import {parse} from "@essence-community/constructor-share/utils/parser";
import {IFieldBuildClassProps} from "../components/FieldDate.types";

export function useFieldDateDisabled(props: IFieldBuildClassProps) {
    const {bc, pageStore} = props;
    const {disabledenddate, disabledstartdate, minvalue, maxvalue} = bc;
    const form = React.useContext(FormContext);
    const handleValidateDisabledDate = React.useMemo(() => {
        const handlers: ((value: moment.Moment) => boolean)[] = [];

        if (disabledenddate) {
            handlers.push((endValue: moment.Moment) => {
                const startValue = moment(form.select(disabledenddate)?.value as string);

                if (!startValue.isValid()) {
                    return false;
                }

                // - true|false for fraction value
                return endValue.diff(startValue, "days", true) < 0;
            });
        }
        if (disabledstartdate) {
            handlers.push((startValue: moment.Moment) => {
                const endValue = moment(form.select(disabledstartdate)?.value as string);

                if (!endValue.isValid()) {
                    return false;
                }

                // - true|false for fraction value
                return endValue.diff(startValue, "days", true) < 0;
            });
        }
        if (minvalue) {
            handlers.push((value: moment.Moment) => {
                const valueBcParsed = parse(minvalue).runer(pageStore.globalValues);

                const valueBcMoment = valueBcParsed ? moment(valueBcParsed as string) : undefined;

                if (!valueBcMoment || !(valueBcMoment as moment.Moment).isValid()) {
                    return false;
                }

                return value.diff(valueBcMoment, "days", true) < 0;
            });
        }
        if (maxvalue) {
            handlers.push((value: moment.Moment) => {
                const valueBcParsed = parse(maxvalue).runer(pageStore.globalValues);

                const valueBcMoment = valueBcParsed ? moment(valueBcParsed as string) : valueBcParsed;

                if (!valueBcMoment || !(valueBcMoment as moment.Moment).isValid()) {
                    return false;
                }

                return (valueBcMoment as moment.Moment).diff(value, "days", true) < 0;
            });
        }

        return () => (value?: moment.Moment) => {
            if (!value) {
                return false;
            }
            if (handlers.find((fn) => fn(value))) {
                return true;
            }

            return false;
        };
    }, [disabledenddate, disabledstartdate, form, maxvalue, minvalue, pageStore.globalValues]);

    return [handleValidateDisabledDate];
}
