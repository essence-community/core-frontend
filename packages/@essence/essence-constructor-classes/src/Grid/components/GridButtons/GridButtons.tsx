import * as React from "react";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_CN_ORDER,
} from "@essence-community/constructor-share/constants";
import {Grid, useTheme} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react-lite";
import {Pagination} from "@essence-community/constructor-share/uicomponents/Pagination";
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

export const GridButtons: React.FC<IGridButtonsProps> = ({isInlineEditing, store, ...classProps}) => {
    const {bc} = classProps;
    const theme = useTheme();
    const activeElement = React.useRef<Element | null>();

    const gridBtnsConfig = React.useMemo(() => getGridBtnsConfig(bc, theme.palette.type), [bc, theme.palette.type]);
    const gridButtons = React.useMemo(() => {
        const staticBtns: IOrderedBuielderConfig[] = [];
        const {overrides} = gridBtnsConfig;

        if (bc.btnsettings === "true") {
            staticBtns.push({
                bc: {
                    [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_setting`,
                    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                    onlyicon: "true",
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

        if (bc.btnexcel === "true") {
            staticBtns.push({
                bc: overrides["Override Excel Button"],
                order: overrides["Override Excel Button"][VAR_RECORD_CN_ORDER],
            });
        }

        return staticBtns;
    }, [bc, gridBtnsConfig]);
    const btnsFinal = React.useMemo(() => {
        const {btns, overrides, btnsCollector} = gridBtnsConfig;
        const showStaticBtns = !btnsCollector || btnsCollector.every((btn) => btn.btncollectorall !== "true");
        const btnsAll: IOrderedBuielderConfig[] = [
            ...btns.map((btn) => {
                const isAddButton =
                    btn.mode === "1" || btn.handler === "onCreateChildWindowMaster" || btn.handler === "onSimpleAddRow";

                return {
                    bc: isAddButton ? {...btn, uitype: "4"} : {...btn, uitype: btn.uitype === "1" ? "11" : btn.uitype},
                    order: btn[VAR_RECORD_CN_ORDER],
                };
            }),
        ];

        if (bc.btndelete === "true") {
            btnsAll.push({
                bc: overrides["Override Delete Button"],
                order: overrides["Override Delete Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (bc.btnrefresh === "true") {
            btnsAll.push({
                bc: overrides["Override Refresh Button"],
                order: overrides["Override Refresh Button"][VAR_RECORD_CN_ORDER],
            });
        }

        if (showStaticBtns) {
            btnsAll.push(...gridButtons);
        } else if (btnsCollector) {
            const childBtns = [...gridButtons].sort(compareOrderedBC).map((config) => ({
                ...config.bc,
                onlyicon: "false",
            }));

            btnsCollector.forEach((btn) => {
                btnsAll.push({
                    bc: {...btn, topbtn: btn.topbtn ? [...btn.topbtn, ...childBtns] : childBtns},
                    order: btn[VAR_RECORD_CN_ORDER],
                });
            });
        }

        return btnsAll.sort(compareOrderedBC);
    }, [bc, gridBtnsConfig, gridButtons]);

    React.useEffect(() => {
        if (!isInlineEditing && activeElement.current instanceof HTMLElement) {
            activeElement.current.focus();
        }

        activeElement.current = isInlineEditing ? document.activeElement : null;
    }, [isInlineEditing]);

    return useObserver(() => {
        const {pageSize, recordsCount, pageNumber} = store.recordsStore;

        return (
            <Grid
                container
                spacing={1}
                alignItems="center"
                direction={theme.palette.type === "light" ? "row" : "column"}
                className={isInlineEditing ? "hidden" : undefined}
            >
                {mapComponents(
                    btnsFinal.map((config) => config.bc),
                    (ChildCmp, childBc) => (
                        <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildCmp {...classProps} bc={childBc} />
                        </Grid>
                    ),
                )}

                {pageSize && theme.palette.type === "light" ? (
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
