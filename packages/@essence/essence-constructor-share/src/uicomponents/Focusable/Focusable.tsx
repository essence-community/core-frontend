import * as React from "react";

interface IProps {
    children: React.ReactNode;
    focusableComponent?: React.ComponentType;
}

export class Focusable extends React.Component<IProps> {
    rootRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        requestAnimationFrame(this.handleFocus);
    }

    handleFocus = () => {
        const {current} = this.rootRef;
        const firstInput = current && current.querySelector("input:enabled");

        if (firstInput instanceof HTMLElement && firstInput.getAttribute("tabindex") !== "-1") {
            firstInput.focus();
        }
    };

    render() {
        const {focusableComponent: Component = "div", ...otherProps} = this.props;

        return <Component ref={this.rootRef} {...otherProps} />;
    }
}
