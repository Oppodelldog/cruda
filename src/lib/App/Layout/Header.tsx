import React, {Component} from "react";
import {Link} from "react-router-dom";
import {RouteConfig} from "../Config/AppConfig";
import "./Header.css"

interface Props {
    logo: LogoConfig
    routes: RouteConfig[]
    title: string
}

export interface LogoConfig {
    alt: string
    src: string
}

export default class Header extends Component<Props, any> {
    static defaultProps: Props = {
        logo: {} as LogoConfig,
        routes: [],
        title: "",
    }

    render() {
        return <div className={"header"}>
            <img src={this.props.logo.src} alt={this.props.logo.alt}/>
            <span>{this.props.title}</span>
            <div className={"menu"} data-testid={"app-routes"}>
                {this.props.routes.map((r) => <Link key={r.path} to={r.path}>{r.name}</Link>)}
            </div>
        </div>;
    }
}