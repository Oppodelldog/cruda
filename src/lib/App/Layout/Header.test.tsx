import '@testing-library/jest-dom/extend-expect';
import {render} from '@testing-library/react';
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {RouteConfig} from "../Config/AppConfig";
import Header, {LogoConfig} from "./Header";

test('Header renders logo', () => {
    const logoConfig: LogoConfig = {
        alt: 'imgAlt',
        src: 'imgSrc'
    };

    const {getByAltText} = render(<Header logo={logoConfig}/>);

    const imgElement = getByAltText('imgAlt')

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toEqual("http://localhost/" + logoConfig.src)
});

test('Header renders title', () => {
    const title = "test-title";

    const {getByText} = render(<Header title={title}/>);

    const titleElement = getByText(title);

    expect(titleElement).toBeInTheDocument();
});

test('Header renders Routes (must be placed in BrowserRouter to work)', () => {
    const routesConfig: RouteConfig[] = [
        {
            name: "routeA",
            path: "pathA",
        },
        {
            name: "routeB",
            path: "pathB",
        }
    ];

    const {getByText} = render(<BrowserRouter><Header routes={routesConfig}/></BrowserRouter>);

    expectRouteRendered(getByText, routesConfig[0]);
    expectRouteRendered(getByText, routesConfig[1]);
});

function expectRouteRendered(getByText, routeConfig: RouteConfig) {
    const linkElement = getByText(routeConfig.name);

    expect(linkElement).toBeInTheDocument();
    expect(linkElement.href).toEqual("http://localhost/" + routeConfig.path)
}