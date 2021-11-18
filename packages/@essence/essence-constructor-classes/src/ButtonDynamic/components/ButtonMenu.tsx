import {IBuilderConfig, IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import * as React from "react";
import {Popover, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import cn from "clsx";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton, useTheme} from "@material-ui/core";
import {IChildren} from "../store/DynamicButtonModel";
import {useStyles} from "./ButtonMenu.styles";

const anchorOrigins: Record<"dark" | "light" | "window", IPopoverAnchorOrigin> = {
    dark: {
        horizontal: "right",
        vertical: "center",
    },
    light: {
        horizontal: "left",
        vertical: "bottom",
    },
    window: {
        horizontal: "left",
        vertical: "top",
    },
};

const transformOrigins: Record<"dark" | "light" | "window", IPopoverTransfromOrigin> = {
    dark: {
        horizontal: -8,
        vertical: "center",
    },
    light: {
        horizontal: "left",
        vertical: 2,
    },
    window: {
        horizontal: "left",
        vertical: "bottom",
    },
};
const MAX_HEIGHT = 300;

function getTranformName(theme: IEssenceTheme, position?: string): "dark" | "light" | "window" {
    switch (true) {
        case position === "window":
            return "window";
        case position === "theme":
            return theme.palette.type;
        default:
            return theme.palette.type;
    }
}

interface IButtonMenuClass extends IClassProps {
    btns: IChildren[];
}

export const ButtonMenu: React.FC<IButtonMenuClass> = (props) => {
    const {bc, btns, disabled, pageStore} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const theme = useTheme<IEssenceTheme>();
    const tranformName = getTranformName(theme, bc.position);
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const qtip = bc.tipmsg || displayed;

    return (
        <Popover
            transformOrigin={transformOrigins[tranformName]}
            anchorOrigin={anchorOrigins[tranformName]}
            popoverContent={() => {
                return (
                    <Scrollbars autoHeight autoHeightMax={MAX_HEIGHT}>
                        <div className={classes.popoverContent}>
                            {btns.map(({rec, bc}) =>
                                mapComponentOne(
                                    bc,
                                    (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                        <RecordContext.Provider value={rec} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                            <Child {...props} bc={childBc} />
                                        </RecordContext.Provider>
                                    ),
                                ),
                            )}
                        </div>
                    </Scrollbars>
                );
            }}
            container={pageStore.pageEl}
            paperClassName={cn(classes.popoverRoot, {[classes.popoverWindowRoot]: tranformName === "window"})}
            width="auto"
            pageStore={pageStore}
            hideOnScroll
            focusableMount
            restoreFocusedElement
            tabFocusable={false}
        >
            {({open, onOpen, onClose}) => {
                const className =
                    tranformName === "window"
                        ? cn(classes.iconButtonWindowRoot, {[classes.iconButtonWindowOpenRoot]: open})
                        : cn(classes.iconButtonRoot, {[classes.iconButtonOpenRoot]: open});

                return (
                    <IconButton
                        className={className}
                        onClick={open ? onClose : onOpen}
                        disabled={disabled}
                        data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                        data-qtip={qtip ? trans(qtip) : ""}
                        color="inherit"
                    >
                        <Icon iconfont="mdi-dots-horizontal" iconfontname="mdi" color="inherit" />
                    </IconButton>
                );
            }}
        </Popover>
    );
};
