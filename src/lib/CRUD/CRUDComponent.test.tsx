import '@testing-library/jest-dom/extend-expect';
// noinspection TypeScriptCheckImport
import {findByTestId, fireEvent, queryByAttribute, queryByTestId, render, waitForElement} from '@testing-library/react';
import React from 'react';
import {TestAdapter, TestItem} from "../../Sample/TestAdapter";
import {TestSchemaProvider} from "../../Sample/TestSchemaProvider";
import CRUDComponent from "./CRUDComponent";

describe('CRUDComponent initial state', () => {
    test('CRUDComponent renders without props', () => {
        render(<CRUDComponent/>);
    });

    test('CRUDComponent renders default prop headline', () => {
        const {getByText} = render(<CRUDComponent/>);

        expect(getByText(CRUDComponent.defaultHeadline)).toBeInTheDocument()
    });

    test('CRUDComponent renders prop headline', () => {
        const testHeadline = "hey-ho-headline"
        const {getByText} = render(<CRUDComponent headline={testHeadline}/>);

        expect(getByText(testHeadline)).toBeInTheDocument()
    });
});

describe('CRUDComponent initial loading of data from adapter', () => {
    test('CRUDComponent renders list from api', async () => {
        let testData = new TestData();

        const {container} = render(<CRUDComponent adapter={testData.adapter}/>);
        let helper = new TestHelper(container, testData);

        expect(await helper.findListItem(testData.testItem1)).toHaveTextContent(testData.testItem1.text);
        expect(await helper.findListItem(testData.testItem2)).toHaveTextContent(testData.testItem2.text);
    });

    test('CRUDComponent by default shows an empty form', async () => {
        let testData = new TestData();

        const {container} = render(
            <CRUDComponent
                adapter={testData.adapter}
                schemaProvider={testData.schemaProvider}/>);
        let helper = new TestHelper(container, testData);

        await helper.findListItem(testData.testItem1)
        helper.expectEmptyForm()
    });
});

describe('CRUDComponent NEW CREATE', () => {
    test("if an item is selected, the NEW button clears the form", async () => {
        let testData = new TestData();

        const {container} = render(
            <CRUDComponent
                adapter={testData.adapter}
                schemaProvider={testData.schemaProvider}/>);
        let helper = new TestHelper(container, testData);

        await helper.findListItem(testData.testItem1)
        await helper.clickListItem(testData.testItem1)
        await helper.waitForForm()
        helper.expectItemInForm(testData.testItem1)
        await helper.newItem()
        await helper.waitForForm()

        helper.expectEmptyForm()
    })

    test("if a new item is submitted, ti shows in list and was passed to the data adapter", async () => {
        let testData = new TestData();

        const {container} = render(
            <CRUDComponent
                adapter={testData.adapter}
                schemaProvider={testData.schemaProvider}/>);
        let helper = new TestHelper(container, testData);

        const id = "100"
        const text = "a brand new item";
        const done = true;
        helper.setIdInput(id)
        helper.setTextInput(text)
        helper.clickDoneCheckbox()
        helper.submitForm()

        const newItem: TestItem = {
            id: id,
            text: text,
            done: done
        }

        await helper.findListItem(newItem)
        expect(testData.adapter.callsCreateItem[0]).toEqual(newItem)
    })
})

describe('CRUDComponent SELECT, UPDATE, DELETE item', () => {
    let assets: Assets;

    beforeEach(async () => {
        assets = await initComponentWithItemSelected()
    });

    test('item was selected so it is shown in the form, async', () => {
        assets.helper.expectItemInForm(assets.testData.testItem1)
    });

    test('selected item is updated so it updates in the list and the adapter was called', async () => {
        const newText = "TEST-123";
        assets.helper.setTextInput(newText)
        assets.helper.submitForm()
        expect(await assets.helper.findListItem(assets.testData.testItem1)).toHaveTextContent(newText)

        let expectedItem: TestItem = {} as TestItem
        Object.assign(expectedItem, assets.testData.testItem1);
        expectedItem.text = newText;
        expect(assets.testData.adapter.callsUpdateItem[0]).toEqual(expectedItem)
    });

    test('selected item is delete so it is removed from list and the adapter was called', async () => {
        await assets.helper.deleteItem()
        await assets.helper.findListItem(assets.testData.testItem2)

        expect(assets.helper.queryListItem(assets.testData.testItem1)).toBeNull()
        expect(assets.testData.adapter.callsDeleteItem[0]).toEqual(assets.testData.testItem1.id)
    });
})

