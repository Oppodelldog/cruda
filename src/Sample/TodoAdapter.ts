import {
    Adapter,
    CreateItemResult,
    DeleteItemResult,
    ListItem,
    LoadItemResult,
    LoadListItemResult,
    UpdateItemResult
} from "../lib/CRUD/Data/Adapter";

interface TodoItem {
    id: string
    resolved: boolean
    title: string
}

export class TodoAdapter implements Adapter {
    private items: TodoItem[] = [
        {
            id: "1",
            title: "Implement the Adapter",
            resolved: false
        } as TodoItem,
        {
            id: "2",
            title: "Implement the Schema Provider",
            resolved: false
        } as TodoItem,
        {
            id: "3",
            title: "Add config entry",
            resolved: false
        } as TodoItem];

    async createItem(formData: any): Promise<CreateItemResult> {
        const item = formData as TodoItem;

        try {
            let result: CreateItemResult;
            if (this.itemExists(item.id)) {
                result = new CreateItemResult("item already exists");
            } else {
                this.items.push(item)
                result = new CreateItemResult("");
            }

            return new Promise<CreateItemResult>((resolve) => resolve(result))

        } catch (e) {
            const apiError = "some error";
            const error = `error creating item '${item.id}': ${apiError}`;
            const result = new CreateItemResult(error);

            return new Promise<CreateItemResult>((resolve) => resolve(result))
        }
    }

    async deleteItem(id: string): Promise<DeleteItemResult> {
        try {
            const itemIndex = this.getItemIndex(id)
            let result: UpdateItemResult
            if (itemIndex !== null) {
                delete (this.items[itemIndex])
                result = new DeleteItemResult("");
            } else {
                result = new DeleteItemResult(`item ${id} not found`);
            }
            return new Promise<DeleteItemResult>((resolve) => resolve(result))

        } catch (e) {
            const apiError = "some error";
            const error = `error creating item '${id}': ${apiError}`;
            const result = new DeleteItemResult(error);

            return new Promise<DeleteItemResult>((resolve) => resolve(result))
        }
    }

    async loadItem(id: string): Promise<LoadItemResult> {
        try {
            const item = this.getItem(id);
            let result: LoadItemResult;
            if (item !== null) {
                result = new LoadItemResult(item);
            } else {
                result = new LoadItemResult(null, `item ${id} not found`);
            }

            return new Promise<LoadItemResult>((resolve) => resolve(result))
        } catch (e) {
            const result = new LoadItemResult(null, `error loading item '${id}': ${e}`);

            return new Promise<LoadItemResult>((resolve) => resolve(result))
        }
    }

    async loadItemList(): Promise<LoadListItemResult> {
        try {
            const listItems = this.items.map((i: TodoItem) => ({id: i.id, caption: i.title} as ListItem))
            const result = new LoadListItemResult(listItems);

            return new Promise<LoadListItemResult>((resolve) => resolve(result))
        } catch (e) {
            const result = new LoadListItemResult([], `error loading item list: ${e}`);

            return new Promise<LoadListItemResult>((resolve) => resolve(result))
        }
    }

    async updateItem(formData: any): Promise<UpdateItemResult> {
        const item = formData as TodoItem;

        try {
            const itemIndex = this.getItemIndex(item.id)
            let result: UpdateItemResult
            if (itemIndex !== null) {
                this.items[itemIndex] = item;
                result = new UpdateItemResult("");
            } else {
                result = new UpdateItemResult(`item ${item.id} not found`);
            }

            return new Promise<UpdateItemResult>((resolve) => resolve(result))

        } catch (e) {
            const apiError = "some error";
            const error = `error saving item '${item.id}': ${apiError}`;
            const result = new UpdateItemResult(error);

            return new Promise<UpdateItemResult>((resolve) => resolve(result))
        }
    }

    private itemExists(id: string): boolean {
        return this.items.filter((i: TodoItem) => i.id === id).length > 0
    }

    private getItem(id: string): TodoItem | null {
        const results = this.items.filter((i: TodoItem) => i.id === id);
        if (results.length === 1) {
            return results[0];
        }

        return null;
    }

    private getItemIndex(id: string): number | null {
        const results = this.items.map((i: TodoItem, index) => i.id === id ? index : null).filter((d) => d !== null);
        if (results.length === 1) {
            return results[0];
        }

        return null;
    }
}
