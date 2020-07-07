import React from 'react'
import {AppConfig} from '../lib/App/Config/AppConfig';
import SampleTools from "./SampleTools";
import {TestAdapter} from "./TestAdapter";
import {TestSchemaProvider} from "./TestSchemaProvider";
import {TodoAdapter} from "./TodoAdapter";
import {TodoSchemaProvider} from "./TodoSchemaProvider";

export default function getAppConfig(): AppConfig {
    const testAdapter = new TestAdapter();
    return {
        name: "CRUDA Sample Application",
        logo: {
            src: "img/logo-h80.png",
            alt: "CRUDA Logo",
        },
        pages: [
            {
                route: {
                    name: "About",
                    path: "/about",
                },
                jsxElement: <div data-testid={"jsx-page"} className={"page"}>
                    <h1>About CRUDA</h1>
                    <p>
                        CRUDA is a library that bootstraps a CRUD application.<br/><br/>
                        It helps you to easily adopt your data entities and make them editable in the application.
                        <br/>
                        <br/>
                        This sample demonstrates a CRUDA application setup by adopting a sample entity "Todo".
                        <br/><br/>
                        Click on <a href={"/todos"}>Todos</a> to take investigate a sample CRUD entity.
                    </p>
                </div>
            },
            {
                route: {
                    name: "Todos",
                    path: "/todos",
                },
                crud: {
                    headline: "Todos",
                    adapter: new TodoAdapter(),
                    schemaProvider: new TodoSchemaProvider()
                }
            },
            {
                route: {
                    name: "Test",
                    path: "/test",
                },
                crud: {
                    headline: "Test",
                    adapter: new TestAdapter(),
                    schemaProvider: new TestSchemaProvider()
                }
            },
            {
                route: {
                    name: "Test Tools",
                    path: "/test-and-tools",
                },
                crud: {
                    headline: "Test & Tools",
                    adapter: testAdapter,
                    schemaProvider: new TestSchemaProvider()
                },
                crudToolJsx: <SampleTools adapter={testAdapter}/>
            },
        ]
    } as AppConfig
}