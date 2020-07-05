import {StateContext, UISchemaProvider} from "./UISchemaProvider";
import {UISchemaProviderDefault} from "./UISchemaProvider";

test('UISchemaProviderDefault - if item is not selected id is writable', () => {
    expectWithNoSelectedItemIdIsWritable(new UISchemaProviderDefault());
});

test('UISchemaProviderDefault - if item is selected id is readonly', () => {
    expectWithSelectedItemIdIsReadonly(new UISchemaProviderDefault());
});

export function expectWithSelectedItemIdIsReadonly(provider: UISchemaProvider) {
    const uiSchema = provider.getUISchema({isItemSelected: () => true} as StateContext);

    const expectedUiSchema = {
        "id": {
            "ui:readonly": true,
        }
    }
    expect(uiSchema).toEqual(expectedUiSchema)
}

export function expectWithNoSelectedItemIdIsWritable(provider: UISchemaProviderDefault) {
    const uiSchema = provider.getUISchema({isItemSelected: () => false} as StateContext);

    const expectedUiSchema = {
        "id": {
            "ui:readonly": false,
        }
    }
    expect(uiSchema).toEqual(expectedUiSchema)
}
