import * as React from "react";
import cn from "clsx";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {Grid, Collapse, Typography} from "@material-ui/core";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {useObserver} from "mobx-react";
import {FormContext} from "@essence-community/constructor-share/context";
import {FilterModel} from "../../store/FilterModel";
import {useStyles} from "./FilterButtons.styles";

interface IFilterButtonsProps extends IClassProps {
    styleTheme: "dark" | "light";
    title?: string | JSX.Element;
    store: FilterModel;
}

const GRID_FULL_WIDTH = 12;

export const FilterButtons: React.FC<IFilterButtonsProps> = (props) => {
    const {store, styleTheme, bc, title, ...classProps} = props;
    const classes = useStyles();
    const form = React.useContext(FormContext);

    const btnsFilter = React.useMemo(
        () => ({
            buttonChevronConfigClose: {
                [VAR_RECORD_DISPLAYED]: "static:76dd4f170842474d9776fe712e48d8e6",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                disabled: false,
                handler: "onFilterToggle",
                iconfont: "chevron-down",
                noform: true,
                onlyicon: true,
                readonly: false,
                type: "BTN",
                uitype: "11",
            } as IBuilderConfig,
            buttonChevronConfigOpen: {
                [VAR_RECORD_DISPLAYED]: "static:72b93dbe37884153a95363420b9ceb59",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-chevron`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                disabled: false,
                handler: "onFilterToggle",
                iconfont: "chevron-up",
                noform: true,
                onlyicon: true,
                readonly: false,
                type: "BTN",
                uitype: "11",
            } as IBuilderConfig,
            buttonResetConfig: {
                [VAR_RECORD_DISPLAYED]: "static:cda88d85fb7e4a88932dc232d7604bfb",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-reset`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                handler: "onReset",
                iconfont: styleTheme === "light" ? "broom" : "eraser",
                iconfontname: "mdi",
                noform: true,
                onlyicon: true,
                readonly: false,
                type: "BTN",
                uitype: "11",
            } as IBuilderConfig,
            buttonSearchConfig: {
                [VAR_RECORD_DISPLAYED]: "static:704af666dbd3465781149e4282df5dcf",
                [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-search`,
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
                iconfont: "search",
                onlyicon: true,
                readonly: false,
                type: "BTN",
                uitype: "14",
            } as IBuilderConfig,
        }),
        [bc, styleTheme],
    );

    return useObserver(() => {
        const btns: IBuilderConfig[] = [
            store.isOpen ? btnsFilter.buttonChevronConfigOpen : btnsFilter.buttonChevronConfigClose,
            {
                ...btnsFilter.buttonSearchConfig,
                disabled:
                    (styleTheme === "dark" && store.isOpen === false) ||
                    (form &&
                        ((!form.isValid && form.validationCount === 0) ||
                            (!store.isOpen && form.isExistRequired && form.validationCount === 0)))
                        ? true
                        : false,
                handler: store.isOpen ? undefined : "onSearch",
                required: form && form.isDirty && store.isOpen ? true : false,
            },
            {
                ...btnsFilter.buttonResetConfig,
                disabled: styleTheme === "dark" && store.isOpen === false ? true : false,
            },
        ];
        const childsBtns = bc.topbtn
            ? bc.topbtn.map((btn) => ({...btn, topbtn: btn.topbtn ? [...btn.topbtn, ...btns] : btns}))
            : btns;

        return (
            <Grid
                item
                xs={styleTheme === "light" ? GRID_FULL_WIDTH : false}
                className={cn(classes.filterButtons, {
                    [classes.filterButtonsCollect]: bc.topbtn,
                })}
            >
                {styleTheme === "dark" ? (
                    <Collapse in={store.isOpen} collapsedHeight="42px" className={classes.filterButtonsContainer}>
                        <div className={classes.filterButtonsCollapse}>
                            {mapComponents(childsBtns, (ChildCmp, childBc) => (
                                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...classProps} bc={childBc} />
                            ))}
                        </div>
                    </Collapse>
                ) : (
                    <div className={classes.filterButtonsContainer}>
                        {mapComponents(childsBtns, (ChildCmp, childBc) => (
                            <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...classProps} bc={childBc} />
                        ))}
                    </div>
                )}

                {styleTheme === "light" ? (
                    <Grid item xs={12} className={classes.titleContainer}>
                        <Typography variant="body2" className={classes.titleTypography} data-qtip={title}>
                            {title}
                            &nbsp;
                        </Typography>
                    </Grid>
                ) : null}
            </Grid>
        );
    });
};
