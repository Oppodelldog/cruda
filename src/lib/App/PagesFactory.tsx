import React from "react";
import {Route} from "react-router-dom";
import {createCRUDPage} from "../CRUD/Factory";
import {AppConfig} from "./Config/AppConfig";

function renderJSXElement(jsxElement: JSX.Element | undefined): JSX.Element {
    if (jsxElement === undefined) {
        return <></>
    }

    return jsxElement;
}

export function createPages(appConfig: AppConfig): JSX.Element {
    return <>
        {appConfig.pages.map((c) =>
            <Route key={c.route.path} path={c.route.path}>
                {renderJSXElement(c.jsxElement)}
                {createCRUDPage(c.crud)}
            </Route>
        )}
    </>;
}