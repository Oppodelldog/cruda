import React, {Component} from 'react'
import {Subscription} from "rxjs";
import {CRUDComponentObserver} from "../lib/CRUD/Observer/CRUDComponentObserver";
import {subscriptionDone, throwSubscriptionError} from "../lib/CRUD/Observer/DefaultFunctions";
import {ToolsObserver} from "../lib/CRUD/Observer/ToolsObserver";
import {TestAdapter, TestItem} from "./TestAdapter";

interface State {
    createdItem: TestItem | null;
    deletedItem: TestItem | null;
    selectedItem: TestItem | null;
    updatedItem: TestItem | null;
}

interface Props {
    adapter: TestAdapter
}

export default class SampleTools extends Component<Props, State> {
    private itemSelectedSub: Subscription | null = null;
    private itemCreatedSub: Subscription | null = null;
    private itemUpdatedSub: Subscription | null = null;
    private itemDeletedSub: Subscription | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {selectedItem: null} as State;
    }

    private static renderItem(item: TestItem) {
        if (!item.hasOwnProperty("id")) {
            return <></>
        }
        return <>id: {item.id}, text: {item.text}</>;
    }

    componentDidMount() {
        this.itemSelectedSub = CRUDComponentObserver.ItemSelected.subscribe(
            selectedItem => {
                this.setState(() => {
                    return {selectedItem: selectedItem as TestItem};
                });
            },
            throwSubscriptionError,
            subscriptionDone
        );

        this.itemCreatedSub = CRUDComponentObserver.ItemCreated.subscribe(
            selectedItem => {
                this.setState(() => {
                    return {createdItem: selectedItem as TestItem};
                });
            },
            throwSubscriptionError,
            subscriptionDone
        );

        this.itemUpdatedSub = CRUDComponentObserver.ItemUpdated.subscribe(
            selectedItem => {
                this.setState(() => {
                    return {updatedItem: selectedItem as TestItem};
                });
            },
            throwSubscriptionError,
            subscriptionDone
        );

        this.itemDeletedSub = CRUDComponentObserver.ItemDeleted.subscribe(
            selectedItem => {
                this.setState(() => {
                    return {deletedItem: selectedItem as TestItem};
                });
            },
            throwSubscriptionError,
            subscriptionDone
        );
    }

    componentWillUnmount() {
        if (this.itemSelectedSub !== null) {
            this.itemSelectedSub.unsubscribe()
        }
        if (this.itemCreatedSub !== null) {
            this.itemCreatedSub.unsubscribe()
        }
        if (this.itemUpdatedSub !== null) {
            this.itemUpdatedSub.unsubscribe()
        }
        if (this.itemDeletedSub !== null) {
            this.itemDeletedSub.unsubscribe()
        }
    }

    render() {
        const selectedItem: TestItem = this.state.selectedItem ? this.state.selectedItem : {} as TestItem;
        const createdItem: TestItem = this.state.createdItem ? this.state.createdItem : {} as TestItem;
        const updatedItem: TestItem = this.state.updatedItem ? this.state.updatedItem : {} as TestItem;
        const deletedItem: TestItem = this.state.deletedItem ? this.state.deletedItem : {} as TestItem;

        const sampleContainerStyles = {"display": "flex", "justify-content": "space-evenly"}
        return <div>
            <br/>
            <p>Tools allows the user to perform additional tasks based on the entity data.<br/><br/>
                <b>CRUDComponent Observer</b> will inform the component for several events:
            </p>
            <ul>
                <li>item selected</li>
                <li>item created</li>
                <li>item updated</li>
                <li>item deleted</li>
            </ul>
            <br/>
            <b>General Observer functions</b> can be used to control the CRUDComponent:
            <ul>
                <li>reload item</li>
                <li>reload list</li>
            </ul>
            <br/>

            <h3>Samples</h3>
            <div style={sampleContainerStyles}>
                <div>
                    <h4>CRUDComponent Observer</h4>
                    <b>Perform some actions on the CRUDComponent</b>
                    <ul>
                        <li>
                            <h5>item selected</h5>
                            <pre data-testid={"tools-item-selected"}>{SampleTools.renderItem(selectedItem)}</pre>
                        </li>
                        <li>
                            <h5>item created</h5>
                            <pre data-testid={"tools-item-created"}>{SampleTools.renderItem(createdItem)}</pre>
                        </li>
                        <li>
                            <h5>item updated</h5>
                            <pre data-testid={"tools-item-updated"}>{SampleTools.renderItem(updatedItem)}</pre>
                        </li>
                        <li>
                            <h5>item deleted</h5>
                            <pre data-testid={"tools-item-deleted"}>{SampleTools.renderItem(deletedItem)}</pre>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>General Observer</h4>
                    <b>Here are some sample actions that will change data and<br/>then inform the CRUDComponent to
                        update.</b>
                    <ul>
                        <li><h5>reload list</h5>
                            <p>Say there's a tool that inserts some new items</p>
                            <button onClick={this.addSomeItems.bind(this)}>Add some items and reload list</button>
                        </li>
                        <li>
                            <h5>reload item</h5>
                            <p>Say there's a tool that changes an item</p>
                            <button onClick={this.changeItem.bind(this)}>Change selected item and reload item and list
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    }

    private async changeItem() {
        let selectedItem = this.state.selectedItem;
        if (selectedItem !== null) {
            selectedItem.text = "Changed Item Text"
            await this.props.adapter.updateItem(selectedItem);

            ToolsObserver.publishReloadItem(selectedItem.id)
            ToolsObserver.publishReloadItemList()
        }
    }

    private async addSomeItems() {
        let newId = () => Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

        [
            {id: newId(), text: "new item", done: true} as TestItem,
            {id: newId(), text: "new item", done: false} as TestItem,
        ].forEach((item) => this.props.adapter.createItem(item))
        ToolsObserver.publishReloadItemList()
    }
}

