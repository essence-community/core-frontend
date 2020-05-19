// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {compose} from "recompose";
import {Paper, Grid} from "@material-ui/core";
import {toSize, getFromStore} from "@essence-community/constructor-share/utils";
import {setComponent, mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import ThemePanelWrapper from "../Components/ThemePanelWrapper/ThemePanelWrapper";
import Scrollbars from "../Components/Scrollbars/Scrollbars";
import {FilePanelModel, type FilePanelModelType, type FilePanelBcType} from "../stores/FilePanelModel";
import Content from "../Components/Content/Content";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import withModelDecorator from "../decorators/withModelDecorator";
import FileRecord from "./FileRecord/FileRecord";

const styleTheme = getFromStore("theme", "light");
const buttonDirection = styleTheme === "dark" ? "column" : "row";

type PropsType = CommonDecoratorInjectType & {
    bc: FilePanelBcType,
    store: FilePanelModelType,
    elevation: number,
    pageStore: PageModelType,
};
type ContentStyleType = {
    height: number | string,
    maxHeight: number | string,
    minHeight: number | string,
};

export class BaseBuilderFilePanel extends React.Component<PropsType> {
    static defaultProps = {
        elevation: 0,
    };

    contentStyle: ContentStyleType;

    constructor(props: PropsType) {
        super(props);

        const {bc} = props;

        this.contentStyle = {
            height: toSize(bc.height, "100%"),
            maxHeight: toSize(bc.maxheight, "100%"),
            minHeight: toSize(bc.minheight, "100%"),
        };
    }

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {store, bc, elevation, disabled, readOnly, pageStore, visible} = this.props;

        const actionsBar = (
            <Grid container alignItems="center" direction={buttonDirection}>
                <Grid item>
                    {mapComponents([store.btnsConfig.overrides["Override Add Button"]], (ChildCmp, childBc) => (
                        <ChildCmp
                            key="add"
                            bc={childBc}
                            disabled={readOnly || disabled}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ))}
                </Grid>
            </Grid>
        );

        return (
            <Paper
                elevation={elevation}
                className="paper-overflow-hidden"
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                <ThemePanelWrapper actionsBar={actionsBar}>
                    <Scrollbars
                        autoHeightMax={this.contentStyle.height}
                        hideTracksWhenNotNeeded
                        style={this.contentStyle}
                        pageStore={pageStore}
                    >
                        <Content verticalSize="16" horizontalSize="16">
                            <Grid container direction="row" spacing={1}>
                                {store.recordsStore.records.map((record) => (
                                    <Grid item xs={6} key={record[VAR_RECORD_ID]}>
                                        <FileRecord
                                            pageStore={pageStore}
                                            bc={bc}
                                            record={record}
                                            store={store}
                                            disabled={disabled}
                                            readOnly={readOnly}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Content>
                    </Scrollbars>
                </ThemePanelWrapper>
            </Paper>
        );
    }
}

const BuilderFilePanel = compose(
    withModelDecorator(
        (bc: FilePanelBcType, {pageStore}: {pageStore: PageModelType}): FilePanelModelType =>
            new FilePanelModel({bc, pageStore}),
    ),
    commonDecorator,
    observer,
)(BaseBuilderFilePanel);

setComponent("FILEPANEL", BuilderFilePanel);

export default BuilderFilePanel;
