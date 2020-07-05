import {AppConfig, getConfigRoutes, PageConfig, RouteConfig} from "./AppConfig";

test('getConfigRoutes extracts routes from app config', () => {
    const config = {
        pages: [
            {
                route: {
                    path: "pathA",
                    name: "nameA"
                }
            },
            {
                route: {
                    path: "pathB",
                    name: "nameB"
                }
            }
        ] as PageConfig[],
    } as AppConfig;

    const routes = getConfigRoutes(config);

    const expectedRoutes = [
        {
            path: "pathA",
            name: "nameA"
        },
        {
            path: "pathB",
            name: "nameB"
        }
    ] as RouteConfig[];

    expect(routes).toEqual(expectedRoutes)
});
