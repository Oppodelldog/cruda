import {SchemaProviderDefault} from "../lib/CRUD/Provider/SchemaProvider";

export class TodoSchemaProvider extends SchemaProviderDefault {
    getItemSchema(): object {
        return {
            title: "Todo",
            type: "object",
            required: ["title", "id"],
            properties: {
                id: {type: "string", title: "ID"},
                title: {type: "string", title: "Title"},
                resolved: {
                    type: "boolean",
                }
            }
        }
    }
}