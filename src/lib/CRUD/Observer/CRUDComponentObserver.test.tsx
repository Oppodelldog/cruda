import {CRUDComponentObserver} from "./CRUDComponentObserver";

describe('ItemDeleted', () => {
    test('ReloadItem', () => {
        let stub = {stub: true}
        let received = null;
        let subscription = CRUDComponentObserver.ItemDeleted.subscribe((payload: object) => {
            received = payload;
        })

        CRUDComponentObserver.publishItemDeleted(stub)

        expect(received).toEqual(stub)

        subscription.unsubscribe()
    });

    test('ItemCreated', async () => {
        let stub = {stub: true}
        let received = null;
        let subscription = CRUDComponentObserver.ItemCreated.subscribe((payload: object) => {
            received = payload;
        })

        CRUDComponentObserver.publishItemCreated(stub)

        expect(received).toEqual(stub)

        subscription.unsubscribe()
    });

    test('ItemUpdated', async () => {
        let stub = {stub: true}
        let received = null;
        let subscription = CRUDComponentObserver.ItemUpdated.subscribe((payload: object) => {
            received = payload;
        })

        CRUDComponentObserver.publishItemUpdated(stub)

        expect(received).toEqual(stub)

        subscription.unsubscribe()
    });


    test('ItemSelected', async () => {
        let stub = {stub: true}
        let received = null;
        let subscription = CRUDComponentObserver.ItemSelected.subscribe((payload: object) => {
            received = payload;
        })

        CRUDComponentObserver.publishItemSelected(stub)

        expect(received).toEqual(stub)

        subscription.unsubscribe()
    });
});
