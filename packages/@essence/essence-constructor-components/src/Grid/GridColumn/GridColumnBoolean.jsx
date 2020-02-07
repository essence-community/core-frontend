// @flow
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {type GridColumnPropsType} from "./GridColumnTypes";

// eslint-disable-next-line id-length
const GridColumnBooleanBuilder = ({value, t}: GridColumnPropsType & WithT) =>
    value ? t("static:dacf7ab025c344cb81b700cfcc50e403") : t("static:f0e9877df106481eb257c2c04f8eb039");

export const GridColumnBoolean = withTranslation("meta")(GridColumnBooleanBuilder);
export default GridColumnBoolean;
