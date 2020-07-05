import {SchemaProviderDefault} from "../lib/CRUD/Provider/SchemaProvider";

/**
 * TestSchemaProvider is used for functional tests
 */
export class TestSchemaProvider extends SchemaProviderDefault {
    getItemSchema(): object {
        return {
            title: "Test",
            type: "object",
            required: ["text", "id"],
            properties: {
                id: {type: "string", title: "ID"},
                text: {type: "string", title: "Text"},
                done: {
                    type: "boolean",
                }
            }
        }
    }
}