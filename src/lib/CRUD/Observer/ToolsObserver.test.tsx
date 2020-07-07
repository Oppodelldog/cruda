import {ToolsObserver} from "./ToolsObserver";

describe('ToolsObserver', () => {
    test('ReloadItem', () => {
        let stub = "42";
        let received = "";
        let subscription = ToolsObserver.ReloadItem.subscribe((payload: string) => {
            received = payload;
        })
        ToolsObserver.publishReloadItem(stub)

        expect(received).toEqual(stub)

        subscription.unsubscribe()
    });

    test('ReloadItemList', async () => {
        let called = false;
        let subscription = ToolsObserver.ReloadItemList.subscribe(() => {
            called = true;
        })
        ToolsObserver.publishReloadItemList()

        expect(called).toBeTruthy()

        subscription.unsubscribe()
    });
});
