import Form from "@rjsf/core"
import React, {Component} from 'react'
import {Subscription} from "rxjs";
import ApiResult from "./Components/ApiResult"
import FilteredList from "./Components/FilteredList";
import './CRUDComponent.css'
import {Adapter, ListItem, NotImplementedDataAdapter} from "./Data/Adapter";
import {CRUDComponentObserver} from "./Observer/CRUDComponentObserver";
import {subscriptionDone, throwSubscriptionError} from "./Observer/DefaultFunctions";
import {ToolsObserver} from "./Observer/ToolsObserver";
import {SchemaProvider, SchemaProviderDefault} from "./Provider/SchemaProvider";
import {StateContext} from "./Provider/UISchemaProvider";

interface ApiResultState {
    apiError: string,
    apiSuccess: string,
}

interface State extends ApiResultState {
    listItems: ListItem[]
    selectedItem: object | null
}

/**
 * CRUDConfig holds configuration that drives the Component.
 */
export interface CRUDConfig {
    /**
     * adapter is used to (create, read, update, delete) the entity.
     */
    adapter: Adapter
    /**
     * headline is the main headline of the component.
     */
    headline: string
    /**
     * schemaProvider answers questions to the data schema of the entity.
     */
    schemaProvider: SchemaProvider
}

/**
 * CRUDComponent encapsulates an administrative view on a data entity.
 * It lets you add, select, edit and delete instances of a entity.
 * The entity is described and accessed by adapter and schemaProvider from CRUDConfig.
 */
export default class CRUDComponent extends Component<CRUDConfig, State> {
    public static readonly defaultHeadline = "CRUD-COMPONENT";

    static defaultProps: CRUDConfig = {
        headline: CRUDComponent.defaultHeadline,
        adapter: new NotImplementedDataAdapter(),
        schemaProvider: new SchemaProviderDefault(),
    } as CRUDConfig;

    public static readonly generalMessageOK = "ok";
    private reloadItemSub: Subscription | null = null;
    private reloadItemListSub: Subscription | null = null;

    protected constructor(props: CRUDConfig) {
        super(props);

        this.state = {
            listItems: new Array<ListItem>(),
            selectedItem: null,
            apiError: "",
            apiSuccess: "",
        } as State;
    }

    async componentDidMount() {
        this.reloadItemSub = ToolsObserver.ReloadItem.subscribe((itemId: any) => this.loadItem(itemId), throwSubscriptionError, subscriptionDone);
        this.reloadItemListSub = ToolsObserver.ReloadItemList.subscribe(() => this.loadItemList(), throwSubscriptionError, subscriptionDone);

        await this.loadItemList()
    }

    componentWillUnmount() {
        if (this.reloadItemSub !== null) {
            this.reloadItemSub.unsubscribe()
        }
        if (this.reloadItemListSub !== null) {
            this.reloadItemListSub.unsubscribe()
        }
    }

    isItemSelected(): boolean {
        return this.getSelectedItem() !== null;
    }

    render() {
        let selectedItem = this.getSelectedItem();

        const uiSchema = this.props.schemaProvider.getUISchema(this as StateContext)
        const schema = this.props.schemaProvider.getItemSchema();

        return (
            <div data-testid={"CRUDComponent"} className={"Widget form-container"}>
                <div>
                    <div className={"headline"}><span>{this.props.headline}</span>
                        <button data-testid={"bt-new-item"} className={"btn btn-info btn-add"} onClick={() => {
                            this.newItem()
                        }}>New
                        </button>
                    </div>
                    <FilteredList
                        items={this.state.listItems}
                        onSelect={(selectedId: string) => this.selectItem(selectedId)}
                    />
                </div>
                <div>
                    <Form schema={schema}
                          uiSchema={uiSchema}
                          formData={selectedItem}
                          onSubmit={(e) => this.saveItem(e)}
                    />
                    {this.renderDeleteButton()}
                    <ApiResult apiError={this.state.apiError} apiSuccess={this.state.apiSuccess}/>
                </div>
            </div>
        )
    }

    protected setErrorMessage(apiError: string) {
        this.setState(() => {
            return {apiError: apiError};
        })
    }

    protected setSuccessMessage(ok: string) {
        this.setState(() => {
            return {apiSuccess: ok};
        })
    }

    protected setListItems(items: ListItem[]) {
        this.setState(() => {
            return {listItems: items}
        })
    }

    protected setItem(item: object | null) {
        this.setState(() => {
            return {selectedItem: item};
        })
    }

    protected async saveItem(e: any) {
        this.setErrorMessage("")
        this.setSuccessMessage("");
        if (this.isItemSelected()) {
            await this.updateItem(e.formData)
            CRUDComponentObserver.publishItemUpdated(e.formData)
        } else {
            await this.createItem(e.formData)
            CRUDComponentObserver.publishItemCreated(e.formData)
        }
    }

    protected async loadItemList() {
        let result = await this.props.adapter.loadItemList()
        if (result.hasError()) {
            this.setErrorMessage(result.error)
        } else {
            this.setListItems(result.items)
        }
    }

    protected async loadItem(id: string) {
        const result = await this.props.adapter.loadItem(id);
        if (result.hasError()) {
            this.setErrorMessage(result.error)
        } else {
            this.setItem(result.item)
        }
    }

    private newItem() {
        this.setItem(null)
    }

    private async selectItem(id: string) {
        this.setErrorMessage("");
        this.setSuccessMessage("");

        await this.loadItem(id);

        let selectedItem = this.getSelectedItem();
        if (selectedItem !== null) {
            CRUDComponentObserver.publishItemSelected(selectedItem)
        }
    }

    private getSelectedItem(): object | null {
        return this.state.selectedItem;
    }

    private async createItem(formData: any) {
        const itemId = this.props.schemaProvider.getId(formData);
        const result = await this.props.adapter.createItem(formData);
        if (result.hasError()) {
            this.setErrorMessage(result.error)
        } else {
            this.setSuccessMessage(CRUDComponent.generalMessageOK)
            await this.loadItem(itemId);
            await this.loadItemList();
        }
    }

    private async updateItem(formData: any) {
        const itemId = this.props.schemaProvider.getId(formData);
        const result = await this.props.adapter.updateItem(formData);
        if (result.hasError()) {
            this.setErrorMessage(result.error)
        } else {
            this.setSuccessMessage(CRUDComponent.generalMessageOK)
            await this.loadItem(itemId);
            await this.loadItemList();
        }
    }

    private renderDeleteButton() {
        const selectedItem = this.getSelectedItem();
        if (selectedItem === null) {
            return
        }

        const itemId = this.props.schemaProvider.getId(selectedItem);

        return <button
            data-testid={"bt-delete-item"}
            className={"btDelete btn btn-info btn-danger"}
            onClick={async () => {
                await this.deleteItem(itemId)
            }}>Delete</button>
    }

    private async deleteItem(id: string) {
        const result = await this.props.adapter.deleteItem(id);

        if (result.hasError()) {
            this.setErrorMessage(result.error)
        } else {
            this.setSuccessMessage(CRUDComponent.generalMessageOK)
            let copyItem: object = {};
            Object.assign(copyItem, this.state.selectedItem)
            await this.setItem(null);
            await this.loadItemList();
            CRUDComponentObserver.publishItemDeleted(copyItem)
        }
    }
}