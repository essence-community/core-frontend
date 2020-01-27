// @flow
import * as React from "react";
import omit from "lodash/omit";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import {Scrollbars as ReactCustomScrollbars} from "react-custom-scrollbars";
import {ProjectContext} from "@essence-community/constructor-share/context";
import getScrollbarWidth from "react-custom-scrollbars/lib/utils/getScrollbarWidth";
import {type PageModelType} from "../../stores/PageModel";

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
const KEY_S = 83;

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
    top: number,
    left: number,
    clientWidth: number,
    clientHeight: number,
    scrollWidth: number,
    scrollHeight: number,
    scrollLeft: number,
    scrollTop: number,
};

type PropsType = {
    children?: React.Node,
    withRequestAnimationFrame?: boolean,
    contentProps?: Object,
    style?: Object,
    preventAltScroll?: boolean,
    pageStore?: PageModelType,
    horizontalStyle?: Object,
    verticalStyle?: Object,
    fireScrollEvent: boolean,
    onScrollFrame?: (values: ValuesType) => void,
    scrollbarsRef?: (scrollbars: ?Object) => void,
};

type StateType = {
    height: number,
};
export type ReactCustomScrollbarsType = ReactCustomScrollbars;

class Scrollbars extends React.Component<PropsType, StateType> {
    static contextType = ProjectContext;

    static defaultProps = {
        fireScrollEvent: true,
    };

    state = {
        height: 0,
    };

    height: number;

    requestId: AnimationFrameID;

    pageContent: ?HTMLDivElement;

    lastWheelAlt = false;

    scrollValues: ?ValuesType = null;

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

    handleWheel = (event: SyntheticWheelEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const isWheelAlt = this.context?.keyboardState.keyCodes.includes(KEY_S);

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

    setPageContentRef = (element: ?HTMLDivElement) => {
        this.pageContent = element;
    };

    renderThumbHorizontal = ({style, ...props}: PropsType) => (
        <div style={{...style, ...customHorizontalStyle}} {...props} />
    );

    renderThumbVertical = ({style, ...props}: PropsType) => (
        <div style={{...style, ...customVerticalStyle}} {...props} />
    );

    renderTrackHorizontal = ({style, ...props}: PropsType) => {
        const finalStyle = {
            visibility: "hidden",
            ...style,
            // eslint-disable-next-line sort-keys
            borderRadius: 3,
            bottom: 2,
            height: 10,
            left: 2,
            right: 2,
            ...this.props.horizontalStyle,
        };

        return <div style={finalStyle} {...props} />;
    };

    renderTrackVertical = ({style, ...props}: PropsType) => {
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

    renderView = ({style, ...props}: PropsType) => {
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

export default Scrollbars;
