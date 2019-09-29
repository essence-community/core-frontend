import * as React from "react";
import {omit, isEqual, debounce} from "lodash";
// @ts-ignore
import {Scrollbars as ReactCustomScrollbars, ScrollbarProps} from "react-custom-scrollbars";
// @ts-ignore
import getScrollbarWidth from "react-custom-scrollbars/lib/utils/getScrollbarWidth";
import {IPageModel} from "../../types";

const customHorizontalStyle = {
    backgroundColor: "#cbcaca",
    borderRadius: 4,
    height: 10,
    zIndex: 1,
};

const customVerticalStyle = {
    backgroundColor: "#cbcaca",
    borderRadius: 4,
    width: 10,
    zIndex: 1,
};

const OMITED_PROPS = ["preventAltScroll", "pageStore", "horizontalStyle", "verticalStyle", "fireScrollEvent"];

export const SCROLL_DEBOUNCE = 8;

/*
 * Values about the current position
 * values.top: (Number) scrollTop progess, from 0 to 1
 * values.left: (Number) scrollLeft progess, from 0 to 1
 * values.clientWidth: (Number) Width of the view
 * values.clientHeight: (Number) Height of the view
 * values.scrollWidth: (Number) Native scrollWidth
 * values.scrollHeight: (Number) Native scrollHeight
 * values.scrollLeft: (Number) Native scrollLeft
 * values.scrollTop: (Number) Native scrollTop
 */
type ValuesType = {
    top: number;
    left: number;
    clientWidth: number;
    clientHeight: number;
    scrollWidth: number;
    scrollHeight: number;
    scrollLeft: number;
    scrollTop: number;
};

interface IProps extends ScrollbarProps {
    children?: React.ReactNode;
    withRequestAnimationFrame?: boolean;
    contentProps?: Record<string, any>;
    style?: Record<string, any>;
    preventAltScroll?: boolean;
    pageStore?: IPageModel;
    horizontalStyle?: Record<string, any>;
    verticalStyle?: Record<string, any>;
    fireScrollEvent: boolean;
    onScrollFrame?: (values: ValuesType) => void;
    scrollbarsRef?: (scrollbars?: Record<string, any>) => void;
}

interface IState {
    height: number;
}

export class Scrollbars extends React.Component<IProps, IState> {
    static defaultProps = {
        fireScrollEvent: true,
    };

    state = {
        height: 0,
    };

    height: number;

    requestId: number;

    pageContent: HTMLDivElement | null;

    lastWheelAlt = false;

    scrollValues: ValuesType | null = null;

    componentDidMount() {
        if (this.props.withRequestAnimationFrame) {
            this.requestId = requestAnimationFrame(this.handleRequestAnimationFrame);
        }
    }

    componentWillUnmount() {
        this.pageContent = null;

        if (this.props.withRequestAnimationFrame) {
            cancelAnimationFrame(this.requestId);
        }
    }

    handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const isWheelAlt = event.altKey || event.metaKey;

        if (isWheelAlt !== this.lastWheelAlt) {
            if (isWheelAlt) {
                currentTarget.style.overflowY = "hidden";
                currentTarget.style.marginRight = "0";
            } else {
                const scrollbarWidth = getScrollbarWidth();

                currentTarget.style.overflowY = "scroll";
                currentTarget.style.marginRight = scrollbarWidth ? `-${scrollbarWidth}px` : "0";
            }

            this.lastWheelAlt = isWheelAlt;
        }
    };

    handleRequestAnimationFrame = () => {
        if (this.pageContent && this.pageContent.offsetHeight !== this.height) {
            this.height = this.pageContent.offsetHeight;
            this.setState({height: this.height});
        }

        this.requestId = requestAnimationFrame(this.handleRequestAnimationFrame);
    };

    handleScrollFrameDebounce = debounce(() => {
        const {pageStore} = this.props;

        if (pageStore) {
            pageStore.fireScrollEvent();
        }
    }, SCROLL_DEBOUNCE);

    handleScrollFrame = (values: ValuesType) => {
        if (this.props.fireScrollEvent && !isEqual(values, this.scrollValues)) {
            this.handleScrollFrameDebounce();
        }

        if (this.props.onScrollFrame) {
            this.props.onScrollFrame(values);
        }

        this.scrollValues = values;
    };

    setPageContentRef = (element: HTMLDivElement | null) => {
        this.pageContent = element;
    };

    renderThumbHorizontal = ({style, ...props}: IProps) => (
        <div style={{...style, ...customHorizontalStyle}} {...props} />
    );

    renderThumbVertical = ({style, ...props}: IProps) => <div style={{...style, ...customVerticalStyle}} {...props} />;

    renderTrackHorizontal = ({style, ...props}: IProps) => {
        const finalStyle = {
            ...style,
            borderRadius: 3,
            bottom: 2,
            height: 10,
            left: 2,
            right: 2,
            ...this.props.horizontalStyle,
        };

        return <div style={finalStyle} {...props} />;
    };

    renderTrackVertical = ({style, ...props}: IProps) => {
        const finalStyle = {
            ...style,
            borderRadius: 3,
            bottom: 2,
            right: 2,
            top: 2,
            width: 10,
            // Theme.zIndex.scroller
            zIndex: 2,
            ...this.props.verticalStyle,
        };

        return <div style={finalStyle} {...props} />;
    };

    renderView = ({style, ...props}: IProps) => {
        const newStyle = {
            ...style,
        };

        if (!newStyle.height && newStyle.minHeight === newStyle.maxHeight) {
            newStyle.height = newStyle.minHeight;
        }

        return <div style={newStyle} onWheel={this.props.preventAltScroll ? this.handleWheel : undefined} {...props} />;
    };

    render() {
        const {children, withRequestAnimationFrame, contentProps, scrollbarsRef, ...props} = this.props;
        const newProps = {
            renderThumbHorizontal: this.renderThumbHorizontal,
            renderThumbVertical: this.renderThumbVertical,
            renderTrackHorizontal: this.renderTrackHorizontal,
            renderTrackVertical: this.renderTrackVertical,
            renderView: this.renderView,
            ...omit(props, OMITED_PROPS),
        };

        if (withRequestAnimationFrame) {
            return (
                <ReactCustomScrollbars
                    hideTracksWhenNotNeeded
                    {...newProps}
                    ref={scrollbarsRef}
                    onScrollFrame={this.handleScrollFrame}
                >
                    <div ref={this.setPageContentRef} {...contentProps}>
                        {children}
                    </div>
                </ReactCustomScrollbars>
            );
        }

        return (
            <ReactCustomScrollbars
                hideTracksWhenNotNeeded
                {...newProps}
                ref={scrollbarsRef}
                onScrollFrame={this.handleScrollFrame}
            >
                {children}
            </ReactCustomScrollbars>
        );
    }
}
