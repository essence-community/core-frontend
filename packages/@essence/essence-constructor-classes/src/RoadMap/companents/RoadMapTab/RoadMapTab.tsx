import * as React from "react";
import MaterialTab from "@material-ui/core/Tab";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils/transform";
import {IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {RoadMapModel} from "../../store/RoadMapModel";

export interface IRoadMapTab extends IClassProps {
    orientation: "vertical" | "horizontal";
    store: RoadMapModel;
    bc: IBuilderConfig;
    classes: {
        containerTab: string;
        leftSideTab: string;
        rightSideTab: string;
        root: string;
        textColorInherit: string;
        wrapper: string;
    };
    disabled: boolean;
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    icon?: string | React.ReactElement;
    label?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<{checked: boolean}>, value: any) => void;
    onClick?: React.EventHandler<any>;
    selected?: boolean;
    style?: React.CSSProperties;
    textColor?: string | "secondary" | "primary" | "inherit";
    value?: any;
    wrapped?: boolean;
    disableRipple?: boolean;
    tabIndex?: number;
}

const DEFAULT_WIDTH_TAB = 228;

const BuilderRoadMapTab: React.FC<IRoadMapTab> = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {orientation, classes, store, bc, disabled, pageStore, ...propsTab} = props;
    const {tabwidth} = bc;
    const style = React.useMemo(() => toColumnStyleWidth(tabwidth ?? DEFAULT_WIDTH_TAB), [tabwidth]);

    React.useEffect(() => {
        store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
            hidden: false,
        });

        return () => {
            store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
                hidden: true,
            });
        };
    }, [bc, store]);

    React.useEffect(() => {
        store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
            disabled,
        });

        return () => {
            store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
                disabled,
            });
        };
    }, [bc, disabled, store]);

    const tabClasses = React.useMemo(
        () => ({root: classes.root, textColorInherit: classes.textColorInherit, wrapper: classes.wrapper}),
        [classes],
    );

    if (orientation === "vertical") {
        return (
            <div className={classes.containerTab} style={style}>
                <MaterialTab {...propsTab} disabled={disabled} classes={tabClasses} />
            </div>
        );
    }

    return (
        <div className={classes.containerTab} style={style}>
            <span className={classes.leftSideTab} />
            <MaterialTab {...propsTab} disabled={disabled} classes={tabClasses} />
            <span className={classes.rightSideTab} />
        </div>
    );
};

export const RoadMapTab = commonDecorator(BuilderRoadMapTab);
