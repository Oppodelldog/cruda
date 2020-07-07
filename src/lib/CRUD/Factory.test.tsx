import '@testing-library/jest-dom/extend-expect';
// noinspection TypeScriptCheckImport
import {render} from '@testing-library/react';
import React from 'react';
import CRUDComponent, {CRUDConfig} from "./CRUDComponent";
import {createCRUDPage} from "./Factory";

describe('Factory', () => {

    test('given no parameter, renders and empty div tag', () => {
        render(createCRUDPage());
        expect(document.body.childNodes.length).toEqual(1);
        expect(document.body.childNodes[0].childNodes.length).toEqual(0);
    });

    test('given crud config only, render only CRUDComponent', async () => {
        let c = {} as CRUDConfig;
        let {queryByTestId} = render(createCRUDPage(c));

        expect(await queryByTestId("CRUDComponent")).toBeInTheDocument()
        expect(await queryByTestId("crud-and-tools-container")).not.toBeInTheDocument()

    });

    test('given crud and tools, renders both', async () => {
        let c = {} as CRUDConfig;
        let t = <div data-testid={"tool-stub"}/>;
        let {queryByTestId} = render(createCRUDPage(c, t));

        expect(await queryByTestId("crud-and-tools-container")).toBeInTheDocument()
        expect(await queryByTestId("CRUDComponent")).toBeInTheDocument()
        expect(await queryByTestId("tool-stub")).toBeInTheDocument()
    });
});
