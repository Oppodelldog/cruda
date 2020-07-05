// noinspection TypeScriptCheckImport
import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import {ListItem} from "../Data/Adapter";
import List from "./List";


test('List renders ListItems', () => {
    const testBed = new ListTestBed();
    expectListRendersListItems(testBed, <List items={testBed.items}/>);
});

test('List calls onSelect with the id of the clicked item', () => {
    const testBed = new ListTestBed();
    expectListCallsOnSelect(testBed, <List items={testBed.items} onSelect={testBed.onSelect.bind(testBed)}/>);
});

test('List highlights the clicked item', () => {
    const testBed = new ListTestBed();
    expectListHighlightSelectedItem(testBed, <List items={testBed.items} onSelect={testBed.onSelect.bind(testBed)}/>);
});

export function expectListRendersListItems(testBed: ListTestBed, sut: JSX.Element) {
    const {getByText} = render(sut);

    const entry1 = getByText(testBed.item1.caption)
    const entry2 = getByText(testBed.item2.caption)

    // noinspection TypeScriptUnresolvedFunction
    expect(entry1).toBeInTheDocument()
    // noinspection TypeScriptUnresolvedFunction
    expect(entry2).toBeInTheDocument()
}

export function expectListCallsOnSelect(testBed: ListTestBed, sut: JSX.Element) {
    const {getByText} = render(sut);

    const entry2 = getByText(testBed.item2.caption)
    fireEvent.click(entry2)

    expect(testBed.selectedValue).toEqual(testBed.item2.id)
}

export function expectListHighlightSelectedItem(testBed: ListTestBed, sut: JSX.Element) {
    const {getByText} = render(sut);

    const entry2 = getByText(testBed.item2.caption)
    fireEvent.click(entry2)

    expect(entry2.className).toEqual("selected")
}

export class ListTestBed {
    item1: ListItem
    item2: ListItem
    items: ListItem[]
    selectedValue: string = "";

    constructor() {
        this.item1 = {id: "id1", caption: "caption1"}
        this.item2 = {id: "id2", caption: "caption2"}
        this.items = [this.item1, this.item2]
    }

    onSelect(value) {
        this.selectedValue = value;
    }
}