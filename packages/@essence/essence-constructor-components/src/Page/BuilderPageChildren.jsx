// @flow
import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents} from "@essence/essence-constructor-share";
import {styleTheme} from "../constants";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderPageChildType} from "./BuilderPageType";

const DARK_PAPER_ELEVATION = 8;

type PropsType = {
    pageBc?: Array<BuilderPageChildType>,
    hidden?: boolean,
    pageStore: PageModelType,
    readOnly: boolean,
    visible: boolean,
};

class BuilderPageChildren extends React.PureComponent<PropsType> {
    render() {
        const {pageBc, pageStore, hidden, readOnly, visible} = this.props;

        if (!pageBc) {
            return null;
        }

        return mapComponents(pageBc, (Child: any, bc: BuilderPageChildType) => (
            <Grid key={bc.ckPageObject} item xs={12}>
                <Child
                    elevation={styleTheme === "light" ? undefined : DARK_PAPER_ELEVATION}
                    bc={bc}
                    readOnly={readOnly}
                    hidden={hidden}
                    pageStore={pageStore}
                    visible={visible}
                />
            </Grid>
        ));
    }
}

export default BuilderPageChildren;
