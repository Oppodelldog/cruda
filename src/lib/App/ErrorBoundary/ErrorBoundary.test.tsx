import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import React, {Component} from 'react';
import {ErrorBoundary} from "./ErrorBoundary";

test('ErrorBoundary renders stable component', () => {
    const {getByText} = render(
        <ErrorBoundary>
            <StableComponent/>
        </ErrorBoundary>
    );

    expect(getByText('STABLE')).toBeInTheDocument();
});

test('ErrorBoundary renders and logs error if component throws', () => {
    let consoleError = null;
    const originalError = console.error;
    console.error = (msg) => {
        consoleError = msg;
    }
    const {getByText} = render(
        <ErrorBoundary>
            <UnstableComponent/>
        </ErrorBoundary>
    );

    expect(getByText(ErrorBoundary.errorTitle)).toBeInTheDocument();
    expect(consoleError).toEqual(UnstableComponent.error)

    console.error = originalError;
});

class StableComponent extends Component<any, any> {
    render() {
        return <div>STABLE</div>;
    }
}

class UnstableComponent extends Component<any, any> {
    public static readonly error = new Error("UNSTABLE");

    componentDidMount() {
        throw UnstableComponent.error;
    }

    render() {
        return <div>STABLE</div>;
    }
}
