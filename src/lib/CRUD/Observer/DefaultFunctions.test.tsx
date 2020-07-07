import {subscriptionDone, throwSubscriptionError} from "./DefaultFunctions";

describe('Observer subscription default functions', () => {
    test('subscriptionDone', () => {
        subscriptionDone()
    });

    test('throwSubscriptionError throws the given error', async () => {
        let err = new Error("stub");
        expect(() => throwSubscriptionError(err)).toThrowError(err)
    });
});
