// noinspection TypeScriptCheckImport
import {render} from '@testing-library/react';
import React from 'react';
import CRUDComponent from "./CRUDComponent";

test('CRUDComponent renders without props', () => {
    render(<CRUDComponent/>);
});

test('CRUDComponent renders default prop headline', () => {
    const {getByText} = render(<CRUDComponent/>);
    // noinspection TypeScriptUnresolvedFunction
    expect(getByText(CRUDComponent.defaultHeadline)).toBeInTheDocument()
});

test('CRUDComponent renders prop headline', () => {
    const testHeadline = "hey-ho-headline"
    const {getByText} = render(<CRUDComponent headline={testHeadline}/>);
    // noinspection TypeScriptUnresolvedFunction
    expect(getByText(testHeadline)).toBeInTheDocument()
});
