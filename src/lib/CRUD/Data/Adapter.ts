/**
 * Adapter defines the methods that implements CRUD for a data entity.
 */
export interface Adapter {
    createItem(formData: any): Promise<CreateItemResult>;

    deleteItem(id: string): Promise<DeleteItemResult>

    loadItem(id: string): Promise<LoadItemResult>

    loadItemList(): Promise<LoadListItemResult>

    updateItem(formData: any): Promise<UpdateItemResult>;
}

/**
 * ListItem holds information to display a entity.
 */
export interface ListItem {
    caption: string
    id: string
}

/**
 * Result defines the common data that results from each Adapter method call.
 */
export class Result {
    error: string;

    constructor(error: string = "") {
        this.error = error;
    }

    hasError(): boolean {
        return this.error !== "";
    }
}

/**
 * LoadListItemResult is returned from Adapter::loadList and contains a list of ListItem.
 */
export class LoadListItemResult extends Result {
    items: ListItem[];

    constructor(items: ListItem[], error: string = "") {
        super(error)
        this.items = items;
    }
}

/**
 * LoadItemResult is returned from Adapter::loadItem and contains a item value
 * which might be null in case of the item was not found.
 */
export class LoadItemResult extends Result {
    item: object | null;

    constructor(item: object | null, error: string = "") {
        super(error)
        this.item = item;
    }
}

/**
 * CreateItemResult is returned from Adapter::createItem.
 */
export class CreateItemResult extends Result {
}

/**
 * UpdateItemResult is returned from Adapter::updateItem.
 */
export class UpdateItemResult extends Result {
}

/**
 * DeleteItemResult is returned from Adapter::deleteItem.
 */
export class DeleteItemResult extends Result {
}

/**
 * NotImplementedDataAdapter is a default placeholder that can be used to stub the adapter if no adapter is provided.
 * It may be used as a default to indicate the user did not provide a adapter implementation.
 */
export class NotImplementedDataAdapter implements Adapter {
    // noinspection JSUnusedLocalSymbols
    createItem(formData: any): Promise<CreateItemResult> {
        return new Promise<CreateItemResult>((resolve) => resolve(new CreateItemResult("createItem not implemented")));
    }

    // noinspection JSUnusedLocalSymbols
    deleteItem(id: string): Promise<DeleteItemResult> {
        return new Promise<DeleteItemResult>((resolve) => resolve(new DeleteItemResult("deleteItem not implemented")));
    }

    // noinspection JSUnusedLocalSymbols
    loadItem(id: string): Promise<LoadItemResult> {
        return new Promise<LoadItemResult>((resolve) => resolve(new LoadItemResult(null, "loadItem not implemented")));
    }

    loadItemList(): Promise<LoadListItemResult> {
        return new Promise<LoadListItemResult>((resolve) => resolve(new LoadListItemResult([], "loadList not implemented")));
    }

    // noinspection JSUnusedLocalSymbols
    updateItem(formData: any): Promise<UpdateItemResult> {
        return new Promise<UpdateItemResult>((resolve) => resolve(new UpdateItemResult("updateItem not implemented")));
    }
}
