import React, {Component, ErrorInfo} from "react";
import "./ErrorBoundary.css"

interface Props {
}

interface State {
    error: any
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    public static readonly errorTitle = "Ouch, the page crashed really hard";

    constructor(props: Props) {
        super(props)
        this.state = {hasError: false, error: null} as State;
    }

    // noinspection JSUnusedGlobalSymbols
    static getDerivedStateFromError(error: any) {
        return {hasError: true, error: error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div className={"ErrorBoundary"}>
                <h1>{ErrorBoundary.errorTitle}</h1>
                <button onClick={() => {
                    window.location.reload();
                }}>try again
                </button>
                <pre>
                    {this.state.error.stack.toString()}
                </pre>
            </div>;
        }

        return this.props.children;
    }
}