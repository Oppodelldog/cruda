import {IDProvider, IDProviderDefault} from "./IDProvider";
import {JSONSchemaProvider} from "./JSONSchemaProvider";
import {StateContext, UISchemaProvider, UISchemaProviderDefault} from "./UISchemaProvider";

/**
 * SchemaProvider is a composition of interfaces around the schema of an entity.
 */
export interface SchemaProvider extends JSONSchemaProvider, UISchemaProvider, IDProvider {
}

/**
 * SchemaProviderDefault is a basic implementation that utilized the default provides.
 * by subclassing and overwriting getItemSchema this may cover many use cases.
 */
export class SchemaProviderDefault implements SchemaProvider {
    getId(o: object): string {
        return new IDProviderDefault().getId(o);
    }

    getItemSchema(): object {
        return {};
    }

    getUISchema(context: StateContext): object {
        return new UISchemaProviderDefault().getUISchema(context);
    }
}