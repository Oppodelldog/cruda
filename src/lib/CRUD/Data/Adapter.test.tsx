import {
    CreateItemResult,
    DeleteItemResult,
    LoadItemResult,
    LoadListItemResult,
    NotImplementedDataAdapter,
    Result,
    UpdateItemResult
} from "./Adapter";

test('Result has no error', () => {
    expectResultHasNoError(new Result());
    expectResultHasNoError(new LoadListItemResult([]));
    expectResultHasNoError(new LoadItemResult({}));
    expectResultHasNoError(new CreateItemResult());
    expectResultHasNoError(new UpdateItemResult());
    expectResultHasNoError(new DeleteItemResult());

});

test('Result has error', () => {
    let error = "error";
    expectResultHasError(new Result(error));
    expectResultHasError(new Result(error));
    expectResultHasError(new LoadListItemResult([], error));
    expectResultHasError(new LoadItemResult(null, error));
    expectResultHasError(new CreateItemResult(error));
    expectResultHasError(new UpdateItemResult(error));
    expectResultHasError(new DeleteItemResult(error));
});

function expectResultHasNoError(result: Result) {
    expect(result.hasError()).toBeFalsy()
}

function expectResultHasError(result: Result) {
    expect(result.hasError()).toBeTruthy()
}

test('NotImplementedDataAdapter', async () => {
    const adapter = new NotImplementedDataAdapter();

    expect((await adapter.createItem(null)).error).toEqual("createItem not implemented")
    expect((await adapter.updateItem(null)).error).toEqual("updateItem not implemented")
    expect((await adapter.deleteItem("")).error).toEqual("deleteItem not implemented")
    expect((await adapter.loadItem("")).error).toEqual("loadItem not implemented")
    expect((await adapter.loadItemList()).error).toEqual("loadList not implemented")
});