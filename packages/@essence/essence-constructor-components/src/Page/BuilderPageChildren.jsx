// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {getComponent} from "@essence/essence-constructor-share";
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

        return pageBc.map((bc: BuilderPageChildType) => {
            const BuilderComponent: any = getComponent(bc.type, bc.customid);

            if (!BuilderComponent) {
                return null;
            }

            return (
                <Grid key={bc.ckPageObject} item>
                    <BuilderComponent
                        elevation={styleTheme === "light" ? undefined : DARK_PAPER_ELEVATION}
                        bc={bc}
                        readOnly={readOnly}
                        hidden={hidden}
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
            );
        });
    }
}

export default BuilderPageChildren;
