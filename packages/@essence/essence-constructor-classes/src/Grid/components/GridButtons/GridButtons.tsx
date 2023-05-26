import * as React from "react";
import {IClassProps, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_CN_ORDER,
    VAR_RECORD_JN_TOTAL_CNT,
} from "@essence-community/constructor-share/constants";
import {Grid, useTheme} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {Pagination} from "@essence-community/constructor-share/uicomponents/Pagination";
import {RecordContext} from "@essence-community/constructor-share/context";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {getGridBtnsConfig} from "../../utils";

interface IGridButtonsProps extends IClassProps {
    isInlineEditing: boolean;
    store: IGridModel;
}

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

// eslint-disable-next-line max-lines-per-function
export const GridButtons: React.FC<IGridButtonsProps> = ({isInlineEditing, store, ...classProps}) => {
    const {bc} = classProps;
    const theme = useTheme<IEssenceTheme>();
    const activeElement = React.useRef<Element | null>();

    const gridBtnsConfig = React.useMemo(() => getGridBtnsConfig(bc, theme.essence.layoutTheme), [
        bc,
        theme.essence.layoutTheme,
    ]);
    const gridButtons = React.useMemo(() => {
        const staticBtns: IOrderedBuielderConfig[] = [];
        const {overrides} = gridBtnsConfig;

        if (bc.btnsettings) {
            staticBtns.push({
                bc: {
                    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_setting`,
                    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                    onlyicon: true,
                    readonly: false,
                    type: "GRID_SETTINGS",
                    uitype: "11",
                },
                order: 10100,
            });
        }

        if (bc.btnaudit) {
            staticBtns.push({
                bc: overrides["Override Audit Button"],
                order: overrides["Override Audit Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (bc.btnexcel && bc.btnexcel !== "off") {
            staticBtns.push({
                bc: overrides["Override Excel Button"],
                order: overrides["Override Excel Button"][VAR_RECORD_CN_ORDER],
            });
        }

        return staticBtns;
    }, [bc, gridBtnsConfig]);
    const btnsFinal = React.useMemo(() => {
        const {btns, overrides, btnsCollector} = gridBtnsConfig;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => !btn.btncollectorall);
        const btnsAll: IOrderedBuielderConfig[] = [
            ...btns.map<IOrderedBuielderConfig>((btn) => {
                const isAddButton =
                    btn.mode === "1" || btn.handler === "onCreateChildWindowMaster" || btn.handler === "onSimpleAddRow";
                const contentview =
                    btn.contentview?.startsWith("hbox") && theme.essence.layoutTheme === 2
                        ? btn.contentview.replace("hbox", "vbox")
                        : btn.contentview;

                return {
                    bc: isAddButton
                        ? {...btn, contentview, uitype: "4"}
                        : {...btn, contentview, uitype: btn.uitype === "1" ? "11" : btn.uitype},
                    order: btn[VAR_RECORD_CN_ORDER],
                };
            }),
        ];

        if (bc.btndelete) {
            btnsAll.push({
                bc: overrides["Override Delete Button"],
                order: overrides["Override Delete Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (bc.btnrefresh) {
            btnsAll.push({
                bc: overrides["Override Refresh Button"],
                order: overrides["Override Refresh Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (showStaticBtns) {
            btnsAll.push(...gridButtons);
        }
        if (btnsCollector) {
            const childBtns = [...gridButtons].sort(compareOrderedBC).map((config) => ({
                ...config.bc,
                onlyicon: false,
            }));

            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    bc: {
                        ...btn,
                        ...(btn.btncollectorall
                            ? {topbtn: btn.topbtn ? [...btn.topbtn, ...childBtns] : childBtns}
                            : {}),
                    },
                    order: btn[VAR_RECORD_CN_ORDER],
                });
            });
        }

        return btnsAll.sort(compareOrderedBC);
    }, [bc, gridBtnsConfig, gridButtons, theme]);

    React.useEffect(() => {
        if (!isInlineEditing && activeElement.current instanceof HTMLElement) {
            activeElement.current.focus();
        }

        activeElement.current = isInlineEditing ? document.activeElement : null;
    }, [isInlineEditing]);

    return useObserver(() => {
        const {pageSize, recordsCount, pageNumber} = store.recordsStore;
        const record = {...(store.selectedRecord || {}), [VAR_RECORD_JN_TOTAL_CNT]: recordsCount};

        return (
            <Grid
                container
                spacing={1}
                alignItems="center"
                direction={theme.essence.layoutTheme === 1 ? "row" : "column"}
                className={isInlineEditing ? "hidden" : undefined}
            >
                <RecordContext.Provider value={record}>
                    {mapComponents(
                        btnsFinal.map((config) => config.bc),
                        (ChildCmp, childBc) => (
                            <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                <ChildCmp {...classProps} bc={childBc} />
                            </Grid>
                        ),
                    )}
                </RecordContext.Provider>

                {pageSize && theme.essence.layoutTheme === 1 ? (
                    <>
                        <Grid item xs>
                            &nbsp;
                        </Grid>
                        <Grid item>
                            <Pagination
                                disabled={classProps.disabled || isInlineEditing}
                                count={recordsCount}
                                rowsPerPage={pageSize}
                                page={pageNumber}
                                onChangePage={store.recordsStore.setPageNumberAction}
                                ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                            />
                        </Grid>
                    </>
                ) : null}
            </Grid>
        );
    });
};
