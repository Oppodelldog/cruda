import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {AppConfig, getConfigRoutes} from "./Config/AppConfig";
import {ErrorBoundary} from "./Components/ErrorBoundary/ErrorBoundary";
import Header from "./Components/Layout/Header";
import {createPages} from "./PagesFactory";

export function render(divContainerID: string, appConfig: AppConfig) {
    let configRoutes = getConfigRoutes(appConfig);
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <Header logo={appConfig.logo} title={appConfig.name} routes={configRoutes}/>
                <ErrorBoundary>
                    {createPages(appConfig)}
                </ErrorBoundary>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById(divContainerID)
    );
}