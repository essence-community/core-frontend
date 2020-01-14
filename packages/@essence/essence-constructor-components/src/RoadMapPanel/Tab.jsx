// @flow
import * as React from "react";
import MaterialTab from "@material-ui/core/Tab";
import omit from "lodash/omit";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import commonDecorator from "../decorators/commonDecorator";
import {type PageModelType} from "../stores/PageModel";
import {type RoadMapModelType} from "../stores/RoadMapModel";

type PropsType = {
    classes: {
        [$Keys: string]: string,
    },
    bc: Object,
    hidden?: boolean,
    visible: boolean,
    disabled?: boolean,
    readOnly?: boolean,
    record?: Object,
    orientation: "horizontal" | "vertical",
    pageStore: PageModelType,
    isActive: boolean,
    store: RoadMapModelType,
};

const OMIT_PROPS = ["visible", "isActive", "pageStore", "bc", "store", "extraClasses"];
const DEFAULT_WIDTH_TAB = 228;

class Tab extends React.Component<PropsType> {
    componentDidMount() {
        this.handleChangeHidden();
    }

    componentDidUpdate(prevProps: PropsType) {
        const {hidden} = this.props;

        if (prevProps.hidden !== hidden) {
            this.handleChangeHidden();
        }
    }

    handleChangeHidden = () => {
        const {isActive, hidden, store, bc} = this.props;

        store.setTabStatus(bc[VAR_RECORD_PAGE_OBJECT_ID], {
            hidden,
        });

        if (isActive && hidden) {
            requestAnimationFrame(store.setFirstActiveTab);
        }
    };

    render() {
        const {classes, hidden, orientation, bc} = this.props;
        const style = {
            display: hidden ? "none" : undefined,
            ...toColumnStyleWidth(bc.tabwidth ? bc.tabwidth : DEFAULT_WIDTH_TAB),
        };

        if (orientation === "vertical") {
            return (
                <div className={classes.containerTab} style={style}>
                    <MaterialTab {...omit(this.props, OMIT_PROPS)} hidden={hidden} />
                </div>
            );
        }

        return (
            <div className={classes.containerTab} style={style}>
                <span className={classes.leftSideTab} />
                <MaterialTab {...omit(this.props, OMIT_PROPS)} hidden={hidden} />
                <span className={classes.rightSideTab} />
            </div>
        );
    }
}

export default commonDecorator(Tab);
