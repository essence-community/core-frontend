import * as React from "react";
import {makeRedirectUrl, Translation, deepFind, makeRedirect} from "@essence-community/constructor-share/utils";
import {IClassProps} from "@essence-community/constructor-share/types";
import {RecordContext} from "@essence-community/constructor-share/context";
import {toString} from "../utils";
import {useStyles} from "./ColumnTextContainer.styles";

export const ColumnTextContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const record = React.useContext(RecordContext);
    const [isExist, val] = deepFind(record, props.bc.column);
    const value = isExist ? toString(val) : undefined;
    const classes = useStyles();
    const redirectUrl = React.useMemo(
        () =>
            bc.redirecturl || bc.redirectusequery
                ? makeRedirectUrl({
                      bc,
                      pageStore,
                      record,
                  })
                : undefined,
        [bc, pageStore, record],
    );

    const handleRedirect = (event: React.SyntheticEvent) => {
        event.preventDefault();

        makeRedirect(bc, pageStore, record, !redirectUrl.blank);
    };

    if (typeof value !== "string") {
        return null;
    }

    const getRenderValue = (localizedValue: string, qtip: string = localizedValue) => {
        if (redirectUrl?.isRedirect) {
            return (
                <a
                    className={classes.root}
                    href={redirectUrl.pathname}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleRedirect}
                    data-qtip={localizedValue}
                >
                    {localizedValue}
                </a>
            );
        }

        return (
            <div className={classes.root} data-qtip={qtip}>
                {localizedValue}
            </div>
        );
    };

    // eslint-disable-next-line prefer-named-capture-group
    const stringValue = value.replace(/((<br)|\r|\n)[\s\S]*/iu, "...");

    if (bc.localization) {
        return (
            <Translation ns={bc.localization}>{(trans) => getRenderValue(trans(stringValue, stringValue))}</Translation>
        );
    }

    return getRenderValue(stringValue, value);
};
