import {IDProvider} from "./IDProvider";
import {IDProviderDefault} from "./IDProvider";

test('IDProviderDefault gets id from field "id"', () => {
    expectsToGetIdFromField(new IDProviderDefault(), "id");
});

export function expectsToGetIdFromField(provider: IDProvider, fieldName: string) {
    const testID = "3z85r9";
    let testObject = {}
    testObject[fieldName] = testID;

    expect(provider.getId(testObject)).toEqual(testID);
}
