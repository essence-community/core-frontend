import {IBuilderConfig, IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
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
import {useTheme} from "@material-ui/core";
import {observer} from "mobx-react";
import {IChildren, DynamicButtonModel} from "../store/DynamicButtonModel";
import {useStyles} from "./ButtonMenu.styles";

const anchorOrigins: Record<number | "window" | "left" | "right", IPopoverAnchorOrigin> = {
    1: {
        horizontal: "left",
        vertical: "bottom",
    },
    2: {
        horizontal: "right",
        vertical: "center",
    },
    left: {
        horizontal: "right",
        vertical: "top",
    },
    right: {
        horizontal: "right",
        vertical: "top",
    },
    window: {
        horizontal: "left",
        vertical: "top",
    },
};

const transformOrigins: Record<number | "window" | "left" | "right", IPopoverTransfromOrigin> = {
    1: {
        horizontal: "left",
        vertical: 2,
    },
    2: {
        horizontal: -8,
        vertical: "center",
    },
    left: {
        horizontal: "right",
        vertical: "top",
    },
    right: {
        horizontal: "left",
        vertical: "top",
    },
    window: {
        horizontal: "left",
        vertical: "bottom",
    },
};
const MAX_HEIGHT = 300;

function getTranformName(theme: IEssenceTheme, position?: string): number | "window" | "left" | "right" {
    switch (true) {
        case position === "window":
            return "window";
        case position === "left":
            return "left";
        case position === "right":
            return "right";
        case position === "theme":
            return theme.essence.layoutTheme;
        default:
            return theme.essence.layoutTheme;
    }
}

interface IButtonMenuClass extends IClassProps {
    btns: IChildren[];
    store: DynamicButtonModel;
}

export const ButtonMenu: React.FC<IButtonMenuClass> = observer((props) => {
    const {bc, btns, store, pageStore} = props;
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const tranformName = getTranformName(theme, bc.position);

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
            {mapComponentOne(store.menuBtn, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                <Child {...props} bc={childBc} />
            ))}
        </Popover>
    );
});