describe('CRUDComponent Errors', () => {
    let assets: Assets;

    beforeEach(async () => {
        assets = await initComponentWithItemSelected()
        assets.testData.adapter.callsLoadItem = [];
    });

    test('if item creation fails, and error is shown', async () => {
        const error = "cannot create item"
        assets.testData.adapter.errorCreatingItem = error;
        await assets.helper.newItem()
        assets.helper.setIdInput("100")
        assets.helper.setTextInput("a brand new item")
        assets.helper.clickDoneCheckbox()
        assets.helper.submitForm()

        expect(await assets.helper.findByTestId("api-result-error")).toBeVisible();
        expect(await assets.helper.findByTestId("api-result-error")).toHaveTextContent(error);
        expect(assets.testData.adapter.callsCreateItem).toHaveLength(1)
    });


    test('if items load fails, an error is shown', async () => {
        const error = "cannot load item"
        assets.testData.adapter.errorLoadingItem = error;

        assets.helper.submitForm()

        await expectErrorMessage(assets, error);
        expect(assets.testData.adapter.callsLoadItem).toHaveLength(1)
    });

    test('if items update fails, an error is shown', async () => {
        const error = "cannot delete item"
        assets.testData.adapter.errorUpdatingItem = error;

        assets.helper.submitForm()

        await expectErrorMessage(assets, error);
        expect(assets.testData.adapter.callsUpdateItem).toHaveLength(1)
    });

    test('if item deletion fails, an error is shown', async () => {
        const error = "cannot delete item"
        assets.testData.adapter.errorDeletingItem = error;

        await assets.helper.deleteItem()

        await expectErrorMessage(assets, error);
        expect(assets.testData.adapter.callsDeleteItem).toHaveLength(1)
    });
})

async function expectErrorMessage(assets: Assets, error: string) {
    expect(await assets.helper.findByTestId("api-result-error")).toBeVisible()
    expect(await assets.helper.findByTestId("api-result-error")).toHaveTextContent(error);
}

interface Assets {
    helper: TestHelper
    testData: TestData
}

async function initComponentWithItemSelected(): Promise<Assets> {
    let testData = new TestData();
    const {container} = render(
        <CRUDComponent adapter={testData.adapter}
                       schemaProvider={testData.schemaProvider}/>
    );
    let helper = new TestHelper(container, testData);

    await helper.findListItem(testData.testItem1)
    await helper.clickListItem(testData.testItem1)
    await helper.waitForForm()

    return {
        testData: testData,
        helper: helper
    }
}

class TestHelper {
    private readonly container: any;
    private testBed: TestData;

    constructor(container, testBed: TestData) {
        this.container = container
        this.testBed = testBed;
    }

    clickDoneCheckbox() {
        fireEvent.click(this.getForm().doneCheckbox)
    }

    async clickListItem(item: TestItem) {
        fireEvent.click(await this.findListItem(item))
    }

    async deleteItem() {
        fireEvent.click(await findByTestId(this.container, "bt-delete-item"))
    }

    expectEmptyForm(): void {
        const form = this.getForm();
        expect(form.idInput).toHaveValue("")
        expect(form.textInput).toHaveValue("")
        expect(form.doneCheckbox).not.toBeChecked()
    }

    expectItemInForm(item: TestItem) {
        const form = this.getForm();
        expect(form.idInput).toHaveValue(item.id)
        expect(form.textInput).toHaveValue(item.text)
        if (item.done) {
            expect(form.doneCheckbox).toBeChecked()
        } else {
            expect(form.doneCheckbox).not.toBeChecked()
        }
    }

    async findByTestId(testId: string) {
        return await findByTestId(this.container, testId)
    }

    async findListItem(item: TestItem) {
        return await findByTestId(this.container, this.testBed.getListItemId(item))
    }

    getForm(): TestForm {
        return {
            idInput: queryByAttribute('id', this.container, "root_id"),
            textInput: queryByAttribute('id', this.container, "root_text"),
            doneCheckbox: queryByAttribute('id', this.container, "root_done"),
        } as TestForm
    }

    async newItem() {
        fireEvent.click(await findByTestId(this.container, "bt-new-item"))
    }

    queryListItem(item: TestItem) {
        return queryByTestId(this.container, this.testBed.getListItemId(item))
    }

    setIdInput(text: string) {
        fireEvent.change(this.getForm().idInput, {target: {value: text}})
    }

    setTextInput(text: string) {
        fireEvent.change(this.getForm().textInput, {target: {value: text}})
    }

    submitForm() {
        fireEvent.click(queryByAttribute("type", this.container, "submit"))
    }

    async waitForForm() {
        return waitForElement(() => queryByAttribute('id', this.container, "root_id"))
    }
}

interface TestForm {
    doneCheckbox
    idInput
    textInput
}

class TestData {
    adapter: TestAdapter = new TestAdapter()
    schemaProvider: TestSchemaProvider = new TestSchemaProvider();
    testItem1: TestItem = {text: "item text 1", id: "1", done: false} as TestItem;
    testItem2: TestItem = {text: "item text 2", id: "2", done: false} as TestItem;

    constructor() {
        this.adapter.setItems([this.testItem1, this.testItem2] as TestItem[])
    }

    getListItemId(item: TestItem): string {
        return 'entity-list-item-' + item.id;
    }
}