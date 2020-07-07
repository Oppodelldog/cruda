import React from "react";
import CRUDComponent, {CRUDConfig} from "./CRUDComponent";

export function createCRUDPage(c?: CRUDConfig | undefined, t?: JSX.Element | undefined) {
    if (c === undefined) {
        return <></>
    }
    const crudComponent = <CRUDComponent headline={c.headline}
                                         adapter={c.adapter}
                                         schemaProvider={c.schemaProvider}
    />;

    if (t !== undefined) {
        return <div data-testid={"crud-and-tools-container"} className={"crud-and-tools-container"}>
            {crudComponent}
            <div className={"crud-tools"}>
                <div className={"crud-tools-headline"}>Tools</div>
                <div className={"crud-tools-container"}>{t}</div>
            </div>
        </div>
    }

    return crudComponent
}