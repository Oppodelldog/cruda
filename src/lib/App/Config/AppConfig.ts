import {CRUDConfig} from "../../CRUD/CRUDComponent";
import {LogoConfig} from "../Layout/Header";

/**
 * AppConfig holds the top level configuration data for the CRUDA application.
 */
export interface AppConfig {
    logo: LogoConfig
    name: string
    pages: PageConfig[]
}

/**
 * PageConfig holds configuration for a page in the application.
 */
export interface PageConfig {
    /**
     * crud provides configuration to display a CRUDComponent.
     */
    crud?: CRUDConfig
    /**
     * jsxElement provides a JSX Element which could be any ReactComponent.
     */
    jsxElement?: JSX.Element
    /**
     * route holds the route configuration for this page.
     */
    route: RouteConfig
}

/**
 * RouteConfig holds configuration for a route.
 */
export interface RouteConfig {
    /**
     * name of the route for display purpose.
     */
    name: string
    /**
     * path of the route for routing purpose.
     */
    path: string
}

export function getConfigRoutes(config: AppConfig): RouteConfig[] {
    return config.pages.map((pageConfig) => pageConfig.route)
}