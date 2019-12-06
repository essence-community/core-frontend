// @flow
import * as React from "react";
import MaterialTab from "@material-ui/core/Tab";
import omit from "lodash/omit";
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

        store.setTabStatus(bc.ckPageObject, {
            hidden,
        });

        if (isActive && hidden) {
            requestAnimationFrame(store.setFirstActiveTab);
        }
    };

    render() {
        const {classes, hidden, orientation} = this.props;

        if (orientation === "vertical") {
            return (
                <div className={classes.containerTab}>
                    <MaterialTab
                        style={{display: hidden ? "none" : undefined}}
                        {...omit(this.props, OMIT_PROPS)}
                        hidden={hidden}
                    />
                </div>
            );
        }

        return (
            <div className={classes.containerTab}>
                <span className={classes.leftSideTab} />
                <MaterialTab
                    style={{display: hidden ? "none" : undefined}}
                    {...omit(this.props, OMIT_PROPS)}
                    hidden={hidden}
                />
                <span className={classes.rightSideTab} />
            </div>
        );
    }
}

export default commonDecorator(Tab);
