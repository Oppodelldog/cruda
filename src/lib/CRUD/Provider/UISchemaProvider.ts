/**
 * This Provider provides the UI Schema for the auto form.
 */
export interface UISchemaProvider {
    getUISchema(context: StateContext): object
}

/**
 * StateContext provides util functions to dynamically create the UISchema.
 */
export interface StateContext {
    isItemSelected(): boolean
}

/**
 * The default implementation assumes that the entity has a ID field names "id".
 * This id field is readonly, when an existing entity is edited.
 * For new entities the field is writable.
 */
export class UISchemaProviderDefault implements UISchemaProvider {
    getUISchema(context: StateContext): object {
        const uiSchema = {
            "id": {
                "ui:readonly": false,
            }
        } as any;

        if (context.isItemSelected()) {
            uiSchema["id"]["ui:readonly"] = true;
        }

        return uiSchema;
    }
}