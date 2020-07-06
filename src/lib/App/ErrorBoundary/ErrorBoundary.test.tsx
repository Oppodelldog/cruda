import '@testing-library/jest-dom/extend-expect';
// noinspection TypeScriptCheckImport
import {fireEvent, render} from '@testing-library/react';
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

test('ErrorBoundary renders and logs error if component throws, the button reloads the page', async () => {
    const originalError = console.error;
    const originalReload = window.location.reload;

    let consoleError = null;
    let wasReloadCalled = false;

    console.error = (msg) => {
        consoleError = msg;
    }
    window.location.reload = () => {
        wasReloadCalled = true
    }

    const {getByText, findByTestId} = render(
        <ErrorBoundary>
            <UnstableComponent/>
        </ErrorBoundary>
    );

    expect(getByText(ErrorBoundary.errorTitle)).toBeInTheDocument();
    expect(consoleError).toEqual(UnstableComponent.error)

    fireEvent.click(await findByTestId('error-boundary-link-reload'))

    expect(wasReloadCalled).toBeTruthy()

    console.error = originalError;
    window.location.reload = originalReload;
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
