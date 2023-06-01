import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {RecordContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_LEAF} from "@essence-community/constructor-share/constants";
import {Translation, deepFind, makeRedirect, makeRedirectUrl} from "@essence-community/constructor-share/utils";
import {ColumnTreeSchevron} from "../components/ColumnTreeSchevron";
import {ColumnTreeIcon} from "../components/ColumnTreeIcon";
import {useStyles} from "./ColumnTreeContainer.styles";

const NESTING_SPACING = 16;
const LEAF_ICON_WIDTH = 30;

export const ColumnTreeContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled} = props;
    const record = React.useContext(RecordContext) || {};
    const leaf = record[VAR_RECORD_LEAF];
    const isLeaf = typeof leaf === "boolean" ? leaf : leaf === "true";
    const addPadding = isLeaf ? LEAF_ICON_WIDTH : 0;
    const [isExist, val] = deepFind(record, props.bc.column);
    const value = isExist ? String(val) : undefined;
    const classes = useStyles(props);
    const redirectUrl = React.useMemo(
        () =>
            bc.redirecturl
                ? makeRedirectUrl({
                      authData: pageStore.applicationStore.authStore.userInfo,
                      bc,
                      columnsName: bc.columnsfilter,
                      pageStore,
                      record,
                      redirecturl: bc.redirecturl,
                  })
                : undefined,
        [bc, pageStore, record],
    );
    const handleRedirect = (event: React.SyntheticEvent) => {
        event.preventDefault();

        makeRedirect(bc, pageStore, record, true);
    };
    const getRenderValue = (localizedValue: string, qtip: string = localizedValue) => {
        if (redirectUrl?.pathname) {
            return (
                <a
                    className={classes.root}
                    href={redirectUrl.pathname}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={redirectUrl.blank ? undefined : handleRedirect}
                    data-qtip={localizedValue}
                >
                    {localizedValue}
                </a>
            );
        }

        return (
            <span className={classes.root} data-qtip={qtip}>
                {localizedValue}
            </span>
        );
    };

    return (
        <span
            style={{
                paddingLeft: record.nesting ? Number(record.nesting) * NESTING_SPACING + addPadding : addPadding,
            }}
        >
            {isLeaf ? null : <ColumnTreeSchevron bc={bc} record={record} pageStore={pageStore} disabled={disabled} />}
            <ColumnTreeIcon pageStore={pageStore} bc={bc} record={record} />
            {bc.localization || record.type === "root" ? (
                <Translation ns={bc.localization}>
                    {(trans) => {
                        const valueTrans = trans(
                            record.type === "root" ? "static:e3e33760864d44f88a9ecfe8f5da7a0b" : value,
                            value,
                        );

                        return record.type === "root" ? (
                            <span className={classes.root} data-qtip={valueTrans}>
                                {valueTrans}
                            </span>
                        ) : (
                            getRenderValue(valueTrans)
                        );
                    }}
                </Translation>
            ) : (
                getRenderValue(value)
            )}
        </span>
    );
};
