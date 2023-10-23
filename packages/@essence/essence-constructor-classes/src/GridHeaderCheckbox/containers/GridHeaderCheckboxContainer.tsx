import * as React from "react";
import {Checkbox, TableCell} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IClassProps, IRecord, IStoreBaseModel} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_ID,
    VAR_RECORD_LEAF,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {reaction} from "mobx";
import {deepFind, isEmpty, mapValueToArray} from "@essence-community/constructor-share/utils";
import {checkPageSelectedRecords} from "../utils";

export const GridHeaderCheckboxContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const [store, setStore] = React.useState<IStoreBaseModel>(null);

    React.useEffect(() => {
        return reaction(
            () => pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]),
            (val) => setStore(val),
            {
                fireImmediately: true,
            },
        );
    }, [pageStore, bc]);

    React.useEffect(() => {
        if (!store) {
            return;
        }

        return reaction(
            () => store.recordsStore.recordsState.records,
            (records) => {
                const isTree = store.bc.type === "TREEGRID";

                records.forEach((record) => {
                    const leaf = record[VAR_RECORD_LEAF];

                    if (
                        record[bc.column || "checked"] &&
                        (!isTree || (isTree && (typeof leaf === "boolean" ? leaf : leaf === "true"))) &&
                        store.handlers.onToggleSelectedRecord
                    ) {
                        store.handlers.onToggleSelectedRecord("1", bc, {record});
                    }
                });
            },
            {
                fireImmediately: true,
            },
        );
    }, [store, bc]);

    const handleChange = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handlePrevent = (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (store) {
            store.invokeHandler("onToggleAllSelectedRecords", ["1", props.bc, {}]);
        }
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
        if (store && bc.setglobal && bc.setglobal.length) {
            let valueFields = [
                [
                    store.recordsStore.recordId || bc.idproperty || VAR_RECORD_ID,
                    store.recordsStore.recordId || bc.idproperty || VAR_RECORD_ID,
                ],
            ];

            if (bc.valuefield && bc.valuefield.length) {
                valueFields = bc.valuefield.map(({in: keyIn, out}) => {
                    const fieldKeyName = out || keyIn;

                    return [fieldKeyName, keyIn];
                });
            }

            return reaction(
                () => mapValueToArray(store.recordsStore.selectedRecords) as IRecord[],
                (selectedRecords) => {
                    const values: IRecord = {};

                    bc.setglobal.forEach(({in: keyIn, out}) => {
                        values[out] = selectedRecords.length
                            ? selectedRecords.map((value) => {
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
                              })
                            : undefined;
                    });

                    pageStore.updateGlobalValues(values);
                },
            );
        }
    }, [store, bc, pageStore]);

    return useObserver(() => (
        <TableCell padding="none" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
            <Checkbox
                color="primary"
                checked={store?.recordsStore?.selectedRecords.size !== 0}
                disabled={props.readOnly || props.disabled || props.bc.disabled}
                onClick={handlePrevent}
                onChange={handleChange}
                icon={<Icon iconfont="square-o" size="xs" />}
                checkedIcon={getChekedIcon()}
            />
        </TableCell>
    ));
};
