// @flow
import * as React from "react";
import {compose} from "recompose";
import {Paper} from "@material-ui/core";
import {setComponent} from "@essence-community/constructor-share/components";
import {VAR_RECORD_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type PageModelType} from "../stores/PageModel";
import {GridModel, type GridModelType} from "../stores/GridModel";
import withModelDecorator from "../decorators/withModelDecorator";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {type BuilderGridType, type BuilderGridPropsType} from "./BuilderGridType";
import BuilderBaseGrid from "./BuilderBaseGrid";
import GridRow from "./Row/GridRow";
import TreeGridRootRow from "./Row/TreeGridRootRow";
import VirtualizedGrid from "./Virtualized/VirtualizedGrid";

type PropsType = CommonDecoratorInjectType & {|
    bc: BuilderGridType,
    store: GridModelType,
    pageStore: PageModelType,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
    elevation?: number,
    fireScrollEvent?: boolean,
    onDoubleClick?: () => void,
|};

export class BaseBuilderGrid extends React.Component<BuilderGridPropsType & PropsType> {
    static defaultProps = {
        elevation: 0,
    };

    renderRecord = (record: Object, index: number) => {
        const {store} = this.props;
        const {isInlineEditing} = store;

        return (
            <GridRow
                key={record[VAR_RECORD_ID]}
                index={index}
                pageStore={this.props.pageStore}
                record={record}
                store={this.props.store}
                visible={this.props.visible}
                bc={this.props.bc}
                disabled={isInlineEditing || this.props.disabled}
                readOnly={this.props.readOnly}
                onDoubleClick={this.props.onDoubleClick}
            />
        );
    };

    renderBody() {
        const {bc, store, disabled, pageStore, readOnly, visible, onDoubleClick, ...otherProps} = this.props;

        return (
            <BuilderBaseGrid
                bc={bc}
                store={store}
                disabled={disabled}
                pageStore={pageStore}
                readOnly={readOnly}
                recordsCount={0}
                visible={visible}
                {...otherProps}
            >
                {bc.rootvisible === "true" ? (
                    <TreeGridRootRow bc={bc} store={store} onDoubleClick={onDoubleClick} pageStore={pageStore} />
                ) : null}
                <VirtualizedGrid store={store} renderRecord={this.renderRecord} />
            </BuilderBaseGrid>
        );
    }

    render() {
        const {elevation, bc} = this.props;

        return (
            <Paper
                elevation={elevation}
                className="paper-overflow-hidden"
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                {this.renderBody()}
            </Paper>
        );
    }
}

const BuilderGrid = compose(
    commonDecorator,
    withModelDecorator((bc: BuilderGridType, {pageStore}: PropsType): GridModelType => new GridModel({bc, pageStore})),
)(BaseBuilderGrid);

setComponent("GRID", BuilderGrid);
setComponent("TREEGRID", BuilderGrid);

export default BuilderGrid;
