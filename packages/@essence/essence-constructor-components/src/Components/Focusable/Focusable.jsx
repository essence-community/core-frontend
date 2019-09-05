// @flow
import * as React from "react";

type PropsType = {
    children: React.Node,
    focusableComponent?: string,
};

class Focusable extends React.Component<PropsType> {
    rootRef = React.createRef();

    componentDidMount() {
        requestAnimationFrame(this.handleFocus);
    }

    handleFocus = () => {
        const {current} = this.rootRef;
        const firstInput = current && current.querySelector("input:enabled");

        if (firstInput && firstInput.getAttribute("tabindex") !== "-1") {
            firstInput.focus();
        }
    };

    render() {
        const {focusableComponent: Component = "div", ...otherProps} = this.props;

        return <Component ref={this.rootRef} {...otherProps} />;
    }
}

export default Focusable;
