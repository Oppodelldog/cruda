import {Subject} from 'rxjs'

export class CRUDComponentObserver {
    public static ItemCreated = new Subject()
    public static ItemDeleted = new Subject()
    public static ItemSelected = new Subject()
    public static ItemUpdated = new Subject()

    public static publishItemCreated = (selectedItem: object) => CRUDComponentObserver.ItemCreated.next(selectedItem)

    public static publishItemDeleted = (selectedItem: object) => CRUDComponentObserver.ItemDeleted.next(selectedItem)

    public static publishItemSelected = (selectedItem: object) => CRUDComponentObserver.ItemSelected.next(selectedItem)

    public static publishItemUpdated = (selectedItem: object) => CRUDComponentObserver.ItemUpdated.next(selectedItem)
}

