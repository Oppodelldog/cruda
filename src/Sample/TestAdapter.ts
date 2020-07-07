import {
    Adapter,
    CreateItemResult,
    DeleteItemResult,
    ListItem,
    LoadItemResult,
    LoadListItemResult,
    UpdateItemResult
} from "../lib/CRUD/Data/Adapter";

/**
 * TestSchemaProvider is used for functional tests
 */
export interface TestItem {
    done: boolean
    id: string
    text: string
}

/**
 * TestSchemaProvider is used for functional tests
 */
export class TestAdapter implements Adapter {
    public callsCreateItem: any[] = [];
    public callsDeleteItem: any[] = [];
    public callsLoadItem: any[] = [];
    public callsLoadList: any[] = [];
    public callsUpdateItem: any[] = [];
    public errorCreatingItem: string = "";
    public errorDeletingItem: string = "";
    public errorLoadingItem: string = "";
    public errorLoadingItemList: string = ""
    public errorUpdatingItem: string = "";
    public items: TestItem[] = [];
    public loadItemReturnsNull: boolean = false;

    constructor() {
        (window as any)["testAdapter"] = this;
    }

    async createItem(formData: any): Promise<CreateItemResult> {
        this.callsCreateItem.push(formData);

        if (this.errorCreatingItem !== "") {
            return this.resolve<CreateItemResult>(new CreateItemResult(this.errorCreatingItem));
        }

        this.items.push(formData as TestItem)

        return this.resolve<CreateItemResult>(new CreateItemResult());
    }

    async deleteItem(id: string): Promise<DeleteItemResult> {
        this.callsDeleteItem.push(id);

        if (this.errorDeletingItem !== "") {
            return this.resolve<DeleteItemResult>(new DeleteItemResult(this.errorDeletingItem));
        }

        const itemIndex = this.getItemIndex(id)
        if (itemIndex !== null) {
            delete (this.items[itemIndex])

            return this.resolve<DeleteItemResult>(new DeleteItemResult());
        } else {
            throw new Error("unexpected code branch")
        }
    }

    async loadItem(id: string): Promise<LoadItemResult> {
        this.callsLoadItem.push(id);

        if (this.loadItemReturnsNull) {
            return this.resolve<LoadItemResult>(new LoadItemResult(null));
        }

        if (this.errorLoadingItem !== "") {
            return this.resolve<LoadItemResult>(new LoadItemResult(null, this.errorLoadingItem));
        }

        const item = this.getItem(id);
        if (item === null) {
            throw new Error("unexpected code branch")
        }

        return this.resolve<LoadItemResult>(new LoadItemResult(item));
    }

    async loadItemList(): Promise<LoadListItemResult> {
        this.callsLoadList.push(null);

        if (this.errorLoadingItemList !== "") {
            return this.resolve<LoadListItemResult>(new LoadListItemResult([], this.errorLoadingItemList));
        }

        const listItems = this.items.map((i: TestItem) => ({id: i.id, caption: i.text} as ListItem))

        return this.resolve<LoadListItemResult>(new LoadListItemResult(listItems));
    }

    resolve<T>(result: T): Promise<T> {
        return new Promise<T>((resolve) => resolve(result))
    }

    // noinspection JSUnusedGlobalSymbols - used by functional tests
    setCreateOperationError(errorValue: string): boolean {
        this.errorCreatingItem = errorValue;
        return true;
    }

    // noinspection JSUnusedGlobalSymbols - used by functional tests
    setDeleteOperationError(errorValue: string): boolean {
        this.errorDeletingItem = errorValue;
        return true;
    }

    // noinspection JSUnusedGlobalSymbols - used by functional tests
    setItems(items: TestItem[]): boolean {
        this.items = items;
        return true;
    }

    // noinspection JSUnusedGlobalSymbols - used by functional tests
    setLoadItemOperationError(errorValue: string): boolean {
        this.errorLoadingItem = errorValue;
        return true;
    }

    // noinspection JSUnusedGlobalSymbols - used by functional tests
    setUpdateOperationError(errorValue: string): boolean {
        this.errorUpdatingItem = errorValue;
        return true;
    }

    async updateItem(formData: any): Promise<UpdateItemResult> {
        this.callsUpdateItem.push(formData);

        if (this.errorUpdatingItem !== "") {
            return this.resolve<UpdateItemResult>(new UpdateItemResult(this.errorUpdatingItem));
        }

        const item = formData as TestItem;
        const itemIndex = this.getItemIndex(item.id)
        if (itemIndex === null) {
            throw new Error("unexpected code branch")
        }
        this.items[itemIndex] = item;

        return this.resolve<UpdateItemResult>(new UpdateItemResult());
    }

    private getItem(id: string): TestItem | null {
        const results = this.items.filter((i: TestItem) => i.id === id);
        if (results.length === 1) {
            return results[0];
        }

        return null;
    }

    private getItemIndex(id: string): number | null {
        const results = this.items.map((i: TestItem, index) => i.id === id ? index : null).filter((d) => d !== null);
        if (results.length === 1) {
            return results[0];
        }

        return null;
    }
}
