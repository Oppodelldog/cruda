import {expectsToGetIdFromField} from "./IDProvider.test";
import {SchemaProviderDefault} from "./SchemaProvider";
import {expectWithNoSelectedItemIdIsWritable, expectWithSelectedItemIdIsReadonly} from "./UISchemaProvider.test";

test('UISchemaProviderDefault - if item is not selected id is writable', () => {
    expectWithNoSelectedItemIdIsWritable(new SchemaProviderDefault());
});

test('UISchemaProviderDefault - if item is selected id is readonly', () => {
    expectWithSelectedItemIdIsReadonly(new SchemaProviderDefault());
});

test('SchemaProviderDefault - gets id from field "id"', () => {
    expectsToGetIdFromField(new SchemaProviderDefault(), "id")
});


