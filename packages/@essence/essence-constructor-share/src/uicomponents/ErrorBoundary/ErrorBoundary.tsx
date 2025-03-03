import * as React from 'react';
import { loggerRoot } from '../../constants';
const logger = loggerRoot.extend("ErrorBoundary");

interface IErrorBoundaryProps {
    fallback: React.ReactElement;
}
export class ErrorBoundary extends React.Component<IErrorBoundaryProps> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        logger(error, info);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}
