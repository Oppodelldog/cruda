import {Subject} from "rxjs";

export class ToolsObserver {
    public static ReloadItem = new Subject();
    public static ReloadItemList = new Subject();

    public static publishReloadItem = (itemId: string) => ToolsObserver.ReloadItem.next(itemId)

    public static publishReloadItemList = () => ToolsObserver.ReloadItemList.next()
}