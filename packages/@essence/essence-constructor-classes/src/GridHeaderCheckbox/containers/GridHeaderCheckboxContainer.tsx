import * as React from "react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IClassProps, IRecord} from "@essence-community/constructor-share/types";
import {VAR_RECORD_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {reaction} from "mobx";
import {deepFind, isEmpty, mapValueToArray} from "@essence-community/constructor-share/utils";
import {checkPageSelectedRecords} from "../utils";

export const GridHeaderCheckboxContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const store = pageStore.stores.get(props.bc[VAR_RECORD_PARENT_ID]);

    const handleChange = () => {
        if (store) {
            store.invokeHandler("onToggleAllSelectedRecords", ["1", props.bc, {}]);
        }
    };

    const handlePrevent = (event: React.SyntheticEvent) => {
        event.stopPropagation();
    };

    const getChekedIcon = () => {
        if (store && store.recordsStore) {
            const isPageSelectedRecords = checkPageSelectedRecords(store, props.bc);

            if (store.bc.type === "TREEGRID" && isPageSelectedRecords) {
                return <Icon iconfont="check-square" size="xs" />;
            } else if (
                isPageSelectedRecords &&
                (!store.recordsStore.pageSize ||
                    store.recordsStore.selectedRecords.size === store.recordsStore?.records.length)
            ) {
                return <Icon iconfont="check-square" size="xs" />;
            }
        }

        return <Icon iconfont="minus-square" size="xs" />;
    };

    React.useEffect(() => {
        if (bc.setglobal && bc.setglobal.length) {
            const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
            let valueFields = [
                [
                    store?.recordsStore.recordId || bc.idproperty || VAR_RECORD_ID,
                    store?.recordsStore.recordId || bc.idproperty || VAR_RECORD_ID,
                ],
            ];

            if (bc.valuefield && bc.valuefield.length) {
                valueFields = bc.valuefield.map(({in: keyIn, out}) => {
                    const fieldKeyName = out || keyIn;

                    return [fieldKeyName, keyIn];
                });
            }

            return reaction(
                () => pageStore.stores.get(bc[VAR_RECORD_PARENT_ID])?.recordsStore?.selectedRecords,
                (selectedRecords) => {
                    const values: IRecord = {};

                    bc.setglobal.forEach(({in: keyIn, out}) => {
                        values[out] = mapValueToArray(selectedRecords).map((value) => {
                            const obj: IRecord = {};

                            if (isEmpty(keyIn)) {
                                if (valueFields.length === 1) {
                                    return deepFind(value, valueFields[0][1])[1];
                                }

                                valueFields.forEach(([valueFieldName, valueField]) => {
                                    obj[valueFieldName] = deepFind(value, valueField)[1];
                                });
                            } else {
                                const [isExist, res] = deepFind(value, keyIn);

                                obj[keyIn] = isExist ? res : value[keyIn];
                            }

                            return obj;
                        });
                    });

                    pageStore.updateGlobalValues(values);
                },
            );
        }
    }, [bc, pageStore]);

    return useObserver(() => (
        <Checkbox
            color="primary"
            checked={store?.recordsStore?.selectedRecords.size !== 0}
            disabled={props.readOnly || props.disabled || props.bc.disabled}
            onClick={handlePrevent}
            onChange={handleChange}
            icon={<Icon iconfont="square-o" size="xs" />}
            checkedIcon={getChekedIcon()}
        />
    ));
};
