// @flow
import * as React from "react";
import {DialogActions} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type WindowModelType} from "../../stores/WindowModel";
import {type PageModelType} from "../../stores/PageModel";
import {type GridModelType} from "../../stores/GridModel";

type PropsType = {
    store: WindowModelType,
    ckPageObject: string,
    checkboxAddMode?: React.Node,
    pageStore: PageModelType,
    visible: boolean,
    gridStore: GridModelType,
    className?: string,
};

class BuilderWindowButtonDefault extends React.PureComponent<PropsType> {
    render() {
        const {checkboxAddMode, pageStore, visible, gridStore, className} = this.props;
        const {overrides} = gridStore.gridBtnsConfig;

        return (
            <DialogActions className={className}>
                {checkboxAddMode}
                {mapComponents(
                    [overrides["Override Save Button"], overrides["Override Cancel Button"]],
                    (ChildCmp, childBc) => (
                        <ChildCmp
                            key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                            bc={childBc}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ),
                )}
            </DialogActions>
        );
    }
}

export default BuilderWindowButtonDefault;
