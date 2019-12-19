// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {compose} from "recompose";
import {Paper, Grid} from "@material-ui/core";
import {toSize} from "@essence/essence-constructor-share/utils";
import {setComponent} from "@essence/essence-constructor-share/components";
import {VAR_RECORD_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import ThemePanelWrapper from "../Components/ThemePanelWrapper/ThemePanelWrapper";
import BuilderMobxButton from "../Button/BuilderMobxButton";
import {FilePanelModel, type FilePanelModelType, type FilePanelBcType} from "../stores/FilePanelModel";
import {type PageModelType} from "../stores/PageModel";
import {styleTheme, buttonDirection} from "../constants";
import Content from "../Components/Content/Content";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import withModelDecorator from "../decorators/withModelDecorator";
import FileRecord from "./FileRecord/FileRecord";

type PropsType = CommonDecoratorInjectType & {
    bc: FilePanelBcType,
    store: FilePanelModelType,
    elevation: number,
    pageStore: PageModelType,
};
type ContentStyleType = {
    height?: number,
    maxHeight?: number,
    minHeight?: number,
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
            height: toSize(bc.height),
            maxHeight: toSize(bc.maxheight),
            minHeight: toSize(bc.minheight),
        };
    }

    render() {
        const {store, bc, elevation, disabled, readOnly, pageStore, visible} = this.props;

        const actionsBar = (
            <Grid container alignItems="center" direction={buttonDirection}>
                <Grid item>
                    <BuilderMobxButton
                        onlyicon={styleTheme !== "light"}
                        bc={store.btnsConfig.overrides["Override Add Button"]}
                        disabled={readOnly || disabled}
                        variant={"fab"}
                        color={undefined}
                        pageStore={pageStore}
                        visible={visible}
                        className={bc.className ? bc.className : undefined}
                    />
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
                    <Content verticalSize="16" horizontalSize="16" style={this.contentStyle}>
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
