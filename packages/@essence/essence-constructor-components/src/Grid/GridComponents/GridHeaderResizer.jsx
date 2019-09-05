// @flow
import * as React from "react";
import get from "lodash/get";
import {type GridModelType} from "../../stores/GridModel";
import {TABLE_CELL_MIN_WIDTH} from "../../constants";

type PropsType = {
    ckPageObject: string,
    classes: Object,
    store: GridModelType,
};

export class GridHeaderResizer extends React.Component<PropsType> {
    colWidth: number = TABLE_CELL_MIN_WIDTH;

    startOffset: number = 0;

    onMouseDown = (event: any) => {
        const {ckPageObject} = this.props;
        const columnsWidth = this.props.store.columnsWidth.get(ckPageObject);

        this.colWidth = Number(
            columnsWidth && typeof columnsWidth === "number"
                ? columnsWidth
                : get(event.target, "parentElement.parentElement.offsetWidth", TABLE_CELL_MIN_WIDTH),
        );
        this.startOffset = Number(this.colWidth) - event.pageX;

        event.preventDefault();
        event.stopPropagation();

        document.addEventListener("mousemove", this.handleMouseMove);

        document.addEventListener("mouseup", this.handleMouseUp);
    };

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseMove = (event: any) => {
        const {store, ckPageObject} = this.props;

        if (this.colWidth && this.startOffset) {
            const newWidth = this.startOffset + event.pageX;

            store.setColumnsWidth(ckPageObject, newWidth);
        }
    };

    handleMouseUp = () => {
        this.startOffset = 0;
        this.colWidth = TABLE_CELL_MIN_WIDTH;
        document.removeEventListener("mousemove", this.handleMouseMove);
    };

    render() {
        return <div className={this.props.classes.tableHeadResizer} onMouseDown={this.onMouseDown} />;
    }
}

export default GridHeaderResizer;
