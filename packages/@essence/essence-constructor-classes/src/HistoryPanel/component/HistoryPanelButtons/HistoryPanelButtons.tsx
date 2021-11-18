import * as React from "react";
import {IClassProps, IStoreBaseModel, IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_CN_ORDER} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {useTheme, Grid} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {getHistoryPanelBtnsConfig} from "../../util/HistoryBtnConfig";

interface IOrderedBuielderConfig {
    bc: IBuilderConfig;
    order?: number;
}
function compareOrderedBC(left: IOrderedBuielderConfig, right: IOrderedBuielderConfig) {
    if (left.order === undefined || right.order === undefined) {
        return 1;
    }

    return left.order - right.order;
}

export interface IHistoryPanelButtonsProps extends IClassProps {
    store: IStoreBaseModel;
}
// eslint-disable-next-line max-lines-per-function
export const HistoryPanelButtons: React.FC<IHistoryPanelButtonsProps> = (props) => {
    const {store, bc, disabled} = props;
    const {btndelete, btnrefresh, btnaudit} = bc;
    const form = React.useContext(FormContext);
    const theme = useTheme();
    const [selectedRecordIndex, setSelectedRecordIndex] = React.useState<number>(-1);
    const [recordSize, setRecordSize] = React.useState<number>(0);

    React.useEffect(() => {
        setSelectedRecordIndex(store.recordsStore?.selectedRecordIndex || -1);
        setRecordSize(store.recordsStore?.records.length || 0);
        const dispossess = [
            reaction(
                () => store.recordsStore?.records.length,
                (len) => setRecordSize(typeof len === "undefined" ? 0 : len),
            ),
            reaction(
                () => store.recordsStore?.selectedRecordIndex,
                (val) => setSelectedRecordIndex(typeof val === "undefined" ? -1 : val),
            ),
        ];

        return () => dispossess.forEach((disposses) => disposses());
    }, [store]);
    const btnOptions = React.useMemo(() => getHistoryPanelBtnsConfig(bc, theme.palette.type), [bc, theme.palette.type]);

    const staticAll = React.useMemo(() => {
        const btns = [];
        const {overrides} = btnOptions;

        if (btnaudit) {
            btns.push({
                bc: overrides["Override Audit Button"],
                disabled,
                order: overrides["Override Audit Button"][VAR_RECORD_CN_ORDER],
            });
        }

        return btns;
    }, [btnOptions, btnaudit, disabled]);

    const btnBc = React.useMemo(() => {
        const {btns, overrides, btnsCollector} = btnOptions;
        const onlyIcon = theme.palette.type === "dark" ? true : undefined;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => !btn.btncollectorall);

        const btnsAll = [
            {
                bc: overrides["Override Add Button"],
                disabled,
                order: overrides["Override Add Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Edit Button"],
                disabled: disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0,
                order: overrides["Override Edit Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Clone Button"],
                disabled: disabled || selectedRecordIndex === -1,
                order: overrides["Override Clone Button"][VAR_RECORD_CN_ORDER],
            },
        ];

        if (btndelete) {
            btnsAll.push({
                bc: overrides["Override Delete Button"],
                disabled: disabled || selectedRecordIndex === -1 || selectedRecordIndex !== 0,
                order: overrides["Override Delete Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (btnrefresh) {
            btnsAll.push({
                bc: overrides["Override Refresh Button"],
                disabled,
                order: overrides["Override Refresh Button"][VAR_RECORD_CN_ORDER],
            });
        }

        btnsAll.push(
            {
                bc: overrides["Override Left Button"],
                disabled: disabled || recordSize === 0 || selectedRecordIndex === recordSize - 1,
                order: overrides["Override Left Button"][VAR_RECORD_CN_ORDER],
            },
            {
                bc: overrides["Override Right Button"],
                disabled: disabled || selectedRecordIndex === -1 || selectedRecordIndex === 0 || recordSize <= 1,
                order: overrides["Override Right Button"][VAR_RECORD_CN_ORDER],
            },
        );

        btns.forEach((btn) => {
            const contentview =
                btn.contentview?.startsWith("hbox") && theme.palette.type
                    ? btn.contentview.replace("hbox", "vbox")
                    : btn.contentview;

            btnsAll.push({
                bc: onlyIcon ? {...btn, contentview, onlyicon: true} : {...btn, contentview},
                disabled,
                order: btn[VAR_RECORD_CN_ORDER],
            });
        });

        if (showStaticBtns) {
            btnsAll.push(...staticAll);
        }

        if (btnsCollector) {
            const childBtns = [...staticAll].sort(compareOrderedBC).map((config) => ({
                ...config.bc,
                onlyicon: false,
            }));

            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    bc: {
                        ...btn,
                        onlyicon: onlyIcon ? true : btn.onlyicon,
                        topbtn: btn.topbtn ? [...btn.topbtn, ...childBtns] : childBtns,
                    },
                    disabled,
                    order: btn[VAR_RECORD_CN_ORDER],
                });
            });
        }

        return btnsAll.sort(compareOrderedBC);
    }, [btnOptions, btndelete, btnrefresh, disabled, recordSize, selectedRecordIndex, staticAll, theme.palette.type]);

    return useObserver(() => (
        <Grid
            container
            alignItems="center"
            spacing={1}
            direction={theme.palette.type === "dark" ? "column" : "row"}
            className={form.editing ? "hidden" : undefined}
        >
            {mapComponents(
                btnBc.map((config) => config.bc),
                (ChildCmp, childBc, index) => (
                    <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                        <ChildCmp {...props} bc={childBc} disabled={btnBc[index].disabled} />
                    </Grid>
                ),
            )}
        </Grid>
    ));
};
