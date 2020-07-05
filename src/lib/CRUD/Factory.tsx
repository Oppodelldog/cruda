import React from "react";
import CRUDComponent, {CRUDConfig} from "./CRUDComponent";

export function createCRUDPage(c?: CRUDConfig | undefined) {
    if (c === undefined) {
        return <></>
    }

    return <CRUDComponent headline={c.headline}
                          adapter={c.adapter}
                          schemaProvider={c.schemaProvider}
    />
}