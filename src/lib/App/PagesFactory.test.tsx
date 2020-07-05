import {render} from '@testing-library/react';
import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import CRUDComponent, {CRUDConfig} from "../CRUD/CRUDComponent";
import {AppConfig, PageConfig} from "./Config/AppConfig";
import {createPages} from "./PagesFactory";

test('Factory renders jsx page from config', () => {
    const stubPath = "/jsxPage"
    const stubText = "CUSTOM JSX PAGE";
    const appConfig = {
        pages: [
            {
                route: {path: stubPath},
                jsxElement: <span>{stubText}</span>,
                crud: undefined
            } as PageConfig
        ] as PageConfig[]
    } as AppConfig;

    const {getByText} = render(
        <BrowserRouter>
            <Link to={stubPath}>{"NavigateToPage"}</Link>
            {createPages(appConfig)}
        </BrowserRouter>
    );

    getByText(/NavigateToPage/i).click()

    const element = getByText(stubText)
    // noinspection TypeScriptUnresolvedFunction
    expect(element).toBeInTheDocument();
});

test('Factory renders crud page from config', () => {
    const stubPath = "/crudPage"
    const appConfig = {
        pages: [
            {
                route: {path: stubPath},
                crud: {} as CRUDConfig,
            } as PageConfig
        ] as PageConfig[]
    } as AppConfig;

    const {getByText} = render(
        <BrowserRouter>
            <Link to={stubPath}>{"NavigateToPage"}</Link>
            {createPages(appConfig)}
        </BrowserRouter>
    );

    getByText(/NavigateToPage/i).click()

    const element = getByText(CRUDComponent.defaultHeadline)
    // noinspection TypeScriptUnresolvedFunction
    expect(element).toBeInTheDocument();
});
